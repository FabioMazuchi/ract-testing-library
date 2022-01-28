import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste do componente NotFound ', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/qualquerpagina');

  const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  const imgSrc = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(imgSrc.src).toBe(src);

  const notFoundText = screen.getByText('Page requested not found');
  expect(notFoundText).toBeInTheDocument();
});
