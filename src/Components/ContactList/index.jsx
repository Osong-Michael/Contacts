import { useEffect, useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilTrash } from '@coreui/icons';
import { getAllContacts, deleteContact } from '../../utils/firebase/firebase.utils';
import EditContactInfo from '../EditContactInfo';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContactsFromDB = () => getAllContacts(setContacts);

    getContactsFromDB();
  }, []);

  const contactHeader = list => {
    if (list.length === 1) {
      return '1 Contact';
    }

    return `${list.length} Contacts`
  };

  const DeletePopUp = ({ visible, closeModal, contactId }) => {
    const deleteContactFromDB = () => {
      deleteContact(contactId);
      closeModal();
    };
    console.log('ID: ', contactId);
    return (
        <CModal visible={visible} alignment='center'>
          <CModalBody>Are you sure you want to delete this contact?</CModalBody>
          <CModalFooter>
            <CButton color="light" onClick={closeModal}>Cancel</CButton>
            <CButton color="danger" onClick={deleteContactFromDB}>Delete</CButton>
          </CModalFooter>
        </CModal>
    );
  };

  const TableBody = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [id, setId] = useState('');
    const [editContact, setEditContact] = useState({});
    const closeEditForm = () => setOpenEdit(false);
    const closeDeleteForm = () => setOpenDelete(false);
    return (
      <>
        <CTableBody>
          {contacts && contacts.map(contact => (
            <CTableRow v-for="item in tableItems" key={contact.id}>
              <CTableDataCell>
                <div>{contact.data.firstName}{' '}{contact.data.lastName}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{contact.data.address}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{contact.data.email}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{contact.data.phoneNumber}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="d-flex justify-content-between">
                  <CIcon
                    className="cursor"
                    icon={cilPen}
                    onClick={() => {
                      setEditContact(contact);
                      setOpenEdit(true);
                    }} 
                  />
                  
                  <CIcon
                    icon={cilTrash}
                    style={{ color: 'red' }}
                    className="cursor"
                    onClick={() => {
                      setOpenDelete(true);
                      setId(contact.id);
                    }}
                  />
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
        {openEdit && (
          <EditContactInfo visible={openEdit} closeModal={closeEditForm} contact={editContact} />
        )}
        { openDelete && (
          <DeletePopUp visible={openDelete} closeModal={closeDeleteForm} contactId={id} />
        )}
      </>
    );
  };

  return (
    <div className="mt-5 contact-list-container">
      <h2 className="text-center p-4">{contactHeader(contacts)}</h2>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone Number</CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <TableBody />
      </CTable>
    </div>
  );
};

export default ContactList;
