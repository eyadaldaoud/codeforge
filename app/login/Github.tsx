import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase";
import { ToastAction } from "@radix-ui/react-toast";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";

const Github = () => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(false);
  }, []);
  const GithuLogin = async () => {
    const provider = new GithubAuthProvider();
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
    <Button onClick={GithuLogin} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </>
      ) : (
        <>
          <FiGithub className="mr-2 h-6 w-6" />
          <span className="text-lg">Github</span>
        </>
      )}
    </Button>
  );
};

export default Github;
