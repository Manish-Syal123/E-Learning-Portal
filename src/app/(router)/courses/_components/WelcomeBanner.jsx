import Image from "next/image";
import React from "react";

const WelcomeBanner = () => {
  return (
    <div className="flex gap-5 items-center bg-white rounded-xl p-5">
      <Image src="/panda.png" alt="panda" width={100} height={100} />
      <div>
        <h2 className="font-bold text-[29px]">
          Welcome to{" "}
          <span className="text-primary font-extrabold">Manish-EdTech</span>{" "}
          Academy
        </h2>
        <h2 className=" text-gray-500">
          Explore, Learn and Build all Real Life Projects
        </h2>
      </div>
    </div>
  );
};

export default WelcomeBanner;
