import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  RiThumbDownFill,
  RiThumbDownLine,
  RiThumbUpFill,
  RiThumbUpLine,
} from "react-icons/ri";

const fetchDocuments = async () => {
  const querySnapshot = await getDocs(collection(db, "userRating"));
  const documentSnapshots = querySnapshot.docs.map((item) => ({
    data: JSON.parse(JSON.stringify(item.data())),
    id: item.id,
  }));
  return documentSnapshots;
};

const Rating = ({ scriptID, userID }: any) => {
  const [hasLike, setLike] = useState(false);
  const [hasDislike, setDislike] = useState(false);
  const readDocs = async () => {
    try {
      if (userID) {
        const myData = await fetchDocuments();
        let hasMatch = false; // Flag to track if a match is found

        myData.forEach((data) => {
          if (
            data &&
            data.data.userID === userID &&
            data.data.scriptID === scriptID
          ) {
            hasMatch = true;

            if (data.data.Likes == 1) {
              setLike(true);
              setDislike(false);
            } else if (data.data.Dislikes == 1) {
              setLike(false);
              setDislike(true);
            } else {
              setLike(false);
              setDislike(false);
            }
          }
        });

        if (!hasMatch) {
          setLike(false);
          setDislike(false);
        }
      }
    } catch (error) {
      console.error("Error fetching userRating document:", error);
    }
  };

  const handleLikes = async () => {
    const DocRef = doc(db, "userScripts", scriptID);
    const getData = await getDoc(DocRef);
    setLike(true);
    setDislike(false);
    await addDoc(collection(db, "userRating"), {
      Likes: 1,
      Dislikes: 0,
      userID: userID,
      scriptID: scriptID,
    });
    await updateDoc(DocRef, {
      Likes: getData?.data()?.Likes ? getData?.data()?.Likes + 1 : 1,
    });
  };

  const handleDislike = async () => {
    const DocRef = doc(db, "userScripts", scriptID);
    const getData = await getDoc(DocRef);
    setDislike(true);
    setLike(false);
    await addDoc(collection(db, "userRating"), {
      Likes: 0,
      Dislikes: 1,
      userID: userID,
      scriptID: scriptID,
    });
    await updateDoc(DocRef, {
      Dislikes: getData?.data()?.Dislikes ? getData?.data()?.Dislikes + 1 : 1,
    });
  };

  useEffect(() => {
    readDocs();
  }, [handleDislike, handleLikes]);

  return (
    <div className="flex justify-center m-4">
      <Button
        className="mr-2"
        onClick={handleLikes}
        disabled={!userID || hasLike || hasDislike}
      >
        {hasLike ? (
          <RiThumbUpFill className="ml-2 text-xl" />
        ) : (
          <RiThumbUpLine className="ml-2 text-xl" />
        )}
      </Button>
      <Button
        onClick={handleDislike}
        disabled={!userID || hasDislike || hasLike}
      >
        {hasDislike ? (
          <RiThumbDownFill className="ml-2 text-xl" />
        ) : (
          <RiThumbDownLine className="ml-2 text-xl" />
        )}
      </Button>
    </div>
  );
};

export default Rating;
