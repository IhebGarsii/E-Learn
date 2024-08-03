import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { firstTags } from "../data/data";
import MultiRangeSlider from "multi-range-slider-react";

function Filter({ courses }) {
  const [filter, setFilter] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [tags, setTags] = useState([]);

  const { register, handleSubmit, reset, getValues } = useForm();

  useEffect(() => {
    setFilter(courses);
  }, [courses]);

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
    setFilter(courses);
    setSelectedCategory([]);
    setMinValue(0);
    setMaxValue(100);
  };

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const onSubmitFilter = (data) => {
    console.log("Form Data:", data);
    console.log("Selected Category:", selectedCategory);
    console.log("Min Value:", minValue);
    console.log("Max Value:", maxValue);

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

      console.log("Course:", course);
      console.log("isWithinPriceRange:", isWithinPriceRange);
      console.log("isMatchingHeadTags:", isMatchingHeadTags);
      console.log("isMatchingTags:", isMatchingTags);

      return isWithinPriceRange && isMatchingHeadTags && isMatchingTags;
    });

    console.log("Filtered Courses:", filteredCourses);
    setFilter(filteredCourses);
  };


  return (
    <form onSubmit={handleSubmit(onSubmitFilter)} className="car-list-filter">
      <div className="availability">
        <h3>AVAILABLE ON</h3>
        <div className="date-filter-container">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            className="date-filter"
            placeholder="Duration"
            {...register("duration")}
          />
        </div>
      </div>
      <div className="price-filter">
        <label htmlFor="price">PRICE a day</label>
        <MultiRangeSlider
          min={0}
          max={300}
          step={5}
          minValue={minValue}
          maxValue={maxValue}
          onInput={handleInput}
        />
        <div className="ranged-input">
          <span>{minValue}</span> <span>{maxValue}</span>
        </div>
        <div className="filter-select">
          <h2>CATEGORY</h2>
          <select
            multiple
            onChange={(e) =>
              setSelectedCategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="filter-select"
          >
            <option value="">Select Category</option>
            {firstTags.map(([category]) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-checkbox">
          <h2>Tags</h2>
          {tags.map((tag) => (
            <div className="filter-label" key={tag}>
              <input type="checkbox" id={tag} {...register(tag)} />
              <label htmlFor={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-actions">
        <button type="submit">Filter</button>
        <button type="button" onClick={resetFilter}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default Filter;
