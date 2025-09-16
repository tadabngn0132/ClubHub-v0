import SignIn from './pages/auth/SignIn'
import Header from './components/layout/public/Header'
import Footer from './components/layout/public/Footer'

function App() {

  return (
    <>
      {/* <Header /> */}
      {/* <Footer /> */}
      <main className='flex items-center justify-center min-h-[46.5vw]'>
        <SignIn />
      </main>
    </>
  )
}

export default App
