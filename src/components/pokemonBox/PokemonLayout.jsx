import css from './Pokemon.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
const PokemonLayout = ({ pk, clear }) => {
	return (
		<div className={css.pokeCell}>
			<div># {pk.id}</div>
			<Link
				to={`/pokemon/${pk.name}`}
				onClick={() => {
					clear();
				}}
				className={css.pokeCellLink}
			>
				<img src={pk.sprites.front_default} alt='' />
				<div>{pk.name}</div>
				<div className={css.pokeTypesWrapper}>
					{pk.types.map((type, index) => {
						let typeClass = `${css.pokeType} ${css[type.type.name]}`;
						return (
							<div key={index} className={typeClass}>
								{type.type.name}
							</div>
						); //className={setColor(type.type.name)}
					})}
				</div>
			</Link>
		</div>
	);
};

export default PokemonLayout;
