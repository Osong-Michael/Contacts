import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CForm, CRow, CFormLabel, CCol, CFormInput, CButton } from '@coreui/react';
import { signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

const SignInForm = () => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const handleFormSubmit = async data => {
        const userCredentials = await signInUserWithEmailAndPassword(data)
        if(userCredentials) {
            const { user } = userCredentials;
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload(false);
        }
        reset()
    };

    const navigate = useNavigate();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            navigate('/', { replace: true });
        };
    }, []);

    return (
        <div className="sign-in-form">
            <h3 className="text-center mb-4">Sign In</h3>
            <CForm onSubmit={handleSubmit(handleFormSubmit)}>
                <CRow className="mb-3">
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label" >Email</CFormLabel>
                    <CCol sm={10} >
                    <CFormInput type="email" id="inputEmail3" {...register("email")} required />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</CFormLabel>
                    <CCol sm={10} >
                    <CFormInput type="password" id="inputPassword3" {...register("password")} required />
                    </CCol>
                </CRow>
                <div className="d-flex justify-content-center">
                    <CButton type="submit">Sign in</CButton>
                </div>
            </CForm>
        </div>
    );
};

export default SignInForm;