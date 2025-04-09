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

const UpdateModal = ({ show, aspirante, onUpdateClick, onCloseClick }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  // Creacion de Aspirante
  const [userAspirante, setUserAspirante] = useState([]);
  if(!aspirante)
    aspirante = [];
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      Nombre: aspirante.Nombre || "Nombre" || '',
      Correo: aspirante.Correo || "a@c.com" || '',
      Telefono: aspirante.Telefono || "5510203040" || '',
      ApellidoPaterno: aspirante.ApellidoPaterno || "ApellidoPaterno" || '',
      ApellidoMaterno: aspirante.ApellidoMaterno || "ApellidoMaterno" || '',
      Sourcing: aspirante.ApellidoMaterno || "Sourcing" || '',
      userId: aspirante.userId || "1" || '',
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
      let dataIn = {
        params : {
          userID: values.userID,
          encryptedId: values.encryptedId,
        },
        data: values
      };
      dispatch(postAddAspirante(dataIn));
    }
  });

  // Register
  const registerdatatype = createSelector(
      (state) => state.Aspirantes,
      (Aspirantes) => ({
          Aspirantes: Aspirantes.aspirante,
          success: Aspirantes.success,
          error: Aspirantes.error,
      })
  );
  
  // Inside your component
  const {
      error, success, Aspirantes
  } = useSelector(registerdatatype);

  useEffect(() => {
      if (success && Aspirantes) {
          toast.success("Campaña actualizada con éxito", { autoClose: 3000 });
          dispatch(resetCreateFlag());
          onUpdateClick();
      }
  }, [dispatch, success, error, Aspirantes, history]);

  const closeToggle = () => {
      dispatch(resetCreateFlag());
      onCloseClick();
  }

  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <Form 
          onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
          }}
          action="#"
          autoComplete="off" className="tablelist-form">
        <ModalBody className="py-3 px-5">
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Edicion</h4>
              <p className="text-muted mx-4 mb-0">
                Actualiza la informacion
              </p>
            </div>
          </div>
          
          {error && error ? (
              <Alert color="danger">
                  {error && error.status ? error.status : (
                      <div>Error de conexion... </div>
                  )}</Alert>
          ) : null}

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
              id="Telefono"
              label="Teléfono"
              type="number"
              autoComplete="tel"
              placeholder="Introducir teléfono"
              validation={validation}
              registrationError={error}
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
              id="Sourcing"
              label="Sourcing"
              type="text"
              autoComplete="additional-name"
              placeholder="Introducir Sourcing"
              listen={validation}
              />
        </ModalBody>
        <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
                <Button
                    type="button"
                    className="btn btn-light"
                    onClick={closeToggle}>Cerrar</Button>
                <Button
                    type="submit"
                    className="btn w-sm btn-warning"
                    id="add-btn">Actualizar</Button>
            </div>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateModal;