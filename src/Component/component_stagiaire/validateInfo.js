export default function validateInfo(values){
    let errors={}
    if(!values.cinStagiaire.trim()){
        errors.cinStagiaire="CIN Obligatoire"
    }
    return errors;
}