import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente About', () => {
  it('Verifica se a página contém o título "About Pokédex"', () => {
    renderWithRouter(<About />);

    const tituloAbout = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(tituloAbout).toBeInTheDocument();
  });

  it('Verifica se a página tem dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragrafoUm = screen.getByText(
      'This application simulates a Pokédex, a '
        + 'digital encyclopedia containing all Pokémon',
    );
    const paragrafoDois = screen.getByText(
      'One can filter Pokémon by type, '
      + 'and see more details for each one of them',
    );

    expect(paragrafoUm).toBeInTheDocument();
    expect(paragrafoDois).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imagemPokedex = screen.getByAltText('Pokédex');

    expect(imagemPokedex).toHaveAttribute('src');
    expect(imagemPokedex.src).toContain(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
      + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
