import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
class Ajoutspecialite extends React.Component{

 
  constructor(props) {
    super(props)
    // Setting up functions

    // Setting up state
    this.state = {
      codeSpecialite: '',
      libSpecialite: '',
      libSpecialiteAr:  '',
      typeSpecialite:  '',
      dureeSpecialite: '',
      diplomeSpecialite:'',
    }
  }

  validationSchema() {
    return Yup.object().shape({
      codeSpecialite: Yup.string() .required('cin is required')
      .min(3, 'Code specialit√© obligatoire'),
      libSpecialite:  Yup.string()
      .required('First Name is required'),
       
      libSpecialiteAr: Yup.string()
        .required('Champs obligatoire'),
        typeSpecialite: Yup.string()
        .required('Champs obligatoire'),
        dureeSpecialite: Yup.string()
        .required('Champs obligatoire'),
        diplomeSpecialite: Yup.string()
        .required('Champs obligatoire'),
      });
    }




  
  componentDidMount() {
  const token = localStorage.getItem("token");
  if (token){
  console.log('ok')
  }
  else{
    this.props.history.push('/');
  }
  }


  onSubmit(values) {

  const studentObject = {
    codeSpecialite:values.codeSpecialite,
    libSpecialite:values.libSpecialite,
    libSpecialiteAr:values.libSpecialiteAr,
    typeSpecialite:values.typeSpecialite,
    dureeSpecialite:values.dureeSpecialite,
    diplomeSpecialite:values.diplomeSpecialite,

  };
        axios.post('http://localhost/spc',studentObject).then(res => 
        toast.success('insertion avec success')
      ).catch(err => {toast.error("Erreur d'insertion ")}) 
      
}
      


     

    render(){

      const initialValues = {
        codeSpecialite: '',
        libSpecialite: '',
        libSpecialiteAr:  '',
        typeSpecialite:  '',
        dureeSpecialite: '',
        diplomeSpecialite:'',
      };

    return(
      <div className="content" >
        <div>
        <h2>Ajoute une Nouvelle specialit√©s</h2>
        <ToastContainer/>

        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema} onSubmit={this.onSubmit} >

{({ resetForm,values}) => (
            <Form class="row g-3" noValidate>
  <div className="col-md-6">
  <label >Code Specialit√©</label>
  <Field type="text" className="form-control " placeholder="enter specialit√© code" 
  name="codeSpecialite" />
   <ErrorMessage name="codeSpecialite" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label > Specialit√© Fr</label>
  <Field type="text" className="form-control " placeholder="enter lib specialit√© "
  name="libSpecialite"/>
  <ErrorMessage name="libSpecialite" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label > Specialit√© Ar</label>
  <Field type="text" className="form-control " placeholder="enter lib specialit√© Ar "
  name="libSpecialiteAr"
  />
  <ErrorMessage name="libSpecialiteAr" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6"> 
    <label > Nature de Formation </label>
   <Field class="form-control"  name="typeSpecialite" as="select" >
       <option >Choix </option>
       
       <option >ō®ōßŔĄō™ōĮōßŔąŔĄ</option>
       <option > ōĻŔÜ ō®ōĻōĮ</option>
       <option >  ōĮōĪŔąō≥ ŔÖō≥ōßō¶Ŕäō©</option>

   </Field>
   <ErrorMessage name="typeSpecialite" component="div"  className="text-danger" />
</div>
    <div className="col-md-6">
    <label > Duree de Formation </label>
  <Field type="text" className="form-control " placeholder="duree "
  name="dureeSpecialite" 
  />
    <ErrorMessage name="dureeSpecialite" component="div"  className="text-danger" />
    </div>

    <div className="col-md-6"> 
    <label > Diplome de Formation </label>
   <Field class="form-control"  name="diplomeSpecialite" as="select" >
       <option >Choix</option>

       <option >ŔÖō§ŔáŔĄ ōßŔĄō™ŔāŔÜŔä ōßŔĄō≥ōßŔÖŔä</option>
       <option > ŔÖō§ŔáŔĄ ōßŔĄō™ŔāŔÜŔä ōßŔĄŔÖŔáŔÜŔä  ŔÖŔÜōłōĪō© ŔĀŔä ōßŔĄŔÖō≥ō™ŔąŔČ</option>
   </Field>
   <ErrorMessage name="diplomeSpecialite" component="div"  className="text-danger" />
</div>

 
<div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => resetForm(initialValues)}
                  className="btn btn-secondary "
                >
                  Reset
                </button>
              </div>
</Form>
          )}
        </Formik>
</div>
</div>
    )
}}
export default Ajoutspecialite;