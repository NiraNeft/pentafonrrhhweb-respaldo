import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Button,
  NavLink,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import Moment from 'moment';
import Select from "react-select";
import { useSearchParams } from "react-router-dom";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { createSelector } from "reselect";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


import {
  frontFormikParm,
  frontFormikPmIn,
  frontFormikText,
  frontFormikNumber,
  frontFormikMoney,
  frontFormikSiNo,
  frontFormikTitl,
  frontFormikP,
  frontFormikTxtObj,
  frontFormikCked,
  frontFormikEmail,
  frontFormikDate,
  frontFormikList,
  frontFormikBtn,
  frontFormikAddList,
  frontFormikKanban,
  FormCardFrontApi
} from "../../../../Components/ApiFront/FormFront";
import Spinners from "../../../../Components/Common/Spinner";

import {
  updateFlujoContratacion, resetAddFlowJournalFlag,

  getFlujoContratacionCatalogos as onGetFlujoContratacionCatalogos,
  getFlujoContratacionbyID as onGetFlujoContratacionbyID,
} from "../../../../slices/thunks";

// Modals
import NewModal from "./Modals/NewModal";


const FlujoContratacionEdit = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  document.title = "Editar Flujo de Contratacion | Pentafon";

  // Obtener Objeto
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemFocus, setItemFocus] = useState(false);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  
  // Register
  const registerdatatype = createSelector(
      (state) => state.FlujoContratacion,
      (FlujoContratacion) => ({
        flujoContratacion: FlujoContratacion.flujoContratacion,
        error: FlujoContratacion.error,
        loading: FlujoContratacion.loading,
      })
  );

  const {
    error, loading, flujoContratacion
  } = useSelector(registerdatatype);
  
  const [isLoading, setLoading] = useState(loading);
  
  useEffect(() => {
    setIsLayoutReady(false);
    setItemFocus(false);
  }, []);

  useEffect(() => {
    if (!flujoContratacion){
      let flujoContratacionId = searchParams.get("id");
      dispatch(onGetFlujoContratacionbyID({ id: flujoContratacionId }));
    }
  }, [dispatch]);

  useEffect(() => {
      if (!error && flujoContratacion) {
        setItemFocus(flujoContratacion);
      }
  }, [dispatch, error, loading, flujoContratacion]);
  
  // Funciones del Modal
  const [newModal, setShownewModal] = useState(false);
  const handleMdlNewRequisicionShow = () => setShownewModal(true);

  const handlerCloseLink = () => {
    dispatch(resetAddFlowJournalFlag());
    //onCloseClick();
  }

  const onCreateClick = () => {
    setTimeout(() => history("/job-flow-lists"), 30);
  }

  const onCloseClick = () => {
    setTimeout(() => history("/job-flow-lists"), 50);
  }

  // Configuracion del Formulario
  useEffect(() => {
    if(itemFocus)
      setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, [itemFocus]);

  const { formConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }
    
    return {
      formConfig: {
        showModal: true,
        useFormik: {
          values: {

            userId: frontFormikParm("1"),
            flujoContratacionId: frontFormikParm(itemFocus && itemFocus.flujoContratacion && itemFocus.flujoContratacion.id || ""),

            "Nombre": frontFormikTxtObj({
              label: "Nombre", required: "Por favor, agrega el nombre", 
              defaultValue: (itemFocus && itemFocus.flujoContratacion && itemFocus.flujoContratacion.nombre || ''),
              ColMd: 12, YupMax: 200
            }),
            "Descripcion": frontFormikCked(
              "Descripción", 
              "Por favor, llene el campo", 
              (itemFocus && itemFocus.flujoContratacion && itemFocus.flujoContratacion.descripcion   || ''), 
              5
            ),
            "PuestosIds": frontFormikAddList({
              ColMd: 7,
              label: "Puestos",
              defaultValue: (itemFocus && itemFocus.puestos && itemFocus.puestos.map((e) => e.puesto_Id) || []),
              buttons: [
                { label: "Agregar Puesto", onclick: (e) => handleMdlNewRequisicionShow(e) }
              ],
              list: (e) => (e.Catalogos && e.Catalogos.puestosTropicalizacion && e.Catalogos.puestosTropicalizacion.map((e) => ({ label: e.nombre, value: e.id })) || [])
            }),
            "TropicalizacionIds": frontFormikKanban({
              ColMd: 12,
              label: "Módulos de Tropicalización",
              required: "Por favor, agrega una opcion",
              defaultValue: (itemFocus && itemFocus.tropicalizacon && itemFocus.tropicalizacon.map((e) => (
                (e.tropicalizacionTipos || []).filter((e) => e.esMultiple == 2).map((t) => 
                  (t.gruposTropicalizaciones || []).map((g) => g.opciones.map( (o) => o.id)).join(',')
                ).join(',')
              )) || []).join(',').split(',').filter((e) => e != ""),
              defaultValueKan: (itemFocus && itemFocus.tropicalizacon && itemFocus.tropicalizacon.map((e) => (
                (e.tropicalizacionTipos || []).filter((e) => e.esMultiple == 1).map((t) => (
                  t.gruposTropicalizaciones.map((g) => ({
                    id: g.modulo_Id,
                    values: g.opciones.map((go) => ({
                      id: go.id,
                      label: go.nombre,
                      tipoInput: go.tipoParms_Id,
                      value: {
                        descripcion: go.parametros.cpm_descripcion,
                        label: go.parametros.cpm_nombre,
                        value:go.parametros. cpm_id
                      }
                    })),
                    idArray: g.cpm_grupoN,
                  }))
                ))
              )) || []).filter((e) => e.length > 0),

              list: (e) => (e.Catalogos && e.Catalogos.catalogosTropicalizacion && e.Catalogos.catalogosTropicalizacion.map((e) => ({
                id: e.id,
                label: e.nombreTropicalizacion,
                ordenGrupo: e.ordenGrupo,
                values: (e.tropicalizacionTipos || []).map((t) => ({
                  id: t.id,
                  label: t.tipo,
                  multiple: t.esMultiple,
                  selectValues: [],
                  values: (t.tropicalizaciones || []).map((p) => ({
                    id: p.id,
                    value: p.id,
                    label: p.nombre,
                    tipoInput: p.tipoParms_Id,
                    descripcion: p.descripcion,
                    parametros: (p.parametros || []).map((pa) => ({
                      value: pa.cpm_id,
                      label: pa.cpm_nombre,
                      descripcion: pa.cpm_descripcion,
                    })), // Parametros
                  }))// Tipo
                }))// Grupo
              })) || [])// Listado Completo
            }),

          },
          onSubmit: (setData, values) => {
            console.log('setData', setData);
            let newData = {...setData};
            newData.TropicalizacionIds = newData.TropicalizacionIds.join(",");
            newData.PuestosIds = newData.PuestosIds.join(",");

            let dataIn = {
              params: {
                id: setData.flujoContratacionId,
              },
              data: newData
            };
            console.log(dataIn);
            dispatch(updateFlujoContratacion(dataIn));
          }
        },
        slices: {
          data: {
            FlujoContratacion: {
              flujoContratacionnUpd: "flujoContratacionnUpd",
              Catalogos: "flujoContratacionCatalogos",
              success: "success",
              error: "error",
            }
          },
          titleSuccess: "Flujo de Contratacion editado exitosamente"
        },
        titles: {
          //modalHeader: { color: "info", title: "Datos del Flujo de Contratacion" },
          btnSubmit: "Guardar"
        },
        function: {
          reset: resetAddFlowJournalFlag,
          succes: onCreateClick,
          closed: onCloseClick,
          dispatx: (slices, dispatx) => {
            if (!slices.Catalogos)
              dispatx(onGetFlujoContratacionCatalogos());
          },
          useEfecto: {
            /*FlujoContratacion: {
              flujoContratacion: (useEfecto) => {
                setItemFocus(useEfecto);
              }
            }*/
          }
        }
      }
    };
  }, [isLayoutReady, itemFocus]);

  if (!formConfig)
    return null;

  return ( !isLoading ?
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="Flujo de Contratacion" subtitle="Creacion" pageTitle="A y S Personal" linkTo="/job-flow-lists" onClick={handlerCloseLink} />

          <Row className="row">
            <Col className="col-lg-12">
              <Card className="card">

                <FormCardFrontApi config={formConfig} />

                {newModal ? (
                  <NewModal
                    show={newModal}
                    onCreateClick={() => handleMdlNewRequisicionCreate()}
                    onCloseClick={() => setShownewModal(false)}
                  />
                ) : null}

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment> : <Spinners setLoading={setLoading} />
  );
};

export default FlujoContratacionEdit;
