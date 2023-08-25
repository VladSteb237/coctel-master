import React from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <Wrapper>
            <nav>
                <div className='nav-center'>
                    <span className='logo'>Mix Master</span>
                    <div className='nav-links'>
                        <NavLink to='/' className='nav-link'>
                            Home
                        </NavLink>
                        <NavLink to='/about' className='nav-link'>
                            About
                        </NavLink>
                        <NavLink to='/newsletter' className='nav-link'>
                            Newsletter
                        </NavLink>
                    </div>
                </div>
            </nav>
        </Wrapper>

    );
};

export default Navbar;
