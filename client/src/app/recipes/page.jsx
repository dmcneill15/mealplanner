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


export default function Recipes() {
    const recipesData = [
       {
            recipe_id: 1,
            recipe_title: 'Spag Bol',
            method: 'Chop onions, carrots and celery. Fry until soft. Add the remaining ingredients and cook until rich and delicious. Cook pasta according to packet instructions. Serve with fresh basil and grated cheese.',
            servings: 4,
            //image: '#',
        },
        {
            recipe_id: 2,
            recipe_title: 'Pizza',
            method: 'The best pizza recipe here',
            servings: 4,
            //image: '#',
        },
        {
            recipe_id: 3,
            recipe_title: 'Roast chicken',
            method: 'Best recipe for roast chicken here',
            servings: 4,
            image: '#',
        }
    ]

    let recipesJSX;
    try{
        console.log(JSON.stringify(recipesData));
        recipesJSX = <RecipeCard recipes={recipesData}></RecipeCard>
    }
    catch(error){
        recipesJSX = <span>Unable to Fetch Recipes</span>
    }

    return (
        <main>
            <section>
                <div className="title-container">
                <h2 className={`${montega.className} title center`}>Your Recipe Catalog</h2>
                </div>
            </section>
            {recipesJSX}
        </main>
    )
}