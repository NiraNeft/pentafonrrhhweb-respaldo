import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { 
    Modal, ModalBody, Form, Input, Label, Button, Alert,
    TabPane, Row, Col, Card, TabContent
} from "reactstrap";
import Select from "react-select";
import { toast } from 'react-toastify';

// action
import { postAddAspirante, resetCreateFlag } from "../../../../../slices/thunks";
import {
    LabelInput,
    TextInput,
    TextBtnInput,
    SelectInput,
    BinarioInput,
    EditorInput,
    RangeDateInput,
    FileInput
  } from "../../../../../Components/Common/InputsValidation";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from "reselect";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Imagenes
import MultiUser from "../../../../../assets/images/users/multi-user.jpg";

const NewModalCaptura = ({ verAlertasCandidato, onCreateClick, onCloseClick }) => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const [imgAspirante, setImgAspirante] = useState(MultiUser);

    // Busqueda de Aspirante
    const [activeTab, setactiveTab] = useState(0);
    const [passedSteps, setPassedSteps] = useState([0]);
    const [mensajeBusqueda, setMensajeBusqueda] = useState("");

    // Borrar
  const [selectedCountry, setselectedCountry] = useState(null);
  const [selectedState, setselectedState] = useState(null);

  function handleSelectCountry(selectedCountry) {
    setselectedCountry(selectedCountry);
  }

  function handleSelectState(selectedState) {
    setselectedState(selectedState);
  }

  const productState = [
    {
      options: [
        { label: "Select State...", value: "Select State" },
        { label: "Alabama", value: "Alabama" },
        { label: "Alaska", value: "Alaska" },
        { label: "American Samoa", value: "American Samoa" },
        { label: "California", value: "California" },
        { label: "Colorado", value: "Colorado" },
        { label: "District Of Columbia", value: "District Of Columbia" },
        { label: "Florida", value: "Florida" },
        { label: "Georgia", value: "Georgia" },
        { label: "Guam", value: "Guam" },
        { label: "Hawaii", value: "Hawaii" },
        { label: "Idaho", value: "Idaho" },
        { label: "Kansas", value: "Kansas" },
        { label: "Louisiana", value: "Louisiana" },
        { label: "Montana", value: "Montana" },
        { label: "Nevada", value: "Nevada" },
        { label: "New Jersey", value: "New Jersey" },
        { label: "New Mexico", value: "New Mexico" },
        { label: "New York", value: "New York" },
      ],
    },
  ];

  const productCountry = [
    {
      options: [
        { label: "Select Country...", value: "Select Country" },
        { label: "United States", value: "United States" },
      ],
    },
  ];

    const fileInputImgChange = (event) => {
        const files = event.target.files;
        console.log( "[DEBUG] fileInputChange", files);
        if (event.target.files && event.target.files[0]) {
            setImgAspirante(URL.createObjectURL(event.target.files[0]));
        } else {
            setImgAspirante(MultiUser);
        }
    }

    function toggleTab(tab) {
      if (activeTab !== tab) {
        var modifiedSteps = [...passedSteps, tab];
  
        if (tab >= 1 && tab <= 2) {
          setactiveTab(tab);
          setPassedSteps(modifiedSteps);
        }
      }
    }

    // Creacion de Aspirante
    const [userAspirante, setUserAspirante] = useState([]);
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            Nombre: userAspirante.Nombre || "Nombre" || '',
            Correo: userAspirante.Correo || "a@c.com" || '',
            Telefono: userAspirante.Telefono || "5510203040" || '',
            ApellidoPaterno: userAspirante.ApellidoPaterno || "ApellidoPaterno" || '',
            ApellidoMaterno: userAspirante.ApellidoMaterno || "ApellidoMaterno" || '',
            Sourcing: userAspirante.ApellidoMaterno || "Sourcing" || '',
            userId: userAspirante.userId || "1" || '',
            NivelEstudios: userAspirante.NivelEstudios || "" || '',
        },
        validationSchema: Yup.object({
            Nombre: Yup.string().required("Por favor, introduzca su nombre"),
            Correo: Yup.string().required("Por favor ingrese su correo electrónico"),
            Telefono: Yup.string().required("Por favor, introduzca su teléfono"),
            ApellidoPaterno: Yup.string().required("Por favor, introduzca su apellido paterno"),
            ApellidoMaterno: Yup.string(),
            Sourcing: Yup.string().required("Por favor, introduzca el Sourcing"),
            NivelEstudios: Yup.string().required("Por favor ingrese su NivelEstudios"),
        }),
        onSubmit: (values) => {
            values.Telefono = "" + values.Telefono;
            let dataIn = {
              params : {
                userId: values.userId,
              },
              data: values
            };
            dispatch(postAddAspirante(dataIn));
        }
    });

    // Buscar
    const searhEmail = (data) => {
        let mensaje = (data == "" ? "" : "No se encontro informacion");
        setMensajeBusqueda(mensaje);
        console.log(data);
    }

    // Register
    const registerdatatype = createSelector(
        (state) => state.Aspirantes,
        (Aspirantes) => ({
            Aspirantes: Aspirantes.Aspirante,
            success: Aspirantes.success,
            error: Aspirantes.error,
        })
    );
    
    // Inside your component
    const {
        error, success
    } = useSelector(registerdatatype);

    useEffect(() => {
        if (success) {
            toast.success("Aspirante Added Successfully", { autoClose: 3000 });
            dispatch(resetCreateFlag());
            onCreateClick();
        }
    }, [dispatch, success, error, history]);

    const closeToggle = () => {
        dispatch(resetCreateFlag());
        onCloseClick();
    }
    
    return (
        <React.Fragment>
            <Form 
                onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}
                action="#" autoComplete="off" className="tablelist-form">

                {error && error ? (
                    <Alert color="danger">
                        {error && error.status ? error.status : (
                            <div>Error de conexion... </div>
                        )}</Alert>
                ) : null}

                <Row className="g-0">
                    <Col lg={12} sm={12}>
                        <p className="mb-0">
                            ¿Has trabajado anteriormente en Pentafon?
                        </p>
                    </Col>
                    <Col lg={6} sm={6}>
                        <div onClick={() => { toggleTab(1); }}>
                            <div className="form-check card-radio">
                                <Input
                                id="paymentMethod01"
                                name="paymentMethod"
                                type="radio"
                                className="form-check-input"
                                />
                                <Label
                                className="form-check-label"
                                htmlFor="paymentMethod01"
                                >
                                <span className="fs-16 text-muted me-2">
                                    <i className="ri-team-line align-bottom"></i>
                                </span>
                                <span className="fs-14 text-wrap">
                                    Sí
                                </span>
                                </Label>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} sm={6}>
                        <div onClick={() => { toggleTab(2); }}>
                            <div className="form-check card-radio">
                                <Input
                                id="paymentMethod02"
                                name="paymentMethod"
                                type="radio"
                                className="form-check-input"
                                />
                                <Label
                                className="form-check-label"
                                htmlFor="paymentMethod02"
                                >
                                <span className="fs-16 text-muted me-2">
                                    <i className="ri-pencil-line align-bottom"></i>
                                </span>
                                <span className="fs-14 text-wrap">
                                    No
                                </span>
                                </Label>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div
                    className="collapse show"
                    id="paymentmethodCollapse"
                    >
                    <TabContent activeTab={activeTab}>
                        {/* Inicio de Extrabajador */}
                        <TabPane tabId={1} id="pills-bill-info">
                            <Card className="p-2 border shadow-none mb-0 mt-2">
                                { (verAlertasCandidato ?
                                    <TextBtnInput
                                        id="busquedaEmpleado"
                                        label="Búsqueda de Empleado"
                                        type="email"
                                        autoComplete="numero_empleado"
                                        placeholder="Nombre Empleado.."
                                        validation={validation}
                                        registrationError={error}
                                        onClickSearch={searhEmail}
                                        />
                                    : <TextInput
                                        id="busquedaEmpleado"
                                        label="Búsqueda de Empleado"
                                        type="email"
                                        autoComplete="numero_empleado"
                                        placeholder="Nombre Empleado.."
                                        validation={validation}
                                        registrationError={error}
                                        onClickSearch={searhEmail}
                                        />) }
                                {mensajeBusqueda && mensajeBusqueda != "" ? (
                                    <Alert color="danger">{mensajeBusqueda}</Alert>
                                ) : null}
                                
                                {/* ( verAlertasCandidato ?  <NewModalDatosBasicos
                                    error={error}
                                    validation={validation}
                                    verAlertasCandidato={verAlertasCandidato}
                                    productState={productState}
                                    /> : null ) */}

                                {/* ( verAlertasCandidato ? <NewModalDatosComplemento
                                    validation={validation}
                                    verAlertasCandidato={verAlertasCandidato}
                                    productState={productState}
                                    /> : null ) */}
                            </Card>
                        </TabPane>
                        {/* Fin de Extrabajador */}

                        {/* Inicio de Nuevo Aspirante */}
                        <TabPane tabId={2} id="pills-bill-info">
                            { ( verAlertasCandidato ?  <Card className="p-2 border shadow-none mb-0 mt-2">
                                <TextBtnInput
                                    id="busquedaAspirante"
                                    label="Búsqueda de Aspirantes"
                                    type="number"
                                    autoComplete="numero_empleado"
                                    placeholder="Id de Candidato.."
                                    validation={validation}
                                    registrationError={error}
                                    onClickSearch={searhEmail}
                                    />
                                {mensajeBusqueda && mensajeBusqueda != "" ? (
                                    <Alert color="danger">{mensajeBusqueda}</Alert>
                                ) : null}
                                
                                <NewModalDatosBasicos
                                    error={error}
                                    validation={validation}
                                    verAlertasCandidato={verAlertasCandidato}
                                    productState={productState}
                                    />
                            </Card> : null ) }

                            { ( verAlertasCandidato ? <NewModalDatosComplemento
                                validation={validation}
                                verAlertasCandidato={verAlertasCandidato}
                                productState={productState}
                                /> : null ) }
                        </TabPane>
                        {/* Fin de Nuevo Aspirante */}
                    </TabContent>
                        
                    { ( verAlertasCandidato ? null : <Card className="p-2 border shadow-none mb-0 mt-2">
                        <NewModalDatosBasicos
                        error={error}
                        validation={validation}
                        verAlertasCandidato={verAlertasCandidato}
                        productState={productState}
                        /></Card> ) }

                    { ( verAlertasCandidato ? null : <NewModalDatosComplemento
                        validation={validation}
                        verAlertasCandidato={verAlertasCandidato}
                        productState={productState}
                        /> ) }
                </div>
            </Form>
        </React.Fragment>
    );
};


