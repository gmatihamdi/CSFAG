import React from 'react'
import axios from 'axios'
import jsPDF  from 'jspdf'

import Pdf  from 'react-to-pdf'
import ReactToPdf  from 'react-to-pdf'

import 'jspdf-autotable'

const ref = React.createRef();


class Pdfspec extends React.Component{

    constructor(props){
        super(props);
        this.state ={
          users:[],
          id:0,
          codeSpecialite:'',
          libSpecialite:'',
          libSpecialiteAr:  '',
          typeSpecialite:  '',
          dureeSpecialite: '',
          diplomeSpecialite:''
        
         
        }}
      
        componentDidMount(){
            axios.get('http://localhost/spc')
            .then((res)=>{
              this.setState({
              users:res.data,
              id:0,
              codeSpecialite:'',
              libSpecialite:'',
              libSpecialiteAr:  '',
              typeSpecialite:  '',
              dureeSpecialite: '',
              diplomeSpecialite:''
            })
           
        
            })
          }
pdfGenerate=()=>{
 var AmiriRegular = 'undefined';
  var pdf = new jsPDF('p', 'pt', 'a4');
 
  pdf.text(60,60,'hellllo');
  pdf.addFileToVFS('../../fonts/Amiri-Regular.ttf',AmiriRegular);
  pdf.addFont('Amiri-Regular.ttf', 'Almarai', 'normal');
  pdf.setFont('Almarai');
  //pdf.setFontType('normal');

 pdf.text('مرحبا', 200, 10, {  lang: 'ar' });
  pdf.text(160,180,'مط التكوي');
  pdf.text(70,90,'ali centre ');
  pdf.autoTable({ html: '#my-table' })
// Or use javascript directly:
pdf.autoTable({
  head: [['code specialité', 'specialité', 'نمط التكوي','مدة التكوي',' شهادة']],
  
  body: [
    this.state.users.map((specialite,index)=>(
    [specialite.codeSpecialite, specialite.libSpecialite, specialite.typeSpecialite,specialite.dureeSpecialite,specialite.diplomeSpecialite]
    ))
    // ...
  ],
})
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style','position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  document.body.appendChild(iframe);
  
  iframe.src = pdf.output('datauristring');

}








    render(){
return(
<>
<div className="form-group" ref={ref}   size="A4" style={{fontSize:"12px"}}>


les spacialites de centre  

<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">code specialité</th>
    <th scope="col">specialité</th>
    <th scope="col">نمط التكوين</th>
    <th scope="col">مدة التكوين</th>
    <th scope="col">شهادة</th>
  </tr>
</thead>
<tbody>  
  {this.state.users.map((specialite,index)=>(
          <tr key={specialite._id}>
          <th scope="row">{index + 1}</th>
            <td>{specialite.codeSpecialite}</td>
            <td>{specialite.libSpecialite}</td>
            <td>{specialite.typeSpecialite}</td>
            <td>{specialite.dureeSpecialite}</td>
            <td>{specialite.diplomeSpecialite}</td>           
  </tr>
  ))}
</tbody>
</table>
</div>
<button onClick={this.pdfGenerate}>pdf generate</button>
<Pdf targetRef={ref} filename="specialites.pdf">

{({toPdf})=><button onClick={toPdf}>imprimer</button>}

</Pdf>

<div>
    <ReactToPdf targetRef={ref} filename="div-blue.pdf">
        {({toPdf}) => (
            <button onClick={toPdf}>Generate pdf</button>
        )}
    </ReactToPdf>
    <div style={{width: 200, height: 842, }} ref={ref}>

    <table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">N°</th>
    <th scope="col">code specialité</th>
    <th scope="col">specialité</th>
    <th scope="col">نمط التكوين</th>
    <th scope="col">مدة التكوين</th>
    <th scope="col">شهادة</th>
  </tr>
</thead>
<tbody>  
  {this.state.users.map((specialite,index)=>(
          <tr key={specialite._id}>
          <th scope="row">{index + 1}</th>
            <td>{specialite.codeSpecialite}</td>
            <td>{specialite.libSpecialite}</td>
            <td>{specialite.typeSpecialite}</td>
            <td>{specialite.dureeSpecialite}</td>
            <td>{specialite.diplomeSpecialite}</td>           
  </tr>
  ))}
</tbody>
</table>





    </div>
</div>

</>



);
}

}

export default Pdfspec;