
const express = require("express");
const req = require("express/lib/request");
const uuid = require('uuid')


const list = require('./Studentdetails')

const app = express()



app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//listing student details


app.get('/api/list',(req,res) => res.json(list));


// listing student details by perticular student id


app.get('/api/list/:id',(req,res) => {

const found = list.some((student) => student.id === parseInt(req.params.id));

if (found) {
res.json(list.filter((student) => student.id === parseInt(req.params.id)));
}
else{
    res.status(400).json({ msg: `no student is found with this id ${req.params.id}`})
}

 
})

// create student


app.post('/',(req,res) => {
    const newStudent ={
        id: req.body.id,
        name:req.body.name,
        Age: req.body.Age,
        email: req.body.email,
        mobile: req.body.mobile
    }

    if(!newStudent.name || !newStudent.Age || !newStudent.email || !newStudent.mobile) {
        res.status(400).json({msg: 'please include all data'});
    }


    list.push(newStudent);
    res.json(list)
});


// update student

app.put('/:id',(req,res) => {

    const found = list.some(
      (student) => student.id === parseInt(req.params.id)
    );

    if (found) {
            const updateStudent = req.body;
            list.forEach(student => {
                if(student.id === parseInt(req.params.id)){
                    student.name = updateStudent.name ? updateStudent.name : student.name,
                    student.Age =updateStudent.Age ? updateStudent.Age : student.Age,
                   student.email=updateStudent.email ? updateStudent.email : student.email,
                   student.mobile=updateStudent.mobile ? updateStudent.mobile : student.mobile


                   res.json({ msg: 'student updated',student})
                }
            })
    } else {
      res
        .status(400)
        .json({ msg: `no student is found with this id ${req.params.id}` });
    }



})


// delete student

app.delete("/:id", (req, res) => {
    
  const found = list.some((student) => student.id === parseInt(req.params.id));

  if (found) {
    res.json({ msg: 'student deleted', list: list.filter((student) => student.id !== parseInt(req.params.id))});
  } else {
    res
      .status(400)
      .json({ msg: `no student is found with this id ${req.params.id}` });
  }
});


























app.get('/',(req,res)=>{
    res.send("hey this a server application ")
})


app.listen(3000, () => {
    console.log("3000");
})
