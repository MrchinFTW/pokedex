import Layout from './components/Layout';
import appCss from './App.module.css';
import PokemonWrapper from './components/pokemonBox/PokemonWrapper';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokemonInfo from './components/pokemonInfoPage/pokemonInfo';
import ErrorPage from './components/ErrorPage';

function App() {
	return (
		<div className={appCss.app}>
			<Layout />

			<Routes>
				<Route path='/' element={<PokemonWrapper />} />
				<Route path='/pokemon/:id' element={<PokemonInfo />} />

				{/* <Route path='*' element={<ErrorPage />} /> TODO: add error page when pokemon not found*/}
				{/* <Route path='/type/:id' element={<PokemonInfo />} /> TODO:add a type info page. */}
			</Routes>
		</div>
	);
}

export default App;
