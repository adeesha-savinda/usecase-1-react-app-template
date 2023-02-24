import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as regThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
// import PetStoreNav from '../../App.js';

import itemsApi from '../../apis/items';


// Component to render the item list
const PetItemList = () => {
  // initialize items
  const [items, setItems] = useState([]);

  // retrieve items from the API
  const retrieveItems = async () => {
    const response = await itemsApi.get("/items");
    return response.data;
  }

  useEffect(() => {
    const getAllItems = async () => {
      const allItems = await retrieveItems();
      if (allItems) setItems(allItems);
    };

    getAllItems();
  }, []);

  const itemPrice = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginRight: '50px'
  };
  return (
    <>
      <Container>
        <Row>
          {
            items.map((item) =>
              <Col key={item.id}>
                <img src={item.image} width="300" alt="dog" /><br />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>
                  <b>Includes: </b> {item.stockDetail.quantity} Sweaters<br />
                  <b>Intended For:</b> {item.stockDetail.intendedFor}<br />
                  <b>Color:</b> {item.stockDetail.color}<br />
                  <b>Material: </b> {item.stockDetail.material}<br />
                </p>
                <br />
                <span style={itemPrice}>$ 14.99</span> <Button variant="danger">Add to cart</Button>
                <br /><br />
                Follow updates &nbsp;&nbsp;<FontAwesomeIcon icon={regThumbsUp} />
              </Col>
            )
          }
          {/*
          <Col>
            <img src={require('./item-3.png')} width="300" alt="dog-bandana" /><br />
            <h4>Top Paw® Valentine's Day Kisses Dog Tee and Bandana</h4>
            <p>Dress your pup up appropriately for Valentine's Day with this Top Paw Valentine's Day Kisses Dog Tee and Bandana. This tee and bandana slip on and off easily while offering a comfortable fit, and offers kisses from your favorite furry friend</p>
            <p>
              <b>Includes: </b> 1 Tee and Bandana<br />
              <b>Intended For:</b> Dogs<br />
              <b>Color:</b> White, Red, Black<br />
              <b>Material: </b> T-Shirt: 65% Polyester, 35% Cotton; Bandana: 100% Cotton<br />
            </p>
            <br />
            <span style={itemPrice}>$ 7.47</span> <Button variant="danger">Add to cart</Button>
            <br /><br />
            Follow updates &nbsp;&nbsp;<FontAwesomeIcon icon={regThumbsUp} />
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default function Catalog() {
  useEffect(() => {
    document.title = 'PetStore Catalog';
  }, []);
  return (
    <>
      <PetItemList />
    </>
  );
}