import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <NotFound.js />', () => {
  it('Verifica se a página contém um título "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('pagina-inexistente');
    });
    const tituloNotFound = screen
      .getByRole('heading', { name: 'Page requested not found' });
    expect(tituloNotFound).toBeInTheDocument();
  });

  it('Verifica se a página contém uma imagem específica', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('pagina-inexistente');
    });
    const imgNotFound = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imgNotFound).toHaveAttribute('src');
    expect(imgNotFound.src)
      .toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
