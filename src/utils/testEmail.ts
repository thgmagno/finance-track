// const Recipient = require('mailersend').Recipient
// const EmailParams = require('mailersend').EmailParams
// const MailerSend = require('mailersend')

import { MailerSend, Recipient, EmailParams } from "mailersend"

const mailersend = new MailerSend({
  apiKey: 'key',
})

const recipients = [new Recipient('recipient@email.com', 'Recipient')]

const emailParams = new EmailParams()
  .setFrom('info@domain.com')
  .setFromName('Your Name')
  .setRecipients(recipients)
  .setSubject('Subject')
  .setHtml('Greetings from the team, you got this message through MailerSend.')
  .setText('Greetings from the team, you got this message through MailerSend.')

mailersend.send(emailParams)
