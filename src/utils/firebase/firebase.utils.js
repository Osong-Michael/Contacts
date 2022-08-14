import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    Timestamp,
    query,
    onSnapshot,
    orderBy,
    updateDoc,
    doc,
    deleteDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-qQWbj0eBZDdrFqUSCZeQ1jZlHnYZSH4",
    authDomain: "contacts-db-11cc0.firebaseapp.com",
    projectId: "contacts-db-11cc0",
    storageBucket: "contacts-db-11cc0.appspot.com",
    messagingSenderId: "685739338793",
    appId: "1:685739338793:web:421369252e9ddcb22c0038"
};
  

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(firebaseApp);

export const signInUserWithEmailAndPassword = async ({ email, password }) => {
    if (!email || !password) return;

    try {
        const user =  await signInWithEmailAndPassword(auth, email, password);
        return user
    } catch (error) {
        alert(error)
    }

};

export const signOutUser = async () => await signOut(auth);

export const addToContactList = async ({ firstName, lastName, email, phoneNumber, address }) => {
    try {
        await addDoc(collection(db, 'contacts'), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            createdAt: Timestamp.now(),
        })
    } catch (error) {
        alert(error);
    }
};

export const getAllContacts = callback => {
    const q = query(collection(db, 'contacts'), orderBy('firstName', 'asc'));
    onSnapshot(q, (querySnapshot) => {
        callback(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        })));
    });
};

export const updateContactInfo = async (id, { firstName, lastName, email, phoneNumber, address }) => {
    const contactRef = doc(db, 'contacts', id);
    try {
        await updateDoc(contactRef, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
        })
    } catch (error) {
        alert(error)
    }
};

export const deleteContact = async id => {
    const contactRef = doc(db, 'contacts', id);
    try {
        await deleteDoc(contactRef);
    } catch (error) {
        alert(error);
    }
};