import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TagInput({ tags, onTagsChange }) {
  const [tag, setTag] = useState("");

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    const newTag = tag.trim();

    if (key === "," || key === "Enter") {
      e.preventDefault();
      if (newTag && !tags.some((t) => t.text === newTag)) {
        const updatedTags = [...tags, { id: uuidv4(), text: newTag }];
        onTagsChange(updatedTags);
      }
      setTag("");
    } else if (key === "Backspace" && !newTag.length && tags.length) {
      e.preventDefault();
      const updatedTags = tags.slice(0, -1);
      onTagsChange(updatedTags);
      setTag(tags[tags.length - 1]?.text || "");
    }
  };

  const removeTag = (id) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    onTagsChange(updatedTags);
  };

  return (
    <div className="p-2 border border-black flex gap-2 flex-wrap">
      {tags.map(({ id, text }) => (
        <div key={id} className="p-2 border gap-2 flex items-center">
          <span>{text}</span>
          <button
            className="text-white bg-red-700 w-6 h-[100%] flex items-center justify-center rounded"
            onClick={() => removeTag(id)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={tag}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </div>
  );
}

export default TagInput;
