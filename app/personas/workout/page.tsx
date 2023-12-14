'use client';

import { openAiCall } from "@/app/api/chat/workout/route";
import { TextArea } from "@/components/ui/input";
import { useState } from "react";

type workoutFormType = {
    header: string;
    label:string;
}[]

const workoutForm: workoutFormType = [
    {
        header: "What is your age?",
        label: "Personal Information",
    },
    {
        header: "What is your gender?",
        label: "Personal Information",
    },
    {
        header: "What is your height?",
        label: "Personal Information",
    },
    {
        header: "What is your current weight?",
        label: "Personal Information",
    },
    {
        header: "What are your primary fitness goals (e.g., weight loss, muscle gain, improved endurance)?",
        label: "Fitness Goals",
    },
    {
        header: "Do you have any past or current health issues or injuries that I should be aware of?",
        label: "Health History",
    },
    {
        header: "What is your history with exercise (e.g., beginner, intermediate, experienced)?",
        label: "Exercise History",
    },
    {
        header: "How would you describe your current level of fitness?",
        label: "Current Fitness Level",
    },
    {
        header: "Do you prefer gym workouts, home workouts, or a mix of both?",
        label: "Workout Preferences",
    },
    {
        header: "What exercise equipment do you have access to (if any)?",
        label: "Equipment Availability",
    },
    {
        header: "Please, indicate the days of the week you can commit to training",
        label: "Days Commitment",
    },
    {
        header: "How much time can you commit to exercise each day of the before mentioned?",
        label: "Time Commitment",
    },
    {
        header: "How many months you would like the plan to extend?",
        label: "Month Extension",
    },
    {
        header: "Are there any specific exercises you really enjoy or really dislike?",
        label: "Specific Exercises",
    },
    {
        header: "Do you have any injuries, physical limitations, chronic conditions or pain points I should be aware of when creating your workout plan?",
        label: "Physical Limitations",
    },
    {
        header: "Would you like to add anything else?",
        label: "Add Information",
    }
];

export default function Workout() {
    const [showQuestion, setShowQuestion] = useState<number>(0)
    const formObject = workoutForm.reduce<Record<string, string>>((obj, item) => {
        obj[item.header] = "";
        return obj;
    }, {});
    const [formData, setFormData] = useState(formObject);
    const [response, setResponse] = useState<string>("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };


    const onHandleSubmit = async (event) => {
        event.preventDefault()
        setShowQuestion(prev => prev +1);
        const response = await openAiCall(formData)
        if(response){
            setResponse(response)
        }
    }


    return <div className="h-full flex justify-center items-center">
                {showQuestion === workoutForm.length && <div className="flex flex-col gap-4">
                    {response}
                </div>
                }
                <form
                    onSubmit={onHandleSubmit}
                    className="flex flex-col gap-4 h-full w-full justify-center items-center"
                >
                    {workoutForm.map((question, index) => {
                        return <>
                                { showQuestion === index &&
                                    <div className="flex flex-col gap-6 justify-center w-full">
                                        <h2 className="text-center text-lg">{question.header}</h2>
                                        <div className="flex flex-col gap-2 items-center w-full">
                                            <TextArea
                                                rows={3}
                                                placeholder={question.label} 
                                                name={question.header}
                                                className="border-2 border-black bg-transparent w-full h-25"
                                                onChange={handleChange}
                                            />
                                            {index !== workoutForm.length-1 && <button
                                                onClick={()=>setShowQuestion(index + 1)}
                                                className="
                                                text-white
                                                h-16
                                                min-h-[64px]
                                                min-w-[64px]
                                                w-16
                                                rounded-full
                                                bg-black
                                                hover:opacity-75"
                                            >
                                                next
                                            </button>}
                                        </div>
                                    </div>
                                }
                                </>
                    })}
                    {showQuestion === (workoutForm.length-1) && 
                        <button
                            type="submit"
                            className="
                            text-white
                            h-16
                            min-h-[64px]
                            min-w-[64px]
                            w-16
                            rounded-full
                            bg-[#FF2800]
                            hover:opacity-75"
                        >
                            Send
                        </button>}
                </form>
            </div>
}