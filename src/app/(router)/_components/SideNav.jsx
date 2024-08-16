"use client";
import { useUser } from "@clerk/nextjs";
import {
  BadgeCheck,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SideNav = () => {
  const { user } = useUser();
  const path = usePathname();
  useEffect(() => {
    console.log("path: ", path);
  }, []);
  const menu = [
    {
      id: 6,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      auth: user,
    },
    {
      id: 1,
      name: "All Courses",
      icon: BookOpen,
      path: "/courses",
      auth: true,
    },
    // {
    //   id: 2,
    //   name: "Store",
    //   icon: LayoutGrid,
    //   path: "/store",
    //   auth: true,
    // },
    {
      id: 3,
      name: "Membership",
      icon: BadgeCheck,
      path: "/membership",
      auth: true,
    },
    // {
    //   id: 4,
    //   name: "Be Instructor",
    //   icon: GraduationCap,
    //   path: "instructor",
    //   auth: true,
    // },
    {
      id: 5,
      name: "NewsLetter",
      icon: Mail,
      path: "/newsletter",
      auth: true,
    },
  ];
  return (
    <div className="p-5 bg-white shadow-sm border h-screen">
      <Image src="/logo1.png" alt="Logo" width={195} height={200} />
      <hr className="mt-7" />
      {/* Menu List */}
      <div className="mt-8">
        {menu.map(
          (item, index) =>
            item.auth && (
              <Link href={item.path} key={index}>
                <div
                  className={`group flex gap-3 mt-3 p-3 text-[18px] items-center text-gray-500 cursor-pointer
          hover:text-primary hover:bg-blue-100 rounded-md
          transition-all ease-in-out duration-200
          ${path.includes(item.path) && "bg-primary text-white rounded-full"}
          `}
                >
                  <item.icon className="group-hover:animate-bounce" />
                  <h2>{item.name}</h2>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default SideNav;
