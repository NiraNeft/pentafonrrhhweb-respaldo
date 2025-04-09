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
                        <tbody id={props.id + "-newlink"}>
                            {((validation.initialValues[props.id] || []).map((lmn, kln) => (
                                <tr key={kln} id={kln} className="product">
                                    <th scope="row" className="product-id">
                                        {kln+1}
                                    </th>
                                    {(props.options || []).map((e, k) => (
                                        <td key={k} className="text-start p-1">
                                            {lmn[e.defaultValue]}
                                        </td>
                                    ))}
                                </tr>
                            )))}
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

export const LbTableInput = FileInput;