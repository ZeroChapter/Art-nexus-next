import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/main/MainPage';
import { ProductPage } from './pages/productPage/ProductPage';
import { Footer } from './widgets/footer/Footer';
import { HeaderComponent } from './widgets/header/HeaderComponent';
import './App.css';
import { AppContextProvider } from './shared/AppContextProvider';
import { About } from './pages/informationPages/About';
import { Return } from './pages/informationPages/Return';
import { Delivery } from './pages/informationPages/Delivery';
import { Payment } from './pages/informationPages/Payment'
import { HeaderMobile } from './widgets/headerMobile/HeaderMobile';
import { DevelopmentPage } from './pages/developmentPage/DevelopmentPage';

function App() {
  return (
    <BrowserRouter>
    <AppContextProvider initialBasket={[]}>
      <div className='headers-container'>
        <HeaderComponent />
        <HeaderMobile />
      </div>
      <div className='app-content-wrapper'>
        <main className='content-container'>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path='/about' element={<About/>}/>
            <Route path='/return' element={<Return/>}/>
            <Route path='/delivery' element={<Delivery/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
      {/* <DevelopmentPage /> */}
    </AppContextProvider>
    </BrowserRouter>
  )
}


export default App
