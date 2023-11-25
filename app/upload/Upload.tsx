"use client";

import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Review } from "./Review";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";
import { Rules } from "@/components/Rules";
import { useRouter } from "next/navigation";

const Upload = ({ userName, userID }: any) => {
  const [Language, setLanguage] = React.useState("Other");
  const [isLoading, setLoading] = React.useState(false);

  const router = useRouter();
  React.useEffect(() => {
    getScripts();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      useage: "",
      notes: "",
      imageurl: "",
      videourl: "",
      downloadurl: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(2, "Too Short!")
        .max(25, "Too Long!")
        .required("Required"),
      body: Yup.string()
        .min(2, "Too Short!")
        .max(1500, "Too Long!")
        .required("Required"),
      useage: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const currentDate = new Date();
      await addDoc(collection(db, "userScripts"), {
        title: values.title,
        body: values.body,
        link: values.downloadurl,
        image: values.imageurl,
        scriptLang: Language,
        video: values.videourl,
        author: userName,
        useage: values.useage,
        notes: values.notes,
        Likes: 0,
        Dislikes: 0,
        uid: userID,
        currentDate,
      })
        .then((res) => {
          setLoading(false);
          toast({
            description: "Your script has been successfully uploaded.",
          });
          router.push("/scripts");
        })
        .catch((err) => {
          setLoading(false);
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        });
    },
  });
  const getScripts = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, "userScripts"),
      where("uid", "==", userID),
      where("currentDate", ">=", today)
    );
    try {
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((item) => ({
        data: item.data(),
        id: item.id,
      }));
      if (docs.length >= 3) {
        router.push("/scripts");
        toast({
          title: "Uh oh! Something went wrong.",
          description: "You reached your daily limit 3 scripts/day.",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex justify-center mt-48 flex-wrap">
      <Card className="w-[600px] mr-4 mb-4">
        <Rules />
        <form onSubmit={formik.handleSubmit}>
          <CardHeader>
            <CardTitle>Add new script</CardTitle>
            <CardDescription>
              Get started by filling the details for your script.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title*</Label>
                <Input
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder="Title of your script"
                  className={formik.errors.title ? "text-red-500" : ""}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  name="body"
                  onChange={formik.handleChange}
                  value={formik.values.body}
                  placeholder="Description of your script"
                  className={formik.errors.body ? "text-red-500" : ""}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Useage*</Label>
                <Textarea
                  name="useage"
                  onChange={formik.handleChange}
                  value={formik.values.useage}
                  placeholder="How to use your script"
                  className={formik.errors.useage ? "text-red-500" : ""}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Notes</Label>
                <Textarea
                  name="notes"
                  onChange={formik.handleChange}
                  value={formik.values.notes}
                  placeholder="Notes for your script"
                  className={formik.errors.notes ? "text-red-500" : ""}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="language">Language*</Label>

                <Select onValueChange={(e) => setLanguage(e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="C#">C#</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Image url*</Label>
                <Input
                  type="url"
                  required
                  name="imageurl"
                  onChange={formik.handleChange}
                  value={formik.values.imageurl}
                  placeholder="Image url of your script"
                  className={formik.errors.imageurl ? "text-red-500" : ""}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Video url</Label>
                <Input
                  type="url"
                  name="videourl"
                  onChange={formik.handleChange}
                  value={formik.values.videourl}
                  placeholder="Video showcases your script"
                  className={formik.errors.videourl ? "text-red-500" : ""}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Download link*</Label>
                <Input
                  type="url"
                  name="downloadurl"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.downloadurl}
                  placeholder="Link to download your script"
                  className={formik.errors.downloadurl ? "text-red-500" : ""}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => formik.resetForm()}
            >
              Clear
            </Button>
            <Button type="submit" disabled={isLoading}>
              Upload
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Review
        title={formik.values.title}
        body={formik.values.body}
        Language={Language}
        imageurl={formik.values.imageurl}
        downloadurl={formik.values.downloadurl}
        userProps={userName}
      />
    </div>
  );
};

export default Upload;
