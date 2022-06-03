import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
class Addsection extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        codeSection: '' ,
        codePromotion:  '',
        libSection:  '',
        codeSpecialite: '', 
        codeDiplome:  '',
        groupeSection:  '',  
        listeSpecialites:[],
        listePromotions:[],
    }}

  validationSchema() {
    return Yup.object().shape({
      codeSection: Yup.string() .required('Code Section obligatoire')
      .min(3, 'Code Section obligatoire'),
      codePromotion:  Yup.string()
      .required('Champs obligatoire '),
      codeDiplome: Yup.string()
        .required('Champs obligatoire en Arabe'),
        codeSpecialite: Yup.string()
        .required('Champs obligatoire'),
        libSection: Yup.string()
        .required('Champs obligatoire'),
      });
    }


onSubmit(values) {

  const studentObject = {
    codeSection:values.codeSection,
    codePromotion:values.codePromotion,
    libSection:values.libSection,
    codeSpecialite:values.codeSpecialite,
    codeDiplome:values.codeDiplome,
    groupeSection:values.groupeSection,
  };
        axios.post('http://localhost/sect',studentObject).then(res => 
        toast.success('insertion avec success')
      ).catch(err => {toast.error("Erreur d'insertion ")}) 
      
      }



                    fetchSpecialite() {
                        fetch(`http://localhost/spc`)
                          // We get the API response and receive data in JSON format...
                          .then(response => response.json())
                          // ...then we update the users state
                          .then(data =>
                            this.setState({
                                listeSpecialites: data,
                              isLoading: false,
                            })
                          )
                          // Catch any errors we hit and update the app
                          .catch(error => this.setState({ error, isLoading: false }));
                      }

                      fetchPromotion() {
                        fetch(`http://localhost/prom`)
                          // We get the API response and receive data in JSON format...
                          .then(response => response.json())
                          // ...then we update the users state
                          .then(data =>
                            this.setState({
                              listePromotions: data,
                              isLoading: false,
                            })
                          )
                          // Catch any errors we hit and update the app
                          .catch(error => this.setState({ error, isLoading: false }));
                      }


           componentDidMount() {
                     this.fetchSpecialite();
                     this.fetchPromotion();
                     const token = localStorage.getItem("token");
                     if (token){
                     console.log('ok')
                     }
                     else{
                       this.props.history.push('/');
                     }
                  }



    render(){

      const initialValues = {
        codeSection: '' ,
        codePromotion:  '',
        libSection:  '',
        codeSpecialite: '', 
        codeDiplome:  '',
        groupeSection:  '', 

   };

    return(
<div className="content">
      
        <div className>
        <h2>Ajoute une Nouvelle Section</h2>
        <ToastContainer/>
        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema} onSubmit={this.onSubmit} >

{({ resetForm,values}) => (
            <Form class="row g-3" noValidate>

  <div className="col-md-6">
  <label> Code Section </label>
  <Field type="text" className="form-control " placeholder="enter code Section" name="codeSection"/>
  <ErrorMessage name="codeSection" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label>  Section </label>
  <Field type="text" className="form-control " placeholder="enter lib Section " name="libSection"/>
    <ErrorMessage name="libSection" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label>  Section Ar </label>
  <Field type="text" className="form-control " placeholder="enter groupe Section "
  name="groupeSection" />
    </div>
    
    <div className="col-md-6">
    <label>  Diplome </label>
   <Field className="form-control"  name="codeDiplome"  as="select">
       <option >select Diplome</option>
       <option >CAP</option>
       <option >BTP</option>
       <option >BTS</option>
   </Field>
   <ErrorMessage name="codeDiplome" component="div"  className="text-danger" />
</div>

<div className="col-md-6">
<label>  Specialité </label>
   <Field 
   className="form-control" name="codeSpecialite"  as="select"> 
<option >Choisir une spécialités</option>
 
{
                                this.state.listeSpecialites.map(function(specialite) {
                                    return <option value={specialite._id}  >{specialite.libSpecialite}</option>;
                                })
                            }
   </Field>
   <ErrorMessage name="codeSpecialite" component="div"  className="text-danger" />
</div>

<div className="col-md-6">
<label>  Promotion </label>
   <Field  className="form-control"  name="codePromotion"   as="select"> 
   
<option >choisir une Promotion</option>
 
{
                                this.state.listePromotions.map(function(promotion) {
                                    return <option value={promotion._id}  >{promotion.libPromotionFr}</option>;
                                })
                            }
   </Field>
   <ErrorMessage name="codeSpecialite" component="div"  className="text-danger" />
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
export default Addsection;