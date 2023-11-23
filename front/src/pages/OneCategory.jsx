import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';

const OneCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/category/${id}`)
        .then((res) => {
            setCategory(res.data);
            console.log(res.data)
        });
    },[id]);

    return (
        <>
            {category && (
                <article 
                className='page-header'
                style={{ backgroundImage : `url(${process.env.REACT_APP_API}/img/categories/${category.image})` }}>
                <h2>{category.name}s</h2>
            </article>  
        )}

        <CategoryCard/>
        </>
        
    );
};

export default OneCategory;