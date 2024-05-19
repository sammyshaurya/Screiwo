import React, { useState } from "react";
import { ProfileNav } from "@/components/Pages/main/ProfileNav";
import { Divider } from "@nextui-org/divider";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Input } from "@nextui-org/input";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let timeoutId;

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if (value.trim().length > 2) {
        fetchData(value);
      }
    }, 800);
  };

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://3.219.61.208:3000/api/allusers?q=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <ProfileNav />
      <div className="flex-1 flex">
        <div className="flex-1">
          <Input
            className="m-4 w-8/12 mx-auto"
            type="text"
            value={search}
            label="Search User or Post"
            variant="underlined"
            onChange={handleChange}
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
          <Divider />
          <div className="flex justify-center">
            <Tabs variant="underlined">
              <Tab title="Users" />
              <Tab title="Posts" />
            </Tabs>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2 w-8/12 mx-auto justify-center">
            {loading && <p>Loading...</p>}
            {searchResults &&
              searchResults.map((result, index) => (
                <Card
                  key={index}
                  className="max-w-[340px] col-span-1 sm:col-span-1 md:col-span-1 md:col-start-1 md:col-end-auto"
                >
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src="https://nextui.org/avatars/avatar-1.png"
                      />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {result.FirstName + " " + result.LastName}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400">
                          {result.username}
                        </h5>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>{result.Bio}</p>
                  </CardBody>
                  <CardFooter className="gap-3">
                    <div className="flex gap-1">
                      <p className="font-semibold text-default-400 text-small">
                        {result.Followings}
                      </p>
                      <p className=" text-default-400 text-small">Following</p>
                    </div>
                    <div className="flex gap-1">
                      <p className="font-semibold text-default-400 text-small">
                        {result.Followers}
                      </p>
                      <p className="text-default-400 text-small">Followers</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
