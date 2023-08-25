import React from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import SearchForm from '../components/SearchForm';
import CocktailList from '../components/CocktailList';
import { QueryClient, useQuery } from '@tanstack/react-query';

const cocktailSearchUrl =
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCoctailsQuery = (searchTerm) => {
    return {
        queryKey: ['search', searchTerm || 'all'],
        queryFn: async () => {
            const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
            return response.data.drinks;
        }
    }
};

export const loader = (queryClient) => async ({ request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get('search') || '';
    //const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
    //console.log(response);
    //return { drinks: response.data.drinks, searchTerm };

    await queryClient.ensureQueryData(searchCoctailsQuery(searchTerm));
    return { searchTerm };
};

const Landing = () => {
    //const { drinks, searchTerm } = useLoaderData();
    const { searchTerm } = useLoaderData();
    //console.log(drinks);
    const { data: drinks } = useQuery(searchCoctailsQuery(searchTerm));

    return (
        <div>
            <SearchForm searchTerm={searchTerm} />
            <CocktailList drinks={drinks} />
        </div>
    );
};

export default Landing;
