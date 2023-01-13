import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Form({ form }) {
    const router = useRouter()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [answers, setAnswers] = useState(Array(form.length).fill(null))

    const changeQuestionNext = (e) => {
        e.preventDefault()
        setCurrentQuestion(currentQuestion + 1)
    }

    const changeQuestionPrev = (e) => {
        e.preventDefault()
        setCurrentQuestion(currentQuestion - 1)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        let score = 0
        answers.forEach((ans, i) => {
            if (typeof ans !== "null") {
                score += ans
            }
        })

        try {
            // Depression Severity: 0-4 none, 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20-27 severe.
            const updatedScore = await axios.post(process.env.BACKEND + "/user/update-score", { score: score }, { withCredentials: true })
            if (updatedScore?.data?.success) {
                router.push("/dashboard/home")
            }
            console.log(updatedScore)

        } catch (e) {
            setErrorMessage(e.response?.data?.message)
        }
    }

    return (
        <div className="flex flex-col w-[500px] border-2 border-white my-10 m-auto p-10 rounded-xl">
            <div className="my-5 text-white ml-5 text-xl font-semibold">{currentQuestion + 1}.&nbsp;{form[currentQuestion].question}</div>

            <form className="flex flex-col gap-2 ml-5">
                {form[currentQuestion].options.map((option, j) =>
                    <div key={j} className={`${answers[currentQuestion] === j ? "bg-white text-black" : "cursor-pointer"} text-white border-2 transition-all p-3 rounded-md flex gap-2 items-center`} onClick={() => {
                        const newAnswers = Object.assign([...answers], {
                            [currentQuestion]: j
                        });
                        setAnswers(newAnswers)
                    }}>
                        {option}
                    </div>
                )
                }
            </form >

            <div className="flex my-5 relative text-white">
                {currentQuestion > 0 ?
                    <button className="absolute border-2 p-2 rounded-md left-0" onClick={changeQuestionPrev}>Prev</button>
                    :
                    <></>
                }
                {currentQuestion < form.length - 1 ?
                    <button className="absolute border-2 p-2 rounded-md right-0" onClick={changeQuestionNext}>Next</button>
                    :
                    <></>
                }
            </div>
            {
                currentQuestion >= form.length - 1 ?
                    <button className="mt-8 text-fit m-auto text-white border-2 p-2 rounded-md" onClick={submitForm} >Submit</button>
                    :
                    <></>
            }
            <div className="text-red-900 text-center mt-5">{errorMessage}</div>
        </div >
    )
} 