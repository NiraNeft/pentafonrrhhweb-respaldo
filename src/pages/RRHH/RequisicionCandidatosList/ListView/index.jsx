import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Nav,
  NavItem,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalBody,
  Label,
  Button,
  NavLink
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { ToastContainer } from 'react-toastify';
import { jobCandidates } from "../../../../common/data/appsJobs";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import SinInformacion from "../../../../Components/Common/SinInformacion";
import Pagination from "../../../../Components/Common/Pagination";

import {
  AppId,
  Name,
  Designation,
  Contact,
  Status,
  Type,
} from "./RequisicionCol";

// Modals
import DeleteModal from "./Modals/DeleteModal";
import OverviewModal from "./Modals/OverviewModal";

import EvaluarModal from "../Common/EvaluarModal";
import LlamarModal from "../Common/LlamarModal";
import RevisarModal from "../Common/RevisarModal";
import TableContainer from "../../../../Components/Common/TableContainer";

import {
  getRequisicionesList as onGetRequisicionesList,
} from "../../../../slices/thunks";
import { createSelector } from "reselect";

import MultiUser from "../../../../assets/images/users/multi-user.jpg";

const RequisicionCandidatosList = () => {
  document.title = "Vista de lista de candidatos| Pentafon";
  const dispatch = useDispatch();

  // Catalogos
  const option = [
    {
      options: [
        { label: "Nuevos", value: "New" },
        { label: "Pendiente", value: "Pending" },
      ],
    },
  ];

  const option1 = [
    {
      options: [
        { label: "Filtro 1", value: "Full Time" },
        { label: "Filtro 2", value: "Part Time" },
      ],
    },
  ];
  
  const selectDashboardData = createSelector(
      (state) => state.Requisiciones,
      (Requisiciones) => Requisiciones.requisicionesLists
  );

  // Inside your component
  const requisicionesLists = useSelector(selectDashboardData);

  //pagination
  const setCurrentPage = (currentPage) => {
      dispatch(onGetRequisicionesList({Page: currentPage}));
  }

  const setRowsByPage = () => {
    if(requisicionesLists)
      dispatch(onGetRequisicionesList({ RowsByPage: 10 }));
  }

  useEffect(() => {
    setRowsByPage();
  }, [dispatch]);

  useEffect(() => {
    if(!requisicionesLists)
      dispatch(onGetRequisicionesList({ RowsByPage: 10 }));
  }, [requisicionesLists]);

  // Delete Requisicion
  const [requisicionFocus, setRequisicionFocus] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [overviewModal, setOverviewModal] = useState(false);

  // Overview
  const onClickOverview = (requisicionFocus) => {
    setRequisicionFocus(requisicionFocus);
    setOverviewModal(true);
  };

  // delete
  const onClickDelete = (requisicionFocus) => {
      setRequisicionFocus(requisicionFocus);
      setDeleteModal(true);
  };

  const handleDeleteProjectList = () => {
      if (requisicionFocus) {
          setDeleteModal(false);
          setRowsByPage();
          setRequisicionFocus(null);
      }
  };
  
  // Extras borrar
  const [evaluarModal, setEvaluarModal] = useState(false);
  const [llamarModal, setLlamarModal] = useState(false);
  const [revisarModal, setRevisarModal] = useState(false);

  //
  const onClickEvaluar = (order) => {
    setEvaluarModal(true);
  };

  const OnchangeHandler = (e) => {
    let search = e.target.value;
    if (search) {
      /*setCandidateData(
        jobCandidates.filter((data) =>
          Object.values(data).some(
            (field) =>
              typeof field === 'string' &&
              field.toLowerCase().includes(search?.toLowerCase()),
          )
        )
      )*/
    }
  }

  // Action
  const hadleApplicationClicks = () => {
    //setApplication("");
  };
  
  const columns = useMemo(
    () => [
      {
        header: "Acción",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to={'#' + cell.row.original.Id }
                onClick={() => {
                  const data = cell.row.original;
                  onClickOverview(data);
                }}
                className="text-primary d-inline-block"
              >
                <i className="ri-eye-fill fs-16"></i>
              </Link>
              <Link
                to={'/job-requisicion-lists/edit?id=' + cell.row.original.Id }
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const orderData = cell.row.original;
                  onClickDelete(orderData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              </Link>
            </div>
          );
        },
      },
      
      {
        header: "Cliente",
        accessorKey: "Cliente",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "TipoServicio",
        accessorKey: "TipoServicio",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "TipoPerfil",
        accessorKey: "TipoPerfil",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "Puesto",
        accessorKey: "Puesto",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "VacantesSolicitadas",
        accessorKey: "VacantesSolicitadas",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "EstadoRequisicion",
        accessorKey: "EstadoRequisicion",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "FechaCreacion",
        accessorKey: "FechaCreacion",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      
      
      /*
      {
        header: "Habilitar Facebook",
        cell: (cell) => {
          return <input type="checkbox" className="orderCheckBox form-check-input" value={cell.getValue()} />;
        },
        id: '#',
        accessorKey: "_id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Vacante",
        accessorKey: "Vacante",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Area",
        accessorKey: "Area",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Entrega Capacitacion",
        accessorKey: "FechaCapacitacion",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Entrega Operacion",
        accessorKey: "Hora_Fin_Domingo",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Turno",
        accessorKey: "Turno",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Jornada",
        accessorKey: "Jornada",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Lun",
        accessorKey: "Lunes",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Mar",
        accessorKey: "Martes",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Mie",
        accessorKey: "Miercoles",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Jue",
        accessorKey: "Jueves",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Vie",
        accessorKey: "Viernes",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Sab",
        accessorKey: "Sabado",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Dom",
        accessorKey: "Domingo",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Salario",
        accessorKey: "Salario",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Bono",
        accessorKey: "Bono",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Cantidad",
        accessorKey: "CantidadCandidatos",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Fecha Requisicion",
        accessorKey: "Fecha_Creacion",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Numero Seleccionados",
        accessorKey: "Seleccionados",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Numero Ingresos Capacitacion",
        accessorKey: "IngresosCapa",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Numero Ingresos Operacion",
        accessorKey: "IngresosOp",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },*/
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
          <ToastContainer closeButton={false} />
          
          {deleteModal ? (
              <DeleteModal
                  show={deleteModal}
                  requisicion={requisicionFocus}
                  onDeleteClick={() => handleDeleteProjectList()}
                  onCloseClick={() => setDeleteModal(false)}
              />
          ) : null}
          
          {overviewModal ? (
            <OverviewModal
                show={overviewModal}
                itemModal={requisicionFocus}
                onCloseClick={() => setOverviewModal(false)}
            />
          ) : null}
        
        <EvaluarModal
            show={evaluarModal}
            onCloseClick={() => setEvaluarModal(false)}
          />
        <LlamarModal
            show={llamarModal}
            onCloseClick={() => setLlamarModal(false)}
          />
        <RevisarModal
            show={revisarModal}
            onCloseClick={() => setRevisarModal(false)}
          />

        <Container fluid>
          <BreadCrumb title="Requisiciones" pageTitle="A y S Personal" />
          <Row>
            <Col>
              <Card>
                <CardHeader className="border-0">
                  <div className="d-md-flex align-items-center">
                    <h5 className="card-title mb-3 mb-md-0 flex-grow-1">
                      Recursos Humanos
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-1 flex-wrap">
                        <Link
                            to="/job-requisicion-new"
                            className="btn btn-success">
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Nueva Requisición
                        </Link>
                        <Button className="d-none" color="secondary" type="button">
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Import
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="d-none border border-dashed border-end-0 border-start-0">
                  <Form>
                    <Row className="g-3">
                      <Col xxl={5} sm={6}>
                        <div className="search-box">
                          <Input
                            type="text"
                            className="form-control search"
                            placeholder="Search for application ID, company, designation status or something..."
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col xxl={2} sm={6}>
                        <div>
                          <Flatpickr
                            className="form-control"
                            id="datepicker-publish-input"
                            placeholder="Select date"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              mode: "multiple",
                              dateFormat: "d.m.y",
                            }}
                          />
                        </div>
                      </Col>
                      <Col xxl={2} sm={4}>
                        <div>
                          <Select
                            options={option}
                            isClearable={true}
                            name="choices-single-default"
                            id="idStatus"
                          ></Select>
                        </div>
                      </Col>
                      <Col xxl={2} sm={4}>
                        <div>
                          <Select
                            options={option1}
                            isClearable={true}
                            name="choices-single-default"
                            id="idType"
                          ></Select>
                        </div>
                      </Col>
                      <Col xxl={1} sm={4}>
                        <div>
                          <Button
                            type="button"
                            color="success"
                            className="btn w-100"
                          // onclick=""
                          >
                            {" "}
                            <i className="ri-equalizer-fill me-1 align-bottom"></i>
                            Filters
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardBody className="pt-0">
                  <div>
                    <Nav
                      className="d-none nav nav-tabs nav-tabs-custom nav-success mb-3"
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          className="active All py-3"
                          data-bs-toggle="tab"
                          id="All"
                          to="#"
                          role="tab"
                          aria-selected="true"
                        >
                          Todos los candidatos
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className="py-3 New"
                          data-bs-toggle="tab"
                          id="New"
                          to="#"
                          role="tab"
                          aria-selected="false"
                        >
                          Nuevos
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className="py-3 Pending"
                          data-bs-toggle="tab"
                          id="Pending"
                          to="#"
                          role="tab"
                          aria-selected="false"
                        >
                          Pendiente{" "}
                          <span className="badge bg-danger align-middle ms-1">
                            2
                          </span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                    { requisicionesLists.items ? <TableContainer
                      columns={columns}
                      data={requisicionesLists.items || []}
                      pagination={requisicionesLists.pagination || []}
                      setCurrentPage={setCurrentPage}
                      hadleApplicationClick={hadleApplicationClicks}
                      customPageSize={10}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light text-muted"
                    /> : <SinInformacion subtitle="Sin informacion" /> }
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RequisicionCandidatosList;
