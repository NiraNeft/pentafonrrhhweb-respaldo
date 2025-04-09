import React, { useState, useEffect } from "react";
import Cleave from "cleave.js/react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, CardHeader } from "reactstrap";
import { ValidationApi } from './ValidationApi';
import { Link, useNavigate } from "react-router-dom";
import { TipoKanInputEnum } from "../../../enums/TipoKanInputEnum";

import SimpleBar from "simplebar-react"

const InputForm = (props) => {
    const selectedParams = [];
    return (
        <div className="mb-3">
            <Card className="border card-border-dark pall-2">
                <CardHeader>
                    <h5 className="mb-2 text-uppercase fw-medium">{props.label} <span className="text-danger">{props.labelDanger}</span></h5>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="tasks-board p-3 d-flex body-bg" id={props.id}>
                        {(props.options || []).map((line, colIndx) => {
                            return (
                                // header line
                                <div className="tasks-list" key={line.id}>
                                    <div className="d-flex mb-3">
                                        <div className="flex-grow-1">
                                            <h6 className="fs-14 text-uppercase fw-semibold mb-0">
                                                {line.label} 
                                            </h6>
                                        </div>
                                    </div>
                                    {/* data */}
                                    <SimpleBar className="tasks-wrapper px-3 mx-n3">
                                        <div id="unassigned-task" className={line.values === "object" ? "tasks" : "tasks noTask"}>
                                            <div id={line.id}>
                                                {line.values.map((card, index) => {
                                                    return (
                                                        <div key={card.id} id={index}>
                                                        {
                                                            card.multiple == 2 
                                                                ? <DivCardList 
                                                                    idCard={line.name + "-task"}
                                                                    numberCard={(index+1) + ")"}
                                                                    colName={"lst" + colIndx + "-" + index}
                                                                    card={card}
                                                                    selectedValues={card.gruposValues} />
                                                                : <BtnAddList
                                                                    card={card}
                                                                    selectedParams={card.gruposValues} />
                                                        }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </SimpleBar>
                                </div>
                            )
                        })}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
const DivCardList = ({ idCard, numberCard, card }) =>{
    return (<div
        // className="card task-list"
        className="pb-1 task-list"
        id={idCard+ "-task"}>
        <div className="card task-box mb-1">
            <CardBody>
                <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1 ">{card.cardId}</Link>
                {card.label  && card.label != "" ? <div className="mb-3">
                    <h6 className="fs-15 mb-0 flex-grow-1 text-truncate task-title">
                        <Link to="#" className="d-block">
                            {numberCard + card.label}
                        </Link>
                    </h6>
                </div> : null}

                <ul className=" ps-1 list-unstyled vstack mb-0">
                    {card.gruposValues.map((gp, i) => (
                        gp.selectValues.map((detail, indx) => {
                            return (<li key={indx}>
                                <div className="form-check">
                                    <Label className="form-check-label">
                                    {indx+1}. {detail.label}
                                    </Label>
                                </div>
                            </li>)
                        })
                    ))}
                </ul>
            </CardBody>
        </div>
    </div>);
}

const BtnAddList = ({ card, selectedParams }) => {
    return (<div className="my-2 mt-0">
        {(selectedParams || []).map((e, index) => <ParamCardList 
            key={index} 
            item={e}
            numberCard={card.label + ": #" + (index+1) + ""}/>)}
    </div>);
}

const ParamCardList = ({ item, numberCard }) =>{
    return (<div
        // className="card task-list"
        className="pb-1 task-list">
        <div className="card task-box mb-1">
            <CardBody>
                <div className="mb-1">
                    <h6 className="fs-15 mb-0 flex-grow-1 text-truncate task-title">
                        <Link to="#" className="d-block">
                            {numberCard}
                        </Link>
                    </h6>
                </div> 
                <ul className="fs-14 ps-1 list-group vstack mb-0">
                    {item.selectValues.map((detail, indx) => {
                        if(!detail.value) return null;
                        let lb = detail.label, lbS = "";
                        switch(detail.tipoInput){
                            case TipoKanInputEnum.SELECT:
                                lb = lb + ": ";
                                lbS = detail.parametros.label;
                                break;

                            case TipoKanInputEnum.CHECKBOX:
                                lb = "" + lb; //✅ 
                                break;
                        }
                        return (<li key={indx} className="list-group-item">
                            <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                            {lb}
                            <b>{lbS}</b>
                        </li>)
                    })}
                </ul>
            </CardBody>
        </div>
    </div>);
}

export const LbKabbanInput = InputForm;