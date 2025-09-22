import Clock from "assets/images/svg_based/Clock";
import DeleteSubtitleIcon from "assets/images/svg_based/DeleteSubtitleIcon";
import { useRef, useState } from "react";
import { convertToDigitalClockFormat } from "utils/convertToDigitalClockFormat";

export const Subtitle = ({
  subtitle,
  onSubtitleClick,
  onSubtitleChange,
  deleteSubtitle,
}: any) => {
  const [text, setText] = useState("");

  const handleSubtitleClick = () => {
    onSubtitleClick(subtitle);
  };
  const editableRef = useRef(null);
  const handleSubtitleChange = (e: any) => {
    e.preventDefault();
    const selection: any = document.getSelection();
    const range = selection.getRangeAt(0);

    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    const updatedText = e.target.innerText;
    setText(updatedText);
    onSubtitleChange(subtitle, updatedText);

    setTimeout(() => {
      const restoredRange = document.createRange();
      restoredRange.setStart(e.target.childNodes[0], startOffset);
      restoredRange.setEnd(e.target.childNodes[0], endOffset);
      selection.removeAllRanges();
      selection.addRange(restoredRange);
    }, 0);
  };

  return (
    <div className="relative">
      <div
        className={`min-h-24 h-24 cursor-pointer w-full flex space-x-2 items-center relative`}
        onClick={handleSubtitleClick}
      >
        <span className="bg-[#E7E7E7] rounded-md h-1/2 w-2" />
        <div
          contentEditable={true}
          className="select-none w-4/5 flex items-center overflow-y-scroll h-full text-sm font-sora flex-wrap outline-none font-mulish whitespace-pre-wrap break-words"
          suppressContentEditableWarning={true}
          onInput={handleSubtitleChange}
          ref={editableRef}
        >
          {text ? text : subtitle?.text}
        </div>
      </div>
      <span
        className="absolute right-6 top-1/2 cursor-pointer"
        onClick={() => deleteSubtitle(subtitle)}
      >
        <DeleteSubtitleIcon />
      </span>
      <div className="text-[#B7B7B7] text-xs font-light flex space-x-4  items-center">
        <div className="flex items-center space-x-1">
          <span>
            <Clock />
          </span>
          <span>{convertToDigitalClockFormat(subtitle?.start)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>
            <Clock />
          </span>
          <span>{convertToDigitalClockFormat(subtitle?.end)}</span>
        </div>
      </div>
    </div>
  );
};
