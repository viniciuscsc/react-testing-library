import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <Pokemon.js />', () => {
  it('Verifica se é renderizado um card com as informações do Pokémon:', () => {
    renderWithRouter(<App />);

    const nomePokemon = screen.getByTestId('pokemon-name');
    const tipoPokemon = screen.getByTestId('pokemon-type');
    const pesoMedioPokemon = screen.getByTestId('pokemon-weight');
    const imgPokemon = screen.getByAltText('Pikachu sprite');

    expect(nomePokemon).toHaveTextContent('Pikachu');
    expect(tipoPokemon).toHaveTextContent('Electric');
    expect(pesoMedioPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(imgPokemon).toHaveAttribute('src');
    expect(imgPokemon.src)
      .toContain('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Verifica se o card do Pokémon contém um link de navegação '
    + 'para exibir detalhes deste.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

    expect(linkMoreDetails.href).toContain('/pokemon/25');
  });

  it('Verifica se ao clicar no link de navegação do Pokémon, é '
    + 'feito o redirecionamento para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const tituloDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    const tituloSummary = screen.getByRole('heading', { name: 'Summary' });
    const tituloLocations = screen
      .getByRole('heading', { name: 'Game Locations of Pikachu' });

    expect(tituloDetails).toBeInTheDocument();
    expect(tituloSummary).toBeInTheDocument();
    expect(tituloLocations).toBeInTheDocument();
  });

  it('Verifica se a URL exibida no navegador muda para /pokemon/<id>, '
    + 'onde <id> é o id do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const { pathname } = history.location;

    expect(pathname).toContain('/pokemon/25');
  });

  it('Verifica se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const checkboxFavoritado = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkboxFavoritado);

    const imgEstrela = screen.getByAltText('Pikachu is marked as favorite');

    expect(imgEstrela).toHaveAttribute('src');
    expect(imgEstrela.src).toContain('/star-icon.svg');
  });
});
