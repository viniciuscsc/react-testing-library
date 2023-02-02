import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente FavoritePokemon', () => {
  it(
    'Verifica se é exibida a mensagem "No favorite pokemon found", '
    + 'caso a pessoa não tenha Pokémon favoritos',
    () => {
      renderWithRouter(<FavoritePokemon />);

      const tituloFavoritePokemon = screen.getByText('No favorite Pokémon found');

      expect(tituloFavoritePokemon).toBeInTheDocument();
    },
  );

  it('Verifica se apenas são exibidos os Pokémon favoritados', () => {
    
  });
});
