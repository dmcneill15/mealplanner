import ProfileCard from '@/components/ProfileCard';
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
                {/*<h2 className={`${montega.className} title center`}>Welcome</h2>*/}
                </div>
            </section>
            {usersJSX}
        </main>
    )
}