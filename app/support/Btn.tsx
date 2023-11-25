"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function Btn() {
  const { pending } = useFormStatus();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Button disabled={isLoading || pending}>
      {pending ? <>Sending..</> : <>Send message</>}
    </Button>
  );
}
