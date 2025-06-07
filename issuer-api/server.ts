import express from 'express'
import cors from 'cors'
import { issueCredential } from './issue.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/issue', async (req, res) => {
  try {
    const jwt = await issueCredential(req.body)
    res.json({ jwt })
  } catch (e) {
    res.status(500).json({ error: 'Issuance failed' })
  }
})

app.listen(3001, () => {
  console.log('Issuer API running on port 3001')
})
