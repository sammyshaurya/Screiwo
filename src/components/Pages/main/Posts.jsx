import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Typography from "../Typography";
import Comment from "~/public/uicomponents/comment.svg";
import Saveicon from "~/public/uicomponents/saveicon.svg";

export const Posts = () => {
  let user;
  return (
    <div className="grid grid-cols-2 gap-4 mx-36 mb-10">
      <div className="aspect-w-16 aspect-h-9 border-1 shadow-md rounded-lg bg-white border-slate-300">
        <AspectRatio ratio={16 / 9}>
          <div className="flex">
            <div>
              <Avatar className="h-8 w-8 mt-3 ml-3">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </div>
            <span className="ml-3 my-3">sammyshaurya</span>
            <span className="text-xs ml-auto mr-8 my-4">{user?.postdate > 0 ? user?.postdate : "24/04/2024"}</span>
          </div>
          <Typography
            variant="title"
            className="mx-3 line-clamp-2 merriweather-black text-gray-800 dark"
          >
            I am starting screiwo with this first blog!!
          </Typography>
          <p className="merriweather-light line-clamp-3 mx-3 mt-1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
            voluptatem harum dolor fugiat id quibusdam sequi dolores! Hic nisi
            asperiores totam illum molestias delectus dignissimos iste nemo
            exercitationem! Nostrum, corrupti?
          </p>
          <div className="flex mx-3 my-3 items-center">
            <h6 className="text-sm mr-2">7 likes</h6>
            <h6 className="text-sm">
              <img
                src={Comment}
                alt="Comment icon"
                className="inline-block ml-2 mr-1 h-5 w-5"
              />
              {user?.commentscount > 0
                ? `${user?.commentscount} comments`
                : "No comments"}
            </h6>
            <h6 className="text-sm ml-auto mr-2">
              <img
                src={Saveicon}
                alt="Save icon"
                className="inline-block ml-2 mr-1 h-5 w-5"
              />
              {user?.commentscount > 0
                ? `${user?.postsaves} comments`
                : "No Saves"}
            </h6>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};
