import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
// import {uuid} from 'uuidv4';
const Quiz = () => {
    const questions = JSON.parse(localStorage.getItem('Questions_data'))
    const [score, setScore] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const [options, setOptions] = useState([]);
    const [index, setIndex] = useState(0);
    const [flag, setFlag] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const [showScore, setShowScore] = useState(false);
    console.log(questions);
    useEffect(() => {
        console.log(score);
        // console.log("index set");

        setDisabled(true)
        setFlag(true)
        setCurrentQuestion(questions[index].value)
        setOptions(questions[index].choices)
    },[index])
    useEffect(() => {
        localStorage.setItem('attempted',false)
    }, []);

    const handleNext = (e) => {
        setAnswer(e)
        console.log(e,answer, questions[index].correctAnswer);
        if (e === questions[index].correctAnswer) {
            
            setScore(score + 1)
            console.log("sets score", score,index);
        }
        if(index<questions.length-1){

            setIndex(index+1)
        }
        else {
            setShowScore(true);
            localStorage.setItem('score', score.toString()+'/'+questions.length.toString())
            
            
        }
        setAnswer('')
    }
    // const handleAnswer=(e)=>{
    //     // console.log(e)
    //     setAnswer(e)
    //     setDisabled(false)
    // }
    const frame = (
        <div className='app'>
			{showScore ? (
				<div id="scroreOuterBox">
                    <div id="innereScoreBox">
					You scored {score} out of {questions.length}
                    </div>
				</div>
			) : (
				<>

                <div class="quizBody">
                    <div id="boxGradient">
					<div  class="quizInnerBody">
                    <div id="ques">
					<span>Question {index + 1}</span>/{questions.length}
				</div>
                <div   class="innerBody">
                    <div class="makeCenter">{questions[index].value}</div> 
					<div id ="center">
						{questions[index].choices.map((answerOption) => (
							<button class="optionsSection" onClick={() => handleNext(answerOption)}>{answerOption}</button>
						))}
                    </div>
				</div>
            </div>
        </div>
    </div>
				</>
			)}
		</div>
        // <div className="bg-yellow-500">
        //     {currentQuestion}
        //     <ul >
        //         {options.map(option => (<li
        //                                     onClick={()=>{handleAnswer(option)}}
        //                                     key={option}
        //                                     className={(answer===option?"bg-white ":"") +"border border-black"}>{option}
        //                                 </li>))}
        //     </ul>

        //     {flag &&
        //         <button onClick={() => {handleNext()}}
        //                                 disabled={disabled}
        //                                 className={answer?"bg-blue-200":"bg-green-500"} >{index===questions.length-1?'Submit':'Next'}
        //         </button>}
        // </div>
    )
    return (
        <>
            {localStorage.getItem('attempted') === 'false' && frame}
        </>
    );
};

export default Quiz;
