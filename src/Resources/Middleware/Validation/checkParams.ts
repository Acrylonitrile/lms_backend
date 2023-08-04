import { Request, Response, NextFunction } from "express"

const verifyParam =
  (label: string) => (req: Request, res: Response, next: NextFunction) => {
    const idParam = req.params[label]
    if (!idParam)
      return res.status(400).send({
        error: "No Id provided"
      })
    const id = parseInt(idParam)
    req.body[label] = id
    next()
  }

export default verifyParam
