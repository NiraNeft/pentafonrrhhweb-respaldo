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

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

import {
  postAddFlujoContratacion, resetAddFlowJournalFlag,

  getFlujoContratacionCatalogos as onGetFlujoContratacionCatalogos,
} from "../../../../slices/thunks";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Modals
import NewModal from "./Modals/NewModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const FlujoContratacionNew = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  document.title = "Nuevo Flujo de Contratacion | Pentafon";

  // Funciones del Modal
  const [newModal, setShownewModal] = useState(false);
  const handleMdlNewRequisicionShow = () => setShownewModal(true);


  const onCreateClick = () => {
    //toast.success("Requisicion Agregada exitosamente", { autoClose: 3000 });
    setTimeout(() => history("/job-flow-lists"), 30);
  }

  const onCloseClick = () => {
    history("/job-flow-lists");
  }

  // Configuracion del Formulario
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { formConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }
    return {
      formConfig: {
        showModal: true,
        useFormik: {
          values: {

            "Nombre": frontFormikTxtObj({ label: "Nombre", required: "Por favor, agrega el nombre", defaultValue: 'Nombre', ColMd: 12, YupMax: 200 }),
            "Descripcion": frontFormikCked("Descripción", "Por favor, llene el campo", "Descripcion", 5),
            "PuestosIds": frontFormikAddList({
              ColMd: 7,
              label: "Puestos",
              defaultValue: '',
              buttons: [
                { label: "Agregar Puesto", onclick: (e) => handleMdlNewRequisicionShow(e) }
              ],
              list: (e) => (e.Catalogos && e.Catalogos.puestosTropicalizacion && e.Catalogos.puestosTropicalizacion.map((e) => ({ label: e.nombre, value: e.id })) || [])
            }),
            "TropicalizacionIds": frontFormikKanban({
              ColMd: 12,
              label: "Módulos de Tropicalización",
              required: "Por favor, agrega una opcion",
              defaultValue: [],
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

            userId: frontFormikParm("1"),
            CallingListDestino: frontFormikParm(),
            CodigoTxt: frontFormikParm(),
            Estatus: frontFormikPmIn(1),
            RecordStatus: frontFormikPmIn(5),

          },
          onSubmit: (setData, values) => {
            console.log('setData', setData);
            let newData = {...setData};
            newData.TropicalizacionIds = newData.TropicalizacionIds.join(",");
            if(newData.PuestosIds && newData.PuestosIds != ""){
              newData.PuestosIds = newData.PuestosIds.join(",");
            }

            let dataIn = {
              params: {
                userId: setData.userId,
              },
              data: newData
            };
            console.log(dataIn);
            dispatch(postAddFlujoContratacion(dataIn));
          }
        },
        slices: {
          data: {
            FlujoContratacion: {
              Requisiciones: "FlujoContratacion",
              Catalogos: "flujoContratacionCatalogos",
              success: "success",
              error: "error",
            }
          },
          titleSuccess: "Flujo de Contratacion Agregado exitosamente"
        },
        titles: {
          //modalHeader: { color: "info", title: "Datos del Flujo de Contratacion" },
          btnSubmit: "Agregar"
        },
        function: {
          reset: resetAddFlowJournalFlag,
          succes: onCreateClick,
          closed: onCloseClick,
          dispatx: (slices, dispatx) => {
            if (!slices.Catalogos)
              dispatx(onGetFlujoContratacionCatalogos({ RowsByPage: 100 }));
          }
        }
      }
    };
  }, [isLayoutReady]);

  if (!formConfig)
    return null;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="Flujo de Contratacion" subtitle="Creacion" pageTitle="A y S Personal" linkTo="/job-flow-lists" />

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
    </React.Fragment>
  );
};

export default FlujoContratacionNew;
