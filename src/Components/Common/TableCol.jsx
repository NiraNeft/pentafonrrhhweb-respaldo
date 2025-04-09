import React from "react";
import { NavLink } from "react-router-dom";

const AppId = (cell) => {
  return (
    <NavLink to="#" className="text-body fw-bold">
      {cell.getValue() ? cell.getValue() < 10 ? ("0" + cell.getValue()) : cell.getValue() : ""}
    </NavLink>
  );
};
const NombreLista = (cell) => {
  const data = cell.row.original;
  const activo=(data.estatus != 5);
  return (
    <>
      <NavLink to="#" className="text-body fw-bold">
        {cell.getValue() ? cell.getValue() < 10 ? ("0" + cell.getValue()) : cell.getValue() : ""}
      </NavLink>
      <div>{!activo ? <span className={"badge bg-danger-subtle text-danger"}>Desactivo</span> : null}</div>
    </>
  );
};
const Name = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};
const LabelCol = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};
const HTMLCol = (cell) => {
  const markup = { __html: cell.getValue() };
  return <React.Fragment><div dangerouslySetInnerHTML={markup}></div></React.Fragment>;
};

const AplicaCampo = (cell) => {
  return <React.Fragment>
      {cell.getValue() === 1 ? (
        <span className="badge bg-info-subtle text-success text-uppercase">
          Si
        </span>
      ) : cell.getValue() === 2 ? (
        <span className="badge bg-muted-subtle text-muted text-uppercase">
          -
        </span>
      ) : null}
  </React.Fragment>;
};

const Status = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "New" ? (
        <span className="badge bg-info-subtle text-info text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "Rejected" ? (
        <span className="badge bg-danger-subtle text-danger text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "Pending" ? (
        <span className="badge bg-warning-subtle text-warning text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "Approved" ? (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {cell.getValue()}
        </span>
      ) : null}
    </React.Fragment>
  );
};

export { AppId, NombreLista, Name, AplicaCampo, Status, LabelCol, HTMLCol };
