import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const idPikachu = '/pokemon/25';
const linkMoreDetails = { name: 'More details' };

const clicaOitoVezes = (botaoProximoPokemon) => {
  for (let i = 0; i < 8; i += 1) {
    userEvent.click(botaoProximoPokemon);
  }
};

describe('Testes do componente <Pokedex.js />', () => {
  it('Verifica se a página contém o título "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    const tituloEncounteredPokemon = screen
      .getByRole('heading', { name: 'Encountered Pokémon' });
    expect(tituloEncounteredPokemon).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo Pokémon da lista quando '
    + 'o botão "Próximo Pokémon" é clicado', () => {
    renderWithRouter(<App />);

    const botaoProximoPokemon = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(botaoProximoPokemon).toBeInTheDocument();

    const linkDetalhesPokemon = screen.getByRole('link', linkMoreDetails);
    expect(linkDetalhesPokemon.href).toContain(idPikachu);

    userEvent.click(botaoProximoPokemon);

    expect(linkDetalhesPokemon.href).not.toContain(idPikachu);
    expect(linkDetalhesPokemon.href).toContain('/pokemon/4');
  });

  it(
    'Verifica se o primeiro Pokémon da lista é mostrado ao clicar '
    + 'no botão "Próximo Pokémon", se estiver no último Pokémon da lista',
    () => {
      renderWithRouter(<App />);

      const botaoProximoPokemon = screen.getByRole('button', { name: 'Próximo Pokémon' });
      expect(botaoProximoPokemon).toBeInTheDocument();

      const linkDetalhesPokemon = screen.getByRole('link', linkMoreDetails);

      clicaOitoVezes(botaoProximoPokemon);
      expect(linkDetalhesPokemon.href).toContain('/pokemon/148');

      userEvent.click(botaoProximoPokemon);

      expect(linkDetalhesPokemon.href).not.toContain('/pokemon/148');
      expect(linkDetalhesPokemon.href).toContain(idPikachu);
    },
  );

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const botoesFiltros = screen.getAllByTestId('pokemon-type-button');
    const botaoAll = screen.getByRole('button', { name: 'All' });

    expect(botaoAll).toBeInTheDocument();

    expect(botoesFiltros).toHaveLength(7);
    expect(botoesFiltros[0]).toHaveTextContent('Electric');
    expect(botoesFiltros[1]).toHaveTextContent('Fire');
    expect(botoesFiltros[2]).toHaveTextContent('Bug');
    expect(botoesFiltros[3]).toHaveTextContent('Poison');
    expect(botoesFiltros[4]).toHaveTextContent('Psychic');
    expect(botoesFiltros[5]).toHaveTextContent('Normal');
    expect(botoesFiltros[6]).toHaveTextContent('Dragon');

    const linkDetalhesPokemon = screen.getByRole('link', linkMoreDetails);
    expect(linkDetalhesPokemon.href).toContain(idPikachu);

    userEvent.click(botoesFiltros[1]);

    expect(linkDetalhesPokemon.href).not.toContain(idPikachu);
    expect(linkDetalhesPokemon.href).toContain('/pokemon/4');

    userEvent.click(botaoAll);

    expect(linkDetalhesPokemon.href).toContain(idPikachu);
  });
});
