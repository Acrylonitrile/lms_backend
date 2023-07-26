import { Router } from "express"
import authRouter from "./Authorization/auth.router"
import languageRouter from "./Language/language.router"
import chapterRouter from "./Chapters/chapter.router"
import sequenceRouter from "./ChapterSequence/sequence.router"
import enrollmentRouter from "./Enrollment/enrollment.router"

const mainRouter = Router()
mainRouter.use("/auth", authRouter)
mainRouter.use("/language", languageRouter)
mainRouter.use("/chapters", chapterRouter)
mainRouter.use("/sequence", sequenceRouter)
mainRouter.use("/enrollment", enrollmentRouter)

export default mainRouter
