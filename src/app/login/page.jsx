import LoginForm from '@/components/LoginForm';
import { ebGaramond, fontCinzel, faunaOne, montega } from '@/lib/fonts';

export default async function Recipes() {
    return (
        <main>
            <section>
                <div className="title-container mb-4">
                    <h2 className={`${montega.className} title center`}>Login to get Planning</h2>
                </div>
            </section>
            <LoginForm />
        </main>
    )
}