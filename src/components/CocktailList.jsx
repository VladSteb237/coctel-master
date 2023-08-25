import React from 'react';
import CocktailCard from './CocktailCard';
import Wrapper from '../assets/wrappers/CocktailList';

const CocktailList = (props) => {
    const { drinks } = props;
    if (!drinks) {
        return (
            <h4 style={{ textAlign: "center" }}>No matching cocktails found...</h4>
        );
    };
    const formattedDrinks = drinks.map((drink) => {
        const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
        return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
        };
    });
    return (
        <Wrapper>
            {formattedDrinks.map((drink) => {
                return (
                    <CocktailCard key={drink.id}{...drink} />
                );
            })}
        </Wrapper>
    );
};

export default CocktailList;
