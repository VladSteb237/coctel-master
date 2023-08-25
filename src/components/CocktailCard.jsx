import React from 'react';
import Wrapper from '../assets/wrappers/CocktailCard';
import { Link, useOutletContext } from 'react-router-dom';

const CocktailCard = (props) => {
    const { id, name, image, info, glass } = props;
    // const data = useOutletContext();
    // console.log(data);
    return (
        <Wrapper>
            <div className='img-container'>
                <img src={image} alt={name} className='img' />
            </div>
            <div className='footer'>
                <h4>{name}</h4>
                <h5>{glass}</h5>
                <p>{info}</p>
                <Link to={`/cocktail/${id}`} className='btn'>
                    details
                </Link>
            </div>
        </Wrapper>
    );
};

export default CocktailCard;
