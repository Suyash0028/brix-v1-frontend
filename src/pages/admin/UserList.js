// src/components/TweetRequests.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// Import FontAwesome styles
import "@fortawesome/fontawesome-free/css/all.css";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const UserList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/get-all-users`
      );
      const { data } = response.data;
      const formattedUsers = data.map((user) => ({
        id: user._id,
        name: user.userName,
        approvalStatus: user.isApproved,
      }));
      setData(formattedUsers);
    };
    fetchUsers();
  }, []);
  const history = useHistory();

  const showTweets = () => {
    // Change the route when the button is clicked
    history.push("/tweets");
  };

  const postTweets = () => {
    // Change the route when the button is clicked
    history.push("/admin/add-tweets");
  };

  const userDetails = () => {
    // Change the route when the button is clicked
    history.push("/admin/user-details");
  };

  return (
    <>
      <Button variant="primary" className="float-end m-3" onClick={showTweets}>Show Tweets</Button>
      <Button variant="primary" className="float-end m-3" onClick={postTweets}>Add Tweets</Button>
      <Button variant="primary" className="float-end m-3" onClick={userDetails}>User Details</Button>
      <div className="container mt-5">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                {
                  <td>
                    {user.approvalStatus ? "Approved" : "Awaiting approval"}
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
