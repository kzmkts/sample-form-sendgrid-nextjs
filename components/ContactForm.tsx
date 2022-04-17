import { useState } from 'react'

export type FormValues = {
  name: string
  email: string
  inquiry: string
}

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [inquiry, setInquiry] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: FormValues = {
      name,
      email,
      inquiry,
    }
    const config: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    const res = await fetch('/api/send', config)
    if (res.status === 200) {
      const result = res.json()
      console.log(result)
    }
  }

  return (
    <form onSubmit={onSubmit} className="my-12">
      <div className="flex flex-col flex-1 space-y-6 w-full max-w-xl">
        <div>
          <label className="block mb-2 text-sm font-bold text-left text-gray-700">
            お名前
          </label>
          <input
            value={name}
            className="p-2 w-full rounded"
            name="name"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold text-left text-gray-700">
            メールアドレス
          </label>
          <input
            value={email}
            className="p-2 w-full rounded"
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value)
            }}
            type="email"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold text-left text-gray-700">
            お問い合わせ内容
          </label>
          <textarea
            className="p-2 w-full rounded"
            name="inquiry"
            value={inquiry}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setInquiry(e.target.value)
            }}
          />
        </div>
        <button
          className="p-5 text-white bg-green-600 hover:bg-green-700 rounded"
          type="submit"
        >
          <span>送信する</span>
        </button>
      </div>
    </form>
  )
}

export default ContactForm
