import { Express, Request, Response } from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { version } from "../package.json"
import env from "dotenv"
env.config()

const mainPath = "./src/Resources/"

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`
      }
    ],
    info: {
      title: "LMS Backend Docs",
      version,
      description: "Documentation for LMS backend"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "jwt"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    mainPath + "/*/*.router.ts",
    mainPath + "/*/*.schemas.ts",
    mainPath + "/common.schemas.ts"
  ]
}

const specs = swaggerJSDoc(options)

const swaggerDocs = (app: Express, port: number) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json")
    res.send(specs)
  })
  console.log(`docs avalable at http://localhost:${port}/docs`)
}

export default swaggerDocs
