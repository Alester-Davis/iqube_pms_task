import app from "./app.mjs"
const port = process.env.PORT
console.log(port)
app.listen(port,()=>{
    console.log(`Server is running in ${port}......`)
})


