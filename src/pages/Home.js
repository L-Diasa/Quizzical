import React, { useEffect, useState } from "react"
import categories from "../categories.js"
import Category from "../components/Category"
import Carousel from "react-elastic-carousel"

export default function Home(props) {
    const [quizDetails, setQuizDetails] = useState({
        category: "",
        difficulty: "",
        isMulChoice: true,
        isTorF: true,
    })
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        setCategoryList(categories.map(category => 
            <Category 
                key={category.value} 
                text={category.name} 
                icon={category.icon} 
                isSelected={quizDetails.category === category.value}
                handleClick={() =>
                    setQuizDetails( prev => {
                    return { 
                        ...prev,
                        category: category.value
                    }
                    }
                    )
                }
            />
        ))
    }, [quizDetails.category])
    
    function handleChange(event) {
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
                    <p>Type</p>
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
                
                <div className="carousel">
                    <p>Category</p>
                    <Carousel breakPoints={[
                        { width: 1, itemsToShow: 1 },
                        { width: 200, itemsToShow: 2 },
                        { width: 300, itemsToShow: 3 }
                        ]}
                    >
                        {categoryList}
                    </Carousel>
                </div>
            </div>
            <button 
                onClick={() => 
                    props.handleStart(quizDetails)
                } 
                className="home--startButton"
            >
                Start Quiz
            </button>
        </div>
    )
}