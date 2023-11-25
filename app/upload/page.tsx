"use client";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Upload from "./Upload";
import { useRouter } from "next/navigation";

const page = () => {
  const [isUser, setUser] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : router.replace("/login");
    });
  }, []);

  return (
    <>
      {isUser && (
        <Upload
          userName={isUser.displayName}
          userEmail={isUser.email}
          userID={isUser.uid}
        />
      )}
    </>
  );
};

export default page;
