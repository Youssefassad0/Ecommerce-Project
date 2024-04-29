import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../../firebase/firebase.config'
import { getAuth } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();
function LoginPage() {
    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                alert("Login Successfully Done !")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    return (
        <div className="m-5 p-5" >
          
        </div>
    )
}

export default LoginPage