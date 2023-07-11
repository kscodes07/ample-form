import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const addData = async (formValues: any) => {
  try {
    console.log("hitting firebase");
    await addDoc(collection(db, "applicants"), {
      formValues,
    });
    console.log("added to firebase");
  } catch (err) {
    console.log("error");
  }
};
const getData = async () => {
  try {
    const list: any = [];
    const colRef = collection(db, "applicants");
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach((doc: any) => {
      list.push(doc.data());
    });
    return list;
  } catch (err) {
    console.log(err);
  }
};

export { addData, getData };
