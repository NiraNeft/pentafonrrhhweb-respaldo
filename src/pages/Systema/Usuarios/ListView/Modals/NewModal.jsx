import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { 
    Modal, 
    ModalHeader, 
    ModalBody, Form, Input, Label, Button, Alert,
    TabPane, Row, Col, Card, TabContent
} from "reactstrap";
import Select from "react-select";
import { toast } from 'react-toastify';

// action
import { postAddUsuario, resetCreateUserFlag } from "../../../../../slices/thunks";
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

const NewModal = ({ show, onCreateClick, onCloseClick }) => {
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
            NombreUsuario: userAspirante.Nombre || "Nombre" || '',
            Contrasenia: userAspirante.Correo || "Prueba1234*" || '',
            NumeroEmpleado: userAspirante.userId || "1" || '',
        },
        validationSchema: Yup.object({
            NombreUsuario: Yup.string().required("Por favor, introduzca su nombre"),
            Contrasenia: Yup.string().required("Por favor ingrese su correo electrónico"),
        }),
        onSubmit: (values) => {
            let dataIn = {
              params : {
                //userId: values.userId,
              },
              data: values
            };
            dispatch(postAddUsuario(dataIn));
        }
    });

    // Buscar
    const searhEmail = (data) => {
        let mensaje = "Completar el registro para ver si eres Aspirante";
        setMensajeBusqueda(mensaje);
        console.log(data);
    }

    // Register
    const registerdatatype = createSelector(
        (state) => state.Usuarios,
        (Usuarios) => ({
            Usuarios: Usuarios.Aspirante,
            success: Usuarios.success,
            error: Usuarios.error,
        })
    );
    
    // Inside your component
    const {
        error, success
    } = useSelector(registerdatatype);

    useEffect(() => {
        if (success) {
            toast.success("Aspirante Added Successfully", { autoClose: 3000 });
            dispatch(resetCreateUserFlag());
            onCreateClick();
        }
    }, [dispatch, success, error, history]);

    const closeToggle = () => {
        dispatch(resetCreateUserFlag());
        onCloseClick();
    }
    
    return (
        <Modal fade={true} isOpen={show} toggle={closeToggle} centered={true}>
            <Form 
                onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}
                action="#"
                autoComplete="off" className="tablelist-form">
                <ModalHeader className="modal-title">
                    Nuevo Usuario
                </ModalHeader>
                <ModalBody className="modal-body">
                    <Input type="hidden" id="id-field" />

                    <div className="mb-3 d-none" id="modal-id">
                        <Label htmlFor="applicationId" className="form-label">ID</Label>
                        <Input type="text" id="applicationId" className="form-control" placeholder="ID" readOnly/>
                    </div>

                    {error && error ? (
                        <Alert color="danger">
                            {error && error.status ? error.status : (
                                <div>Error de conexion... </div>
                            )}</Alert>
                    ) : null}
                    
                    <Card className="p-2 border shadow-none mb-0 mt-2">
                        <Row className="gy-3">
                            <Col md={12}>
                                <TextInput
                                    id="NombreUsuario"
                                    label="Nombre Usuario"
                                    type="text"
                                    placeholder=""
                                    validation={validation}
                                    registrationError={error}/>
                            </Col>
                            <Col md={12}>
                                <TextInput
                                    id="Contrasenia"
                                    label="Contraseña"
                                    type="password"
                                    placeholder=""
                                    validation={validation}
                                    registrationError={error}/>
                            </Col>
                        </Row>
                        
                    </Card>
                
                </ModalBody>
                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <Button
                            type="button"
                            className="btn btn-light"
                            onClick={closeToggle}>Cerrar</Button>
                        <Button
                            color="success"
                            type="submit"
                            id="add-btn">Crear</Button>
                    </div>
                </div>
            </Form>
            
        </Modal>
    );
};

export default NewModal;