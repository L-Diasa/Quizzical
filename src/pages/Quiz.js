import React, { useState, useEffect } from "react"
import { ThreeDots } from  'react-loader-spinner'
import { nanoid } from "nanoid"
import Task from "../components/Task"

import useSound from "use-sound"
import nextTask from "../sounds/nextTask.wav"
import confirm from "../sounds/confirm.wav"
import endGame from "../sounds/endGame.wav"

export default function Quiz({ handleRestart, quizDetails, soundsOn }) {
    const [allTasks, setAllTasks] = useState([])
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)
    const [currQuestion, setCurrQuestion] = useState(0)
    const [confirmSound] = useSound(confirm, {
        volume: 0.75 
    })
    const [endGameSound] = useSound(endGame, {
        volume: 0.75 
    })
    const [nextTaskSound] = useSound(nextTask, {
        volume: 0.75 
    })

    const tasks = allTasks.map(task => (
        <Task 
            key={task.id} 
            questionId={task.id}
            question={task.question} 
            answersArr={task.answers} 
            handleClick={handleClick}
            soundsOn={soundsOn}
        />
    ))

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${quizDetails.category}&difficulty=${quizDetails.difficulty}&type=${quizDetails.type}`)
        .then(res => res.json())
        .then(data => {
            setAllTasks(() => data.results.map(item => {
                return {
                    id: nanoid(),
                    question: item.question,
                    answers: generateAnswers(item.correct_answer, 
                                            [...item.incorrect_answers])
                }
            }))
            setTimeout(() => {
                setLoading(false)
            }, 1300)
        }).catch(err => setLoading(false))
    }, [])

    function playSound(sound) {
        if(soundsOn) {
            switch(sound) {
                case "confirm":
                    confirmSound()
                    break
                case "endGame":
                    endGameSound()
                    break
                case "nextTask":
                    nextTaskSound()
                    break
            }
        }
    }
    
    function generateAnswers(correct, wrongs) {
        let anscount = (wrongs.length === 3) ? 4 : 2
        let answers = []
        let correctIndex = Math.floor(Math.random() * anscount)
        for(let i = 0; i < anscount; i++) {
            if(i === correctIndex) {
                answers.push({
                    id: nanoid(),
                    value: correct,
                    isHeld: false,
                    isCorrect: true
                })
            } else {
                answers.push({
                    id: nanoid(),
                    value: wrongs.pop(),
                    isHeld: false,
                    isCorrect: false
                })
            }
        }
        return answers
    }
    
    function handleClick(questionId, answerId) {
        setAllTasks(prev => prev.map(item => {
            return (item.id === questionId) ? 
            {
                ...item,
                answers: handleSelection(item.answers,  answerId)
            } :
            item
        }))
    }
    
    function handleSelection(answers,  answerId) {
        return answers.map(answer => {
            return answerId === answer.id ? 
            {...answer, isHeld: !answer.isHeld} : 
            {...answer, isHeld: false}
        })
    }
    
    function checkAnswers() {
        setScore(() => {
            return allTasks.reduce((previousValue, currentValue) => {
                if (currentValue.answers.filter(answer => 
                    answer.isHeld && answer.isCorrect
                    ).length) {
                    return previousValue + 1
                }
                return previousValue;
                }, 0);
        })
    }

    function onFeedbackIndex() {
        return currQuestion === 5
    }

    function quizButtonClick() {
        if(onFeedbackIndex())
        {
            handleRestart()
            setAllTasks([])
            playSound("confirm")
        }  else {
            setCurrQuestion(prev => prev + 1) 
            if(currQuestion === 4) {
                checkAnswers()
                playSound("endGame")
            } else {
                playSound("nextTask")
            }
        }
    }
    
    return (
        <div className="quiz">
            <div className={`loaded ${loading ? "hidden" : ""}`}>
                { allTasks[0] &&
                <>
                <div className={`quiz-dots ${ onFeedbackIndex() ? "hidden" : ""}`}>
                    <button className={`quiz-dot ${currQuestion === 0 ? "selected" : ""}`} type="button"></button>
                    <button className={`quiz-dot ${currQuestion === 1 ? "selected" : ""}`} type="button"></button>
                    <button className={`quiz-dot ${currQuestion === 2 ? "selected" : ""}`} type="button"></button>
                    <button className={`quiz-dot ${currQuestion === 3 ? "selected" : ""}`} type="button"></button>
                    <button className={`quiz-dot ${currQuestion === 4 ? "selected" : ""}`} type="button"></button>
                </div>
                {tasks[currQuestion]}  
                <div className="quiz--feedback">
                    { 
                        onFeedbackIndex() && 
                        <p className="quiz--feedback-score">
                        You scored {score}/5 correct answers</p>
                    }
                    <button className="quiz--check-reset-button"
                        onClick={quizButtonClick}
                    >
                        {onFeedbackIndex() ? "Play again" : "Next"}
                    </button>
                </div>
                </>
                }
            </div>
            { loading ? 
                <div className="quiz--loading">
                <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#293264" 
                    ariaLabel="three-dots-loading"
                    visible={true}
                />
                </div>
                :
                <>
                { !allTasks[0] &&
                    <div className="quiz--loading">
                        <p className="quiz--loading-text">Unfortunately, no questions found</p>
                        <button 
                            className="quiz--change-button"
                            onClick={() => {
                                handleRestart()
                                playSound("confirm")
                            }}
                        >
                            Change Quiz Details
                        </button>
                    </div>
                }
                </>
            } 
        </div>
    )
}