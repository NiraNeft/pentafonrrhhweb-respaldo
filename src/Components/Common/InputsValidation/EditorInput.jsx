import { useState, useEffect, useRef, useMemo } from 'react';
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import { ValidationApi } from './ValidationApi';

// CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autosave,
	BlockQuote,
	Bold,
	Essentials,
	Heading,
	Indent,
	IndentBlock,
	Italic,
	Link,
	Paragraph,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	Underline
} from 'ckeditor5';

import translations from 'ckeditor5/translations/es.js';

import 'ckeditor5/ckeditor5.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

const FileInput = (props) => {
    const { validation, registrationError, listen } = props;
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi(props);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	let classNameCkeditor = "";
    let className = "mb-3";
    let valueValidation = "";
	if(validation)
    	valueValidation = validation.values[props.id];
	else if(listen)
    	valueValidation = listen.values[props.id];
	
    if(isInvalidForm || isErrorApi){
			classNameCkeditor += "form-control is-invalid " ;
	}
    
	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);
    
	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}

		return {
			editorConfig: {
				toolbar: {
					items: ['heading', '|', 'bold', 'italic', 'underline', '|', 'link', 'insertTable', 'blockQuote', '|', 'outdent', 'indent'],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Autosave,
					BlockQuote,
					Bold,
					Essentials,
					Heading,
					Indent,
					IndentBlock,
					Italic,
					Link,
					Paragraph,
					Table,
					TableCaption,
					TableCellProperties,
					TableColumnResize,
					TableProperties,
					TableToolbar,
					Underline
				],
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				initialData: valueValidation,
				language: 'es',
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				placeholder: 'Deja algun comentario',
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
				},
				translations: [translations]
			}
		};
	}, [isLayoutReady]);

    return (
        validation ? (
            <div className={className}>
                <Label htmlFor={props.id} className="form-label">{props.label} <span className="text-danger">{props.labelDanger} *</span></Label>
				
                <div
					ref={editorRef}
					className={classNameCkeditor}
					>{editorConfig && <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        validation.setFieldValue(props.id, data);
                    } }
                    />}</div>
                        
				{Feedback}
            </div>
        ) : (
            <div className="mb-3">
                <Label htmlFor="Capacitacion.FechaCapacitacion" className="form-label">{props.label}</Label>
                <div ref={editorRef}>{editorConfig && <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        listen.setFieldValue(props.id, data);
                    } }
                    />}</div>
            </div>
        )
    );
}

export const EditorInput = FileInput;