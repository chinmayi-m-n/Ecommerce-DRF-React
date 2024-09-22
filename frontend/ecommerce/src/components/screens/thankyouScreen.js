import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function ThankYouScreen({ user }) {

  const userLogin = useSelector(state => state.userLogin);

  const { userInfo } = userLogin;

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-4">🎉 Thank You for Your Purchase, { userInfo.name }!!! 🎉</h1>
          <p className="lead my-4">
            We truly appreciate your support and hope you enjoy your items. If you need any assistance, feel free to reach out!
          </p>
          <Button variant="primary" href="/#/" className="mt-3">
            Continue Shopping
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ThankYouScreen;
