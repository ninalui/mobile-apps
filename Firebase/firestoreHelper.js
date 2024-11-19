import { database } from "./firebaseSetup";
import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, QuerySnapshot, setDoc, getDoc } from "firebase/firestore";


export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data);
        // console.log("Document written with ID: ", docRef.id);
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

export async function setDB(id, data, collectionName) {
    try { 
        await setDoc(doc(database, collectionName, id), data, { merge: true });
        console.log("Document set with ID: ", id);
    } catch (err) {
        console.log("set db error", err);
    }
}

export async function getAllDocuments(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        const data = [];
        if (querySnapshot.empty) {
            console.log("No documents found in ", collectionName);
            return data;
        }
        querySnapshot.forEach((docSnapshot) => {
            data.push(docSnapshot.data());
        });
        return data;
    }
    catch (err) {
        console.log("get all documents error", err);
    }
}

export async function getDocumentById(id, collectionName) {
    try {
        const docRef = doc(database, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    }
    catch (err) {
        console.log("get document by id error", err);
    }
}