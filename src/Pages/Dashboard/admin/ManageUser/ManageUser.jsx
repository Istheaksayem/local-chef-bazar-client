import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleMakeFraud = (id) => {
    fetch(`http://localhost:5000/users/fraud/${id}`, {
      method: "PATCH"
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire("Success", "User marked as Fraud", "success");
        setUsers(users.map(u =>
          u._id === id ? { ...u, status: "fraud" } : u
        ));
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Manage Users</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span className={`badge ${user.status === "fraud" ? "badge-error" : "badge-success"}`}>
                  {user.status}
                </span>
              </td>

              <td>
                {user.role !== "admin" && user.status !== "fraud" && (
                  <button
                    onClick={() => handleMakeFraud(user._id)}
                    className="btn btn-error btn-sm"
                  >
                    Make Fraud
                  </button>
                )}

                {user.status === "fraud" && (
                  <button className="btn btn-disabled btn-sm">
                    Fraud
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
