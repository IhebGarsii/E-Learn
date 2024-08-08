import React, { useState } from "react";
import img from "../assets/arrow-dwon.png";
function CourseContent({ video }) {
  // Use an object to store the dropdown state for each item
  const [dropdowns, setDropdowns] = useState({});

  const handleDrop = (index) => {
    setDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the dropdown state for the clicked index
    }));
  };

  return (
    <div className="border-2">
      {video &&
        video.map((vid, index) => (
          <div key={index}>
            <h1
              className="flex  items-center  gap-2"
              onClick={() => handleDrop(index)}
            >
              <img className="w-3  " src={img} /> <span> {vid.title}</span>
            </h1>
            {dropdowns[index] && (
              <ul>
                {vid.videoList.map((video, vidIndex) => (
                  <div className="flex" key={vidIndex}>
                    <span className="flex flex-col">{video.videoName}:</span>
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}
    </div>
  );
}

export default CourseContent;
