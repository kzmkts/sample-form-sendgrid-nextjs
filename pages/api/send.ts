import sgMail, { MailDataRequired } from '@sendgrid/mail'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { FormValues } from '@/components/ContactForm'

interface ExtendedNextApiRequest extends NextApiRequest {
  body: FormValues
}
function escapeHtml(str: string) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quot;')
  str = str.replace(/'/g, '&#39;')
  return str
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

    const escapedName = escapeHtml(req.body.name)
    const escapedInquiry = escapeHtml(req.body.inquiry)
    const msg: MailDataRequired[] = [
      {
        to: req.body.email,
        from: process.env.MAIL_FROM as string,
        subject: 'お問い合わせありがとうございます',
        text: `${escapedName}様\nお問い合わせありがとうございます`,
        html: `<p>${escapedName}様</p><p>お問い合わせありがとうございます</p>`,
      },
      {
        from: process.env.MAIL_FROM as string,
        to: process.env.MAIL_TO as string,
        subject: 'お問い合わせがありました。',
        text: `お問い合わせがありました\n\nご入力内容\nお名前:${escapedName}\nメールアドレス:${req.body.email}\nお問い合わせ内容:${escapedInquiry}`,
        html: `<p>お問い合わせがありました</p><p>ご入力内容<br />お名前:${escapedName}<br />メールアドレス:${req.body.email}<br />お問い合わせ内容:${escapedInquiry}</p>`,
      },
    ]

    try {
      await sgMail.send(msg)
      res.status(200).json(msg)
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  }
}
