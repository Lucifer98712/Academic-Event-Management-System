// UserManagement.jsx
import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../Utils/ClientApi";
import "./UserManagement.css";

const UserManagement = ({ onUpdate }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data?.users || []);
    } catch (error) {
      setError("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setLoading(true);
        await deleteUser(userId);
        await fetchUsers();
        onUpdate?.();
      } catch (error) {
        setError("Failed to delete user");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>User Management</h2>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td className="action-buttons">
                  <button className="view-button" onClick={() => handleViewDetails(user)}>
                    View
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>User Details</h3>
              <button
                className="close-button"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
                }}
              >
                &times;
              </button>
            </div>

            <div className="user-details">
              <div className="detail-item">
                <span className="label">Name:</span>
                <span className="value">{selectedUser.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{selectedUser.email}</span>
              </div>
              <div className="detail-item">
                <span className="label">Role:</span>
                <span className="value">{selectedUser.role}</span>
              </div>

              <div className="detail-item">
                <span className="label">Joined:</span>
                <span className="value">
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Last Active:</span>
                <span className="value">
                  {new Date(selectedUser.lastActive).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="close-button-secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
