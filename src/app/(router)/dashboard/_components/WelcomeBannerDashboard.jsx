import Image from "next/image";
import React from "react";

const WelcomeBannerDashboard = ({ user }) => {
  return (
    <div className="bg-purple-200 rounded-md p-5 flex gap-5 items-center justify-evenly overflow-auto">
      <Image
        src={"/pandadashboard.png"}
        alt="pandaImage"
        width={150}
        height={150}
        className="object-cover"
      />
      <div>
        <h2 className="text-[32px] font-light">
          Welcome,
          <span className="font-bold text-primary">{user?.fullName}</span>
        </h2>
        <h2 className="text-[16px] font-light text-slate-500">
          Let's begin and keep it up and improve your progress
        </h2>
      </div>
      <Image
        src={"/panda.png"}
        width={150}
        height={150}
        className="object-cover"
        alt="panda"
      />
    </div>
  );
};

export default WelcomeBannerDashboard;
