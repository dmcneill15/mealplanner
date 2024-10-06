'use client'
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { ebGaramond, fontCinzel, faunaOne, montega } from '@/lib/fonts';

export default function Home() {
  return (
    <main>
      <section>
        <div className="title-container">
          <h2 className={`${montega.className} sub-head center`}> Welcome to your personal meal planner!</h2>
          <p className={`${faunaOne.className} text-center mt-4 intro-paragraph`}>
            Create and organize all in one place <br></br>
          </p>
          <p className={`${faunaOne.className} text-center mt-4 intro-paragraph`}>
            New recipe ideas? Save them here.<br></br>
            Stuck for a meal? Look back for inspiration.<br></br>
          </p>
        </div>
      </section>
      <section>
        <div>
          <h2 className={`${fontCinzel.className} sub-head center mt-5`}>Let's get planning</h2>
          <div className="center">
          <Link href="/register" passHref style={{ textDecoration: 'none' }}>
            <Button className={`${faunaOne.className} center me-3 button-link intro-paragraph`} variant="dark">Sign Up</Button>
            </Link>
            <Link href="/login" passHref style={{ textDecoration: 'none' }}>
              <Button className={`${faunaOne.className} center button-link intro-paragraph`} variant="dark">Login</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
