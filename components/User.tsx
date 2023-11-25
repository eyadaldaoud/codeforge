import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { AiOutlineUpload } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";

const User = () => {
  const [isUser, setUser] = useState<any>();
  const [isMounting, setMounting] = useState(true);
  const router = useRouter();

  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : null;
      user ? setMounting(false) : setMounting(false);
    });
  }, []);

  if (isMounting) {
    return (
      <Avatar
        className="mx-4 cursor-pointer animate-pulse"
        style={{ animationDuration: "800ms" }}
      >
        <AvatarImage />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    );
  }

  return (
    <>
      {isUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="mx-4 cursor-pointer">
              <AvatarImage src={isUser?.photoURL} alt={isUser?.displayName} />
              <AvatarFallback>{isUser?.displayName}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              Signed in as {isUser?.displayName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/myscripts"}>
              <DropdownMenuItem className="cursor-pointer">
                <BsCodeSlash className="mr-2 h-4 w-4" />
                <span>My Scripts</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              onClick={() => router.replace("/upload")}
              className="cursor-pointer"
            >
              <AiOutlineUpload className="mr-2 h-4 w-4" />
              <span>Upload</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link
            href={"/login"}
            className="border rounded dark:bg-white dark:text-black text-white bg-black px-3 py-1.5 mx-2 hover:dark:bg-transparent hover:bg-transparent hover:dark:text-white hover:text-black ease-linear duration-100"
          >
            Login
          </Link>
        </>
      )}
    </>
  );
};

export default User;
