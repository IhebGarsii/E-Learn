import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useParams } from "react-router-dom";
import { getCourse } from "../api/coursesAPI";
import { FaVideo, FaCloudDownloadAlt, FaInfinity } from "react-icons/fa";
import { MdArticle, MdAccessTimeFilled } from "react-icons/md";
import CourseContent from "../components/CourseContent";
function CourseDetail() {
  const { idCourse } = useParams(); // Extract course ID from URL params
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownItems = ["Option 1", "Option 2", "Option 3"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Fetch course data using React Query
  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", idCourse], // Unique key based on course ID
    queryFn: () => getCourse(idCourse),
    enabled: !!idCourse, // Ensure query is only run if idCourse is available
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course data.</div>;
  if (!course) return <div>No course found.</div>;

  return (
    <div className="flex flex-col md:flex-row mt-20 lg:w-[90%] mx-auto gap-10 items-center ">
      <div className="flex-1 md:flex-[1_1_70%] p-4">
        <div className="md:h-40% ">
          <h1 className="text-4xl">{course.title}</h1>
          <div className="flex   items-center">
            <span> {course.avgRate.rate} </span>
            <span>
              <Rating
                className="text-xs"
                style={{ maxWidth: 250, width: 100 }}
                value={course.avgRate.rate}
                readOnly
              />
            </span>
            <span>({course.avgRate.nbRate} ratings)</span>
          </div>
          <span>{course.studentsId.length} students</span>
          <span>Created By {course.instructorId} </span>
          <span>Last Updated {course.lastUpdated} </span>
        </div>
        <div className="shadow-md border mb-2 p-2 mt-2 box-sizing-border-box">
          <h1 className="text-lg font-bold">What you'll learn</h1>
          <div className="md:grid md:grid-cols-2 gap-2">
            {course.learnTarget.map((learn, index) => (
                <p key={index} className="p-1 text-sm">
                  &#10003; {learn}
                </p>
            ))}
          </div>
        </div>

        <div className="">
          <h1 className="font-semibold">This course includes</h1>
          <ul>
            <li className="text-sm flex   items-center gap-2">
              <FaVideo /> {course.videoDuration} hours on-demand video
            </li>
            <li className="text-sm flex   items-center gap-2">
              <MdArticle /> {course.articles}
            </li>
            <li className="text-sm flex   items-center gap-2">
              <FaCloudDownloadAlt /> {course.downloadNb}
            </li>
            <li className="text-sm flex   items-center gap-2">
              <MdAccessTimeFilled /> {course.timeAccess}
            </li>
          </ul>
        </div>
        <CourseContent video={course.video} />
        <h1 className="text-xl font-bold">Requirments: </h1>
        <p> {course.requirments} </p>
        <h1 className="text-xl font-bold">Description: </h1>
        <p> {course.description} </p>
      </div>
      <div className=" flex-1 md:flex-[1_1_30%] shadow-md border mb-20   p-4">
        <div className="flex w-[100%] flex-col gap-5">
          <video className=" w-full h-52 " controls>
            <source
              src="https://www.youtube.com/watch?v=fQTsENCG7YU"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className=" flex flex-col">
            <div className=" flex flex-col w-[100%] gap-4  ">
              <span className="text-4xl font-bold  "> ${course.price} </span>
              <button className=" w-[90%] md:w-[70%] bg-dark-blue text-white text-xl rounded h-10 mx-auto   ">
                Add to cart
              </button>
              <button className=" w-[90%] md:w-[70%] border-2 border-black text-black text-xl rounded h-10 mx-auto   ">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="w-[100%]    ">
          <h2>Explore Related Topics</h2>
          <div className="flex gap-2 ">
            {course.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center justify-center rounded-lg font-semibold  w-20 min-h-10 bg-white border-2 border-black"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 bg-white w-[77%]     flex justify-center  py-3 md:hidden ">
        <span className="text-4xl font-bold  "> ${course.price} </span>
        <button className="  bg-dark-blue  text-white text-xl rounded h-12 w-[80%] mx-auto    ">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default CourseDetail;
