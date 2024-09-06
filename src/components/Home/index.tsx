import React from 'react';
import Container from '../Container';
import Carousel from '../Carousel';
import CardCategories from '../CardCategories';

const Home: React.FC = () => {
  return (
    <>
      <Carousel />
      <CardCategories/>
      <Container />
    </>
  );
}

export default Home;
