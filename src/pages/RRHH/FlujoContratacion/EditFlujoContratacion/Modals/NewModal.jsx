import React, { useState, useEffect, useMemo } from "react";
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
    FormCardFrontApi,
    FormFrontApi 
} from "../../../../../Components/ApiFront/FormFront";

import {
    postAddRequisicion, resetAddFlowJournalFlag,
    
    getRequisicionesCatalogos as onGetRequisicionesCatalogos,
} from "../../../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

const NewModal = ({ show, onCreateClick, onCloseClick }) => {
    const dispatch = useDispatch();
    
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
    
    function handleSelectCallingList(selectedCalingList, id, items) {
        if(selectedCalingList != ""){
            items.Tipo.ver = true;
            items.ColumnaFiltro.ver = true;
            dispatch(onGetCallingListByName({ callinglist: selectedCalingList }));
        } else {
            items.Tipo.ver = false;
            items.ColumnaFiltro.ver = false;
            items.Codigo.ver = false;
            items.isBlackList.ver = false;
            items.isNuevaCallingList.ver = false;
        }
    }

    function handleSelectColumnaFiltro(selectedColumnaFiltro, id, items) {
        if(selectedColumnaFiltro != ""){
            let filter = items.ColumnaFiltro.options.filter(X => X.value === selectedColumnaFiltro);
            console.log("filter",filter);
            if (filter["length"] === 1) {
                items.Codigo.ver = true;
                items.isBlackList.ver = true;
                items.isNuevaCallingList.ver = true;
                dispatch(onGetCadigosByTipo({ tipo: filter[0].tipo }));
            }
        } else {
            items.Codigo.ver = false;
            items.isBlackList.ver = false;
            items.isNuevaCallingList.ver = false;
        }
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
        
                      /*Email de contacto (envío de reportes diarios y facturación)*/
                      "DatosCliente-Email_Contacto": frontFormikEmail({ label: "Puesto", required: "Por favor, agrega el puesto", defaultValue: '', ColMd: 12, YupMax: 200 }),
                      "DatosCliente-Email_Contact": frontFormikEmail({ label: "Descripcion", required: "Por favor, agrega la descripcion", defaultValue: '', ColMd: 12, YupMax: 200 }),
                    
                      
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
            
                        let dataIn = {
                          params : {
                            userId: setData.userId,
                          },
                          data: newData
                        };
                        dispatch(postAddRequisicion(dataIn));
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
                    titleSuccess: "Requisicion Agregada exitosamente"
                }, 
                titles: {
                    modalHeader: { color: "info", title: "Datos del Nuevo Puesto" },
                    btnSubmit: "Agregar"
                },
                function: {
                    reset: resetAddRequisicionFlag,
                    succes: onCreateClick,
                    closed: onCloseClick,
                    dispatx: (slices, dispatx) => {
                        if(slices.Catalogos)
                          dispatx(onGetRequisicionesCatalogos({ RowsByPage: 100 }));
                    }
                }
              }
		};
	}, [isLayoutReady]);
    
    if(!formConfig)
        return null;

    return <FormFrontApi config={formConfig} />;
};

export default NewModal;