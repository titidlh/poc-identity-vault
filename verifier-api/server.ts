import express from 'express'
import cors from 'cors'
import { verifyCredential } from './verify.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/verify', async (req, res) => {
  const token = req.body.credential
  if (!token) return res.status(400).json({ error: 'Missing credential' })

  const result = await verifyCredential(token)
  res.json(result)
})

app.listen(3002, () => {
  console.log('Verifier API running on port 3002')
})
