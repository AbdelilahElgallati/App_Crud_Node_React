import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    // Charger les données de l'étudiant à mettre à jour
    axios.get('http://localhost:3001/update/' + id)
      .then(res => {
        if (res.data) {
          console.log(res.data)
          const { Name, Email } = res.data;
          setName(Name);
          setEmail(Email);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  function handleSubmit (event){
    event.preventDefault();
    axios.put('http://localhost:3001/update/' + id, { name, email })
    .then(res => { 
      navigate('/');
    }).catch(err => console.log(err));
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="Name">Name</label>
            <input type="text" id="Name" className="form-control" placeholder="Enter Name"
              value={name}
              name='Name'
              onChange={e=>setName(e.target.value)}
            />
          </div>  
          <div className="mb-2">
            <label htmlFor="Email">Email</label>
            <input type="email" id="Email" className="form-control" placeholder="Enter Email"
              value={email}
              name='Email'
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
