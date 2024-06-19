import React, { useEffect, useState } from "react";
import { getSideBanners } from "@/actions/index";
import Image from "next/image";

const SideBanners = () => {
  const [sideBannerList, setSideBannerList] = useState([]);
  useEffect(() => {
    SideBanner();
  }, []);

  const SideBanner = async () => {
    const res = await getSideBanners();
    setSideBannerList(res?.sideBanners || []);
  };
  return (
    <div>
      {sideBannerList.map((item, index) => (
        <div key={index}>
          <Image
            src={item.banner.url}
            alt="Sidebanner"
            width={500}
            height={300}
            onClick={() => window.open(item.url)}
            className="rounded-xl cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default SideBanners;
