const express = require('express');
const cors = require('cors');
const app = express();

const { initializeDatabase } = require('./db/db.connection');
const { Student } = require('./models/students.model');
const { Teacher } = require('./models/teachers.model')

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// Students API
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET student by ID 
app.get('/students/:id', async (req, res) => {
    try{
        const studentId = req.params.id;
        const student = await Student.findById(studentId)
        res.json(student)
    }
    catch(error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.post("/students", async (req, res) => {
    const { name, age, grade, gender, marks, attendance } = req.body;

    try {
        const student = new Student({ name, age, grade, gender, attendance });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    const updatedStudentData = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            updatedStudentData,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Error" });
    }
});

app.delete("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Teachers API
app.get("/teachers", async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET student by ID 
app.get('/teachers/:id', async (req, res) => {
    try{
        const teacherId = req.params.id;
        const teacher = await Teacher.findById(teacherId)
        res.json(teacher)
    }
    catch(error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.post("/teachers", async (req, res) => {
    const { name, age, gender, subject, classNo } = req.body;

    try {
        const teacher = new Teacher({ name, age, gender, subject, classNo });
        await teacher.save();
        res.status(201).json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/teachers/:id", async (req, res) => {
    const teacherId = req.params.id;
    const updatedTeacherData = req.body;

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            updatedTeacherData,
            { new: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json(updatedTeacher);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Error" });
    }
});

app.delete("/teachers/:id", async (req, res) => {
    const teacherId = req.params.id;
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
        if (!deletedTeacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).json({ message: "Teacher deleted successfully", teacher: deletedTeacher });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
