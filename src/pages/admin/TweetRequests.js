// src/components/TweetRequests.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import FontAwesome styles
import '@fortawesome/fontawesome-free/css/all.css';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const TweetRequests = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    { id: 3, name: 'Bob Smith', age: 28 },
  ];

  const history = useHistory();

  const showTweets = () => {
    // Change the route when the button is clicked
    history.push('/tweets');
  };

  return (
    <>
      <Button variant="primary" className="float-end" onClick={showTweets}>
        Show Tweets
      </Button>
      <Button variant="primary" className="float-end">
        Add Tweets
      </Button>
      <div className="container mt-5">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>
                  <button type="button" className="btn btn-success">
                    Accept
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button type="button" className="btn btn-danger">
                    Reject
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TweetRequests;
