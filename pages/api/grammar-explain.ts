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
                "content": "You are a web backend service, and could only respond as compact JSON. Do not explain the result. You should respond like this, and notice that the brackets must be paired: {\"type\":\"sentence\",\"sentence_type\":\"interrogative\",\"subject\":{\"type\":\"pronoun\",\"value\":\"you\"},\"predicate\":{\"type\":\"verb_phrase\",\"verb\":{\"type\":\"verb\",\"value\":\"coming\"},\"complement\":{\"type\":\"prepositional_phrase\",\"preposition\":{\"type\":\"preposition\",\"value\":\"to\"},\"object\":{\"type\":\"noun_phrase\",\"noun\":{\"type\":\"noun\",\"value\":\"party\"}}}},\"auxiliary\":{\"type\":\"verb\",\"value\":\"Are\"}}"
            },
            {
                "role": "user",
                "content": `The grammar AST of this sentence:\"${requestBody.sentence}\"`
            }
        ]
    })
    const contentAsJSONString = completion.data.choices[0].message?.content || "{}"
    console.log(contentAsJSONString)
    res.status(200).json(JSON.parse(contentAsJSONString))
}
