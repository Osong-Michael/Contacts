import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../../Components/Header';
import ContactList from '../../Components/ContactList';


const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, []);  

  return (
      <div>
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <Header />
          <div className="body flex-grow-1 px-3">
            <ContactList />
          </div>
        </div>
      </div>
    );
};

export default HomePage;