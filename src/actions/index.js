"use server";

const { default: GlobalApi } = require("@/app/_utils/GlobalApi");

// Fetch Course List
export const getAllCourses = async () => {
  try {
    const res = await GlobalApi.getAllCourseList();
    if (res && res?.courseLists && res?.courseLists?.length > 0) {
      return res;
    }
  } catch (error) {
    console.log(" Error in Fetch Course List : ", error);
  }
};
