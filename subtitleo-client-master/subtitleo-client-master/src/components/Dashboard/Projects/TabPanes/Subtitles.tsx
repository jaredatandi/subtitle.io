import React from "react";
import { Subtitle } from "../Subtitle";
type Props = {
  subtitles: any[];
  deleteSubtitle: any;
  selectedSubtitle: any;
  handleSubtitleClick: any;
  handleSubtitleChange: any;
};

const Subtitles = ({
  subtitles,
  deleteSubtitle,
  selectedSubtitle,
  handleSubtitleClick,
  handleSubtitleChange,
}: Props) => {
  return (
    <>
      {subtitles?.map((subtitle: any, idx: number) => {
        return (
          <Subtitle
            subtitle={subtitle}
            deleteSubtitle={deleteSubtitle}
            key={idx}
            isSelected={selectedSubtitle.id === subtitle.id}
            onSubtitleClick={handleSubtitleClick}
            onSubtitleChange={handleSubtitleChange}
          />
        );
      })}
    </>
  );
};

export default Subtitles;
