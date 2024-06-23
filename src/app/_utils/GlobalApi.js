import { gql, request } from "graphql-request";

const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/" +
  process.env.NEXT_PUBLIC_HYGRAPH_API_KEY +
  "/master";

const getAllCourseList = async () => {
  const query = gql`
    query MyQuery {
      courseLists(first: 20, orderBy: createdAt_DESC) {
        author
        name
        id
        free
        description
        demoUrl
        banner {
          url
        }
        chapter {
          ... on Chapter {
            id
            name
            video {
              url
            }
          }
        }
        totalChapters
        sourceCode
        tag
        slug
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const getSideBanner = async () => {
  const query = gql`
    query GetSideBanner {
      sideBanners {
        id
        name
        banner {
          id
          url
        }
        url
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

// fetching data of particular course
const getCourseById = async (courseId) => {
  const query =
    gql`
  query MyQuery {
  courseList(where: {slug: "` +
    courseId +
    `"}) {
    author
    banner {
      url
    }
    chapter {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
    demoUrl
    description
    free
    id
    name
    slug
    sourceCode
    tag
    totalChapters
  }
}
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const enrollToCourse = async (courseId, email) => {
  const query =
    gql`
  mutation MyMutation {
  createUserEnrollCourse(
    data: {courseId: "` +
    courseId +
    `", userEmail: "` +
    email +
    `", courseList: {connect: {slug: "` +
    courseId +
    `"}}}
  ) {
    id
  }
  publishManyUserEnrollCoursesConnection {
    edges {
      node {
        id
      }
    }
  }
}
`;
  const result = await request(MASTER_URL, query);
  return result;
};

const checkUserEnrolledToCourse = async (courseId, email) => {
  const query =
    gql`
  query MyQuery {
  userEnrollCourses(where: {courseId: "` +
    courseId +
    `", userEmail: "` +
    email +
    `"}) {
    id
  }
} 
`;
  const result = await request(MASTER_URL, query);
  return result;
};

const getUserEnrolledCourseDetails = async (id, userEmail) => {
  const query =
    gql`
    query MyQuery {
      userEnrollCourses(
        where: {
          id: "` +
    id +
    `"
          userEmail: "` +
    userEmail +
    `"
        }
      ) {
        courseId
        id
        userEmail
        completedChapter {
          ... on CompletedChapter {
          id
          chapterId
        }
      }
        
        courseList {
          author
          banner {
            url
          }
          chapter {
            ... on Chapter {
              id
              name
              shortDesc
              video {
                url
              }
            }
          }
          demoUrl
          description
          free
          id
          name
          slug
          sourceCode
          totalChapters
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const markChapterCompleted = async (enrollId, chapterId) => {
  const query =
    gql`
    mutation MyMutation {
      updateUserEnrollCourse(
        data: {
          completedChapter: {
            create: { CompletedChapter: { data: { chapterId: "` +
    chapterId +
    `" } } }
          }
        }
        where: { id: "` +
    enrollId +
    `" }
      ){
        id
      }
      publishUserEnrollCourse(where: { id: "` +
    enrollId +
    `" }) {
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getUserAllEnrolledCourseList = async (email) => {
  const query =
    gql`
  query MyQuery {
  userEnrollCourses(where: {userEmail: "` +
    email +
    `"}) {
    completedChapter {
      ... on CompletedChapter {
        id
        chapterId
      }
    }
    courseId
    courseList {
      name
      id
      totalChapters
      slug
      sourceCode
      free
      description
      demoUrl
      chapter(first: 100) {
        ... on Chapter {
          id
          name
        }
      }
      banner {
        url
      }
      author
    }
  }
}
 `;
  const result = await request(MASTER_URL, query);
  return result;
};
export default {
  getAllCourseList,
  getSideBanner,
  getCourseById,
  enrollToCourse,
  checkUserEnrolledToCourse,
  getUserEnrolledCourseDetails,
  markChapterCompleted,
  getUserAllEnrolledCourseList,
};
