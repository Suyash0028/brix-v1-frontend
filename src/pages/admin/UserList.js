// src/components/TweetRequests.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// Import FontAwesome styles
import "@fortawesome/fontawesome-free/css/all.css";
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import CustomSpinner from "../../components/Spinner";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [fetchUserListLoading, setFetchUserListLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setFetchUserListLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/get-all-users`
        );
        const { data } = response.data;
        const formattedUsers = data.map((user) => ({
          id: user._id,
          name: user.userName,
          approvalStatus: user.isApproved,
          createdAt: user.createdAt,
        }));
        setUser(formattedUsers.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setFetchUserListLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const history = useHistory();

  const showTweets = () => {
    // Change the route when the button is clicked
    history.push("/application/tweets");
  };

  const postTweets = () => {
    // Change the route when the button is clicked
    history.push("/application/admin/add-tweets");
  };

  const renderUserList = () => {
    if (users.length <= 0) {
      return (
        <tr>
          <td>Your list is empty</td>
        </tr>
      );
    }
    return users?.map((user, index) => (
      <tr key={user.id}>
        <td>{index + 1}</td>
        <td>
          <a href={`/application/admin/user-details?userId=${user.id}`}>
            {user.name}
          </a>
        </td>
        <td>{user.approvalStatus ? "Approved" : "Awaiting approval"}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center gap-4 my-3">
        <h1 className="display5">User List</h1>
        <Button variant="primary" onClick={showTweets}>
            Show Tweets
          </Button>
          <Button variant="primary" onClick={postTweets}>
            Add Tweets
          </Button>
        {/* <div className="d-flex align-items-center gap-4 ms-auto">
          
        </div> */}
      </div>
      {fetchUserListLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ) : (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{renderUserList()}</tbody>
          </table>
        )}
    </div>
  );
};

export default UserList;
