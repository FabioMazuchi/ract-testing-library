import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// TODO
const DETAIL = 'More details';
const URL = 'pokemons/25';

describe('Teste o componente <PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: DETAIL });
    expect(linkDetails).toBeInTheDocument();

    history.push(URL);

    const nameDetail = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(nameDetail).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryText).toBeInTheDocument();
    const pA = 'This intelligent Pokémon roasts hard berries';
    const pB = 'with electricity to make them tender enough to eat.';
    const text = `${pA} ${pB}`;
    const resumoParagr = screen.getByText(text);
    expect(resumoParagr).toBeInTheDocument();
  });

  it('Existe na página a seção com mapas com as localizações do pokémon', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL);

    const locationText = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(locationText).toBeInTheDocument();
    const locationsImg = await screen.findAllByAltText(
      'Pikachu location',
      undefined,
      { timeout: 3000 },
    );
    locationsImg.forEach((locationImg) => {
      expect(locationImg).toBeInTheDocument();
      const location = locationImg.src;
      expect(locationImg).toBeInTheDocument();
      expect(locationImg).toHaveAttribute('src', location);
      expect(locationImg.alt).toBe('Pikachu location');
    });
    const emText1 = screen.getByText('Kanto Viridian Forest');
    expect(emText1).toBeInTheDocument();
    const emText2 = screen.getByText('Kanto Power Plant');
    expect(emText2).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');

    const checkFav = screen.getByLabelText('Pokémon favoritado?');
    expect(checkFav).toBeInTheDocument();
    userEvent.click(checkFav);
    const starFav = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFav).toBeInTheDocument();
    userEvent.click(checkFav);
    expect(starFav).not.toBeInTheDocument();
  });
});
