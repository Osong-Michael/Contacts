import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Authentication from './Pages/Authentication';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage/>} />
          <Route path='login' element={<Authentication />} />
          <Route path='*' element={<HomePage/>} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
