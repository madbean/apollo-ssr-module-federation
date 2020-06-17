import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { gql } from 'apollo-boost';
import { graphql } from '@apollo/react-hoc';

const AddToCart = React.lazy(() => import("checkout/AddToCart"));

const GET_POKEMONS = gql`
  {
    pokemons(first: 5) {
      id
      number
      name
      types
      image
    }
  }
`

const getPokemon = ({ name, image, types, number }) => (
  <Card style={{ width: "18rem" }} key={name}>
    <Card.Img
      variant="top"
      src={image}
      style={{
        maxHeight: 200,
        objectFit: "contain",
        width: "auto",
        height: "auto",
      }}
    />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{types.join(", ")}</Card.Text>
      <Row>
        <Col xs={4}>${number}</Col>
        <Col xs={8}>
            <AddToCart pokemon={{ name, image, types, number }}>Add To Cart</AddToCart>
        </Col>
      </Row>
    </Card.Body>
  </Card>
)

const Pokemons = ({ data: { loading, error, pokemons }}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 33%)",
      gridGap: "1em",
      paddingTop: "1em",
    }}
  >
    {pokemons.map(getPokemon)}
  </div>;
}

export default graphql(GET_POKEMONS)(Pokemons);
