'use client'
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { ebGaramond, fontCinzel, faunaOne, montega } from '@/lib/fonts';

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
          <h2 className={`${fontCinzel.className} slogan center mt-5`}>Let's get planning</h2>
          <div className="center">
            <Button className={`${faunaOne.className} center me-3`} style={{ textDecoration: 'none' }} variant="outline-dark">Sign Up</Button>
            <Link href="/login" passHref style={{ textDecoration: 'none' }}>
              <Button className={`${faunaOne.className} center`} style={{ textDecoration: 'none' }} variant="outline-dark">Login</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
