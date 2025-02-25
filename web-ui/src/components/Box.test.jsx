/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Box from './Box';

test('renders Box component with correct text', () => {
  render(<Box />);
  const textElement = screen.getByText(/Box Working!/i);
  expect(textElement).toBeInTheDocument();
});