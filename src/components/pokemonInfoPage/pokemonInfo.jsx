import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from '../../Hooks/usePokemon';
import infoCss from './pokemonInfo.module.css';
import colorCss from '../pokemonBox/Pokemon.module.css';
import PokemonData from './pokemonData';
import PokeomnTraining from './pokemonTraining';
import PokeomnBaseStats from './pokemonBaseStats';

const PokemonInfo = ({ pk }) => {
	const { pokemon, loading, error } = usePokemon();
	const { id } = useParams();
	const pokemonFullInfoObj = pokemon.find((pk) => pk.name === id);
	console.log(pokemonFullInfoObj);

	if (loading) {
		return <div>loading pokemon page</div>;
	}

	return (
		<>
			<div className={infoCss.centerClass}>
				<div className={infoCss.nameDiv}>{pokemonFullInfoObj.name}</div>
			</div>
			<section className={infoCss.firstInfoSection}>
				<div className={infoCss.imgDivWrapper}>
					<img
						className={infoCss.imgDiv}
						src={pokemonFullInfoObj.sprites.other['official-artwork']['front_default']}
						alt={pokemonFullInfoObj.sprites.front_default}
					/>
				</div>
				<PokemonData pokemonFullInfoObj={pokemonFullInfoObj} />
				<PokeomnTraining pokemonFullInfoObj={pokemonFullInfoObj} />
				<PokeomnBaseStats pokemonFullInfoObj={pokemonFullInfoObj} />
			</section>
		</>
	);
};

export default PokemonInfo;
