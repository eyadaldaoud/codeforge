"use client";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { RxUpdate } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiDotsHorizontal } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
const Ownership = ({ scriptID, userID }: any) => {
  const [isUser, setUser] = useState<any>();
  const [isMounting, setMounting] = useState(true);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : null;
      user ? setMounting(false) : setMounting(false);
    });
  }, []);
  if (isMounting) {
    return null;
  }
  const handleUpdate = async () => {
    router.push(`/update/${scriptID}`);
  };
  const handleDelete = async () => {
    try {
      const docRef = doc(db, "userScripts", scriptID);
      await deleteDoc(docRef)
        .then((res) => {
          toast({
            description: "Your script has been successfully Deleted.",
          });
          window.location.reload();
        })
        .catch((err) => {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        });
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <>
      <div className="absolute right-0">
        {userID === isUser?.uid ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <BiDotsHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Ownership Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleUpdate}>
                  <RxUpdate className="mr-2 h-4 w-4" />
                  <span>Update</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                  <AiOutlineDelete className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </>
  );
};

export default Ownership;
