import { useState } from 'react';
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout, cilMedicalCross } from '@coreui/icons';
import NewContact from '../NewContact';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Header = () => {
  const [visible, setVisible] = useState(false);

  const toggleAddNewVisible = () => {
    setVisible(false);
  };

  const signOutUserAuth = () => {
    localStorage.removeItem('user');
    signOutUser();
    window.location.reload(false);
  }

  return (
    <>
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink
              onClick={() => setVisible(true)}
              className="cursor"
            >
              New Contact{' '}
              <CIcon icon={cilMedicalCross} size="sm" />
            </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav>
            <CNavItem>
              <CNavLink>
                <CIcon icon={cilAccountLogout} size="lg" onClick={signOutUserAuth} className="cursor" />
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
      </CHeader>

      { visible && (
        <NewContact visible={visible} closeModal={toggleAddNewVisible}/>
      )}
    </>
  );
};

export default Header;
