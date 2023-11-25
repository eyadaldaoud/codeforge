"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Github from "./Github";
import Google from "./Google";
import X from "./X";
import Microsoft from "./Microsoft";
import { rubik } from "@/components/utils/Fonts";

const page = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? router.replace("/") : null;
    });
  }, []);
  const router = useRouter();

  return (
    <div className="flex justify-center mt-56">
      <div className={`${rubik.className} w-[700px] card border rounded`}>
        <CardHeader>
          <CardTitle className="text-4xl text-center">LOGIN</CardTitle>
          <CardDescription className="text-center">
            Sign in using your preferred provider.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 mt-8">
            <Github />
            <Google />
            <X />
            <Microsoft />
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default page;
