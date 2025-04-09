import React, { useState, useEffect } from "react";
import { 
    Modal, ModalBody, Form, Input, Label, Button, Alert
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

    const fileInputImgChange = (event) => {
        const files = event.target.files;
        console.log( "[DEBUG] fileInputChange", files);
        if (event.target.files && event.target.files[0]) {
            setImgAspirante(URL.createObjectURL(event.target.files[0]));
            validation.setFieldValue("FotoPerfil", event.target.files[0]);
        } else {
            setImgAspirante(MultiUser);
            validation.setFieldValue("FotoPerfil", "");
        }
    }

    // Creacion de Aspirante
    const [userAspirante, setUserAspirante] = useState([]);
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            Requisicion_Id: userAspirante.Requisicion_Id || "" || '',
            Nombre: userAspirante.Nombre || "Nombre" || '',
            Correo: userAspirante.Correo || "a@c.com" || '',
            Telefono: userAspirante.Telefono || "5510203040" || '',
            Apellido_Paterno: userAspirante.Apellido_Paterno || "Apellido_Paterno" || '',
            Apellido_Materno: userAspirante.Apellido_Materno || "Apellido_Materno" || '',
            Medio_Contacto_Id: userAspirante.Apellido_Materno || "Medio Contacto" || '',
            Fecha_Nacimiento: userAspirante.Fecha_Nacimiento || "" || '',
            userId: userAspirante.userId || "1" || '',
            Sourcing: userAspirante.source || "source" || '',
            FotoPerfil: '',
        },
        validationSchema: Yup.object({
            Requisicion_Id: Yup.string().required("Por favor, introduzca el Requisicion"),
            Nombre: Yup.string().required("Por favor, introduzca su nombre"),
            Correo: Yup.string().required("Por favor ingrese su correo electrónico"),
            Telefono: Yup.string().required("Por favor, introduzca su teléfono"),
            Apellido_Paterno: Yup.string().required("Por favor, introduzca su apellido paterno"),
            Fecha_Nacimiento: Yup.date().required("Por favor, introduzca su fecha de nacimiento"),
            userId: Yup.string().required("Por favor, introduzca su apellido paterno"),
            Apellido_Materno: Yup.string(),
            Medio_Contacto_Id: Yup.string().required("Por favor, introduzca el Medio Contacto"),
        }),
        onSubmit: (values) => {
            console.log("values", values);
            values.Telefono = "" + values.Telefono;
            let dataIn = {
              params : {
                userId: values.userId,
              },
              data: values
            };
            console.log("values", dataIn);
            dispatch(postAddCandidato(dataIn));
        }
    });

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
        dispatch(resetCreateFlag());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            toast.success("Aspirante Added Successfully", { autoClose: 3000 });
            dispatch(resetCreateFlag());
            onCreateClick();
        }
    }, [dispatch, success, error, history]);

    const onClickSearch = () => {
        console.log("onClickSearch");
    }

    const closeToggle = () => {
        dispatch(resetCreateFlag());
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
                <ModalBody className="modal-body">
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


                    <SelectInput
                        id="Requisicion_Id"
                        label="Requisicion"
                        listen={validation}
                        options={[
                            { label: "- Sin Requisicion -", value: "UUMvNGxPYi9abkZ4TERVMVlOUlZydz09" },
                            { label: "Ejecutivo de Ventas", value: "QzJrcTVZZ3JBMzBxbUp6R2oxaGdBdz09" },
                            { label: "Gerente de Operaciones", value: "SndDdFB2MXBtUVpqL0xrQ3F5aTQ1QT09" },
                            { label: "Asesor Telefónico", value: "VTdzbDBJS0E1bmg2N0xINDRMckROZz09" },
                        ]}
                        />

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
                        id="Apellido_Paterno"
                        label="Apellido Paterno"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Introducir Apellido Paterno"
                        validation={validation}
                        registrationError={error}
                        />

                    <TextInput
                        id="Apellido_Materno"
                        label="Apellido Materno"
                        type="text"
                        autoComplete="additional-name"
                        placeholder="Introducir Apellido Materno"
                        listen={validation}
                        />

                    <TextInput
                        id="Fecha_Nacimiento"
                        label="Fecha de Nacimiento"
                        type="date"
                        validation={validation}
                        registrationError={error}
                        />


                    <div>
                        <TextInput
                            id="Telefono"
                            label="Teléfono"
                            type="number"
                            autoComplete="tel"
                            placeholder="Introducir teléfono"
                            validation={validation}
                            registrationError={error}
                            />

                        <TextBtnInput
                            id="Telefono"
                            label="Teléfono"
                            type="number"
                            autoComplete="tel"
                            placeholder="Introducir teléfono"
                            lbBtn="Eliminar"
                            validation={validation}
                            registrationError={error}
                            onClickSearch={onClickSearch}
                            />
                            
                    </div>

                    <TextInput
                        id="Correo"
                        label="Correo electrónico"
                        type="email"
                        autoComplete="email"
                        placeholder="Introducir email"
                        validation={validation}
                        registrationError={error}
                        />

                    <TextInput
                        id="Medio_Contacto_Id"
                        label="Medio Contacto"
                        type="text"
                        autoComplete="additional-name"
                        placeholder="Introducir Medio Contacto"
                        validation={validation}
                        registrationError={error}
                        />
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