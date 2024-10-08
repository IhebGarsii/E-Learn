import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MultiRangeSlider from "multi-range-slider-react";
import { firstTags } from "../data/data";

function Filter({ onFilterChange, courses }) {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [tags, setTags] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      duration: "",
    },
  });

  useEffect(() => {
    if (selectedCategory.length > 0) {
      const selectedTags = firstTags.find(
        ([category]) => category === selectedCategory[0] // Assuming single category selection
      );
      if (selectedTags) {
        setTags(selectedTags[1]);
      } else {
        setTags([]);
      }
    } else {
      setTags([]);
    }
  }, [selectedCategory]);

  const resetFilter = () => {
    reset();
    setSelectedCategory([]);
    setMinValue(0);
    setMaxValue(100);
    onFilterChange(courses);
  };

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const onSubmitFilter = (data) => {
  

    const filteredCourses = courses.filter((course) => {
      // Check price range
      const isWithinPriceRange =
        course.price >= minValue && course.price <= maxValue;

      // Check if course headTags match selected categories
      const isMatchingHeadTags =
        selectedCategory.length === 0 ||
        selectedCategory.some((category) => course.headTags.includes(category));

      // Check if course tags match selected filters
      const selectedTags = Object.keys(data).filter(
        (key) => data[key] === true
      );
      const isMatchingTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => course.tags.includes(tag)); // Ensure at least one tag matches

      return isWithinPriceRange && isMatchingHeadTags && isMatchingTags;
    });

    console.log("Filtered Courses:", filteredCourses);
    onFilterChange(filteredCourses); // Call the passed function
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitFilter)}
      className="bg-gray-200 p-4 sm:p-5 rounded-md shadow-md w-full overflow-x-hidden"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="duration" className="font-medium">
          Duration
        </label>
        <input
          type="text"
          id="duration"
          className="p-2 border rounded"
          placeholder="Duration"
          {...register("duration")}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="price" className="font-medium">
          PRICE a day
        </label>
        <MultiRangeSlider
          min={0}
          max={300}
          step={5}
          minValue={minValue}
          maxValue={maxValue}
          onInput={handleInput}
          className="w-full"
        />
        <div className="flex justify-between">
          <span>{minValue}</span>
          <span>{maxValue}</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="font-medium">CATEGORY</h2>
        <select
          multiple
          onChange={(e) =>
            setSelectedCategory(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          {firstTags.map(([category]) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="font-medium">Tags</h2>
        {tags.map((tag) => (
          <div className="flex items-center space-x-2" key={tag}>
            <input type="checkbox" id={tag} {...register(tag)} />
            <label htmlFor={tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </label>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Filter
        </button>
        <button
          type="button"
          onClick={resetFilter}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default Filter;
