import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

const pokemonContext = createContext();

export function PokemonContaxtProvider({ children }) {
	const [pokemon, setPokemon] = useState([]);
	const [pokemonNTU, setPokemonNTU] = useState([]);

	const [pokemonSearchingArr, setPokemonSearchingArr] = useState([]);

	return (
		<pokemonContext.Provider
			value={{
				pokemon,
				setPokemon,
				pokemonSearchingArr,
				setPokemonSearchingArr,
				pokemonNTU,
				setPokemonNTU,
			}}
		>
			{children}
		</pokemonContext.Provider>
	);
}

export function usePokemon() {
	const {
		pokemon,
		setPokemon,
		pokemonSearchingArr,
		setPokemonSearchingArr,
		pokemonNTU,
		setPokemonNTU,
	} = useContext(pokemonContext);

	useEffect(() => {
		fetch('pokeDexDB.json')
			.then((res) => res.json())
			.then((data) => {
				setPokemonNTU(data);
				setPokemon(data);
			});
		// fetchAllPokemon()
		// 	.then((pokemon) => {
		// 		return fetchPokemonData(pokemon);
		// 	})
		// 	.then((data) => {
		// 		setPokemonNTU(data);
		// 		return setPokemon(data);
		// 	})
		// 	.catch((err) => console.log('the error is' + err));
	}, []);

	const sortAndAdd = (pokemonObj, searchingArr) => {
		if (pokemonObj.type !== 'gen' || searchingArr.length < 1) {
			searchingArr.push(pokemonObj);
		} else {
			for (let i = 0; i < searchingArr.length; i++) {
				if (
					searchingArr[i].genIndex > pokemonObj.genIndex ||
					searchingArr[i].genIndex === undefined
				) {
					searchingArr.splice(i, 0, pokemonObj);
					break;
				} else if (i === searchingArr.length - 1) {
					searchingArr.push(pokemonObj);
					i++;
				}
			}
		}
		return searchingArr;
	};

	const deleteFromArr = (searchingArr, index) => {
		searchingArr.splice(index, 1);
		return searchingArr;
	};

	const searchPokemon = (pokemonObj, searchingArr) => {
		console.log('searching method running');

		let pokeTempFoundArr = [];
		let pokeRetArr = [];
		console.log(searchingArr);
		for (let i = 0; i < searchingArr.length; i++) {
			if (pokeRetArr.length > 0) {
				pokeTempFoundArr = pokeRetArr;
				pokeRetArr = [];
			}
			switch (searchingArr[i].type) {
				case 'gen':
					// adding pokemon to the list from the full list
					for (let a = 0; a < searchingArr[i].pokemonList.length; a++) {
						for (let b = 0; b < pokemonNTU.length; b++) {
							if (searchingArr[i].pokemonList[a].pokemon_species.name === pokemonNTU[b].name) {
								pokeTempFoundArr.push(pokemonNTU[b]);
								break;
							}
						}
					}
					break;
				case 'color':
					if (pokeTempFoundArr.length < 1) {
						for (let c = 0; c < searchingArr[i].pokemonList.length; c++) {
							for (let d = 0; d < pokemonNTU.length; d++) {
								if (searchingArr[i].pokemonList[c].name === pokemonNTU[d].name) {
									pokeRetArr.push(pokemonNTU[d]);
									break;
								}
							}
						}
					} else {
						for (let e = 0; e < searchingArr[i].pokemonList.length; e++) {
							for (let f = 0; f < pokeTempFoundArr.length; f++) {
								if (searchingArr[i].pokemonList[e].name === pokeTempFoundArr[f].name) {
									pokeRetArr.push(pokeTempFoundArr[f]);
									break;
								}
							}
						}
					}
					break;
				case 'type':
					if (pokeTempFoundArr.length < 1) {
						for (let g = 0; g < searchingArr[i].pokemonList.length; g++) {
							for (let h = 0; h < pokemonNTU.length; h++) {
								if (searchingArr[i].pokemonList[g].pokemon.name === pokemonNTU[h].name) {
									pokeRetArr.push(pokemonNTU[h]);
									break;
								}
							}
						}
					} else {
						for (let j = 0; j < searchingArr[i].pokemonList.length; j++) {
							for (let k = 0; k < pokeTempFoundArr.length; k++) {
								if (searchingArr[i].pokemonList[j].pokemon.name === pokeTempFoundArr[k].name) {
									pokeRetArr.push(pokeTempFoundArr[k]);
									break;
								}
							}
						}
					}
					break;
				default:
					console.warn(
						'default section in switch running... somehow,somwhere we get and obj not contain "type" key...!!'
					);
					break;
			}
		}
		console.log(pokeTempFoundArr);
		console.log(pokeRetArr);
		//TODO: check this set section...

		if (pokeTempFoundArr.length === 0 && pokeRetArr.length === 0) {
			setPokemon(pokemonNTU);
		} else if (pokeRetArr.length === 0 && pokeTempFoundArr !== 0) {
			pokeRetArr = pokeTempFoundArr;
			setPokemon(pokeRetArr);
		} else {
			setPokemon(pokeRetArr);
		}
	};

	const findPokemon = (pokemonObj) => {
		console.log('find pokemon running');
		const { type, typeName } = pokemonObj;
		if (type === 'gen') {
			//gen
			const exist = pokemonSearchingArr.findIndex(
				(obj) => obj.type === type && obj.typeName === typeName
			);
			console.log(exist);
			if (exist === -1) {
				const searchingArr = sortAndAdd(pokemonObj, pokemonSearchingArr);
				setPokemonSearchingArr(searchingArr);
				searchPokemon(pokemonObj, searchingArr);
			} else {
				console.log('delete from array');
				const newSearchingArr = deleteFromArr(pokemonSearchingArr, exist);
				setPokemonSearchingArr(newSearchingArr);
				searchPokemon(pokemonObj, newSearchingArr);
			}
		} else {
			//color and type.
			const exist = pokemonSearchingArr.find((obj) => obj.type === type);
			if (!exist) {
				const searchingArr = sortAndAdd(pokemonObj, pokemonSearchingArr);
				setPokemonSearchingArr(searchingArr);
				searchPokemon(pokemonObj, searchingArr);
			} else {
				const isSpesificTypeExist = pokemonSearchingArr.findIndex(
					(obj) => obj.typeName === typeName
				);
				console.log(isSpesificTypeExist);
				if (isSpesificTypeExist === -1) {
					const indexToRemove = pokemonSearchingArr.findIndex((obj) => obj.type === type);
					const newPokeSearch = [...pokemonSearchingArr];
					newPokeSearch.splice(indexToRemove, 1, pokemonObj);
					setPokemonSearchingArr(newPokeSearch);
					searchPokemon(pokemonObj, newPokeSearch);
				} else {
					console.log('delete from array');
					const newSearchingArr = deleteFromArr(pokemonSearchingArr, isSpesificTypeExist);
					setPokemonSearchingArr(newSearchingArr);
					searchPokemon(pokemonObj, newSearchingArr);
				}
			}
		}
	};
	return { pokemon, findPokemon };
}

