import { Router } from "express"
import authRouter from "./Authorization/auth.router"
import languageRouter from "./Language/language.router"
import chapterRouter from "./Chapters/chapter.router"
import sequenceRouter from "./ChapterSequence/sequence.router"
import enrollmentRouter from "./Enrollment/enrollment.router"
import { validateToken } from "./Middleware/Validation/validation"

const mainRouter = Router()
mainRouter.use("/auth", authRouter)
mainRouter.use("/language", validateToken, languageRouter)
mainRouter.use("/chapters", validateToken, chapterRouter)
mainRouter.use("/sequence", validateToken, sequenceRouter)
mainRouter.use("/enrollment", validateToken, enrollmentRouter)

export default mainRouter
