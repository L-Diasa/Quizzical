import React from "react"

import useSound from "use-sound"
import correct from "../sounds/correct.wav"
import wrong from "../sounds/wrong.wav"

export default function Answer({showFeedback, handleClick, value, isHeld, isCorrect, soundsOn}) {
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

    const [playCorrect] = useSound(correct, {
        volume: 0.75 
    })

    const [playWrong] = useSound(wrong, {
        volume: 0.75 
    })

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
            onClick={ () => {
                handleClick()
                if(soundsOn) {
                    isCorrect ? playCorrect() : playWrong()
                }
            }} 
            dangerouslySetInnerHTML={{__html: value}}
        >
        </button>
    )
}