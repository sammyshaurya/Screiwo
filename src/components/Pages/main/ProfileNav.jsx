import React from "react";
import { Link } from "react-router-dom";
import logo from "~/public/screiwo.svg";
import { Label } from "@/components/ui/label";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const navigationItems = [
  { icon: <HomeOutlinedIcon />, text: "Home", link: "/home" },
  { icon: <SearchOutlinedIcon />, text: "Search", link: "/search" },
  { icon: <Person4OutlinedIcon />, text: "Profile", link: "/profile" },
  { icon: <TuneOutlinedIcon />, text: "Settings", link: "/settings" }
];

const ProfileNavItems = () => {
  return (
    <div className="flex flex-col">
      {navigationItems.map((item, index) => (
        <div className="mt-6 ml-8" key={index}>
          <Link to={item.link} className="flex items-center text-gray-600 hover:text-gray-800">
            {item.icon}
            <span className="text-lg font-semibold">{item.text}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};
  
export const ProfileNav = () => {
  return (
    <div className="flex flex-col h-screen w-16 md:w-32 lg:w-48  items-start border-r border-gray-200">
      <Link
        to="/profile"
        className="mt-6 ml-8"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={logo} className="h-12 mb-6" alt="logo" />
      </Link>
      <ProfileNavItems />
    </div>
  );
};
