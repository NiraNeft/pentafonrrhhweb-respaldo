import React, { useState, useEffect, useMemo } from "react";
import {
  frontFormikParm,
  frontFormikText,
  frontFormikSiNo,
  frontFormikLabl,
  frontFormikLbList,
  frontFormikLbKanban,
  FormFrontApi
} from "../../../../../Components/ApiFront/FormFront";

import {
  getFlujoContratacionbyID, resetAddFlowJournalFlag
} from "../../../../../slices/thunks";
import Spinners from "../../../../../Components/Common/Spinner";

//redux
import { useSelector, useDispatch } from "react-redux";

const OverviewModal = ({ show, itemModal, onCloseClick }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  const handlerCloseLink = () => {
    dispatch(resetAddFlowJournalFlag());
    onCloseClick();
  }
  
  // Configuracion del Formulario
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { formConfig } = useMemo(() => {
    if(!itemModal)
      return {};
    if (!isLayoutReady) {
      return {};
    }
    return {
      formConfig: {
        showModal: show,
        useFormik: {
          values: {
            userId: frontFormikParm("1"),
            id: frontFormikParm(itemModal.id || ""),

            Nombre: frontFormikLabl("Nombre", itemModal.nombre, 4),
            Descripción: frontFormikLabl("Descripción", itemModal.descripcion, 4),
            Puestos: frontFormikLbList({
              ColMd: 4,
              label: "Puestos", 
              defaultValue: itemModal.tipo, 
              list: (e) => (e.flujoContratacion && e.flujoContratacion.puestos && e.flujoContratacion.puestos.map((e) => ({ label: e.puesto, value: e.id })) || [])
            }),
            Tropicalizacion: frontFormikLbKanban({
              ColMd: 12,
              label: "Módulos de Tropicalización", 
              defaultValue: itemModal.tipo, 
              list: (e) => (e.flujoContratacion && e.flujoContratacion.tropicalizacon && e.flujoContratacion.tropicalizacon.map((e) => ({
                id: e.id,
                label: e.nombreTropicalizacion,
                ordenGrupo: e.ordenGrupo,
                values: (e.tropicalizacionTipos || []).map((t) => ({
                  id: t.id,
                  label: t.tipo,
                  multiple: t.esMultiple,
                  gruposValues: (t.gruposTropicalizaciones || []).map((p) => ({
                    grupoN: p.cpm_grupoN,
                    selectValues: (
                      (p.opciones || []).map((gp) => ({
                        id: gp.id,
                        value: gp.id,
                        label: gp.nombre,
                        tipoInput: gp.tipoParms_Id,
                        descripcion: gp.descripcion,
                        parametros: (gp.parametros ? {
                          value: gp.parametros.cpm_id,
                          label: gp.parametros.cpm_nombre,
                          descripcion: gp.parametros.cpm_descripcion,
                        } : false), // Parametros
                      }))// SelectValues
                    )// Grupos
                  }))// Tipo
                }))// Grupo
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
            dispatch(getFlujoContratacionbyID(dataIn));
          }
        },
        slices: {
          data: {
            FlujoContratacion: {
              flujoContratacion: "flujoContratacion",
            }
          },
          titleSuccess: "Eliminado con éxito"
        },
        titles: {
          modalHeader: { color: "info", title: "Detalle del Flujo de Contratacion" },
          modalBody:{ className: "modal-xl" },
          btnEnable: false
        },
        function: {
          reset: resetAddFlowJournalFlag,
          closed: handlerCloseLink,
          dispatx: (slices, dispatx) => {
            if (!slices.flujoContratacion)
              dispatx(getFlujoContratacionbyID({ id: itemModal.id }));
          }
        }
      }
    };
  }, [isLayoutReady, itemModal]);

  if (!formConfig)
    return null;

  return <FormFrontApi config={formConfig} />;
};

export default OverviewModal;