import React, {useEffect, useState} from 'react';
import {auth,provider} from "../Firebase";
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {collection, getDocs ,setDoc,doc} from 'firebase/firestore';
import { db } from "../Firebase";


const Login = () => {

    const navigate = useNavigate();
    const [newUser, setNewUser] = useState(false)


    const signInWithGoogle =async () => {

        signInWithPopup(auth, provider).then(async (result) => {
            console.log(auth);
            console.log(result)
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("name", result.user.displayName);
            localStorage.setItem("email", result.user.email);
            localStorage.setItem("profile", result.user.photoURL);
            localStorage.setItem("uid", result.user.uid);
            localStorage.setItem("newUser", false);

            const UserCollection=await collection(db,result.user.uid)

            // eslint-disable-next-line no-unused-vars
            await getDocs(UserCollection).then(async(result) => {
                if(result.docs.map(d=>d.data()).length===0){
                    setNewUser(true)
                    await setDoc(doc(db,localStorage.getItem('uid'),'Empty Doc'), {})
                }
            }).catch(e=>{
                console.log(e)})

            // eslint-disable-next-line no-unused-vars
            setTimeout(()=>{

                navigate("/Home")
            },1000)
        }).catch((error) => {
            console.log(error.message);
        })
    }

    return (
        // className={"bg-amber-300 h-screen w-fit mx-auto p-6 rounded border-slate-500 border-x-2 text-center"}
        <div id="Loginbody">
        <div id="login">
            <h3 >Welcome To Quizzzery <span></span></h3>
            <p >Here you can Create app and Share Code for others to attend the quiz</p>
            <button onClick={signInWithGoogle} id="btnLogin">Sign In With Google</button>
            {/* {newUser && <p className="text-xl py-2 text-violet-500">New user</p>} */}
        </div>
        </div>
        
    );
};

export default Login;
