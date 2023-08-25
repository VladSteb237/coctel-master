import React from 'react';
import axios from 'axios';
import Error from './Error';
import { Link, Navigate, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailPage';
import { useQuery } from '@tanstack/react-query';

const singleCocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
    return {
        queryKey: ['cocktail', id],
        queryFn: async () => {
            const { data } = await axios.get(`${singleCocktailUrl}${id}`);
            return data;
        }
    }
};

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    //const { data } = await axios.get(`${singleCocktailUrl}${id}`);

    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
};

const Cocktail = () => {
    const { id } = useLoaderData();

    //if (!data) return <h2>something went wrong...</h2>;
    const { data } = useQuery(singleCocktailQuery(id));

    if (!data) return <Navigate to='/' />;

    const singleDrink = data.drinks[0];
    //console.log(singleDrink);

    const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
    } = singleDrink;

    const validIngredients = Object.keys(singleDrink)
        .filter((item) => item.startsWith('strIngredient') && singleDrink[item] !== null)
        .map((item) => singleDrink[item]);
    //console.log(validIngredients);

    return (
        <Wrapper>
            <header>
                <Link to='/' className='btn'>
                    back home
                </Link>
                <h3>{name}</h3>
            </header>
            <div className='drink'>
                <img src={image} alt={name} className='img' />
                <div className='drink-info'>
                    <p>
                        <span className='drink-data'>name :</span> {name}
                    </p>
                    <p>
                        <span className='drink-data'>category :</span> {category}
                    </p>
                    <p>
                        <span className='drink-data'>info :</span> {info}
                    </p>
                    <p>
                        <span className='drink-data'>glass :</span> {glass}
                    </p>
                    <p>
                        <span className='drink-data'>ingredients :</span>
                        {
                            validIngredients.map((item, index) => {
                                return (
                                    <span key={item} className='ing'>
                                        {item}{index < validIngredients.length - 1 ? ',' : ''}
                                    </span>
                                );
                            })
                        }
                    </p>
                    <p>
                        <span className='drink-data'>instructons :</span> {instructions}
                    </p>
                </div>
            </div>
        </Wrapper>
    );
};

export default Cocktail;
