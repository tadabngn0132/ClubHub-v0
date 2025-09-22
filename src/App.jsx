import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import Header from './components/layout/public/Header'
import Footer from './components/layout/public/Footer'
import ErrorBoundary from './components/layout/public/ErrorBoundary'
import Home from './pages/public/Home'
import About from './pages/public/About'
import Members from './pages/public/Members'
import Activities from './pages/public/Activities'
import Contact from './pages/public/Contact'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />

        <main className='flex flex-col items-center justify-center min-h-[46.5vw] pt-[6.5rem] pb-[6.5rem]'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/members" element={<Members />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={
              <ErrorBoundary />
            } />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
