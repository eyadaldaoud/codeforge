"use client";
import Simage from "@/components/Simage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Roboto_condensed, rubik } from "@/components/utils/Fonts";
import { ScriptDataType } from "@/components/utils/Types";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsGithub, BsYoutube } from "react-icons/bs";

import Rating from "./Rating";

const Script = ({ scriptData, scriptID }: any) => {
  const data: ScriptDataType = scriptData;
  const [isUser, setUser] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center mt-24 ">
        <div className="flex justify-start mt-24 m-4 w-[1300px] h-[700px] bg-slate-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-24">
      <div className="flex justify-start mt-24 m-4 w-[1300px]">
        <Card className="mymdtolg:w-[1200px] mymd:w-[900px] max-w-[1200px] border border-gray-300 rounded card2">
          <CardHeader>
            <div className={`${Roboto_condensed.className}`}>
              <div className="space-y-1">
                <h4 className="text-4xl font-medium leading-none">
                  {data?.title}
                </h4>
                <p className="text-sm text-muted-foreground dark:text-slate-400 text-slate-700">
                  ~ {data?.author}
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>{data?.scriptLang}</div>
                <Separator orientation="vertical" />
                <div>
                  {data?.currentDate
                    ? new Date(
                        data?.currentDate?.seconds * 1000
                      ).toLocaleDateString()
                    : "Date not available"}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className={`${rubik.className}`}>
            <div className="flex justify-center mb-4">
              <Simage urlProps={data.image} />
            </div>
            <h1 className="text-2xl">Description</h1>
            <CardDescription className="sm:h-full h-[200px] sm:overflow-hidden overflow-y-scroll overflow-x-hidden p-2 text-slate-800">
              {data?.body}
            </CardDescription>
          </CardContent>

          <CardContent className={`${rubik.className}`}>
            <h1 className="text-2xl">Useage</h1>
            <CardDescription className="sm:h-full h-[200px] sm:overflow-hidden overflow-y-scroll overflow-x-hidden p-2 whitespace-pre-line text-slate-800">
              {data?.useage}
            </CardDescription>
          </CardContent>
          <CardContent className={`${rubik.className}`}>
            <h1 className="text-2xl">Notes</h1>
            <CardDescription className="sm:h-full h-[200px] sm:overflow-hidden overflow-y-scroll overflow-x-hidden p-2 text-slate-800">
              {data?.notes?.length > 0 ? <>{data?.notes}</> : <>No Notes</>}
            </CardDescription>
          </CardContent>
          <CardFooter className="m-2 justify-center">
            <div className={`flex justify-center`}>
              {data?.video ? (
                <Link href={data.video} target="_blank" className="mr-2">
                  <Button disabled={!data?.video}>
                    Tutorial
                    <BsYoutube className="ml-2  text-xl" />
                  </Button>
                </Link>
              ) : (
                <Button disabled={!data?.video} className="mr-2">
                  No video available
                </Button>
              )}
              <Link href={data.link} target="_blank">
                <Button>
                  Download
                  <BsGithub className="ml-2 text-xl" />
                </Button>
              </Link>
            </div>
          </CardFooter>
          <Rating scriptID={scriptID} userID={isUser?.uid} />
        </Card>
      </div>
    </div>
  );
};

export default Script;
