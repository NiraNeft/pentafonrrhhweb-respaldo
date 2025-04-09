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
  NavLink
} from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import Moment from 'moment';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { useSearchParams } from "react-router-dom";


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
    frontFormikKanban,
    FormCardFrontApi
} from "../../../../Components/ApiFront/FormFront";
import Spinners from "../../../../Components/Common/Spinner";

import {
  updateRequisicion, resetAddRequisicionFlag,

  getRequisicionesCatalogos as onGetRequisicionesCatalogos,
  getRequisicionbyID as onGetRequisicionbyID,
} from "../../../../slices/thunks";

// Modals
import NewModal from "./Modals/NewModal";

import { Link, useNavigate } from "react-router-dom";

const EditRequisicion = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [requisicionDetail, setRequisicionDetail] = useState(false);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  document.title = "Editar Requisición | Pentafon";

  const requisicionId = searchParams.get("id");

  // Catalogo de Requisiciones
  const registerdatatype = createSelector(
    (state) => state.Requisiciones,
    (Requisiciones) => ({
      requisicion: Requisiciones.requisicion,
      error: Requisiciones.error,
      loading: Requisiciones.loading,
      success: Requisiciones.success,
    })
  );

  const {
    error, loading, requisicion, success
  } = useSelector(registerdatatype);
    
  const [isLoading, setLoading] = useState(loading);

  useEffect(() => {
    setIsLayoutReady(false);
    setRequisicionDetail(false);
  }, []);
  
  useEffect(() => {
    if (!requisicion){
      dispatch(onGetRequisicionbyID({ 
        id: requisicionId
      }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!error && requisicion) {
      setRequisicionDetail(requisicion);
    }
  }, [dispatch, error, loading, requisicion]);
    
  // Funciones del Modal
  function handleSelectCampaign(selectedCampaign, id, items) {
      if(selectedCampaign != ""){
          items.CallingList.ver = true;
          dispatch(onGetCallingList({ campania: selectedCampaign }));
      } else {
          items.CallingList.ver = false;
          items.Tipo.ver = false;
          items.ColumnaFiltro.ver = false;
          items.Codigo.ver = false;
          items.isBlackList.ver = false;
          items.isNuevaCallingList.ver = false;
      }
  }
  
  const [newModal, setShownewModal] = useState(false);
  const handleMdlNewRequisicionShow = () => setShownewModal(true);

  
  const onCreateClick = () => {
    //toast.success("Requisicion Agregada exitosamente", { autoClose: 3000 });
    setTimeout(() => history("/job-requisicion-lists"), 30);
  }
  
  const onCloseClick = () => {
    history("/job-requisicion-lists");
  }

  // Configuracion del Formulario
  useEffect(() => {
    if(requisicionDetail)
      setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, [requisicionDetail]);
    
  
  const { formConfig } = useMemo(() => {
    if (!isLayoutReady && !requisicionDetail) {
      return {};
    }

    console.log("requisicionDetail", requisicionDetail.ListDocumentos);
    console.log("ListK"
      , (requisicionDetail && requisicionDetail.ListDocumentos && requisicionDetail.ListDocumentos.map((e) => (
        (e.documentos || []).map((g) => g.Id).join(',')
      )) || []).join(',').split(',').filter((e) => e != "")
    );

    return {
      formConfig: {
        showModal: true,
        useFormik: {
            values: {


              Titulo1: frontFormikTitl('Datos del cliente'),
              /*Cliente existente (Seleccionar CECO del catalogo)*/
              "DatosCliente-Cliente_Id": frontFormikList({
                  ColMd: 4,
                  label: "Cliente existente",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.Cliente && requisicionDetail.Cliente.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.CECOS && e.Catalogos.CECOS.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              /*Email de contacto (envío de reportes diarios y facturación)*/
              "DatosCliente-Email_Contacto": frontFormikEmail({ 
                label: "Email de contacto", 
                required: "Por favor, selecciona una opcion", 
                defaultValue: requisicionDetail.EmailContacto || '', 
                ColMd: 4, YupMax: 200 }),
              /*Cliente nuevo (Solicitar datos para generar CECO)*/
              "DatosCliente-CECO_Id": frontFormikParm("MUI5Y29ndnF5QjlUR3doRDVyYzVhQT09"),

              Titulo2: frontFormikTitl('Tipo de Servicio / Precio.'),
              /*Captación Digital / Manejo de marca*/
              /*Bombeo de Candidatos*/
              /*Selección*/
              /*Capacitación*/
              /*Desarrollo Organizacional*/
              /*Administración de nómina*/
              "TipoServicio-Tipo_Servicio_Id": frontFormikList({
                  ColMd: 6,
                  label: "Tipo de Servicio / Precio.",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.TipoServicio && requisicionDetail.TipoServicio.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.TipoServicio && e.Catalogos.TipoServicio.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              
              // -- Titulo3: frontFormikTitl('Tipo de Perfil'),
              /*ATC*/
              /*Ventas*/
              /*Cobranza*/
              /*Cabinas de Siniestros*/
              /*Otro*/
              "TipoPerfil-Tipo_Perfil_Id": frontFormikList({
                  ColMd: 6,
                  label: "Tipo de Perfil",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.TipoPerfil && requisicionDetail.TipoPerfil.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.TipoServicio && e.Catalogos.TipoServicio.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),

              Titulo4: frontFormikTitl('Oferta Laboral'),
              /*Puesto*/
              "OfertaLaboral-Puesto_Id": frontFormikList({
                  ColMd: 4,
                  label: "Puesto",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.Puesto && requisicionDetail.Puesto.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.Puestos && e.Catalogos.Puestos.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              /*Descripción del puesto*/
              "OfertaLaboral-Descripcion_Puesto": frontFormikCked(
                "Descripción del puesto", 
                "Por favor, llene el campo", 
                requisicionDetail.DescripcionPuesto || ''
              ),
              /*Fecha de cierre de Requisición*/
              "OfertaLaboral-Fecha_Cierre": frontFormikDate({ 
                label: "Fecha de cierre de Requisición", 
                defaultValue: requisicionDetail.FechaCierre || '', 
                required: "Por favor, llene el campo", 
                ColMd: 4 }),
              /*Vacantes solicitadas*/
              "OfertaLaboral-Vacantes_Solicitadas": frontFormikNumber({ 
                label: "Vacantes solicitadas", 
                defaultValue: requisicionDetail.VacantesSolicitadas || '', 
                required: "Por favor, llene el campo", 
                ColMd: 4, defaultValue: "10" }),
              /*Salario | Base + Variable*/
              "OfertaLaboral-Salario_Base": frontFormikMoney({ 
                label: "Salario", 
                defaultValue: requisicionDetail.SalarioBase || '', 
                required: "Por favor, llene el campo",
                ColMd: 4, defaultValue: "10" }),
              "OfertaLaboral-Salario_Variable": frontFormikMoney({ 
                label: "Base + Variable", 
                defaultValue: requisicionDetail.SalarioVariable || '', 
                required: "Por favor, llene el campo",
                ColMd: 4, defaultValue: "10" }),
              /*Lugar de trabajo*/
              "OfertaLaboral-Lugar_Trabajo_Id": frontFormikList({
                  ColMd: 4,
                  label: "Lugar de trabajo",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.LugarTrabajo && requisicionDetail.LugarTrabajo.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.LugarTrabajo && e.Catalogos.LugarTrabajo.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              /*Jornada / Horario*/
              "OfertaLaboral-Jornada_Id": frontFormikList({
                  ColMd: 4,
                  label: "Jornada / Horario",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.Jornada && requisicionDetail.Jornada.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.Jornadas && e.Catalogos.Jornadas.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              /*Prestaciones (Ley / Superiores)*/
              "OfertaLaboral-Prestaciones_Id": frontFormikList({
                  ColMd: 4,
                  label: "Prestaciones",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.Prestaciones && requisicionDetail.Prestaciones.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.Prestaciones && e.Catalogos.Prestaciones.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              /*Duración de la capacitación (Pago especial)*/
              /*Tipo de entrevista (digital / Presencial / Panel)*/
              "OfertaLaboral-Tipo_Entrevista_Id": frontFormikList({
                  ColMd: 4,
                  label: "Tipo de entrevista",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.TipoEntrevista && requisicionDetail.TipoEntrevista.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.TiposEntrevista && e.Catalogos.TiposEntrevista.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),

              Titulo5: frontFormikTitl('Especificaciones del Candidato'),
              /*Experiencia (tiempo en meses)*/
              /*Nivel de estudios (Medio Superior trunco/ Concluido, Licenciatura trunco/ Concluido, Especialidad)*/
              "EspecificacionesCandidato-Nivel_Estudios_Id": frontFormikList({
                  ColMd: 4,
                  label: "Nivel de estudios",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.NivelEstudios && requisicionDetail.NivelEstudios.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.NivelesEstudios && e.Catalogos.NivelesEstudios.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              /*Rango de edad*/
              "EspecificacionesCandidato-Rango_Edad_Id": frontFormikList({
                  ColMd: 4,
                  label: "Rango de edad",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.RangoEdad && requisicionDetail.RangoEdad.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.RangosEdad && e.Catalogos.RangosEdad.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              /*Tiempo de trayecto (minutos)*/
              "EspecificacionesCandidato-Tiempo_Trayecto_Id": frontFormikList({
                  ColMd: 4,
                  label: "Tiempo de trayecto",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.TiempoTrayecto && requisicionDetail.TiempoTrayecto.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.TiemposTrayecto && e.Catalogos.TiemposTrayecto.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              /*Pruebas requeridas (adherencia a perfil y/o integridad)*/
              "EspecificacionesCandidato-Pruebas_Requeridas_Id": frontFormikList({
                  ColMd: 4,
                  label: "Pruebas requeridas",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.PruebasRequeridas && requisicionDetail.PruebasRequeridas.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.PruebasRequeridas && e.Catalogos.PruebasRequeridas.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              /*Nivel de Ingles*/
              "EspecificacionesCandidato-Nivel_Ingles_Id": frontFormikList({
                  ColMd: 4,
                  label: "Nivel de Ingles",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.NivelIngles && requisicionDetail.NivelIngles.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.NivelesIngles && e.Catalogos.NivelesIngles.map((e) => ({ label: e.Nombre, value: e.Id})) || []),
              }),
              
              /*Fujo Contratacion*/
              Titulo6: frontFormikTitl('Módulos de Tropicalización'),
              "DatosCliente-FlujoContratacion_Id": frontFormikList({
                  ColMd: 4,
                  label: "Flujo de Contratacion",
                  required: "Por favor, selecciona una opcion",
                  defaultValue: requisicionDetail.FlujoContratacion && requisicionDetail.FlujoContratacion.Id,
                  list: (e) => (e.Catalogos && e.Catalogos.FlujosContratacion && e.Catalogos.FlujosContratacion.map((e) => ({ label: e.nombre, value: e.id})) || []),
              }),
              "Btn-FlujoContratacion": frontFormikBtn({ 
                ColMd: 4,
                label: 'Agregar Flujo de Contratacion',
                onClick: () => history('/job-flow-new')
              }),
              "EspecificacionesCandidato-DocumentosIds": frontFormikKanban({
                ColMd: 12,
                label: "Documentos del Candidato",
                required: "Por favor, agrega una opcion",
                defaultValue: (requisicionDetail && requisicionDetail.ListDocumentos && requisicionDetail.ListDocumentos.map((e) => (
                  (e.documentos || []).map((g) => g.Id).join(',')
                )) || []).join(',').split(',').filter((e) => e != ""),
                list: (e) => (e.Catalogos && e.Catalogos.Documentos && e.Catalogos.Documentos.map((e) => ({
                  id: e.id,
                  label: e.tipo,
                  ordenGrupo: e.nGrupo,

                  values: [{
                    id: e.nGrupo,
                    label: false,
                    multiple: 2,
                    selectValues: [],
                    values: (e.documentos || []).map((p) => ({
                      id: p.Id,
                      value: p.Id,
                      label: p.Documento,
                      tipoInput: 1,
                      descripcion: p.descripcion,
                      parametros: [], // Parametros
                    }))// Tipo
                  }]// Grupo
                })) || [])// Listado Completo
              }),
              
              userId: frontFormikParm("1"),
              CallingListDestino: frontFormikParm(),
              CodigoTxt: frontFormikParm(),
              Estatus: frontFormikPmIn(1),
              RecordStatus: frontFormikPmIn(5),

            },
            onSubmit: (setData, values) => {
                let newData = {};
                Object.keys(setData).forEach((key) => {
                    let newKeys = key.split("-");
                    if(newKeys.length>1){
                      if(!newData[newKeys[0]])
                          newData[newKeys[0]] = {};
                      if(newKeys[2]){
                          newData[newKeys[0]] [newKeys[1]] [parseInt(newKeys[2])] = setData[key];
                      } else {
                          newData[newKeys[0]][newKeys[1]] = setData[key];
                      }
                    }
                });
                newData.OfertaLaboral.Fecha_Cierre = Moment(newData.OfertaLaboral.Fecha_Cierre[0]).format('YYYY-MM-DD');
                newData.EspecificacionesCandidato.DocumentosIds = newData.EspecificacionesCandidato.DocumentosIds.join(",");
    
                let dataIn = {
                  params : {
                    id: requisicionDetail.Id,
                  },
                  data: newData
                };
                dispatch(updateRequisicion(dataIn));
            }
        },
        slices: {
            data: {
                Requisiciones: {
                  Requisiciones: "Requisicion",
                  Catalogos: "requisicionCatalogos",
                  success: "success",
                  error: "error",
                }
            },
            titleSuccess: "Requisicion actualizada exitosamente"
        }, 
        titles: {
            modalHeader: { color: "info", title: "Edicion de la Requisición" },
            btnSubmit: "Guardar"
        },
        function: {
            reset: resetAddRequisicionFlag,
            succes: onCreateClick,
            closed: onCloseClick,
            dispatx: (slices, dispatx) => {
                if(!slices.Catalogos)
                  dispatx(onGetRequisicionesCatalogos({ RowsByPage: 100 }));
            }
        }
      }
    };
  }, [isLayoutReady, requisicionDetail]);
    
    if(!formConfig)
        return null;

    
  return (requisicionDetail ? <React.Fragment>
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="Requisiciones" pageTitle="A y S Personal" linkTo="/job-requisicion-lists" />

          <Row className="row">
            <Col className="col-lg-12">
              <Card className="card">
                <CardHeader className="border-0">
                  <div className="d-md-flex align-items-center">
                    <h5 className="card-title mb-3 mb-md-0 flex-grow-1">
                      
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-1 flex-wrap">
                        <Button
                          color="success"
                          type="button"
                          className="add-btn "
                          data-bs-toggle="modal"
                          id="create-btn"
                          onClick={handleMdlNewRequisicionShow}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Cliente nuevo (CECO)
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>

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

export default EditRequisicion;