async function massiveFetch(urls) {
	try {
		if (!urls) {
			return;
		}
		const arrayOfPromises = urls.map((url) =>
			fetch(url)
				.then((response) => response.json())
				.catch((err) => console.log('the error is' + err))
		);
		const dataArray = await Promise.all(arrayOfPromises);
		return dataArray;
	} catch (err) {
		console.log('error from massiveFetch' + err);
	}
}

function mergeArrays(arr1, arr2) {
	return arr1.reduce((acc, obj1) => {
		const obj2 = arr2.find((obj2) => obj2.id === obj1.id);
		if (obj2) {
			acc.push({ ...obj1, ...obj2 });
		}
		return acc;
	}, []);
}

export async function fetchAllPokemon() {
	const pokemonArr = [];
	try {
		// First request to get total number of Pokemon
		const response = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1');
		const data = await response.json();
		const totalPokemon = data.count;

		// Loop through all the pokemon species
		for (let i = 0; i < totalPokemon; i += 20) {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon-species?limit=20&offset=${i}`
			);
			const data = await response.json();

			// Add Pokemon to array
			data.results.forEach((pokemon) => {
				pokemonArr.push({ pokemon });
			});
		}
		return pokemonArr;
	} catch (err) {
		console.log('error from fetchAllPokemon' + err);
	}
}

export async function fetchPokemonData(allPokemons) {
	try {
		const pokemonSpeciesUrl = [];
		const pokemonUrl = [];

		allPokemons.map((pokemon) => {
			pokemonSpeciesUrl.push(pokemon.pokemon.url);
		});

		const allInfo = massiveFetch(pokemonSpeciesUrl).then((pokemonSpeciesArr) => {
			let mergedArray = allPokemons.reduce((acc, obj1) => {
				const obj2 = pokemonSpeciesArr.find((obj2) => obj2.name === obj1.pokemon.name);
				if (obj2) {
					acc.push({
						...obj1,
						...obj2,
					});
				}
				pokemonUrl.push(`https://pokeapi.co/api/v2/pokemon/${obj2.id}/`);
				return acc;
			}, []);
			const fullPokemonInfo = massiveFetch(pokemonUrl).then((pokemonInfo) => {
				return mergeArrays(pokemonInfo, pokemonSpeciesArr);
			});
			return fullPokemonInfo.then((data) => data);
		});
		return allInfo;
	} catch (err) {
		console.log('error from fetchPokemonData:' + err);
	}
}