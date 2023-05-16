import React, {useState} from 'react';
// import {data} from './data';
import {useNavigate} from 'react-router-dom'
import {collection, getDocs ,doc,deleteDoc} from 'firebase/firestore';
import {db} from "../Firebase";
import Cardgrid from '../css/cardgrid';
import Card from '../css/card';
// import Quiz from './Quiz';
// import login from "./Login";

const Home = () => {

    const [noData, setNoData] =useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const quizRef= collection(db,localStorage.getItem('uid'));
    const getData= async ()=>{
        const docs=await getDocs(quizRef);
        const userDocs=docs.docs.map(doc=>{
            return{id:doc.id,data:doc.data()}
        });
        // console.log(userDocs)
        if(userDocs.length===1){
            setNoData(true)
        }
        else{
            setData(userDocs.filter(item=>item.id!=="Empty Doc"))
        }

        // const data = await getDocs(quizRef)
        // if(localStorage.getItem('newUser')===true.toString()) {
        //     console.log('working')
        //         await setDoc(doc(db,'Quiz_data',localStorage.getItem('uid')),{});
        //     localStorage.setItem('newUser',false);
        // }

        // await setDoc(doc(db,'test2',localStorage.getItem('uid')),{});
        // const re=await db .collection('test').doc('Hello there').listCollections();
        // const re=await collection(db,'test3')
        // await getDocs(re).then(e=>{
        //     console.log(e.docs.map(d=>d.data()).length,'result')
        // }).catch(e=>{
        //     console.log(e)
        // });
        // const userRef= doc(db,'Quiz_data',localStorage.getItem('uid'));
        // const userData = await getDoc(userRef);
        // console.log(userData.data());
        // if(JSON.stringify(userData.data())==='{}') {
        //     setNoData(true);
        // }

        // const users=data.docs.map(doc=>doc.id);
        // console.log(data.docs.map(doc=>doc.id));
    }
    const maker=()=>{
        //'Question_data'
        //'Quiz_topic'
        if(localStorage.getItem('Quiz_topic')!==null) {
            localStorage.removeItem('Quiz_topic');
        }
        if(localStorage.getItem('Question_data')!==null) {
            localStorage.removeItem('Question_data');
        }
        navigate('/Maker')
    }
    const taker=()=>{
        navigate('/Taker')
    }
    const deleteQuiz=async(e)=>{
        await deleteDoc(doc(db,localStorage.getItem('uid'),e.target.id)).then(async ()=>{
            const ref=await getDocs(quizRef);
            const dat=ref.docs.map(doc=>{
                return{id:doc.id,data:doc.data()}
            });
            setData(dat.filter(item=>item.id!=="Empty Doc"))
        }).catch(e=>{
            console.log(e)})
    }
    const handleLogout=()=>{
        localStorage.setItem("newUser", false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("profile");
        localStorage.removeItem("uid");
        navigate("/")
    }
    const copy2clip=(e,i)=>{

        navigator.clipboard.writeText(e.target.innerText).then(()=>{
            document.getElementById("msg"+i.toString()).innerHTML="Copied!";
        }).catch(()=>{
            document.getElementById("msg"+i.toString()).innerHTML="Failed to Copy!";
        });

        setTimeout(()=>document.getElementById("msg"+i.toString()).innerHTML="", 1000);
    }
    return (
         //className="bg-amber-300 w-full flex flex-col space-y-2 pt-2 pb-4" 
        <div id="homebody">
            <div >
        <div class= "home">
            {/*{localStorage.getItem('loaded') === 'true'? <Quiz/>:null}*/}
            <h2 >{"Welcome to Quizzery"}</h2>
            <div >
            <button id="Homebtn" onClick={getData} >Get Quizzes that you made</button><br></br>
            <button id="Homebtn" onClick={()=>maker()} >Create Quiz</button><br></br>
            <button  id="Homebtn" onClick={()=>taker()} >Take Quiz</button><br></br>
            <button id="Homebtn"
                onClick={()=>handleLogout()}>
                Logout
                </button>
                </div>
                </div>
                <div id="noquiz">
            {noData && <p >You have not made any quiz</p>}</div>
            {data && data.map((item, index) => {
                return (
                    <div class="getQuiz"
                        key={'div quiz'+index.toString()}>
                        <span >QUIZ {index+1}</span>
                        <p  key={'head quiz'+index.toString()}></p>
                        <hr />
                        <p><b>Topic :</b> {item.id}</p>
                        <span><b>Share Code :</b><span >( Click below to Copy! ) <span id={'msg'+index.toString()} ></span></span></span>
                        <span id="copyText" onClick={(e)=>copy2clip(e,index)} >{localStorage.getItem('uid')+"//"+item.id}</span>

                        <button
                            key={'button quiz'+index.toString()}
                            id={item.id}
                            onClick={e => deleteQuiz(e)}>
                            Delete Quiz
                        </button>

                    </div> 
                )
            })}

        </div>
        </div>
    );
};

export default Home;