const NewModalExTrabajador = ({  }) => {
    return (
        <React.Fragment>

        </React.Fragment>
    );
};

const NewModalDatosBasicos = ({ validation, error, verAlertasCandidato, productState }) => {
    return (
        <React.Fragment>
            <TextInput
                id="Nombre"
                label="Nombre"
                type="text"
                autoComplete="given-name"
                placeholder="Introducir nombre"
                validation={validation}
                registrationError={error}
                />

            <TextInput
                id="ApellidoPaterno"
                label="Apellido Paterno"
                type="text"
                autoComplete="family-name"
                placeholder="Introducir Apellido Paterno"
                validation={validation}
                registrationError={error}
                />

            <TextInput
                id="ApellidoMaterno"
                label="Apellido Materno"
                type="text"
                autoComplete="additional-name"
                placeholder="Introducir Apellido Materno"
                listen={validation}
                />

            <TextInput
                id="Telefono"
                label="Teléfono"
                type="number"
                autoComplete="tel"
                placeholder="Introducir teléfono"
                validation={validation}
                registrationError={error}
                />

            <TextInput
                id="Correo"
                label="Correo"
                type="email"
                autoComplete="tel"
                placeholder="Introducir Correo"
                validation={validation}
                registrationError={error}
                />
        </React.Fragment>
    );
};

