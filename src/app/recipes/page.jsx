import RecipeCard from '@/components/RecipeCard';
import { ebGaramond, fontCinzel, faunaOne, montega } from '@/lib/fonts';

export default async function Recipes() {
    return (
        <main>
            <section>
                <div className="title-container mb-4">
                    <h2 className={`${montega.className} title center sub-head`}>Your Recipe Catalog</h2>
                </div>
            </section>
            <RecipeCard />
        </main>
    )
}