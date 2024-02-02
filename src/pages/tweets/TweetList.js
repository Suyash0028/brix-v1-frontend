// TweetList.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TweetComponent from '../../components/TweetComponent';
import userImg from "../../assests/images/user.png"

const TweetList = () => {
  const [tweets, setTweets] = useState([]);

  // Simulate fetching data asynchronously
  useEffect(() => {
    const fetchData = async () => {
      // Replace with your actual API call
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweets/get-all-tweets`);
      const data = await response.json();
      const formattedTweets = data.map((post) => ({
        id: post._id,
        author: post.userName,
        content: post.tweetContent,
        image: post.tweetImage ? `data:image/png;base64,${post.tweetImage}` : null,
        profileImg: post.imageUrl ? `data:image/png;base64,${post.imageUrl}` : userImg,
      }));
      setTweets(formattedTweets);
    };
    fetchData();
  }, []); // Run only once on component mount

  return (
    <Container className="mt-3">
      <Row>
        <Col md={10}>
          <h2>Your Tweets</h2>
          {tweets.map((tweet) => (
            <TweetComponent key={tweet.id} tweet={tweet} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TweetList;
