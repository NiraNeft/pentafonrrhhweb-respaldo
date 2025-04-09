import { React, useState, useEffect, useRef, useMemo } from 'react';
import { Modal, ModalBody } from "reactstrap";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

const EvaluarModal = ({ show, onDeleteClick, onCloseClick }) => {
    const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

    //Clas sicEditor

  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#f7b84b,secondary:#f06548"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Evaluación</h4>
            <p className="text-muted mx-4 mb-0">
              Prueba de Ortografía
            </p>
            <div ref={editorRef}>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Cerrar
          </button>
          <button
            type="button"
            className="btn w-sm btn-success"
            id="delete-record"
            onClick={onDeleteClick}
          >
            Guardar
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EvaluarModal;