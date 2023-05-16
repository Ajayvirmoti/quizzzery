import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
// import '..//css/maker.css'
const Maker = () => {
    const [save, setSave] = useState(false);
    const [warn, setWarn] = useState(false);
    const [warn2, setWarn2] = useState(false);
    const [warn3, setWarn3] = useState(false);
    const navigate = useNavigate();
    const templateQues = [{
        type: 'text', value: '',choices:['','','',''],correctAnswer:''
    }]
    const [topic, setTopic] = useState(localStorage.getItem('Quiz_topic')===null?'':localStorage.getItem('Quiz_topic'));
    const [arrQues, setArrQues] = useState(localStorage.getItem('Question_data')===null?templateQues:JSON.parse(localStorage.getItem('Question_data')));
    const handleClickADD = () => {
        setArrQues(arr => {
            return [...arr, {
                type: 'text', value: '', choices:['','','','']
            }]
        })
    }
    const handleClickREMOVE = () => {
        setArrQues(arrQues.slice(0,arrQues.length - 1));
    }
    const handleClickChoiceADD= (index) => {
        // console.log(index)
        setArrQues((arr)=>{
            const sam=[...arr]
            // console.log(swam[index].choices)
            const temp= {...sam[index]}
            // console.log(sam[index])
            temp.choices.push('')
            // console.log(sam[index].choices)
            // console.log(sam.slice(0,index),temp,sam.slice(index+1))
            return [...sam]
        })
    }
    const handleClickChoiceREMOVE= (index) => {
        // console.log(index)
        setArrQues((arr)=>{
            const sam=[...arr]
            // console.log(swam[index].choices)
            const temp= {...sam[index]}
            // console.log(sam[index])
            temp.choices.pop()
            // console.log(sam[index].choices)
            // console.log(sam.slice(0,index),temp,sam.slice(index+1))
            return [...sam]
        })
    }
    const handleCorrectAnswer=(e,i,j)=>{
        // console.log(e.target.value)
        if(e.target.value==='on'){
            setArrQues((arr)=>{
                const s=arr.slice()
                s[i].correctAnswer=document.getElementById(i.toString()+j.toString()).value.trim()
                return s
            })
        }
        // console.log(arrQues)

    }

    const handleChange = (e) => {
        e.preventDefault();
        const index = e.target.id;
        setArrQues((arr) => {
            const s = arr.slice();
            s[index].value = e.target.value;
            return s
        })
    }
    const handleChangeChoice= (e,i,j) => {
        // e.preventDefault();
        // const index=e.target.id;
        // console.log(arrQues[i].choices[j])
        setArrQues((arr)=>{
            const s=arr.slice();
            s[i].choices[j]=e.target.value;
            return s
        })
    }
    const handleSubmit=()=>{
        setWarn(false)
        setWarn2(false)
        for(let i=0;i<arrQues.length;i++){
            // console.log(arrQues[i].correctAnswer,i)
            if(topic===''){
                setWarn3(true)
                break
            }
            if(arrQues[i].value===''){
                setWarn2(true)
                break
            }
            if(arrQues[i].correctAnswer===''){
                // console.log('warning')
                setWarn(true)
                break
            }

            if (i===arrQues.length-1){
                console.log('saving')
                setSave(true)
                localStorage.setItem('Quiz_topic',topic)
                localStorage.setItem('Question_data',JSON.stringify(arrQues))
                navigate('/Review')
            }
        }
    }
    return (<div id="makerbody">
            <div class ="createquiz"  style={{pointerEvents: save?"none":"all"}}>
                <label htmlFor="topic" id = "textColor">Topic : </label>
                <input id = "topicBox" type="text" value={topic} onChange={(e)=>setTopic(e.target.value)}/>
                {arrQues.map((input, i) => {
                    // console.log(i)
                    return (<div key={'container'+i.toString()}>
                        Q{i+1}.
                        <input class="quesBox"
                            type={input.type}
                            value={input.value}
                            id={i}
                            key={i}
                            onChange={handleChange}
                            
                        />
                        {input.choices.map((choice, j) => {
                            return (
                                <React.Fragment key={'div-choice'+j.toString()}>
                                    <br></br>
                                    Option{j+1}.
                                    <input type="radio" name={'radio-'+i.toString()} onInput={(e)=>handleCorrectAnswer(e,i,j)}/>
                                    <input  class="optionBox"
                                        type="text"
                                        value={choice}
                                        id={i.toString()+j.toString()}
                                        key={i.toString()+j.toString()}
                                        onChange={e=>handleChangeChoice(e,i,j)}
                                    />
                                </React.Fragment>
                            )
                        })}
                        
                    </div>)
                })}
            
            <div id = "btnChoicesbox">
            <button  id = "btnChoices"
                onClick={() => {handleClickADD()}}>
                Add question
            </button>
            <button  id = "btnChoices"
                onClick={() => {handleClickREMOVE()}}>
                Remove question
            </button>
        <button  id = "btnChoices"
            type='submit'
            onClick={() => handleSubmit()}  
            disabled={save}>Submit
        </button>
        </div>

        {warn && <div id="warnings">Options are empty or Correct Answer is not selected</div>}
        {warn2 && <div id="warnings" >Question(s) are empty</div>}
        {warn3 && <div id="warnings">Topic is empty</div>}
        {save && <div id="warnings">Saving data ...</div>}
        </div>
        </div>);
};

export default Maker;
