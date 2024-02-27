import "../css/StatutoryDetails.css";
import pdf from "../pdf/Declaration of GST Non Enrollment Format.pdf";
import Navbar1 from "../common/navbar.js";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import InputGroup from "react-bootstrap/InputGroup";
import Tooltip from "@material-ui/core/Tooltip";
import handleApiError from '../utils/Errorhandler';
const GSTValidation = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
const PANValidation = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const gstNo = `Goods and Service Tax`;
const panNo = `Permanent Account Number (PAN)`;
const cinNo = `Corporate Identification Number`;
const msmeNo = `Ministry of Micro, small & Medium Enterprises`;
const tanNo = `Tax Deduction Account Number`;

export default function Statutory(props) {
  const location = useLocation();
  const [countryName, setCountryName] = useState(null);
  const [HideImport, setHideImport] = useState(true);
  const [url, seturl] = useState();
  const [redirectUrl, setredirectUrl] = useState();
  const [fileDisclosure, setfileDisclosure] = useState();
  const [showLoginTab, setshowLoginTab] = useState(true);
  const [validpanNo, setvalidpanNo] = useState(false);
  const [editTab, seteditTab] = useState(true);
  const [statRes, setstatRes] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [hideMSMEunRegisteredField, sethideMSMEunRegisteredField] =
    useState(true);
  const [hideunRegisteredField, sethideunRegisteredField] = useState(true);
  const [GST_type, setGST_type] = useState("Registered");
  const [MSME, setMSME] = useState("1");
  const [staticPAN_No, setstaticPAN_No] = useState("");
  const [masterVendoremail, setmasterVendoremail] = useState("");
  const [MSME_status, setMSME_status] = useState("1");
  const [GST_Doc, setFile] = useState();
  const [PAN_Doc, setPAN_Doc] = useState();
  const [PE_Declaration_Doc, setPE_Declaration_Doc] = useState();
  const [EditPE_Declaration_Doc, setEditPE_Declaration_Doc] = useState();
  const [form_10f_Doc, setform_10f_Doc] = useState();
  const [Editform_10f_Doc, setEditform_10f_Doc] = useState();
  const [TAN_Doc, setTAN_Doc] = useState();
  const [MSME_Doc, setMSME_Doc] = useState();
  const [Tax_residency_Doc, setTax_residency_Doc] = useState();
  const [editTax_residency_Doc, seteditTax_residency_Doc] = useState();
  const [submit, setSubmit] = useState(null);
  const params = useParams();
  const [fileRPD, setfileRPD] = useState();
  const [country, setcountry] = useState({});
  const [style, setStyle] = useState("editable");
  const [deleteform_10fUploadedFile, setdeleteform_10fUploadedFile] =
    useState(false);
  const [
    deletePE_DeclarationUploadedFile,
    setdeletePE_DeclarationUploadedFile,
  ] = useState(false);
  const [deleteTax_residencyUploadedFile, setdeleteTax_residencyUploadedFile] =
    useState(false);
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    GST_type: "",
    GST_No: "",
    PAN_No: "",
    PE_DeclarationNo: "",
    CIN_No: "",
    form_10f: "",
    // MSME_status: "",
    MSME_No: "",
    MSME_Type: "",
    TAN_No: "",
    Tax_residency_No: "",
    userType: "",
  });
  const [isNewValueEntered, setIsNewValueEntered] = useState(false);

  function onChangeValue(event) {
    setIsNewValueEntered(true);
    setGST_type(event.target.value);
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
    } else if (name === "GST_type" && value !== GST_type) {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }

    if (value === "UnRegistered") {
      if (values.PAN_No === "N/A" && countryName === "IN") {
        setValues((prevValues) => ({
          ...prevValues,
          PAN_No: "",
        }));
        // if (
        //   JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype ===
        //   "NewRegistration"
        // ) {
        //   setValues((prevValues) => ({
        //     ...prevValues,
        //     PAN_No: staticPAN_No,
        //   }));
        // } else {
        //   setValues((prevValues) => ({
        //     ...prevValues,
        //     PAN_No: "",
        //   }));
        // }
      }
      sethideunRegisteredField(false);
    } else {
      sethideunRegisteredField(true);
    }

    if (value === "Import") {
      setValues((prevValues) => ({
        ...prevValues,
        PAN_No: "N/A",
      }));
      setHideImport(false);
    } else {
      setHideImport(true);
    }

    if (value === "Registered") {
      if (values.PAN_No === "N/A" && countryName === "IN") {
        setValues((prevValues) => ({
          ...prevValues,
          PAN_No: "",
          GST_No: "",
        }));
        // if (
        //   JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype ===
        //   "NewRegistration"
        // ) {
        //   setValues((prevValues) => ({
        //     ...prevValues,
        //     PAN_No: staticPAN_No,
        //   }));
        // } else {
        //   setValues((prevValues) => ({
        //     ...prevValues,
        //     PAN_No: "",
        //     GST_No: "",
        //   }));
        // }
      }
      else {
        setValues((prevValues) => ({
          ...prevValues,
          GST_No: "",
        }));
      }
    }

    if (value === "UnRegistered" && values.GST_Registration_No !== "N/A") {
      setValues((prevValues) => ({
        ...prevValues,
        GST_No: "",
      }));
    }
  }

  function onFileDisclosurechange(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    const selectedFile = e.target.files[0];

    if (e.target.files[0]?.size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      e.target.value = "";
    } else {
      Swal.fire("File Selected!", "", "success");
      setfileDisclosure(e.target.files[0]);
    }
  }
  function onChangeValueMSME(event) {
    setIsNewValueEntered(true);
    setMSME(event.target.value);
  }
  function onChangeValueMSME_status(event) {
    setIsNewValueEntered(true);
    setMSME_status(event.target.value);
    if (event.target.value === "2") {
      sethideMSMEunRegisteredField(false);
      setMSME("0");
    } else {
      sethideMSMEunRegisteredField(true);
    }
  }
  const handleChange = (name) => (event) => {
    console.log("valuechanged::",event)
    setIsNewValueEntered(true);
    event.preventDefault();

    const newValue = event.target.value;

    if (newValue !== values[name]) {
      console.log('newvalue::')
      setValues((prevValues) => ({
        ...prevValues,
        [name]: newValue,
      }));
    } else {
      console.log('previousvalue::')
      setValues((prevValues) => ({
        ...prevValues,
        [name]: prevValues[name],
      }));
      
    }
        setErrors(event);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });

    // const formErrors = validateForm();
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: formErrors[name],
    // }));

    setSubmit(true);
    if (name === "PAN_No" && newValue.length === 10) {
     console.log("panno length equal to 10",newValue);

     //SearchpanNo
     apiService.SearchpanNo(newValue,JSON.parse(window.sessionStorage.getItem("jwt")).result.userId).then((res) => {
      console.log("responsepanno::",res.data.result);
      if(res.data.result==="Pan no already exists!")
      {
       setvalidpanNo(true);
       setmasterVendoremail(res.data.mastervendor_email);
      }
      else
      {
       setvalidpanNo(false);
       setmasterVendoremail("");
      }
      }).catch((error) => {
        console.log("errorstatutory:::",error);
        if (error.code === 'ERR_NETWORK') {
          console.log("networkerror:::",error);
          handleApiError(error);
        }
        else
        {
          console.log("error:::",error);
          handleApiError(error);
        }
      });
    }
    else
    {
      setvalidpanNo(false);
      setmasterVendoremail("");
    }
  };

  // const handleChange = (name) => (event) => {
  //   console.log("masmeno::",event);
  //   setIsNewValueEntered(true);
  //   event.preventDefault();

  //   setValues({ ...values, [name]: event.target.value });
  //   setErrors(event);
  //   if (!!errors[name])
  //     setErrors({
  //       ...errors,
  //       [name]: null,
  //     });
  //   setSubmit(true);
  // };
  const onFileChange = (event) => {
    setIsNewValueEntered(true);
    event.preventDefault();
    if (event.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      event.target.value = "";
    } else {
      Swal.fire("File Selected!", "", "success");
      setFile(event.target.files[0]);
      // setValues({
      //   GST_Doc: event.target.files[0],
      // });
    }
  };

  function onFileChangeTax_residency_Doc(e) {
    setIsNewValueEntered(true);
    if (e.size > 5000000) {
      setTax_residency_Doc(null);
      setdeleteTax_residencyUploadedFile(null);
      e = null;
      document.getElementsByName("Tax_residency_Doc")[0].value = null;
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } else {
      Swal.fire("File Selected!", "", "success");
      setTax_residency_Doc(e);
      setdeleteTax_residencyUploadedFile(true);
    }
  }
  function onFileChangeform_10f_Doc(e) {
    setIsNewValueEntered(true);
    if (e.size > 5000000) {
      setform_10f_Doc(null);
      setdeleteform_10fUploadedFile(null);
      e = null;
      document.getElementsByName("form_10f_Doc")[0].value = null;
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } else {
      Swal.fire("File Selected!", "", "success");
      setform_10f_Doc(e);
      setdeleteform_10fUploadedFile(true);
    }
  }
  function onFileChangePAN_Doc(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    if (e.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      e.target.value = "";
    } else {
      Swal.fire("File Selected!", "", "success");
      setPAN_Doc(e.target.files[0]);
      // setValues({
      //   PAN_Doc: e.target.files[0],
      // });
    }
  }
  function onFileChangePE_Declaration_Doc(e) {
    setIsNewValueEntered(true);
    if (e.size > 5000000) {
      setPE_Declaration_Doc(null);
      setdeletePE_DeclarationUploadedFile(null);
      e = null;
      document.getElementsByName("PE_Declaration_Doc")[0].value = null;
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } else {
      Swal.fire("File Selected!", "", "success");
      setPE_Declaration_Doc(e);
      setdeletePE_DeclarationUploadedFile(true);
    }
  }
  function onFileChangeTAN_Doc(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    if (e.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      e.target.value = "";
    } else {
      Swal.fire("File Selected!", "", "success");
      setTAN_Doc(e.target.files[0]);
      // setValues({
      //   TAN_Doc: e.target.files[0],
      // });
    }
  }
  function onFileChangeMSME_Doc(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    if (e.target.files[0].size > 5000000) {
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      e.target.value = "";
    } else {
      Swal.fire("File Selected!", "", "success");
      setMSME_Doc(e.target.files[0]);
      // setValues({
      //   MSME_Doc: e.target.files[0],
      // });
    }
  }
  const redirectToComplianceDetail = () => {
    console.log("redirectUrl",redirectUrl)
    if (redirectUrl===undefined||redirectUrl?.ComplianceDetail?.length <= 0 || "" || undefined) {
      navigate("/ComplianceDetail");
    } else {
      navigate(`/ComplianceDetail/${params.userId}`);
    }
  };
  function next(e) {
    const formErrors = validateForm();
    if (isNewValueEntered) {
      Swal.fire({
        title: "Do you want to save?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCloseButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          if (Object.keys(formErrors)?.length > 0) {
            setErrors(formErrors);
          } else {
          saveStatutoryDetail(e).then((response) => {
            if (response === "success") {
              redirectToComplianceDetail();
            } else {
              Swal.fire({
                title: "Error while saving data",
                icon: "error",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
              });
            }
          });
        }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          redirectToComplianceDetail();
        }
      });
    } else {
      redirectToComplianceDetail();
    }
  }

  const validateForm = () => {
    const { GST_No,PAN_No,PE_DeclarationNo,CIN_No,MSME_No,TAN_No } = values;

    const newErrors = {};
    if (GST_No && GST_No.length >= 16) {
      newErrors.GST_No = "GST No must be 15 characters or less";
    }
    if (PAN_No && PAN_No.length > 20) {
      newErrors.PAN_No = "PAN No must be 20 characters or less";
    }
    if (PAN_No && validpanNo) {
      newErrors.PAN_No = "PAN No already exist";
      Swal.fire({
        title: "PAN Number already exist",
        html: `Please contact your admin: <strong>${masterVendoremail}</strong>`,
        icon: "warning",
        dangerMode: true,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
    }
    if (CIN_No && CIN_No.length > 21) {
      newErrors.CIN_No = "CIN No must be 21 characters or less";
    }
    if (MSME_No && MSME_No.length > 50) {
      newErrors.MSME_No = "MSME No must be 50 characters or less";
    }
    if (TAN_No && TAN_No.length > 10) {
      newErrors.TAN_No = "TAN No must be 10 characters or less";
    }
    return newErrors;
  };

  function DeleteForm10FDoc(event) {
    if (event === "form_10f_Doc" && form_10f_Doc) {
      let title = event;
      Swal.fire({
        heightAuto: true,
        title: "Delete Existing File",
        html: `<div class="rejectstyle">
            <div> <lablel> ${title}</label>
        
          </div>
            `,
        confirmButtonText: "Delete",
        confirmButtonColor: "#B1000E",
        showCancelButton: true,
        focusConfirm: false,
        customClass: "swal-wide",

        preConfirm: () => {
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#B1000E",
            denyButtonText: "No",
            denyButtonColor: "gray",
            customClass: {
              actions: "my-actions",
              cancelButton: "order-1 right-gap",
              confirmButton: "order-2",
              denyButton: "order-3",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              if (event === "form_10f_Doc") {
                setform_10f_Doc("");
                setdeleteform_10fUploadedFile(false);
                setEditform_10f_Doc("");
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
            }
          });
        },
      });
    } else {
      Swal.fire("File not deleted", "", "info");
    }
  }
  function DeletePEDeclaration(event) {
    if (event === "PE_Declaration_Doc" && PE_Declaration_Doc) {
      let title = event;
      Swal.fire({
        heightAuto: true,
        title: "Delete Existing File",
        html: `<div class="rejectstyle">
            <div> <lablel> ${title}</label>
        
          </div>
            `,
        confirmButtonText: "Delete",
        confirmButtonColor: "#B1000E",
        showCancelButton: true,
        focusConfirm: false,
        customClass: "swal-wide",

        preConfirm: () => {
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#B1000E",
            denyButtonText: "No",
            denyButtonColor: "gray",
            customClass: {
              actions: "my-actions",
              cancelButton: "order-1 right-gap",
              confirmButton: "order-2",
              denyButton: "order-3",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              if (event === "PE_Declaration_Doc") {
                setPE_Declaration_Doc("");
                setdeletePE_DeclarationUploadedFile(false);
                setEditPE_Declaration_Doc("");
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
            }
          });
        },
      });
    } else {
      Swal.fire("File not deleted", "", "info");
    }
  }

  function DeleteTax_residency(event) {
    if (event === "Tax_residency_Doc" && Tax_residency_Doc) {
      let title = event;
      Swal.fire({
        heightAuto: true,
        title: "Delete Existing File",
        html: `<div class="rejectstyle">
            <div> <lablel> ${title}</label>
        
          </div>
            `,
        confirmButtonText: "Delete",
        confirmButtonColor: "#B1000E",
        showCancelButton: true,
        focusConfirm: false,
        customClass: "swal-wide",

        preConfirm: () => {
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#B1000E",
            denyButtonText: "No",
            denyButtonColor: "gray",
            customClass: {
              actions: "my-actions",
              cancelButton: "order-1 right-gap",
              confirmButton: "order-2",
              denyButton: "order-3",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              if (event === "Tax_residency_Doc") {
                setTax_residency_Doc("");
                setdeleteTax_residencyUploadedFile(false);
                seteditTax_residency_Doc("");
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
            }
          });
        },
      });
    } else {
      Swal.fire("File not deleted", "", "info");
    }
  }
  function cancel(e) {
    console.log("cancelbutton::");
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "Yes",
      showCloseButton: true,
      cancelButtonText: "No",
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("cancels");
        if (
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype ===
          "NewRegistration"
        ) {
          console.log("setstaticPAN_No", staticPAN_No);
          setValues({
            GST_No: "",
            GST_type: "",
            MSME_No: "",
            MSME_Type: "",
            MSME_status: "",
            PAN_No: staticPAN_No,
            CIN_No: "",
            TAN_No: "",
            Tax_residency_No: "",
          });
          setFile("");
          setPAN_Doc("");
          setPE_Declaration_Doc("");
          setMSME_Doc("");
          setTax_residency_Doc("");
          setdeleteTax_residencyUploadedFile(false);
          setdeletePE_DeclarationUploadedFile(false);
          seteditTax_residency_Doc("");
          setform_10f_Doc("");
          setdeleteform_10fUploadedFile(false);
          setEditform_10f_Doc("");
          setEditPE_Declaration_Doc("");
          setTAN_Doc("");
          setIsNewValueEntered(true);
          setfileDisclosure("");
        } else {
          setValues({
            GST_No: "",
            GST_type: "",
            MSME_No: "",
            MSME_Type: "",
            MSME_status: "",
            PAN_No: "",
            CIN_No: "",
            TAN_No: "",
            Tax_residency_No: "",
          });

          setFile("");
          setPAN_Doc("");
          setPE_Declaration_Doc("");
          setMSME_Doc("");
          setTax_residency_Doc("");
          setdeleteTax_residencyUploadedFile(false);
          setdeletePE_DeclarationUploadedFile(false);
          seteditTax_residency_Doc("");
          setform_10f_Doc("");
          setdeleteform_10fUploadedFile(false);
          setEditform_10f_Doc("");
          setEditPE_Declaration_Doc("");
          setTAN_Doc("");
          setIsNewValueEntered(true);
          setfileDisclosure("");
        }
      }
    });
  }

  useEffect(() => {
    (async () => {
      const storedData = sessionStorage.getItem("master");
      const masterData = storedData ? JSON.parse(storedData) : {};
      await apiService
        .getAllCollection(
          JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        )
        .then((res) => {
          console.log("getallcollectionvendor::",res.data.Statutory);
          setredirectUrl(res.data);
          let cName = res.data.basicInfo
            ? res.data.basicInfo[0]?.Country_Region_Code
            : "";
          if (cName !== "IN" && cName !== null && cName !== undefined) {
            setValues({ PAN_No: "N/A" });
          }
          if (
            masterData.master === true ||
            JSON.parse(window.sessionStorage.getItem("jwt")).result
              ?.usertype === "NewRegistration"
          ) {
            setCountryName("IN");
            if (
              JSON.parse(window.sessionStorage.getItem("jwt")).result
                ?.usertype === "NewRegistration"
            ) {
              console.log("vendorcodessss---inside-------------->>>>>>");
              let masterid = JSON.parse(window.sessionStorage.getItem("jwt"))
                .result?.Ticket_ID;

              setValues({ userType: "NewRegistration" });
              apiService
                .getErpVendor_APIByVendorId(masterid)
                .then((vendorCode) => {
                  if (vendorCode) {
                    console.log(
                      "vendorcodessss-------vendorCode.data.result.P_A_N_No---------->>>>>>",
                      vendorCode.data.response[0].P_A_N_No
                    );
                    if (vendorCode.data.response.length > 0) {
                      // setValues({
                      //   PAN_No: vendorCode.data.response[0].P_A_N_No,
                      // });
                      setstaticPAN_No(vendorCode.data.response[0].P_A_N_No);
                    } else {
                      setValues({ PAN_No: "" });
                    }
                  }
                });
            }
          } else {
            setCountryName(
              res.data.basicInfo
                ? res.data.basicInfo[0]?.Country_Region_Code
                : ""
            );
          }
          setcountry(res.data.basicInfo[0]?.Country_Region_Code);
          if (res.data.basicInfo[0]?.Country_Region_Code === "IN") {
            setshowLoginTab(false);
          }
        }).catch((error) => {
          console.log("error2:::",error);
          if (error.code === 'ERR_NETWORK') {
            console.log("networkerror:::",error);
            handleApiError(error);
          }
          else
          {
            console.log("error:::",error);
            handleApiError(error);
          }
        });
        

      if (params.userId) {
        let finalstatus = "";
       apiService.signupFindByUserId(JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        ).then((res) => {
          finalstatus = res.data.result?.finalStatus;
        }).catch((error) => {
          console.log("error2:::",error);
          if (error.code === 'ERR_NETWORK') {
            console.log("networkerror:::",error);
            handleApiError(error);
          }
          else
          {
            console.log("error:::",error);
            handleApiError(error);
          }
        });
       apiService.getAllCollection(JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        ).then((res) => {
          console.log("notEdotablestat::",finalstatus ,res.data.basicInfo[0]?.submitStatus,JSON.parse(window.sessionStorage.getItem("jwt")).result.role)
          
         console.log("getallcollectionparamsuserid::",res.data.Statutory)
          setredirectUrl(res.data);
          if (res.data.basicInfo[0]?.submitStatus === "Submitted" && finalstatus !== "Approved" && JSON.parse(window.sessionStorage.getItem("jwt")).result.role !== "Admin") {
          
            setStyle("notEditable");
          }
         else if (res.data.basicInfo[0]?.submitStatus === "Submitted" && finalstatus === "Approved" && JSON.parse(window.sessionStorage.getItem("jwt")).result.role !== "Admin") {
          
            setStyle("notEditable");
          }
         else{
            setStyle("editable");
          }
         
          Object.entries(res.data.Statutory).map(([key, value]) => {
            var form_10fUrl = res.data.Statutory[0].form_10f_Doc;
            var replaceform10fValue = form_10fUrl.replace("uploads/", "");
            var PE_Declaration_DocUrl =
              res.data.Statutory[0].PE_Declaration_Doc;
            var replacePE_Declaration_DocValue = PE_Declaration_DocUrl.replace(
              "uploads/",
              ""
            );
            var Tax_residency_DocUrl = res.data.Statutory[0].Tax_residency_Doc;
            var replaceTax_residency_DocValue = Tax_residency_DocUrl.replace(
              "uploads/",
              ""
            );
            setValues({
              GST_No:
                value.GST_Registration_No === "undefined"
                  ? ""
                  : value.GST_Registration_No,
              MSME_No:
                value.MSMED_Number === "undefined" ? "" : value.MSMED_Number,
              PAN_No: value.P_A_N_No === "undefined" ? "" : value.P_A_N_No,
              CIN_No: value.CIN_No === "undefined" ? "" : value.CIN_No,
              TAN_No: value.TAN_No === "undefined" ? "" : value.TAN_No,
              Tax_residency_No:
                value.Tax_residency_No === "undefined"
                  ? ""
                  : value.Tax_residency_No,
              Tax_residency_Doc: value.Tax_residency_Doc,
            });

            setMSME(value.MSMED_Vendor_Type);
            setGST_type(value.GST_Vendor_Type);
            setMSME_status(value.MSMED);
            setform_10f_Doc(value.form_10f_Doc);
            setfileDisclosure(value.fileDisclosure);
            setFile(value.GST_Doc);
            setPAN_Doc(value.PAN_Doc);
            setTAN_Doc(value.TAN_Doc);
            setPE_Declaration_Doc(value.PE_Declaration_Doc);
            setMSME_Doc(value.MSME_Doc);
            setTax_residency_Doc(value.Tax_residency_Doc);
            seteditTax_residency_Doc(replaceTax_residency_DocValue);
            setEditform_10f_Doc(replaceform10fValue);
            setEditPE_Declaration_Doc(replacePE_Declaration_DocValue);
          });
        }).catch((error) => {
          console.log("error2:::",error);
          if (error.code === 'ERR_NETWORK') {
            console.log("networkerror:::",error);
            handleApiError(error);
          }
          else
          {
            console.log("error:::",error);
            handleApiError(error);
          }
        });
      }
      console.log("country::") 
    })();
    seturl(pdf);
  }, []);
  const saveStatutoryDetail = (e) => {
    console.log("saveApi::",values.PAN_No);
    console.log("valuesbeforupdate::", values.TAN_No);
    console.log("valuesbeforupdatevalues.CIN_No::", values.CIN_No);
    if (values.PAN_No === null || values.PAN_No === undefined || values.PAN_No === "" || values.PAN_No === "N/A" ) {
      console.log("pan no n/a::");
      console.log("valuesbeforupdate::", values.TAN_No);
      console.log("valuesbeforupdatevalues.CIN_No::", values.CIN_No);
      const formErrors = validateForm();
      e.preventDefault();
      if (Object.keys(formErrors)?.length > 0) {
        setErrors(formErrors);
      } else {
        
        return new Promise((resolve) => {
          // e.preventDefault();
          setIsNewValueEntered(false);
          const data = new FormData();
          data.append("GST_Vendor_Type", GST_type);
          if (GST_type === "UnRegistered") {
            data.append("GST_Registration_No", "N/A");
          } else if (GST_type === "Import") {
            data.append("GST_Registration_No", "N/A");
          } else {
            data.append("GST_Registration_No", values.GST_No);
          }
          if (countryName !== "IN") {
            data.append("P_A_N_No", "N/A");
            data.append("PAN_Doc", "");
          } else {
            if(JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype === "NewRegistration")
    {
      data.append("P_A_N_No",staticPAN_No);
      data.append("PAN_Doc", "");
    }
    else
    {
      data.append("P_A_N_No", values.PAN_No);
      data.append("PAN_Doc", PAN_Doc);
    }
           
          }
          if (GST_type === "Registered") {
            data.append("GST_Doc", GST_Doc);
            data.append("fileDisclosure", "");
          } else {
            data.append("GST_Doc", "");
            data.append("fileDisclosure", fileDisclosure);
          }
          if (MSME_status === "2") {
            data.append("MSMED_Number", "N/A");
          } else {
            data.append("MSMED_Number", values.MSME_No);
          }
          data.append("form_10f_Doc", form_10f_Doc);
          data.append("TAN_Doc", TAN_Doc);
          data.append("PE_DeclarationNo", values.PE_DeclarationNo);
          data.append("PE_Declaration_Doc", PE_Declaration_Doc);
          data.append("MSME_Doc", MSME_Doc);
          data.append("Tax_residency_Doc", Tax_residency_Doc);
          data.append("CIN_No", values.CIN_No);
          data.append("form_10f", values.form_10f);
          data.append("MSMED", MSME_status);
    
          data.append("MSMED_Vendor_Type", MSME);
          data.append("TAN_No", values.TAN_No);
          data.append(
            "userId",
            JSON.parse(window.sessionStorage.getItem("jwt"))?.result?.userId
          );
          data.append("Tax_residency_No", values.Tax_residency_No);
          if (params.userId) {
            console.log("dataupdateparams::", values.TAN_No, values.CIN_No);
            console.log("dataupdatecinno::", values.CIN_No);
            console.log("update2::",values.CIN_No)
            apiService.updateStatutoryDetail(params.userId, data).then((res) => {
              if (res.data.status === "success") {
                Swal.fire({
                  title: "Data Updated",
                  icon: "success",
                  confirmButtonText: "OK",
                  showCloseButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    resolve("success");
                  } else {
                    resolve("error");
                  }
                });
              } else {
                Swal.fire({
                  title: "Error While Fetching",
                  icon: "error",
                  confirmButtonText: "OK",
                  showCloseButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                });
                resolve("error");
              }
            }).catch((error) => {
              console.log("error2:::",error);
              if (error.code === 'ERR_NETWORK') {
                console.log("networkerror:::",error);
                handleApiError(error);
              }
              else
              {
                console.log("error:::",error);
                handleApiError(error);
              }
            });
          } else {
            let newuser = JSON.parse(
              window.sessionStorage.getItem("newregUser")
            )?.newregUser;
            if (newuser) {
              const statdata = new FormData();
              statdata.append("GST_Vendor_Type", GST_type);
              statdata.append("GST_Registration_No", values.GST_No);
              if (GST_type === "UnRegistered") {
                statdata.append("GST_Registration_No", "N/A");
              } else if (GST_type === "Import") {
                statdata.append("GST_Registration_No", "N/A");
              } else {
                statdata.append("GST_Registration_No", values.GST_No);
              }
              if (countryName !== "IN") {
                statdata.append("P_A_N_No", values.PAN_No);
                statdata.append("PAN_Doc", PAN_Doc);
              } else {
                statdata.append("P_A_N_No", "N/A");
                statdata.append("PAN_Doc", "");
              }
              if (GST_type === "Registered") {
                statdata.append("GST_Doc", GST_Doc);
                statdata.append("fileDisclosure", "");
              } else {
                statdata.append("GST_Doc", "");
                statdata.append("fileDisclosure", fileDisclosure);
              }
              statdata.append("form_10f_Doc", form_10f_Doc);
              statdata.append("TAN_Doc", TAN_Doc);
              statdata.append("PE_DeclarationNo", values.PE_DeclarationNo);
              statdata.append("PE_Declaration_Doc", PE_Declaration_Doc);
              statdata.append("MSME_Doc", MSME_Doc);
              statdata.append("Tax_residency_Doc", Tax_residency_Doc);
              statdata.append("CIN_No", values.CIN_No);
              statdata.append("form_10f", values.form_10f);
              statdata.append("MSMED", MSME_status);
              statdata.append("MSMED_Number", values.MSME_No);
              statdata.append("MSMED_Vendor_Type", MSME);
              statdata.append("TAN_No", values.TAN_No);
              statdata.append("userId", newuser);
              statdata.append("Tax_residency_No", values.Tax_residency_No);
              apiService.saveStatutoryDetail(statdata).then((res) => {
                if (res.data.status === "success") {
                  Swal.fire({
                    title: "Data saved",
                    icon: "success",
                    confirmButtonText: "OK",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      resolve("success");
                    } else {
                      resolve("error");
                    }
                  });
                } else {
                  Swal.fire({
                    title: "Error While Fetching",
                    icon: "error",
                    confirmButtonText: "OK",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                }
              }).catch((error) => {
                console.log("error2:::",error);
                if (error.code === 'ERR_NETWORK') {
                  console.log("networkerror:::",error);
                  handleApiError(error);
                }
                else
                {
                  console.log("error:::",error);
                  handleApiError(error);
                }
              });
            } else {
              apiService.saveStatutoryDetail(data).then((res) => {
                if (res.data.status === "success") {
                  Swal.fire({
                    title: "Data saved",
                    icon: "success",
                    confirmButtonText: "OK",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      resolve("success");
                    } else {
                      resolve("error");
                    }
                  });
                } else {
                  Swal.fire({
                    title: "Error While Fetching",
                    icon: "error",
                    confirmButtonText: "OK",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                }
              }).catch((error) => {
                console.log("errorstatutory:::",error);
                if (error.code === 'ERR_NETWORK') {
                  console.log("networkerror:::",error);
                  handleApiError(error);
                }
                else
                {
                  console.log("error:::",error);
                  handleApiError(error);
                }
              });
            }
          }
        });
      }
    
    }
    else
    {
      console.log("panno has value::",values.PAN_No);
      apiService
      .SearchpanNo(values.PAN_No, JSON.parse(window.sessionStorage.getItem("jwt")).result.userId)
      .then((res) => {
        console.log("responsepanno::", res.data.result);
        if (res.data.result === "Pan no already exists!") {
          setvalidpanNo(true);
          setmasterVendoremail(res.data.mastervendor_email);
          Swal.fire({
            title: "PAN Number already exist",
            html: `Please contact your admin: <strong>${res.data.mastervendor_email}</strong>`,
            icon: "warning",
            dangerMode: true,
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          })
        } else {
          setvalidpanNo(false);
          setmasterVendoremail("");
          const formErrors = validateForm();
          e.preventDefault();
          if (Object.keys(formErrors)?.length > 0) {
            setErrors(formErrors);
          }
          else {
            
            return new Promise((resolve) => {
              // e.preventDefault();
              setIsNewValueEntered(false);
              const data = new FormData();
              data.append("GST_Vendor_Type", GST_type);
              if (GST_type === "UnRegistered") {
                data.append("GST_Registration_No", "N/A");
              } else if (GST_type === "Import") {
                data.append("GST_Registration_No", "N/A");
              } else {
                data.append("GST_Registration_No", values.GST_No);
              }
              if (countryName !== "IN") {
                data.append("P_A_N_No", "N/A");
                data.append("PAN_Doc", "");
              } else {
                if(JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype === "NewRegistration")
        {
          data.append("P_A_N_No",staticPAN_No);
          data.append("PAN_Doc", "");
        }
        else
        {
          data.append("P_A_N_No", values.PAN_No);
          data.append("PAN_Doc", PAN_Doc);
        }
               
              }
              if (GST_type === "Registered") {
                data.append("GST_Doc", GST_Doc);
                data.append("fileDisclosure", "");
              } else {
                data.append("GST_Doc", "");
                data.append("fileDisclosure", fileDisclosure);
              }
              if (MSME_status === "2") {
                data.append("MSMED_Number", "N/A");
              } else {
                data.append("MSMED_Number", values.MSME_No);
              }
              data.append("form_10f_Doc", form_10f_Doc);
              data.append("TAN_Doc", TAN_Doc);
              data.append("PE_DeclarationNo", values.PE_DeclarationNo);
              data.append("PE_Declaration_Doc", PE_Declaration_Doc);
              data.append("MSME_Doc", MSME_Doc);
              data.append("Tax_residency_Doc", Tax_residency_Doc);
              data.append("CIN_No", values.CIN_No);
              data.append("form_10f", values.form_10f);
              data.append("MSMED", MSME_status);
        
              data.append("MSMED_Vendor_Type", MSME);
              data.append("TAN_No", values.TAN_No);
              data.append(
                "userId",
                JSON.parse(window.sessionStorage.getItem("jwt"))?.result?.userId
              );
              data.append("Tax_residency_No", values.Tax_residency_No);
              if (params.userId) {
                console.log("dataupdateparams::", values.TAN_No, values.CIN_No);
                console.log("dataupdatecinno::", values.CIN_No);
                console.log("update2::",values.CIN_No)
                apiService.updateStatutoryDetail(params.userId, data).then((res) => {
                  if (res.data.status === "success") {
                    Swal.fire({
                      title: "Data Updated",
                      icon: "success",
                      confirmButtonText: "OK",
                      showCloseButton: true,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        resolve("success");
                      } else {
                        resolve("error");
                      }
                    });
                  } else {
                    Swal.fire({
                      title: "Error While Fetching",
                      icon: "error",
                      confirmButtonText: "OK",
                      showCloseButton: true,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                    });
                    resolve("error");
                  }
                }).catch((error) => {
                  console.log("error2:::",error);
                  if (error.code === 'ERR_NETWORK') {
                    console.log("networkerror:::",error);
                    handleApiError(error);
                  }
                  else
                  {
                    console.log("error:::",error);
                    handleApiError(error);
                  }
                });
              } else {
                let newuser = JSON.parse(
                  window.sessionStorage.getItem("newregUser")
                )?.newregUser;
                if (newuser) {
                  const statdata = new FormData();
                  statdata.append("GST_Vendor_Type", GST_type);
                  statdata.append("GST_Registration_No", values.GST_No);
                  if (GST_type === "UnRegistered") {
                    statdata.append("GST_Registration_No", "N/A");
                  } else if (GST_type === "Import") {
                    statdata.append("GST_Registration_No", "N/A");
                  } else {
                    statdata.append("GST_Registration_No", values.GST_No);
                  }
                  if (countryName !== "IN") {
                    statdata.append("P_A_N_No", values.PAN_No);
                    statdata.append("PAN_Doc", PAN_Doc);
                  } else {
                    statdata.append("P_A_N_No", "N/A");
                    statdata.append("PAN_Doc", "");
                  }
                  if (GST_type === "Registered") {
                    statdata.append("GST_Doc", GST_Doc);
                    statdata.append("fileDisclosure", "");
                  } else {
                    statdata.append("GST_Doc", "");
                    statdata.append("fileDisclosure", fileDisclosure);
                  }
                  statdata.append("form_10f_Doc", form_10f_Doc);
                  statdata.append("TAN_Doc", TAN_Doc);
                  statdata.append("PE_DeclarationNo", values.PE_DeclarationNo);
                  statdata.append("PE_Declaration_Doc", PE_Declaration_Doc);
                  statdata.append("MSME_Doc", MSME_Doc);
                  statdata.append("Tax_residency_Doc", Tax_residency_Doc);
                  statdata.append("CIN_No", values.CIN_No);
                  statdata.append("form_10f", values.form_10f);
                  statdata.append("MSMED", MSME_status);
                  statdata.append("MSMED_Number", values.MSME_No);
                  statdata.append("MSMED_Vendor_Type", MSME);
                  statdata.append("TAN_No", values.TAN_No);
                  statdata.append("userId", newuser);
                  statdata.append("Tax_residency_No", values.Tax_residency_No);
                  apiService.saveStatutoryDetail(statdata).then((res) => {
                    if (res.data.status === "success") {
                      Swal.fire({
                        title: "Data saved",
                        icon: "success",
                        confirmButtonText: "OK",
                        showCloseButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          resolve("success");
                        } else {
                          resolve("error");
                        }
                      });
                    } else {
                      Swal.fire({
                        title: "Error While Fetching",
                        icon: "error",
                        confirmButtonText: "OK",
                        showCloseButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                      });
                    }
                  }).catch((error) => {
                    console.log("error2:::",error);
                    if (error.code === 'ERR_NETWORK') {
                      console.log("networkerror:::",error);
                      handleApiError(error);
                    }
                    else
                    {
                      console.log("error:::",error);
                      handleApiError(error);
                    }
                  });
                } else {
                  apiService.saveStatutoryDetail(data).then((res) => {
                    if (res.data.status === "success") {
                      Swal.fire({
                        title: "Data saved",
                        icon: "success",
                        confirmButtonText: "OK",
                        showCloseButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          resolve("success");
                        } else {
                          resolve("error");
                        }
                      });
                    } else {
                      Swal.fire({
                        title: "Error While Fetching",
                        icon: "error",
                        confirmButtonText: "OK",
                        showCloseButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                      });
                    }
                  }).catch((error) => {
                    console.log("errorstatutory:::",error);
                    if (error.code === 'ERR_NETWORK') {
                      console.log("networkerror:::",error);
                      handleApiError(error);
                    }
                    else
                    {
                      console.log("error:::",error);
                      handleApiError(error);
                    }
                  });
                }
              }
            });
          }
        }
      })
      .catch((error) => {
        console.log("errorstatutory:::", error);
        if (error.code === "ERR_NETWORK") {
          console.log("networkerror:::", error);
          handleApiError(error);
        } else {
          console.log("error:::", error);
          handleApiError(error);
        }
      });
    }
  
  };
  const updateStatutoryDetail = (e) => {
    console.log("updatenew::",values.CIN_No);
    console.log("valuesbeforupdate::", values.TAN_No);
    console.log("valuesbeforupdatevalues.CIN_No::", values.CIN_No);
    return new Promise((resolve) => {
      // e.preventDefault();
      setIsNewValueEntered(false);
      const data = new FormData();
      data.append("GST_Vendor_Type", GST_type);
      if (GST_type === "UnRegistered") {
        data.append("GST_Registration_No", "N/A");
      } else if (GST_type === "Import") {
        data.append("GST_Registration_No", "N/A");
      } else {
        data.append("GST_Registration_No", values.GST_No);
      }
      if (countryName !== "IN") {
        data.append("P_A_N_No", "N/A");
        data.append("PAN_Doc", "");
      } else {
        data.append("P_A_N_No", values.PAN_No);
        data.append("PAN_Doc", PAN_Doc);
      }
      if (GST_type === "Registered") {
        data.append("GST_Doc", GST_Doc);
        data.append("fileDisclosure", "");
      } else {
        data.append("GST_Doc", "");
        data.append("fileDisclosure", fileDisclosure);
      }
      if (MSME_status === "2") {
        data.append("MSMED_Number", "N/A");
      } else {
        data.append("MSMED_Number", values.MSME_No);
      }
      data.append("form_10f_Doc", form_10f_Doc);
      data.append("TAN_Doc", TAN_Doc);
      data.append("PE_DeclarationNo", values.PE_DeclarationNo);
      data.append("PE_Declaration_Doc", PE_Declaration_Doc);
      data.append("MSME_Doc", MSME_Doc);
      data.append("Tax_residency_Doc", Tax_residency_Doc);
      data.append("CIN_No", values.CIN_No);
      data.append("form_10f", values.form_10f);
      data.append("MSMED", MSME_status);

      data.append("MSMED_Vendor_Type", MSME);
      data.append("TAN_No", values.TAN_No);
      data.append(
        "userId",
        JSON.parse(window.sessionStorage.getItem("jwt"))?.result?.userId
      );
      data.append("Tax_residency_No", values.Tax_residency_No);
      if (params.userId) {
        console.log("dataupdateparams::", values.TAN_No, values.CIN_No);
        console.log("dataupdatecinno::", values.CIN_No);
        console.log("update2::",values.CIN_No)
        apiService.updateStatutoryDetail(params.userId, data).then((res) => {
          if (res.data.status === "success") {
            Swal.fire({
              title: "Data Updated",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                resolve("success");
              } else {
                resolve("error");
              }
            });
          } else {
            Swal.fire({
              title: "Error While Fetching",
              icon: "error",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            resolve("error");
          }
        }).catch((error) => {
          console.log("errorstatutory1:::",error);
          if (error.code === 'ERR_NETWORK') {
            console.log("networkerror:::",error);
            handleApiError(error);
          }
          else
          {
            console.log("error:::",error);
            handleApiError(error);
          }
        });
      } else {
        let newuser = JSON.parse(
          window.sessionStorage.getItem("newregUser")
        )?.newregUser;
        if (newuser) {
          const statdata = new FormData();
          statdata.append("GST_Vendor_Type", GST_type);
          statdata.append("GST_Registration_No", values.GST_No);
          if (GST_type === "UnRegistered") {
            statdata.append("GST_Registration_No", "N/A");
          } else if (GST_type === "Import") {
            statdata.append("GST_Registration_No", "N/A");
          } else {
            statdata.append("GST_Registration_No", values.GST_No);
          }
          if (countryName !== "IN") {
            statdata.append("P_A_N_No", values.PAN_No);
            statdata.append("PAN_Doc", PAN_Doc);
          } else {
            statdata.append("P_A_N_No", "N/A");
            statdata.append("PAN_Doc", "");
          }
          if (GST_type === "Registered") {
            statdata.append("GST_Doc", GST_Doc);
            statdata.append("fileDisclosure", "");
          } else {
            statdata.append("GST_Doc", "");
            statdata.append("fileDisclosure", fileDisclosure);
          }
          statdata.append("form_10f_Doc", form_10f_Doc);
          statdata.append("TAN_Doc", TAN_Doc);
          statdata.append("PE_DeclarationNo", values.PE_DeclarationNo);
          statdata.append("PE_Declaration_Doc", PE_Declaration_Doc);
          statdata.append("MSME_Doc", MSME_Doc);
          statdata.append("Tax_residency_Doc", Tax_residency_Doc);
          statdata.append("CIN_No", values.CIN_No);
          statdata.append("form_10f", values.form_10f);
          statdata.append("MSMED", MSME_status);
          statdata.append("MSMED_Number", values.MSME_No);
          statdata.append("MSMED_Vendor_Type", MSME);
          statdata.append("TAN_No", values.TAN_No);
          statdata.append("userId", newuser);
          statdata.append("Tax_residency_No", values.Tax_residency_No);
          apiService.saveStatutoryDetail(statdata).then((res) => {
            if (res.data.status === "success") {
              Swal.fire({
                title: "Data saved",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  resolve("success");
                } else {
                  resolve("error");
                }
              });
            } else {
              Swal.fire({
                title: "Error While Fetching",
                icon: "error",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
              });
            }
          }).catch((error) => {
            console.log("errorstatutory2:::",error);
            if (error.code === 'ERR_NETWORK') {
              console.log("networkerror:::",error);
              handleApiError(error);
            }
            else
            {
              console.log("error:::",error);
              handleApiError(error);
            }
          });
        } else {
          apiService.saveStatutoryDetail(data).then((res) => {
            if (res.data.status === "success") {
              Swal.fire({
                title: "Data saved",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  resolve("success");
                } else {
                  resolve("error");
                }
              });
            } else {
              Swal.fire({
                title: "Error While Fetching",
                icon: "error",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
              });
            }
          }).catch((error) => {
            console.log("errorstatutory3:::",error);
            if (error.code === 'ERR_NETWORK') {
              console.log("networkerror:::",error);
              handleApiError(error);
            }
            else
            {
              console.log("error:::",error);
              handleApiError(error);
            }
          });
        }
      }
    });
  };
  const deleteFile = (event) => {
    if (
      (event === "fileDisclosure" && fileDisclosure) ||
      (event === "GST_Doc" && GST_Doc) ||
      (event === "PAN_Doc" && PAN_Doc) ||
      (event === "MSME_Doc" && MSME_Doc) ||
      (event === "TAN_Doc" && TAN_Doc)
    ) {
      let title = event;
      Swal.fire({
        heightAuto: true,
        title: "Delete Existing File",
        html: `<div class="rejectstyle">
            <div> <lablel> ${title}</label>
        
          </div>
            `,
        confirmButtonText: "Delete",
        confirmButtonColor: "#B1000E",
        showCancelButton: true,
        focusConfirm: false,
        customClass: "swal-wide",

        preConfirm: () => {
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#B1000E",
            denyButtonText: "No",
            denyButtonColor: "gray",
            customClass: {
              actions: "my-actions",
              cancelButton: "order-1 right-gap",
              confirmButton: "order-2",
              denyButton: "order-3",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              setIsNewValueEntered(true);
              if (event === "GST_Doc") {
                setFile("");
                // setValues({
                //   GST_Doc: "",
                // });
              } else if (event === "fileDisclosure") {
                setfileDisclosure("");
              } else if (event === "PAN_Doc") {
                setPAN_Doc("");
                // setValues({
                //   PAN_Doc: "",
                // });
              } else if (event === "MSME_Doc") {
                setMSME_Doc("");
                // setValues({
                //   MSME_Doc: "",
                // });
              } else if (event === "TAN_Doc") {
                setTAN_Doc("");
                // setValues({
                //   TAN_Doc: "",
                // });
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
              setIsNewValueEntered(false);
            }
          });
        },
      });
    } else {
      Swal.fire("File not deleted", "", "info");
      setIsNewValueEntered(false);
    }
  };

  return (
    <div>
      <Navbar1 />
      <Container fluid="md" className={style}>
        <Row>
          <Col>
            <h2 className="statutory-details-name">Statutory Details</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form>
                      <Row>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Vendor GST Type*</Form.Label>
                          <Row>
                            <Col sm={4}>
                              <input
                                onChange={onChangeValue}
                                type="radio"
                                value="Registered"
                                id="GST_typeRegistered"
                                name="GST_type"
                                checked={GST_type === "Registered"}
                              />{" "}
                              Registered
                            </Col>
                            <Col sm={4}>
                              <input
                                onChange={onChangeValue}
                                type="radio"
                                value="UnRegistered"
                                name="GST_type"
                                id="GST_typeUnRegistered"
                                checked={GST_type === "UnRegistered"}
                              />{" "}
                              UnRegistered
                            </Col>
                           
                            <Col sm={4}>
                              <input
                                onChange={onChangeValue}
                                type="radio"
                                value="Import"
                                name="GST_type"
                                id="GST_typeImport"
                                checked={GST_type === "Import"}
                                disabled={countryName === "IN"}
                              />{" "}
                              Import
                            </Col>
                          </Row>
                        </Form.Group>

                        {HideImport && hideunRegisteredField ? (
                          <>
                            {GST_type === "UnRegistered" ? (
                              <Row>
                                <Col>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="formBasicEmail"
                                  >
                                    <Form.Label>GST no*</Form.Label>
                                    <Form.Control
                                      className="statutoryInput"
                                      type="text"
                                      value="N/A"
                                      // onChange={handleChange("GST_No")}
                                      disabled="true"
                                    />
                                    {errors.GST_No ? (
                                      <p className="text text-danger small">
                                        {errors.GST_No}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col>
                                  {!HideImport && hideunRegisteredField ? (
                                    <Row></Row>
                                  ) : (
                                    <Row>
                                      {/* <div className="frame-input">
                                    <label htmlFor="fileupload">
                                      Upload UnRegister Gst
                                    </label>
                                    <input
                                      type="file"
                                      id="fileupload"
                                      handleChange={onFileDisclosurechange}
                                      name="fileDisclosure"
                                      required
                                    />
                                  </div>{" "} */}

                                      {fileDisclosure !== "" &&
                                      fileDisclosure !== "null" &&
                                      fileDisclosure !== undefined ? (
                                        <div className="frame-input">
                                          <button
                                            type="button"
                                            className="deleteFile"
                                            onClick={() => {
                                              deleteFile("fileDisclosure");
                                            }}
                                          >
                                            Delete UnRegister Gst
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="frame-input">
                                          <label htmlFor="fileupload">
                                            Upload UnRegister Gst
                                          </label>
                                          <input
                                            type="file"
                                            id="fileupload"
                                            onChange={onFileDisclosurechange}
                                            name="fileDisclosure"
                                            required
                                          />
                                        </div>
                                      )}
                                    </Row>
                                  )}
                                </Col>
                              </Row>
                            ) : (
                              <>
                                {GST_type === "Import" ? (
                                  <Row>
                                    <Col>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                      >
                                        <Form.Label>GST no*</Form.Label>
                                        <Form.Control
                                          className="statutoryInput"
                                          type="text"
                                          value="N/A"
                                          // onChange={handleChange("GST_No")}
                                          disabled="true"
                                        />
                                     
                                      </Form.Group>
                                    </Col>
                                    <Col></Col>
                                  </Row>
                                ) : (
                                  <>
                                    {GST_type === "Registered" ? (
                                      <>
                                        <Row>
                                          <Col>
                                            <Form.Group
                                              className="mb-3"
                                              controlId="formBasicEmail"
                                            >
                                              <Form.Label>GST no*</Form.Label>
                                              <InputGroup className="statutoryInput">
                                                <Form.Control
                                                  style={{
                                                    border: "none",
                                                    borderRadius: "25px",
                                                    outline: "none",
                                                    outlineOffset: "none",
                                                  }}
                                                  className="statInput"
                                                  type="text"
                                                  value={(values.GST_No || '').toUpperCase()}
                                                  onChange={handleChange(
                                                    "GST_No"
                                                  )}
                                                />
                                                <InputGroup.Text
                                                  style={{ border: "none" }}
                                                >
                                                  <Tooltip title={gstNo}>
                                                    <InfoIcon />
                                                  </Tooltip>
                                                </InputGroup.Text>
                                              </InputGroup>
                                              {errors.GST_No ? (
                                                <p className="text text-danger small">
                                                  {errors.GST_No}
                                                </p>
                                              ) : (
                                                ""
                                              )}
                                            </Form.Group>
                                          </Col>
                                          <Col>
                                            {GST_Doc !== "" &&
                                            GST_Doc !== "null" &&
                                            GST_Doc !== undefined ? (
                                              <div className="frame-input">
                                                <button
                                                  type="button"
                                                  className="deleteFile"
                                                  onClick={() => {
                                                    deleteFile("GST_Doc");
                                                  }}
                                                >
                                                  Delete GST
                                                </button>
                                              </div>
                                            ) : (
                                              <div className="frame-input">
                                                <label htmlFor="fileupload">
                                                  Upload GST
                                                </label>
                                                <input
                                                  type="file"
                                                  id="fileupload"
                                                  // value={values.GST_Doc}
                                                  onChange={onFileChange}
                                                  required
                                                  disabled={
                                                    style === "notEditable"
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              </div>
                                            )}
                                          </Col>
                                        </Row>
                                      </>
                                    ) : (
                                      <Row>
                                        <Col>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicEmail"
                                          >
                                            <Form.Label>GST no*</Form.Label>
                                            <InputGroup className="statutoryInput">
                                              <Form.Control
                                                style={{
                                                  border: "none",
                                                  borderRadius: "25px",
                                                  outline: "none",
                                                  outlineOffset: "none",
                                                }}
                                                id="GST_No"
                                                className="statInput"
                                                type="text"
                                                value={(values.GST_No || '').toUpperCase()}
                                                onChange={handleChange(
                                                  "GST_No"
                                                )}
                                              />
                                              <InputGroup.Text
                                                style={{ border: "none" }}
                                              >
                                                <Tooltip title={gstNo}>
                                                  <InfoIcon />
                                                </Tooltip>
                                              </InputGroup.Text>
                                            </InputGroup>
                                            {errors.GST_No ? (
                                              <p className="text text-danger small">
                                                {errors.GST_No}
                                              </p>
                                            ) : (
                                              ""
                                            )}
                                          </Form.Group>
                                        </Col>
                                        <Col>
                                          {GST_Doc !== "" &&
                                          GST_Doc !== "null" &&
                                          GST_Doc !== undefined ? (
                                            <div className="frame-input">
                                              <button
                                                type="button"
                                                className="deleteFile"
                                                onClick={() => {
                                                  deleteFile("GST_Doc");
                                                }}
                                              >
                                                Delete GST
                                              </button>
                                            </div>
                                          ) : (
                                            <div className="frame-input">
                                              <label htmlFor="fileupload">
                                                Upload GST
                                              </label>
                                              <input
                                                type="file"
                                                id="fileupload"
                                                // value={values.GST_Doc}
                                                onChange={onFileChange}
                                                required
                                                disabled={
                                                  style === "notEditable"
                                                    ? true
                                                    : false
                                                }
                                              />
                                            </div>
                                          )}
                                        </Col>
                                      </Row>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <Row>
                            <Col>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>GST no*</Form.Label>
                                <Form.Control
                                  className="statutoryInput"
                                  type="text"
                                  value="N/A"
                                  // onChange={handleChange("GST_No")}
                                  disabled="true"
                                />
                              
                              </Form.Group>
                            </Col>
                            <Col>
                              {!HideImport && hideunRegisteredField ? (
                                <Row></Row>
                              ) : (
                                <Row>
                                  {fileDisclosure !== "" &&
                                  fileDisclosure !== "null" &&
                                  fileDisclosure !== undefined ? (
                                    <div className="frame-input">
                                      <button
                                        type="button"
                                        className="deleteFile"
                                        onClick={() => {
                                          deleteFile("fileDisclosure");
                                        }}
                                      >
                                        Delete UnRegister Gst
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="frame-input">
                                      <label htmlFor="fileupload">
                                        Upload UnRegister Gst
                                      </label>
                                      <input
                                        type="file"
                                        id="fileupload"
                                        onChange={onFileDisclosurechange}
                                        name="fileDisclosure"
                                        required
                                      />
                                    </div>
                                  )}
                                </Row>
                              )}
                            </Col>
                          </Row>
                        )}
                      </Row>
                      <Row>
                        {GST_type === "Import" ? (
                          <Col>
                            <Form.Group
                              sx={{ mb: 3 }}
                              controlId="formBasicEmail"
                            >
                              <Form.Label>PAN no*</Form.Label>
                              <InputGroup className="statutoryInput">
                                <Form.Control
                                  style={{
                                    border: "none",
                                    borderRadius: "25px",
                                  }}
                                  type="text"
                                  value="N/A"
                                  disabled="true"
                                  id="pan_no"
                                  onChange={handleChange("PAN_No")}
                                />
                                <InputGroup.Text style={{ border: "none" }}>
                                  <Tooltip title={panNo}>
                                    <InfoIcon />
                                  </Tooltip>
                                </InputGroup.Text>
                              </InputGroup>
                            </Form.Group>
                          </Col>
                        ) : (
                          <Col>
                            <Form.Group
                              sx={{ mb: 3 }}
                              controlId="formBasicEmail"
                            >
                              <Form.Label>PAN no*</Form.Label>
                              <InputGroup className="statutoryInput">
                                <Form.Control
                                  style={{
                                    border: "none",
                                    borderRadius: "25px",
                                  }}
                                  type="text"
                                  id="pan_no"
                                  value={
                                    countryName !== 'IN'
                                      ? 'N/A'
                                      : JSON.parse(window.sessionStorage.getItem('jwt')).result?.usertype === 'NewRegistration'
                                      ? (staticPAN_No || '').toUpperCase()
                                      : (values.PAN_No || '').toUpperCase()
                                  }
                                  disabled={countryName !== "IN"||JSON.parse(
                                    window.sessionStorage.getItem("jwt")
                                  ).result?.usertype === "NewRegistration"}
                                  onChange={handleChange("PAN_No")}
                                />
                                <InputGroup.Text style={{ border: "none" }}>
                                  <Tooltip title={panNo}>
                                    <InfoIcon />
                                  </Tooltip>
                                </InputGroup.Text>
                              </InputGroup>
                              {!validpanNo&&errors.PAN_No ? (
                                <p className="text text-danger small">
                                  {errors.PAN_No}
                                </p>
                              ) : (
                                ""
                              )}
                            </Form.Group>
                          </Col>
                        )
                        }
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype !== "NewRegistration" ? (
                        <Col>
                          {countryName === "IN" ? (
                            PAN_Doc !== "" &&
                            PAN_Doc !== "null" &&
                            GST_type !== "Import" &&
                            PAN_Doc !== undefined ? (
                              <div className="frame-input">
                                <button
                                  type="button"
                                  className="deleteFile"
                                  onClick={() => {
                                    deleteFile("PAN_Doc");
                                  }}
                                >
                                  Delete PAN
                                </button>
                              </div>
                            ) : GST_type !== "Import" ? (
                              <div className="frame-input">
                                <label htmlFor="fileuploadPan">
                                  Upload PAN
                                </label>
                                <input
                                  type="file"
                                  id="fileuploadPan"
                                  // value={values.PAN_Doc}
                                  onChange={onFileChangePAN_Doc}
                                  required
                                  disabled={countryName !== "IN"}
                                />
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </Col>
                        ):(
                          <Col></Col>
                        )
                        }
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>CIN no*</Form.Label>
                            <InputGroup className="statutoryInput">
                              <Form.Control
                                style={{
                                  border: "none",
                                  borderRadius: "25px",
                                }}
                                type="text"
                                value={values.CIN_No}
                                id="Cin_no"
                                onChange={handleChange("CIN_No")}
                              />
                              <InputGroup.Text style={{ border: "none" }}>
                                <Tooltip title={cinNo}>
                                  <InfoIcon />
                                </Tooltip>
                              </InputGroup.Text>
                            </InputGroup>
                            {errors.CIN_No ? (
                                <p className="text text-danger small">
                                  {errors.CIN_No}
                                </p>
                              ) : (
                                ""
                              )}
                          </Form.Group>
                        </Col>
                        <Col></Col>
                      </Row>

                      <Row>
                        <Col>
                          {countryName !== "IN" ? (
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Form 10F*</Form.Label>
                              <br />
                              {params.userId ? (
                                <div>
                                  {Editform_10f_Doc != "" ||
                                  undefined ||
                                  null ? (
                                    <div>
                                      <span>File name: {Editform_10f_Doc}</span>

                                      <ClearIcon
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          DeleteForm10FDoc("form_10f_Doc");
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      <FileUploader
                                        className="financial_fileupload"
                                        handleChange={onFileChangeform_10f_Doc}
                                        required
                                        type="file"
                                        name="form_10f_Doc"
                                        fileOrFiles={form_10f_Doc}
                                      />
                                      <span>
                                        {form_10f_Doc ? (
                                          <>
                                            {" "}
                                            File name: ${form_10f_Doc.name}{" "}
                                            <ClearIcon
                                              style={{ color: "red" }}
                                              onClick={() => {
                                                DeleteForm10FDoc(
                                                  "form_10f_Doc"
                                                );
                                              }}
                                            />
                                          </>
                                        ) : (
                                          "No File Chosen"
                                        )}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  <FileUploader
                                    className="financial_fileupload"
                                    handleChange={onFileChangeform_10f_Doc}
                                    required
                                    type="file"
                                    name="form_10f_Doc"
                                    fileOrFiles={form_10f_Doc}
                                  />
                                  <span>
                                    {form_10f_Doc ? (
                                      <>
                                        {" "}
                                        File name: ${form_10f_Doc.name}{" "}
                                        <ClearIcon
                                          style={{ color: "red" }}
                                          onClick={() => {
                                            DeleteForm10FDoc("form_10f_Doc");
                                          }}
                                        />
                                      </>
                                    ) : (
                                      "No File Chosen"
                                    )}
                                  </span>
                                </div>
                              )}
                            </Form.Group>
                          ) : null}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {countryName !== "IN" ? (
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>No PE declaration*</Form.Label>
                              {(params.userId &&
                                EditPE_Declaration_Doc != "") ||
                              undefined ||
                              null ? (
                                <div>
                                  <span>
                                    File name: {EditPE_Declaration_Doc}
                                  </span>
                                  <ClearIcon
                                    style={{ color: "red" }}
                                    onClick={() => {
                                      DeletePEDeclaration("PE_Declaration_Doc");
                                    }}
                                  />
                                </div>
                              ) : (
                                <div>
                                  <FileUploader
                                    className="financial_fileupload"
                                    handleChange={
                                      onFileChangePE_Declaration_Doc
                                    }
                                    required
                                    type="file"
                                    name="PE_Declaration_Doc"
                                    fileOrFiles={PE_Declaration_Doc}
                                  />
                                  <span>
                                    {PE_Declaration_Doc ? (
                                      <>
                                        File name: ${PE_Declaration_Doc.name}
                                        <ClearIcon
                                          style={{ color: "red" }}
                                          onClick={() => {
                                            DeletePEDeclaration(
                                              "PE_Declaration_Doc"
                                            );
                                          }}
                                        />
                                      </>
                                    ) : (
                                      "No File Chosen"
                                    )}
                                  </span>
                                </div>
                              )}
                            </Form.Group>
                          ) : null}
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col>
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>MSME status*</Form.Label>
                            <Row>
                              <Col sm={4}>
                                {" "}
                                <input
                                  onChange={onChangeValueMSME_status}
                                  type="radio"
                                  value="1"
                                  name="Registered"
                                  checked={MSME_status === "1"}
                                />{" "}
                                Registered
                              </Col>
                              <Col sm={4}>
                                <input
                                  onChange={onChangeValueMSME_status}
                                  type="radio"
                                  value="2"
                                  name="UnRegistered"
                                  checked={MSME_status === "2"}
                                />{" "}
                                UnRegistered
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                      {hideMSMEunRegisteredField ? (
                        <>
                          {MSME_status === "2" ? (
                            <Row>
                              <Col>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>MSME no*</Form.Label>
                                  <Form.Control
                                    className="statutoryInput"
                                    type="text"
                                    value="N/A"
                                    disabled="true"
                                  />
                                  
                                </Form.Group>
                              </Col>
                              <Col>
                                {MSME_Doc !== "" &&
                                MSME_Doc !== "null" &&
                                MSME_Doc !== undefined &&
                                MSME_status === "1" ? (
                                  <div className="frame-input">
                                    <button
                                      type="button"
                                      className="deleteFile"
                                      onClick={() => {
                                        deleteFile("MSME_Doc");
                                      }}
                                    >
                                      Delete MSME
                                    </button>
                                  </div>
                                ) : MSME_status === "1" ? (
                                  <div className="frame-input">
                                    <label htmlFor="fileuploadMSME">
                                      Upload MSME
                                    </label>
                                    <input
                                      type="file"
                                      id="fileuploadMSME"
                                      // value={values.MSME_Doc}
                                      onChange={onFileChangeMSME_Doc}
                                      disabled="true"
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </Col>
                            </Row>
                          ) : (
                            <Row>
                              <Col>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>MSME no*</Form.Label>
                                  <InputGroup className="statutoryInput">
                                    <Form.Control
                                      style={{
                                        border: "none",
                                        borderRadius: "25px",
                                      }}
                                      id="Msme_no"
                                      type="text"
                                      value={values.MSME_No}
                                      onChange={handleChange("MSME_No")}
                                    />
                                    <InputGroup.Text style={{ border: "none" }}>
                                      <Tooltip title={msmeNo}>
                                        <InfoIcon />
                                      </Tooltip>
                                    </InputGroup.Text>
                                  </InputGroup>
                                  {errors.MSME_No ? (
                                <p className="text text-danger small">
                                  {errors.MSME_No}
                                </p>
                              ) : (
                                ""
                              )}
                                </Form.Group>
                              </Col>
                              <Col>
                                {MSME_Doc !== "" &&
                                MSME_Doc !== "null" &&
                                MSME_Doc !== undefined ? (
                                  <div className="frame-input">
                                    <button
                                      type="button"
                                      className="deleteFile"
                                      onClick={() => {
                                        deleteFile("MSME_Doc");
                                      }}
                                    >
                                      Delete MSME
                                    </button>
                                  </div>
                                ) : MSME_status === "1" ? (
                                  <div className="frame-input">
                                    <label htmlFor="fileuploadMSME">
                                      Upload MSME
                                    </label>
                                    <input
                                      type="file"
                                      id="fileuploadMSME"
                                      // value={values.MSME_Doc}
                                      onChange={onFileChangeMSME_Doc}
                                      required
                                      disabled={
                                        style === "notEditable" ? true : false
                                      }
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </Col>
                            </Row>
                          )}
                        </>
                      ) : (
                        <Row>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>MSME no*</Form.Label>
                              <Form.Control
                                className="statutoryInput"
                                type="text"
                                value="N/A"
                                disabled="true"
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            {MSME_Doc !== "" &&
                            MSME_Doc !== "null" &&
                            MSME_Doc !== undefined &&
                            MSME_status === "1" ? (
                              <div className="frame-input">
                                <button
                                  type="button"
                                  className="deleteFile"
                                  onClick={() => {
                                    deleteFile("MSME_Doc");
                                  }}
                                >
                                  Delete MSME
                                </button>
                              </div>
                            ) : MSME_status === "1" ? (
                              <div className="frame-input">
                                <label htmlFor="fileuploadMSME">
                                  Upload MSME
                                </label>
                                <input
                                  type="file"
                                  id="fileuploadMSME"
                                  // value={values.MSME_Doc}
                                  onChange={onFileChangeMSME_Doc}
                                  disabled="true"
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </Col>
                        </Row>
                      )}

                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>MSME type*</Form.Label>
                            <Row>
                              <Col sm={4}>
                                <input
                                  onChange={onChangeValueMSME}
                                  type="radio"
                                  value="1"
                                  name="Micro"
                                  checked={MSME === "1"}
                                  disabled={MSME_status === "2" ? true : false}
                                />{" "}
                                Micro
                              </Col>
                              <Col sm={4}>
                                <input
                                  onChange={onChangeValueMSME}
                                  type="radio"
                                  value="2"
                                  name="Small"
                                  checked={MSME === "2"}
                                  disabled={MSME_status === "2" ? true : false}
                                />{" "}
                                Small
                              </Col>
                              <Col sm={4}>
                                <input
                                  onChange={onChangeValueMSME}
                                  type="radio"
                                  value="3"
                                  name="Macro"
                                  checked={MSME === "3"}
                                  disabled={MSME_status === "2" ? true : false}
                                />{" "}
                                Medium
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>TAN no</Form.Label>
                            <InputGroup className="statutoryInput">
                              <Form.Control
                                style={{
                                  border: "none",
                                  borderRadius: "25px",
                                }}
                                type="text"
                                id="Tan_no"
                                value={values.TAN_No}
                                onChange={handleChange("TAN_No")}
                              />
                              <InputGroup.Text style={{ border: "none" }}>
                                <Tooltip title={tanNo}>
                                  <InfoIcon />
                                </Tooltip>
                              </InputGroup.Text>
                            </InputGroup>                          
   {errors.TAN_No ? (
                                <p className="text text-danger small">
                                  {errors.TAN_No}
                                </p>
                              ) : (
                                ""
                              )}
                          </Form.Group>
                        </Col>
                        <Col>
                          {/* <div className="frame-input">
                            <label htmlFor="fileuploadTAN">Upload TAN</label>
                            <input
                              type="file"
                              id="fileuploadTAN"
                              value={values.TAN_Doc}
                              onChange={onFileChangeTAN_Doc}
                              required
                              disabled={style==='notEditable'? true:false}
                            />
                          </div> */}

                          {TAN_Doc !== "" &&
                          TAN_Doc !== "null" &&
                          TAN_Doc !== undefined ? (
                            <div className="frame-input">
                              <button
                                type="button"
                                className="deleteFile"
                                onClick={() => {
                                  deleteFile("TAN_Doc");
                                }}
                              >
                                Delete TAN
                              </button>
                            </div>
                          ) : (
                            <div className="frame-input">
                              <label htmlFor="fileuploadTAN">Upload TAN</label>
                              <input
                                type="file"
                                id="fileuploadTAN"
                                value={values.TAN_Doc}
                                onChange={onFileChangeTAN_Doc}
                                required
                              />
                            </div>
                          )}
                        </Col>
                      </Row>
                      {countryName !== "IN" ? (
                        <Row>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>
                                Tax Residency Certificate*
                              </Form.Label>
                              {params.userId ? (
                                <div>
                                  {editTax_residency_Doc != "" ||
                                  undefined ||
                                  null ? (
                                    <div>
                                      <span>
                                        File name: {Tax_residency_Doc}
                                      </span>
                                      <ClearIcon
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          DeleteTax_residency(
                                            "Tax_residency_Doc"
                                          );
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      <FileUploader
                                        className="financial_fileupload"
                                        handleChange={
                                          onFileChangeTax_residency_Doc
                                        }
                                        required
                                        type="file"
                                        name="Tax_residency_Doc"
                                        fileOrFiles={Tax_residency_Doc}
                                      />
                                      <span>
                                        {Tax_residency_Doc ? (
                                          <>
                                            File name: ${Tax_residency_Doc.name}
                                            <ClearIcon
                                              style={{ color: "red" }}
                                              onClick={() => {
                                                DeleteTax_residency(
                                                  "Tax_residency_Doc"
                                                );
                                              }}
                                            />
                                          </>
                                        ) : (
                                          "No File Chosen"
                                        )}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  <FileUploader
                                    className="financial_fileupload"
                                    handleChange={onFileChangeTax_residency_Doc}
                                    required
                                    type="file"
                                    name="Tax_residency_Doc"
                                    fileOrFiles={Tax_residency_Doc}
                                  />
                                  <span>
                                    {Tax_residency_Doc ? (
                                      <>
                                        File name: ${Tax_residency_Doc.name}
                                        <ClearIcon
                                          style={{ color: "red" }}
                                          onClick={() => {
                                            DeleteTax_residency(
                                              "Tax_residency_Doc"
                                            );
                                          }}
                                        />
                                      </>
                                    ) : (
                                      "No File Chosen"
                                    )}
                                  </span>
                                </div>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                      ) : null}
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {!hideunRegisteredField || GST_type === "UnRegistered" ? (
          <Row>
            <Col>
              <a
                href={url}
                download="Declaration of GST Non Enrollment Format.pdf"
              >
                <Button className="DownloadDisclosure">
                  Download Declaration under non-registered GST
                </Button>
              </a>
            </Col>
          </Row>
        ) : null}
        <br />
        <Row>
          <Col>
            <p className="statutory-Note">
              NOTE: If the vendor is not registered with the above compliance,
              they can mention it as “UnRegistered” in that column and they will
              upload the discloser for the same on the document upload option.
            </p>
          </Col>
        </Row>
        <Row className="sbtn">
          <div className="float-end mt-2">
            <button
              type="button"
              onClick={cancel}
              className="btn statutorybtn btn-md m-1"
            >
              Cancel
            </button>
            {params.userId &&
            JSON.parse(window.sessionStorage.getItem("jwt"))?.result?.role ===
              "Admin" ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    saveStatutoryDetail(e);
                  }}
                  className="btn statutorybtn btn-md m-1"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    saveStatutoryDetail(e);
                  }}
                  className="btn bankbtn btn-md m-1"
                >
                  Save
                </button>
              </>
            )}

            <button
              type="button"
              onClick={next}
              className="btn statutorybtn btn-md m-1"
            >
              Next
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
}
