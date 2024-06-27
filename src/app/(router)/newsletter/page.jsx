"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { toast } from "sonner";

const NewsLetter = () => {
  const [checkClick, setCheckClick] = useState(false);
  const { user } = useUser();

  const addUserInfo = (event) => {
    event.preventDefault();

    try {
      GlobalApi.SubscribeToNewsletter(
        user?.primaryEmailAddress?.emailAddress,
        user?.firstName + user?.lastName
      ).then((resp) => {
        console.log(resp);
        setCheckClick(true);
        toast("Thanks for Subscribing to Our NewsLetter");
      });
    } catch (error) {
      console.log("Error while adding UserInfo : ", error);
    }
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Get started today
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          You will get Latest Updates on what's going on in our comunity and
          Blogposts.
        </p>

        <form
          onSubmit={addUserInfo}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            Subscribe to our Newsletter
          </p>
          <button
            disabled={checkClick}
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            {checkClick ? "Thanks for Subscribing" : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
