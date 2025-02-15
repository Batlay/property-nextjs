import '@/assets/styles/globals.css'
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Property',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property '
}

function MainLayout({ children }: any) {
  return (
    <AuthProvider>
      <html>
        <body>
          <main>
            <Navbar />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}

export default MainLayout;