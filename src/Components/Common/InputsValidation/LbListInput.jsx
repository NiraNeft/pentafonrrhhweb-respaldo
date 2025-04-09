import React, { useState, useEffect } from "react";
import Cleave from "cleave.js/react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import { ValidationApi } from './ValidationApi';

const InputForm = (props) => {
    return (
        <div className="mb-3">
            <p className="mb-2 text-uppercase fw-medium">{props.label} <span className="text-danger">{props.labelDanger}</span></p>
            <ul className="list-group">
            {(props.options || []).map((item, index) => {
                return (
                    <li key={index} className="list-group-item">
                        {index+1}. {item.label}
                    </li>
                );
            })}
            </ul>
        </div>
    );
}

export const LbListInput = InputForm;