'use client'

import { useRouter } from 'next/navigation'
import { CgGym } from "react-icons/cg";
import { LuChefHat } from "react-icons/lu";

export const BotCards = () => {
    const router = useRouter()

    return <div className="flex gap-4 mt-20 wrap">
        <div
            className="w-[calc(50%-(16px/2))] h-48 flex justify-center items-center bg-card-bot-gym rounded-lg cursor-pointer text-5xl hover:text-7xl transition-all duration-300 ease-in-out"
            onClick={() => router.push('/personas/workout')}
        >
            <CgGym className="text-white"/>
        </div>
        <div className="w-[calc(50%-(16px/2))] h-48 flex justify-center items-center bg-card-bot-meal rounded-lg cursor-pointer text-5xl hover:text-7xl transition-all duration-300 ease-in-out">
            <LuChefHat className="text-white" />
        </div>
    </div>
}