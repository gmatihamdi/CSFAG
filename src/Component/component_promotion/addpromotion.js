import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
class Addpromotion extends React.Component{

  
  constructor(props) {
    super(props)

    // Setting up functions
 
    // Setting up state
    this.state = {
    
        codePromotion:  '',
         libPromotionFr:  '',
         libPromotionAr:  '',
         debutPromotion: '',
         finPromotion:  '',
         capacitePromotion:  '',  
 
    }
  } 
  validationSchema() {
    return Yup.object().shape({
      codePromotion: Yup.string() .required('cin is required')
      .min(3, 'Code specialité obligatoire'),
      libPromotionFr:  Yup.string()
      .required('Champs obligatoire en Francais'),
      libPromotionAr: Yup.string()
        .required('Champs obligatoire en Arabe'),
        debutPromotion: Yup.string()
        .required('Champs obligatoire'),
        finPromotion: Yup.string()
        .required('Champs obligatoire'),
      });
    }



onSubmit(values) {

  const studentObject = {
    codePromotion:values.codePromotion,
    libPromotionFr:values.libPromotionFr,
    libPromotionAr:values.libPromotionAr,
    debutPromotion:values.debutPromotion,
    finPromotion:values.finPromotion,
    capacitePromotion:values.capacitePromotion,

  };
        axios.post('http://localhost/prom',studentObject).then(res => 
        toast.success('insertion avec success')
      ).catch(err => {toast.error("Erreur d'insertion ")}) 
      }
     

    componentDidMount(){
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
        codePromotion:  '',
        libPromotionFr:  '',
        libPromotionAr:  '',
        debutPromotion: '',
        finPromotion:  '',
        capacitePromotion:  '', 
        };
    
    return(

       <div className="content">     
       <ToastContainer/>
        <div >
        <h2>Ajoute une Nouvelle Promotion</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema} onSubmit={this.onSubmit} >

{({ resetForm,values}) => (
            <Form class="row g-3" noValidate>
  <div className="col-md-6">
  <label for="inputEmail4" class="form-label">Code Promotion</label>
  <Field type="text" className="form-control " placeholder=" code promotion " name="codePromotion" />
  <ErrorMessage name="codePromotion" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label for="inputEmail4" class="form-label"> Promotion Fr</label>
  <Field type="text" className="form-control " placeholder="enter lib promotion " name="libPromotionFr"/>
  <ErrorMessage name="libPromotionFr" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label for="inputEmail4" class="form-label">Promotion Ar</label>
  <Field type="text" className="form-control" placeholder="enter lib promotion Ar "
  name="libPromotionAr"/>
    <ErrorMessage name="libPromotionAr" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
  

                        <label>Date debut de formation: </label>
                        <div>
                        <Field  type="date"  className="form-control " name="debutPromotion"/>
                        <ErrorMessage name="debutPromotion" component="div"  className="text-danger" />
                        </div>
                    </div>
                    <div className="col-md-6">
                   
                        <label>Date fin de formation </label>
                        <div>
                        <Field  type="date"  className="form-control " name="finPromotion"/>
                        <ErrorMessage name="finPromotion" component="div"  className="text-danger" />
                        </div>
                    </div>

                    <div className="col-md-6">
                    <label> Capacité de formation </label>
  <Field type="text" className="form-control" placeholder="capacité " name="capacitePromotion"/>
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
export default Addpromotion;