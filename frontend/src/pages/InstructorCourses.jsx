import React, { useState } from "react";
import TagInput from "../components/TagInput";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AddCourse } from "../api/coursesAPI";

function InstructorCourses() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([]);
  const [headTags, setHeadTags] = useState([]);

  const handleTagsChange = (newTags) => {
    setTags(newTags);
    setValue(
      "tags",
      newTags.map((tag) => tag.text)
    ); // Update form state
  };

  const handleHeadTagsChange = (newTags) => {
    setHeadTags(newTags);
    setValue(
      "headTags",
      newTags.map((tag) => tag.text)
    ); // Update form state
  };

  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationFn: (formData) => AddCourse(formData),
    onSuccess: () => alert("Course added successfully!"),
    onError: (error) => alert(`Error: ${error.message}`),
  });

  const submitCourse = async (data) => {
    const formData = new FormData();

    // Append form fields to FormData
    Object.keys(data).forEach((key) => {
      if (key !== "tags" && key !== "headTags" && data[key]) {
        formData.append(key, data[key]);
      }
    });

    // Append tags separately
    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tag) => formData.append("tags", tag));
    }

    // Append headTags separately
    if (data.headTags && Array.isArray(data.headTags)) {
      data.headTags.forEach((tag) => formData.append("headTags", tag));
    }

    // Handle file upload for thumbnail
    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    // Handle file upload for video
    if (data.video && data.video[0]) {
      formData.append("video", data.video[0]);
    }

    // Send form data to the API
    mutate(formData);
  };

  return (
    <div className="w-full h-screen lg:w-[40%] mx-auto">
      <form
        onSubmit={handleSubmit(submitCourse)}
        className="w-full flex flex-col gap-2"
      >
        <label htmlFor="title">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="bg-gray-200 rounded-md"
          type="text"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <label htmlFor="description">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="bg-gray-200 h-auto rounded-md p-2"
          rows="4"
        ></textarea>
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <label htmlFor="difficulty">Difficulty Level:</label>
        <select
          {...register("difficulty", {
            required: "Difficulty level is required",
          })}
          className="bg-gray-200 rounded-md"
          id="difficulty"
        >
          <option value="" disabled>
            Select difficulty level
          </option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        {errors.difficulty && (
          <p className="text-red-500">{errors.difficulty.message}</p>
        )}

        <label htmlFor="price">Price:</label>
        <input
          {...register("price")}
          type="text"
          className="bg-gray-200 rounded-md"
        />

        <label htmlFor="duration">Duration</label>
        <input
          {...register("duration")}
          type="text"
          className="bg-gray-200 rounded-md"
        />

        <label htmlFor="language">Language</label>
        <input
          {...register("language")}
          type="text"
          className="bg-gray-200 rounded-md"
        />

        <label htmlFor="format">Format</label>
        <input
          {...register("format")}
          type="text"
          className="bg-gray-200 rounded-md"
        />

        <label htmlFor="tags">Tags:</label>
        <TagInput tags={tags} onTagsChange={handleTagsChange} />

        <label htmlFor="headTags">Head Tags:</label>
        <TagInput tags={headTags} onTagsChange={handleHeadTagsChange} />

        <label htmlFor="thumbnail">Thumbnail:</label>
        <input
          {...register("thumbnail")}
          type="file"
          className="bg-gray-200 w-full rounded-md"
        />

        <label htmlFor="video">Video:</label>
        <input
          {...register("video")}
          type="file"
          accept="video/*"
          className="bg-gray-200 w-full rounded-md"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {isError && <p className="text-red-500">Error: {error.message}</p>}
        {isSuccess && (
          <p className="text-green-500">Course added successfully!</p>
        )}
      </form>
    </div>
  );
}

export default InstructorCourses;
