import React, { useState, useEffect } from "react";
import { ProfileNav } from "./ProfileNav";
import { Posts } from "./Posts";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StretchVerticallyIcon } from "@radix-ui/react-icons";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [profile, setprofile] = useState("");

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = () => {
    if (profile) {
      return;
    }
    fetch(
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    )
      .then((response) => {
        if (response.ok) {
          setprofile(response.url);
        } else {
          console.error("Failed to fetch image");
        }
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://screiwo-backend.onrender.com/api/user/allposts",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setPosts(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Navigate("/");
          return;
        }
        const response = await axios.get("https://screiwo-backend.onrender.com/api/profile", {
          headers: {
            Authorization: token,
          },
        });
        const userprofile = {
          profile: response.data.profile,
          user: response.data.user,
        };
        setUser(userprofile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ProfileNav />
      <div className="flex">
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="mx-36 mt-6 flex flex-col items-start">
            <div className="flex items-center">
              <Avatar className="flex h-40 w-40">
                <div>
                  {profile && <AvatarImage src={profile} alt="Avatar" />}
                </div>
              </Avatar>
              <div className="flex-col">
                <div className="flex justify-between">
                  <div className="username text-decoration-line: underline ml-16 mb-3">
                    {user?.user.username || "Usernameblock"}
                  </div>
                  <Link to={"/post"}>
                    <Button>
                      <StretchVerticallyIcon />
                      Create Post
                    </Button>
                  </Link>
                </div>
                <div className="flex-col">
                  <div className="flex">
                    <div className="ml-16 mb-2">{`${posts.length} posts`}</div>
                    <div className="ml-8 mb-2">{`0 followers`}</div>
                    <div className="ml-8 mb-2">{`0 following`}</div>
                  </div>
                  <h5 className="ml-16 mb-3 text-gray-700">
                    {user?.user.firstname + " " + user?.user.lastname ||
                      "Nameblock"}
                    <span className="ml-3 text-wrap text-sm font-light text-slate-700 ">
                      {`${user?.profile.profileType}`}
                    </span>
                  </h5>
                  <blockquote className="ml-16 border-l-2 pl-2 italic">
                    &quot;After all,&quot; he said, &quot;everyone enjoys a good
                    joke, so it&apos;s only fair that they should pay for the
                    privilege.&quot;
                  </blockquote>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
          </div>
          <div className="grid grid-cols-2 gap-4 mx-36 mb-10">
            {posts.map((post, index) => (
              <Posts key={index} post={post} profile={profile ? profile : null} />

            ))}
          </div>
        </div>
      </div>
    </>
  );
};
