import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Card, Button, Form } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartAction';
import placeOrder from '../../actions/orderAction';


function ShippingScreen() {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // console.log('subtotal', subtotal);

    // Assume tax rate of 10%
    const taxRate = 0.1;
    const tax = (subtotal * taxRate).toFixed(2);

    // console.log('tax', tax);

    // Calculate total
    const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
    // console.log('total', total);


    const dispatch = useDispatch();

    const [message, setMessage] = useState('')


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData(prevData => ({
          ...prevData,
          [id]: value
        }))
      }


    const addressHandler = (e) => {
        e.preventDefault();

        const { firstName, lastName, address1, address2, city, state, zip, country } = formData;


        if (!firstName || !lastName || !address1 || !city || !state || !zip || !country) {
            setMessage('Please fill in all fields');
            return;
        }

        const shippingAddress = { "firstName":firstName, "lastName":lastName, "address1":address1, "address2":address2, "city":city, "state":state, "zip":zip, "country":country }

        // localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
        // localStorage.setItem('orderItems', JSON.stringify(cartItems));

        const order = {"OderItems": cartItems, "ShippingAddress": shippingAddress, "Total": total}
        
        dispatch(placeOrder(order));
        
    
    }

    return (

        <>
            <Container>
                <h1 className="my-4">Invoice</h1>
                <Row>
                    <Col md={8}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Order Items</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.price}</td>
                                                <td>${(item.quantity * item.price).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Order Summary</Card.Title>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>Subtotal:</td>
                                            <td>${subtotal}</td>
                                        </tr>
                                        <tr>
                                            <td>Tax (10%):</td>
                                            <td>${tax}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Total:</strong></td>
                                            <td><strong>${total}</strong></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container>
                <h1 className="my-4">Enter Shipping Address</h1>
                {message ? <p className="text-danger">{message}</p> : null}
                <Form onSubmit={addressHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name"  value={formData.firstName} onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" value={formData.lastName} onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="address1" className="my-3">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type="text" placeholder="1234 Main St" value={formData.address1} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="address2" className="my-3">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type="text" placeholder="Apartment, studio, or floor" value={formData.address2} onChange={handleInputChange}/>
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" value={formData.city} onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" value={formData.state} onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="zip">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="text" placeholder="Zip Code" value={formData.zip} onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" placeholder="Country" value={formData.country} onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="mt-4">
                        Submit
                    </Button>
                </Form>
            </Container>

        </>
    );
}

export default ShippingScreen;