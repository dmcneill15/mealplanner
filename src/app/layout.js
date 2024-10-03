import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { ebGaramond, fontCinzel, faunaOne, montega } from '@/lib/fonts';

export const metadata = {
  title: "Plan to Plate",
  description: "IOD Capstone Project: Meal Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
