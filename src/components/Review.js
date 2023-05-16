import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {setDoc,doc} from 'firebase/firestore';
import {db} from "../Firebase";
const Review = () => {
    const [saved, setSaved] = React.useState(false);
    const [data, setData] = React.useState([]);
    // const quizRef= collection(db, localStorage.getItem("uid"));
    let navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('Question_data')===undefined){
            navigate("/Home")
        }
        else{
            setData(JSON.parse(localStorage.getItem('Question_data')))
        }
    },[navigate])
    const handleSave=async ()=>{
        await setDoc(doc(db,localStorage.getItem("uid"),localStorage.getItem("Quiz_topic")),{topic:localStorage.getItem('Quiz_topic'),data:data});
        setSaved(true)
        setTimeout(()=>{
            localStorage.removeItem('Quiz_topic');
            localStorage.removeItem('Question_data');
            navigate("/Home")
        },1500)
    }

    return (
        <div id = "outerDiv">
            <div>
            <div id="topic">
            <span >Topic : {localStorage.getItem('Quiz_topic')}</span></div>
            <div id="innerDiv">
            
            {data.map((item, index) => {
                return (
                    <div  key={'ques-div'+index.toString()}>
                        <div id="quess">
                        Q{index+1}. {item.value}</div>
                        <div key={'ans-div'+index.toString()}>
                            {item.choices.map((choice, index2) => {
                                return (<span key={'span'+index.toString()+index2.toString()}>{index2+1}. {choice}<br></br></span>)
                            })}
                            {item.correctAnswer}
                        </div>

                    </div>
                )
            })}
            </div>
            <div id="Savebtn">
            <button id="back"onClick={()=>navigate('/Maker')} disabled={saved}>Back to Change</button>
            <button id="save" onClick={()=>{handleSave()}} disabled={false}> Save Quiz</button>
            {saved && <div id="saved">Quiz Saved</div>}
            </div>
            </div>
        </div>
    );
};

export default Review;
