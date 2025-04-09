import { TipoFormEnum } from '../../enums/TipoFormEnum';

// Funcione de Ayuda
const FrontFormikGrl = (props) => {
    let FormGrl = {...props};
    if(typeof FormGrl.defaultValue === 'undefined') FormGrl.defaultValue = null;
    if(typeof FormGrl.tipoForm === 'undefined') FormGrl.tipoForm = TipoFormEnum.HIDDEN;
    if(typeof FormGrl.label === 'undefined') FormGrl.label = "";
    if(typeof FormGrl.required === 'undefined') FormGrl.required = false;
    if(typeof FormGrl.YupMax === 'undefined') FormGrl.YupMax = false;
    if(typeof FormGrl.YupNumeric === 'undefined') FormGrl.YupNumeric = false;
    if(typeof FormGrl.onChange === 'undefined') FormGrl.onChange = false;
    if(typeof FormGrl.ColMd === 'undefined') FormGrl.ColMd = 12;
    if(typeof FormGrl.list === 'undefined') FormGrl.list = [];
    if(typeof FormGrl.ver === 'undefined') FormGrl.ver = true;
    if(typeof FormGrl.buttons === 'undefined') FormGrl.buttons = false;
    return FormGrl;
}

export default FrontFormikGrl;