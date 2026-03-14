"use client";

import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const LeftEventSection = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const eventDescription = `Join our offline seminar on MERN Stack Development and learn 'Level Up Your Career with MERN'! To expand your career in web development, join our offline "MERN Stack" seminar. With our expert mentor explore the world of opportunities. 🗓️ Seminar Date: 07 February, Friday 🕓 Time: 04 PM 📍Place: Daisy Garden, House 14 (Level-5), Block A, Main Road, Banasree, Dhaka, Bangladesh`;
  return (
    <>
      <div>
        <div className="space-y-7">
          <h1 className="text-[#F79952] text-4xl md:text-5xl outfit-semibold ">
            Our <span className="crd">Events</span>
          </h1>
          <div className="flex flex-col gap-6">
            <div>
              <div>
                <img
                  src="https://api.bdcallingacademy.com/adminAsset/image/197693287.jpg"
                  alt=""
                />
              </div>
              <div className="space-y-4 p-4 md:p-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-wrap md:flex-nowrap justify-between gap-6">
                  <div className="flex gap-1.5 lg:gap-6">
                    <div className="flex items-center gap-1.5">
                      <MdOutlineDateRange className="cpr" />
                      <p className="text-sm md:text-base crd font-semibold">
                        Date: 2023-10-01
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaRegClock className="cpr" />
                      <p className="text-sm md:text-base crd font-semibold">
                        4:00 PM - 5:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <p className="uppercase cpr text-lg font-medium">Offline</p>
                    <button className="border bg-[#41bfb8] border-[#41bfb8] px-4 py-2 rounded-md cursor-pointer">
                      <span className="work tracking-tight text-[15px] text-white">
                        Join Event
                      </span>
                    </button>
                  </div>
                </div>

                <h2 className="text-[24px] md:text-[26px] font-bold w-10/12 outfit-semibold csd md:line-clamp-1">
                  Certified MERN Stack Development
                </h2>

                <div className="relative">
                  <p
                    className={`crd text-sm md:text-base font-semibold ${expanded ? "" : "line-clamp-2"
                      }`}
                  >
                    {eventDescription}
                  </p>
                  <button
                    onClick={toggleExpand}
                    className="text-[#41bfb8] font-medium mt-2 focus:outline-none cursor-pointer"
                  >
                    {expanded ? "See Less" : "See More"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div>
                <div>
                  <img
                    src="https://api.bdcallingacademy.com/adminAsset/image/2086206721.jpg"
                    alt=""
                  />
                </div>
                <div className="space-y-4 p-4 md:p-6 bg-white rounded-lg shadow-md">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex gap-1.5 lg:gap-6">
                      <div className="flex items-center gap-1.5">
                        <MdOutlineDateRange className="cpr" />
                        <p className="text-sm md:text-base crd font-semibold">
                          Date: 2023-10-01
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaRegClock className="cpr" />
                        <p className="text-sm md:text-base crd font-semibold">
                          4:00 PM - 5:00 PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <p className="uppercase cpr text-lg font-medium">
                        Offline
                      </p>
                      <button className="border bg-[#41bfb8] border-[#41bfb8] px-4 py-2 rounded-md">
                        <span className="work tracking-tight text-[15px] text-white">
                          Join Event
                        </span>
                      </button>
                    </div>
                  </div>

                  <h2 className="text-[24px] md:text-[22px] font-bold outfit-semibold csd md:line-clamp-1">
                    Certified UX-UI Design
                  </h2>

                  <div className="relative md:hidden">
                    <p
                      className={`crd text-sm md:text-base font-semibold ${expanded ? "" : "line-clamp-2"
                        }`}
                    >
                      {eventDescription}
                    </p>
                    <button
                      onClick={toggleExpand}
                      className="text-[#41bfb8] font-medium mt-2 focus:outline-none cursor-pointer"
                    >
                      {expanded ? "See Less" : "See More"}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <img
                    src="https://api.bdcallingacademy.com/adminAsset/image/197693287.jpg"
                    alt=""
                  />
                </div>
                <div className="space-y-4 p-4 md:p-6 bg-white rounded-lg shadow-md">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex gap-1.5 lg:gap-6">
                      <div className="flex items-center gap-1.5">
                        <MdOutlineDateRange className="cpr" />
                        <p className="text-sm md:text-base crd font-semibold">
                          Date: 2023-10-01
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaRegClock className="cpr" />
                        <p className="text-sm md:text-base crd font-semibold">
                          4:00 PM - 5:00 PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <p className="uppercase cpr text-lg font-medium">
                        Offline
                      </p>
                      <button className="border bg-[#41bfb8] border-[#41bfb8] px-4 py-2 rounded-md">
                        <span className="work tracking-tight text-[15px] text-white">
                          Join Event
                        </span>
                      </button>
                    </div>
                  </div>

                  <h2 className="text-[24px] md:text-[22px] font-bold outfit-semibold csd md:line-clamp-1">
                    Certified MERN Stack Development
                  </h2>

                  <div className="relative md:hidden">
                    <p
                      className={`crd text-sm md:text-base font-semibold ${expanded ? "" : "line-clamp-2"
                        }`}
                    >
                      {eventDescription}
                    </p>
                    <button
                      onClick={toggleExpand}
                      className="text-[#41bfb8] font-medium mt-2 focus:outline-none cursor-pointer"
                    >
                      {expanded ? "See Less" : "See More"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftEventSection;
