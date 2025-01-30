import '@/assets/styles/globals.css'

export const metadata = {
  title: 'Property',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property '
}

function MainLayout({ children }: any) {
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

export default MainLayout;