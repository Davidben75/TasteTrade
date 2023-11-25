import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom'

const Category = () => {
    const [category, setCategory] = useState();

    const displayIcons = (name) => {
        let display;
        switch (name){
            case 'entrée' :
                display =`${process.env.REACT_APP_API}/img/icons/appetizer.png`
                break;
            case 'plat' :
                display = `${process.env.REACT_APP_API}/img/icons/salad.png`
                break;
            case 'dessert' :
                display = `${process.env.REACT_APP_API}/img/icons/slice_cake.png`
                break
            default :
                return display
        };
        return display
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/category`)
        .then((res) => {
            setCategory(res.data)
            console.log(res.data)
        });
        
    }, []);

    return (
        <>
            <nav className='nav_category'>
            {category && (
                category.map((one, i) => 
                <NavLink to={`/${one.name}/${one._id}`} key={i}>
                    <figure>
                        <img src={displayIcons(one.name)} alt="Elephant at sunset" />
                        <figcaption>{one.name}</figcaption>
                    </figure>
                </NavLink>    
                )
                
                )}
            </nav>
                
        </>
    );
};

export default Category;