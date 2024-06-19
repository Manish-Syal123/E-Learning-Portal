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
    console.log(" Error while Fetching Course List : ", error);
  }
};

//Get SideBanners
export const getSideBanners = async () => {
  try {
    const res = await GlobalApi.getSideBanner();
    if (res && res?.sideBanners && res?.sideBanners?.length > 0) {
      return res;
    }
  } catch (error) {
    console.log(" Error while Fetching SideBanners : ", error);
  }
};
