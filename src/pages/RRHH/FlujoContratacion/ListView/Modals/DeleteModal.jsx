import React, { useState, useEffect } from "react";
import { 
    Modal, ModalBody, Form, Input, Label, Button, Alert
} from "reactstrap";
import Select from "react-select";
import { toast } from 'react-toastify';

// action
import { deleteFlujoContratacion, resetAddFlowJournalFlag } from "../../../../../slices/thunks";
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

const DeleteModal = ({ show, itemModal, onDeleteClick, onCloseClick }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  // Creacion de Campaign
  if(!itemModal)
    itemModal = [];
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      encryptedId: itemModal.id || "",
      userID: itemModal.creado_Por || "1",
      detalle: "",
    },
    validationSchema: Yup.object({
      detalle: Yup.string().required("Por favor ingresa el motivo"),
    }),
    onSubmit: (setData) => {
      let dataIn = {
        params : {
          id: setData.encryptedId,
        },
        data: {
          MotivoEliminacion: setData.detalle,
        }
      };
      console.log('dataIn', dataIn);
      dispatch(deleteFlujoContratacion(dataIn));
    }
  });

  // Register
  const registerdatatype = createSelector(
      (state) => state.FlujoContratacion,
      (FlujoContratacion) => ({
        flujoContratacionDel: FlujoContratacion.flujoContratacionDel,
        success: FlujoContratacion.success,
        error: FlujoContratacion.error,
      })
  );
  
  // Inside your component
  const {
      error, success, flujoContratacionDel
  } = useSelector(registerdatatype);

  useEffect(() => {
      if (success && flujoContratacionDel) {
          toast.success("Flujo de contratacion eliminada correctamente.", { autoClose: 3000 });
          dispatch(resetAddFlowJournalFlag());
          onDeleteClick();
      }
  }, [dispatch, success, error, flujoContratacionDel, history]);

  const closeToggle = () => {
      dispatch(resetAddFlowJournalFlag());
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
              <h4>¿Estás seguro?</h4>
              <p className="text-muted mx-4 mb-0">
                ¿Estás seguro de que quieres eliminar este registro?
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
              id="detalle"
              label="Motivo eliminación"
              type="text"
              autoComplete="detalles-cancelacion"
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
                    type="submit"
                    className="btn w-sm btn-danger "
                    id="add-btn">¡Sí, elimínalo! </Button>
            </div>
        </div>
      </Form>
    </Modal>
  );
};

export default DeleteModal;