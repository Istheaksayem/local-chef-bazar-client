import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { auth } from '../../Firebase/Firebase.init';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
    // register user
     const registerUser = (email, password) => {
        
        return createUserWithEmailAndPassword(auth, email, password)
    }
//  Login User
     const signInUser = (email, password) => {
        
        return signInWithEmailAndPassword(auth, email, password)
    }

    const authInfo ={
        registerUser,
        signInUser,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;