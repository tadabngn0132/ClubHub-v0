import PublicLayout from "../components/layout/public/PublicLayout.jsx"
import Home from "../pages/public/Home.jsx"
import About from "../pages/public/About.jsx"
import Members from "../pages/public/Members.jsx"
import Activities from "../pages/public/Activities.jsx"
import Contact from "../pages/public/Contact.jsx"
import AddMemberApplication from "../pages/public/AddMemberApplication.jsx"

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
  {
    path: "/apply-membership",
    element: (
      <PublicLayout>
        <AddMemberApplication />
      </PublicLayout>
    )
  }
]