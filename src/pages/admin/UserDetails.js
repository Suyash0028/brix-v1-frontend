import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import TweetComponent from "../../components/TweetComponent";
import userImg from "../../assests/images/user.png";
import { Link, useHistory } from "react-router-dom";
import CustomSpinner from '../../components/Spinner'

const UserDetails = () => {
  const [userData, setUserData] = useState();
  const [userTweets, setUserTweets] = useState([]);
  const [fetchUserDetailsLoading, setFetchUserDetailsLoading] = useState(true);
  const [fetchTweetsLoading, setFetchTweetsLoading] = useState(false);
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
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}/get-user-details`
        );
        const { data } = response.data;
        setUserData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setFetchUserDetailsLoading(false);
      }
    };

    const fetchAllTweetsOfUser = async () => {
      try {
        setFetchTweetsLoading(true)
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
      } catch (err) {
        console.log(err);
      } finally {
        setFetchTweetsLoading(false);
      }
    };
    fetchUsersData();
    fetchAllTweetsOfUser();
  }, [userId]);

  const handleApprove = async () => {
    setApproveLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/update-user`,
        {
          userId,
          isApproved: true,
        }
      );
      if (response.status === 200) {
        history.push("/application/tweets");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setApproveLoading(false);
    }
  };

  const handleReject = () => {
    console.log("Rejected");
  };

  // const SPINNER = (
  //   <div className="p-5 d-flex align-items-center justify-content-center">
  //     <Spinner animation="border" role="status">
  //       <span className="visually-hidden">Loading...</span>
  //     </Spinner>
  //   </div>
  // );

  if (fetchUserDetailsLoading) {
    return <CustomSpinner />
  }

  return (
    <div className="container">
      <div className="p-3">
        <Link to={"/application/admin/user-list"} className="text-dark">
          back
        </Link>
      </div>
      <div className="d-flex align-items-center my-3 gap-4">
        <h1 className="display6">User Details</h1>
        <div className="d-flex gap-4">
          {!userData?.isApproved && (
            <Button variant="success" onClick={handleApprove}>
              {approveLoading ? "Loading...." : "Approve User"}
            </Button>
          )}
          {userData?.isApproved && (
            <Button variant="danger" onClick={handleReject}>
              {disapproveLoading ? "Loading...." : "Reject User"}
            </Button>
          )}
        </div>
      </div>
      <p>User Name: {userData?.userName}</p>
      <Container className="mt-3">
        <p className="h2">Tweets</p>
        {fetchTweetsLoading ? (
          <CustomSpinner />
        ) : (
          <Row>
            <Col md={20}>
              {userTweets.map((tweet) => (
                <TweetComponent key={tweet.id} tweet={tweet} />
              ))}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default UserDetails;
