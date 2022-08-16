import React from "react"
import Home from "./pages/Home"
import Quiz from "./pages/Quiz"

import yellowDecor from "./images/home--yellow-decor.svg"
import blueDecor from "./images/home--blue-decor.svg"

export default function App() {
    const [started, setStarted] = React.useState(false)
    const [quizDetails, setQuizDetails] = React.useState({
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
            <img className="yellow-decor" 
                src={yellowDecor}
                //  src="../images/home--yellow-decor.svg" 
                 alt="yellow-decor"/>
            <img className="blue-decor" 
                 src={blueDecor} 
                 alt="blue-decor"/>
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