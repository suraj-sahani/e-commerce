import express from 'express'
import productsRouter from './routes/products.routes'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World Using Watch!!!')
})

app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
})
