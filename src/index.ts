import express from "express"
import cors from "cors"
import db from "./Resources/database"
import env from "dotenv"
import mainRouter from "./Resources/MainRouter"
env.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use("/", mainRouter)

db.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening to http://localhost:${PORT}`)
    })
  })
  .catch((error) => console.log(error))
