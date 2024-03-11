import { useEffect, useState } from 'react'
import { Route, BrowserRouter} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import './index.css'
import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'
import ProductList from './components/ProductList/ProductList'
import Footer from './components/Footer/Footer'
import ListProdDetail from './components/ListProdDetail/ListProdDetail'

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
      setSearchTerm(term);
  };

  return (
    <BrowserRouter>
        <Route exact path="/">
          <div className="app">
            <Header onSearch={handleSearch}/>
              <div className="contaniner flex">
                <Aside />
                <ProductList searchTerm={searchTerm}/>
              </div>
            <Footer/>
          </div>
        </Route>

        <Route path="/:id">
          <div className="app">
            <ListProdDetail/>
          </div>
        </Route>
    </BrowserRouter>
  )
}

export default App
