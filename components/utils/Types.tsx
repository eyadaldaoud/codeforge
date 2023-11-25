import { Timestamp } from "firebase/firestore";
import { string } from "yup";

export type navigation = {
  name: string;
  href: string;
};

export type themeType = {
  name: string;
  themeType: string;
  icon: any;
};

export type ListItems = {
  name: string;
  href: string;
  icon: any;
};

export type AcordinType = {
  title: string;
  body: string;
};

export type ScriptType = {
  data: {
    title: string;
    body: string;
    link: string;
    image: string;
    scriptLang: string;
    author: string;
    uid: string;
    video: string;
    currentDate: Timestamp;
    Likes: string;
    Dislikes: string;
  };

  id: string;
};
export type ScriptDataType = {
  title: string;
  body: string;
  link: string;
  image: string;
  scriptLang: string;
  author: string;
  uid: string;
  currentDate: Timestamp;
  video: string;
  useage: string;
  notes: string;
  Likes: string;
  Dislikes: string;
};

export type Langtype = {
  value: string;
};

export type userType = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

export type scriptImage = {
  Python: string;
  "C++": string;
  "C#": string;
  JavaScript: string;
  Other: string;
};

export type userRatingType = {
  likes: string;
  dislikes: string;
  RatedScript: string;
};
