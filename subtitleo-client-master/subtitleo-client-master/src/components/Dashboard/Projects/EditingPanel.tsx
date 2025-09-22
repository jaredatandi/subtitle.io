import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Timeline from './Timeline';
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { IoPlayBackSharp } from 'react-icons/io5';
import { IoPlayForwardSharp } from 'react-icons/io5';
import StandardButton from 'components/shared/Buttons/StandardButton';
import TabsSection from './sections/TabsSection';
import Subtitles from './TabPanes/Subtitles';
import ClockDark from 'assets/images/svg_based/ClockDark';
import { convertToDigitalClockFormat } from 'utils/convertToDigitalClockFormat';
import DeleteSubtitleIcon from 'assets/images/svg_based/DeleteSubtitleIcon';
import { fontFamilies, fontSizes } from './data/static';
import { templates } from './data/templates';
import ColorPickerIcon from 'assets/images/svg_based/ColorPicker';
import BoldIcon from 'assets/images/svg_based/Bold';
import UnderlineIcon from 'assets/images/svg_based/Underline';
import ItalicIcon from 'assets/images/svg_based/Italic';
import { io } from 'socket.io-client';
import useSessionStorage from 'utils/sessionStorage';
import AlignLeft from 'assets/images/svg_based/Aleft';
import AlignCenter from 'assets/images/svg_based/Acenter';
import AlignRight from 'assets/images/svg_based/Aright';
import { axiosPrivate } from 'service/axios';
import { toast } from 'react-toastify';
import { parse } from 'cookie';
import Draggable from 'react-draggable';

