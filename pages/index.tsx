import Head from 'next/head'
import { useState } from 'react'

export default function Home() {


  const [sentence, setSentence] = useState('')
  const [explanation, setExplanation] = useState('')
  const [translation, setTranslation] = useState('')

  const fetchTranslation = async (sentence: string) => {
    const result = await fetch('/api/translate', {
      method: 'POST',
      body: JSON.stringify({ sentence: sentence }),
    })
    const response = await result.json()
    setTranslation(response.translation)
  }

  const fetchGrammarExplanation = async (sentence: string) => {
    const result = await fetch("/api/grammar-explain", {
      method: "POST",
      body: JSON.stringify({ sentence: sentence }),
    })
    setExplanation(await result.text())
  }

  return (
    <>
      <Head>
        <title>Grammar Explainer</title>
        <meta name="description" content="The natural language grammar explainer, driven by AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-slate-300 h-screen'>
        <div className='container mx-auto bg-slate-50 p-10 h-screen'>
          <div className='flex my-4'>
            <textarea
              className="text-2xl textarea flex-1"
              placeholder="Please type the sentence to be grammar explained."
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
            ></textarea>
          </div>
          <div className='flex my-4'>
            <button className="btn btn-primary mx-auto w-1/2"
              onClick={() => {
                fetchGrammarExplanation(sentence)
                fetchTranslation(sentence)
              }}
            >Explain!</button>
          </div>
          <div className='my-8'>
            <hr></hr>
          </div>
          <div className='my-4'>
            {translation}
          </div>
          <div className='my-4'>
            {explanation}
          </div>
        </div>
      </main>
    </>
  )
}
