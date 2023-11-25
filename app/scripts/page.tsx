import { collection, getDocs, limit, query } from "firebase/firestore";

import { db } from "@/lib/firebase";
import Scripts from "./Scripts";

const page = async () => {
  const querySnapshot = query(collection(db, "userScripts"), limit(12));
  const documentSnapshots = await getDocs(querySnapshot);

  const docs: any = documentSnapshots?.docs.map((item) => {
    return { data: JSON.parse(JSON.stringify(item.data())), id: item.id };
  });

  return <Scripts scriptsProps={docs} />;
};

export default page;
