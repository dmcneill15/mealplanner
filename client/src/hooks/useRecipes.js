// hooks/useRecipes.js
import { useState, useEffect } from 'react';
import { fetchRecipes } from '@/app/api/recipesApi'; // Adjust the import path as needed

export const useRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getRecipes();
    }, []);

    return { 
        recipes, 
        loading, 
        error 
    };
};
