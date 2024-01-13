const express = require("express")
const app = express();
const cors = require("cors")
const mysql = require("mysql")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud"
});

app.get('/',(req,res)=>{
  const sql = "select * from students";
  db.query(sql,(err,data)=>{
    if(err) return res.json("Error");
    return res.json(data);
  })
})


app.get('/update/:id', (req, res) => {
  const id = req.params.id;
  const sql = "select * from students where ID = ?";
  db.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    if (data.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    return res.json(data[0]);

  });
});


app.post('/create', (req, res) =>{
  const sql = "INSERT INTO students (`Name`, `Email`) VALUES (?,?)";
  const values = [req.body.name, req.body.email];
  db.query(sql,values,(err,data)=>{
    if(err) return res.json("Error");
    return res.json(data);
  })
})

app.put('/update/:id', (req, res) =>{
  const sql = "update students set `Name` = ?, `Email` = ? where ID = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;
  db.query(sql,[...values,id],(err,data)=>{
    if(err) return res.json("Error");
    return res.json(data);
  })

})

app.delete('/students/:id', (req, res) =>{
  const sql = "delete from students where ID = ?";
  const id = req.params.id;
  db.query(sql,[id],(err,data)=>{
    if(err) return res.json("Error");
    return res.json(data);
  })

})



app.listen(3001, () => console.log("listening"));