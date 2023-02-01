import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonsFavoritos = { name: 'Favorite Pokémon' };

describe('Testes do componente App', () => {
  it('Verifica se os links "Home", "About" e "Favorite Pokémon" são renderizados', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavoritePokemon = screen.getByRole('link', pokemonsFavoritos);

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemon).toBeInTheDocument();
  });

  it('Ao clicar no link "Home", o usuário é direcionado para a página inicial', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const tituloHome = screen.getByRole('heading', { name: 'Encountered Pokémon' });

    expect(tituloHome).toBeInTheDocument();
  });

  it('Ao clicar no link "About", o usuário é direcionado para a página de About', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const tituloAbout = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(tituloAbout).toBeInTheDocument();
  });

  it('Ao clicar no link "Favorite Pokémon", o usuário é direcionado para a página Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const linkFavoritePokemon = screen.getByRole('link', pokemonsFavoritos);
    userEvent.click(linkFavoritePokemon);

    const tituloFavoritePokemon = screen.getByRole('heading', pokemonsFavoritos);

    expect(tituloFavoritePokemon).toBeInTheDocument();
  });

  it('Ao entrar em uma URL desconhecida, o usuário é direcionado para a página Not Found,', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina-inexistente');
    });

    const tituloNotFound = screen.getByRole('heading', { name: 'Page requested not found' });

    expect(tituloNotFound).toBeInTheDocument();
  });
});
