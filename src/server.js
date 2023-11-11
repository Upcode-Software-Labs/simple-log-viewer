#!/usr/bin/env node

const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs')

const app = express()
const port = parseInt(process.env.SIMPLE_LOG_UI_PORT, 10) || 3000

app.use(fileUpload())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Read the file path from an environment variable or use a default path
const LOG_FILE_PATH = process.env.SIMPLE_LOG_UI_LOG_FILE_PATH || 'logs/test.log'

app.get('/readlog', (req, res) => {
  const linesToRead = parseInt(req.query.lines, 10) || 10 // Default to 10 lines if 'lines' query parameter is not provided

  fs.readFile(LOG_FILE_PATH, 'utf-8', (err, logContent) => {
    if (err) {
      return res.status(500).send(err)
    }

    // Process the log content and send the relevant data to the front end
    const logData = processLogContent(logContent, linesToRead)
    res.json({ logData })
  })
})

function processLogContent(logContent, linesToRead) {
  // Split the log content into lines
  const logLines = logContent.split('\n')

  // Get the last 'linesToRead' lines
  const relevantLines = logLines.slice(-(linesToRead + 1)).reverse()

  return relevantLines
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
