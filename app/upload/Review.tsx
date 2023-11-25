import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { languageImages } from "@/components/utils/Langimage";
import { scriptImage } from "@/components/utils/Types";

export function Review({ title, body, Language, userProps }: any) {
  const currentDate = new Date();
  return (
    <Card className="w-[380px] relative  block h-[300px]">
      <img
        src={languageImages[Language as keyof scriptImage] || ""}
        alt={`${Language} Logo`}
        className="absolute inset-0 h-full w-full object-cover opacity-5"
      />

      <CardHeader>
        <CardTitle className="break-words">
          {!title ? <>Script title</> : title}
        </CardTitle>
        <CardDescription className="break-words">{userProps}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 h-[140px]">
        <div className="">
          <p className="break-words">
            {!body ? (
              <>Script Description</>
            ) : (
              <>{body.length >= 90 ? <>{body.slice(1, 100)}....</> : body}</>
            )}
          </p>
        </div>
        <div className="mt-auto items-center rounded-md">
          Published on: {currentDate.toString().slice(3, 15)}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Eye className="mr-2 h-4 w-4" /> View Script
        </Button>
      </CardFooter>
    </Card>
  );
}
