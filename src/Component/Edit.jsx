import React from "react";
import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const Edit = () => {
  const userData = useLoaderData();
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const handleChangeGender = (value) => {
    setGender("");
    setGender(value);
  };
  const handleStatus = (value) => {
    setStatus("");
    setStatus(value);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const name = from.name.value;
    const updateUser = { name, email, gender, status };

    fetch(`http://localhost:5000/edit/${userData._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Account update successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          from.reset();
        }
      });
  };

  return (
    <div className="mx-2 mt-6 md:mt-10">
      <div className="max-w-[1200px] mx-auto border-2 border-green-700">
        <h2 className="text-2xl py-2 text-center border-b-2 border-b-green-700 font-bold bg-green-300">
          User Management System
        </h2>
        <div className="my-6 ml-3 md:ml-12">
          <Link to={"/users"} className="btn  bg-green-300  hover:bg-green-100">
            <span>
              <FaChevronLeft />
            </span>
            <span>Users</span>
          </Link>
        </div>
        <div className="text-center my-6">
          <h2 className="text-2xl">Edit user</h2>
        </div>
        <form
          onSubmit={handleEdit}
          className="md:w-1/2 p-3 md:p-0 mx-auto w-full space-y-4"
          action=""
        >
          <div>
            <label htmlFor="name">Name :</label>
            <br />
            <input
              className="outline-green-700 mt-2 p-2 w-full bg-green-100 rounded-xl"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              defaultValue={userData.name}
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
              defaultValue={userData.email}
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
            <input
              type="submit"
              value={"Edit"}
              className="btn bg-green-300 my-6 hover:bg-green-100 w-full md:w-1/2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
