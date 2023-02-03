import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const linkDetalhes = { name: 'More details' };

describe('Testes do componente <PokemonDetails.js />', () => {
  it('Verifica se as informações detalhadas do Pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', linkDetalhes);
    userEvent.click(linkMoreDetails);

    const tituloDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    const tituloSummary = screen.getByRole('heading', { name: 'Summary' });
    const paragrafoSummary = screen.getByText('This intelligent Pokémon '
      + 'roasts hard berries with electricity to make them tender enough to eat.');

    expect(tituloDetails).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();
    expect(tituloSummary).toBeInTheDocument();
    expect(paragrafoSummary).toBeInTheDocument();
  });

  it('Verifica se existe uma seção com os mapas das localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', linkDetalhes);
    userEvent.click(linkMoreDetails);

    const tituloLocations = screen
      .getByRole('heading', { name: 'Game Locations of Pikachu' });
    const imgsLocation = screen.getAllByAltText('Pikachu location');
    const nomeLocation1 = screen.getByText('Kanto Viridian Forest');
    const nomeLocation2 = screen.getByText('Kanto Power Plant');

    expect(tituloLocations).toBeInTheDocument();
    expect(imgsLocation[0]).toBeInTheDocument();
    expect(nomeLocation1).toBeInTheDocument();
    expect(imgsLocation[1]).toBeInTheDocument();
    expect(nomeLocation2).toBeInTheDocument();
    expect(imgsLocation[0]).toHaveAttribute('src');
    expect(imgsLocation[0].src).toContain('https://archives.bulbagarden.net'
      + '/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgsLocation[1]).toHaveAttribute('src');
    expect(imgsLocation[1].src).toContain('https://archives.bulbagarden.net'
      + '/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Verifica se é possível favoritar um Pokémon através desta página', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', linkDetalhes);
    userEvent.click(linkMoreDetails);

    const checkboxFavoritado = screen.getByLabelText('Pokémon favoritado?');

    expect(checkboxFavoritado).toBeInTheDocument();

    userEvent.click(checkboxFavoritado);
    expect(checkboxFavoritado).toBeChecked();

    userEvent.click(checkboxFavoritado);
    expect(checkboxFavoritado).not.toBeChecked();
  });
});
