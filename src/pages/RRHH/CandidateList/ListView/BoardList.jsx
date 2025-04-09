import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Container,
  Form,
  Input,
  Nav,
  NavItem,
  Modal,
  ModalBody,
  Label,
  Button,
  NavLink
} from "reactstrap";
import { useFormik } from "formik"
import * as Yup from "yup"
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { ToastContainer } from 'react-toastify';
import { jobCandidates } from "../../../../common/data/appsJobs";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Pagination from "../../../../Components/Common/Pagination";
import Spinners from "../../../../Components/Common/Spinner";

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
  getTasks as onGetTasks,
  addCardData as onAddCardData,
  updateCardData as onUpdateCardData,
  deleteKanban as OnDeleteKanban,
} from "../../../../slices/thunks";

//redux
import { createSelector } from "reselect"
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import SimpleBar from "simplebar-react"

import avatar5 from "../../../../assets/images/users/avatar-5.jpg"
import avatar3 from "../../../../assets/images/users/avatar-3.jpg"
import avatar10 from "../../../../assets/images/users/avatar-10.jpg"
import avatar8 from "../../../../assets/images/users/avatar-8.jpg"
import avatar2 from "../../../../assets/images/users/avatar-2.jpg"
import avatar1 from "../../../../assets/images/users/avatar-1.jpg"
import avatar4 from "../../../../assets/images/users/avatar-4.jpg"
import avatar6 from "../../../../assets/images/users/avatar-6.jpg"
import avatar7 from "../../../../assets/images/users/avatar-7.jpg"
import avatar9 from "../../../../assets/images/users/avatar-9.jpg"
import imge7 from "../../../../assets/images/small/img-7.jpg"
import imge4 from "../../../../assets/images/small/img-4.jpg"
import MultiUser from "../../../../assets/images/users/multi-user.jpg";

