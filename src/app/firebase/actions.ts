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

export { addData };
