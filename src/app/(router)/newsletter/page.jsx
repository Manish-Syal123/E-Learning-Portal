"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const NewsLetter = () => {
  const [newsLetters, setNewsLetters] = useState([]);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const { user, isSignedIn } = useUser();

  useEffect(() => {
    CheckIfUserSubscribed();
    getAllNewsLetters();
    handleFirstLoad();
  }, [user]);

  // Method to add user info
  const addUserInfo = () => {
    try {
      GlobalApi.SubscribeToNewsletter(
        user?.primaryEmailAddress?.emailAddress,
        user?.firstName + user?.lastName
      ).then((resp) => {
        toast("User Information has been added");
      });
    } catch (error) {
      console.log("Error while adding UserInfo: ", error);
    }
  };
  // this will only call the above addUserInfo() method only once on the first load and not on subsequent refreshes or reloads, we can use the browser's localStorage to track whether the method has already been called.
  const handleFirstLoad = () => {
    const hasCalledAddUserInfo = localStorage.getItem("hasCalledAddUserInfo");
    if (!hasCalledAddUserInfo) {
      addUserInfo();
      AsyncLocalStorage.setItem("hasCalledAddUserInfo", "true");
    }
  };

  const CheckIfUserSubscribed = () => {
    GlobalApi.getUpdatedUserInformation(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        // console.log(resp);
        if (resp && resp?.userInfos?.length > 0) {
          setHasSubscribed(resp?.userInfos[0]?.hasSuscribedToNewsLetter);
        }
      })
      .catch((err) => {
        console.log("Error while fetching UpdatedUserInfo: ", err);
      });
  };

  // console.log("hasSubscribed", hasSubscribed);

  const getAllNewsLetters = () => {
    try {
      GlobalApi.getNewsLetters().then((resp) => {
        // console.log(resp);
        setNewsLetters(resp?.newsLetters);
      });
    } catch (error) {
      console.log("Error occured while fetching NewsLetters : ", error);
    }
  };

  // console.log(newsLetters);

  const UpdateSubscribeRole = (subscribe) => {
    //event.preventDefault();
    try {
      GlobalApi.updateUserSunscriptionRole(
        user?.primaryEmailAddress?.emailAddress,
        subscribe
      ).then((resp) => {
        // console.log(resp);
        toast(
          subscribe ? "Subscribed successfully" : "Unsubscribed successfully"
        );
        CheckIfUserSubscribed();
      });
    } catch (error) {
      console.log("Error While Updating User hasSubscribeRole : ", error);
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

        <div
          //onSubmit={(event) => addUserInfo(event, true)}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            Subscribe to our Newsletter
          </p>
          {isSignedIn && hasSubscribed ? (
            <button
              onClick={() => UpdateSubscribeRole(false)}
              //type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              UnSubscribe
            </button>
          ) : (
            <button
              onClick={() => UpdateSubscribeRole(true)}
              //type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Subscribe
            </button>
          )}
        </div>
      </div>

      {/* TODO: add a condition here if user has subscribed the show List of newsLetters else null {hasSubs: <></>: null} */}
      {isSignedIn && hasSubscribed ? (
        <div className="mt-3">
          <h3 className="text-[20px] text-primary font-bold">NewsLetters</h3>
          {/* List of Newsletters */}
          <div className="flex flex-col justify-start gap-4 mt-4">
            {newsLetters.map((news) => (
              <div className="grid grid-cols-3 gap-4 ">
                <div
                  class="flex gap-4 border bg-slate-300 rounded-lg col-span-2"
                  key={news?.id}
                >
                  <img
                    src={news?.image?.url}
                    alt=""
                    class="aspect-square w-20 rounded-lg object-cover"
                  />

                  <div>
                    <h3 class="text-lg/tight font-medium text-gray-900">
                      {news?.title}
                    </h3>

                    <p class="mt-0.5 text-gray-700">
                      {news?.descriptionHeading}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end items-center">
                  <h3>{news?.createdAt}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NewsLetter;
