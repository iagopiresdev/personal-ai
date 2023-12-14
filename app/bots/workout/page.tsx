'use client';

import { openAiCall } from "@/app/api/chat/workout/route";
import { Input } from "@/components/ui/input";
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
        header: "Can you describe your typical daily diet?",
        label: "Dietary Habits",
    },
    {
        header: "Are there any specific exercises you really enjoy or really dislike?",
        label: "Specific Exercises",
    },
    {
        header: "Are there any physical limitations or pain points I should be aware of when creating your workout plan?",
        label: "Physical Limitations",
    },
    {
        header: "What is your occupation, and how physically active are you during the day?",
        label: "Lifestyle Factors",
    },
    {
        header: "How would you rate your daily stress levels, and do they impact your ability to exercise?",
        label: "Stress Levels",
    },
    {
        header: "How many hours of sleep do you typically get each night?",
        label: "Sleep Patterns",
    },
    {
        header: "On a scale from 1 to 10, how would you rate your current motivation levels for working out?",
        label: "Motivation Levels",
    },
    {
        header: "Have you had any injuries in the past that might affect your ability to perform certain exercises?",
        label: "Previous Injuries",
    },
    {
        header: "Do you have any chronic conditions (like asthma, diabetes, etc.) that need to be considered in your workout plan?",
        label: "Chronic Conditions",
    },
    {
        header: "Are you allergic to any substances that might affect your workout environment or recovery (like latex, certain foods, etc.)?",
        label: "Allergies",
    },
    {
        header: "Do you prefer working out in the morning, afternoon, or evening?",
        label: "Workout Schedule Preferences",
    },
    {
        header: "If you've followed workout programs in the past, what did you like or dislike about them?",
        label: "Feedback on Past Programs",
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


    return <div>
                {showQuestion === workoutForm.length && <div className="flex flex-col gap-4">
                    {response}
                </div>
                }
                <form
                    onSubmit={onHandleSubmit}
                    className="flex flex-col gap-4"
                >
                    {workoutForm.map((question, index) => {
                        return <>
                                { showQuestion === index &&
                                    <div className="flex flex-col gap-6">
                                        <h2>{question.header}</h2>
                                        <div className="flex gap-2">
                                            <Input
                                            label={question.label} 
                                            name={question.header}
                                            onChange={handleChange}
                                            />
                                            {index !== workoutForm.length-1 && <button
                                                onClick={()=>setShowQuestion(index + 1)}
                                                className="w-fit"
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
                        >
                            Send
                        </button>}
                </form>
            </div>
}