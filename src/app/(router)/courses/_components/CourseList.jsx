import { getAllCourses } from "@/actions";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseItem from "./CourseItem";
import { Rabbit } from "lucide-react";
import Link from "next/link";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getallCourses();
  }, []);

  // Fetch Course List
  const getallCourses = async () => {
    setLoading(true);
    const res = await getAllCourses();
    setCourseList(res?.courseLists || []); // Handling case where res.courseLists might be undefined
    setLoading(false);
  };

  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      {/* Title and Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-primary">All Courses</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="free">Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Display Course List */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div
              key={index}
              className="w-full h-[240px] rounded-xl m-2 bg-slate-200 animate-pulse flex flex-col p-3"
            >
              <div className="flex-1 bg-slate-400 rounded-xl"></div>
              <div className="p-4">
                <div className="h-4 bg-slate-400 rounded-lg mb-2"></div>
                <div className="h-4 bg-slate-400 rounded-lg mb-2 w-36"></div>
                <div className="h-4 bg-slate-400 rounded-lg w-24"></div>
              </div>
            </div>
          ))
        ) : courseList.length > 0 ? (
          courseList.map((item, index) => (
            <Link href={"/course-preview/" + item.slug} key={index}>
              <div>
                <CourseItem course={item} />
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 lg:ml-80 w-full h-full">
            <Rabbit size={150} />
            <h2 className="font-bold text-xl">No Courses Found!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
