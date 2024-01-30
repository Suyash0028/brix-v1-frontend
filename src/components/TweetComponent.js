// TweetComponent.js
import React from 'react';
import { Card, Figure } from 'react-bootstrap';

const TweetComponent = ({ tweet }) => {
  return (
    <Card className="mb-3 align-items-start">
      <Card.Body className="d-flex">
        <Figure className="mr-3 mb-0"> {/* Added mb-0 for removing bottom margin */}
          <Figure.Image
            width={70}
            height={70}
            alt="Author"
            src={`https://picsum.photos/50/50?random=${tweet.id}`} // Placeholder image from Lorem Picsum
            roundedCircle
          />
        </Figure>
        <div className="d-flex flex-column align-items-start">
          <Card.Title>{tweet.author}</Card.Title>
          <Card.Text>{tweet.content}</Card.Text>
          {tweet.image && (
            <Figure className="mt-3">
              <Figure.Image
                width={400}
                height={200}
                alt="Tweet Image"
                src={tweet.image} // Actual tweet image
              />
            </Figure>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TweetComponent;
