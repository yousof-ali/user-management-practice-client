import { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

function App() {

  const [gender,setGender] = useState("");
  const [status,setStatus] = useState("")

  const handleChangeGender=(value) =>{
     setGender('');
     setGender(value)
  }
  const handleStatus =(value) =>{
    setStatus('');
    setStatus(value);

  }

  const handleCreateUser = (e) => {
    e.preventDefault();
    const from = e.target 
    const name = from.name.value
    const email = from.email.value
    const newUser = {name,email,gender,status}
    console.log(newUser);
    


    fetch('http://localhost:5000/user',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      if(result.insertedId){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Account create successfully",
          showConfirmButton: false,
          timer: 1500
        });
        from.reset();
      }
    })
    .catch((e) => {
      console.log(e.message);
    })

  }

  return (
    <div className="mx-2 mt-6 md:mt-10">
      <div className="max-w-[1200px] mx-auto border-2 border-green-700">
        <h2 className="text-2xl py-2 text-center border-b-2 border-b-green-700 font-bold bg-green-300">
          User Management System
        </h2>
        <div className="my-6 ml-3 md:ml-12">
          <Link to={'/users'} className="btn  bg-green-300  hover:bg-green-100"><span><FaChevronLeft /></span><span>User</span></Link>
        </div>
        <div className="text-center my-6">
          <h2 className="text-2xl">New User</h2>
          <p className="font-light">
            Use the below form to create a new Account
          </p>
        </div>
        <form onSubmit={handleCreateUser} className="md:w-1/2 p-3 md:p-0 mx-auto w-full space-y-4" action="">
          <div>
            <label htmlFor="name">Name :</label>
            <br />
            <input
              className="outline-green-700 mt-2 p-2 w-full bg-green-100 rounded-xl"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email :</label>
            <br />
            <input
              className="outline-green-700 mt-2 p-2 w-full bg-green-100 rounded-xl"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex gap-6">
            <label htmlFor="gender">Gender :</label>
            <label>
            <input
              type="radio"
              name="gender"
              onChange={() => handleChangeGender("Male")}      
              required        
            />
            <span className="ml-2">Male</span>
            </label>
            <label>
            <input
              type="radio"
              name="gender"
              onChange={() => handleChangeGender("Female")}    
              required         
            />
            <span className="ml-2">Female</span>
            </label>
            <label>
            <input
              type="radio"
              name="gender"
              onChange={() => handleChangeGender("Other")}
              required
            />
            <span className="ml-1">Other</span>
            </label>
          </div>
          <div className="flex gap-6">
            <label htmlFor="status">Status :</label>
            <label>
            <input
              type="radio"
              name="status"
              onChange={() => handleStatus("Active")}
              required
            />
            <span className="ml-2">Active</span>
            </label>
            <label>
            <input
              type="radio"
              name="status"
              onChange={() => handleStatus("Inactive")} 
              required
            />
            <span className="ml-2">Inactive</span>
            </label>
            
          </div>
          <div className="flex items-center justify-center ">
            <input type="submit" value={'create'} className="btn bg-green-300 my-6 hover:bg-green-100 w-full md:w-1/2" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
