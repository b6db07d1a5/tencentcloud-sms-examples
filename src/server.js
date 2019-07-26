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

const smsUrl = 'https://yun.tim.qq.com/v5/tlssmssvr'

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
  const time = utils.unix()

  const { mobile } = req.body

  const sig = utils.sig({
    appKey,
    random,
    time,
    mobile
  })

  const smsResult = await axios.post(
    `${smsUrl}/sendsms?sdkappid=${appId}&random=${random}`,
    {
      sig,
      time,
      tpl_id: 381175,
      params: ['1234', '4'],
      sign: 'Tencent Cloud',
      tel: {
        mobile,
        nationcode: '66'
      },
      ext: '',
      extend: ''
    }
  )

  res.json(smsResult.data)
})

app.post('/send/bulk', async (req, res) => {
  const random = utils.random()
  const time = utils.unix()

  const { mobile } = req.body

  const sig = utils.sig({
    appKey,
    random,
    time,
    mobile
  })

  const tel = mobile.map(function(m) {
    return {
      nationcode: '66',
      mobile: m
    }
  })

  const smsResult = await axios.post(
    `${smsUrl}/sendmultisms2?sdkappid=${appId}&random=${random}`,
    {
      sig,
      time,
      tel,
      tpl_id: 381175,
      sign: 'Tencent Cloud TH',
      params: ['1234', '4'],
      extend: '',
      ext: ''
    }
  )

  res.json(smsResult.data)
})

app.post('/smscallback', (req, res) => {
  console.log(JSON.stringify(req.body))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
