import React from "react"

export default function Answer({showFeedback, handleClick, value, isHeld, isCorrect}) {
    const feedbackCorrectStyle = {
        backgroundColor: "#94D7A2",
        borderColor: "#94D7A2",
        pointerEvents: "none" 
    }
    
    const feedbackIncorrectStyle = {
        opacity: 0.5,
        pointerEvents: "none"
    }
    
    const feedbackHeldIncorrectStyle = {
        backgroundColor:  "#F8BCBC",
        borderColor: "#F8BCBC",
        opacity: 0.5,
        pointerEvents: "none"
    }
    
    const quizStyle = {
        backgroundColor: isHeld ? "#D6DBF5" : "#F5F7FB",
    }

    return (
        <button 
            style={        
                showFeedback ? 
                    isCorrect ? 
                        feedbackCorrectStyle : 
                        isHeld ? 
                            feedbackHeldIncorrectStyle : 
                            feedbackIncorrectStyle :
                    quizStyle
                    } 
            className="answer" 
            onClick={handleClick} 
            dangerouslySetInnerHTML={{__html: value}}
        >
        </button>
    )
}