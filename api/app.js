const ejs = require('ejs')
const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/dictionaryDB')
 
const entrySchema = {
  word: String,
  type: String,
  gender: String,
  translation: String,
  description: String,
  location: String
}

const Entry = mongoose.model('Entry', entrySchema)

app.route('/entries')

.get((req, res) => {
    Entry.find({}, (err, foundEntries) => {
      if (!err) {
        res.send(foundEntries)
      } else {
        res.send(err)
      }
    }
  )
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})