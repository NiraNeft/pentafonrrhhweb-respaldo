import React, { useState, useEffect } from "react";
import { 
    Row, Col, CardBody, Card, Alert, Container, Input, Label,
    Table,
    Form,
    FormFeedback
} from "reactstrap";
import { ValidationApi } from './ValidationApi';
import { Link, useNavigate } from "react-router-dom";

const FileInput = (props) => {
    const { validation, registrationError, listen } = props;
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi(props);
    let className = "btn-group flex-wrap";
    let valueActual = validation.values[props.id];

    if (isInvalidForm || isErrorApi) {
        className += " form-control is-invalid ";
    }

    const [isObjArray, setisObjArray] = useState([]);

    const handlerChange = (newArray) => {
        setisObjArray(newArray);
        if(validation)
            validation.setFieldValue(props.id, newArray);
        else
            listen.setFieldValue(props.id, newArray);
    }

    const addItem = (defaultValues) => {
        let newObj = addListItem(defaultValues);
        handlerChange(newObj);
    }

    const addListItem = (defaultValues) => {
        let newObj = {};
        (props.options || []).map((e, k) => {
            let vl = "";
            if(defaultValues && defaultValues[e.id]){
                vl = defaultValues[e.id];
            }
            newObj[e.id] = vl;
        })
        return([...isObjArray, newObj]);
    }

    const handlerChangeTextarea = (e, kln, id) => {
        let val = e.target.value;
        const newObjArray = [...isObjArray];
        newObjArray[kln][id] = val;
        handlerChange(newObjArray);
    }

    const handlerDeleteTextarea = (kln) => {
        const newObjArray = [...isObjArray];
        newObjArray.splice(kln, 1);
        handlerChange(newObjArray);
    }
        
    // Actualizacion en la informacion
    useEffect(() => {
        if(props.defaultValue && props.defaultValue.length > 0){
            let newObj = [];
            props.defaultValue.map((e) => {
                let vl = addListItem(e);
                newObj.push(vl[0]);
            });
            handlerChange(newObj);
        } else if(props.defaultValue == null){
            addItem();
        }
    }, []);

    return (
        validation ? (
            <div className="mb-3">
                <p className="form-label">{props.label}<span className="text-danger"></span></p>

                <div className="table-responsive">
                    <Table className="invoice-table table-borderless table-nowrap mb-0">
                        <thead className="align-middle">
                            <tr className="table-active">
                                <th scope="col" style={{ width: "50px" }}>
                                    #
                                </th>
                                {(props.options || []).map((e, k) => (
                                    <th key={k} scope="col">{e.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody id="newlink">
                            {(isObjArray.map((lmn, kln) => (
                                <tr key={kln} id={kln} className="product">
                                    <th scope="row" className="product-id">
                                        {kln+1}
                                        <Link to="#" className="btn btn-link text-danger"
                                            onClick={() => handlerDeleteTextarea(kln)}>
                                            <i className="ri-delete-bin-line align-bottom"></i> 
                                        </Link>
                                    </th>
                                    {(props.options || []).map((e, k) => (
                                        <td key={k} className="text-start p-1">
                                            <Input
                                                type="textarea"
                                                className="form-control bg-light border-0"
                                                id={props.id + "-" + k}
                                                rows={3}
                                                onChange={(txt) => handlerChangeTextarea(txt, kln, e.id)}
                                                value={isObjArray[kln][e.id]}
                                            ></Input>
                                        </td>
                                    ))}
                                </tr>
                            )))}
                        </tbody>
                        <tbody>
                            <tr id="newForm" style={{ display: "none" }}><td className="d-none" colSpan={5}><p>Add New Form</p></td></tr>
                            <tr>
                                <td colSpan={5}>
                                    <Link
                                        to="#"
                                        className="btn btn-soft-secondary fw-medium"
                                        onClick={() => addItem()}>
                                        <i className="ri-add-fill me-1 align-bottom"></i>{" "}
                                        Agregar
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {Feedback}
            </div>
        ) : (
            <div className="mb-3">

            </div>
        )
    );
}

export const TableInput = FileInput;