import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const Users = () => {
  const loderData = useLoaderData();
  const [users,setUsers] = useState(loderData)


  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            if (result.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const newUsers = loderData.filter(user => user._id !== id);
              setUsers(newUsers);
            }
          });
      }
    });
  };

  return (
    <div className="mx-2 mt-6 md:mt-10 ">
      <div className="max-w-[1200px] mx-auto border-2 border-green-700 ">
        <h2 className="text-2xl py-2 text-center border-b-2 border-b-green-700 font-bold bg-green-300">
          User Management System
        </h2>
        <div className="max-w-[1000px] px-2 mb-6 mx-auto ">
          <Link className=" btn bg-green-300  hover:bg-green-100 my-6" to={"/"}>
            <span>
              <FaUser />
            </span>
            <span>New user</span>
          </Link>
          <div className="overflow-x-auto ">
            <table className="table">
              {/* head */}
              <thead className="bg-slate-700 text-white  ">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="">Gender</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 2 */}
                {users.map((user, indx) => (
                  <tr key={indx} className="hover  shadow-md">
                    <th>{indx + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.status}</td>
                    <td className="flex gap-2">
                      <Link
                        to={`/edit/${user._id}`}
                        className="btn text-xl bg-green-200 hover:bg-green-100"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn text-xl bg-red-400 hover:bg-red-200"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
