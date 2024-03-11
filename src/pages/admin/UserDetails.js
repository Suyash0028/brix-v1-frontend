// src/pages/UserDetails/UserDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import TweetComponent from "../../components/TweetComponent";
import userImg from "../../assests/images/user.png";

const UserDetails = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Function to parse query parameters from URL
    function getQueryVariable(variable) {
      const query = window.location.search;
      const queryParams = new URLSearchParams(query);
      return queryParams.get(variable);
    }

    // Fetching the value of 'variableName' from the URL
    const userId = getQueryVariable('userId');
    console.log('Value of variableName:', userId);

    // Now you can use the userId as needed in your page

    const fetchUsersData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}/get-all-tweets`
      );
      const { data } = response.data;
      console.log(data);
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
  }, []); // Empty dependency array to ensure this effect runs only once
  return (
    <>
      <h1>
        User Details of {data[0]?.author}
      </h1>
      <div>

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
