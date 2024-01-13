import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = () => {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        setStudent(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const handelDelete = async (id) => {
    try{
      await axios.delete("http://localhost:3001/students/"+id)
      window.location.reload();
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">Add +</Link>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.Name}</td>
                <td>{data.Email}</td>
                <td>
                  <Link to={`update/${data.ID}`} className="btn btn-primary">Update</Link>
                  <button className="btn btn-danger ms-2" onClick={e => handelDelete(data.ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
