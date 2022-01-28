import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(linkHome).toHaveTextContent('Home');
    expect(linkAbout).toHaveTextContent('About');
    expect(linkFavorite).toHaveTextContent('Favorite Pokémons');
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
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
});
