import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const userContext = createContext(null);
const googleProvier = new GoogleAuthProvider();
const auth = getAuth(app)

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () =>{
        return signInWithPopup(auth,googleProvier);
    }

    const logOut = () =>{
        return signOut(auth)
    }

    const resetPassword = (email) =>{
        console.log(email)
        return sendPasswordResetEmail(auth,email);
    }

    const ProfileUpdate = (user, name) =>{
        return updateProfile(user,{
            displayName: name
        })
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            console.log('auth state change',currentUser);
            setUser(currentUser)
            setLoading(false);
        });

        return () =>{
            unsubscribe();
        }

    },[])

    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        resetPassword,
        ProfileUpdate,
        loading,
        googleSignIn,
    }

    return (
        <userContext.Provider value={authInfo}>
            {children}
        </userContext.Provider>
    );
};

export default UserProvider;