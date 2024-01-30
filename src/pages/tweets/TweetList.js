// TweetList.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TweetComponent from '../../components/TweetComponent';

const TweetList = () => {
  const [tweets, setTweets] = useState([]);

  // Simulate fetching data asynchronously
  useEffect(() => {
    const fetchData = async () => {
      // Replace with your actual API call
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      const formattedTweets = data.map((post) => ({
        id: post.id,
        author: post.title,
        content: post.body,
        // For illustration purposes, add a random image to some tweets
        image: post.id % 2 === 0 ? `https://picsum.photos/400/200?random=${post.id}` : null,
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
