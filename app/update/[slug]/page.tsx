import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import Update from "./Update";

export default async function Page({ params }: { params: { slug: string } }) {
  const docRef = doc(db, "userScripts", params.slug);
  const docSnap: any = await getDoc(docRef);
  if (!docSnap.exists()) {
    redirect("/scripts");
  }
  return (
    <Update
      scriptData={JSON.parse(JSON.stringify(docSnap.data()))}
      scriptID={params.slug}
    />
  );
}
