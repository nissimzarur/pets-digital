import React from "react";
import { Card, Button } from "react-bootstrap";

export default function ProductCard(props) {
  let title = props.title;
  let description = props.description;
  console.log(props);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={() => ""}>
          {title}
        </Button>
      </Card.Body>
    </Card>
  );
}
