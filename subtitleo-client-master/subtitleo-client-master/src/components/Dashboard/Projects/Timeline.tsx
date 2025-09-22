import React, { useEffect, useRef } from "react";

const Timeline = ({ completed, duration, onSeek }: any) => {
  const canvasRef: any = useRef(null);
  const draggableRef = useRef(false);
  const padding = 20; // Adjust this value as needed
  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");

    const totalWidth = canvas.offsetWidth;
    const totalHeight = canvas.offsetHeight;

    // Set canvas dimensions to match the display size
    canvas.width = totalWidth;
    canvas.height = totalHeight;

    context.font = "10px Arial"; // Adjust as needed

    // Clear canvas before drawing
    context.clearRect(0, 0, totalWidth, totalHeight);

    // Manually add '0' seconds mark
    context.fillStyle = "#000000";
    context.fillText("0", 15, totalHeight / 2.5);
    // Draw timeline
    const seconds = Math.ceil(duration);

    for (let i = 0; i <= seconds; i++) {
      let x;

      if (i === 0) {
        // It's the first tick, add some padding
        x = padding;
      } else if (i === seconds) {
        // It's the last tick, subtract some padding
        x = Math.floor((i / seconds) * (totalWidth - 2 * padding)) + padding;
      } else {
        // It's a tick in the middle, divide the width evenly
        x = Math.floor((i / seconds) * (totalWidth - 2 * padding)) + padding;
      }

      const height = i % 10 === 0 ? totalHeight / 2 : totalHeight / 4; // Larger tick every 10 seconds
      const tickWidth = i % 10 === 0 ? 1 : 0.5;

      context.fillStyle = "#000000";
      context.fillRect(x, totalHeight - height, tickWidth, height);

      if (i % 10 === 0 && i !== 0) {
        context.fillStyle = "#000000";
        context.fillText(i.toString(), x + tickWidth - 6, totalHeight / 2.5);
      }
    }

    // Progress line
    const progressX =
      Math.floor((completed / 100) * (totalWidth - 2 * padding)) + padding;
    context.beginPath();
    context.moveTo(progressX, 0);
    context.lineTo(progressX, totalHeight);
    context.strokeStyle = "#084A9B";
    context.lineWidth = 3;
    context.stroke();

    const triangleHeight = 10;
    const triangleOffset = 3;
    context.beginPath();
    context.moveTo(progressX, 0 - triangleOffset);
    context.lineTo(
      progressX - triangleHeight / 2,
      triangleHeight - triangleOffset
    );
    context.lineTo(
      progressX + triangleHeight / 2,
      triangleHeight - triangleOffset
    );
    context.lineTo(progressX, 0 - triangleOffset);
    context.fillStyle = "#084A9B";
    context.fill();
  }, [completed, duration]);

  const handleMouseDown = () => {
    draggableRef.current = true;
  };

  const handleMouseUp = () => {
    draggableRef.current = false;
  };

  const handleMouseMove = (event: any) => {
    if (draggableRef.current) {
      if (onSeek) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = (x - padding) / (rect.width - 2 * padding); // Adjusting for padding here
        onSeek(percentage);
      }
    }
  };

  const handleMouseClick = (event: any) => {
    if (onSeek) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = (x - padding) / (rect.width - 2 * padding); // Adjusting for padding here
      onSeek(percentage);
    }
  };
  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "75px" }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleMouseClick}
    />
  );
};

export default Timeline;
