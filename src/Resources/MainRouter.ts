import { Router } from "express"
import authRouter from "./Authorization/auth.router"
import languageRouter from "./Language/language.router"

const mainRouter = Router()
mainRouter.use("/auth", authRouter)
mainRouter.use("/language", languageRouter)

export default mainRouter
