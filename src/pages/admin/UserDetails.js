import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import TweetComponent from "../../components/TweetComponent";
import userImg from "../../assests/images/user.png";

const UserDetails = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    function getQueryVariable(variable) {
      const query = window.location.search;
      const queryParams = new URLSearchParams(query);
      return queryParams.get(variable);
    }

    const userId = getQueryVariable('userId');

    const fetchUsersData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}/get-all-tweets`
      );
      const { data } = response.data;
      const formattedTweets = data.map((post) => ({
        id: post._id,
        author: post.userName,
        content: post.tweetContent,
        image: post.tweetImage ? post.tweetImage : null,
        profileImg: post.imageUrl ? post.userId?.imageUrl : userImg,
      }));
      setData(formattedTweets);
    };
    fetchUsersData();
  }, []);

  const handleAccept = () => {
    console.log("Accepted");
  };

  const handleReject = () => {
    console.log("Rejected");
  };

  return (
    <>
      <h1>User Details of {data[0]?.author}</h1>
      <div>
        <Button variant="success" onClick={handleAccept}>
          Accept
        </Button>{" "}
        <Button variant="danger" onClick={handleReject}>
          Reject
        </Button>
      </div>
      <Container className="mt-3">
        <Row>
          <Col md={20}>
            {data.map((tweet) => (
              <TweetComponent key={tweet.id} tweet={tweet} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDetails;
