"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send_Request } from "./Server-action";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Btn from "./Btn";

export default function Page() {
  const [isUser, setUser] = useState<any>();
  const [userEmail, setEmail] = useState<any>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user.displayName) : router.replace("/login");
      user ? setEmail(user.email) : null;
    });
  }, []);
  const send_message = Send_Request.bind(null, isUser);
  return (
    <div className="flex justify-center">
      <Card>
        <div className="flex flex-col">
          <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link
              className="flex items-center justify-center"
              href="https://eyad.vercel.app"
              target="_blank"
            >
              <svg
                className=" h-6 w-6"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span className="sr-only">Support Page</span>
            </Link>
          </header>
          <main className="flex-grow">
            <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Contact Us
                  </h1>
                  <p className="mx-auto max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                    Have a question or an issue? Fill out the form below and our
                    support team will get back to you as soon as possible.
                  </p>
                </div>
                <form
                  ref={ref}
                  className="mt-10 grid gap-6"
                  action={async (FormData) => {
                    await send_message(FormData);
                    ref?.current?.reset();
                  }}
                >
                  <Input
                    className="border rounded-md px-3 py-2 text-sm"
                    placeholder="Your Name"
                    type="text"
                    name="Name"
                    required
                    value={isUser}
                    disabled
                  />
                  <Input
                    className="border rounded-md px-3 py-2 text-sm"
                    placeholder="Your Email"
                    type="email"
                    name="Email"
                    required
                    value={userEmail}
                    disabled={userEmail ? true : false}
                  />
                  <Textarea
                    className="border rounded-md px-3 py-2 text-sm h-32 "
                    placeholder="Your Message"
                    required
                    name="Message"
                  />
                  <Btn />
                </form>
              </div>
            </section>
          </main>
        </div>
      </Card>
    </div>
  );
}
