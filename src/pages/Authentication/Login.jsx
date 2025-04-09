import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin, resetLoginFlag } from "../../slices/thunks";

import logoLight from "../../assets/images/pentafon.png";
import { createSelector } from 'reselect';
//import images

const Login = (props) => {
    const dispatch = useDispatch();

    const selectLayoutState = (state) => state;
    const loginpageData = createSelector(
        selectLayoutState,
        (state) => ({
            user: state.Login.user,
            error: state.Login.error,
            loading: state.Login.loading,
            errorMsg: state.Login.errorMsg,
        })
    );
    // Inside your component
    const {
        user, error, loading, errorMsg
    } = useSelector(loginpageData);

    const [userLogin, setUserLogin] = useState([]);
    const [passwordShow, setPasswordShow] = useState(false);


    useEffect(() => {
        if (user && user) {
            /*const updatedUserData = import.meta.env.VITE_APP_DEFAULTAUTH === "firebase" ? user.multiFactor.user.NombreUsuario : user.user.NombreUsuario;
            const updatedUserPassword = import.meta.env.VITE_APP_DEFAULTAUTH === "firebase" ? "" : user.user.confirm_password;
            setUserLogin({
                NombreUsuario: updatedUserData,
                Contrasenia: updatedUserPassword
            });*/
        }
    }, [user]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            NombreUsuario: userLogin.NombreUsuario || "admin@pentafon.com" || '',
            Contrasenia: userLogin.Contrasenia || "Prueba1234*" || '',
        },
        validationSchema: Yup.object({
            NombreUsuario: Yup.string().required("Ingresa el Nombre de Usuario"),
            Contrasenia: Yup.string().required("Ingresa la Contrasenia"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, props.router.navigate));
        }
    });
    console.log(validation);

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}


    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, errorMsg]);

    document.title = "Iniciar sesión | Pentafon";
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
                                            <h5 className="text-primary">Bienvenido de nuevo</h5>
                                            <p className="text-muted">Inicie sesión para continuar.</p>
                                        </div>
                                        {error && error ? (<Alert color="danger"> {error} </Alert>) : null}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="NombreUsuario" className="form-label">Nombre de usuario</Label>
                                                    <Input
                                                        id="NombreUsuario"
                                                        name="NombreUsuario"
                                                        className="form-control"
                                                        placeholder="Introducir nombre de usuario"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.NombreUsuario || ""}
                                                        invalid={
                                                            validation.touched.NombreUsuario && validation.errors.NombreUsuario ? true : false
                                                        }
                                                    />
                                                    {validation.touched.NombreUsuario && validation.errors.NombreUsuario ? (
                                                        <FormFeedback type="invalid">{validation.errors.NombreUsuario}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">¿Has olvidado tu contraseña?</Link>
                                                    </div>
                                                    <Label className="form-label" htmlFor="password-input">Contraseña</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            id="Contrasenia-input"
                                                            name="Contrasenia"
                                                            value={validation.values.Contrasenia || ""}
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Introducir contraseña"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                validation.touched.Contrasenia && validation.errors.Contrasenia ? true : false
                                                            }
                                                        />
                                                        {validation.touched.Contrasenia && validation.errors.Contrasenia ? (
                                                            <FormFeedback type="invalid">{validation.errors.Contrasenia}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="Contrasenia-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">Acuérdate de mí</Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button color="secondary" disabled={error ? null : loading ? true : false} className="w-100" type="submit">
                                                        {loading ? <Spinner size="sm" className='me-2'> Cargando... </Spinner> : null}
                                                        Iniciar sesión
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);