import React from "react";
import Navbar from "../../Navbar";
import { DatePicker } from "antd";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import axios from "axios";

const CreateProfile = () => {
     const [profileData, setProfileData] = React.useState({
          profileType: "Personal",
          gender: "",
          dob: "",
          mobile: "",
     });

     const handleChange = (e) => {
        setProfileData({...profileData, [e.target.name]: e.target.value});
     }

     const handledob = async(dob) =>{
        setProfileData({...profileData, dob: dob})
     }

     const submit = async() =>{
        if (profileData.profileType && profileData.gender && profileData.dob && profileData.mobile){
            await axios.post('http://54.175.140.95:3000/api/profile/create', {profileData, token: localStorage.getItem('token')})
     }}

    return (
    <>
      <Navbar />
      <div className="flex flex-col border w-11/12 mx-auto my-4 p-8 rounded-lg md:w-8/12 lg:w-7/12 xl:w-6/12">
        <div className="flex items-center mb-8">
          <img
            className="w-20 h-20 rounded-full bg-gray-500 mr-4"
            src="/avatar.png"
            alt="Profile"
          />
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Setup profile details
          </h2>
        </div>
        <div className="flex flex-col">
          <div className="mb-4">
            <label
              htmlFor="ProfileType"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Profile type:
            </label>
            <select
              id="profileType"
              name="profileType"
              type="profileType"
              onChange={handleChange}
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Personal">
                Personal
              </option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="Gender"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender:
            </label>
            <select
              id="gender"
              onChange={handleChange}
              name="gender"
              type="gender"
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Male">
                Male
              </option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth :
            </label>
            <DatePicker 
                id="dob"
                onChange={(date, dateString) => handledob(dateString)}
                name="dob"
                type="dob"
                picker="date"
                className="mt-1 w-full" />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Mobile Number:
            </label>
            <Input
              type="mobile"
              onChange={handleChange}
              id="mobile"
              name="mobile"
              className="mt-1 w-full"
            />
          </div>
        </div>

        <div className="mt-8">
          <Button onClick={submit} className="w-full">Button</Button>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
