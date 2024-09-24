'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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


export default function Home() {
  return (
    <main>
      <section>
        <div className="title-container">
          <h2 className={`${montega.className} title center`}> Welcome to your personal meal planner!</h2>
          <p className={`${faunaOne.className} text-center mt-4`}>
            This is a space for you to get creative. <br></br>
            A space to design your own menus. <br></br>
          </p>
          <p className={`${faunaOne.className} text-center mt-4`}>
            New recipe ideas? Save them here.<br></br>
            Stuck for a meal? Look back for inspiration.<br></br>
          </p>
        </div>
      </section>
      <section>
        <div>
          <h2 className={`${fontCinzel.className} title center mt-5` }>Let's get planning</h2>
          <div className="center">
            <a className={`${faunaOne.className} title center custom-btn btn btn-outline-dark me-2`} href="#" role="button">Sign Up</a>
            <a className={`${faunaOne.className} title center custom-btn btn btn-outline-dark`} href="#" role="button">Login</a>
          </div>
        </div>
      </section>
    </main>
  );
}
