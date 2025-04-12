// NoticiasTest.tsx - Versión final con breadcrumb en todas las noticias
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  Button
} from "reactstrap";
import { motion } from "framer-motion";
import "./Noticias.css";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const comentariosFalsos = [
  { id: 1, autor: "Ana R.", texto: "Excelente iniciativa de Pentafon." },
  { id: 2, autor: "Luis H.", texto: "¡Felicidades al equipo!" },
  { id: 3, autor: "Martha V.", texto: "Muy buena información." }
];

const noticiasMock = [
  {
    id: "1",
    titulo: "Pentafon: Una de las 10 mejores empresas para trabajar",
    contenido:
      "Pentafon ha sido reconocida por Great Place To Work en el ranking 2025 por su excelente cultura corporativa y ambiente profesional. Conoce más de esta noticia y los secretos detrás de su éxito.",
    autor: "Pentafon",
    imagenUrl: "https://via.placeholder.com/600x300",
    fecha: "2025-04-10",
    destacada: true,
    likes: 48,
    comentarios: 12
  },
  {
    id: "2",
    titulo: "Reconocimiento a empleados destacados",
    contenido:
      "Este mes se premió a los empleados más comprometidos con un reconocimiento especial por su labor.",
    autor: "Pentafon",
    imagenUrl: "https://via.placeholder.com/600x300",
    fecha: "2025-03-15",
    likes: 24,
    comentarios: 5
  },
  {
    id: "3",
    titulo: "Finalizamos con éxito nuestra auditoría de ISO 27001:2022",
    contenido:
      "Pentafon ha logrado cumplir satisfactoriamente con todos los lineamientos de seguridad exigidos.",
    autor: "Pentafon",
    imagenUrl: "https://via.placeholder.com/600x300",
    fecha: "2025-03-01",
    likes: 30,
    comentarios: 8
  },
  {
    id: "4",
    titulo: "Nuevas vacantes abiertas en distintas áreas",
    contenido:
      "¡Únete a nuestro equipo! Estamos buscando talento en TI, RH y Atención a Clientes.",
    autor: "Pentafon",
    imagenUrl: "https://via.placeholder.com/600x300",
    fecha: "2025-02-20",
    likes: 18,
    comentarios: 2
  },
  {
    id: "5",
    titulo: "Celebramos el aniversario número 20 de Pentafon",
    contenido:
      "Con orgullo celebramos dos décadas de crecimiento y compromiso con nuestros colaboradores y clientes.",
    autor: "Pentafon",
    imagenUrl: "https://via.placeholder.com/600x300",
    fecha: "2025-02-01",
    likes: 51,
    comentarios: 10
  },
  {
    id: "6",
    titulo: "Nueva sucursal en Monterrey",
    contenido:
      "Expandiendo operaciones al norte del país con una nueva sede en Monterrey, NL.",
    autor: "Pentafon",
    imagenUrl: "https://via.placeholder.com/600x300",
    fecha: "2025-01-20",
    likes: 16,
    comentarios: 3
  },
  {
    id: "7",
    titulo: "Iniciativa de reciclaje en Pentafon",
    contenido:
      "Lanzamos una campaña de reciclaje para promover la sostenibilidad entre nuestros empleados.",
    autor: "Pentafon",
    imagenUrl: "https://via.placeholder.com/600x300",
    fecha: "2025-01-10",
    likes: 22,
    comentarios: 4
  },
  {
    id: "8",
    titulo: "Participación en el evento Tech Summit 2025",
    contenido:
      "Pentafon participará en el evento más importante de tecnología del año. ¡No te lo pierdas!",
    autor: "Pentafon",
    imagenUrl: "https://via.placeholder.com/600x300",
    fecha: "2025-01-01",
    likes: 35,
    comentarios: 6
  }
];

