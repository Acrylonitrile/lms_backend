import express from "express"
import cors from "cors"
import db from "./Resources/database"
import env from "dotenv"
env.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

db.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening to http://localhost:${PORT}`)
    })
  })
  .catch((error) => console.log(error))
