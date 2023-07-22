require('dotenv').config()

const app = require('./app')
const { db } = require('./database/config')

db.authenticate()
  .then(() => console.log('db auth'))
  .catch((error) => console.log(error))

db.sync({ force: false })
  .then(() => console.log('db sync'))
  .catch((error) => console.log(error))

const PORT = process.env.PORT || 4100

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})
