const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


const PORT = 3000;


const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 8,
    cgpa: 9.3
  },
  {
    id: 2,
    name: "Ishita Verma",
    branch: "IT",
    semester: 7,
    cgpa: 8.9
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    branch: "ECE",
    semester: 6,
    cgpa: 8.4
  },
  {
    id: 4,
    name: "Meera Iyer",
    branch: "CSE",
    semester: 8,
    cgpa: 9.1
  },
  {
    id: 5,
    name: "Kunal Deshmukh",
    branch: "IT",
    semester: 5,
    cgpa: 7.8
  },
  {
    id: 6,
    name: "Ananya Reddy",
    branch: "CSE",
    semester: 6,
    cgpa: 8.7
  },
  {
    id: 7,
    name: "Vikram Patil",
    branch: "ECE",
    semester: 7,
    cgpa: 8.2
  },
  {
    id: 8,
    name: "Priyanka Nair",
    branch: "AI",
    semester: 4,
    cgpa: 8.8
  },
  {
    id: 9,
    name: "Harsh Mehta",
    branch: "Data Science",
    semester: 5,
    cgpa: 8.0
  },
  {
    id: 10,
    name: "Neha Gupta",
    branch: "CSE",
    semester: 6,
    cgpa: 7.9
  }
];

// 1 route students
app.get("/students", (req, res) => {

  res.status(200).json(students);

});



// 2 route toppper
app.get("/students/topper", (req, res) => {

  if (students.length === 0) {

    return res.status(404).json({
      message: "No students found"
    });

  }

  const topper = students.reduce((max, student) => {

    return student.cgpa > max.cgpa ? student : max;

  });

  res.status(200).json(topper);

});


// 3 route average cgpa
app.get("/student/average",(req,res)=>{
  if (students.length===0){
    return res.status(404).json({
      message:"no students found"

    })
  }
  const total=students.reduce((sum,students)=>{
    return sum+students.cgpa;
  }, 0);const average=total/students.length;
  res.status(200).json({
    averageCGPA: parseFloat(average.toFixed(2))
  })
  });


// 4 route count of students
app.get("/students/count",(req,res)=>{
  res.status(200).json({
    totalStudents: students.length
  })
  });


// 5 route students id
app.get("/students/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const student=students.find(s=>s.id===id);
  if(!student){
    return res.status(404).json({
      message:"Student not found"
    })
  }
  res.status(200).json(student)
  }
);


// 6 route students branch
app.get("/students/branch/:branchName", (req, res) => {

  const branchName = req.params.branchName.toLowerCase();

  const filteredStudents = students.filter(student =>

    student.branch.toLowerCase() === branchName

  );

  if (filteredStudents.length === 0) {

    return res.status(404).json({

      message: "No students found in this branch"

    });

  }

  res.status(200).json(filteredStudents);

});



app.get("/", (req, res) => {

  res.send("Student CGPA API is running");

});



app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});