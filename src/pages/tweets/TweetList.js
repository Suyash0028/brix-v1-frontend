// TweetList.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TweetComponent from "../../components/TweetComponent";
import userImg from "../../assests/images/user.png";
import { useHistory } from "react-router-dom";
import CustomSpinner from "../../components/Spinner";

const TweetList = () => {
  const history = useHistory();
  const [tweets, setTweets] = useState([]);
  const [fetchTweetsLoading, setFetchTweetsLoading] = useState(false);

  // Simulate fetching data asynchronously
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchTweetsLoading(true);
        // Replace with your actual API call
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/tweets/get-all-tweets`
        );
        const { data } = await response.json();
        const formattedTweets = data.map((post) => ({
          id: post._id,
          author: post.userId?.userName,
          content: post.tweetContent,
          image: post.tweetImage ? post.tweetImage : null,
          profileImg: post.imageUrl ? post.userId?.imageUrl : userImg,
          createdAt: post.createdAt,
        }));
        setTweets(
          formattedTweets.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        );
      } catch (err) {
        console.log(err);
      } finally {
        setFetchTweetsLoading(false);
      }
    };
    fetchData();
  }, []); // Run only once on component mount

  return (
    <Container className="mt-3">
      {fetchTweetsLoading ? (
        <CustomSpinner />
      ) : (
        <Row>
          <Col md={20}>
            <div className="d-flex align-items-center gap-4 my-3">
              <h1 className="display5">Public Tweets</h1>
              <Button
                variant="primary"
                onClick={() => history.push("/application/admin")}
              >
                Access Admin Portal
              </Button>
            </div>
            {tweets.map((tweet) => (
              <TweetComponent key={tweet.id} tweet={tweet} />
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TweetList;
