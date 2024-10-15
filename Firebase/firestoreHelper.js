import { database } from "./firebaseSetup";
import { collection, addDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore"; 

export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    }
    catch (err) {
        console.log("write to db error", err);
    }
}

export async function deleteFromDB(id, collectionName) {
  try { 
    await deleteDoc(doc(database, collectionName, id));
    console.log("Document deleted with ID: ", id);
  }
  catch (err) {
    console.log("delete from db error", err);
  }
}