require('dotenv').config()
const initModel = require('./models/init.model')
const app = require('./app')
const { db } = require('./database/config')

db.authenticate()
  .then(() => console.log('db auth...🫡'))
  .catch((error) => console.log(error))

initModel()

db.sync({ force: false })
  .then(() => console.log('db sync...🫡'))
  .catch((error) => console.log(error))

const PORT = process.env.PORT || 4100

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})
