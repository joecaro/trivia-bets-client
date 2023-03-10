'use client'

import { SyntheticEvent, useState } from "react"
import { toast } from "react-toastify"
import { useSocket } from "../../context/socketContext"
import useGameStore from "../../zustand/gameStore"
import QuestionText from "../QuestionText"
import Timer from "../Timer"

function isValidInput(input: string) {
    const num = parseFloat(input);
    // Check if input is a positive integer
    if (Number.isInteger(num) && num >= 0) {
        return true;
    } else {
        return false;
    }
}

export default function Question() {
    const [answer, setAnswer] = useState('')

    const currentQuestionIndex = useGameStore(state => state.currentQuestionIndex)
    const questions = useGameStore(state => state.questions)
    const isSpectating = useGameStore(state => state.isSpectating)

    const { submitAnswer } = useSocket()


    const handleAnswerChange = (e: SyntheticEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const handleSubmit = () => {
        if (!isValidInput(answer)) {
            toast.warn('Please enter an Postive Integer')
            setAnswer('')
            return
        }
        submitAnswer(answer)
    }
    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            <p className="text-slate-500 font-bold">
                question {currentQuestionIndex + 1 || 0} of 10
            </p>
            <QuestionText question={questions[currentQuestionIndex || 0].question} />
            <Timer />
            {!isSpectating && <div className="flex gap-2">
                <input
                    className="p-2 border-slate-400 border rounded"
                    type='number'
                    value={answer}
                    onChange={handleAnswerChange}
                    onKeyUp={e => e.key === 'Enter' && handleSubmit()}
                />
                <button
                    className="py-2 px-4 bg-blue-500 text-slate-50 border rounded shadow-sm"
                    onClick={handleSubmit}>Submit</button>
            </div>}
        </div>
    )
}