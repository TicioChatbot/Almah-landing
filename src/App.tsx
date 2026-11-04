import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import DetailedFooter from './components/DetailedFooter'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PricingPage from './pages/PricingPage'
import CoursesPage from './pages/CoursesPage'
import CreateCoursePage from './pages/CreateCoursePage'
import HubPage from './pages/HubPage'
import FintechPage from './pages/FintechPage'
import './index.css'

// Soporte para enlaces heredados con hash (ej. /#/hub -> /hub)
if (typeof window !== 'undefined') {
  if (window.location.hash.startsWith('#/')) {
    const routeFromHash = window.location.hash.slice(1)
    window.history.replaceState(null, '', routeFromHash + window.location.search)
  }

  // Si el usuario regresa desde la pasarela bancaria PSE (Wompi agrega ?id=... en la URL)
  // y la pasarela lo redirigió a la raíz, redirigimos automáticamente a /precios
  const searchParams = new URLSearchParams(window.location.search)
  const hasWompiTxId = searchParams.has('id')
  const hasCheckoutSession = Boolean(sessionStorage.getItem('almah_checkout_session'))
  if (hasWompiTxId && hasCheckoutSession && (window.location.pathname === '/' || window.location.pathname === '')) {
    window.history.replaceState(null, '', '/precios' + window.location.search)
  }
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/crea-tu-curso" element={<CreateCoursePage />} />
          <Route path="/sobre-nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/precios" element={<PricingPage />} />
          <Route path="/hub" element={<HubPage />} />
          <Route path="/fintech" element={<FintechPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <DetailedFooter />
      </div>
    </Router>
  )
}

export default App
