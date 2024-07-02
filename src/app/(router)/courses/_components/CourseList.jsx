import { getAllCourses } from "@/actions";
import React, { useContext, useEffect, useState } from "react";
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
import { UserMemberContext } from "@/app/_context/UserMemberContext";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // Store the original list of all courses
  const [filter, setFilter] = useState("all"); // State for the selected filter option
  const [loading, setLoading] = useState(true);
  const { search, setSearch } = useContext(UserMemberContext);

  useEffect(() => {
    getallCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [search, filter]);
  // Fetch Course List
  const getallCourses = async () => {
    setLoading(true);
    const res = await getAllCourses();
    setCourseList(res?.courseLists || []); // Handling case where res.courseLists might be undefined
    setAllCourses(res?.courseLists || []);
    setLoading(false);
  };

  const filterCourses = async () => {
    let tempFilterCourses = [...allCourses];
    if (search) {
      tempFilterCourses = tempFilterCourses.filter((curElem) => {
        return curElem.name.toLowerCase().includes(search);
      });
      setCourseList(tempFilterCourses);
    } else {
      setCourseList(allCourses); // Reset to original list if search is empty
    }

    // based on DropDown : Free or Paid
    if (filter === "free") {
      tempFilterCourses = tempFilterCourses.filter((course) => course?.free);
      setCourseList(tempFilterCourses);
    } else if (filter === "paid") {
      tempFilterCourses = tempFilterCourses.filter((course) => !course?.free);
      setCourseList(tempFilterCourses);
    } else if (filter === "all") {
      setCourseList(allCourses);
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      {/* Title and Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-primary">All Courses</h2>
        {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="free">Free</SelectItem>
          </SelectContent>
        </Select> */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-12 py-1 border-[1.7px] rounded-2xl hover:border-primary hover:border-2"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="free">Free</option>
        </select>
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
