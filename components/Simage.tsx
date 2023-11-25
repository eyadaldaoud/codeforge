"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const Simage = ({ urlProps }: any) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Image
            className={
              isLoading
                ? "bg-slate-400 animate-pulse h-96 w-[600px] rounded"
                : "h-full sm:h-96 w-[600px] sm:object-fill object-contain rounded cursor-pointer"
            }
            style={{ animationDuration: "800ms" }}
            src={urlProps}
            width={1920}
            height={1080}
            blurDataURL={urlProps}
            placeholder="blur"
            loading="lazy"
            onLoadingComplete={() => setLoading(false)}
            alt="Script image"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <div>
          <Image
            style={{ animationDuration: "800ms" }}
            src={urlProps}
            width={1920}
            height={1080}
            blurDataURL={urlProps}
            placeholder="blur"
            loading="lazy"
            onLoadingComplete={() => setLoading(false)}
            className="w-full h-[500px]"
            alt="Script image"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Simage;
