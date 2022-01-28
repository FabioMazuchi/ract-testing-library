import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const favPokemon = 'Favorite Pokémons';

    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', { name: favPokemon,
    });

    expect(linkHome).toHaveTextContent('Home');
    expect(linkAbout).toHaveTextContent('About');
    expect(linkFavorite).toHaveTextContent(favPokemon);
  });

  it('Teste se a aplicação é redirecionada para a página Home', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');
    const textAbout = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(textAbout).toBeInTheDocument();

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const textHome = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(textHome).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página About', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const textAbout = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(textAbout).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkFavorite);

    const textFavorite = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(textFavorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    console.log(history);

    history.push('/desconhecida');

    const textDesconhecida = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(textDesconhecida).toBeInTheDocument();
  });
});