const EditingPanel = ({ options, project }: { options: any; project: any }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('Subtitles');
  const [subtitles, setSubtitles] = useState<any>([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState<any>({});
  const [textCase, setTextCase] = useState('SENTENCE');

  const [processState, setProcessState] = useState('');

  const [subtitlesApplicationProgress, setSubtitlesApplicationProgress] =
    useState(0);

  const { getSessionStorageItem } = useSessionStorage();

  const [template, setTemplate] = useState<(typeof templates)[0]>({
    Name: 'Default',
    Fontname: 'Roboto',
    Fontsize: 16,
    PrimaryColour: '#FFFFFF',
    SecondaryColour: '&H000000FF&',
    OutlineColour: '&H00000000&',
    BackColour: '',
    Bold: -1,
    Italic: 0,
    Underline: 0,
    StrikeOut: 0,
    ScaleX: 100,
    ScaleY: 100,
    Spacing: 0,
    Angle: 0,
    BorderStyle: 1,
    Outline: 0,
    Shadow: 1,
    Alignment: 2,
    MarginL: 2,
    MarginR: 2,
    MarginV: 10,
    Encoding: 1,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (videoNode.current) {
        const newPlayer = videojs(videoNode.current, options);

        newPlayer.on('loadedmetadata', function (this: any) {
          const videoNativeWidth = this.videoWidth();
          const videoNativeHeight = this.videoHeight();
          const aspectRatio = videoNativeWidth / videoNativeHeight;

          let adjustedVideoWidth = window.innerWidth * 0.8;
          let adjustedVideoHeight = adjustedVideoWidth / aspectRatio;

          if (adjustedVideoWidth > 700) {
            adjustedVideoWidth = 700;
            adjustedVideoHeight = adjustedVideoWidth / aspectRatio;
          }

          if (adjustedVideoHeight > 500) {
            adjustedVideoHeight = 500;
            adjustedVideoWidth = adjustedVideoHeight * aspectRatio;
          }

          newPlayer.width(adjustedVideoWidth);
          newPlayer.height(adjustedVideoHeight);

          setVideoWidth(adjustedVideoWidth);
          setVideoHeight(adjustedVideoHeight);
          setDuration(this.duration());
        });

        setPlayer(newPlayer);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      // if (player) {
      //   player.dispose();
      //   setPlayer(null);
      // }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    if (player) {
      const interval = setInterval(() => {
        if (player) {
          setCurrentTime(player.currentTime());
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [player]);

  const handleSeek = (percentage: number) => {
    if (player) {
      const newTime = percentage * duration;
      player.currentTime(newTime);
      setCurrentTime(newTime);
    }
  };

  const handlePlayPause = () => {
    if (player) {
      if (player.paused()) {
        player.play();
      } else {
        player.pause();
      }
    }
  };

  const handleSkip = (seconds: number) => {
    if (player) {
      const newTime = player.currentTime() + seconds;
      player.currentTime(newTime);
      setCurrentTime(newTime);
    }
  };

  const tabs = ['Subtitles', 'Font', 'Templates'];

  const handleSubtitleClick = (subtitle: any) => {
    setSelectedSubtitle(subtitle);
  };

  const handleSubtitleChange = (subtitle: any, newText: any) => {
    const index = subtitles.findIndex((s: any) => s.id === subtitle.id);
    const newSubtitles = subtitles.map((s: any, idx: number) =>
      idx === index ? { ...s, text: newText } : s
    );
    const currentSubtitleCopy =
      subtitle.id === selectedSubtitle.id
        ? { ...selectedSubtitle, text: newText }
        : selectedSubtitle;
    setSubtitles(newSubtitles);
    setSelectedSubtitle(currentSubtitleCopy);
  };

  const deleteSubtitle = (subtitle: any) => {
    const index = subtitles.findIndex((s: any) => s.id === subtitle.id);
    const newSubtitles = [...subtitles];
    newSubtitles.splice(index, 1);
    setSelectedSubtitle({});
    setActiveTab('Subtitles');
    setSubtitles(newSubtitles);
  };

  useEffect(() => {
    const socket: any = io(`${process.env.REACT_APP_API_BASE_URL}`, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
      upgrade: false,
    });
    const COOKIE_NAME = 'AWSALB';

    socket.io.on('open', () => {
      socket.io.engine.transport.on('pollComplete', () => {
        const request = socket.io.engine.transport.pollXhr.xhr;
        const cookieHeader = request.getResponseHeader('set-cookie');
        if (!cookieHeader) {
          return;
        }
        cookieHeader.forEach((cookieString: any) => {
          if (cookieString.includes(`${COOKIE_NAME}=`)) {
            const cookie = parse(cookieString);
            socket.io.opts.extraHeaders = {
              cookie: `${COOKIE_NAME}=${cookie[COOKIE_NAME]}`,
            };
          }
        });
      });
    });
    socket.on('connect', () => {
      socket.emit(
        'joinRoom',
        JSON.stringify(JSON.parse(getSessionStorageItem('user') || '{}')?.id)
      );
    });
    socket.on('connect_error', (error: any) => {
      console.log('Connection Error', error);
    });

    socket.on('error', (error: any) => {
      console.log('Error', error);
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from the server!');
    });

    socket.on('subtitles-application', (data: any) => {
      console.log(data, 'process started!');
      if (data.status === 'progress') {
        setProcessState('Applying Subtitles...');
        if (data.data === 100) {
          setProcessState('Finalizing...');
        }
        setSubtitlesApplicationProgress(data.data);
      }
    });
    socket.on('subtitles-process-complete', () => {
      console.log('Process completed!');
      (
        window as Window
      ).location = `/dashboard/projects/${project?.id}/${project?.originalVideoFile}/view`;
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const applySubtitles = async () => {
  //   setProcessState("Rendering Video...");
  //   await axiosPrivate
  //     .post(`/projects/add-subtitles`, {
  //       folderId: project?.folder?.id,
  //       projectId: project?.id,
  //       styles: template,
  //       transcriptions: JSON.stringify(subtitles),
  //     })
  //     .then((response) => {
  //       setProcessState("");
  //       setSubtitlesApplicationProgress(0);
  //       (
  //         window as Window
  //       ).location = `/dashboard/projects/${project?.id}/${project?.originalVideoFile}/view`;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setProcessState("");
  //       setSubtitlesApplicationProgress(0);
  //       toast.error(`${err}`);
  //     });
  // };
  const applySubtitles = async () => {
    setProcessState('Rendering Video...');
    try {
      const response = await axiosPrivate.post(`/projects/add-subtitles`, {
        folderId: project?.folder?.id,
        projectId: project?.id,
        styles: { ...template, videoWidth, videoHeight },
        transcriptions: JSON.stringify(subtitles),
      });

      if (response.data.status === 'STARTED') {
        // Process started successfully, waiting for progress updates via WebSocket
      } else {
        setProcessState('');
        setSubtitlesApplicationProgress(0);
      }
    } catch (err) {
      console.log(err);
      setProcessState('');
      setSubtitlesApplicationProgress(0);
      toast.error(`${err}`);
    }
  };

  useEffect(() => {
    let newSubtitles = [...subtitles];

    const textCasing = (text: string) => {
      switch (textCase) {
        case 'SENTENCE':
          return (
            text.trim().charAt(0).toUpperCase() +
            text.trim().slice(1).toLowerCase()
          );
        case 'UPPER':
          return text.toUpperCase();
        case 'LOWER':
          return text.toLowerCase();
        default:
          return text;
      }
    };

    newSubtitles = newSubtitles.map((sub) => ({
      ...sub,
      text: textCasing(sub.text),
    }));

    setSubtitles(newSubtitles);

    if (selectedSubtitle.id) {
      const selected = newSubtitles.find(
        (sub) => sub.id === selectedSubtitle.id
      );
      setSelectedSubtitle(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textCase, project?.subtitles]);
  const handleDrag = (event: any, position: any) => {
    let { y } = position;
    // Flip the y axis
    y = videoHeight - Math.abs(y);

    let alignment: any;
    let assX: any;

    switch (template.Alignment) {
      case 1: // left alignment
        alignment = 1;
        assX = 0;
        break;
      case 2: // center alignment
        alignment = 2;
        assX = videoWidth / 2;
        break;
      case 3: // right alignment
        alignment = 3;
        assX = videoWidth;
        break;
      default:
        alignment = 2;
        assX = 0;
        break;
    }

    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      x: assX,
      y: y - 32,
      Alignment: alignment,
    }));
  };

  console.log(subtitles);
  useEffect(() => {
    if (project?.subtitles?.length > 0) {
      setSubtitles(project?.subtitles);
    }
  }, [project?.subtitles]);

  useEffect(() => {
    const currentSubtitle = subtitles.find((subtitle: any) => {
      const startSeconds = subtitle.start;
      const endSeconds = subtitle.end;
      return currentTime >= startSeconds && currentTime <= endSeconds;
    });

    if (currentSubtitle) {
      setSelectedSubtitle(currentSubtitle);
    }
  }, [currentTime, subtitles]);

  return (
    <div>
      {processState !== '' && (
        <div className="flex w-screen h-screen items-center justify-center fixed top-0 right-0 z-50 bg-black/60">
          <div className="bg-white flex flex-col items-center justify-center space-y-6 rounded-xl p-12 px-32 sm:px-16 md:px-16">
            <h3 className="text-secondary text-xl font-sora sm:text-lg md:text-lg">
              {processState}
            </h3>
            {subtitlesApplicationProgress > 0 && (
              <div className="flex items-center justify-center relative">
                <CircularProgress
                  variant="determinate"
                  value={subtitlesApplicationProgress}
                  size={100}
                />
                <span className="absolute text-primary font-bold text-xl">
                  {subtitlesApplicationProgress}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="w-full space-x-2 items-center justify-between px-2 my-2 hidden sm:flex md:flex">
        <span className="font-sora font-semibold text-xl">
          {project?.projectName}
        </span>
        <StandardButton text="Apply Captions" onClick={applySubtitles} />
      </div>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          className="p-2 py-4 sm:flex sm:items-center sm:justify-center md:!flex-col md:flex md:items-center md:justify-center sm:!flex-col"
          order={{ xs: 4, sm: 4, md: 'unset', lg: 'unset', xl: 'unset' }}
        >
          <TabsSection
            projectName={project?.projectName}
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="max-h-[366px] overflow-y-scroll my-4">
            {/* Tab panes  */}
            {(() => {
              switch (activeTab) {
                case 'Subtitles':
                  return (
                    <Subtitles
                      subtitles={subtitles}
                      deleteSubtitle={deleteSubtitle}
                      handleSubtitleChange={handleSubtitleChange}
                      handleSubtitleClick={handleSubtitleClick}
                      selectedSubtitle={selectedSubtitle}
                    />
                  );
                case 'Font':
                  return (
                    <>
                      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                          <label htmlFor="subtitle" className="sr-only">
                            Active Subtitle
                          </label>
                          <textarea
                            id="subtitle"
                            rows={4}
                            className="w-full outline-none border-none px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Subtitle..."
                            value={selectedSubtitle?.text}
                            onChange={(e) =>
                              handleSubtitleChange(
                                selectedSubtitle,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                          <div className="flex pl-0 space-x-1 sm:pl-2 items-center justify-evenly w-full">
                            <div className="flex items-center space-x-1">
                              <span>
                                <ClockDark />
                              </span>
                              <span>
                                {convertToDigitalClockFormat(
                                  selectedSubtitle?.start
                                )}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>
                                <ClockDark />
                              </span>
                              <span>
                                {convertToDigitalClockFormat(
                                  selectedSubtitle?.end
                                )}
                              </span>
                            </div>
                            <span
                              className="cursor-pointer"
                              onClick={() => deleteSubtitle(selectedSubtitle)}
                            >
                              <DeleteSubtitleIcon />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-2">
                        <FormControl fullWidth>
                          <InputLabel id="size">Font size</InputLabel>
                          <Select
                            value={template.Fontsize}
                            id="size"
                            sx={{ borderRadius: '16px' }}
                            label="Font size"
                            onChange={(e: any) =>
                              setTemplate({
                                ...template,
                                Fontsize: parseInt(e.target.value),
                              })
                            }
                          >
                            {fontSizes?.map((fontSize, idx) => (
                              <MenuItem key={idx} value={fontSize}>
                                {fontSize}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth>
                          <InputLabel id="style">Font style</InputLabel>
                          <Select
                            value={template.Fontname}
                            label="Font style"
                            sx={{ borderRadius: '16px' }}
                            id="style"
                            onChange={(e) =>
                              setTemplate({
                                ...template,
                                Fontname: e.target.value,
                              })
                            }
                          >
                            {fontFamilies?.map((font, idx) => (
                              <MenuItem key={idx} value={font}>
                                {font}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-1 my-2">
                        <FormControl fullWidth>
                          <InputLabel id="style">Change Case</InputLabel>
                          <Select
                            value={textCase}
                            label="Font style"
                            sx={{ borderRadius: '16px' }}
                            id="style"
                            onChange={(e) => setTextCase(e.target.value)}
                          >
                            <MenuItem
                              value={'SENTENCE'}
                              className="flex space-x-2 items-center font-sora"
                            >
                              <span className="font-bold">Aa</span>
                              <span>Sentence Case</span>
                            </MenuItem>
                            <MenuItem
                              value={'UPPER'}
                              className="flex space-x-2 items-center font-sora"
                            >
                              <span className="font-bold">AA</span>
                              <span>Upper Case</span>
                            </MenuItem>
                            <MenuItem
                              value={'LOWER'}
                              className="flex space-x-2 items-center font-sora"
                            >
                              <span className="font-bold">aa</span>
                              <span>Lower Case</span>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 my-2">
                        <label
                          htmlFor="textColor"
                          className="flex cursor-pointer items-center justify-center space-x-2 p-2 rounded-2xl border border-[#DBDBDB]"
                        >
                          <span className="text-secondary text-sm">
                            Font Color
                          </span>
                          <ColorPickerIcon />
                          <input
                            type="color"
                            className="opacity-0"
                            id="textColor"
                            onChange={(e) =>
                              setTemplate({
                                ...template,
                                PrimaryColour: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label
                          htmlFor="backColor"
                          className="flex cursor-pointer items-center justify-center space-x-2 p-2 rounded-2xl border border-[#DBDBDB]"
                        >
                          <span className="text-secondary text-sm">
                            Background Color
                          </span>
                          <ColorPickerIcon />
                          <input
                            type="color"
                            className="opacity-0"
                            id="backColor"
                            onChange={(e) =>
                              setTemplate({
                                ...template,
                                BackColour: e.target.value,
                              })
                            }
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 my-2">
                        <div className="grid grid-cols-3 rounded-2xl p-3 border border-[#DBDBDB]">
                          <span
                            className="border-r border-[#DBDBDB] flex items-center justify-center text-center cursor-pointer"
                            onClick={() =>
                              setTemplate({
                                ...template,
                                Bold: template.Bold === -1 ? 0 : -1,
                              })
                            }
                          >
                            <BoldIcon width={14} height={14} />
                          </span>
                          <span
                            className="border-r border-[#DBDBDB] px-2 flex items-center justify-center text-center cursor-pointer"
                            onClick={() =>
                              setTemplate({
                                ...template,
                                Italic: template.Italic === 1 ? 0 : 1,
                              })
                            }
                          >
                            <ItalicIcon width={14} height={14} />
                          </span>
                          <span
                            className="text-center px-2 flex items-center justify-center cursor-pointer"
                            onClick={() =>
                              setTemplate({
                                ...template,
                                Underline: template.Underline === 1 ? 0 : 1,
                              })
                            }
                          >
                            <UnderlineIcon width={14} height={14} />
                          </span>
                        </div>
                        <div className="grid grid-cols-3 rounded-2xl p-3 border border-[#DBDBDB]">
                          <span
                            className="border-r border-[#DBDBDB] flex items-center justify-center text-center cursor-pointer"
                            onClick={() =>
                              setTemplate({
                                ...template,
                                Alignment: 1,
                              })
                            }
                          >
                            <AlignLeft />
                          </span>
                          <span
                            className="border-r border-[#DBDBDB] px-2 flex items-center justify-center text-center cursor-pointer"
                            onClick={() =>
                              setTemplate({
                                ...template,
                                Alignment: 2,
                              })
                            }
                          >
                            <AlignCenter />
                          </span>
                          <span
                            className="text-center px-2 flex items-center justify-center cursor-pointer"
                            onClick={() =>
                              setTemplate({
                                ...template,
                                Alignment: 3,
                              })
                            }
                          >
                            <AlignRight />
                          </span>
                        </div>
                      </div>
                    </>
                  );
                case 'Templates':
                  return (
                    <div className="grid grid-cols-2 gap-3">
                      {templates?.map((template, idx) => {
                        return (
                          <div
                            key={idx}
                            onClick={() => setTemplate(template)}
                            className="bg-white cursor-pointer shadow-lg hover:shadow-xl flex font-sora font-bold items-center justify-center rounded-xl text-center p-8"
                          >
                            Template {idx + 1}
                          </div>
                        );
                      })}
                    </div>
                  );
                default:
                  return <></>;
              }
            })()}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          className="items-center justify-center flex p-2 bg-secondary h-[500px] sm:h-[300px] md:h-[300px]"
          order={{ xs: 2, sm: 2, md: 'unset', lg: 'unset', xl: 'unset' }}
        >
          <div
            style={{
              width: videoWidth,
              height: videoHeight,
              position: 'relative',
            }}
          >
            <div data-vjs-player>
              <video
                ref={videoNode}
                className="video-js vjs-default-skin"
                style={{ borderRadius: 20 }}
              />
            </div>
            <Draggable bounds="parent" onStop={handleDrag}>
              <div
                className="absolute bottom-8 text-center flex items-center w-full"
                style={{
                  justifyContent:
                    template.Alignment === 1
                      ? 'left'
                      : template.Alignment === 2
                      ? 'center'
                      : template.Alignment === 3
                      ? 'right'
                      : 'center',
                }}
              >
                <p
                  style={{
                    display: 'inline-block',
                    fontSize: template.Fontsize,
                    color: template.PrimaryColour,
                    fontFamily: template.Fontname,
                    lineHeight: 1,
                    fontWeight: template.Bold === -1 ? 600 : 'normal',
                    background:
                      template.BackColour === '&H40000000'
                        ? 'rgba(0, 0, 0, 0.7)'
                        : template.BackColour,
                    fontStyle: template.Italic === 1 ? 'italic' : 'normal',
                    textDecoration:
                      template.Underline === 1 ? 'underline' : 'none',
                  }}
                  className="whitespace-pre-wrap break-words preview_sbt"
                  dangerouslySetInnerHTML={{
                    __html: selectedSubtitle?.text?.trim(),
                  }}
                ></p>
              </div>
            </Draggable>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className="flex items-center ml-0 justify-evenly space-x-4 h-32 border-t-2 border-secondary w-screen"
          order={{ xs: 2, sm: 2, md: 'unset', lg: 'unset', xl: 'unset' }}
        >
          <Grid
            item
            md={4}
            lg={4}
            sm={4}
            xs={4}
            className="sm:hidden md:hidden"
          >
            <StandardButton text="Apply Captions" onClick={applySubtitles} />
          </Grid>
          <Grid
            item
            md={8}
            lg={8}
            sm={8}
            xs={8}
            className="flex items-center justify-center space-x-4"
          >
            <IoPlayBackSharp
              onClick={() => handleSkip(-10)}
              className="text-ternary text-4xl cursor-pointer"
            />
            {player && player.paused() ? (
              <BsFillPlayCircleFill
                onClick={handlePlayPause}
                className="text-ternary text-4xl cursor-pointer"
              />
            ) : (
              <BsFillPauseCircleFill
                onClick={handlePlayPause}
                className="text-ternary text-4xl cursor-pointer"
              />
            )}
            <IoPlayForwardSharp
              onClick={() => handleSkip(10)}
              className="text-ternary text-4xl cursor-pointer"
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          order={{ xs: 3, sm: 3, md: 'unset', lg: 'unset', xl: 'unset' }}
        >
          <div className="w-[85vw] sm:w-[100vw] md:w-[100vw] sm:relative md:relative fixed bottom-2 bg-white p-4 rounded-lg">
            <Timeline
              completed={(currentTime / duration) * 100}
              duration={duration}
              onSeek={handleSeek}
            />{' '}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditingPanel;