const NoticiasTest: React.FC = () => {
  const [seleccionada, setSeleccionada] = useState<any | null>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05 }
  };

  if (seleccionada) {
    return (
      <Container className="py-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card className="p-4 shadow featured-detail featured-card">
            <div className="featured-image-wrapper">
              <img src={seleccionada.imagenUrl} alt={seleccionada.titulo} className="img-fluid rounded featured-image" />
              <Breadcrumb className="mt-3 px-3">
                <BreadcrumbItem>
                  <a href="#" onClick={() => setSeleccionada(null)}>Noticias</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>{seleccionada.titulo}</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <CardBody>
              <CardTitle tag="h2" className="text-danger fw-bold display-5 mb-3">{seleccionada.titulo}</CardTitle>
              <div className="d-flex align-items-center gap-2 mt-2">
                <img src="/favicon.ico" alt="Pentafon" className="autor-icon me-2" />
                <span className="text-muted">{seleccionada.autor} • {seleccionada.fecha}</span>
              </div>
              <CardText className="lead mt-3">{seleccionada.contenido}</CardText>
              <div className="mt-3 d-flex align-items-center">
                <span className="me-3"><i className="mdi mdi-heart-outline"></i> {seleccionada.likes} Me gusta</span>
              </div>
              <div className="mt-4">
                <h5 className="fw-semibold mb-3">Comentarios</h5>
                <div className="bg-white border rounded p-3">
                  {comentariosFalsos.map((c) => (
                    <p key={c.id} className="mb-2">
                      <strong>{c.autor}:</strong> {c.texto}
                    </p>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </Container>
    );
  }

  const noticiaDestacada = noticiasMock.find((n) => n.destacada);
  const otrasNoticias = noticiasMock.filter((n) => !n.destacada);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-danger-emphasis display-6 fw-semibold border-bottom pb-2">
        Noticias <i className="mdi mdi-newspaper-variant-outline"></i>
      </h2>

      {noticiaDestacada && (
        <motion.div className="mb-5" initial="hidden" animate="visible" whileHover="hover" variants={cardVariants}>
          <Card className="shadow-sm featured-card">
            <div className="featured-image-wrapper">
              <img src={noticiaDestacada.imagenUrl} alt={noticiaDestacada.titulo} className="img-fluid rounded-top featured-image" />
              <Badge color="warning" pill className="ribbon">Destacada</Badge>
            </div>
            <CardBody>
              <CardTitle tag="h3" className="display-6 text-danger fw-bold">{noticiaDestacada.titulo}</CardTitle>
              <CardText className="text-muted mb-2">
                <i className="mdi mdi-clock-outline me-1"></i>{noticiaDestacada.fecha} • <i className="mdi mdi-account-outline me-1"></i>{noticiaDestacada.autor}
              </CardText>
              <CardText>{noticiaDestacada.contenido}</CardText>
              <div className="d-flex align-items-center justify-content-between my-3">
                <div className="text-muted small d-flex gap-3">
                  <span>❤️ {noticiaDestacada.likes}</span>
                  <span>💬 {noticiaDestacada.comentarios}</span>
                </div>
                <motion.div whileHover="hover" variants={buttonVariants} className="d-inline-block">
                  <Button color="danger" className="animated-button" onClick={() => setSeleccionada(noticiaDestacada)}>
                    Leer más →
                  </Button>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}

      <Row>
        {otrasNoticias.map((n) => (
          <Col lg="6" xl="4" key={n.id} className="mb-4 d-flex">
            <motion.div initial="hidden" animate="visible" whileHover="hover" variants={cardVariants} className="w-100">
              <Card className="h-100 d-flex flex-column justify-content-between news-card">
                <img src={n.imagenUrl} alt={n.titulo} className="card-img-top" onError={(e) => { (e.target as HTMLImageElement).src = "/fallback.jpg"; }} />
                <CardBody className="flex-grow-1 d-flex flex-column justify-content-between">
                  <Breadcrumb className="p-0 mb-2 small">
                    <BreadcrumbItem>
                      <a href="#" onClick={() => setSeleccionada(null)}>Noticias</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{n.titulo}</BreadcrumbItem>
                  </Breadcrumb>
                  <CardTitle tag="h5" className="mb-2 text-danger fw-semibold">{n.titulo}</CardTitle>
                  <CardText className="text-muted small mb-2">Por {n.autor} • {n.fecha}</CardText>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="text-muted small d-flex gap-3">
                      <span>❤️ {n.likes}</span>
                      <span>💬 {n.comentarios}</span>
                    </div>
                    <motion.div whileHover="hover" variants={buttonVariants} className="d-inline-block">
                      <Button color="danger" className="animated-button" onClick={() => setSeleccionada(n)}>
                        Leer más →
                      </Button>
                    </motion.div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NoticiasTest;
