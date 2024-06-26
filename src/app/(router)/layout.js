"use client";
import React, { useContext, useEffect } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../_utils/GlobalApi";
import { UserMemberContext } from "../_context/UserMemberContext";

const layout = ({ children }) => {
  const { user } = useUser();
  const { isMember, setIsMember } = useContext(UserMemberContext);

  useEffect(() => {
    if (user) {
      checkUserMembership();
    }
  }, [user]);
  // used to check the user membership
  const checkUserMembership = () => {
    try {
      GlobalApi.checkForMembership(
        user?.primaryEmailAddress?.emailAddress
      ).then((resp) => {
        console.log(resp);
        if (resp?.memberships?.length > 0) {
          console.log("It's Member");
          setIsMember(true);
        }
      });
    } catch (error) {
      console.log(
        "Error occured While fetching user Membership details: ",
        error
      );
    }
  };
  return (
    <div>
      <div className="sm:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
