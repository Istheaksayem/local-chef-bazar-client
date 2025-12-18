/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/request-role");
      const data = await res.json();
      setRequests(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load requests");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // approve request
  const handleApprove = async (id, email) => {
    try {
      const res = await fetch(
        `http://localhost:5000/request-role/approve/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Request approved successfully");
        fetchRequests();
      }
    } catch (error) {
      toast.error("Approve failed");
    }
  };

  // reject request
  const handleReject = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/request-role/reject/${id}`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.error("Request rejected");
        fetchRequests();
      }
    } catch (error) {
      toast.error("Reject failed");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading requests...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Role Requests</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Request Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req.userName}</td>
                <td>{req.userEmail}</td>
                <td className="capitalize">{req.requestType}</td>
                <td>
                  <span
                    className={`badge ${
                      req.requestStatus === "approved"
                        ? "badge-success"
                        : req.requestStatus === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>
                <td>
                  {new Date(req.requestTime).toLocaleString()}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      handleApprove(req._id, req.userEmail)
                    }
                    disabled={req.requestStatus !== "pending"}
                    className="btn btn-sm btn-success"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(req._id)}
                    disabled={req.requestStatus !== "pending"}
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
