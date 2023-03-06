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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const requestBody = JSON.parse(req.body) as RequestBody
    console.log(requestBody.sentence)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You are a teacher who teach grammar to students. Please explain the grammar as detail as possible."
            },
            {
                "role": "user",
                "content": `Please explain the grammar of this sentence in Chinese:\"${requestBody.sentence}\"`
            }
        ]
    })
    const content = completion.data.choices[0].message?.content || ""
    res.status(200).send(content)
}
