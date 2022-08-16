import React, { useState, useEffect } from "react"
import { ThreeDots } from  'react-loader-spinner'
import {nanoid} from "nanoid"
import Task from "../components/Task"

export default function Quiz({handleRestart, quizDetails}) {
    
    const [allTasks, setAllTasks] = useState([])
    const [showFeedback, setShowFeedback] = useState(false)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)
    
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
        })
    }, [])
    
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
        if(!showFeedback) {
            setAllTasks(prev => prev.map(item => {
                return (item.id === questionId) ? 
                {
                    ...item,
                    answers: handleSelection(item.answers,  answerId)
                } :
                item
            }))
        }
    }
    
    function handleSelection(answers,  answerId) {
        return answers.map(answer => {
            return answerId === answer.id ? 
            {...answer, isHeld: !answer.isHeld} : 
            {...answer, isHeld: false}
        })
    }

    const tasks = allTasks.map(task => (
        <Task 
            key={task.id} 
            questionId={task.id}
            question={task.question} 
            answersArr={task.answers} 
            handleClick={handleClick}
            showFeedback={showFeedback}
        />
    ))
    
    function checkAnswers() {
        setShowFeedback(true)
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
    
    return (
        <div className="quiz">
            <div className={`loaded ${loading ? "hidden" : ""}`}>
                {tasks}  
                { allTasks[0] &&
                <div className="quiz--feedback">
                    {showFeedback && 
                    <p className="quiz--feedback-score">
                    You scored {score}/5 correct answers</p>}
                    <button className="quiz--check-reset-button"
                            onClick={showFeedback ? handleRestart : checkAnswers}>
                        {showFeedback ? "Play again" : "Check answers"}
                    </button>
                </div>
                }
            </div>
            { loading ? 
                <div className="quiz--loading">
                <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#94D7A2" 
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
                            onClick={handleRestart}
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