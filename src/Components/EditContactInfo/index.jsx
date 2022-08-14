import { useEffect } from 'react';
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
import { updateContactInfo } from '../../utils/firebase/firebase.utils';

const EditContactInfo = ({ visible, closeModal, contact}) => {
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        let defaultValues = {};
        defaultValues.firstName = contact.data.firstName;
        defaultValues.lastName = contact.data.lastName;
        defaultValues.email = contact.data.email;
        defaultValues.address = contact.data.address;
        defaultValues.phoneNumber = contact.data.phoneNumber;
        reset({ ...defaultValues});
    }, []);

    const handleUpdateContactInfo = async data => {
        try {
            await updateContactInfo(contact.id, data);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <CModal visible={visible} size="lg" alignment="center">
                <CModalHeader closeButton={false}>
                    <CModalTitle>Edit Contact Info</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3" onSubmit={handleSubmit(handleUpdateContactInfo)}>
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
                    <CButton color="primary" onClick={handleSubmit(handleUpdateContactInfo)}>Update Contact</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default EditContactInfo;