import {TYPES_MOCKS} from "mocks";
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './TypesFilter';


test('renders list of types', () => {
  const props = {
    possibleTypes: TYPES_MOCKS,
    value: [],
    onChange: jest.fn()
  }
  render(<App {...props}/>);
  expect(screen.getByLabelText(/normal/i)).toBeInTheDocument();
});
