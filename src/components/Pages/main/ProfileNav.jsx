import React, { useState } from "react";
import logo from "~/public/Logo.png";
import SearchIcon from "~/public/assets/Search";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Navigate } from "react-router";

export const ProfileNav = () => {
  const [setIsMenuOpen, isMenuOpen] = useState(false);

  const menuItems = ["Home", "Profile", "Settings", "Log Out"];

  const searchList = [{ username: "@sammyshaurya" }];

  const searchUser = (e) => {
    const searching = e.target.value;
    if (searching.trim().length > 2) {
      fetch(`http://3.219.61.208:3000/api/allusers?q=${searching}`)
        .then((response) => response.json())
        .then((data) => {
          
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered isBlurred={false}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <img src={logo} alt="logo" width={150} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 mt-2" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/profile">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/profile" aria-current="page">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <NavbarContent justify="end">
            <Input
              className="mt-2"
              type="search"
              placeholder="Search"
              startContent={<SearchIcon size={18} />}
            />
          </NavbarContent>
        </DropdownMenuTrigger>
        {searchList.length > 0 && (
          <DropdownMenuContent>
            <DropdownMenuLabel>Searching User..</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {searchList.map((item, index) => ( 
              <DropdownMenuItem key={index}>
                <Link href={`/profile/${item.username}`} color="foreground">
                  {item.username}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === menuItems.length - 1 ? "danger" : "foreground"}
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
