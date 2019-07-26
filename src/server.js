import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

import * as utils from './utilities'

const app = express()
const port = 3000

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
  const time = new Date().getTime()

  const sig = utils.sig({
    appkey: 'xxx',
    random,
    time,
    mobile: 'xxx'
  })

  // const smsResult = await axios.post(
  //   `${smsUrl}sdkappid=${process.env.APP_ID}&random=${random}`,
  //   {
  //     ext: '',
  //     extend: '',
  //     params: ['Verification code', '1234', '4'],
  //     sig: 'ecab4881ee80ad3d76bb1da68387428ca752eb885e52621a3129dcf4d9bc4fd4',
  //     sign: 'Tencent Cloud',
  //     tel: {
  //       mobile: '13788888888',
  //       nationcode: '86'
  //     },
  //     time,
  //     tpl_id: 19
  //   }
  // )

  // console.log(process.env.APP_ID)

  res.json({
    gg: sig
  })
})

app.post('/callback', (req, res) => {
  console.log(JSON.stringify(req.body))

  res.json(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
