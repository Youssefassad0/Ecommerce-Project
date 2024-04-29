import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function AlreadyLogin() {
    const naviagte = useNavigate();
    const [conter , setConter]=useState(0);
    useEffect(()=>{
        setTimeout(()=>{
            console.log(conter);
            setConter(conter + 1);
            naviagte('/');
        },6000)
    },[conter])
  return (
    <div className="container py-5">
        <div className="row justify-content-center">
            <h2>Already Registred !!!  </h2>
            Go back to the home page : {conter}
        </div>
    </div>
  )
}

export default AlreadyLogin