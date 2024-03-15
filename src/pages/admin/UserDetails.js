import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import TweetComponent from "../../components/TweetComponent";
import userImg from "../../assests/images/user.png";
import { useHistory } from "react-router-dom";

const UserDetails = () => {
  const [data, setData] = useState();
  const [userTweets, setUserTweets] = useState([]);
  const [approveLoading, setApproveLoading] = useState(false);
  const [disapproveLoading, setDisapproveLoading] = useState(false);

  const history = useHistory();

  function getQueryVariable(variable) {
    const query = window.location.search;
    const queryParams = new URLSearchParams(query);
    return queryParams.get(variable);
  }

  const userId = getQueryVariable("userId");

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}/get-user-details`
      );
      const { data } = response.data;
      setData(data);
    };

    const fetchAllTweetsOfUser = async () => {
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
      setUserTweets(formattedTweets);
    };

    fetchUsersData();
    fetchAllTweetsOfUser();
  }, [userId]);

  const handleApprove = async () => {
    setApproveLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/update-user`, {
          userId,
          isApproved: true,
        }
      );
      if (response.status === 200) {
        history.push('/tweets');
      }
    } catch(err) {
      console.log(err)
    } finally {
      setApproveLoading(false);
    }
  };

  const handleReject = () => {
    console.log("Rejected");
  };

  return (
    <>
      <div className="d-flex align-items-center mt-5">
        <h1 className="mt-3">User Details of {data?.userName}</h1>
        <div className="d-flex gap-4 mt-4 ms-auto me-4">
          <Button variant="success" onClick={handleApprove}>
            {approveLoading ? "Loading...." : "Accept"}
          </Button>
          <Button variant="danger" onClick={handleReject}>
            {disapproveLoading ? "Loading...." : "Reject"}
          </Button>
        </div>
      </div>
      <hr className="py-3" />
      <Container className="mt-3">
        <p class="h2">Tweets</p>
        <Row>
          <Col md={20}>
            {userTweets.map((tweet) => (
              <TweetComponent key={tweet.id} tweet={tweet} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDetails;
