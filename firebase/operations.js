import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, colPubs } from "./config";
import { getDocs, addDoc, query, where } from "firebase/firestore";

export const registerDB = async ({ email, password, displayName }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // const updResult = await updateProfile(auth.currentUser, { displayName });
    console.log("firebase response", result);
    //console.log("updated response", updResult);
    return result;
  } catch (error) {
    throw error;
  }
};

// або більш короткий запис цієї функції
// const registerDB = ({ email, password }) =>
//   createUserWithEmailAndPassword(auth, email, password);

export const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged((user) => {
    onChange(user);
  });
};

export const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    console.log("firebase responce:", credentials);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {
    // оновлюємо його профайл
    try {
      const updUser = await updateProfile(user, update);
      console.log("updUser", updUser);
      return updUser;
    } catch (error) {
      throw error;
    }
  }
};

export const getAllPublicationsDB = async () => {
  try {
    const user = auth.currentUser;
    console.log("currentUser:", user);
    const q = query(colPubs, where("owner", "==", user.email));
    const snapshot = await getDocs(q);

    if (snapshot.docs.length > 0) {
      return snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    }
    return [];
  } catch (error) {
    console.log("getAllError:", error);
  }
};

export const addPublicationDB = async (data) => {
  try {
    console.log("data", data);
    const user = auth.currentUser;
    const result = await addDoc(colPubs, { ...data, owner: user.email });
    console.log(result);
    return result;
  } catch (error) {
    console.log("error add publication", error);
  }
};
