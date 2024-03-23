// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
import {ref} from 'firebase/database';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDjy_jKgR_5CbuMQQPTbHcrHhEPCObSHUM',
  authDomain: 'goabpay.firebaseapp.com',
  projectId: 'goabpay',
  storageBucket: 'goabpay.appspot.com',
  messagingSenderId: '374878092501',
  appId: '1:374878092501:web:4210df7601b9354835365c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);
const reference = ref;
export {auth, app, database, storage, db, reference};
