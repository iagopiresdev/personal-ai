import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {label?: string;}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && <label className="absolute -top-4 left-3 bg-white px-2">{label}</label>}
        <input
          autoFocus={true}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
            )}
            ref={ref}
            {...props}
            />
      </div>
    )
  }
)
Input.displayName = "Input"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && <label className="absolute -top-4 left-3 bg-white px-2">{label}</label>}
        <textarea
          autoFocus={true}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
            )}
            ref={ref}
            {...props}
            />
      </div>
    )
  }
)
TextArea.displayName = "TextArea"

interface CardBotInputProps extends InputProps {
  header: string;
  index: number;
  setShowQuestion: (value: number) => void;
}

export { Input, TextArea }
