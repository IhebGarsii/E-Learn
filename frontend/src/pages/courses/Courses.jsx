import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../api/coursesAPI";
import CourseCard from "../../components/CourseCard";
import Filter from "../../components/Filter";

function Courses() {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["courses"], queryFn: getAllCourses });

  const [filter, setFilter] = useState([]);
  useEffect(() => {
    setFilter(courses);
  }, [courses]);
  const handleFilterChange = (filteredCourses) => {
    setFilter(filteredCourses);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }
  if (isError) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  return (
    <div className="flex flex-col jsutify-center sm:flex-row py-5 w-full items-start gap-5">
      <div className="border-4 w-full sm:w-fit">
        <Filter onFilterChange={handleFilterChange} courses={courses} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center justify-center w-full  gap-2  ">
        {filter && filter.length > 0 ? (
          filter.map((course) => <CourseCard cours={course} key={course._id} />)
        ) : (
          <div>No course data available</div>
        )}
      </div>
    </div>
  );
}

export default Courses;
