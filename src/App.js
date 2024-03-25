// import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/home';
import PenggunaRoute from './routes/penggunaRoute';
import AppLayout from './layouts';
import productRoute from './routes/productRoute';
import categoryProductRoute from './routes/categoryProductRoute';
import unitBusinessRoute from './routes/unitBusinessRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route to='/' element={<AppLayout/>}>
            <Route index element={<Home/>}/>
            {/* <Route path="/pengguna/*" element={<PenggunaRoute/>}/> */}
            {unitBusinessRoute}
            {PenggunaRoute}
            {categoryProductRoute}
            {productRoute}
          </Route>
          {/* // <Route  path='/coba' element={<Nav/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