const BoardList = () => {
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
  const setRowsByPage = () => {
    //dispatch(onGetAspirantesList({ RowsByPage: 100 }));
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
          return <AppId {...cell} />;
        },
      },
      {
        header: "Apellido Paterno",
        accessorKey: "ApellidoPaterno",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Designation {...cell} />;
        },
      },
      {
        header: "Apellido Materno",
        accessorKey: "ApellidoMaterno",
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
      {
        header: "Acción",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to={'/job-candidate-overview?Aspirante=' + cell.row.original.id }
                className="text-primary d-inline-block"
              >
                <i className="ri-eye-fill fs-16"></i>
              </Link>
              <UncontrolledTooltip placement="top" target="edittooltip">
                Ver
              </UncontrolledTooltip>
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
                  Editar
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
                  Eliminar
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );




  // kanban
  const tasklist = {
    "1": {
      id: "1",
      name: "Unassigned",
      badge: 2,
      color: "success",
      Estado: { name: "Unassigned" },
      aspiranteListas: [
        {
          id: "2",
          title: "Profile Page Structure",
          text: "Profile Page means a web page accessible to the public or to guests.",
          userImages: [{ id: 1, img: avatar10 }, { id: 2, img: avatar3 }, { id: 3, img: avatar2 }],
          prowidth: "15%",
          procolor: "danger",
          badge1: ["Admin"],
          botId: "27 Dec, 2021",
          eye: "04",
          que: "19",
          clip: "02"
        },
        {
          id: "3",
          title: "Velzon - Admin Layout Design",
          text: "The dashboard is the front page of the Administration UI.",
          userImages: [{ id: 4, img: avatar9 }, { id: 5, img: avatar8 }],
          badge1: ["Layout", "Admin", "Dashboard"],
          botId: "07 Jan, 2022",
          eye: "14",
          que: "32",
          clip: "05"
        },
      ],
    },
    "4": {
      id: "4",
      name: "To Do",
      badge: 2,
      color: "secondary",
      Estado: { name: "To Do" },
      aspiranteListas: [
        {
          id: "5",
          title: "Admin Layout Design",
          text: "Landing page template with clean, minimal and modern design.",
          userImages: [{ id: 6, img: avatar10 }, { id: 7, img: avatar3 }, { id: 8, img: avatar2 }],
          badge1: ["Design", "Website"],
          botId: "07 Jan, 2022",
          eye: "13",
          que: "52",
          clip: "17"
        },
        {
          id: "6",
          title: "Marketing & Sales",
          text: "Sales and marketing are two business functions within an organization.",
          userImages: [{ id: 9, img: avatar9 }, { id: 10, img: avatar8 }],
          badge1: ["Marketing", "Business"],
          botId: "27 Dec, 2021",
          eye: "24",
          que: "10",
          clip: "10"
        },
      ],
    },
    "7": {
      id: "7",
      name: "Inprogress",
      badge: 2,
      color: "warning",
      Estado: { name: "Inprogress" },
      aspiranteListas: [
        {
          id: "8",
          title: "Brand Logo Design",
          cardId: "#VL2457",
          text: "BrandCrowd's brand logo maker allows you to generate and customize stand-out brand logos in minutes.",
          userImages: [{ id: 11, img: avatar5 }, { id: 12, img: avatar7 }, { id: 13, img: avatar6 }],
          badge1: ["Logo", "Design", "UI/UX"],
          botId: "22 Dec, 2021",
          eye: "24",
          que: "10",
          clip: "10",
          botpro: "55%",
          botprocolor: "warning"
        },
        {
          id: "9",
          title: "Change Old App Icon",
          cardId: "#VL2743",
          text: "Change app icons on Android: How do you change the look of your apps.",
          userImages: [{ id: 14, img: avatar10 }, { id: 15, img: avatar9 }, { id: 16, img: avatar5 }],
          badge1: ["Design", "Website"],
          botId: "24 Oct, 2021",
          eye: "64",
          que: "35",
          clip: "23"
        },
      ],
    },
    "10": {
      id: "10",
      name: "IN REVIEWS",
      badge: 3,
      color: "info",
      Estado: { name: "IN REVIEWS" },
      aspiranteListas: [
        {
          id: "11",
          title: "Create Product Animations",
          cardId: "#VL2453",
          userImages: [{ id: 17, img: avatar1 }],
          badge1: ["Ecommerce"],
          botId: "16 Nov, 2021",
          eye: "08",
          que: "54",
          clip: "28",
          picture: imge7,
          botpro: "100%",
          botprocolor: "success"
        },
        {
          id: "12",
          title: "Product Features Analysis",
          cardId: "#VL2340",
          text: "An essential part of strategic planning is running a product feature analysis.",
          userImages: [{ id: 18, img: avatar5 }, { id: 19, img: avatar6 }],
          badge1: ["Product", "Analysis"],
          botId: "05 Jan, 2022",
          eye: "14",
          que: "31",
          clip: "07"
        },
        {
          id: "13",
          title: "Create a Graph of Sketch",
          cardId: "#VL2462",
          text: "To make a pie chart with equal slices create a perfect circle by selecting an Oval Tool.",
          userImages: [{ id: 20, img: avatar4 }, { id: 21, img: avatar8 }, { id: 22, img: avatar2 }, { id: 23, img: avatar1 }],
          badge1: ["Sketch", "Marketing", "Design"],
          botId: "05 Nov, 2021",
          eye: "12",
          que: "74",
          clip: "37"
        },
      ],
    },
    "14": {
      id: "14",
      name: "Completed",
      badge: 1,
      color: "success",
      Estado: { name: "Completed" },
      aspiranteListas: [
        {
          id: "15",
          title: "Create a Blog Template UI",
          text: "Landing page template with clean, minimal and modern design.",
          userImages: [{ id: 24, img: avatar8 }, { id: 25, img: avatar7 }, { id: 26, img: avatar6 }],
          badge1: ["Design", "Website"],
          prowidth: "35%",
          procolor: "danger",
          botId: "27 Dec, 2021",
          eye: "24",
          que: "10",
          clip: "10"
        },
      ],
    },
    "16": {
      id: "16",
      name: "New",
      badge: 1,
      color: "success",
      Estado: { name: "New" },
      aspiranteListas: [
        {
          id: "17",
          title: "Banner Design for FB & Twitter",
          cardId: "#VL5287",
          userImages: [{ img: avatar3 }, { img: avatar2 }],
          badge1: ["UI/UX", "Graphic"],
          botId: "07 Jan, 2022",
          eye: "11",
          que: "26",
          clip: "30",
          picture: imge4,
          botpro: "55%",
          botprocolor: "warning"
        },
      ],
    },
  };
  const [kanbanTasksCards, setKanbanTasksCards] = useState()

  const selectLayoutState = (state) => state.AspirantesEtapas;
  const TasksKanbanProperties = createSelector(
    selectLayoutState,
    (state) => ({
      tasks: state.tasks,
      loading: state.loading
    }))

  const { tasks, loading } = useSelector(TasksKanbanProperties)

  const [isLoading, setLoading] = useState(loading)

  useEffect(() => {
    dispatch(onGetTasks())
  }, [dispatch])

  const [cards, setCards] = useState([])

  useEffect(() => {
    console.log(tasks.items);
    if(tasks.items)
      setCards(tasks.items);// tasks.items : tasklist
    else
      setCards([])
  }, [tasks])




  const handleDragEnd = (result) => {
    if (!result.destination) return // If dropped outside a valid drop area, do nothing

    const { source, destination } = result
    // Reorder cards within the same card line
    if (source.droppableId === destination.droppableId) {
      //const line = cards.find((line) => line.id === source.droppableId)
      const line = cards[source.droppableId];
      console.log(line);
      const reorderedCards = Array.from(line.aspiranteListas);
      const [movedCard] = reorderedCards.splice(source.index, 1);
      reorderedCards.splice(destination.index, 0, movedCard);

      const updatedLines = Object.keys(cards).map((key) => {
        let line = cards[key];
        if (line.id === source.droppableId) {
          return { ...line, aspiranteListas: reorderedCards }
        }
        return line
      });

      setCards(updatedLines)
    } else {
      // Move card between different card lines
      //const sourceLine = cards.find((line) => line.id === source.droppableId)
      //Object.keys(cards || [])
      const sourceLine = cards[source.droppableId];
      //const destinationLine = cards.find((line) => line.id === destination.droppableId)
      const destinationLine = cards[destination.droppableId];
      console.log("sourceLine", source.droppableId, sourceLine);
      const sourceCards = Array.from(sourceLine.aspiranteListas)
      const destinationCards = Array.from(destinationLine.aspiranteListas)
      const [movedCard] = sourceCards.splice(source.index, 1)
      destinationCards.splice(destination.index, 0, movedCard)

      const updatedLines = Object.keys(cards).map((key) => {
        let line = cards[key];
        if (line.id === source.droppableId) {
          return { ...line, aspiranteListas: sourceCards }
        } else if (line.id === destination.droppableId) {
          return { ...line, aspiranteListas: destinationCards }
        }
        return line
      })

      setCards(updatedLines)
    }
  }

  // create Modal
  const [modall, setModall] = useState(false)

  const handleOpen = () => {
    setModall(!modall);
    setCardHead(null)
  }

  const [cardhead, setCardHead] = useState()


  // badges
  const [tag, setTag] = useState();
  const [assignTag, setAssignTag] = useState([]);

  const handlestag = (tags) => {
    setTag(tags);
    const assigned = tags.map((item) => item.value);
    setAssignTag(assigned);
  };

  const tags = [
    { label: "Admin", value: "Admin" },
    { label: "Layout", value: "Layout" },
    { label: "Dashboard", value: "Dashboard" },
    { label: "Design", value: "Design" },
    { label: "Website", value: "Website" },
    { label: "Marketing", value: "Marketing" },
    { label: "Business", value: "Business" },
    { label: "Logo", value: "Logo" },
    { label: "UI/UX", value: "UI/UX" },
    { label: "Analysis", value: "Analysis" },
    { label: "Product", value: "Product" },
    { label: "Ecommerce", value: "Ecommerce" },
    { label: "Graphic", value: "Graphic" },
  ];

  // Add Modal
  const [modal, setModal] = useState(false)
  const toggle = () => {
    if (modal) {
      setModal(false)
      setImages([])
      setCard(null)
    } else {
      setModal(true)
      setAssignTag([]);
    }
  }


  const [isEdit, setIsEdit] = useState(false)
  const [card, setCard] = useState([])
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (card && card.cardId) || "",
      title: (card && card.title) || "",
      text: (card && card.text) || "",
      badge1: (card && card.badge1) || [],
      userImages: (card && card.userImages) || [],
      botId: (card && card.botId) || "",
      eye: (card && card.eye) || "",
      que: (card && card.que) || "",
      clip: (card && card.clip) || "",
    } ,
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Job Title"),
      text: Yup.string().required("Please Enter Your Task Description"),
      userImages: Yup.array().min(1, 'Please select at least one team member'),
      botId: Yup.string().required("Please Enter the Dates"),
      eye: Yup.number().required("Please Enter the Views"),
      que: Yup.number().required("Please Enter the Comments Number"),
      clip: Yup.number().required("Please Enter the Pinned Views Number"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updatedCards = {
          id: card ? card.id : 0,
          kanId: kanbanTasksCards,
          cardId: values.id,
          title: values.title,
          text: values.text,
          badge1: values.badge1,
          botId: values.botId,
          userImages: values.userImages,
          eye: values.eye,
          que: values.que,
          clip: values.clip,
        }

        // update Job
        dispatch(onUpdateCardData(updatedCards))
        validation.resetForm()
      } else {
        const newCardData = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          kanId: kanbanTasksCards,
          cardId: values["id"],
          title: values["title"],
          text: values["text"],
          badge1: assignTag,
          botId: values["botId"],
          userImages: values["userImages"],
          eye: values['eye'],
          que: values["que"],
          clip: values["clip"],
        }

        dispatch(onAddCardData(newCardData))
        validation.resetForm()
      }
      toggle()
    },
  })



  const handleCardEdit = (arg, line) => {
    setModal(true)
    setCard(arg)

    let card = arg
    setCard({
      id: card.id,
      title: card.title,
      text: card.text,
      botId: card.botId,
      userImages: card.userImages,
      eye: card.eye,
      que: card.que,
      clip: card.clip,
      badge1: card.badge1
    })

    setKanbanTasksCards(line.id)
    setIsEdit(true)

    toggle()
  }

  const handleAddNewCard = (line) => {
    setCard("")
    setIsEdit(false)
    toggle()
    setKanbanTasksCards(line.id)
  };

  const [images, setImages] = useState([])

  const handleDeleteCard = () => {
    if (card) {
      dispatch(OnDeleteKanban(card.id));
      setDeleteModal(false);
    }
  };


  const handleImage = (image) => {
    const updatedImages = images.includes(image)
      ? images.filter((item) => item !== image)
      : [...images, image];

    setImages(updatedImages);
    validation.setFieldValue('userImages', updatedImages)
  }
  useEffect(() => {
    if (card) {
      //setImages([...card?.userImages])
    }
  }, [card])


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
                <CardBody>
                  <Row className="g-2">
                    <div className="col-lg-auto">
                      <div className="hstack gap-2">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createboardModal" onClick={handleMdlNewAspiranteShow}>
                          <i className="ri-add-line align-bottom me-1"></i> Registro Candidato</button>
                      </div>
                    </div>
                    <div className="col-lg-3 col-auto">
                      <div className="search-box">
                        <input type="text" className="form-control search" id="search-task-options" placeholder="Search for project, tasks..." />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>
              

              <div className="tasks-board mb-3 d-flex" id="kanbanboard">
                {
                  isLoading ? <Spinners setLoading={setLoading} /> :
                    <div onDragEnd={handleDragEnd}>
                      {console.log("cards", cards)}
                      {Object.keys(cards || []).map((key) => {
                        let line = cards[key];
                        console.log(key, line);
                        return (
                          // header line
                          <div className="tasks-list" key={line.id}>
                            <div className="d-flex mb-3">
                              <div className="flex-grow-1">
                                <h6 className="fs-14 text-uppercase fw-semibold mb-0">{line.estado} <small className={`badge bg-${line.color} align-bottom ms-1 totaltask-badge`}>{line.badge}</small></h6>
                              </div>
                              <div className="flex-shrink-0">
                                <UncontrolledDropdown className="card-header-dropdown float-end">
                                  <DropdownToggle
                                    className="text-reset dropdown-btn"
                                    tag="a"
                                    color="white"
                                  >
                                    <span className="fw-medium text-muted fs-12">Priority<i className="mdi mdi-chevron-down ms-1"></i></span>
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem>Priority</DropdownItem>
                                    <DropdownItem>Date Added</DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </div>
                            {/* data */}
                            <SimpleBar className="tasks-wrapper px-3 mx-n3">
                              <div id="unassigned-task" className={line.aspiranteListas === "object" ? "tasks" : "tasks noTask"}>
                                <div droppableId={line.id}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                    >
                                      {line.aspiranteListas.map((card, index) => {
                                        return (
                                          <div
                                            key={card.Id}
                                            draggableId={card.Id}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                // className="card task-list"
                                                className="pb-1 task-list"
                                                id={line.name + "-task"}
                                              >
                                                <div className="card task-box" id="uptask-1">
                                                  <CardBody>
                                                    <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1 ">{card.cardId}</Link>
                                                    <UncontrolledDropdown className="float-end">
                                                      <DropdownToggle
                                                        className="arrow-none"
                                                        tag="a"
                                                        color="white"
                                                      >
                                                        <i className="ri-more-fill"></i>
                                                      </DropdownToggle>
                                                      <DropdownMenu className="dropdown-menu-end">
                                                        <DropdownItem
                                                          className="edittask-details"
                                                        >
                                                          View
                                                        </DropdownItem>
                                                        <DropdownItem
                                                          className="edittask-details"
                                                          onClick={() =>
                                                            handleCardEdit(card, line)
                                                          }
                                                        >
                                                          Edit
                                                        </DropdownItem>
                                                        <DropdownItem
                                                          className="deletetask"
                                                          onClick={() =>
                                                            onClickDelete(card)
                                                          }
                                                        >
                                                          Delete
                                                        </DropdownItem>
                                                      </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                    <div className="mb-3">

                                                      <h6 className="fs-15 mb-0 flex-grow-1 text-truncate task-title">
                                                        <Link
                                                          to="#"
                                                          className="d-block"
                                                          id="task-name"
                                                        >
                                                          {card.Nombre}
                                                        </Link>
                                                      </h6>
                                                    </div>
                                                    <p className="text-muted">
                                                      {card.Correo}
                                                    </p>

                                                    {card.picture ?
                                                      <div className="tasks-img rounded mb-2" style={{ backgroundImage: `url(${card.picture})`, height: "135px" }}>
                                                      </div> : ""}

                                                    {/* progress */}
                                                    {card.prowidth ?
                                                      <div className="mb-3">
                                                        <div className="d-flex mb-1">
                                                          <div className="flex-grow-1">
                                                            <h6 className="text-muted mb-0"><span className="text-secondary">{card.prowidth}</span> of 100%</h6>
                                                          </div>
                                                          <div className="flex-shrink-0">
                                                            <span className="text-muted">03 Jan, 2022</span>
                                                          </div>
                                                        </div>
                                                        <div className="progress rounded-3 progress-sm">
                                                          <div className={`progress-bar bg-${card.procolor}`} role="progressbar" style={{ width: `${card.prowidth}` }}></div>
                                                        </div>
                                                      </div>
                                                      : ""
                                                    }
                                                    {/* badge & image */}
                                                    {
                                                      <div className="d-flex align-items-center">
                                                        <div className="flex-grow-1">
                                                          {Object.keys(card.Estado).map((badgeText, index) => (
                                                            <span key={index} className="d-none badge bg-primary-subtle text-primary me-1">
                                                              {badgeText}
                                                            </span>
                                                          ))}
                                                        </div>
                                                      </div>
                                                    }

                                                  </CardBody>
                                                  {/* bottom */}
                                                  <div className="card-footer border-top-dashed">
                                                    <div className="d-flex">
                                                      <div className="flex-grow-1">
                                                        <span className="text-muted"><i className="ri-time-line align-bottom"></i>{card.Fecha_Creacion}</span>
                                                      </div>
                                                      <div className="flex-shrink-0">
                                                        <ul className="link-inline mb-0">
                                                          <li className="list-inline-item">
                                                            <Link to="#" className="text-muted"><i className="ri-eye-line align-bottom"></i> {card.eye}</Link>
                                                          </li>
                                                          <li className="list-inline-item">
                                                            <Link to="#" className="text-muted"><i className="ri-question-answer-line align-bottom"></i> {card.que}</Link>
                                                          </li>
                                                          <li className="list-inline-item">
                                                            <Link to="#" className="text-muted"><i className="ri-attachment-2 align-bottom"></i> {card.clip}</Link>
                                                          </li>
                                                        </ul>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  {card.botpro ?
                                                    <div className="progress progress-sm">
                                                      <div className={`progress-bar bg-${card.botprocolor}`} role="progressbar" style={{ width: `${card.botpro}` }} ></div>
                                                    </div>
                                                    : ""
                                                  }

                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </SimpleBar>
                            <div className="my-2 mt-0">
                              <button className="btn btn-soft-info w-100" data-bs-toggle="modal" data-bs-target="#creatertaskModal" onClick={() => handleAddNewCard(line)}>Add More</button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                }
              </div>
              
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BoardList;
