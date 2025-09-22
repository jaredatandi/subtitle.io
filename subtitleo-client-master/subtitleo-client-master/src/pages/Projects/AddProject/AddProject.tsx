import Upload from "assets/images/svg_based/Upload";
import DashboardLayout from "layout/DashboardLayout";
import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFoldersHelper from "helpers/Folders/FoldersHelper";
// import { toast } from "react-toastify";
import { axiosPrivate } from "service/axios";
import CircularProgress from "@mui/material/CircularProgress";
import ProjectIcon from "assets/images/svg_based/Project";
import { useNavigate } from "react-router-dom";
import Spinner from "components/shared/Spinner/Spinner";
import { Helmet } from "react-helmet";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//Chunk Size
const chunkSize = 10 * 1024 * 1024;

const AddProject = () => {
  const [folder, setFolder] = React.useState<any>({});
  const selectedFolder = new URLSearchParams(window.location.search).get(
    "folder"
  );
  const [files, setFiles] = React.useState<any>([]);
  const [currentFileIndex, setCurrentFileIndex] = React.useState<any>(null);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] =
    React.useState<any>(null);
  const [currentChunkIndex, setCurrentChunkIndex] = React.useState<any>(null);
  const [processState, setProcessState] =
    React.useState<string>("Uploading Media...");

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setFolder(value);
  };

  const navigate = useNavigate();

  const { folders } = useFoldersHelper();

  React.useEffect(() => {
    if (folders?.length > 0 && !selectedFolder) {
      setFolder(folders[0]);
    }
  }, [folders, selectedFolder]);
  React.useEffect(() => {
    if (selectedFolder && folders?.length > 0) {
      setFolder(
        folders?.find((folder) => folder?.id === parseInt(selectedFolder))
      );
    }
  }, [selectedFolder, folders]);

  // const onFileChange = (event: any) => {
  //   const chosenFile = event.target.files[0];
  //   handleFileSelection(chosenFile);
  // };

  const handleFileSelection = (e: any) => {
    // if (!file.type.startsWith("video/")) {
    //   toast.error("Only video files are allowed");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("video", file);
    // formData.append("folderId", folder?.id);

    // axiosPrivate
    //   .post("/projects/upload", formData, {
    //     onUploadProgress: (progressEvent: any) => {
    //       const progress = Math.round(
    //         (progressEvent.loaded / progressEvent.total) * 100
    //       );
    //       setUploadProgress(progress);
    //       if (progress === 100) {
    //         setProcessState("Transcribing...");
    //       }
    //     },
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) => {
    //     const { id } = response.data;
    //     const { viewKey } = response.data;
    //     navigate(`/dashboard/projects/${id}/${viewKey}/edit`);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     toast.error("An error occurred during the upload");
    //     setFile(null);
    //   });

    // setFile(file);
    e.preventDefault();
    setFiles([...files, ...e.target.files]);
  };

  // const onDrop = (event: any) => {
  //   event.preventDefault();
  //   const droppedFile = event.dataTransfer.files[0];
  //   handleFileSelection(droppedFile);
  // };

  const openFileDialog = () => {
    document.getElementById("video")?.click();
  };

  function handleDrop(e: any) {
    e.preventDefault();
    setFiles([...files, ...e.dataTransfer.files]);
  }

  function readAndUploadCurrentChunk() {
    const reader = new FileReader();
    const file: any = files[currentFileIndex];
    if (!file) {
      return;
    }
    const from = currentChunkIndex * chunkSize;
    const to = from + chunkSize;
    const blob = file.slice(from, to);
    reader.onload = (e) => uploadChunk(e);
    reader.readAsDataURL(blob);
  }

  async function uploadChunk(readerEvent: any) {
    const file: any = files[currentFileIndex];
    const data = readerEvent.target.result;
    const params = new URLSearchParams();
    params.set("name", file.name);
    params.set("size", file.size);
    params.set("currentChunkIndex", currentChunkIndex);
    params.set("totalChunks", String(Math.ceil(file.size / chunkSize)));
    params.set("folderId", folder?.id);
    await axiosPrivate
      .post("/projects/upload?" + params.toString(), data, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      })
      .then(async (response) => {
        const file = files[currentFileIndex];
        const filesize = files[currentFileIndex].size;
        const chunks = Math.ceil(filesize / chunkSize) - 1;
        const isLastChunk = currentChunkIndex === chunks;
        if (isLastChunk) {
          file.finalFilename = response.data.finalFilename;
          setLastUploadedFileIndex(currentFileIndex);
          setCurrentChunkIndex(null);
          setProcessState("Transcribing...");
          await axiosPrivate
            .post(
              `/projects/transcribe?fileName=${response.data.finalFilename}&folderId=${folder?.id}`
            )
            .then((response) => {
              const { id } = response.data;
              const { viewKey } = response.data;
              navigate(`/dashboard/projects/${id}/${viewKey}/edit`);
            });
        } else {
          setCurrentChunkIndex(currentChunkIndex + 1);
        }
      });
  }

  React.useEffect(() => {
    if (lastUploadedFileIndex === null) {
      return;
    }
    const isLastFile = lastUploadedFileIndex === files.length - 1;
    const nextFileIndex = isLastFile ? null : currentFileIndex + 1;
    setCurrentFileIndex(nextFileIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUploadedFileIndex]);

  React.useEffect(() => {
    if (files.length > 0) {
      if (currentFileIndex === null) {
        setCurrentFileIndex(
          lastUploadedFileIndex === null ? 0 : lastUploadedFileIndex + 1
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files.length]);

  React.useEffect(() => {
    if (currentFileIndex !== null) {
      setCurrentChunkIndex(0);
    }
  }, [currentFileIndex]);

  React.useEffect(() => {
    if (currentChunkIndex !== null) {
      readAndUploadCurrentChunk();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChunkIndex]);

  return (
    <DashboardLayout>
      <Helmet>
        <title>Add Project - SubtitleO</title>
      </Helmet>
      <div className="flex items-center justify-center py-12 flex-col space-y-8 dark:bg-[#292929]">
        {Object.keys(folder).length > 0 ? (
          <label
            htmlFor="video"
            className="bg-white flex shadow-2xl items-center justify-center flex-col border border-dashed border-black p-16 rounded-[20px] dark:bg-[#292929] dark:border-white"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <Upload />
            <h2 className="text-lg font-semibold font-sora text-[#8C8C8C] dark:text-white">
              Drag & Drop a file here...
            </h2>
            <span className="font-sora font-light text-[#8C8C8C] text-lg dark:text-white">
              or
            </span>
            <button className="cursor-pointer text-primary font-sora text-base font-normal rounded-md p-2 border border-[#8C8C8C] dark:text-white">
              Browse files
            </button>
          </label>
        ) : (
          <div>
            <Spinner />
          </div>

        )}
        <input
          type="file"
          accept="video/*"
          name="video"
          disabled={Object.keys(folder)?.length === 0}
          id="video"
          className="hidden"
          onChange={handleFileSelection}
        />
        {files.map((file: any, fileIndex: any) => {
          let progress = 0;
          if (file.finalFilename) {
            progress = 100;
          } else {
            const uploading = fileIndex === currentFileIndex;
            const chunks = Math.ceil(file.size / chunkSize);
            if (uploading) {
              progress = Math.round((currentChunkIndex / chunks) * 100);
            } else {
              progress = 0;
            }
          }
          return (
            <div
              key={fileIndex}
              className="flex w-screen h-screen items-center  justify-center fixed -top-8 right-0 z-50 bg-black/60"
            >
              <div className="bg-white flex flex-col items-center sm:w-5/6 md:w-5/6 justify-center space-y-6 rounded-xl p-12 px-32 sm:px-16 md:px-16">
                <h3 className="text-secondary text-xl font-sora sm:text-lg md:text-lg">
                  {processState}
                </h3>
                <div className="flex items-center justify-center relative">
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={100}
                  />
                  <span className="absolute text-primary font-bold text-xl">
                    {progress}%
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:flex-col">
                  <ProjectIcon width={50} height={50} />
                  <p className="font-sora text-secondary text-lg whitespace-pre-wrap sm:text-sm md:text-sm">
                    {file?.name?.slice(0, 50)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {/* {files.map((file: any, fileIndex: any) => {
          let progress = 0;
          if (file.finalFilename) {
            progress = 100;
          } else {
            const uploading = fileIndex === currentFileIndex;
            const chunks = Math.ceil(file.size / chunkSize);
            if (uploading) {
              progress = Math.round((currentChunkIndex / chunks) * 100);
            } else {
              progress = 0;
            }
          }
          return (
            <a
              className="file"
              href={"http://localhost:4001/uploads/" + file.finalFilename}
            >
              <div className="name">{file.name}</div>
              <div
                className={"progress " + (progress === 100 ? "done" : "")}
                style={{ width: progress + "%" }}
              >
                {progress}%
              </div>
            </a>
          );
        })} */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="folder" className="dark:text-white" >Select a folder</InputLabel>
          <Select
            labelId="folder"
            id="folder"
            value={folder}
            onChange={handleChange}
            input={<OutlinedInput label="Select a folder"/>}
            MenuProps={MenuProps}
            className="dark:text-white"
          >
            {folders.map((folder, idx) => (
              <MenuItem key={idx} value={folder}>
                {folder?.folderName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className=" bg-[#fff]/50 flex flex-col text-base sm:text-sm md:text-sm justify-center items-center w-8/12 p-6 sm:w-11/12 md:w-11/12 rounded-[29px] dark:bg-[#323232]">
          <span className="font-sora font-semibold text-primary text-xl ">Notes</span>
          <div className="font-sora pt-4 dark:text-white">1. Upload Your Video: Simply drag and drop your video file or paste a URL into Subtitleo,
            and our platform will start generating captions instantly.</div>
          <div className="font-sora pt-4 dark:text-white">2. Customize Your Captions: Adjust the font, size, color, and positioning of your captions
            to match your branding and style preferences.</div>
          <div className="font-sora pt-4 dark:text-white">3. Review and Edit: Use our intuitive editor to review the automatically generated captions,
            make any necessary changes, and ensure your message is perfectly conveyed.</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProject;
