import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

jest.mock("./lib/api");
jest.mock('./components/TypesChart/TypesChart');

test('renders pokemon list', async () => {
  render(<App/>);
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
  expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
});

test('search for pokemon', async () => {
  render(<App/>);
  const input = await screen.findByLabelText(/Input pokemon name/i)
  fireEvent.change(input, {target: {value: 'Kachu'}})
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
  expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
});

test('shows statistic', async () => {
  render(<App/>)
  expect(await screen.findByText(/pokemons: 2/i)).toBeInTheDocument();
})
