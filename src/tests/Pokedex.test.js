import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const VALUE = 7;

describe('Teste do componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se página contém um heading h2 escrito Encountered pokémons.', () => {
    const textPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(textPokedex).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista ao clicar no botão.', async () => {
    const btnAll = await screen.findByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const pikachu = await screen.findByAltText('Pikachu sprite');
    expect(pikachu).toBeInTheDocument();
    const btn = await screen.findByRole('button', { name: 'Próximo pokémon' });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    const charmander = await screen.findByAltText('Charmander sprite');
    expect(charmander).toBeInTheDocument();
    const allNamePokemons = await screen.findAllByTestId('pokemon-name');
    expect(allNamePokemons).toHaveLength(1);
    const allbtnFilter = await screen.findAllByTestId('pokemon-type-button');
    expect(allbtnFilter).toHaveLength(VALUE);
  });
});
