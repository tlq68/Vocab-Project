const ejs = require('ejs')
const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/wikiDB')
 
const articleSchema = {
  title: String,
  content: 
  {
    type: String,
    required: true
  }
}

const Article = mongoose.model('Article', articleSchema)

app.route('/articles')

.get((req, res) => {
    Article.find({}, (err, foundArticles) => {
      if (!err) {
        // app.render('article', { articleTitle: foundArticles.title, articleContent: fountArticles.content})
        res.send(foundArticles)
      } else {
        res.send(err)
      }
    }
  )
})

.post((req, res) => {
  const articleTitle = req.body.title
  const articleContent = req.body.content

  const article = new Article ({
    title: articleTitle,
    content: articleContent
  })

  article.save((err) => {
    if (!err) {
      res.send('The article was successfully added.')
    } else {
      res.send(err)
    }
  })
})

.delete((req, res) => {
  Article.deleteMany({}, (err) => {
    if (!err) {
      res.send('Every article was deleted.')
    } else {
      res.send(err)
    }
  })
})

app.route('/articles/:articleTitle')

.get((req, res) => {
  const articleTitle = req.params.articleTitle

  Article.findOne({ title: articleTitle }, (err, foundArticle) => {
    if (foundArticle) {
      res.send(foundArticle)
    } else {
      res.send('No article matching that title was found.')
    }
  })
})

.put((req, res) => {
  const articleTitle = req.params.articleTitle
  const newArticleTitle = req.body.title
  const newArticleContent = req.body.content
  Article.updateOne(
    { title: articleTitle },
    { $set: { title: newArticleTitle, content: newArticleContent } }, { overwrite: true },
    (err) => {
      if (!err) {
        res.send('Successfully updated article')
      } else {
        res.send(err)
      }
    }
  )
})

.patch((req, res) => {
  const articleTitle = req.params.articleTitle
  Article.updateOne(
    { title: articleTitle },
    { $set: req.body }, 
    (err) => {
      if (!err) {
        res.send('Successfully patched article')
      } 
      else {
        res.send(err)
      }
    }
  )
})

.delete((req, res) => {
  const articleTitle = req.params.articleTitle
  Article.deleteOne({ title: articleTitle },
    (err) => {
      if (!err) {
        res.send('Successfully deleted article')
      } else {
        res.send(err)
      }
    }
  )
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})