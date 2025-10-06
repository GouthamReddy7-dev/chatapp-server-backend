const express=require("express")
const cors=require("cors")
const http=require("http")
const {Server}=require("socket.io")


const app=express()

app.use(cors())


const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["POST","GET"]
    }
    
})

io.on("connection",(socket)=>{
    console.log("user connected : "+socket.id)
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.broadcast.emit("recived_message",data)
    })
    
})

const port=process.env.PORT||3001
server.listen(port,()=>{
    console.log("server is listerining !")
})