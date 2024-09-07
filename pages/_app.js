import '../styles/globals.css';
import { JetBrains_Mono, Poppins } from 'next/font/google';
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-primary',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-secondary',
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${jetBrainsMono.variable} ${poppins.variable}`}>
      <Component {...pageProps} />
    
    </main>
  );
}

export default MyApp;
