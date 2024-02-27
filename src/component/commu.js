import React, { useState } from "react";
import "../css/Basic.css";
import uploa from "../img/upload.png";
import Navbar1 from "../common/navbar.js";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCheckbox, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';
export class VendorDetail2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        address1: '',
        address2: '',
        city: '',
        state: '',
        country:'',
        pinCode:'',
        companyName: '',
        image:'',
        open: true,
        commu:false
    }
    this.stateCommu = {
  financeSpoccontactName:'',
  financeSpocdesignation:'',
  financeSpocphoneNo:'',
  financeSpocemail:'',
  operationSpoccontactName:'',
  operationSpocdesignation:'',
  operationSpocphoneNo:'',
  operationSpocemail:'',
  collectionSpoccontactName:'',
  collectionSpocdesignation:'',
  collectionSpocphoneNo:'',
  collectionSpocemail:'',
  managementSpoccontactName:'',
  managementSpocdesignation:'',
  managementSpocphoneNo:'', 
  managementSpocemail:'',
  ocontactName:'',
  designation:'', 
  phoneNo:'',
  email: '',
      open: true,
      commu:false
  }
    this.togglebutton = this.togglebutton.bind(this); 
    this.togglebuttonCommu = this.togglebuttonCommu.bind(this);   
  };
  
  togglebutton() {  
    console.log("basic");
    const { open } = this.state;  
    this.setState({  
        open: true, 
        commu: false,  
    });  
}
togglebuttonCommu() {  
  console.log("comm");
  const { commu } = this.state;  
  this.setState({  
    open: false, 
    commu: true,  
  });  
}
  formValChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    this.setState({ [e.target.id]: e.target.value })
  };
  handleSubmit = e => {
    e.preventDefault();
    apiService.saveVendordetail(this.state)
                .then(response => {
                  console.log("test",response);
                  if(response)
                  {
                    Swal.fire({
                      title: "data submitted successfully",
                      icon: "success",
                      confirmButtonText: "OK",
                  });
                  }
                  else{
                    Swal.fire({
                      title: "Error While Fetching",
                      icon: "error",
                      confirmButtonText: "OK",
                  }); 
                  }
                })
              
  }
  _renderCounter = (e) => () => {
    const [count, setCount] = useState(0);

    return <div>{ count }</div>
  }

  handleSubmitComDetail= e => {
    e.preventDefault();
    apiService.SaveVendorCommunication(this.stateCommu)
                .then(response => {
                  if(response)
                  {
                    Swal.fire({
                      title: "data submitted successfully",
                      icon: "success",
                      confirmButtonText: "OK",
                  });
                  }
                  else{
                    Swal.fire({
                      title: "Error While Fetching",
                      icon: "error",
                      confirmButtonText: "OK",
                  }); 
                  }
                })
              
  }
  componentDidMount() {
  }
  render() {
    const {vendorId,address1,address2,city,state,country,pinCode,contactName,companyName,image,open,commu} = this.state;
    const{ financeSpoccontactName,financeSpocdesignation,
    financeSpocphoneNo,
    financeSpocemail,
    operationSpoccontactName,
    operationSpocdesignation,
    operationSpocphoneNo,
    operationSpocemail,
    collectionSpoccontactName,
    collectionSpocdesignation,
    collectionSpocphoneNo,
    collectionSpocemail,
    managementSpoccontactName,
    managementSpocdesignation,
    managementSpocphoneNo, 
    managementSpocemail,
    ocontactName,
    designation, 
    phoneNo,
    email} = this.stateCommu;
    const MyInlineHook = this._renderCounter();
    return (
      <>
         {/* <div className="basicinformation-div9">
      <div class="ribbon basic-information-label left" onClick={this.togglebutton}><label className='labelName'>Basic information</label></div>
      <div class="ribbon basic-information-label right" onClick={this.togglebuttonCommu}><label className='labelName'>communication Details</label></div>
      </div> */}
      <div className="vendor-det">
      <Navbar1 />
      <div class="container-fluid ribbonMain"> 
      <div class="ribbon basic-information-label left" onClick={this.togglebutton}> <div class="container-fluid"> <span className={ open ? 'dotActive' : 'dotInActive' }></span><label className='labelName'>Basic information</label></div></div>
      <div class="ribbon basic-information-label right" onClick={this.togglebuttonCommu}><div class="container-fluid"><span className={ commu ? 'dotActive' : 'dotInActive' }></span><label className='labelName'>communication Details</label></div></div>
      </div>
      <div class="container-fluid"> 
   <div className="mx-auto mt-5" > 
   {open && ( 
   <div class="container-fluid"> 
   <MDBTypography tag="h5" className="mb-0">Basic information</MDBTypography> 
   <br/>
   <MDBRow>
      <MDBCol md="12" className="mb-12">
        <MDBCard className="mb-12">
        <div class="container-fluid">  
    <MDBRow>
      <MDBCol md="8" className="mb-4">
        <MDBCard className="mb-4 basic">     
          <MDBCardBody>
            <form>
              <label htmlFor="companyName">Company Name*</label>
              <input  type="text" className="mb-4" name="companyName" id="companyName" onChange={this.formValChange}  value={companyName} />
              <label htmlFor="address1">Address line - 1*</label>
              <input  type="text" className="mb-4" name="address1" id="address1" onChange={this.formValChange}  value={address1} />
              <label htmlFor="address2">Address line - 2*</label>
              <input  type="text" className="mb-4" name="address2" id="address2" onChange={this.formValChange}  value={address2} />
                 <MDBRow className="mb-4">
                <MDBCol>
                <label htmlFor="country">Country*</label>
                <input  type="text" className="mb-4" name="country" id="country" onChange={this.formValChange}  value={country} />
                </MDBCol>
                <MDBCol>
                <label htmlFor="state">State*</label>
                <input  type="text" className="mb-4" name="state" id="state" onChange={this.formValChange}  value={state} />
                </MDBCol>
              </MDBRow>
                 <MDBRow className="mb-4">
                <MDBCol>
                <label htmlFor="city">City*</label>
                <input  type="text" className="mb-4" name="city" id="address2" onChange={this.formValChange}  value={city} />
                 </MDBCol>
                <MDBCol>
                <label htmlFor="pinCode">Pincode*</label>
                <input  type="text" className="mb-4" name="pinCode" id="pinCode" onChange={this.formValChange}  value={pinCode} />
                </MDBCol>
              </MDBRow>
              <div className="d-flex justify-content-center">
              <MDBRow className="mb-4">
              <MDBCol>
              <MDBBtn>cancel</MDBBtn>
                </MDBCol>
                <MDBCol>
                <MDBBtn onClick={this.handleSubmit}>save</MDBBtn>
                </MDBCol>
                <MDBCol>
                <MDBBtn>next</MDBBtn>
                </MDBCol>
                </MDBRow>
                </div>
        </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="4" className="mb-4">
        <MDBCard className="mb-4 imageUpload">
          <label  htmlFor="file-input">
            <img src={uploa} alt=""/>
          </label>
          
          <MDBInput type="file" name="image"   accept=".jpeg, .png, .jpg" className="mb-4" value={image} />
          <MDBCardHeader className="py-3">
            <MDBTypography tag="h5" className="mb-0">Company's Upload logo</MDBTypography>
          </MDBCardHeader>     
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </div> 
          </MDBCard>
          </MDBCol>
          </MDBRow>
          </div>
     )}  
       {commu && ( 
   <div class="container-fluid"> 
   <MDBTypography tag="h5" className="mb-0">Communication Detail</MDBTypography> 
   <br/>
   <MDBRow>
      <MDBCol md="12" className="mb-12">
        <MDBCard className="mb-12">
        <div class="container-fluid">  
        <form>
        <label >Finance Spoc</label>
        <MDBRow className="mb-4">
                <MDBCol>
                <label >Contact name*</label>
                <input  type="text" className="mb-4" name="Contact" id="companyName" onChange={this.formValChange2} value={this.stateCommu.financeSpoccontactName}/>         
                  </MDBCol>
                <MDBCol>
                <label>Designation*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >phoneNo*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >email*</label>
            <input  type="text" required />
              </MDBCol>
              </MDBRow>
              <label >Operation Spoc</label>
        <MDBRow className="mb-4">
                <MDBCol>
                <label >Contact name*</label>
            <input  type="text" required />   </MDBCol>
                <MDBCol>
                <label>Designation*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >phoneNo*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >email*</label>
            <input  type="text" required />
              </MDBCol>
              </MDBRow>
              <label >Collection Spoc</label>
        <MDBRow className="mb-4">
                <MDBCol>
                <label >Contact name*</label>
            <input  type="text" required />   </MDBCol>
                <MDBCol>
                <label>Designation*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >phoneNo*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >email*</label>
            <input  type="text" required />
              </MDBCol>
              </MDBRow>
              <label >Management Spoc</label>
        <MDBRow className="mb-4">
                <MDBCol>
                <label >Contact name*</label>
            <input  type="text" required />   </MDBCol>
                <MDBCol>
                <label>Designation*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >phoneNo*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >email*</label>
            <input  type="text" required />
              </MDBCol>
              </MDBRow>
              <label >others</label>
        <MDBRow className="mb-4">
                <MDBCol>
                <label >Contact name*</label>
            <input  type="text" required />   </MDBCol>
                <MDBCol>
                <label>Designation*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >phoneNo*</label>
            <input  type="text" required />
              </MDBCol>
              <MDBCol>
                <label >email*</label>
            <input  type="text" required />
              </MDBCol>
              </MDBRow>
                  <div className="d-flex justify-content-center">
              <MDBRow className="mb-4">
              <MDBCol>
              <MDBBtn>cancel</MDBBtn>
                </MDBCol>
                <MDBCol>
                <MDBBtn onClick={this.handleSubmitComDetail}>save</MDBBtn>
                </MDBCol>
                <MDBCol>
                <MDBBtn>next</MDBBtn>
                </MDBCol>
                </MDBRow>
                </div>
      </form>
    </div> 
          </MDBCard>
          </MDBCol>
          </MDBRow>
          </div>
     )}  
  </div>  
    </div>
    </div>
    </>
    )
  }
}

export default VendorDetail2;
