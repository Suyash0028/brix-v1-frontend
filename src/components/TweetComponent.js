// TweetComponent.js
import React from 'react';
import { Card, Figure } from 'react-bootstrap';

const TweetComponent = ({ tweet }) => {
  return (
    <Card className="col-md-12 my-3">
      <Card.Body className="d-flex">
        <Figure className="mr-3 mb-0"> {/* Added mb-0 for removing bottom margin */}
          <Figure.Image
            width={30}
            height={30}
            alt="Author"
            src={tweet.profileImg} // Placeholder image from Lorem Picsum
            roundedCircle
            style={{ border: '2px solid #000', marginRight: '0.75em' }}
          />
        </Figure>
        <div className="d-flex flex-column align-items-start">
          <Card.Title as="h5">{tweet.author}</Card.Title>
          <Card.Text>{tweet.content}</Card.Text>
          {tweet.image && (
            <Figure className="mt-3">
              {tweet.image ?
                <Figure.Image
                  alt="Tweet Image"
                  src={tweet.image} // Actual tweet image
                  style={{ width: '250px' }}
                /> : null}
            </Figure>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TweetComponent;
