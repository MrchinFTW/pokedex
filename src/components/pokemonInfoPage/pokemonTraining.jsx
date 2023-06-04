import React from 'react';
import infoCss from './pokemonInfo.module.css';

const PokeomnTraining = ({ pokemonFullInfoObj }) => {
	return (
		<div className={infoCss.pokeGeneralWrapper}>
			<h2> pokemon Training stats</h2>
			<table className={infoCss.pokeGeneralData}>
				<tr>
					<td>base Exp. </td>
					<th>{pokemonFullInfoObj.base_experience}</th>
				</tr>

				<tr>
					<td>base happiness</td>
					<th>{pokemonFullInfoObj.base_happiness}</th>
				</tr>

				<tr>
					<td>Capture rate:</td>
					<th>{pokemonFullInfoObj.capture_rate}</th>
				</tr>

				<tr>
					<td>Legendary pokemon: </td>
					{pokemonFullInfoObj.is_legendery ? <th>yes</th> : <th>no</th>}
				</tr>

				<tr>
					<td>Mythic pokemon: </td>
					{pokemonFullInfoObj.is_mythical ? <th>yes</th> : <th>no</th>}
				</tr>
			</table>
		</div>
	);
};

export default PokeomnTraining;
