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
            Nombre: userAspirante.Nombre || "Nombre" || '',
            Correo: userAspirante.Correo || "a@c.com" || '',
            Telefono: userAspirante.Telefono || "5510203040" || '',
            ApellidoPaterno: userAspirante.ApellidoPaterno || "ApellidoPaterno" || '',
            ApellidoMaterno: userAspirante.ApellidoMaterno || "ApellidoMaterno" || '',
            Sourcing: userAspirante.ApellidoMaterno || "Sourcing" || '',
            userId: userAspirante.userId || "1" || '',
        },
        validationSchema: Yup.object({
            Nombre: Yup.string().required("Por favor, introduzca su nombre"),
            Correo: Yup.string().required("Por favor ingrese su correo electrónico"),
            Telefono: Yup.string().required("Por favor, introduzca su teléfono"),
            ApellidoPaterno: Yup.string().required("Por favor, introduzca su apellido paterno"),
            ApellidoMaterno: Yup.string(),
            Sourcing: Yup.string().required("Por favor, introduzca el Sourcing"),
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
        let mensaje = "Completar el registro para ver si eres Aspirante";
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
        <Modal fade={true} isOpen={show} toggle={closeToggle} centered={true}>
            <ModalBody className="modal-body">
                <Form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    action="#"
                    autoComplete="off" className="tablelist-form">
                    <Input type="hidden" id="id-field" />

                    <div className="mb-3 d-none" id="modal-id">
                        <Label htmlFor="applicationId" className="form-label">ID</Label>
                        <Input type="text" id="applicationId" className="form-control" placeholder="ID" readOnly/>
                    </div>

                    <div className="text-center">
                        <div className="position-relative d-inline-block">
                            <div className="position-absolute bottom-0 end-0">
                                <Label htmlFor="companylogo-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Image">
                                <div className="avatar-xs cursor-pointer">
                                    <div className="avatar-title bg-light border rounded-circle text-muted">
                                    <i className="ri-image-fill"></i>
                                    </div>
                                </div>
                                </Label>
                                <Input 
                                    className="form-control d-none" 
                                    id="companylogo-image-input" 
                                    type="file"
                                    onChange={fileInputImgChange}
                                    accept="image/png, image/gif, image/jpeg" />
                            </div>
                            <div className="avatar-lg p-1">
                                <div className="avatar-title bg-light rounded-circle">
                                    <img src={imgAspirante} id="companylogo-img" className="avatar-md h-auto rounded-circle object-fit-cover" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && error ? (
                        <Alert color="danger">
                            {error && error.status ? error.status : (
                                <div>Error de conexion... </div>
                            )}</Alert>
                    ) : null}

                    <TextBtnInput
                        id="Correo"
                        label="Correo electrónico"
                        type="email"
                        autoComplete="email"
                        placeholder="Introducir email"
                        validation={validation}
                        registrationError={error}
                        onClickSearch={searhEmail}
                        />
                    {mensajeBusqueda && mensajeBusqueda != "" ? (
                        <Alert color="danger">{mensajeBusqueda}</Alert>
                    ) : null}
                </Form>
                
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
        </Modal>
    );
};

export default NewModal;