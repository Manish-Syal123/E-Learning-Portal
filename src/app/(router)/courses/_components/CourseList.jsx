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

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    getallCourses();
  }, []);

  // Fetch Course List
  const getallCourses = async () => {
    const res = await getAllCourses();
    // console.log(res);
    setCourseList(res?.courseLists);
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
            <SelectItem value="light">All</SelectItem>
            <SelectItem value="dark">Paid</SelectItem>
            <SelectItem value="system">Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Display Course List */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {courseList.map((item, index) => (
          <div key={index}>
            <CourseItem course={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
