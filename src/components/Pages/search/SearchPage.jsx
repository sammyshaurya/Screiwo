import React, { useState } from "react";
import { ProfileNav } from "@/components/Pages/main/ProfileNav";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField, Flex, TabNav } from "@radix-ui/themes";

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
    }, 500);
  };

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/allusers?q=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <ProfileNav />
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <h3 className="p-4 pb-0"> Search user by id or name</h3>
        <div className="input-group p-4">
          <span className="input-group-text" id="basic-addon1">
            Search
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="..."
            value={search}
            onChange={handleChange}
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </div>
        <hr></hr>
        <Flex direction="column" gap="4" pb="2">
          <TabNav.Root color="indigo">
            <TabNav.Link href="#" active>
              Accounts
            </TabNav.Link>
            <TabNav.Link href="#">Documents</TabNav.Link>
            <TabNav.Link href="#">Settings</TabNav.Link>
          </TabNav.Root>
        </Flex>
        {loading && <p>Loading...</p>}
        <ul>
          {searchResults &&
            searchResults.map((result, index) => <li key={index}>{result}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
