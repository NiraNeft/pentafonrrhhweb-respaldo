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
import Pagination from "../../../../Components/Common/Pagination";

import {
  AppId,
  Designation,
  Contact,
  Status,
  Type,
} from "./CandidatoCol";

// Modals
import NewModal from "./Modals/NewModal";
import DeleteModal from "./Modals/DeleteModal";
import UpdateModal from "./Modals/UpdateModal";
import VerVacantesModal from "./Modals/VerVacantesModal";

import EvaluarModal from "../Common/EvaluarModal";
import LlamarModal from "../Common/LlamarModal";
import RevisarModal from "../Common/RevisarModal";
import TableContainer from "./TableContainer";

import {
  getAspirantesList as onGetAspirantesList,
} from "../../../../slices/thunks";
import { createSelector } from "reselect";

import MultiUser from "../../../../assets/images/users/multi-user.jpg";

const CandidateList = () => {
  document.title = "Vista de lista de candidatos| Pentafon";
  const dispatch = useDispatch();

  // Catalogos
  const option = [
    {
      options: [
        { label: "Estatus", value: "Status" },
        { label: "Aprobado", value: "Approved" },
        { label: "Nuevos", value: "New" },
        { label: "Pendiente", value: "Pending" },
        { label: "Con Cita", value: "Rejected" },
      ],
    },
  ];

  const option1 = [
    {
      options: [
        { label: "Select Options", value: "Select Options" },
        { label: "Filtro 1", value: "Full Time" },
        { label: "Filtro 2", value: "Part Time" },
      ],
    },
  ];
  
  const selectDashboardData = createSelector(
      (state) => state.Aspirantes,
      (Aspirantes) => Aspirantes.aspirantesLists
  );

  // Inside your component
  const aspirantesLists = useSelector(selectDashboardData);

  //pagination
  const setCurrentPage = (currentPage) => {
      dispatch(onGetAspirantesList({Page: currentPage}));
  }

  const setRowsByPage = () => {
    if(aspirantesLists)
      dispatch(onGetAspirantesList({ RowsByPage: 100 }));
  }

  useEffect(() => {
    setRowsByPage();
  }, [dispatch]);

  useEffect(() => {
      //set Project(aspirantesLists);
      /*if(aspirantesLists.pagination){
          //setPagination(aspirantesLists.pagination.actualPage);
      }*/
  }, [aspirantesLists]);

  // Create Aspirante
  const [newModal, setShownewModal] = useState(false);
  const handleMdlNewAspiranteCreate = () => {
      setShownewModal(false);
      setRowsByPage();
  };
  const handleMdlNewAspiranteShow = () => setShownewModal(true);

  // Vacantes Disponibles
  const [verVacantes, setVerVacantes] = useState(false);
  const handleMdlVerVacantesCreate = () => {
    setVerVacantes(false);
    setRowsByPage();
  };
  const handleMdlVerVacantesShow = () => setVerVacantes(true);

  // Delete Aspirante
  const [aspiranteFocus, setAspiranteFocus] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // delete
  const onClickDelete = (aspiranteFocus) => {
      setAspiranteFocus(aspiranteFocus);
      setDeleteModal(true);
  };

  const handleDeleteProjectList = () => {
      if (aspiranteFocus) {
          setDeleteModal(false);
          setRowsByPage();
          setAspiranteFocus(null);
      }
  };

  // Update
  const onClickUpdate = (aspiranteFocus) => {
      setAspiranteFocus(aspiranteFocus);
      setUpdateModal(true);
  };

  const handleUpdateProjectList = () => {
      if (aspiranteFocus) {
          setUpdateModal(false);
          setRowsByPage();
          setAspiranteFocus(null);
      }
  };
  
  // Extras borrar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [evaluarModal, setEvaluarModal] = useState(false);
  const [llamarModal, setLlamarModal] = useState(false);
  const [revisarModal, setRevisarModal] = useState(false);

  //
  const onClickEvaluar = (item) => {
    setEvaluarModal(true);
  };

  const onClickLlamar = (item) => {
    setLlamarModal(true);
  };

  const onClickRevisar = (item) => {
    setRevisarModal(true);
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
                to={'/job-candidate-lists/overview-candidate?Candidato=' + cell.row.original.Id }
                className="text-primary d-inline-block"
              >
                <i className="ri-eye-fill fs-16"></i>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  const data = cell.row.original;
                  onClickUpdate(data);
                }}
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
        header: "Fecha",
        accessorKey: "Fecha_Creacion",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Designation {...cell} />;
        },
      },
      {
        header: "CandidatoID",
        accessorKey: "Id",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Designation {...cell} />;
        },
      },
      {
        header: "Apellido Paterno",
        accessorKey: "Apellido_Paterno",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Designation {...cell} />;
        },
      },
      {
        header: "Apellido Materno",
        accessorKey: "Apellido_Materno",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Designation {...cell} />;
        },
      },
      {
        header: "Nombre",
        accessorKey: "Nombre",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <img
                  src={cell.getValue()}
                  alt=""
                  className="avatar-xxs rounded-circle image_src object-fit-cover"
                />
              </div>
              <div className="flex-grow-1 ms-2 ">
                {cell.getValue()}
              </div>
            </div>
          </>
        ),
      },
      {
        header: "Fecha de Nacimiento",
        accessorKey: "Fecha_Nacimiento",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Designation {...cell} />;
        },
      },
      {
        header: "Prueba Ortografía",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex gap-3 center">
              <Link
                to="#"
                className="btn btn-sm btn-danger"
                onClick={() => {
                  const orderData = cell.row.original;
                  onClickEvaluar(orderData);
                }}
              >
                <span className="badge">0</span>
              </Link>
            </div>
          );
        },
      },
      {
        header: "Prueba Conocimientos Pc",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex gap-3 center">
              <Link
                to="#"
                className="btn btn-sm btn-info"
                onClick={() => {
                  const orderData = cell.row.original;
                  onClickLlamar(orderData);
                }}
              >
                <span className="badge">0</span>
              </Link>
            </div>
          );
        },
      },
      {
        header: "Evaluacion Final",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex gap-3 center">
              <Link
                to="#"
                className="btn btn-sm btn-warning"
                onClick={() => {
                  const orderData = cell.row.original;
                  onClickRevisar(orderData);
                }}
              >
                <span className="badge">-</span>
              </Link>
            </div>
          );
        },
      },
      {
        header: "Grabacion",
        enableColumnFilter: false,
        cell: (cell) => <></>,
      },
      {
        header: "Estatus Aspirante",
        accessorKey: "Estatus",
        enableColumnFilter: false,
        cell: (cell) => {
          return <>Viable<Status {...cell} /></>;
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
          <ToastContainer closeButton={false} />
          
          {newModal ? (
              <NewModal
                  show={newModal}
                  onCreateClick={() => handleMdlNewAspiranteCreate()}
                  onCloseClick={() => setShownewModal(false)}
              />
          ) : null}
          
          {deleteModal ? (
              <DeleteModal
                  show={deleteModal}
                  aspirante={aspiranteFocus}
                  onDeleteClick={() => handleDeleteProjectList()}
                  onCloseClick={() => setDeleteModal(false)}
              />
          ) : null}
          
          {updateModal ? (
              <UpdateModal
                  show={updateModal}
                  aspirante={aspiranteFocus}
                  onUpdateClick={() => handleUpdateProjectList()}
                  onCloseClick={() => setUpdateModal(false)}
              />
          ) : null}
          
          {verVacantes ? (
              <VerVacantesModal
                  show={verVacantes}
                  aspirante={aspiranteFocus}
                  onUpdateClick={() => handleUpdateProjectList()}
                  onCloseClick={() => setUpdateModal(false)}
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
          <BreadCrumb title="Empleos" pageTitle="A y S Personal" />
          <Row>
            <Col>
              <Card>
                <CardHeader className="border-0">
                  <div className="d-md-flex align-items-center">
                    <h5 className="card-title mb-3 mb-md-0 flex-grow-1">
                      Agregar Candidato
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-1 flex-wrap">
                        <Button
                          color="info"
                          type="button"
                          className="add-btn"
                          data-bs-toggle="modal"
                          id="create-btn"
                          onClick={handleMdlNewAspiranteShow}>
                          <i className=" ri-search-2-line align-bottom me-1"></i>{" "}
                          Vacantes Disponibles
                        </Button>
                        <Button
                          color="success"
                          type="button"
                          className="add-btn"
                          data-bs-toggle="modal"
                          id="create-btn"
                          onClick={handleMdlNewAspiranteShow}>
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Nuevo Candidato
                        </Button>
                        <Button color="secondary" type="button">
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Import
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="border border-dashed border-end-0 border-start-0">
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
                            name="choices-single-default"
                            id="idStatus"
                          ></Select>
                        </div>
                      </Col>
                      <Col xxl={2} sm={4}>
                        <div>
                          <Select
                            options={option1}
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
                      className="nav nav-tabs nav-tabs-custom nav-success mb-3"
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
                      <NavItem>
                        <NavLink
                          className="py-3 Approved"
                          data-bs-toggle="tab"
                          id="Approved"
                          to="#"
                          role="tab"
                          aria-selected="false"
                        >
                          Aprobado
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className="py-3 Rejected"
                          data-bs-toggle="tab"
                          id="Rejected"
                          to="#"
                          role="tab"
                          aria-selected="false"
                        >
                          Con Cita
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TableContainer
                      columns={columns}
                      data={aspirantesLists.items || []}
                      hadleApplicationClick={hadleApplicationClicks}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light text-muted"
                    />
                  </div>
                  <div
                    className="modal fade"
                    id="showModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <Modal
                        isOpen={show}
                        toggle={handleClose}
                        centered={true}
                        className="modal-content"
                      >
                        <Form action="#" autoComplete="off" className="tablelist-form">
                          <ModalBody className="modal-body">
                            <Input type="hidden" id="id-field" />

                            <div className="mb-3 d-none" id="modal-id">
                              <Label
                                htmlFor="applicationId"
                                className="form-label"
                              >
                                ID
                              </Label>
                              <Input
                                type="text"
                                id="applicationId"
                                className="form-control"
                                placeholder="ID"
                                readOnly
                              />
                            </div>

                            <div className="text-center">
                              <div className="position-relative d-inline-block">
                                <div className="position-absolute  bottom-0 end-0">
                                  <Label
                                    htmlFor="companylogo-image-input"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select Image"
                                  >
                                    <div className="avatar-xs cursor-pointer">
                                      <div className="avatar-title bg-light border rounded-circle text-muted">
                                        <i className="ri-image-fill"></i>
                                      </div>
                                    </div>
                                  </Label>
                                  <Input
                                    className="form-control d-none"
                                    id="companylogo-image-input"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                  />
                                </div>
                                <div className="avatar-lg p-1">
                                  <div className="avatar-title bg-light rounded-circle">
                                    <img
                                      src={MultiUser}
                                      id="companylogo-img"
                                      className="avatar-md h-auto rounded-circle object-fit-cover"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mb-3">
                              <Label
                                htmlFor="company-field"
                                className="form-label"
                              >
                                Company
                              </Label>
                              <Input
                                type="text"
                                id="company-field"
                                className="form-control"
                                placeholder="Enter company name"
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <Label
                                htmlFor="designation-field"
                                className="form-label"
                              >
                                Designation
                              </Label>
                              <Input
                                type="text"
                                id="designation-field"
                                className="form-control"
                                placeholder="Enter designation"
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <Label
                                htmlFor="date-field"
                                className="form-label"
                              >
                                Apply Date
                              </Label>
                              <Input
                                type="date"
                                id="date-field"
                                className="form-control"
                                data-provider="flatpickr"
                                data-date-format="d M, Y"
                                required
                                placeholder="Select date"
                              />
                            </div>

                            <div className="mb-3">
                              <Label
                                htmlFor="contact-field"
                                className="form-label"
                              >
                                Contacts
                              </Label>
                              <Input
                                type="text"
                                id="contact-field"
                                className="form-control"
                                placeholder="Enter contact"
                                required
                              />
                            </div>

                            <div className="gy-4 mb-3">
                              <div className="col-md-6">
                                <div>
                                  <Label
                                    htmlFor="status-input"
                                    className="form-label"
                                  >
                                    Status
                                  </Label>
                                  <Select
                                    className="form-control"
                                    data-trigger
                                    name="status-input"
                                    id="status-input"
                                  >
                                    <option value="">Status</option>
                                    <option value="Approved">Approved</option>
                                    <option value="New">New</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Rejected">Rejected</option>
                                  </Select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div>
                                  <Label
                                    htmlFor="type-input"
                                    className="form-label"
                                  >
                                    Type
                                  </Label>
                                  <Select
                                    className="form-control"
                                    data-trigger
                                    name="type-input"
                                    id="type-input"
                                  >
                                    <option value="">Select Type</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </ModalBody>
                          <div className="modal-footer">
                            <div className="hstack gap-2 justify-content-end">
                              <Button
                                type="button"
                                className="btn btn-light"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </Button>
                              <Button
                                color="success"
                                type="submit"
                                id="add-btn"
                              >
                                Add
                              </Button>
                              <Button
                                color="success"
                                type="button"
                                id="edit-btn"
                              >
                                Update
                              </Button>
                            </div>
                          </div>
                        </Form>
                      </Modal>
                    </div>
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

export default CandidateList;
