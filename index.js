const express = require('express');
const app = express();

app.use(express.json());
app.use(middleware);

let courses = [
    {id: 1, name:"java"},
    {id: 2, name:"javascript"},
    {id: 3, name:"python"},
];

app.get('/courses',(req,res)=>{
    res.json(courses);
});

app.post('/courses', (req, res) => {
    console.log(req.body);
    let singleCourse = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(singleCourse);
    res.send(courses);
});

app.put('/courses/:id',(req,res)=>{
    const courseId = parseInt(req.params.id,10); 
    const course = courses.find(c => c.id === courseId);
    course.name = req.body.name;
    res.json(course);
})

app.delete('/courses/:id',(req,res)=>{
    const courseId = parseInt(req.params.id,10); 
    const course = courses.findIndex(c => c.id === courseId);
    const deletedCourse = courses.splice(courseId, 1);
    res.json(deletedCourse[0]);
    res.json(course);
})

function middleware(req,res,next){
    console.log("called");
    const method = req.method;
    const ip = req.ip;
    const hostname = req.hostname;
    const date = new Date().toISOString();

    console.log(`[${date}] ${method} request from ${hostname} (IP: ${ip})`);
    next();
    
}
//logger
//method, ip, hostname, date

app.listen(3000,()=>{
    console.log("Server started");
})