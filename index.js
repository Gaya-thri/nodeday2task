const express = require('express');
const app = express();

const rooms = [];
//console.log(rooms.length);
const l1 = 0;
const bookrooms = [];
const bookedrooms = [];
const bookedcustomers = [];

const seatmax = 40;
const seatmin = 10;
const hallpricemin = 2000;
const hallpricemax = 10000;


app.get("/rooms",(req,res)=>{
    res.status(200).json(rooms)
})
app.get("/bookedrooms",(req,res)=>{
    res.status(200).json(bookedrooms)
})
app.get("/bookedcustomers",(req,res)=>{
    res.status(200).json(bookedcustomers)
})
app.get("/bookrooms",(req,res)=>{
    res.status(200).json(bookrooms)
})

app.post("/create-room",(req,res)=>{
    rooms.push({
        roomid:`room-${rooms.length}`,
        NoofSeats:`${Math.round(Math.random() * (seatmax - seatmin + 1)) + seatmin}`,
        Noofamenites:`${Math.round(Math.random() * (seatmax - seatmin + 1)) + seatmin}`,
        priceforhour:`${Math.floor(Math.random() * (hallpricemax - hallpricemin + 1)) + hallpricemin}`,
        bookedStatus: "false"
    })
    res.status(200).json({
           message: `Room is created`
    })
})

app.post("/book-room/:name/:date/:startime/:endtime",(req,res)=>{
       const value = rooms.map(room => room.bookedStatus=="false"?room:0)
        bookrooms.push({
           customername: `${req.params.name}`,
            Date:`${req.params.date}`,
            StartTime:`${req.params.startime}`,
            EndTime:`${req.params.endtime}`,
            RoomId:`${value[value.length-1].roomid}`
       })
       if(bookrooms[bookrooms.length-1].RoomId != "undefined"){
            rooms.forEach(room =>{ 
                if(room.roomid==bookrooms[bookrooms.length-1].RoomId){
                    room.bookedStatus = "true";
                }
            })
        if(bookrooms[bookrooms.length-1].RoomId){
            bookedrooms.push({
                Roomname: `${bookrooms[bookrooms.length-1].RoomId}`,
                bookedStatus:"true",
                customername: `${bookrooms[bookrooms.length-1].customername}`,
                Date:`${bookrooms[bookrooms.length-1].Date}`,
                StartTime:`${bookrooms[bookrooms.length-1].StartTime}`,
                EndTime:`${bookrooms[bookrooms.length-1].EndTime}`
                })
        }
        if(bookrooms[bookrooms.length-1].RoomId){
            bookedcustomers.push({
                customername: `${bookrooms[bookrooms.length-1].customername}`,
                Roomname: `${bookrooms[bookrooms.length-1].RoomId}`,
                Date:`${bookrooms[bookrooms.length-1].Date}`,
                StartTime:`${bookrooms[bookrooms.length-1].StartTime}`,
                EndTime:`${bookrooms[bookrooms.length-1].EndTime}`
            })
       }
    }
       res.status(200).json({
           message:"Booked"
       })
})



const port = 3000;
app.listen(port, ()=>{
    console.log("hii")
});