import Header from "../components/layout/public/Header"
import Footer from "../components/layout/public/Footer"

import Home from "../pages/public/Home"
import About from "../pages/public/About"
import Members from "../pages/public/Members"
import Activities from "../pages/public/Activities"
import Contact from "../pages/public/Contact"

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      { children }
      <Footer />
    </>
  )
}
export const publicRoutes = [
  {
    path: "/",
    element: (
      <PublicLayout>
        <Home />
      </PublicLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <PublicLayout>
        <About />
      </PublicLayout>
    ),
  },
  {
    path: "/members",
    element: (
      <PublicLayout>
        <Members />
      </PublicLayout>
    ),
  },
  {
    path: "/activities",
    element: (
      <PublicLayout>
        <Activities />
      </PublicLayout>
    ),
  },
  {
    path: "/contact",
    element: (
      <PublicLayout>
        <Contact />
      </PublicLayout>
    ),
  },
]