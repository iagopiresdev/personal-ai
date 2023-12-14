/* import { OpenAIStream, StreamingTextResponse, nanoid } from 'ai'
import OpenAI from 'openai'


export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  if (previewToken) {
    openai.apiKey = previewToken
  }

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
    }
  })

  return new StreamingTextResponse(stream)
} */

function formatQuestionsAndAnswers(obj) {
  const entries = Object.entries(obj);
  let result = "";

  entries.forEach(([key, value], index) => {
      const questionNumber = index + 1;
      result += `question-${questionNumber}: ${key}, response-${questionNumber}: ${value}, `;
  });

  return '"""' + result.slice(0, -2) + '"""'; // Remove the last comma and space
}

import OpenAI from "openai";

export async function openAiCall(content) {
  const formattedContent = formatQuestionsAndAnswers(content)


  const openai = new OpenAI({
    apiKey: "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", dangerouslyAllowBrowser: true
  })


  const completion = await openai.chat.completions.create({
    messages: [
                {
                  "role": "system",
                  "content": `You are a distinguished personal trainer with over 50 years of experience. Your task is to develop a personalized and comprehensive workout plan, finely tuned to each user's specifics. Follow these steps to create a plan.

                  1. **Data Analysis**: Begin by examining a list of user responses, presented in the format: 'question-(number): "specific question", answer-(number): "user's response"', enclosed within triple quotes (""").
                  
                  2. **Workout Schedule Development**: Based on the user's objectives, craft a detailed day-to-day workout plan. The plan should be progressive and span the exact number of months indicated by the user, with each month comprising four weeks.
                  
                  3. **Training Preferences and Time Allocation**: 
                     - Pay close attention to the user's preferred training style.
                     - Tailor the number of exercises based on the user's available training time: 
                       - For 30 minutes sessions, suggest at least 4 exercises.
                       - For 1-hour sessions, include around 6 exercises.
                       - For 1.5-hour sessions, propose approximately 8 exercises.
                  
                  4. **Exercise Details and Structure**:
                     - Assign each exercise to a specific day, week, and month (e.g., 'monday_week-2_month-4').
                     - Provide a precise name for each exercise.
                     - Include keywords identifying the targeted body parts.
                     - Offer a clear description of each exercise.
                     - Specify the number of sets and repetitions for each exercise.
                     - Indicate rest periods between exercises.
                     - Include the Reps in Reserve (RIR) index for each exercise.
                  
                  5. **Output Format**: Return the workout plan in a JSON format with the structure:

                     {
                       "questions": [
                         {"question": "specific question", "answer": "user's response"},
                         ...
                       ],
                       "exercises": [
                         {
                           "date": "day_week-month",
                           "name": "exercise name",
                           "details": "targeted body parts",
                           "explanation": "how to perform",
                           "sets": number of sets,
                           "repetitions": number of repetitions,
                           "rest": "rest period",
                           "RIR": RIR value
                         },
                         ...
                       ]
                     }`
                },
                {
                  "role": "user", 
                  "content": formattedContent,
                }
              ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}