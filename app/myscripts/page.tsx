"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScriptType, scriptImage } from "@/components/utils/Types";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Ownership from "../scripts/Ownership";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { languageImages } from "@/components/utils/Langimage";

const Page = () => {
  const [isUser, setUser] = useState<any>(null);
  const [isMounting, setMounting] = useState(true);
  const [myScripts, setScripts] = useState<any>([]);
  const router = useRouter();
  const getScripts = async () => {
    if (!isUser) return;
    const q = query(
      collection(db, "userScripts"),
      where("uid", "==", isUser?.uid)
    );

    try {
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((item) => ({
        data: item.data(),
        id: item.id,
      }));
      setScripts(docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setMounting(false);
    });

    if (isUser) {
      getScripts();
    } else {
      setMounting(false);
    }
  }, [isUser]);

  if (isMounting) {
    return <div>loading..</div>;
  }
  const redirectToScript = async (itemID: string) => {
    router.push(`/scripts/${itemID}`);
  };
  return (
    <div className="flex justify-center mt-28">
      <div className="grid  myxl:grid-cols-4 mylg:grid-cols-3 mysm:grid-cols-2 grid-cols-1">
        {myScripts?.map((item: ScriptType, index: number) => (
          <Card
            className="xs:w-[380px] max-w-full relative  block h-[300px] m-2"
            key={index}
          >
            <img
              src={
                languageImages[item?.data?.scriptLang as keyof scriptImage] ||
                ""
              }
              alt={`${item?.data?.scriptLang} Logo`}
              className="absolute inset-0 h-full w-full object-cover opacity-[0.09]"
            />
            <Ownership userID={item?.data?.uid} scriptID={item?.id} />
            <CardHeader>
              <CardTitle className="break-words">{item?.data?.title}</CardTitle>
              <CardDescription className="break-words">
                {item?.data?.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 h-[140px]">
              <div className="sm:overflow-hidden overflow-y-scroll h-24 z-20">
                <p className="break-words p-2">
                  <>
                    {item?.data?.body?.length >= 90 ? (
                      <>{item?.data?.body.slice(1, 100)}....</>
                    ) : (
                      item?.data?.body
                    )}
                  </>
                </p>
              </div>
              <div className="mt-auto items-center rounded-md">
                Published on:
                {item?.data?.currentDate
                  ? new Date(
                      item?.data?.currentDate?.seconds * 1000
                    ).toLocaleDateString()
                  : "Date not available"}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full z-20 mt-2"
                onClick={() => redirectToScript(item.id)}
              >
                <Eye className="mr-2 h-4 w-4" /> View Script
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
