import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import HomePage from './pages/HomePage'
import ApiDetailsPage from './pages/ApiDetailsPage'

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api/:providerName/:serviceId" element={<ApiDetailsPage />} />
      </Routes>
    </Router>
  )
}

export default App
