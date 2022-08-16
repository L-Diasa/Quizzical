import React from "react"
import categories from "../categories.js"

export default function Home(props) {
    const [quizDetails, setQuizDetails] = React.useState({
        category: "",
        difficulty: "",
        isMulChoice: true,
        isTorF: true,
    })
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setQuizDetails(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
    const categoryList = categories.map(category => {
        return <option key={category.value} value={category.value} dangerouslySetInnerHTML={{__html: category.name}}></option>
    })
    
    return (
        <div className="home">
            <p className="home--appName">Quizzical</p>
            
            <div className="home--quiz-details">
                <div className="home--select-type">
                    <p>Select Type:</p>
                    <input 
                        type="checkbox" 
                        id="isTorF" 
                        checked={quizDetails.isTorF}
                        onChange={handleChange}
                        name="isTorF"
                    />
                    <label htmlFor="isTorF">True / False</label>
                    <br/>
                    <input 
                        type="checkbox" 
                        id="isMulChoice" 
                        checked={quizDetails.isMulChoice}
                        onChange={handleChange}
                        name="isMulChoice"
                    />
                    <label htmlFor="isMulChoice">Multiple Choice</label>
                </div>
                
                <div className="home--select-difficulty">
                    <p>Select Difficulty:</p>
                    <input 
                        type="radio"
                        id="any"
                        name="difficulty"
                        value=""
                        checked={quizDetails.difficulty === ""}
                        onChange={handleChange}
                        />
                        <label htmlFor="any">Any</label>
                        <br />
                        
                    <input 
                        type="radio"
                        id="easy"
                        name="difficulty"
                        value="easy"
                        checked={quizDetails.difficulty === "easy"}
                        onChange={handleChange}
                        />
                        <label htmlFor="easy">Easy</label>
                        <br /> 
                    
                    <input 
                        type="radio"
                        id="medium"
                        name="difficulty"
                        value="medium"
                        checked={quizDetails.difficulty === "medium"}
                        onChange={handleChange}
                    />
                    <label htmlFor="medium">Medium</label>
                    <br />
                    
                    <input 
                        type="radio"
                        id="hard"
                        name="difficulty"
                        value="hard"
                        checked={quizDetails.difficulty === "hard"}
                        onChange={handleChange}
                    />
                    <label htmlFor="hard">Hard</label>
                    <br />
                </div>
                
                <div>
                    <p>Select Category:</p>
                    <select 
                        id="category"
                        value={quizDetails.category}
                        onChange={handleChange}
                        name="category"
                    >
                        {categoryList}
                    </select>
                </div>
            </div>
            <button onClick={() => props.handleStart(quizDetails)} className="home--startButton">Start Quiz</button>
        </div>
    )
}