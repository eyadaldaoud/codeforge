import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase";
import { ToastAction } from "@radix-ui/react-toast";
import { signInWithPopup } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OAuthProvider } from "firebase/auth";
import { BsMicrosoft } from "react-icons/bs";
const Microsoft = () => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(false);
  }, []);
  const FacebookLogin = async () => {
    const provider = new OAuthProvider("microsoft.com");
    setLoading(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        setLoading(false);
        toast({
          title: "Successfully signed in",
          description: `Signed in as ${result?.user?.displayName}`,
        });
        router.replace("/");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `There was a problem with your request. ${errorMessage}`,
        });
      });
  };

  return (
    <Button onClick={FacebookLogin} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </>
      ) : (
        <>
          <BsMicrosoft className="mr-2 h-6 w-6" />{" "}
          <span className="text-lg">Microsoft</span>
        </>
      )}
    </Button>
  );
};

export default Microsoft;
