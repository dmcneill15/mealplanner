import Calendar from '@/components/Calendar';
import { ebGaramond, fontCinzel, faunaOne, montega } from '@/lib/fonts';

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