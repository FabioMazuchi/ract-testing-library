import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste do componente FavoritePokemons', () => {
  const { history } = renderWithRouter(<App />);

  const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(linkFavorite);
  const noFav = screen.getByText('No favorite pokemon found');
  expect(noFav).toBeInTheDocument();

  history.push('pokemons/25');
  const checkFav = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(checkFav);
  const starFav = screen.getByAltText('Pikachu is marked as favorite');
  expect(starFav).toBeInTheDocument();

  userEvent.click(linkFavorite);
  const namePokemon = screen.getByTestId('pokemon-name');
  expect(namePokemon).toBeInTheDocument();
});
