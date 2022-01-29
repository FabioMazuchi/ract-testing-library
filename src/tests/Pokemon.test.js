import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const DETAIL = 'More details';

describe('Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');
    const pesoPokemon = screen.getByTestId('pokemon-weight');
    expect(pesoPokemon).toHaveTextContent('Average weight: 6.0 kg');
    const imgPokemon = screen.getByAltText('Pikachu sprite');
    expect(imgPokemon.src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(imgPokemon).toBeInTheDocument();
  });

  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: DETAIL });
    expect(linkDetails).toBeInTheDocument();
  });

  it('Teste se ao clicar no link de navegação, é feito o redirecionamento.', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: DETAIL });
    userEvent.click(linkDetails);
    const summarytext = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summarytext).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(labelFavorite);
    const imgStar = screen.getByAltText('Pikachu is marked as favorite');
    const src = imgStar.src.split('/')[3];
    expect(`/${src}`).toBe('/star-icon.svg');
  });
});
