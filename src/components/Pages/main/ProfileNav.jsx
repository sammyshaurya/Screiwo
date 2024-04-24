import React from "react";
import { Link } from "react-router-dom";
import logo from "~/public/svg/Logo-removebg.svg";
import { Label } from "@/components/ui/label";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const ProfileNavItems = () => {
    return (
      <div className="flex flex-col">
        <div className="mt-10 ml-8">
          <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-800">
            <HomeOutlinedIcon className="mr-2 h-8 w-8" />
            <span className="text-lg font-semibold">Home</span>
          </Link>
        </div>
        <div className="mt-6 ml-8">
          <Link to="/search" className="flex items-center text-gray-600 hover:text-gray-800">
            <SearchOutlinedIcon className="mr-2 h-8 w-8" />
            <span className="text-lg font-semibold">Search</span>
          </Link>
        </div>
        <div className="mt-6 ml-8">
          <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-800">
            <Person4OutlinedIcon className="mr-2 h-8 w-8" />
            <span className="text-lg font-semibold">Profile</span>
          </Link>
        </div>
        <div className="mt-6 ml-8">
          <Link to="/settings" className="flex items-center text-gray-600 hover:text-gray-800">
            <TuneOutlinedIcon className="mr-2 h-8 w-8" />
            <span className="text-lg font-semibold">Settings</span>
          </Link>
        </div>
      </div>
    );
  };
  
export const ProfileNav = () => {
  return (
    <div className="flex flex-col h-screen w-2/12 items-start border-r border-gray-200">
      <Link
        to="/profile"
        className="mt-6 ml-8"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={logo} className="h-12" alt="logo" />
      </Link>
      <ProfileNavItems />
    </div>
  );
};
