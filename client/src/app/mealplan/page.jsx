'use client' // client component, not server rendered
import Calendar from '@/components/Calendar';
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

export default function MealPlan() {
    return (
        <main>
            <section>
                <div className="title-container">
                    <h2 className={`${montega.className} title center`}>Your Meal Plan</h2><br></br>
                </div>
            </section>
                <Calendar />
        </main>
    )
}