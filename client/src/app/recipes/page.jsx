import RecipeCard from '@/components/RecipeCard';
//import recipesData from '@/data/recipes.js'

// Import  font
import { EB_Garamond, Cinzel, Fauna_One, Montaga } from 'next/font/google';

const fontCinzel = Cinzel({
    weight: ['600'],
    style: ['normal'],
    subsets: ['latin'],
});

const faunaOne = Fauna_One({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});

const ebGaramond = EB_Garamond({
    weight: ['400'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

const montega = Montaga({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});

async function getRecipes() {
    const baseURL = "http://localhost:3000";
    try {
        const response = await fetch(`${baseURL}/api/recipes`, { 'cache': 'no-cache' });
        const recipesArray = await response.json();
        return recipesArray;
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        return [];
    }
}




export default async function Recipes() {
    const recipesArray = await getRecipes(); // Fetch data on the server
    const baseURL = "http://localhost:3000"; // Define the base URL

    return (
        <main>
            <section>
                <div className="title-container">
                    <h2 className={`${montega.className} title center`}>Your Recipe Catalog</h2>
                </div>
            </section>
            {/*{recipesJSX}*/}
            <RecipeCard recipes={recipesArray} baseURL={baseURL} />
        </main>
    )
}