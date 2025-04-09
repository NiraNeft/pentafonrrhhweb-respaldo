import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// action
import { registerUser, apiError, resetRegisterFlag } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images 
import logoLight from "../../assets/images/pentafon.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

// Registro
import RegisterInput from './RegisterInput';

//
import NewModalCaptura  from "../RRHH/CandidateList/ListView/Modals/NewModalCaptura";

const Register = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            Correo: '',
            Telefono: '',
            Nombre: '',
            ApellidoPaterno: '',
            ApellidoMaterno: '',

            /*password: '',
            confirm_password: ''*/
        },
        validationSchema: Yup.object({
            Nombre: Yup.string().required("Por favor, introduzca su nombre"),
            Correo: Yup.string().required("Por favor ingrese su correo electrónico"),
            Telefono: Yup.string().required("Por favor, introduzca su teléfono"),
            ApellidoPaterno: Yup.string().required("Por favor, introduzca su apellido paterno"),
            ApellidoMaterno: Yup.string(),

            /*password: Yup.string().required("Please enter your password"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords do not match")
                .required("Please confirm your password"),*/
        }),
        onSubmit: (values) => {
            values.Telefono = "" + values.Telefono;
            dispatch(registerUser(values));
        }
    });


    const selectLayoutState = (state) => state.Account;
    const registerdatatype = createSelector(
        selectLayoutState,
        (account) => ({
            success: account.success,
            error: account.error,
            registrationError: account.registrationError,
        })
    );
    // Inside your component
    const {
        error, success, registrationError
    } = useSelector(registerdatatype);

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            //setTimeout(() => history("/register-success"), 3000);
            dispatch(resetRegisterFlag());
            history("/register-success");
        }

        /*setTimeout(() => {
            dispatch(resetRegisterFlag());
        }, 3000);*/

    }, [dispatch, success, error, registrationError, history]);

    document.title = "Registro | Pentafon";
    if(error)
        console.log("[Register View] registrationError: ", registrationError )
    

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="100" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium"></p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">

                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Registro de Aspirante</h5>
                                            <p className="text-muted">Revisa e ingresa los datos correspondientes</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <div className="needs-validation">
                                                {success && success ? (
                                                    <>
                                                        {toast("Your Redirect To Login Page...", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                                        <ToastContainer autoClose={2000} limit={1} />
                                                        <Alert color="success">
                                                            {success.estatus}
                                                        </Alert>
                                                    </>
                                                ) : null}

                                                {error && error ? (
                                                    <Alert color="danger">
                                                        {registrationError && registrationError.title ? registrationError.title : (
                                                            <div>El correo electrónico ya se registró anteriormente, utilice otro de correo electrónico... </div>
                                                        )}</Alert>
                                                ) : null}

                                                <NewModalCaptura
                                                    verAlertasCandidato={false}/>

                                                {/*<RegisterInput
                                                    id="Correo"
                                                    label="Correo electrónico"
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="Introducir email"
                                                    validation={validation}
                                                    registrationError={registrationError}
                                                    />

                                                <RegisterInput
                                                    id="Telefono"
                                                    label="Teléfono"
                                                    type="number"
                                                    autoComplete="tel"
                                                    placeholder="Introducir teléfono"
                                                    validation={validation}
                                                    registrationError={registrationError}
                                                    />

                                                <RegisterInput
                                                    id="Nombre"
                                                    label="Nombre"
                                                    type="text"
                                                    autoComplete="given-name"
                                                    placeholder="Introducir nombre"
                                                    validation={validation}
                                                    registrationError={registrationError}
                                                    />

                                                <RegisterInput
                                                    id="ApellidoPaterno"
                                                    label="Apellido Paterno"
                                                    type="text"
                                                    autoComplete="family-name"
                                                    placeholder="Introducir Apellido Paterno"
                                                    validation={validation}
                                                    registrationError={registrationError}
                                                    />

                                                <RegisterInput
                                                    id="ApellidoMaterno"
                                                    label="Apellido Materno"
                                                    type="text"
                                                    autoComplete="additional-name"
                                                    placeholder="Introducir Apellido Materno"
                                                    listen={validation}
                                                    />*/}

                                                <div className="mb-4">
                                                    <p className="mb-0 fs-12 text-muted fst-italic">Al registrarse acepta la Pentafon.
                                                        <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium"> Condiciones de uso </Link></p>
                                                </div>

                                                <div className="mt-4">
                                                    <button className="btn btn-secondary w-100" type="submit">Inscribirse</button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <div className="signin-other-title">
                                                        <h5 className="fs-13 mb-4 title text-muted">Crear cuenta con</h5>
                                                    </div>

                                                    <div>
                                                        <button type="button" className="btn btn-primary btn-icon waves-effect waves-light"><i className="ri-facebook-fill fs-16"></i></button>{" "}
                                                        <button type="button" className="btn btn-danger btn-icon waves-effect waves-light"><i className="ri-google-fill fs-16"></i></button>{" "}
                                                        <button type="button" className="btn btn-info btn-icon waves-effect waves-light"><i className="ri-twitter-fill fs-16"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">¿Ya tienes una cuenta? <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Iniciar sesión </Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default Register;
