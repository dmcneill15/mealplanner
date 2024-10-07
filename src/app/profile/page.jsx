import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import ProfileCard from '@/components/ProfileCard';

export default async function Profile() {
    /*const userData = [
       {
            user_id: 1,
            user_name: 'userNameTest1',
            email: 'user@name.com',
            password: 'password',
            profile_picture: '#',
        },
    ]

    let usersJSX;
    try{
        const user = userData[0];
        usersJSX = <ProfileCard user={user}></ProfileCard>
    }
    catch(error){
        usersJSX = <span>Unable to Fetch User</span>
    }

    return (
        <main>
            <section>
                <div className="title-container">
                </div>
            </section>
            {usersJSX}
        </main>
    )*/

    const session = await getServerSession(options);
    // Log the session object to the console
    console.log("Session:", session);

    return (
        <main>
            <section>
                {session ? (
                    <ProfileCard user={session?.user} />
                ) : (
                    <p>Please Login</p>
                )}
            </section>
        </main>
    )
}