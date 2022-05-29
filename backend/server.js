import express from "express"
import mongoose from "mongoose"
import bp from "body-parser"
import cors from "cors"
import autokRouter from "./routers/autokRouter.js"
import gyartokRouter from "./routers/gyartoRouter.js"



const app = express()
const PORT = 5006


var db = "mongodb://fsociety:fsociety@localhost:27017/autosprojekt";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
  console.log('Database connected:', db)
})

conSuccess.on('error', err => {
  console.error('connection error:', err)
})

app.use(bp.json({limit: '50mb'}))
app.use(bp.urlencoded({ extended: true }))

app.use(cors({origin: 'http://localhost'}));


app.use('/api/autok',autokRouter)

app.use('/api/gyartok',gyartokRouter)



app.listen(PORT,()=>{
    console.log("The server has been created! Port: "+PORT);
})

