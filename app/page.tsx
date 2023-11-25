"use client";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

import { AccordinMenu } from "@/components/utils/Lists";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";
import Actions from "@/components/Actions";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { anton, rubik } from "@/components/utils/Fonts";
export default function Home() {
  const router = useRouter();

  const handleButton = () => {
    onAuthStateChanged(auth, (user) => {
      user ? router.replace("/upload") : router.replace("/login");
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="mt-20 w-[1000px] card border rounded border-slate-300 dark:border-slate-900">
          <motion.div className="p-8">
            <motion.div
              className="flex"
              animate={{ transition: { delay: 0.5 }, opacity: 1, border: 5 }}
              initial={{ border: 0 }}
            >
              <motion.p
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.2 },
                }}
                initial={{ opacity: 0 }}
                className={`${anton.className} sm:text-5xl xs:text-4xl text-3xl text-black dark:text-white`}
              >
                Code
              </motion.p>
              <motion.p
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 1 },
                }}
                initial={{ opacity: 0 }}
                className={`${anton.className} sm:text-5xl xs:text-4xl text-3xl text-indigo-400 ml-2 mr-8 mb-2`}
              >
                Forge
              </motion.p>
            </motion.div>
            <motion.p
              className="font-mono"
              animate={{
                opacity: 1,
                transition: { duration: 1, delay: 2 },
                y: [-20, 0],
              }}
              initial={{ opacity: 0 }}
            >
              A Place to share and download scripts.
            </motion.p>
            <motion.div
              className="font-mono"
              animate={{
                opacity: 1,
                transition: { duration: 1, delay: 2.3, type: "spring" },
                scale: [1, 1.1, 1],
              }}
              initial={{ opacity: 0 }}
            >
              <Button
                onClick={handleButton}
                className={`${rubik.className} mt-4`}
                variant="default"
                color="success"
              >
                Get Started
              </Button>
            </motion.div>

            <CardFooter className="block mt-16 w-fit ml-auto mr-auto">
              <Actions />

              <motion.div
                animate={{
                  opacity: 1,
                  transition: { duration: 1, delay: 2.3, type: "spring" },
                  scale: [1, 1.1, 1],
                }}
                initial={{ opacity: 0 }}
              >
                <Accordion
                  type="single"
                  collapsible
                  className="mt-10 dark:bg-transparent bg-black bg-opacity-60 rounded text-white p-4 card"
                >
                  {AccordinMenu.map((item, index) => (
                    <AccordionItem value={item.title} key={index}>
                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      <AccordionContent className="max-w-[540px]">
                        {item.body}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </CardFooter>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
