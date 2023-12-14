import { IoIosArrowDown } from "react-icons/io";
import { LuDiamond } from "react-icons/lu";
import { RiPlanetLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

export const MenuBaR = () => {
    return<div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 items-center">
            <h2 className="text-sm font-normal">Scroll for inspiration</h2>
            <IoIosArrowDown />
        </div>
        <div className="w-full rounded-xl bg-black h-20 flex gap-20 justify-center items-center">
            <div className="flex flex-col gap-0.5 justify-center items-center cursor-pointer">
                <LuDiamond className="text-white text-2xl"/>
                <p className="text-white text-menuBar">Home</p>
            </div>
            <div className="flex flex-col gap-0.5 justify-center items-center cursor-pointer">
                <RiPlanetLine className="text-white text-2xl"/>
                <p className="text-white text-menuBar">Explore</p>
            </div>
            <div className="flex flex-col gap-0.5 justify-center items-center cursor-pointer">
                <AiOutlineUser className="text-white text-2xl"/>
                <p className="text-white text-menuBar">Profile</p>
            </div>
        </div>
    </div>
}