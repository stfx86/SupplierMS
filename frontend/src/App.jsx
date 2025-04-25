
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>


      <Layout>

        <Routes>
          <Route path="/" element={<h2>jjdjd</h2>} />
          <Route />
          <Route />


        </Routes>
      </Layout>
    </Router>


  )

}

export default App;

