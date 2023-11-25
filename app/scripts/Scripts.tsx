"use client";
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScriptType, scriptImage } from "@/components/utils/Types";
import Ownership from "./Ownership";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { languageImages } from "@/components/utils/Langimage";
import Image from "next/image";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const PAGE_SIZE = 12;

const Scripts = ({ scriptsProps }: any) => {
  const [scripts, setScripts] = useState(scriptsProps);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = async (page: number) => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "userScripts"),
          orderBy("__name__"),
          limit(PAGE_SIZE * page)
        )
      );

      const docs = querySnapshot.docs.map((item) => ({
        data: item.data(),
        id: item.id,
      }));

      if (querySnapshot.size - PAGE_SIZE * page < 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setScripts(docs.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching page:", error);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      fetchPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    fetchPage(currentPage - 1);
  };

  useEffect(() => {
    fetchPage(1);
  }, []);
  const router = useRouter();
  const redirectToScript = async (itemID: string) => {
    router.push(`/scripts/${itemID}`);
  };

  if (scripts.length == 0) {
    return <p>No scripts to show.</p>;
  }
  return (
    <>
      <div className="flex justify-center mt-28">
        <div className="grid  myxl:grid-cols-4 mylg:grid-cols-3 mysm:grid-cols-2 grid-cols-1">
          {scripts?.map((item: ScriptType, index: number) => (
            <Card
              className="xs:w-[380px] max-w-full relative  block h-[340px] m-2"
              key={index}
            >
              <Image
                fill
                sizes=""
                src={
                  languageImages[item?.data?.scriptLang as keyof scriptImage] ||
                  ""
                }
                alt={`${item?.data?.scriptLang} Logo`}
                className="absolute inset-0 h-full w-full object-cover opacity-[0.09] z-0"
              />
              <Ownership userID={item?.data?.uid} scriptID={item?.id} />
              <CardHeader>
                <CardTitle className="break-words z-10">
                  {item?.data?.title}
                </CardTitle>
                <CardDescription className="break-words z-10">
                  {item?.data?.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 h-[140px]">
                <div className="sm:overflow-hidden overflow-y-scroll h-24 z-10">
                  <p className="break-words p-2">
                    <>
                      {item?.data?.body?.length >= 90 ? (
                        <>{item?.data?.body.slice(0, 100)}....</>
                      ) : (
                        item?.data?.body
                      )}
                    </>
                  </p>
                </div>
                <div className="mt-auto items-center rounded-md z-10">
                  Published on:{" "}
                  {item?.data?.currentDate
                    ? new Date(
                        item?.data?.currentDate.seconds * 1000
                      ).toLocaleDateString()
                    : "Date not available"}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="flex justify-center mb-2 mt-2 z-10">
                  <BiUpvote className="mt-auto mb-auto text-lg mr-2 text-green-400" />
                  {item?.data?.Likes}
                  <BiDownvote className="mt-auto mb-auto text-lg mr-2 ml-4 text-red-400" />
                  {item?.data?.Dislikes}
                </div>

                <Button
                  className="w-full mt-2 z-10"
                  onClick={() => redirectToScript(item.id)}
                >
                  <Eye className="mr-2 h-4 w-4" /> View Script
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handlePrevPage} className="m-2" variant="outline">
          <IoMdArrowDropleft />
          Back
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={hasMore ? false : true}
          className="m-2"
          variant="outline"
        >
          Next
          <IoMdArrowDropright />
        </Button>
      </div>
    </>
  );
};

export default Scripts;
