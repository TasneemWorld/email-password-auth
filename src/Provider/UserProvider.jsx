import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const userContext = createContext(null);
const auth = getAuth(app)

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth, email, password);
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
        ProfileUpdate
    }

    return (
        <userContext.Provider value={authInfo}>
            {children}
        </userContext.Provider>
    );
};

export default UserProvider;