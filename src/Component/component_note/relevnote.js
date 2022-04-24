import React from 'react'
import axios from 'axios'
import Pdf from 'react-to-pdf'
import 'jspdf-autotable'
import ReactToPdf  from 'react-to-pdf'
import logo from './entete.jpeg' // relative path to image 
import fontarab from './Amiri-Regular.ttf' // relative path to image 
import { base64Str } from 'base-64';
import jsPDF from 'jspdf';
import { Preview, print } from 'react-html2pdf';
//import { Page, Text, View, Document } from '@react-pdf/renderer'
import { Link} from "react-router-dom"
//import Canvas from 'react-canvas-component'
//by importing 
import {Col,Button} from "reactstrap";
const ref = React.createRef();
const If = (props) => {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;
  
  return condition ? positive : negative;
};

class PdfRnote extends React.Component{

    constructor(props){ 
        super(props);
        this.state ={
          users:[],
          id:0,
          codeSection: '' ,
          Moyn:'',
          Result:'',
          libSection:  '',
          codeSpecialite:'',
          libSpecialite:'',
          cinStagiaire:'',
          listnote:[],
          stgs:[],
          matieres:[],
          retourdetails:[]
        } 
        this.onChangeCinStagiaire = this.onChangeCinStagiaire.bind(this);
    
    
    }
        onChangeCinStagiaire(e){
            this.setState({ cinStagiaire:e.target.value })
      }
      
      componentDidMount() {    
        const a={
          x:this.props.match.params.id,
        }
      // axios.post(`http://localhost/methode/getlist`,a)
       axios.post(`http://localhost/methode/getrelevnote`,a) 
       .then((res)=>{
              this.setState({
              listnote:res.data.data ,
             // ... res.data.data1,
             stgs:res.data.data1,
             Moyn:res.data.data2,
             Result:res.data.data3,
          
            })
            console.log('Moyn')
            console.log(this.state.Moyn)
            console.log( this.state.listnote)
            console.log(this.state.stgs.codePromotion?.libPromotionAr)
            })
        // Catch any errors we hit and update the app
        .catch(error => this.setState({ error, isLoading: false }));



        axios.post(`http://localhost/methode/getdetails`,a) 
        .then((res)=>{
               this.setState({ 
              retourdetails:res.data,
             })
             console.log('retourdetails')
             console.log(this.state.retourdetails) 
             })
         // Catch any errors we hit and update the app
         .catch(error => this.setState({ error, isLoading: false }));
  
    }

