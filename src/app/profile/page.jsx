import ProfileCard from '@/components/ProfileCard';
import { ebGaramond, fontCinzel, faunaOne, montega } from '@/lib/fonts';

export default function Profiles() {
    const userData = [
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
    )
}