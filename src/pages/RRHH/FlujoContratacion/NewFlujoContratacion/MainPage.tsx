import React, { useState, useEffect} from "react"
import {
  Card,
  CardBody,
  Col,
  Row,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import { Link } from "react-router-dom"
import SimpleBar from "simplebar-react"
// import moment from "moment"
import { ToastContainer } from "react-toastify"
import Spinners from "../../../../Components/Common/Spinner"
import Flatpickr from "react-flatpickr";
import moment from "moment";

import avatar5 from "../../../../../assets/images/users/avatar-5.jpg"
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

//Import Breadcrumb
interface CardData {
  id?: string;
  kanId?: string,
  title?: string,
  cardId?: string;
  botId?: any,
  text?: string;
  badge1?: any[];
  userImages?: any[];
  badgeColor?: string;
  eye?: boolean;
  que?: boolean;
  clip?: boolean;
}


interface KanbanColumn {
  id: string;
  name: string;
  badge?: number;
  color?: string;
  cards?: any;
}

const TasksKanban = () => {
  const dispatch = useDispatch<any>();
  const [kanbanTasksCards, setKanbanTasksCards] = useState<any>()

  /*const TasksKanbanProperties = createSelector(
    (state: any) => state.Tasks,
    (state) => ({
      tasks: state.tasks,
      loading: state.loading
    }))*/

  //const { tasks, loading } = useSelector(TasksKanbanProperties)
  const tasks = [
    {
      id: "1",
      name: "Unassigned",
      badge: 2,
      color: "success",
      cards: [
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
    {
      id: "4",
      name: "To Do",
      badge: 2,
      color: "secondary",
      cards: [
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
    {
      id: "7",
      name: "Inprogress",
      badge: 2,
      color: "warning",
      cards: [
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
    {
      id: "10",
      name: "IN REVIEWS",
      badge: 3,
      color: "info",
      cards: [
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
    {
      id: "14",
      name: "Completed",
      badge: 1,
      color: "success",
      cards: [
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
    {
      id: "16",
      name: "New",
      badge: 1,
      color: "success",
      cards: [
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
  ];
  const loading = false;

  const [isLoading, setLoading] = useState<boolean>(loading)

  useEffect(() => {
    
  }, [dispatch])

  const [cards, setCards] = useState<any>([])

  useEffect(() => {
    setCards(tasks)
  }, [tasks])




  const handleDragEnd = (result: any) => {
    if (!result.destination) return // If dropped outside a valid drop area, do nothing

    const { source, destination } = result
    // Reorder cards within the same card line
    if (source.droppableId === destination.droppableId) {
      const line = cards.find((line: any) => line.id === source.droppableId)
      const reorderedCards = Array.from(line.cards)
      const [movedCard] = reorderedCards.splice(source.index, 1)
      reorderedCards.splice(destination.index, 0, movedCard)

      const updatedLines = cards.map((line: any) => {
        if (line.id === source.droppableId) {
          return { ...line, cards: reorderedCards }
        }
        return line
      })

      setCards(updatedLines)
    } else {
      // Move card between different card lines
      const sourceLine = cards.find((line: any) => line.id === source.droppableId)
      const destinationLine = cards.find(
        (line: any) => line.id === destination.droppableId
      )
      const sourceCards = Array.from(sourceLine.cards)
      const destinationCards = Array.from(destinationLine.cards)
      const [movedCard] = sourceCards.splice(source.index, 1)
      destinationCards.splice(destination.index, 0, movedCard)

      const updatedLines = cards.map((line: any) => {
        if (line.id === source.droppableId) {
          return { ...line, cards: sourceCards }
        } else if (line.id === destination.droppableId) {
          return { ...line, cards: destinationCards }
        }
        return line
      })

      setCards(updatedLines)
    }
  }

  // create Modal
  const [modall, setModall] = useState<boolean>(false)

  const handleOpen = () => {
    setModall(!modall);
    setCardHead(null)
  }

  const [cardhead, setCardHead] = useState<any>()


  const formik: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (cardhead && cardhead.id) || "",
      name: (cardhead && cardhead.name) || "",
    } as KanbanColumn,
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Card Title"),
    }),
    onSubmit: (values: KanbanColumn) => {

      const newCardheaderData: KanbanColumn = {
        id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        name: values["name"],
        cards: []
      }

      formik.resetForm()

      handleOpen()
    },
  })


  // badges
  const [tag, setTag] = useState<any>();
  const [assignTag, setAssignTag] = useState<any>([]);

  const handlestag = (tags: any) => {
    setTag(tags);
    const assigned = tags.map((item: any) => item.value);
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
  const [modal, setModal] = useState<boolean>(false)
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


  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [card, setCard] = useState<any>()
  // validation
  const validation: any = useFormik({
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
    } as CardData,
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Job Title"),
      text: Yup.string().required("Please Enter Your Task Description"),
      userImages: Yup.array().min(1, 'Please select at least one team member'),
      botId: Yup.string().required("Please Enter the Dates"),
      eye: Yup.number().required("Please Enter the Views"),
      que: Yup.number().required("Please Enter the Comments Number"),
      clip: Yup.number().required("Please Enter the Pinned Views Number"),
    }),
    onSubmit: (values: CardData) => {
      if (isEdit) {
        const updatedCards: CardData = {
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
        validation.resetForm()
      } else {
        const newCardData: CardData = {
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

        validation.resetForm()
      }
      toggle()
    },
  })



  const handleCardEdit = (arg: any, line: any) => {
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

  const handleAddNewCard = (line: any) => {
    setCard("")
    setIsEdit(false)
    toggle()
    setKanbanTasksCards(line.id)
  };

  const [images, setImages] = useState<any>([])

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onClickDelete = (card: any) => {
    setCard(card);
    setDeleteModal(true);
  };

  const handleDeleteCard = () => {
    if (card) {

      setDeleteModal(false);
    }
  };


  const handleImage = (image: any) => {
    const updatedImages = images.includes(image)
      ? images.filter((item: any) => item !== image)
      : [...images, image];

    setImages(updatedImages);

    validation.setFieldValue('userImages', updatedImages)

  }
  useEffect(() => {
    if (card) {
      setImages([...card?.userImages])
    }
  }, [card])




  return (
    <React.Fragment>
      
        <CardBody>
          <div className="tasks-board mb-3 d-flex" id="kanbanboard">
            {
              isLoading ? <Spinners setLoading={setLoading} /> :
                <>
                  {(cards || []).map((line: KanbanColumn) => {
                    return (
                      // header line
                      <div className="tasks-list" key={line.id}>
                        <div className="d-flex mb-3">
                          <div className="flex-grow-1">
                            <h6 className="fs-14 text-uppercase fw-semibold mb-0">{line.name} <small className={`badge bg-${line.color} align-bottom ms-1 totaltask-badge`}>{line.badge}</small></h6>
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
                          <div id="unassigned-task" className={line.cards === "object" ? "tasks" : "tasks noTask"}>
                            <div id={line.id}>
                              {line.cards.map((card: any, index: any) => {
                                return (
                                  <div
                                    key={card.id}
                                    id={index}
                                  >
                                  <div
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
                                                {card.title}
                                              </Link>
                                            </h6>
                                          </div>
                                          <p className="text-muted">
                                            {card.text}
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
                                                {card.badge1.map((badgeText: any, index: any) => (
                                                  <span key={index} className="badge bg-primary-subtle text-primary me-1">
                                                    {badgeText}
                                                  </span>
                                                ))}
                                              </div>
                                              <div className="flex-shrink-0">
                                                <div className="avatar-group">
                                                  {card.userImages.map((picturedata: any, idx: any) => (
                                                    <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Alexis" key={idx}>
                                                      <img src={picturedata.img} alt="" className="rounded-circle avatar-xxs" />
                                                    </Link>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>
                                          }

                                        </CardBody>
                                        {/* bottom */}
                                        <div className="card-footer border-top-dashed">
                                          <div className="d-flex">
                                            <div className="flex-grow-1">
                                              <span className="text-muted"><i className="ri-time-line align-bottom"></i>{card.botId}</span>
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
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </SimpleBar>
                        <div className="my-2 mt-0">
                          <button className="btn btn-soft-info w-100" data-bs-toggle="modal" data-bs-target="#creatertaskModal" onClick={() => handleAddNewCard(line)}>Add More</button>
                        </div>
                      </div>
                    )
                  })}
                </>
            }
          </div>

        </CardBody>

    </React.Fragment>
  )
}

export default TasksKanban
