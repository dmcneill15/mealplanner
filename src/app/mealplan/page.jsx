import Calendar from '@/components/Calendar';

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

export default async function Recipes() {
    return (
        <main>
            <section>
                <div className="title-container mb-4">
                    <h2 className={`${montega.className} title center`}>Your Meal Plan</h2>
                </div>
                <div>
                    <p className={`${faunaOne.className} mb-0 center`}>Add: Drag and Drop from the list on the right</p>
                    <p className={`${faunaOne.className} mb-0 center`}>Delete: Click a meal on the calendar</p>
                </div>
            </section><br></br>
            <Calendar />
        </main>
    )
}