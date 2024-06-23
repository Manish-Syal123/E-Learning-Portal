import Image from "next/image";
import React from "react";

const WelcomeBannerDashboard = ({ user }) => {
  return (
    <div className="bg-purple-200 rounded-md p-5 flex gap-5 items-center">
      <Image src={"/pandadashboard.png"} width={150} height={150} />
      <div>
        <h2 className="text-[32px] font-light">
          Welcome,
          <span className="font-bold text-primary">{user?.fullName}</span>
        </h2>
        <h2 className="text-[16px] font-light text-slate-500">
          Let's begin and keep it up and improve your progress
        </h2>
      </div>
    </div>
  );
};

export default WelcomeBannerDashboard;
