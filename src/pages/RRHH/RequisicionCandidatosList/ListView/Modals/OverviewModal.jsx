import React, { useState, useEffect, useMemo } from "react";
import { createSelector } from "reselect";
import { useSearchParams } from "react-router-dom";

import {
  frontFormikParm,
  frontFormikText,
  frontFormikSiNo,
  frontFormikLabl,
  frontFormikLbList,
  frontFormikLbKanban,
  frontFormikTitl,
  frontFormikList,
  frontFormikEmail,
  frontFormikCked,
  frontFormikDate,
  frontFormikNumber,
  frontFormikMoney,
  frontFormikBtn,
  FormFrontApi
} from "../../../../../Components/ApiFront/FormFront";
import Spinners from "../../../../../Components/Common/Spinner";

import {
  getRequisicionbyID, resetAddRequisicionFlag
} from "../../../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

const OverviewModal = ({ show, itemModal, onCloseClick }) => {
  const dispatch = useDispatch();

  // Configuracion del Formulario
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [itemFocus, setItemFocus] = useState(false);

  const handlerCloseLink = () => {
    dispatch(resetAddRequisicionFlag());
    onCloseClick();
  }
  
  // Register
  const registerdatatype = createSelector(
      (state) => state.Requisiciones,
      (Requisiciones) => ({
        requisicion: Requisiciones.requisicion,
        error: Requisiciones.error,
        loading: Requisiciones.loading,
      })
  );

  const {
    error, loading, requisicion
  } = useSelector(registerdatatype);
    
  const [isLoading, setLoading] = useState(loading);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);
  
  useEffect(() => {
    if (!requisicion){
      dispatch(getRequisicionbyID({ id: itemModal.Id }));
    }
  }, [dispatch]);

  useEffect(() => {
      if (!error && requisicion) {
        setItemFocus(requisicion);
      }
  }, [dispatch, error, loading, requisicion]);
  
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
    console.log(itemFocus);
    return {
      formConfig: {
        showModal: show,
        useFormik: {
          values: {
            userId: frontFormikParm("1"),
            id: frontFormikParm(itemModal.Id || ""),
            
            Titulo1: frontFormikTitl('Datos del cliente'),
            /*Cliente existente (Seleccionar CECO del catalogo)*/
            "DatosCliente-Cliente_Id": frontFormikLabl("Cliente existente", itemFocus && itemFocus.Cliente && itemFocus.Cliente.Nombre, 4),
            /*Email de contacto (envío de reportes diarios y facturación)*/
            "DatosCliente-Email_Contacto": frontFormikLabl("Email de contacto", itemFocus && itemFocus.EmailContacto, 4),
            /*Cliente nuevo (Solicitar datos para generar CECO)*/
            "DatosCliente-CECO_Id": frontFormikParm("MUI5Y29ndnF5QjlUR3doRDVyYzVhQT09"),

            Titulo2: frontFormikTitl('Tipo de Servicio / Precio.'),
            /*Captación Digital / Manejo de marca*/
            /*Bombeo de Candidatos*/
            /*Selección*/
            /*Capacitación*/
            /*Desarrollo Organizacional*/
            /*Administración de nómina*/
            "DatosCliente-Tipo_Servicio_Id": frontFormikLabl("Tipo de Servicio / Precio.", itemFocus && itemFocus.TipoServicio && itemFocus.TipoServicio.Nombre, 6),
            
            // -- Titulo3: frontFormikTitl('Tipo de Perfil'),
            /*ATC*/
            /*Ventas*/
            /*Cobranza*/
            /*Cabinas de Siniestros*/
            /*Otro*/
            "TipoPerfil-Tipo_Perfil_Id": frontFormikLabl("Tipo de Perfil", itemFocus && itemFocus.TipoPerfil && itemFocus.TipoPerfil.Nombre, 6),

            Titulo4: frontFormikTitl('Oferta Laboral'),
            /*Puesto*/
            "OfertaLaboral-Puesto_Id": frontFormikLabl("Puesto", itemFocus && itemFocus.Puesto && itemFocus.Puesto.Nombre, 3),
            /*Descripción del puesto*/
            "OfertaLaboral-Descripcion_Puesto": frontFormikLabl("Descripción del puesto", itemFocus && itemFocus.DescripcionPuesto, 9),
            /*Fecha de cierre de Requisición*/
            "OfertaLaboral-Fecha_Cierre": frontFormikLabl("Fecha de cierre de Requisición", itemFocus && itemFocus.FechaCierre, 4),
            /*Vacantes solicitadas*/
            "OfertaLaboral-Vacantes_Solicitadas": frontFormikLabl("Vacantes solicitadas", itemFocus && itemFocus.VacantesSolicitadas, 4),
            /*Salario | Base + Variable*/
            "OfertaLaboral-Salario_Base": frontFormikLabl("Salario", itemFocus && itemFocus.SalarioBase, 4),
            "OfertaLaboral-Salario_Variable": frontFormikLabl("Base + Variable", itemFocus && itemFocus.SalarioVariable, 4),
            /*Lugar de trabajo*/
            "OfertaLaboral-Lugar_Trabajo_Id": frontFormikLabl("Lugar de trabajo", itemFocus && itemFocus.LugarTrabajo && itemFocus.LugarTrabajo.Nombre, 4),
            /*Jornada / Horario*/
            "OfertaLaboral-Jornada_Id": frontFormikLabl("Jornada / Horario", itemFocus && itemFocus.Jornada && itemFocus.Jornada.Nombre, 4),
            /*Prestaciones (Ley / Superiores)*/
            "OfertaLaboral-Prestaciones_Id": frontFormikLabl("Prestaciones", itemFocus && itemFocus.Prestaciones && itemFocus.Prestaciones.Nombre, 4),
            /*Duración de la capacitación (Pago especial)*/
            /*Tipo de entrevista (digital / Presencial / Panel)*/
            "OfertaLaboral-Tipo_Entrevista_Id": frontFormikLabl("Tipo de entrevista", itemFocus && itemFocus.TipoEntrevista && itemFocus.TipoEntrevista.Nombre, 4),

            Titulo5: frontFormikTitl('Especificaciones del Candidato'),
            /*Experiencia (tiempo en meses)*/
            /*Nivel de estudios (Medio Superior trunco/ Concluido, Licenciatura trunco/ Concluido, Especialidad)*/
            "EspecificacionesCandidato-Nivel_Estudios_Id": frontFormikLabl("Nivel de estudios", itemFocus && itemFocus.NivelEstudios && itemFocus.NivelEstudios.Nombre, 4),
            /*Rango de edad*/
            "EspecificacionesCandidato-Rango_Edad_Id": frontFormikLabl("Rango de edad", itemFocus && itemFocus.RangoEdad && itemFocus.RangoEdad.Nombre, 4),
            /*Tiempo de trayecto (minutos)*/
            "EspecificacionesCandidato-Tiempo_Trayecto_Id": frontFormikLabl("Tiempo de trayecto", itemFocus && itemFocus.TiempoTrayecto && itemFocus.TiempoTrayecto.Nombre, 4),
            /*Pruebas requeridas (adherencia a perfil y/o integridad)*/
            "EspecificacionesCandidato-Pruebas_Requeridas_Id": frontFormikLabl("Pruebas requeridas", itemFocus && itemFocus.PruebasRequeridas && itemFocus.PruebasRequeridas.Nombre, 4),
            /*Nivel de Ingles*/
            "EspecificacionesCandidato-Nivel_Ingles_Id": frontFormikLabl("Nivel de Ingles", itemFocus && itemFocus.NivelIngles && itemFocus.NivelIngles.Nombre, 4),
            
            /*Fujo Contratacion*/
            Titulo6: frontFormikTitl('Módulos de Tropicalización'),
            "DatosCliente-FlujoContratacion_Id": frontFormikLabl("Nivel de Ingles", itemFocus && itemFocus.FlujoContratacion && itemFocus.FlujoContratacion.Nombre, 4),
            "EspecificacionesCandidato-DocumentosIds": frontFormikLbKanban({
              ColMd: 12,
              label: "Documentos del Candidato", 
              defaultValue: itemModal.tipo, 
              list: (e) => (e.requisicion && e.requisicion.ListDocumentos && e.requisicion.ListDocumentos.map((e) => ({
                id: e.id,
                label: e.tipo,
                ordenGrupo: e.nGrupo,
                values: [{
                  id: e.nGrupo,
                  label: false,
                  multiple: 2,
                  gruposValues: [{
                    grupoN: 0,
                    selectValues: (e.documentos || []).map((p) => ({
                      id: p.Id,
                      value: p.Id,
                      label: p.Documento,
                      tipoInput: 1,
                      descripcion: p.descripcion,
                      parametros: [], // Parametros
                    }))// Tipo
                  }],
                }]// Grupo
              })) || [])// Listado Completo
            }),
            
            // Eliminar
            RecordStatus: frontFormikParm("1"),
          },
          onSubmit: (setData) => {
            setData.estatus = (setData.estatus == 1 ? 1 : 5);
            let dataIn = {
              params: {
                userId: setData.userId,
                id: setData.id,
              },
              data: setData
            };
            dispatch(getRequisicionbyID(dataIn));
          }
        },
        slices: {
          data: {
            Requisiciones: {
              requisicion: "requisicion",
            }
          },
          titleSuccess: ""
        },
        titles: {
          modalHeader: { color: "info", title: "Detalle del Requisicion" },
          modalBody:{ className: "modal-xl" },
          btnEnable: false
        },
        function: {
          reset: resetAddRequisicionFlag,
          closed: handlerCloseLink,
          dispatx: (slices, dispatx) => {
            /*if (!slices.requisicion)
              dispatx(getRequisicionbyID({ id: itemModal.Id }));*/
          },
          /*useEfecto: {
            requisicion: (useEfecto) => {
              setItemActual(useEfecto);
              console.log(useEfecto);
            }
          }*/
        }
      }
    };
  }, [isLayoutReady, itemFocus]);

  if (!formConfig)
    return null;

  return ( !isLoading ? <FormFrontApi config={formConfig} /> : <Spinners setLoading={setLoading} /> );
};

export default OverviewModal;