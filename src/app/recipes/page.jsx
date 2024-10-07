import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import RecipeCard from '@/components/RecipeCard';
import { montega } from '@/lib/fonts';

export default async function Recipes() {
    const session = await getServerSession(options);
    // Log the session object to the console
    console.log("Session:", session);

    return (
        <main>
            <section>
                <div className="title-container mb-4">
                    <h2 className={`${montega.className} title center sub-head`}>Your Recipe Catalog</h2>
                </div>
            </section>
            <section>
                {session ? (
                    <RecipeCard user={session?.user}/>
                ) : (
                    <p>Please Login to access this page</p>
                )}
            </section>
        </main>
    )
}