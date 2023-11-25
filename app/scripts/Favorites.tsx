"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Favorites = () => {
  const [isFavorite, setFavorite] = useState(false);
  const handleFavorite = async () => {
    setFavorite(!isFavorite);
    if (isFavorite) {
      null;
    }
  };
  return (
    <Button onClick={handleFavorite} className="z-20 mt-2 ml-2">
      {isFavorite ? (
        <AiFillHeart className="h-4 w-4" />
      ) : (
        <AiOutlineHeart className="h-4 w-4" />
      )}
    </Button>
  );
};

export default Favorites;
