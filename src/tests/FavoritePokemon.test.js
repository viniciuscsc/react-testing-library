import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <FavoritePokemon.js />', () => {
  it(
    'Verifica se é exibida a mensagem "No favorite pokemon found", '
    + 'caso a pessoa não tenha Pokémon favoritos',
    () => {
      renderWithRouter(<FavoritePokemon />);

      const fraseFavoritePokemon = screen.getByText('No favorite Pokémon found');

      expect(fraseFavoritePokemon).toBeInTheDocument();
    },
  );

  it('Verifica se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const linkMaisDetalhes = screen.getByText('More details');
    userEvent.click(linkMaisDetalhes);

    const checkboxPokemonFavorito = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkboxPokemonFavorito);

    const linkPkemonsFavoritos = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkPkemonsFavoritos);

    const nomePokemon = screen.getByTestId('pokemon-name');

    expect(nomePokemon).toBeInTheDocument();
  });
});
