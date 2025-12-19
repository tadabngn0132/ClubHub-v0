import Header from "./Header"
import Footer from "./Footer"

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      { children }
      <Footer />
    </>
  )
}

export default PublicLayout