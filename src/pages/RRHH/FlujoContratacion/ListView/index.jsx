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
  NombreLista,
  Name,
  AplicaCampo,
  HTMLCol,
} from "../../../../Components/Common/TableCol";

// Modals
import DeleteModal from "./Modals/DeleteModal";
import OverviewModal from "./Modals/OverviewModal";

import TableContainer from "../../../../Components/Common/TableContainer";

import {
  getFlujoContratacionList as onGetFlujoContratacionList,
} from "../../../../slices/thunks";
import { createSelector } from "reselect";

import MultiUser from "../../../../assets/images/users/multi-user.jpg";

const FlujoContratacionList = () => {
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
      (state) => state.FlujoContratacion,
      (FlujoContratacion) => FlujoContratacion.flujoContratacionLists
  );

  // Inside your component
  const flujoContratacionLists = useSelector(selectDashboardData);

  //pagination
  const setCurrentPage = (currentPage) => {
      dispatch(onGetFlujoContratacionList({Page: currentPage}));
  }

  const setRowsByPage = () => {
    if(flujoContratacionLists)
      dispatch(onGetFlujoContratacionList({ RowsByPage: 10 }));
  }

  useEffect(() => {
    setRowsByPage();
  }, [dispatch]);

  useEffect(() => {
      //set Project(flujoContratacionLists);
      /*if(flujoContratacionLists.pagination){
          //setPagination(flujoContratacionLists.pagination.actualPage);
      }*/
    if(!flujoContratacionLists)
      dispatch(onGetFlujoContratacionList({ RowsByPage: 10 }));
  }, [flujoContratacionLists]);

  // Delete FlujoContratacion
  const [flujoContratacionFocus, setFlujoContratacionFocus] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [overviewModal, setOverviewModal] = useState(false);

  // Overview
  const onClickOverview = (flujoContratacionFocus) => {
    setFlujoContratacionFocus(flujoContratacionFocus);
    setOverviewModal(true);
  };

  // delete
  const onClickDelete = (flujoContratacionFocus) => {
      setFlujoContratacionFocus(flujoContratacionFocus);
      setDeleteModal(true);
  };

  const handleDeleteProjectList = () => {
      if (flujoContratacionFocus) {
          setDeleteModal(false);
          setRowsByPage();
          setFlujoContratacionFocus(null);
      }
  };

  // Update
  
  const handleUpdateProjectList = () => {
      if (flujoContratacionFocus) {
        setOverviewModal(false);
          setRowsByPage();
          setFlujoContratacionFocus(null);
      }
  };

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
                to="#"
                onClick={() => {
                  const data = cell.row.original;
                  onClickOverview(data);
                }}
                className="text-primary d-inline-block"
              >
                <i className="ri-eye-fill fs-16"></i>
              </Link>
              <Link
                to={'/job-flow-lists/edit?id=' + cell.row.original.id }
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
        header: "Nombre",
        accessorKey: "nombre",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "Descripcion",
        accessorKey: "descripcion",
        enableColumnFilter: false,
        cell: (cell) => {
          return <HTMLCol {...cell} />;
        },
      },
      {
        header: "Fecha_Creacion",
        accessorKey: "fecha_Creacion",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "Fecha_Modificacion",
        accessorKey: "fecha_Modificacion",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "Creado_Nombre",
        accessorKey: "creado_Nombre",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
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
                  itemModal={flujoContratacionFocus}
                  onDeleteClick={() => handleDeleteProjectList()}
                  onCloseClick={() => setDeleteModal(false)}
              />
          ) : null}
          
          {overviewModal ? (
            <OverviewModal
                show={overviewModal}
                itemModal={flujoContratacionFocus}
                onCloseClick={() => setOverviewModal(false)}
            />
          ) : null}

        <Container fluid>
          <BreadCrumb title="Flujo de Contratacion" pageTitle="A y S Personal" />
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
                            to="/job-flow-new"
                            className="btn btn-success">
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Nuevo Flujo de Contratacion
                        </Link>
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
                <CardBody className="pt-0 mt-2">
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
                    
                    { flujoContratacionLists.items ? <TableContainer
                      columns={columns}
                      data={flujoContratacionLists.items || []}
                      pagination={flujoContratacionLists.pagination || []}
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

export default FlujoContratacionList;
