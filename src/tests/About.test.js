import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const titleAbout = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(titleAbout).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p1A = 'This application simulates a Pokédex, a digital';
    const p1B = 'encyclopedia containing all Pokémons';
    const textP1 = `${p1A} ${p1B}`;

    const resP1 = screen.getByText(textP1);
    expect(resP1).toBeInTheDocument();
    const textP2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(textP2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"', () => {
    renderWithRouter(<About />);

    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imgSrc = screen.getByRole('img', { name: 'Pokédex' });
    expect(imgSrc.src).toBe(src);
  });
});
