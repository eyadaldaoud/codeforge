import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import Script from "./Script";

export default async function Page({ params }: { params: { slug: string } }) {
  const docRef = doc(db, "userScripts", params.slug);
  try {
    const docSnap: any = await getDoc(docRef);

    if (!docSnap.exists()) {
      redirect("/scripts");
    }
    return (
      <Script
        scriptData={JSON.parse(JSON.stringify(docSnap.data()))}
        scriptID={docSnap.id}
      />
    );
  } catch (error) {
    console.error("Error fetching document:", error);
    return (
      <div className="flex justify-center mt-20">
        <h1>Uh oh! Something went wrong.</h1>
      </div>
    );
  }
}
