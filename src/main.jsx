/*
 * LexCode: Oficial de Cumplimiento
 * Copyright (C) 2026 Equipo LexCode — UTEZ
 * (Ian Alejandro Rivera Torres, Valentino Amador Gonzáles Adames, Edgar Adrian Gonzalez Guadarrama,
 *  Joed Soriano Ocampo, Brittany Itzel Sánchez Mora)
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version. It is distributed WITHOUT ANY WARRANTY.
 * See the LICENSE file or <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';

// Tipografías instaladas localmente (SIL Open Font License 1.1). Sin CDN externos.
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/600.css';

import './styles/globals.css';
import { GameProvider } from './context/GameContext.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
);
