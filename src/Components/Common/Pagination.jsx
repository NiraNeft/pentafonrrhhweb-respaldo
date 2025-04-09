import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
    Row,
    FormFeedback
} from "reactstrap";

const Pagination = ({ pagination, setCurrentPage }) => {
    const handleprevPage = () => {
        let prevPage = pagination.actualPage - 1;
        setCurrentPage(prevPage);
    };
    const handlenextPage = () => {
        let nextPage = pagination.actualPage + 1;
        setCurrentPage(nextPage);
    };

    const handleClick = (e) => {
        setCurrentPage(e);
    };

    if(!pagination){
        pagination = {
            totalPages: 0
        };
    }

    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        if (pageNumbers.length && pageNumbers.length < pagination.actualPage) {
            setCurrentPage(pageNumbers.length)
        }
    }, [pageNumbers.length, pagination, setCurrentPage])
    return (
        <React.Fragment>
            <Row className="g-0 justify-content-end mb-4">
                {pageNumbers && pageNumbers.length > 0 ? <div className="col-sm-auto">
                    <ul className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                        {pagination.actualPage <= 1 ? (
                            <Link className="page-item pagination-prev disabled" href="#!">
                                Previa
                            </Link>
                        ) :
                            <li className={pagination.actualPage <= 1 ? "page-item disabled" : "page-item"}>
                                <Link to="#!" className="page-link" onClick={handleprevPage}>Previa</Link>
                            </li>
                        }
                        {pageNumbers.map((item, key) => (
                            <React.Fragment key={key}>
                                <li className="page-item">
                                    <Link to="#!" className={pagination.actualPage === item ? "page-link active" : "page-link"} onClick={() => handleClick(item)}>{item}</Link>
                                </li>
                            </React.Fragment>
                        ))}
                        {pagination.actualPage >= pageNumbers.length ? (
                            <li className="page-item">
                                <Link className="page-link pagination-next disabled" href="#!">
                                    Siguiente
                                </Link>
                            </li>
                        ) :
                            <li className={pagination.actualPage < 1 ? "page-item disabled" : "page-item"}>
                                <Link to="#!" className="page-link" onClick={handlenextPage}>Siguiente</Link>
                            </li>
                        }
                    </ul>
                </div> : <div></div>}
            </Row>
        </React.Fragment>
    );
}

export default Pagination;