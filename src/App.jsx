import SignIn from './pages/auth/SignIn'
import Header from './components/layout/public/Header'
import Footer from './components/layout/public/Footer'
import ErrorBoundary from './components/layout/public/ErrorBoundary'

function App() {

  return (
    <>
      <Header />
      <main className='flex items-center justify-center min-h-[46.5vw]'>
        {/* <SignIn /> */}
        <ErrorBoundary />
      </main>
      <Footer />
    </>
  )
}

export default App
