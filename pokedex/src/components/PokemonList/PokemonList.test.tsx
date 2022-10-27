import {POKEMONS_MOCKS} from "mocks";
import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './PokemonList';

test('renders list of pokemons', () => {
  render(<App pokemons={POKEMONS_MOCKS}/>);
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
  expect(screen.getByText(/20/i)).toBeInTheDocument();
});

test('shows pokemon image', () => {
  render(<App pokemons={POKEMONS_MOCKS}/>);
  const image = screen.getByAltText<HTMLImageElement>('pikachu');
  expect(image.src).toContain('https://example.com/pikachu.png');
});

test('sorts by hp', () => {
  render(<App pokemons={POKEMONS_MOCKS}/>);
  const image = screen.getByAltText<HTMLImageElement>('pikachu');
  expect(image.src).toContain('https://example.com/pikachu.png');
});
