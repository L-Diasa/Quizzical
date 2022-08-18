import React, { useState } from "react"
import Home from "./pages/Home"
import Quiz from "./pages/Quiz"

export default function App() {
    const [started, setStarted] = useState(false)
    const [quizDetails, setQuizDetails] = useState({
        category: "10",
        difficulty: "medium",
        type: "boolean"
        })
    
    function handleStart(details) {
        setQuizDetails({
            category: details.category,
            difficulty: details.difficulty,
            type: details.isMulChoice ? 
                        details.isTorF ? "" : "multiple" :
                        details.isTorF ? "boolean" : ""
        })
        setStarted(true)
        return () => {
            setQuizDetails({});
        };
    }
    
    return (
        <main>
            <div className="yellow-decor">
            </div>
            <div className="blue-decor"></div>
            {
                started ?
                <Quiz handleRestart={() => setStarted(false)}
                      quizDetails={quizDetails}/>
                :
                <Home handleStart={handleStart} /> 
            }
        </main>
    )
}