const NewModalDatosComplemento = ({ validation, verAlertasCandidato, productState }) => {
    return (
        <React.Fragment>
            <Card className="p-2 border shadow-none mb-0 mt-4">
                <TextInput
                    id="FechaNacimiento"
                    label="Fecha de Nacimiento"
                    type="date"
                    listen={validation}
                    />
                {( verAlertasCandidato ? <>
                    <small className="text-danger">
                        EDAD 0 AÑOS NO VIABLE
                    </small>
                    <small className="text-success">
                        EDAD 55 AÑOS VIABLE
                    </small>
                </> : null )}
                
                <SelectInput
                    id="NivelEstudios"
                    label="¿Qué nivel de estudios comprobable tienes?"
                    listen={validation}
                    options={productState}
                    verAlertasExtras={verAlertasCandidato}
                    />
                
                <SelectInput
                    id="TiempoTrayecto"
                    label="Menciona cuál es el tiempo de trayecto de tu casa, escuela y/o trabajo a Pentafon (Mariano Escobedo 220,Miguel Hidalgo). Estamos cerca del Metro RÍo San Joaquin"
                    listen={validation}
                    options={productState}
                    verAlertasExtras={verAlertasCandidato}
                    />

                <TextInput
                    id="EspectativaEconomica"
                    label="¿Cuáles son tus expectativas ecónomicas? (Sólo colocar el número,sin puntos, signos o comas)"
                    type="number"
                    listen={validation}
                    />
                
                <SelectInput
                    id="TiempoTrayecto"
                    label="Menciona cuál es el tiempo de trayecto de tu casa, escuela y/o trabajo a Pentafon (Mariano Escobedo 220,Miguel Hidalgo). Estamos cerca del Metro RÍo San Joaquin"
                    listen={validation}
                    options={productState}
                    verAlertasExtras={verAlertasCandidato}
                    />
                
                <BinarioInput
                    id="Experiencia"
                    label="¿Tienes experiencia laboral?"
                    listen={validation}
                    options={productState}/>

                <p>Comparteme tu fecha de ingreso del último empleo y la fecha en que saliste</p>

                <Row className="gy-0">
                    <Col md={12}>
                        <Label htmlFor="" className="form-label">Trabajo 1 (*)</Label>
                    </Col>
                    <Col md={verAlertasCandidato ? 10 : 12}>
                        <div className="input-group">
                            <Input type="date" className="form-control" />
                            <button className="btn btn-primary" type="button">A</button>
                            <Input type="date" className="form-control" />
                        </div>
                    </Col>
                    { ( verAlertasCandidato ? <Col md={2}>
                        <small className="text-success">VIABLE</small>
                    </Col> : null ) }
                </Row>
                <Row className="gy-0 mt-2 mb-3">
                    <Col md={12}>
                        <Label htmlFor="" className="form-label">Trabajo 2 (opcional)</Label>
                    </Col>
                    <Col md={verAlertasCandidato ? 10 : 12}>
                        <div className="input-group">
                            <Input type="date" className="form-control" />
                            <button className="btn btn-primary" type="button">A</button>
                            <Input type="date" className="form-control" />
                        </div>
                    </Col>
                    { ( verAlertasCandidato ? <Col md={2}>
                        <small className="text-danger">NO VIABLE</small>
                    </Col> : null ) }
                </Row>
                
                <SelectInput
                    id="FuenteContacto"
                    label="Fuente por la cual se entero de la vacante"
                    listen={validation}
                    options={productState}
                    verAlertasExtras={verAlertasCandidato}/>
                
                { ( verAlertasCandidato ? <SelectInput
                    id="QuienContacta"
                    label="¿Quien te contactó?"
                    listen={validation}
                    options={productState}
                    verAlertasExtras={verAlertasCandidato}/>
                    : <TextInput
                        id="QuienContacta"
                        label="¿Quien te contactó?"
                        type="number"
                        listen={validation}
                        />) }
                
                { ( verAlertasCandidato ? <><BinarioInput
                    id="EsExterno"
                    label="¿El aspirante será Externo?"
                    listen={validation}
                    options={productState}/>
                
                    <SelectInput
                        id="CampaniaExterna"
                        label="Campaña Externa"
                        listen={validation}
                        options={productState}
                        verAlertasExtras={verAlertasCandidato}/>
                
                    <SelectInput
                        id="TurnoExterno"
                        label="Turno"
                        listen={validation}
                        options={productState}
                        verAlertasExtras={verAlertasCandidato}/>
                
                    <SelectInput
                        id="Seleccionador"
                        label="Seleccionador"
                        listen={validation}
                        options={productState}
                        verAlertasExtras={verAlertasCandidato}/>
                </> : null ) }
                
                <BinarioInput
                    id="IsBilingue"
                    label={ verAlertasCandidato ? "¿El aspirante es Bilingüe?" : "¿Eres Bilingüe?" }
                    listen={validation}
                    options={productState}/>
            </Card>
        </React.Fragment>
    );
};

export default NewModalCaptura;