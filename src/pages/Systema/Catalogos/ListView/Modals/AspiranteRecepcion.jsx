import React, { useState, useEffect } from 'react';
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import { useSearchParams } from "react-router-dom";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// action
import { registerUser, apiError, resetRegisterFlag } from "../../../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images 
import logoLight from "../../../../../assets/images/pentafon.png";
import ParticlesAuth from "../../../../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

//
import NewModalCaptura  from "../../../../RRHH/CandidateList/ListView/Modals/NewModalCaptura";

const AspiranteRecepcion = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
        
    const [searchParams, setSearchParams] = useSearchParams();
    const [InteractionId , setInteractionId ] = useState();
    const [CompanyId , setCompanyId ] = useState();
    const [ProjectId , setProjectId ] = useState();
    const [WorkgroupId , setWorkgroupId ] = useState();
    const [AgentId , setAgentId ] = useState();
    const [Username , setUsername ] = useState();
    const [Ani , setAni ] = useState();
    const [Dnis , setDnis ] = useState();

           

    useEffect(() => {
        setInteractionId(searchParams.get("INTERACTIONID"));
        setCompanyId(searchParams.get("COMPANYID"));
        setProjectId(searchParams.get("PROJECTID"));
        setWorkgroupId(searchParams.get("WORKGROUPID"));
        setAgentId(searchParams.get("AGENTID"));
        setUsername(searchParams.get("USERNAME"));
        setAni(searchParams.get("ANI"));
        setDnis(searchParams.get("DNIS"));
    }, [searchParams]);

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
        console.log("[AspiranteRecepcion View] registrationError: ", registrationError )

    return (
        <React.Fragment>
            <div className="mt-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={12} lg={12} xl={12}>
                            <Card className="mt-4">

                                <CardBody className="p-4">
                                    <div className="text-center mt-2">
                                        <img src={logoLight} alt="" height="100" />
                                        <h5 className="mb-1">
                                            ¡Buenos días!, veo que estas interesado en formar parte de nuestro equipo de trabajo.
                                        </h5>
                                        <p className="text-muted mb-4">
                                            Mi nombre es (Nombre Usuario). Me puedes proporcionar tu nombre completo y número celular por favor.
                                        </p>
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
                                                verAlertasCandidato={true}/>

                                            <div className="mt-4">
                                                <button className="btn btn-success w-20" type="submit">Guardar</button>
                                            </div>
                                        </div>
                                        <p className='text-center'>
                                            InteractionId <strong>{InteractionId} </strong>
                                            / CompanyId <strong>{CompanyId} </strong>
                                            / ProjectId <strong>{ProjectId} </strong>
                                            / WorkgroupId <strong>{WorkgroupId} </strong>
                                            / AgentId <strong>{AgentId} </strong>
                                            / Username <strong>{Username} </strong>
                                            / Ani <strong>{Ani} </strong>
                                            / Dnis <strong>{Dnis} </strong>
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default AspiranteRecepcion;
