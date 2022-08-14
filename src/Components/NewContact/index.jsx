import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CCol,
    CForm,
    CFormInput,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { addToContactList } from '../../utils/firebase/firebase.utils';

const NewContact = ({ visible, closeModal}) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
        }
    });

    const handleCreateNewConatact = async data => {
        try {
            await addToContactList(data);
            reset();
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <CModal visible={visible} size="lg" alignment="center">
                <CModalHeader closeButton={false}>
                    <CModalTitle>Add New Contact</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3" onSubmit={handleSubmit(handleCreateNewConatact)}>
                        <CCol md={6}>
                            <CFormInput type="text" label="First Name" placeholder="John" {...register("firstName")} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" label="Last Name" placeholder="Doe" {...register("lastName")} />
                        </CCol>
                        <CCol xs={12}>
                            <CFormInput id="inputAddress" label="Address" placeholder="1234 Main St" {...register("address")} />
                        </CCol>
                        <CCol xs={6}>
                            <CFormInput type="email" label="Email" placeholder="johndoe@example.com" {...register("email")} />
                        </CCol>
                        <CCol xs={6}>
                            <CFormInput type="text" label="Phone Number" placeholder="+1239984765" {...register("phoneNumber")} />
                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={closeModal}>
                    Close
                    </CButton>
                    <CButton color="primary" onClick={handleSubmit(handleCreateNewConatact)}>Add New Contact</CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default NewContact;