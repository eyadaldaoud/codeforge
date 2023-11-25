import { BiMoon, BiSolidDonateHeart, BiSun } from "react-icons/bi";
import { AcordinType, Langtype, ListItems, navigation } from "./Types";
import { MdTravelExplore } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";

export const NavMenu: navigation[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Scripts",
    href: "/scripts",
  },
  {
    name: "Support",
    href: "/support",
  },
];

export const ListMenu: ListItems[] = [
  {
    name: "Discover",
    href: "/scripts",
    icon: <MdTravelExplore />,
  },
  {
    name: "Contribute",
    href: "https://github.com/UGoingNoWhereBoy/codeforge",
    icon: <AiFillGithub />,
  },
  {
    name: "Donate",
    href: "https://www.buymeacoffee.com/eyadzoubi",
    icon: <BiSolidDonateHeart />,
  },
];

export const AccordinMenu: AcordinType[] = [
  {
    title: "About CodeForge",
    body: "A collaborative hub for script enthusiasts and developers, CodeForge is your go-to platform for downloading, sharing, and exploring a vast array of scripts. Dive into a world of creativity, where you can contribute your own scripts, discover innovative solutions, and connect with a community passionate about coding. Elevate your coding experience with CodeForge!",
  },
  {
    title: "Submission Guidelines",
    body:
      "Before sharing your script, please adhere to these guidelines:\n\n" +
      "- Ensure your submissions comply with platform rules.\n" +
      "- Maintain a positive community by being respectful.\n" +
      "- Respect copyrights; only share code you have the right to.\n\n" +
      "Thanks for contributing responsibly to CodeForge!",
  },
  {
    title: "Privacy Policy",
    body: "Your privacy matters to us. Our Privacy Policy explains how we collect, use, and protect your data. By using our services, you agree to the terms outlined in our Privacy Policy.",
  },
];

export const LanguageMenu: Langtype[] = [
  {
    value: "Python",
  },
  {
    value: "C++",
  },
  {
    value: "Java",
  },
  {
    value: "C#",
  },
  {
    value: "JavaScript",
  },
  {
    value: "Other",
  },
];
