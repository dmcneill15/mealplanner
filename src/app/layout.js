import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata = {
  title: "Plan to Plate",
  description: "IOD Capstone Project: Meal Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="content-background">
          <NavBar />
          <main className="content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