    pdfGenerate=()=>{
      console.log('Moyn')
      console.log(this.state.Moyn)
    //  var iframe = document.createElement('iframe');
   //   iframe.setAttribute('style','position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
   //  document.body.appendChild(iframe);
 var img = new Image()
     var Values =  this.state.listnote.map( (element) => Object.values([element.libMatiere,element.codeMatiere,element.seuilMatiere,element.notefinale,element.resnote]));
       var pdf = new jsPDF('p', 'pt', 'a4');
     pdf.setFontSize(9);
     pdf.addImage(logo, 'JPEG', 35, 10, 520, 50);
     pdf.setFontSize(22);

    // const AmiriRegular = fontarab;

     pdf.addFileToVFS(fontarab, base64Str);
     pdf.addFont(fontarab, 'Amiri', 'normal');
    pdf.setFont('Amiri'); 
       pdf.text(210, 50, 'بطاقة كشف الكفايات', {lang: 'ar'})
       pdf.setFontSize(10);
       
       pdf.text(550, 100, ':الاسم و اللقب ', {align: 'right' })
       pdf.text(400, 100,this.state.stgs.nomStagiaireAr)
       pdf.text(280, 100, ':عدد بطاقة التعريف الوطنية ', {align: 'right' })
       pdf.text(110, 100,this.state.stgs.cinStagiaire)
      
       //pdf.line(35, 110, 300, 110);
       pdf.text(550, 120,':الاختصاص', {align: 'right' })
       pdf.text(340, 120,this.state.retourdetails?.codeSpecialite.libSpecialiteAr)
       pdf.text(280, 120,':الرمز', {align: 'right' })
       pdf.text(110, 120,this.state.retourdetails?.codeSpecialite.codeSpecialite)

       pdf.text(550, 140,':مدة التكوين  من ', {align: 'right' })
       pdf.text(400, 140,'01/02/2019')
       pdf.text(280, 140,':إلى', {align: 'right' })
       pdf.text(110, 140,'30/06/2021')

       pdf.text(550, 160,': نمط التكوين ', {align: 'right' })
       pdf.text(400, 160,this.state.retourdetails?.codeSpecialite.typeSpecialite)
       pdf.text(280, 160,':شهادة', {align: 'right' })
       pdf.text(35, 160,this.state.retourdetails?.codeSpecialite.diplomeSpecialite)



       pdf.text(35, 650,'MOYENNE GÉNÉRALE');
       pdf.text(170,650,this.state.Moyn+'/100')
     pdf.line(35,670, 300, 670);
       pdf.text(35, 690,'DÉCISION DU CONSEIL')
       pdf.text(170, 690,this.state.Result+'(e)')
      pdf.setFontSize(9)
      pdf.text(35, 800,"(*) Il ne peut être délivré qu'une seule copie du présent relevé de notes")
       pdf.autoTable({ html: '#my-table' , startY: 150,showHead: 'everyPage'})
     // Or use javascript directly:
     pdf.autoTable({    
       head: [['Titre du module', 'Code', 'Seuil de réussite en %','Note en %','Observation']],  
        body:Values
   
     }) 
   //    var iframe = document.createElement('iframe');
     //  iframe.setAttribute('style','position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
    //   document.body.appendChild(iframe);  
     //  iframe.src = pdf.output('datauristring');

       window.open(pdf.output('bloburl'))
     }
//style={{fontSize:"6px"}} style={{width:600, height: 150, }}     
          //style={{fontSize:'9px', width: 700, height: 900}} 
          /* <ReactToPdf targetRef={ref} filename="div-blue.pdf">
        {({toPdf}) => (
          <button onClick={toPdf}>Generate pdf</button>
      )}
  </ReactToPdf>*/
    render(){
      const { stgs } = this.state
return(
<>
<div className="content" >
<img src={logo} alt={"logo"}/> 
   

  
    <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          onClick={this.pdfGenerate}
                          size="sm"
                        >
                          <i className="fa fa-print" />
                        </Button>
                      </Col> 

    
    <div id="print"   ref={ref}>
     <b align="center" valign="middle"><font size={14} color="#000000">          
  <center>
  Relevé de notes
</center> 
</font></b><br />
 
    
     <table  className="table">

       <tr>
     <td>  {stgs.cinStagiaire}</td>

     <td>    CIN </td>
        
     <td> </td>
     <td> </td>

     <td> {stgs.nomStagiaireFr}</td>

     <td>Nom et Prénom </td>
    
      
      </tr>



      <tr>
     <td> 1301301</td>
     <td>  Code </td>
     <td> </td>
     <td> </td>  
     <td> {stgs.specialiteStagiaire} </td>    
     <td>specialite  </td>
     </tr>
     
     <tr>
     <td>   02 / 02 /2019
   </td>    
   <td>    au </td>
   <td>  30 / 01 /2017 </td>
   <td> </td>
   <td> du </td>       
   <td> Durée de Formation </td>
   </tr>
        <tr>
        <td>
          en Alternance          </td>
        <td>
        Type de Formation
        </td> 
        <td> </td> <td> </td> 
        <td>
   
          echel4
         
          </td>
          <td> Diplome
          </td>
        
        </tr>
     
        </table>
      

        <table className="table table-striped table-bordered table-sm">
<thead class="thead-dark">

      <tr>
      <th scope="col">N°</th>
      <th scope="col">Titre du module</th>
      <th scope="col">Code</th>
      <th scope="col">Seuil de réussite en %</th>
      <th scope="col">Note en %</th>
      <th scope="col">Observation</th>
      </tr>
      </thead>
<tbody>
      { this.state.listnote.map((element,index)=>(
      <tr>
     <td>{index + 1}</td>
     <td>{element.libMatiere}</td>
     <td>{element.codeMatiere}</td>
     <td>{element.seuilMatiere}</td>
     <td>{element.notefinale}</td>
     
        
    <If condition={element.notefinale >= element.seuilMatiere} then={
    
    <td><font  color="green">Compétence acquise</font></td>
  }
            else={
              <td><font  color="red">Compétence non acquise</font></td>
      }
            />
    </tr>
    ))}
 

      <tr>
      <td align="left" valign="middle"></td>
       <td >MOYENNE GÉNÉRALE </td><td><b>   {this.state.Moyn} / 100</b></td>
       
        
      </tr>
    
      <tr>
      <td align="left" valign="middle"><b><font size={4} color="#000000"><br /></font></b></td>
        <td  align="left" valign="top">DÉCISION DU CONSEIL</td><td> <b>  {this.state.Result}</b></td>
      
      </tr>
      </tbody>
    </table>
    <Preview id={'jsx-template'} >
    <font face="Times New Roman" color="#000000">(*) Il ne peut être délivré qu'une seule copie du présent relevé de notes </font>
        

</Preview>
<button onClick={()=>print('a', 'jsx-template')}> print</button>












 
</div></div>

</>
);
}
}
export default PdfRnote;