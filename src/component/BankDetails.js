import React, { useState, useEffect } from "react";
import "../css/BankDetails.css";
import Navbar1 from "../common/navbar.js";
import { FileUploader } from "react-drag-drop-files";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import handleApiError from '../utils/Errorhandler';
const BankDetails = (props) => {
  const [redirectUrl, setredirectUrl] = useState();
  const [EditBank, setEditBank] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [acName, setAcName] = useState("");
  const [bankname, setBankname] = useState("");
  const [acno, setAcno] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [micr, setMicr] = useState("");
  const [branchAdd, setbranchAdd] = useState("");
  const [fileBank, setfileBank] = useState();
  const [editValuefileBank, seteditValuefileBank] = useState("");
  const [deleteUploadedFile, setdeleteUploadedFile] = useState(false);
  const [style, setStyle] = useState("editable");
  const [isNewValueEntered, setIsNewValueEntered] = useState(false);
  const [previousAcName, setPreviousAcName] = useState("");
  const [previousbankname, setPreviousbankname] = useState("");
  const [previousacno, setPreviousacno] = useState("");
  const [previousifsc, setPreviousifsc] = useState("");
  const [previousmicr, setPreviousmicr] = useState("");
  const [previousbranchAdd, setPrevioubranchAdd] = useState("");
  const handleAcNameChange = (e) => {
    const { name, value } = e.target;
    setAcName(value);
    setErrors(e);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  const handleIFSCChange = (e) => {
    const { name, value } = e.target;
    setIfsc(value);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  const handlebranchAddChange = (e) => {
    const { name, value } = e.target;
    setbranchAdd(value);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  const handlebankNameChange = (e) => {
    const { name, value } = e.target;
    setBankname(value);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  const handleacNoChange = (e) => {
    const { name, value } = e.target;
    setAcno(value);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  function onFileChange(e) {
    setIsNewValueEntered(true);
    if (e.target) {
      const file = e.target.files[0];
      e.target.value = "";
      if (file && file.size > 5000000) {
        Swal.fire({
          title: "File size should be less than 5mb",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        setfileBank(null);
        setdeleteUploadedFile(false);
      } else if (file) {
        Swal.fire("File Selected!", "", "success");
        setfileBank(file);
        setdeleteUploadedFile(true);
      }
    } else {
      if (e.size > 5000000) {
        setfileBank(null);
        setdeleteUploadedFile(false);
        e = null;
        document.getElementsByName("fileBank")[0].value = null;
        Swal.fire({
          title: "File size should be less than 5mb",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire("File Selected!", "", "success");
        setfileBank(e);
        setdeleteUploadedFile(true);
      }
    }
  }

  function deleteFile(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((ClearData) => {
      if (ClearData.isConfirmed) {
        setfileBank("");
        seteditValuefileBank("");
        setdeleteUploadedFile(false);
      }
    });
  }
  const validateForm = () => {
    const newErrors = {};
    if (acName.length > 100) {
      newErrors.acName = "Name must be less than or equal to 100 characters";
    }
    if (bankname.length > 30) {
      newErrors.bankname =
        "Bank name must be less than or equal to 30 characters";
    }
    if (acno.length > 20) {
      newErrors.acno =
        "Account number must be less than or equal to 20 characters";
    }
    if (ifsc.length > 20) {
      newErrors.ifsc = "IFSC must be less than or equal to 20 characters";
    }
    if (branchAdd.length > 50) {
      newErrors.branchAdd =
        "Branch Address must be less than or equal to 50 characters";
    }
    if(micr.length > 30){
      newErrors.micr ="MICR/Swift Code must be less than or equal to 30 characters";
    }

    return newErrors;
  };
  function cancel(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setIsNewValueEntered(true);
        setAcName("");
        setBankname("");
        setAcno("");
        setIfsc("");
        setMicr("");
        setbranchAdd("");
        setfileBank("");
        seteditValuefileBank("");
        setdeleteUploadedFile(false);
      }
    });
  }
  const redirectToFinancialDetail = () => {
    if (
      (redirectUrl===undefined||redirectUrl &&
        redirectUrl.FinancialDetail &&
        redirectUrl.FinancialDetail?.length <= 0) ||
      "" ||
      undefined
    ) {
      navigate("/FinancialDetail");
    } else {
      navigate(`/FinancialDetail/${redirectUrl.FinancialDetail[0].userId}`);
    }
  };
 
  function next(e) {
    console.log("previousAcName::", previousAcName);
    if (
      isNewValueEntered ||
      acName !== previousAcName ||
      bankname !== previousbankname ||
      acno !== previousacno ||
      ifsc !== previousifsc ||
      micr !== previousmicr ||
      branchAdd !== previousbranchAdd
    ) {
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
          const formErrors = validateForm();
          e.preventDefault();
          if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
          } else {
            saveBankDetail(e).then((response) => {
              if (response === "success") {
                redirectToFinancialDetail();
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
          if (redirectUrl===undefined||redirectUrl.FinancialDetail?.length <= 0 || "" || undefined) {
            navigate("/FinancialDetail");
          } else {
            navigate(
              `/FinancialDetail/${redirectUrl?.FinancialDetail[0]?.userId}`
            );
          }
        }
      });
    } else {
      if (redirectUrl===undefined||redirectUrl.FinancialDetail?.length <= 0 || "" || undefined) {
        navigate("/FinancialDetail");
      } else {
        navigate(`/FinancialDetail/${redirectUrl?.FinancialDetail[0]?.userId}`);
      }
    }
  }

  const saveBankDetail = (e) => {
    const formErrors = validateForm();
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      return new Promise((resolve) => {
        // e.preventDefault();
        const data = new FormData();
        data.append(
          "userId",
          JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        );
        data.append("Account_Holder_Name", acName);
        data.append("Bank_Name", bankname);
        data.append("Account_No", acno);
        data.append("IFSC_Code", ifsc);
        data.append("MICRcode", micr);
        data.append("Bank_Address", branchAdd);
        data.append("bankdetailDoc", fileBank);
        if (params?.userId) {
          apiService.updateBankDetail(params?.userId, data).then((response) => {
            if (response) {
              Swal.fire({
                title: "Data updated",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  resolve("success");
                  fetchdata();
                  setIsNewValueEntered(false);
                  setPreviousAcName(acName);
                  setPreviousbankname(bankname);
                  setPreviousacno(acno);
                  setPreviousifsc(ifsc);
                  setPreviousmicr(micr);
                  setPrevioubranchAdd(branchAdd);
                } else if (result.dismiss === Swal.DismissReason.close) {
                  resolve("success");
                  fetchdata();
                  setIsNewValueEntered(false);
                  setPreviousAcName(acName);
                  setPreviousbankname(bankname);
                  setPreviousacno(acno);
                  setPreviousifsc(ifsc);
                  setPreviousmicr(micr);
                  setPrevioubranchAdd(branchAdd);
                } else {
                  resolve("error");
                }
              });
            
            } else {
              Swal.fire({
                title: "Error While Fetching",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          }).catch((error) => {
            handleApiError(error);
          });
        } else {
          let newuser = JSON.parse(
            window.sessionStorage.getItem("newregUser")
          )?.newregUser;
          if (newuser) {
            const bankdata = new FormData();
            bankdata.append("userId", newuser);
            bankdata.append("Account_Holder_Name", acName);
            bankdata.append("Bank_Name", bankname);
            bankdata.append("Account_No", acno);
            bankdata.append("IFSC_Code", ifsc);
            bankdata.append("MICRcode", micr);
            bankdata.append("Bank_Address", branchAdd);
            bankdata.append("bankdetailDoc", fileBank);
            apiService.savebankdetail(bankdata).then((response) => {
              if (response) {
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
                    fetchdata();
                    setIsNewValueEntered(false);
                    setPreviousAcName(acName);
                    setPreviousbankname(bankname);
                    setPreviousacno(acno);
                    setPreviousifsc(ifsc);
                    setPreviousmicr(micr);
                    setPrevioubranchAdd(branchAdd);
                  } else if (result.dismiss === Swal.DismissReason.close) {
                    resolve("success");
                    fetchdata();
                    setIsNewValueEntered(false);
                    setPreviousAcName(acName);
                    setPreviousbankname(bankname);
                    setPreviousacno(acno);
                    setPreviousifsc(ifsc);
                    setPreviousmicr(micr);
                    setPrevioubranchAdd(branchAdd);
                  } else {
                    resolve("error");
                  }
                });
              } else {
                Swal.fire({
                  title: "Error While Fetching",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            }).catch((error) => {
              handleApiError(error);
            });
          } else {
            apiService.savebankdetail(data).then((response) => {
              if (response) {
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
                    fetchdata();
                    setIsNewValueEntered(false);
                    setPreviousAcName(acName);
                    setPreviousbankname(bankname);
                    setPreviousacno(acno);
                    setPreviousifsc(ifsc);
                    setPreviousmicr(micr);
                    setPrevioubranchAdd(branchAdd);
                  } else if (result.dismiss === Swal.DismissReason.close) {
                    resolve("success");
                    fetchdata();
                    setIsNewValueEntered(false);
                    setPreviousAcName(acName);
                    setPreviousbankname(bankname);
                    setPreviousacno(acno);
                    setPreviousifsc(ifsc);
                    setPreviousmicr(micr);
                    setPrevioubranchAdd(branchAdd);
                  } else {
                    resolve("error");
                  }
                });
                // .then((res) => {
                //   navigate(`/FinancialDetail`);
                // });
              } else {
                Swal.fire({
                  title: "Error While Fetching",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            }).catch((error) => {
              handleApiError(error);
            });
          }
        }
      });
    }
  };

  const updatehandle = (event) => {
    const formErrors = validateForm();
    event.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      return new Promise((resolve) => {
        event.preventDefault();
        setIsNewValueEntered(false);
        const data = new FormData();
        data.append("userId", params?.userId);
        data.append("Account_Holder_Name", acName);
        data.append("Bank_Name", bankname);
        data.append("Account_No", acno);
        data.append("IFSC_Code", ifsc);
        data.append("MICRcode", micr);
        data.append("Bank_Address", branchAdd);
        data.append("bankdetailDoc", fileBank);
        if (params?.userId) {
          apiService.updateBankDetail(params?.userId, data).then((response) => {
            if (response) {
              Swal.fire({
                title: "Data updated",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  resolve("success");
                  fetchdata();
                  setIsNewValueEntered(false);
                  setPreviousAcName(acName);
                  setPreviousbankname(bankname);
                  setPreviousacno(acno);
                  setPreviousifsc(ifsc);
                  setPreviousmicr(micr);
                  setPrevioubranchAdd(branchAdd);
                } else if (result.dismiss === Swal.DismissReason.close) {
                  resolve("success");
                  fetchdata();
                  setIsNewValueEntered(false);
                  setPreviousAcName(acName);
                  setPreviousbankname(bankname);
                  setPreviousacno(acno);
                  setPreviousifsc(ifsc);
                  setPreviousmicr(micr);
                  setPrevioubranchAdd(branchAdd);
                } else {
                  resolve("error");
                }
              });
            } else {
              Swal.fire({
                title: "Error While Fetching",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          }).catch((error) => {
            handleApiError(error);
          });
        }
      });
    }
  };
  function fetchdata(e) {
    setIsNewValueEntered(false);
    let newuser = JSON.parse(
      window.sessionStorage.getItem("newregUser")
    )?.newregUser;
    if (params?.userId) {
      // eslint-disable-next-line no-unused-vars
      let finalstatus = "";
      apiService.signupFindByUserId(params?.userId).then((res) => {
        finalstatus = res.data.result?.finalStatus;
      }).catch((error) => {
        handleApiError(error);
      });
      apiService.getAllCollection(params?.userId).then((res) => {
        setredirectUrl(res.data);
        if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          finalstatus !== "Approved" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
        ) {
          setStyle("notEditable");
        }
        Object.entries(res.data.Bankdetail).map(([key, value]) => {
          var initialUrlbankDoc = res.data.Bankdetail[0].bankdetailDoc;
          var ret = initialUrlbankDoc.replace("uploads/", "");
          var bankdetailDoc = ret;
          setAcName(value.Account_Holder_Name);
          setPreviousAcName(value.Account_Holder_Name);
          setBankname(value.Bank_Name);
          setPreviousbankname(value.Bank_Name);
          setAcno(value.Account_No);
          setPreviousacno(value.Account_No);
          setIfsc(value.IFSC_Code);
          setPreviousifsc(value.IFSC_Code);
          setMicr(value.MICRcode);
          setPreviousmicr(value.MICRcode);
          setPrevioubranchAdd(value.Bank_Address);
          setbranchAdd(value.Bank_Address);
          setfileBank(initialUrlbankDoc);
          seteditValuefileBank(bankdetailDoc);
          return null;
        });
      }).catch((error) => {
        handleApiError(error);
      });
    } else if (newuser) {
      // eslint-disable-next-line no-unused-vars
      let finalstatus = "";
      apiService.signupFindByUserId(newuser).then((res) => {
        finalstatus = res.data.result?.finalStatus;
      }).catch((error) => {
        handleApiError(error);
      });
      apiService.getAllCollection(newuser).then((res) => {
        setredirectUrl(res.data);
        if (res.data.basicInfo[0]?.submitStatus === "Submitted") {
          setStyle("notEditable");
        }
        Object.entries(res.data.Bankdetail).map(([key, value]) => {
          var initialUrlbankDoc = res.data.Bankdetail[0]?.bankdetailDoc;
          var ret = initialUrlbankDoc.replace("uploads/", "");
          var bankdetailDoc = ret;
          setAcName(value.Account_Holder_Name);
          setBankname(value.Bank_Name);
          setAcno(value.Account_No);
          setIfsc(value.IFSC_Code);
          setMicr(value.MICRcode);
          setbranchAdd(value.Bank_Address);
          setfileBank(initialUrlbankDoc);
          seteditValuefileBank(bankdetailDoc);
          return null;
        });
      }).catch((error) => {
        handleApiError(error);
      });
    } else {
      apiService
        .getAllCollection(
          JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        )
        .then((res) => {
          setredirectUrl(res.data);
        }).catch((error) => {
          handleApiError(error);
        });
      setEditBank(false);
    }
    console.log("previousAcName", previousAcName);
  }
  useEffect(() => {
    // const admin = JSON.parse(window.sessionStorage.getItem("jwt")).result.role
    // console.log("admin--->", admin);

    let newuser = JSON.parse(
      window.sessionStorage.getItem("newregUser")
    )?.newregUser;
    if (params?.userId) {
      // eslint-disable-next-line no-unused-vars
      let finalstatus = "";
      apiService.signupFindByUserId(params?.userId).then((res) => {
        finalstatus = res.data.result?.finalStatus;
      }).catch((error) => {
        handleApiError(error);
      });
      apiService.getAllCollection(params?.userId).then((res) => {
        setredirectUrl(res.data);
        if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
        ) {
          setStyle("notEditable");
        }
        Object.entries(res.data.Bankdetail).map(([key, value]) => {
          var initialUrlbankDoc = res.data.Bankdetail[0].bankdetailDoc;
          var ret = initialUrlbankDoc.replace("uploads/", "");
          var bankdetailDoc = ret;
          setAcName(value.Account_Holder_Name);
          setPreviousAcName(value.Account_Holder_Name);
          setBankname(value.Bank_Name);
          setPreviousbankname(value.Bank_Name);
          setAcno(value.Account_No);
          setPreviousacno(value.Account_No);
          setIfsc(value.IFSC_Code);
          setPreviousifsc(value.IFSC_Code);
          setMicr(value.MICRcode);
          setPreviousmicr(value.MICRcode);
          setPrevioubranchAdd(value.Bank_Address);
          setbranchAdd(value.Bank_Address);
          setfileBank(initialUrlbankDoc);
          seteditValuefileBank(bankdetailDoc);
          return null;
        });
      }).catch((error) => {
        handleApiError(error);
      });
    } else if (newuser) {
      // eslint-disable-next-line no-unused-vars
      let finalstatus = "";
      apiService.signupFindByUserId(newuser).then((res) => {
        finalstatus = res.data.result?.finalStatus;
      }).catch((error) => {
        handleApiError(error);
      });
      apiService.getAllCollection(newuser).then((res) => {
        setredirectUrl(res.data);
        if (res.data.basicInfo[0]?.submitStatus === "Submitted") {
          setStyle("notEditable");
        }
        Object.entries(res.data.Bankdetail).map(([key, value]) => {
          var initialUrlbankDoc = res.data.Bankdetail[0]?.bankdetailDoc;
          var ret = initialUrlbankDoc.replace("uploads/", "");
          var bankdetailDoc = ret;
          setAcName(value.Account_Holder_Name);
          setBankname(value.Bank_Name);
          setAcno(value.Account_No);
          setIfsc(value.IFSC_Code);
          setMicr(value.MICRcode);
          setbranchAdd(value.Bank_Address);
          setfileBank(initialUrlbankDoc);
          seteditValuefileBank(bankdetailDoc);
          return null;
        });
      }).catch((error) => {
        handleApiError(error);
      });
    } else {
      apiService
        .getAllCollection(
          JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        )
        .then((res) => {
          setredirectUrl(res.data);
        }).catch((error) => {
          handleApiError(error);
        });
      setEditBank(false);
    }
  }, [params?.userId]);
  return (
    <div className="bank-details">
      <Navbar1 />
      <div className="container-fluid  py-5 pagebg">
        <form style={{ mt: 5 }} className={style}>
          <div className="container">
            <span className="bank_title">Bank Details</span>
            <div className="row p-3 sectionbg">
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">Name as per Bank A/c*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="Account_Holder_Name"
                  value={acName}
                  onChange={handleAcNameChange}
                />
                {errors.acName ? (
                  <p className="text text-danger small">{errors.acName}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">IFSC code*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="ifsc"
                  value={(ifsc || "").toUpperCase()}
                  onChange={handleIFSCChange}
                />
                {errors.ifsc ? (
                  <p className="text text-danger small">{errors.ifsc}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">Bank name*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="Bank_Name"
                  value={(bankname || "").toUpperCase()}
                  onChange={handlebankNameChange}
                />
                {errors.bankname ? (
                  <p className="text text-danger small">{errors.bankname}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">MICR code/ Swift code*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="micr"
                  value={micr}
                  onChange={(e) => setMicr(e.target.value)}
                />
                 {errors.micr ? (
                  <p className="text text-danger small">{errors.micr}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">Bank A/C no*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="acno"
                  value={acno}
                  onChange={handleacNoChange}
                />
                {errors.acno ? (
                  <p className="text text-danger small">{errors.acno}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label className="banklabel">Branch address*</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="branchAdd"
                  value={(branchAdd || "").toUpperCase()}
                  onChange={handlebranchAddChange}
                />
                {errors.branchAdd ? (
                  <p className="text text-danger small">{errors.branchAdd}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="payment-will-be-processed-base">
              **Payment will be processed based on the mentioned detail only,
              HISYS will not be responsible for the incorrect detail hence bank
              detail should be entered carefully.
            </div>
          </div>
          <div className="container mt-3">
            <span className="bank_title">Upload Files</span>
            <br />
            <span className="bank_subtitle">
              Upload your files here for verification.
            </span>
            <div className="row p-3 ml-2 sectionbg">
              <div className="row">
                {" "}
                <span className="ml-2">
                  Copy of cancel Cheque/Bank detail duly certified from bank*
                </span>{" "}
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12 my-auto">
                {EditBank ? (
                  <div>
                    {editValuefileBank !== "" ? (
                      <div>
                        <span>File name: {editValuefileBank}</span>
                      </div>
                    ) : (
                      <div>
                        <FileUploader
                          className="bank_fileupload"
                          handleChange={onFileChange}
                          required
                          type="file"
                          name="fileBank"
                          fileOrFiles={fileBank}
                          disabled={style === "notEditable" ? true : false}
                        />
                        <span>
                          {fileBank ? (
                            <>File name: ${fileBank.name}</>
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
                      className="bank_fileupload"
                      handleChange={onFileChange}
                      required
                      type="file"
                      name="fileBank"
                      fileOrFiles={deleteUploadedFile}
                    />
                    <span>
                      {fileBank ? (
                        <>File name: ${fileBank.name}</>
                      ) : (
                        "No File Chosen"
                      )}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 ">
                {fileBank !== "" &&
                fileBank !== undefined &&
                fileBank !== null ? (
                  <button
                    type="button"
                    onClick={deleteFile}
                    className="btn m-2 uploadFile"
                  >
                    Delete files
                  </button>
                ) : (
                  // <button type="button" className="btn m-2 uploadFile">
                  //   Upload files
                  // </button>
                  <div className="bank-input">
                    <label htmlFor="fileupload">upload files</label>
                    <input
                      type="file"
                      id="fileupload"
                      // value={values.GST_Doc}
                      onChange={onFileChange}
                      required
                      disabled={style === "notEditable" ? true : false}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-2 col-sm-12 col-xs-12"></div>
            </div>
            <div className="float-end mt-2">
              <button
                type="button"
                onClick={cancel}
                className="btn bankbtn btn-md m-1"
              >
                Cancel
              </button>
              {params?.userId &&
              JSON.parse(window.sessionStorage.getItem("jwt")).result.role ===
                "Admin" ? (
                <>
                  <button
                    type="submit"
                    className="btn bankbtn btn-md m-1"
                    onClick={updatehandle}
                  >
                    update
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn bankbtn btn-md m-1"
                    onClick={(e) => {
                      saveBankDetail(e);
                    }}
                  >
                    Save
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={(e) => next(e)}
                className="btn bankbtn btn-md m-1"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankDetails;
