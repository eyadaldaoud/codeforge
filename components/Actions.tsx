import React from "react";
import { motion } from "framer-motion";
import { ListMenu } from "./utils/Lists";
import Link from "next/link";
import { Button } from "./ui/button";

const Actions = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 w-full sm:grid-cols-3">
        {ListMenu.map((item, index) => (
          <Link
            target={item.href != "/scripts" ? "_blank" : ""}
            href={item.href}
            key={index}
            className="m-4 rounded"
          >
            <motion.li
              animate={{
                y: [50, 0],
                opacity: 1,
                transition: { delay: 2.2, duration: 0.5, type: "tween" },
              }}
              initial={{ opacity: 0, border: "0" }}
              className="flex rounded"
              whileHover={{ scale: 1.2 }}
            >
              <Button variant="default" size="lg" className="w-full">
                {item.name}
                <span className="ml-4">{item.icon}</span>
              </Button>
            </motion.li>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Actions;
