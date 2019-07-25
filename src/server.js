import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

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

app.post('/callback', (req, res) => {
  console.log(JSON.stringify(req.body))

  res.json(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
