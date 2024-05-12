import React,{useState} from "react";
import logo from "~/public/Logo.png";
import SearchIcon from "~/public/assets/Search"
import {Navbar, NavbarMenuToggle,NavbarMenu,NavbarMenuItem, Input, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import { Navigate } from "react-router";

export const ProfileNav = () => {
  const [setIsMenuOpen, isMenuOpen] = useState(false);
  
  const menuItems = [
    "Home",
    "Profile",
    "Settings",
    "Log Out",
  ];

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
        <NavbarItem>
          <Link color="foreground" href="/search">
            Search
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Input className="mt-2" type="search" placeholder="Search" startContent={<SearchIcon size={18} />} />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === menuItems.length - 1 ? "danger" : "foreground"
              }
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
  )
}