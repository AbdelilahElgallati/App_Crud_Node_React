import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  function handleSubmit (event){
    event.preventDefault();
    axios.post('http://localhost:3001/create',{name,email})
    .then(res => { 
      navigate('/');
    }).catch(err => console.log(err));
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <div className="mb-2">
            <label htmlFor="Name">Name</label>
            <input type="text" id="Name" className="form-control" placeholder="Enter Name"
            onChange={e=>setName(e.target.value)}
            />
          </div>  
          <div className="mb-2">
            <label htmlFor="Email">Email</label>
            <input type="email" id="Email" className="form-control" placeholder="Enter Email"
            onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
