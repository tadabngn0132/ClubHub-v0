import SignIn from './pages/auth/SignIn'
import Header from './components/layout/public/Header'
import Footer from './components/layout/public/Footer'
import ErrorBoundary from './components/layout/public/ErrorBoundary'

function App() {

  return (
    <>
      <Header />
      <main className='flex flex-col items-center justify-center min-h-[46.5vw] pt-[4.5rem]'>
        <SignIn />
        {/* <ErrorBoundary /> */}
      </main>
      <Footer />
    </>
  )
}

export default App
