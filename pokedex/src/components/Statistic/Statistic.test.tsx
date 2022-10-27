import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './Statistic';

test('renders list of pokemons', () => {
  const props = {
    pokemons: 10,
    types: 5,
    species: 8
  }
  render(<App {...props}/>);
  expect(screen.getByText(/pokemons: 10/i)).toBeInTheDocument();
  expect(screen.getByText(/types: 5/i)).toBeInTheDocument();
  expect(screen.getByText(/species: 8/i)).toBeInTheDocument();
});
