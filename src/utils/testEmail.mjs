import { MailerSend, Recipient, EmailParams, Sender } from 'mailersend'

const mailersend = new MailerSend({
  apiKey: process.env.EMAIL_API_TOKEN,
})

const sender = new Sender('info@domain.com', 'SendGrid')

const recipients = [new Recipient('test@gmail.com', 'Thiago')]

const emailParams = new EmailParams()
  .setFrom(sender)
  .setTo(recipients)
  .setSubject('Envio de email via SendGrid')
  .setHtml('<h1>Olá</h1>')
  .setText('🚀')

await mailersend.email.send(emailParams)
