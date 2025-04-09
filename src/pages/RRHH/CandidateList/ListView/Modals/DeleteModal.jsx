import React, { useState, useEffect } from "react";
import { 
    Modal, ModalBody, Form, Input, Label, Button, Alert
} from "reactstrap";
import Select from "react-select";
import { toast } from 'react-toastify';

// action
import { setAspirantesEvaluar, resetCreateFlag } from "../../../../../slices/thunks";
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

const DeleteModal = ({ show, campaign, onDeleteClick, onCloseClick }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  // Creacion de Campaign
  if(!campaign)
    campaign = [];
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      encryptedId: campaign.Id || "",
      userID: campaign.userID || "1",
      detalle: "",
    },
    validationSchema: Yup.object({
      detalle: Yup.string().required("Please Enter Your detalle"),
    }),
    onSubmit: (values) => {
      let data = new FormData();
      console.log('values', values);
      dispatch(setAspirantesEvaluar(values));
    }
  });

  // Register
  const registerdatatype = createSelector(
      (state) => state.Aspirantes,
      (Aspirantes) => ({
          Aspirantes: Aspirantes.campaign,
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
          toast.success(Aspirantes.message, { autoClose: 3000 });
          dispatch(resetCreateFlag());
          onDeleteClick();
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