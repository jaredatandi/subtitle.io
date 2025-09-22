import DashboardLayout from "layout/DashboardLayout";
import React, { useEffect, useRef, useState } from "react";
import Spinner from "components/shared/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import useDispatch from "app/TypedUseDispatch";
import { getProjectById } from "app/features/projects/projectsSlice";
import { useParams } from "react-router-dom";
import videojs from "video.js";
import StandardButton from "components/shared/Buttons/StandardButton";
import { Helmet } from "react-helmet";

const ViewProject = () => {
  const [player, setPlayer] = useState<any>(null);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);

  const project: any = useSelector(
    (state: RootState) => state.projects.project
  );
  const dispatch = useDispatch();
  const videoNode = useRef<HTMLVideoElement | null>(null);

  const { projectId } = useParams();

  useEffect(() => {
    dispatch(getProjectById({ projectId }));
  }, [projectId, dispatch]);

  useEffect(() => {
    const videoOptions = {
      controls: true,
      aspectRatio:
        Object.keys(project).length > 0
          ? `${project.dimensions.width}:${project.dimensions.height}`
          : "16:9",
      sources: [
        {
          src: `${project.subtitledVideoFile}`,
          type: "video/mp4",
        },
      ],
    };
    if (videoNode.current) {
      const newPlayer = videojs(videoNode.current, videoOptions);

      newPlayer.on("loadedmetadata", function (this: any) {
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
      });

      setPlayer(newPlayer);
    }
    return () => {
      if (player) {
        player.dispose();
        setPlayer(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  function downloadFile(u: any) {
    // The URL of the file you want to download
    const url = u;

    // Create new link element
    const a: any = document.createElement("a");

    // Set the href and download attributes of the link
    a.href = url;
    a.download = url.split("/").pop();

    // Append the link to the body
    document.body.appendChild(a);

    // Simulate click
    a.click();

    // Remove the link from the body
    document.body.removeChild(a);
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>View Project - SubtitleO</title>
      </Helmet>
      <div className="flex items-center justify-center py-12 flex-col space-y-8">
        {Object.keys(project).length > 0 ? (
          <div
            style={{
              width: videoWidth,
              height: videoHeight,
              position: "relative",
            }}
          >
            <div data-vjs-player>
              <video
                ref={videoNode}
                className="video-js vjs-default-skin"
                style={{ borderRadius: 20 }}
              />
            </div>
          </div>
        ) : (
          <div>
            <Spinner />
          </div>
        )}
        <div className="flex space-x-16 items-center">
          <StandardButton
            text="Download Video"
            onClick={() => downloadFile(project?.subtitledVideoFile)}
          />
          <StandardButton
            text="Download Captions"
            onClick={() => downloadFile(project?.subtitlesFile)}
          />
        </div>
        <div className="flex space-x-16 items-center">
          <StandardButton
            text="Join our Facebook group"
            onClick={() => {
              (window as Window).open(
                "https://web.facebook.com/groups/subtitleo"
              );
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewProject;
