import {setRequestLocale} from 'next-intl/server';
import Features from "@/components/Features/Features";
import OrderForm from "@/components/Contact/OrderForm";
import Navbar from "@/components/Navigation/Navbar";
import ThreeBackground from "@/components/Theme/ThreeBackground";

export default async function Home({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main>
      <ThreeBackground />
      <Navbar />
      <Features />
      <OrderForm />
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-white/40 text-sm">
        <p>© {new Date().getFullYear()} Hushkordik. All rights reserved.</p>
      </footer>
    </main>
  );
}
