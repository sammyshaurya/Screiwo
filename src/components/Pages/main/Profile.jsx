import React, { useState, useEffect } from "react";
import { ProfileNav } from "./ProfileNav";
import { Posts } from "./Posts";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Navigate } from "react-router";

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userprofile = {profile:response.data.profile, user:response.data.user}
        setUser(userprofile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <ProfileNav />
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <div className="mx-36 mt-6 flex flex-col items-start">
          <div className="flex items-center">
            <Avatar className="flex h-40 w-40">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="flex-col">
              <div className="username text-decoration-line: underline ml-16 mb-3">
                {user?.user.username || "Usernameblock"}
              </div>
              <div className="flex-col">
                <div className="flex">
                  <div className="ml-16 mb-2 ">{`0 posts`}</div>
                  <div className="ml-8 mb-2">{`0 followers`}</div>
                  <div className="ml-8 mb-2">{`0 following`}</div>
                </div>
                <h5 className="ml-16 mb-3 text-gray-700">
                  {user?.user.firstname +" " + user?.user.lastname || "Nameblock"}
                  <span className="ml-3 text-wrap text-sm font-light text-slate-700 ">
                    {`${user?.profile.profileType}`}
                  </span>
                </h5>
                <blockquote className="ml-16 border-l-2 pl-2 italic">
                  "After all," he said, "everyone enjoys a good joke, so it's
                  only fair that they should pay for the privilege."
                </blockquote>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
        </div>
        <Posts/>
      </div>
    </div>
  );
};
