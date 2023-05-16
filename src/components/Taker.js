import React, {useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from "../Firebase";
// import Quiz from "./Quiz";
import {useNavigate} from "react-router-dom";
const Taker = () => {
    const [enable,setEnable] = useState('');
    const [code, setCode] = useState('');
    const [warn, setWarn] = useState(false);
    const navigate = useNavigate();
    const handleCode=(e)=>{
        setCode(e.target.value);
    }

    const getQuiz=async()=>{
        let [uid,title]=code.split('//');
        console.log(uid,title)
        const UserCollection=await collection(db,uid)
        await getDocs(UserCollection).then(async(result) => {
            if(result.docs.map(d=>d.data()).length===0){
                setWarn(true)
                setEnable(null)
            }
            else if(!result.docs.map(d=>d.data().topic).includes(title)){
                setWarn(true)
                setEnable(null)
            }
            else{
                setWarn(false)
                setEnable(title)
                localStorage.setItem('Questions_data',JSON.stringify(result.docs.map(d=>d.data()).filter(d=>d.topic===title)[0].data))
                localStorage.setItem('Questions_Title',JSON.stringify(result.docs.map(d=>d.data()).filter(d=>d.topic===title)[0].topic))
                setTimeout(()=>{
                    navigate('/Quiz')
                })
            }
            console.log(result.docs.map(d=>d.data()))
        }).catch(e=>{
            console.log(e)})

    }
    return (
        <div class='takeDiv'>
            <div>
            <div class='innerDiv'>
              <h1>Enter the Quiz code Provided</h1>
              <div id="input">
            <input id="codepastebox" type="text" value={code} onChange={handleCode}/>
            </div>
            <div id="input">
            <button class='takeBtn' onClick={getQuiz}>Let's Start</button>
            </div> 
            </div>
            <div id="wrongCode">
            {warn && <p>Wrong Code Entered</p>}</div>
            {enable && <p>Entering Quiz: {enable}</p>}
            </div>
        </div>
    );
};
export default Taker;
