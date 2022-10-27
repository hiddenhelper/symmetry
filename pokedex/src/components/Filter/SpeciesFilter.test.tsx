import {SPECIES_MOCKS} from "mocks";
import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './SpeciesFilter';

test('renders list of species', () => {
  const props = {
    possibleSpecies: SPECIES_MOCKS,
    value: null,
    onChange: jest.fn()
  }
  render(<App {...props}/>);
  expect(screen.getByText(/mareep/i)).toBeInTheDocument();
});
