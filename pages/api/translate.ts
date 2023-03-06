// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type RequestBody = {
    sentence: string
}

type ResponseBody = {
    translation: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseBody>
) {
    const requestBody = JSON.parse(req.body) as RequestBody
    console.log(requestBody.sentence)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You are a translator, you should respond only translation without any explanations."
            },
            {
                "role": "user",
                "content": `Translate into Chinese:\"${requestBody.sentence}\"`
            }
        ]
    })
    const content = completion.data.choices[0].message?.content || "{}"
    res.status(200).json({
        translation: content
    })
}
