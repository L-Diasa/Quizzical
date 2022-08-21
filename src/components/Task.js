import React, { useState } from "react"
import Answer from "./Answer"

export default function Task(props) {
    const [showFeedback, setShowFeedback] = useState(false)
    const answers = props.answersArr.map(answer => {
        return (
            <Answer
                key={answer.id}
                showFeedback={showFeedback}
                handleClick={() => {
                    props.handleClick(props.questionId, answer.id)
                    setShowFeedback(true)
                }}
                soundsOn={props.soundsOn}
                {...answer}
            />
        )
    })     
    
    return (
        <div className="task">
            <p dangerouslySetInnerHTML={{__html: props.question}} 
               className="question"></p>
            <div className="answers">
                {answers}
            </div>
        </div>
    )
}