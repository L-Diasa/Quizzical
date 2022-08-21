import React, { useEffect, useState } from "react"
import categories from "../categories.js"
import Category from "../components/Category"
import Carousel from "react-elastic-carousel"

import useSound from "use-sound"
import selection from "../sounds/selection.wav"
import confirm from "../sounds/confirm.wav"

export default function Home({ handleStart, soundsOn, handleMusicFirstStart }) {
    const [quizDetails, setQuizDetails] = useState({
        category: "",
        difficulty: "",
        isMulChoice: true,
        isTorF: true,
    })
    const [categoryList, setCategoryList] = useState([])
    const [selectionSound] = useSound(selection, {
        volume: 0.75 
    })
    const [confirmSound] = useSound(confirm, {
        volume: 0.75 
    })

    useEffect(() => {
        playSelection()
        setCategoryList(categories.map(category => 
            <Category 
                key={category.value} 
                text={category.name} 
                icon={category.icon} 
                isSelected={quizDetails.category === category.value}
                handleClick={() => {
                    setQuizDetails( prev => {
                        return { 
                            ...prev,
                            category: category.value
                        }
                    })
                }}
            />
        ))
    }, [quizDetails.category])

    function playSelection() {
        if(soundsOn) {
            selectionSound()
        }
    }

    function playConfirm() {
        if(soundsOn) {
            confirmSound()
        }
    }
    
    function handleChange(event) {
        playSelection()
        const {name, value, type, checked} = event.target
        setQuizDetails(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
    return (
        <div className="home">
            <p className="home--appName">Quizzical</p>
            
            <div className="home--quiz-details">
                <div className="checkbox-div">
                    <p>Difficulty</p>
                    <label>
                        <input 
                        type="radio"
                        id="any"
                        name="difficulty"
                        value=""
                        checked={quizDetails.difficulty === ""}
                        onChange={handleChange}
                        />
                        Any
                    </label>
                        
                    <label>
                        <input 
                        type="radio"
                        id="easy"
                        name="difficulty"
                        value="easy"
                        checked={quizDetails.difficulty === "easy"}
                        onChange={handleChange}
                        />
                        Easy
                    </label>

                    <label>
                        <input 
                            type="radio"
                            id="medium"
                            name="difficulty"
                            value="medium"
                            checked={quizDetails.difficulty === "medium"}
                            onChange={handleChange}
                        />
                        Medium
                    </label>
                    
                    <label>
                        <input 
                            type="radio"
                            id="hard"
                            name="difficulty"
                            value="hard"
                            checked={quizDetails.difficulty === "hard"}
                            onChange={handleChange}
                        />
                        Hard
                    </label>
                </div>
                
                <div className="checkbox-div">
                    <p>Type of Answer</p>
                    <label>
                        <input 
                            type="checkbox" 
                            id="isTorF" 
                            checked={quizDetails.isTorF}
                            onChange={handleChange}
                            name="isTorF"
                        />
                        True / False
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            id="isMulChoice" 
                            checked={quizDetails.isMulChoice}
                            onChange={handleChange}
                            name="isMulChoice"
                        />
                        Multiple Choice
                    </label>
                </div>

                <div className="carousel">
                    <p>Category</p>
                    <Carousel 
                        breakPoints={[
                            { width: 1, itemsToShow: 1 },
                            { width: 200, itemsToShow: 2 },
                            { width: 400, itemsToShow: 3 },
                            { width: 550, itemsToShow: 4 },
                            { width: 700, itemsToShow: 5 }
                            ]}
                    >
                        {categoryList}
                    </Carousel>
                </div>
            </div>
            <button 
                onClick={() => {
                    handleStart(quizDetails)
                    playConfirm()
                    handleMusicFirstStart()
                }} 
                className="home--startButton"
            >
                Start Quiz
            </button>
        </div>
    )
}