import React from "react"
import Answer from "./Answer"

export default function Task(props) {
    const answers = props.answersArr.map(answer => {
        return (
            <Answer
                key={answer.id}
                showFeedback={props.showFeedback}
                handleClick={() => props.handleClick(props.questionId, answer.id)}
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
            <hr/>
        </div>
    )
}