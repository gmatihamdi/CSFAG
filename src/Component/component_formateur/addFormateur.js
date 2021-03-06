import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
class AddFormateur extends React.Component{
 
  
 constructor(props) {
    super()
    this.state = {
     // state={
        cinFormateur:'',
        nomFormateurFr: '',
        nomFormateurAr: '',
        sexe: String,
        Lieunaissance: '',
        etatFormateur: '',
        datenaiFormateur:Date,
        adressFormateur: '',
        telFormateur:'',
        emailFormateur: '',
        ErrnomFormateurFr:'',
        ErrtelFormateur:'',
        ErrnomFormateurAr:''
    }
   
  }


  validationSchema() {
    return Yup.object().shape({
      cinFormateur: Yup.string() .required('cin is required')
      .min(8, 'Username must be at least 8 characters')
      .max(8, 'Username must not exceed 8 characters'),
      nomFormateurFr:  Yup.string()
      .required('First Name is required'),
       
        emailFormateur: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
        nomFormateurAr: Yup.string()
        .required('Username ar is required'),
       

        telFormateur: Yup.string()
        .required('tel is required')
        .min(8, 'tel must be at least 8 characters'),

        adressFormateur: Yup.string()
        .required('@ is required'),
      
        etatFormateur: Yup.string()
        .required('etat is required'),
        
       
    });
  }

onSubmit(values) {
  //e.preventDefault()
  //alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
 
  const studentObject = {
    cinFormateur:values.cinFormateur,
    nomFormateurFr:values.nomFormateurFr,
    nomFormateurAr:values.nomFormateurAr,
   // sexe:values.sexe,
    etatFormateur:values.etatFormateur,
    adressFormateur:values.adressFormateur,
    telFormateur:values.telFormateur,
    emailFormateur:values.emailFormateur,
  };
        axios.post('http://localhost/formateur',studentObject).then(res => 
        toast.success('insertion avec success')
      ).catch(err => {toast.error("Erreur d'insertion ")})      
}


componentDidMount() {
const token = localStorage.getItem("token");
if (token){
console.log('ok token')
}
else{
  this.props.history.push('/');
}

}
    render(){

      const initialValues = {
        cinFormateur:'',
        nomFormateurFr: '',
        nomFormateurAr: '',
        etatFormateur: '',
        adressFormateur: '',
        telFormateur:'',
        emailFormateur: '',
      };



    return(
      <div className="content">
    
        <div className="register-form">
        <h2>Ajoute Formateur</h2>
        <ToastContainer/>

        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema} onSubmit={this.onSubmit} >

{({ resetForm,values}) => (
            <Form class="row g-3" noValidate>
             
<div className="col-md-6">
<label> CIN </label>
<Field name="cinFormateur" className="form-control " type="text" placeholder="enter CIN" 
  //value={values.cinFormateur}
 // onChange={this.props.handleChange}
  //value={this.state.cinFormateur}
 // onChange={this.handleCinFormateur}
 // onChange={this.onChangeCinFormateur}

  />
<ErrorMessage
                  name="cinFormateur"
                  component="div"
                  className="text-danger"
                />

    </div>
    <div className="col-md-6">
    <label> Nom&Pr??nom </label>
    <Field  type="text" className="form-control " placeholder=" Nom&Pr??nom "
  name="nomFormateurFr"
 // value={this.state.nomFormateurFr}
//  onChange={this.onChangeNomFormateurFr}
  />
 <ErrorMessage
                  name="nomFormateurFr"
                  component="div"
                  className="text-danger"
                />
    </div>
    <div className="col-md-6">
    <label> Nom&Pr??nom arabe </label>
    <Field type="text" className="form-control" placeholder="Nom&Pr??nom arabe "
  name="nomFormateurAr"
 // value={this.state.nomFormateurAr}
 // onChange={this.onChangeNomFormateurAr}
  />
  <ErrorMessage
                  name="nomFormateurAr"
                  component="div"
                  className="text-danger"
                />
    </div>
    <div className="col-md-6">
    <label> Addresse</label>
    <Field  type="text" className="form-control " placeholder="Addresse "
  name="adressFormateur"
 // value={this.state.adressFormateur}
 // onChange={this.onChangeAdressFormateur}
  />
  <ErrorMessage
                  name="adressFormateur"
                  component="div"
                  className="text-danger"
                />
    </div>
    <div className="col-md-6">
    <label> Email</label>
    <Field name="emailFormateur" type="email" className="form-control " placeholder="email "
 // value={this.state.emailFormateur}
 // onChange={this.onChangeEmailFormateur}
  />
   <ErrorMessage
                  name="emailFormateur"
                  component="div"
                  className="text-danger"
                />
  </div>
   <div className="col-md-6">
    <label> T??lephone</label>
    <Field type="text" className="form-control " placeholder="T??lephone "
  name="telFormateur"
 // value={this.state.telFormateur}
 // onChange={this.onChangeTelFormateur}
  />
  <ErrorMessage
                  name="telFormateur"
                  component="div"
                  className="text-danger"
                />
    </div>
    

    <div className="col-md-6">
    <label>Etat</label>
   
    <Field name="etatFormateur" as="select" class="form-control"  
    //value={this.state.etatFormateur}
    //  onChange={this.onChangeEtatFormateur}
      >
       <option >select Etat</option>

       <option >actif</option>
       <option >inactif</option>

       <option >retraite</option>
       </Field>
 
   <ErrorMessage
                  name="etatFormateur"
                  component="div"
                  className="text-danger"
                />


</div>

<div className="col-md-6">
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
export default AddFormateur;