import React, { useState, useMemo, useEffect, useCallback } from "react";
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
  NavLink,
  UncontrolledDropdown,
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle,
  ModalHeader,
  FormFeedback
} from "reactstrap";
import SimpleBar from 'simplebar-react';
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

import EvaluarModal from "../Common/EvaluarModal";
import LlamarModal from "../Common/LlamarModal";
import RevisarModal from "../Common/RevisarModal";
import TableContainer from "./TableContainer";

import {
  getAspirantesList as onGetAspirantesList,
  getFolders as onGetFolders,
  updateFolder as onupdateFolder,
  deleteFolder as onDeleteFolder,
  addNewFolder as onAddNewFolder,
  getFiles as onGetFiles,
  updateFile as onupdateFile,
  deleteFile as onDeleteFile,
  addNewFile as onAddNewFile
} from "../../../../slices/thunks";
import { createSelector } from "reselect";

// Formik
import * as  Yup from "yup";
import { useFormik } from "formik";

import SimpleDonutCharts from './FileManagerCharts';

import MultiUser from "../../../../assets/images/users/multi-user.jpg";

const SysCatalogosList = () => {
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
      //dispatch(onGetAspirantesList({Page: currentPage}));
  }

  const setRowsByPage = () => {
    //if(aspirantesLists)
    //  dispatch(onGetAspirantesList({ RowsByPage: 100 }));
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
        header: "Inicia Proceso",
        enableColumnFilter: false,
        cell: (cell) => {
          return <input type="checkbox" className="orderCheckBox form-check-input" value={cell.getValue()} />;
        },
        id: '#',
        accessorKey: "_id",
        enableSorting: false,
      },
      {
        header: "Id Grupo",
        accessorKey: "Id",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AppId {...cell} />;
        },
      },
      {
        header: "Grupo",
        accessorKey: "Grupo",
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
        header: "Fecha Inicio",
        accessorKey: "Fecha_Creacion",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Designation {...cell} />;
        },
      },
      {
        header: "Fecha Fin",
        accessorKey: "FechaFin",
        enableColumnFilter: false,
        cell: (cell) => <>{cell.getValue()} </>,
      },
      {
        header: "Hora Inicio",
        accessorKey: "HoraInicio",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Contact {...cell} />;
        },
      },
      {
        header: "Hora Fin",
        accessorKey: "HoraFin",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Type {...cell} />;
        },
      },
      {
        header: "Cita",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="btn btn-sm btn-info"
                onClick={() => {
                  const orderData = cell.row.original;
                  onClickDelete(orderData);
                }}
              >
                Confirmar Asistencia 
                <i className="mdi mdi-account-multiple-check font-size-18" id="deletetooltip" />
              </Link>
            </div>
          );
        },
      },
      {
        header: "Asignar Grupo de Entrevista",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="btn btn-sm btn-info"
                onClick={() => {
                  const orderData = cell.row.original;
                  onClickDelete(orderData);
                }}
              >
                Asignar
                <i className="mdi mdi-account-multiple-plus font-size-18" id="deletetooltip" />
              </Link>
            </div>
          );
        },
      },
      {
        header: "Asignar Campañas",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="btn btn-sm btn-info"
                onClick={() => {
                  const orderData = cell.row.original;
                  onClickDelete(orderData);
                }}
              >
                Asignar
                <i className="mdi mdi-clipboard-plus font-size-18" id="deletetooltip" />
              </Link>
            </div>
          );
        },
      },
      {
        header: "Finaliza Proceso",
        enableColumnFilter: false,
        cell: (cell) => {
          return <input type="checkbox" className="orderCheckBox form-check-input" value={cell.getValue()} />;
        },
      },
      {
        header: "Acción",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex gap-3">
              {/*<Link
                to={'/job-candidate-overview?Aspirante=' + cell.row.original.id }
                className="text-primary d-inline-block"
              >
                <i className="ri-eye-fill fs-16"></i>
              </Link>
              <UncontrolledTooltip placement="top" target="edittooltip">
                View
              </UncontrolledTooltip>*/}
              <Link
                to="#"
                onClick={() => {
                  const data = cell.row.original;
                  onClickUpdate(data);
                }}
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
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
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );





  const selectLayoutState = (state) => state.FileManager;
  const selectLayoutProperties = createSelector(
      selectLayoutState,
      (state) => ({
          folders: state.folders,
          files: state.files,
      })
  );
  // Inside your component
  const {
      folders, files
  } = useSelector(selectLayoutProperties);

  const [deleteAlt, setDeleteAlt] = useState(false);



  // Folders
  const [folder, setFolder] = useState(null);
  const [modalFolder, setModalFolder] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
      //dispatch(onGetFolders());
  }, [dispatch]);

  useEffect(() => {
      setFolder(folders);
  }, [folders]);

  const folderToggle = useCallback(() => {
      if (modalFolder) {
          setModalFolder(false);
          setFolder(null);
      } else {
          setModalFolder(true);
      }
  }, [modalFolder]);

  // Update Folder
  const handleFolderClick = useCallback((arg) => {
      const folder = arg;

      setFolder({
          id: folder.id,
          folderName: folder.folderName,
          folderFile: folder.folderFile,
          size: folder.size,
      });

      setIsEdit(true);
      folderToggle();
  }, [folderToggle]);

  // Add Folder
  const handleFolderClicks = () => {
      setFolder("");
      setModalFolder(!modalFolder);
      setIsEdit(false);
      folderToggle();
  };

  // Delete Folder
  const onClickFolderDelete = (folder) => {
      setFolder(folder);
      setDeleteModal(true);
  };

  const handleDeleteFolder = () => {

      if (deleteAlt) {
          if (folder) {
              dispatch(onDeleteFolder(folder.id));
              setDeleteModal(false);
              setDeleteAlt(false);
          }
      } else {
          if (file) {
              dispatch(onDeleteFile(file.id));
              setDeleteModal(false);
              sidebarClose("file-detail-show");
          }
      }

  };

  // Files
  const [file, setFile] = useState(null);
  const [modalFile, setModalFile] = useState(false);


  const [fileList, setFileList] = useState(files);

  useEffect(() => {
    dispatch(onGetFiles());
  }, [dispatch]);

  useEffect(() => {
      setFile(files);
      setFileList(files);
  }, [files]);

  const fileToggle = useCallback(() => {
      if (modalFile) {
          setModalFile(false);
          setFile(null);
      } else {
          setModalFile(true);
      }
  }, [modalFile]);

  // Update File
  const handleFileClick = useCallback((arg) => {
      const file = arg;
      fileValidation.setFieldValue("fileName", file.Estado);

      setFile({
          id: file.id,
          fileName: file.fileName,
          fileItem: file.fileItem,
          size: file.size,
      });

      setIsEdit(true);
      fileToggle();
  }, [fileToggle]);

  // Add File
  const handleFileClicks = () => {
      setFile("");
      setModalFile(!modalFile);
      setIsEdit(false);
      fileToggle();
  };

  // Delete File
  const onClickFileDelete = (file) => {
      setFile(file);
      setDeleteModal(true);
  };


  const [sidebarData, setSidebarData] = useState("");

  const [filterActive, setFilterActive] = useState("Documents");

  const fileCategory = (e, ele) => {
      /*setFilterActive(ele);
      setFileList(
          files.filter((item) => item.fileType === e)
      );*/
  };


  // SideBar Open
  function sidebarOpen(value) {
      const element = document.getElementsByTagName('body')[0];
      element.classList.add(value);
  }

  // SideBar Close
  function sidebarClose(value) {
      const element = document.getElementsByTagName('body')[0];
      element.classList.remove(value);
  }

  useEffect(() => {
      sidebarOpen("file-detail-show");
  }, []);

  const favouriteBtn = (ele) => {
      if (ele.closest("button").classList.contains("active")) {
          ele.closest("button").classList.remove("active");
      } else {
          ele.closest("button").classList.add("active");
      }
  };

  const fileSidebar = () => {
      document.getElementById("folder-overview").style.display = "none";
      document.getElementById("file-overview").style.display = "block";
  };

  // Folder validation
  const folderValidation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,

      initialValues: {
          folderName: (folder && folder.folderName) || '',
          folderFile: (folder && folder.folderFile) || '',
          size: (folder && folder.size) || '',
      },
      validationSchema: Yup.object({
          folderName: Yup.string().required("Please Enter Folder Name"),
      }),
      onSubmit: (values) => {
          if (isEdit) {
              const updateFolder = {
                  id: folder ? folder.id : 0,
                  folderName: values.folderName,
                  folderFile: values.folderFile,
                  size: values.size
              };
              // save edit Folder
              dispatch(onupdateFolder(updateFolder));
              folderValidation.resetForm();

          } else {
              const newFolder = {
                  id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                  folderName: values["folderName"],
                  folderFile: "0",
                  size: "0"
              };
              // save new Folder
              dispatch(onAddNewFolder(newFolder));
              folderValidation.resetForm();
          }
          folderToggle();
      },
  });


  const dateFormat = () => {
      let d = new Date(),
          months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear()).toString());
  };


  // File validation
  const fileValidation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,

      initialValues: {
          fileName: (file && file.fileName) || '',
          fileItem: (file && file.fileItem) || '',
          size: (file && file.size) || '',
      },
      validationSchema: Yup.object({
          fileName: Yup.string().required("Please Enter File Name"),
      }),
      onSubmit: (values) => {
          if (isEdit) {
              const updateFile = {
                  id: file ? file.id : 0,
                  fileName: values.fileName,
                  fileItem: values.fileItem,
                  size: values.size
              };
              // save edit File
              dispatch(onupdateFile(updateFile));
              fileValidation.resetForm();

          } else {
              const newFile = {
                  id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                  fileName: values.fileName + ".txt",
                  fileItem: "0",
                  icon: "ri-file-text-fill",
                  iconClass: "secondary",
                  fileType: "Documents",
                  size: "0 KB",
                  createDate: dateFormat(),
              };
              // save new File
              dispatch(onAddNewFile(newFile));
              fileValidation.resetForm();
          }
          fileToggle();
      },
  });

  return (
    <React.Fragment>
      <div className="page-content">
          <ToastContainer closeButton={false} />
          
          <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteFolder()}
                onCloseClick={() => setDeleteModal(false)}
            />
          

          <Container fluid>
            <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                <div className="file-manager-sidebar">
                    <div className="p-3 d-flex flex-column h-100">
                        <div className="mb-3">
                            <h5 className="mb-0 fw-semibold">Catalogos</h5>
                        </div>
                        <div className="search-box">
                            <input type="text" className="form-control bg-light border-light" placeholder="Search here..." />
                            <i className="ri-search-2-line search-icon"></i>
                        </div>
                        <SimpleBar className="mt-3 mx-n4 px-4 file-menu-sidebar-scroll">
                            <ul className="list-unstyled file-manager-menu">
                                <li>
                                    <Link to="#" className={filterActive === "Documents" ? "active" : ""} onClick={() => fileCategory("Documents", "Documents")}>
                                      <i className="ri-file-list-2-line align-bottom me-2"></i> 
                                      <span className="file-list-link">Estados</span>
                                    </Link>
                                </li>
                                <li className="d-none">
                                    <Link to="#" className={filterActive === "Media" ? "active" : ""} onClick={() => fileCategory("Media", "Media")}><i className="ri-image-2-line align-bottom me-2"></i> <span className="file-list-link">Media</span></Link>
                                </li>
                                <li className="d-none">
                                    <Link to="#" className={filterActive === "Recents" ? "active" : ""} onClick={() => fileCategory("Media", "Recents")}><i className="ri-history-line align-bottom me-2"></i> <span className="file-list-link">Recents</span></Link>
                                </li>
                                <li className="d-none">
                                    <Link to="#" className={filterActive === "Important" ? "active" : ""} onClick={() => fileCategory("Documents", "Important")}><i className="ri-star-line align-bottom me-2"></i> <span className="file-list-link">Important</span></Link>
                                </li>
                                <li className="d-none">
                                    <Link to="#" className={filterActive === "Deleted" ? "active" : ""} onClick={() => fileCategory("Deleted", "Deleted")}><i className="ri-delete-bin-line align-bottom me-2"></i> <span className="file-list-link">Deleted</span></Link>
                                </li>
                            </ul>
                        </SimpleBar>

                        <div className="mt-auto">
                            <h6 className="fs-11 text-muted text-uppercase mb-3">Storage Status</h6>
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <i className="ri-database-2-line fs-17"></i>
                                </div>
                                <div className="flex-grow-1 ms-3 overflow-hidden">
                                    <div className="progress mb-2 progress-sm">
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span className="text-muted fs-12 d-block text-truncate"><b>47.52</b>GB used of <b>119</b>GB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="file-manager-content w-100 p-3 py-0">
                    <div className="mx-n3 pt-4 px-4 file-manager-content-scroll overflow-x-hidden overflow-y-auto">
                        <div>
                            <div className="d-flex align-items-center mb-3">
                                <h5 className="flex-grow-1 fs-16 mb-0" id="filetype-title">Listado de elementos</h5>
                                <div className="flex-shrink-0">
                                    <button className="btn btn-success createFile-modal" onClick={() => handleFileClicks()}>
                                      <i className="ri-add-line align-bottom me-1"></i> 
                                      Agregar Elemento
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive-">
                                <table className="table align-middle table-nowrap mb-0">
                                    <thead className="table-active">
                                        <tr>
                                            <th scope="col">Estado</th>
                                            <th scope="col" className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="file-list">
                                        {(fileList || []).map((item, key) => (
                                            <tr key={key}>
                                                <td>{item.Estado}</td>
                                                <td>
                                                    <div className="d-flex gap-3 justify-content-center">

                                                        <Link
                                                          to="#"
                                                          onClick={() => { setSidebarData(item); fileSidebar(); sidebarOpen("file-detail-show"); }}
                                                          className="text-primary d-inline-block"
                                                        >
                                                          <i className="ri-eye-fill fs-16"></i>
                                                        </Link>
                                                        <UncontrolledTooltip placement="top" target="edittooltip">
                                                          Ver
                                                        </UncontrolledTooltip>
                                                        <Link
                                                          to="#"
                                                          onClick={() => handleFileClick(item)}
                                                          className="text-success"
                                                        >
                                                          <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                                                          <UncontrolledTooltip placement="top" target="edittooltip">
                                                            Editar
                                                          </UncontrolledTooltip>
                                                        </Link>
                                                        <Link
                                                          to="#"
                                                          className="text-danger"
                                                          onClick={() => onClickFileDelete(item)}
                                                        >
                                                          <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                                                          <UncontrolledTooltip placement="top" target="deletetooltip">
                                                            Borrar
                                                          </UncontrolledTooltip>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                            </div>

                            <ul id="pagination" className="pagination pagination-lg"></ul>

                            <div className="d-none align-items-center mt-2 row g-3 text-center text-sm-start">
                                <div className="col-sm">
                                    <div className="text-muted">Showing<span className="fw-semibold">4</span> of <span className="fw-semibold">125</span> Results
                                    </div>
                                </div>
                                <div className="col-sm-auto">
                                    <ul className="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
                                        <li className="page-item disabled">
                                            <Link to="#" className="page-link">←</Link>
                                        </li>
                                        <li className="page-item">
                                            <Link to="#" className="page-link">1</Link>
                                        </li>
                                        <li className="page-item active">
                                            <Link to="#" className="page-link">2</Link>
                                        </li>
                                        <li className="page-item">
                                            <Link to="#" className="page-link">3</Link>
                                        </li>
                                        <li className="page-item">
                                            <Link to="#" className="page-link">→</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-none file-manager-detail-content p-3 py-0">
                    <SimpleBar className="mx-n3 pt-3 px-3 file-detail-content-scroll">
                        <div id="folder-overview">
                            <div className="d-flex align-items-center pb-3 border-bottom border-bottom-dashed">
                                <h5 className="flex-grow-1 fw-semibold mb-0">Overview</h5>
                                <div>
                                    <button type="button" className="btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-overview" onClick={() => sidebarClose("file-detail-show")}>
                                        <i className="ri-close-fill align-bottom"></i>
                                    </button>
                                </div>
                            </div>
                            <SimpleDonutCharts dataColors='["--vz-info", "--vz-danger", "--vz-primary", "--vz-success"]' className="apex-charts mt-3" dir="ltr" />
                            <div className="mt-4">
                                <ul className="list-unstyled vstack gap-4">
                                    <li>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded bg-secondary-subtle text-secondary">
                                                        <i className="ri-file-text-line fs-17"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h5 className="mb-1 fs-15">Documents</h5>
                                                <p className="mb-0 fs-12 text-muted">2348 files</p>
                                            </div>
                                            <b>27.01 GB</b>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded bg-success-subtle text-success">
                                                        <i className="ri-gallery-line fs-17"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h5 className="mb-1 fs-15">Media</h5>
                                                <p className="mb-0 fs-12 text-muted">12480 files</p>
                                            </div>
                                            <b>20.87 GB</b>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded bg-warning-subtle text-warning">
                                                        <i className="ri-folder-2-line fs-17"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h5 className="mb-1 fs-15">Projects</h5>
                                                <p className="mb-0 fs-12 text-muted">349 files</p>
                                            </div>
                                            <b>4.10 GB</b>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded bg-primary-subtle text-primary">
                                                        <i className="ri-error-warning-line fs-17"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h5 className="mb-1 fs-15">Others</h5>
                                                <p className="mb-0 fs-12 text-muted">9873 files</p>
                                            </div>
                                            <b>33.54 GB</b>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="pb-3 mt-auto">
                                <div className="alert alert-danger d-flex align-items-center mb-0">
                                    <div className="flex-shrink-0">
                                        <i className="ri-cloud-line text-danger align-bottom display-5"></i>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="text-danger fs-14">Upgrade to Pro</h5>
                                        <p className="text-muted mb-2">Get more space for your...</p>
                                        <button className="btn btn-sm btn-danger"><i className="ri-upload-cloud-line align-bottom"></i> Upgrade Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="file-overview" className="h-100">
                            <div className="d-flex h-100 flex-column">
                                <div className="d-flex align-items-center pb-3 border-bottom border-bottom-dashed mb-3 gap-2">
                                    <h5 className="flex-grow-1 fw-semibold mb-0">File Preview</h5>
                                    <div>
                                        <button type="button" className="btn btn-ghost-primary btn-icon btn-sm fs-16 favourite-btn">
                                            <i className="ri-star-fill align-bottom"></i>
                                        </button>
                                        <button type="button" className="btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-overview" onClick={() => sidebarClose("file-detail-show")}>
                                            <i className="ri-close-fill align-bottom"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="pb-3 border-bottom border-bottom-dashed mb-3">
                                    <div className="file-details-box bg-light p-3 text-center rounded-3 border border-light mb-3">
                                        <div className="display-4 file-icon">
                                            <i className={sidebarData.icon + " text-" + sidebarData.iconClass}></i>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-icon btn-sm btn-ghost-success float-end fs-16"><i className="ri-share-forward-line"></i></button>
                                    <h5 className="fs-16 mb-1 file-name">{sidebarData.fileName}</h5>
                                    <p className="text-muted mb-0 fs-12"><span className="file-size">{sidebarData.size}</span>, <span className="create-date">{sidebarData.createDate}</span></p>
                                </div>
                                <div>
                                    <h5 className="fs-12 text-uppercase text-muted mb-3">File Description :</h5>

                                    <div className="table-responsive">
                                        <table className="table table-borderless table-nowrap table-sm">
                                            <tbody>
                                                <tr>
                                                    <th scope="row" style={{ width: "35%" }}>File Name :</th>
                                                    <td className="file-name">{sidebarData.fileName}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">File Type :</th>
                                                    <td className="file-type">{sidebarData.fileType}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Size :</th>
                                                    <td className="file-size">{sidebarData.size}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Created :</th>
                                                    <td className="create-date">{sidebarData.createDate}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Path :</th>
                                                    <td className="file-path"><div className="user-select-all text-truncate">*:\projects\src\assets\images</div></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div>
                                        <h5 className="fs-12 text-uppercase text-muted mb-3">Share Information:</h5>
                                        <div className="table-responsive">
                                            <table className="table table-borderless table-nowrap table-sm">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" style={{ width: "35%" }}>Share Name :</th>
                                                        <td className="share-name">\\*\Projects</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Share Path :</th>
                                                        <td className="share-path">velzon:\Documents\</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto border-top border-top-dashed py-3">
                                    <div className="hstack gap-2">
                                        <button type="button" className="btn btn-soft-primary w-100"><i className="ri-download-2-line align-bottom me-1"></i> Download</button>
                                        <button type="button" className="btn btn-soft-danger w-100 remove-file-overview" onClick={() => onClickFileDelete(sidebarData)}><i className="ri-close-fill align-bottom me-1"></i> Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </Container>
        

        {/* Folder Modal */}
        <Modal className="fade zoomIn" isOpen={modalFolder} toggle={() => setModalFolder(!modalFolder)} id="createFolderModal" modalClassName="zoomIn" centered tabIndex="-1">
            <ModalHeader className="p-3 bg-success-subtle" id="createFolderModalLabel" toggle={() => setModalFolder(!modalFolder)}> {isEdit ? "Folder Rename" : "Create Folder"} </ModalHeader>
            <ModalBody>
                <form autoComplete="off" className="needs-validation createfolder-form" id="createfolder-form" noValidate=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        folderValidation.handleSubmit();
                        return false;
                    }}
                >
                    <div className="mb-4">
                        <label htmlFor="foldername-input" className="form-label">Folder Name</label>
                        <input type="text" className="form-control" id="foldername-input"
                            name='folderName'
                            placeholder="Enter folder name"
                            // validate={{
                            //     required: { value: true },
                            // }}
                            onChange={folderValidation.handleChange}
                            onBlur={folderValidation.handleBlur}
                            value={folderValidation.values.folderName || ""}
                        // invalid={folderValidation.touched.folderName && folderValidation.errors.folderName ? true : false}
                        />
                        {folderValidation.touched.folderName && folderValidation.errors.folderName ? (
                            <FormFeedback type="invalid">{folderValidation.errors.folderName}</FormFeedback>
                        ) : null}

                    </div>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-ghost-success" onClick={() => setModalFolder(false)}><i className="ri-close-line align-bottom"></i> Close</button>
                        <button type="submit" className="btn btn-primary" id="addNewFolder">{isEdit ? "Save" : "Add Folder"}</button>
                    </div>
                </form>
            </ModalBody>
        </Modal>

        {/* File Modal */}
        <Modal id="createFileModal" isOpen={modalFile} toggle={fileToggle} modalClassName="zoomIn" centered tabIndex="-1">
            <ModalHeader toggle={fileToggle} className="p-3 bg-success-subtle">{!!isEdit ? "Editar" : "Crear"}</ModalHeader>
            <ModalBody>
                <form className="needs-validation createfile-form" id="createfile-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        fileValidation.handleSubmit();
                        return false;
                    }}
                >
                    <div className="mb-4">
                        <label htmlFor="filename-input" className="form-label">Label</label>
                        <input type="text" className="form-control" id="filename-input"
                            name="fileName"
                            placeholder="Nombre, titulo, etc."
                            // validate={{
                            //     required: { value: true },
                            // }}
                            onChange={fileValidation.handleChange}
                            onBlur={fileValidation.handleBlur}
                            value={fileValidation.values.fileName || ""}
                        // invalid={fileValidation.touched.fileName && fileValidation.errors.fileName ? true : false}
                        />
                        {fileValidation.touched.fileName && fileValidation.errors.fileName ? (
                            <FormFeedback type="invalid">{fileValidation.errors.fileName}</FormFeedback>
                        ) : null}
                    </div>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-ghost-success" onClick={() => setModalFile(false)}><i className="ri-close-line align-bottom"></i> Cerrar</button>
                        <button type="submit" className="btn btn-success" id="addNewFile">{!!isEdit ? "Actualizar" : "Agregar"}</button>
                    </div>
                </form>
            </ModalBody>
        </Modal>

      </div>
    </React.Fragment>
  );
};

export default SysCatalogosList;
