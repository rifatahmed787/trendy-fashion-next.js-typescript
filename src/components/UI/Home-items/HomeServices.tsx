/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import serviceLogo1 from "../../../assets/HomePageBannerImg/servicelogo1.png";
import serviceLogo2 from "../../../assets/HomePageBannerImg/servicelogo2.png";
import serviceLogo3 from "../../../assets/HomePageBannerImg/servicelogo3.png";
import serviceLogo4 from "../../../assets/HomePageBannerImg/servicelogo4.png";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Paragraph from "../Paragraph/Paragraph";
import { delay, motion } from "framer-motion";
import { fadeIn, textVariant } from "@/components/FramerMotion/Motion/motion";

const HomeServiceComponent = () => {
  const fadeInVariants = fadeIn("right", "spring", 0, 1.25);
  return (
    <section>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 max-w-screen-2xl mx-auto justify-items-center items-center sm:grid-cols-1  gap-5  mt-5 extra-small-margin">
        {/* card one  */}
        <motion.div
          variants={fadeInVariants}
          className=" w-80 h-72 group"
        >
          <Image
            src={serviceLogo1}
            alt=""
            className="w-14 -mb-7 group-hover:translate-x-32 transition-transform ease-out duration-700"
            width={undefined}
            height={undefined}
          />
          <motion.div
            variants={textVariant(0)}
            className="border border-gray-200 rounded-xl px-5 py-8 shadow-md duration-300 overflow-hidden"
          >
            <h2 className="text-2xl font-bold mb-2 title">
              Amazing Value Every Day
            </h2>
            <Paragraph className="py-3 text-gray-400">
              Items prices that fit your budget
            </Paragraph>
            <Link
              href="/accordian"
              className="flex  items-center mt-5 -translate-x-32 group-hover:translate-x-0.5 duration-500"
            >
              <p className="text-xl font-semibold pr-2 ">Read more </p>
              <Icon
                icon="material-symbols:arrow-right-alt"
                className="mt-1 lg:ml-3 md:ml-24 sm:ml-40 carditem-icon-margin"
                width="30"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* card two  */}
        <motion.div
          variants={fadeInVariants}
          className="w-80 lg:pr-3  h-72 group overflow-hidden"
        >
          <Image
            src={serviceLogo2}
            alt=""
            className="w-14 -mb-7 group-hover:translate-x-32 transition-transform ease-out duration-700"
            width={undefined}
            height={undefined}
          />
          <div className="border border-gray-200 rounded-xl px-5 py-8 shadow-md hover:border-brand duration-300">
            <h2 className="text-2xl font-bold mb-2 title">
              Successful Customer Service
            </h2>
            <Paragraph className="text-gray-400">
              We work with a focus on 100% customer satisfaction.
            </Paragraph>
            <Link
              href="/accordian"
              className="flex  items-center mt-5 -translate-x-32 group-hover:translate-x-0.5 duration-500"
            >
              <p className="text-xl font-semibold pr-2">Read more </p>
              <Icon
                icon="material-symbols:arrow-right-alt"
                className="mt-1 lg:ml-3 md:ml-24 sm:ml-40 carditem-icon-margin"
                width="30"
              />
            </Link>
          </div>
        </motion.div>

        {/* card three  */}
        <motion.div
          variants={fadeInVariants}
          className=" w-80 lg:pr-3 h-72 group overflow-hidden"
        >
          <Image
            src={serviceLogo3}
            alt=""
            className="w-14 -mb-7 group-hover:translate-x-32 transition-transform ease-out duration-700"
            width={undefined}
            height={undefined}
          />
          <div className="border border-gray-200 rounded-xl px-5 py-8 shadow-md hover:border-brand duration-300">
            <h2 className="text-2xl font-bold mb-2 title">
              All Payment Methods
            </h2>
            <Paragraph className="text-gray-400 py-7">
              Don't bother with payment details.
            </Paragraph>
            <Link
              href="/accordian"
              className="flex  items-center mt-5 -translate-x-32 group-hover:translate-x-0.5 duration-500"
            >
              <p className="text-xl font-semibold mr-2">Read more </p>
              <Icon
                icon="material-symbols:arrow-right-alt"
                className="mt-1 lg:ml-3 md:ml-24 sm:ml-40 carditem-icon-margin"
                width="30"
              />
            </Link>
          </div>
        </motion.div>

        {/* card four  */}
        <motion.div
          variants={fadeInVariants}
          className="w-80 h-72 group overflow-hidden"
        >
          <Image
            src={serviceLogo4}
            alt=""
            className="w-14 -mb-7 group-hover:translate-x-32 transition-transform ease-out duration-700"
            width={undefined}
            height={undefined}
          />
          <div className="border border-gray-200 rounded-xl px-5 py-8 shadow-md hover:border-brand duration-300">
            <h2 className="text-2xl font-bold mb-2 title">
              Completely Free Shipping Service
            </h2>
            <Paragraph className="text-gray-400 py-3">
              Items prices that fit your budget
            </Paragraph>
            <Link
              href="/accordian"
              className="flex  items-center mt-5 -translate-x-32 group-hover:translate-x-0.5 duration-500"
            >
              <p className="text-xl font-semibold mr-2">Read more </p>
              <Icon
                icon="material-symbols:arrow-right-alt"
                className="mt-1 lg:ml-3 md:ml-24 sm:ml-40 carditem-icon-margin"
                width="30"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeServiceComponent;
