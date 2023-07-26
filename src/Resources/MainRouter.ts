import { Router } from "express"
import authRouter from "./Authorization/auth.router"
import languageRouter from "./Language/language.router"
import chapterRouter from "./Chapters/chapter.router"
import sequenceRouter from "./ChapterSequence/sequence.router"

const mainRouter = Router()
mainRouter.use("/auth", authRouter)
mainRouter.use("/language", languageRouter)
mainRouter.use("/chapters", chapterRouter)
mainRouter.use("/sequence", sequenceRouter)

export default mainRouter
