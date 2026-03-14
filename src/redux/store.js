import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./CourseSlice";
import categoryReducer from "./categorySlice";
import mentorReducer from "./mentorSlice";
import blogReducer from "./blogSlice";
import partnerReducer from "./partnerSlice";

export default configureStore({
  reducer: {
    courses: courseReducer,
    categories: categoryReducer,
    mentors: mentorReducer,
    blogs: blogReducer,
    partners: partnerReducer,
  },
});



