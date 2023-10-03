import axios from 'axios';
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../../config';

function AddReviewsModel() {
  //state variables
  const [itemId, setItemId] = useState();
  const [itemName, setName] = useState();
  const [review, setReview] = useState();
  const id = window.sessionStorage.getItem('itemID');

  // Dealing with field changes to update state
  const nameUpdate = (event) => {
    setName(event.target.value);
  };
  const reviewUpdate = (event) => {
    setReview(event.target.value);
  };

  const getItem = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart/${id}`);
      setItemId(response.data.itemId);
      setName(response.data.itemName);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postURL = `${API_URL}/reviews/add`;
    fetch(postURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // We should keep the fields consistent for managing this data later
        itemId: itemId,
        itemName: itemName,
        review: DOMPurify.sanitize(review),
        userId: JSON.parse(sessionStorage.getItem('loggedUser'))._id,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(() => {
        Swal.fire({
          title: 'Your review has been added!',
          timer: 5000,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = '/order-history';
          }
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while adding your review. Please try again later.',
          icon: 'error',
        });
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col xs={9} md={12}>
            <Form.Group className='mb-3'>
              <Form.Label> Item Name </Form.Label>
              <Form.Control defaultValue={itemName} onChange={nameUpdate} type='text' readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={9} md={12}>
            <Form.Group className='mb-3'>
              <Form.Label> Review </Form.Label>
              <Form.Control
                onChange={reviewUpdate}
                as='textarea'
                rows={5}
                placeholder='Add Review'
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Row>
      </Container>
    </Form>
  );
}

export default AddReviewsModel;
