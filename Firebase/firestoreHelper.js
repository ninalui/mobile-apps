import { database } from "./firebaseSetup";
import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc } from "firebase/firestore";


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

export async function deleteAll(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        querySnapshot.forEach((docSnapshot) => {
            deleteDoc(doc(database, collectionName, docSnapshot.id));
        });
        console.log("All documents deleted from ", collection);
    }
    catch (err) {
        console.log("delete all error", err);
    }
}

export async function updateDB(id, data, collectionName) {
    try { 
        await updateDoc(doc(database, collectionName, id), data);
        console.log("Document updated with ID: ", id);
    }
    catch (err) {
        console.log("update db error", err);
    }
}