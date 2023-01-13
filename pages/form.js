import React from 'react'
import Form from '../components/Form'

export default function FormSubmit() {
    const form = [
        {
            question: "Little interest or pleasure in doing things?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly everyday"]
        },
        {
            question: "Feeling down, depressed, or hopeless?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly everyday"]
        },
        {
            question: "Trouble falling or staying asleep, or sleeping too much?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly everyday"]
        },
        {
            question: "Feeling tired or having little energy?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly everyday"]
        },
        {
            question: "Poor appetite or overeating?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly everyday"]
        },
        {
            question: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly everyday"]
        },
        {
            question: "Trouble concentrating on things, such as reading the newspaper or watching television?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly everyday"]
        },
        {
            question: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly everyday"]
        },
        {
            question: "Thoughts that you would be better off dead or off hurting yourself in some way?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly everyday"]
        }
    ]

    return (
        <div className='flex justify-center items-center h-screen bg-black'>
            <Form form={form} />
        </div>
    )
}
