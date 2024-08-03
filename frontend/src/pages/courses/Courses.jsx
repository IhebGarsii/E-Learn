import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
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
  if (isLoading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }
  if (isError) {
    return <div>Error: {error.message}</div>; // Display error message
  }
  return (
    <div className="flex gap-2 flex-col md:flex-row items-center">
      <Filter courses={courses} />

      {courses &&
        courses.map((cours) => <CourseCard cours={cours} key={cours._id} />)}
    </div>
  );
}

export default Courses;
