import express, { Express, Request, Response } from "express"
const PORT = 8080

const app: Express = express()

app.get( "/",  (req:Request, res:Response ) => {
  res.send("HELLO!")
})

app.get( "/hi", ( req:Request,res:Response ) => {
  res.send("BYE!")
})

app.listen( PORT, () => {
  console.log(`now listening on port ${PORT}`)
})
