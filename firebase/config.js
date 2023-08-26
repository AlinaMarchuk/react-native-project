// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore, collection } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3R8MEEAUyAjWkZS4q5NZnZQ_KQbNUYkc",
  authDomain: "reactnativetutorial-d05d0.firebaseapp.com",
  projectId: "reactnativetutorial-d05d0",
  storageBucket: "reactnativetutorial-d05d0.appspot.com",
  messagingSenderId: "704217657889",
  appId: "1:704217657889:web:3b95ae5830f4412091a960",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const colPubs = collection(db, "pubs");
