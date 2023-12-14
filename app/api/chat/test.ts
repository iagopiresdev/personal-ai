import OpenAI from "openai";

const openai = new OpenAI();

export async function openaicall(content: string) {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": content}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

