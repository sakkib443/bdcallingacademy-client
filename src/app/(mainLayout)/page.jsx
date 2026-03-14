"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCategories } from "@/redux/categorySlice";
import Link from "next/link";
import Concerns from "@/components/Home/Concerns";
import Hero from "@/components/Home/Hero";
import HomeCategory from "@/components/Home/HomeCategory";
import PopularCourse from "@/components/Home/PopularCourse";
import SeminarAndEvent from "@/components/Home/SeminarAndEvent";
import SuccesHistory from "@/components/Home/SuccesHistory";
import WhatWeProvide from "@/components/Home/WhatWeProvide";
import { fetchCoursesData } from "@/redux/CourseSlice";
import PaymentMethod from "@/components/sheard/PaymentMethod";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoursesData());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="overflow-hidden">
      {/* Each component now has its own internal scroll animations */}
      <Hero />
      <HomeCategory />
      <div
        className="container mx-auto rounded-2xl mb-20 bg-cover"
        style={{ backgroundImage: `url("/images/bg1.png")` }}
      >
        <PopularCourse />
      </div>
      <SeminarAndEvent />
      <WhatWeProvide />
      <Concerns />
      <SuccesHistory />
      <PaymentMethod />
    </div>
  );
};

export default HomePage;

