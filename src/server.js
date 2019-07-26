import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

import * as utils from './utilities'

const app = express()
const port = 3000

const appId = process.env.APP_ID
const appKey = process.env.APP_KEY

const smsUrl = 'https://yun.tim.qq.com/v5/tlssmssvr/sendsms?'

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '2mb'
  })
)
app.use(
  bodyParser.json({
    limit: '2mb'
  })
)

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/send/single', async (req, res) => {
  const random = utils.random()
  const time = Math.floor(new Date() / 1000)

  const sig = utils.sig({
    appKey,
    random,
    time,
    mobile: '957529362'
  })

  const smsResult = await axios.post(
    `${smsUrl}sdkappid=${appId}&random=${random}`,
    {
      ext: '',
      extend: '',
      params: ['1234', '4'],
      sig,
      sign: 'Tencent Cloud',
      tel: {
        mobile: '957529362',
        nationcode: '66'
      },
      time,
      tpl_id: 381175
    }
  )

  res.json(smsResult.data)
})

app.post('/callback', (req, res) => {
  console.log(JSON.stringify(req.body))

  res.json(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
