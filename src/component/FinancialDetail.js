import React, { useState, useEffect } from "react";
import "../css/FinancialDetail.css";
import Navbar1 from "../common/navbar.js";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { useParams } from "react-router-dom";
import { TroubleshootSharp } from "@mui/icons-material";
import handleApiError from '../utils/Errorhandler';
const FinancialDetails = () => {
  const [redirectUrl, setredirectUrl] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const [style, setStyle] = useState("editable");
  const [EditfinancialDetail, setEditfinancialDetail] = useState(true);
  const [deleteUploadedFile, setdeleteUploadedFile] = useState(false);
  const [deleteUploadedFile2, setdeleteUploadedFile2] = useState(false);
  const [errors, setErrors] = useState({});
  const [fileFD, setfileFD] = useState();
  const [editfileFD, seteditfileFD] = useState();
  const [fileFD2, setfileFD2] = useState();
  const [editfileFD2, seteditfileFD2] = useState();
  const [isNewValueEntered, setIsNewValueEntered] = useState(false);
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    yearOfAuditedFinancial: "",
    Revenue: "",
    Profit: "",
    netWorth: "",
    currentAssets: "",
    directorDetails: "",
    organisationType: "",
    shareholderName: "",
  });
  function onFileChangeFD(e) {
    setIsNewValueEntered(true);
    if (e.target) {
      const selectedFile = e.target.files[0];
      e.target.value = "";
      if (selectedFile && selectedFile.size > 10000000) {
        Swal.fire({
          title: "file size should be less than 10mb",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else if (selectedFile) {
        Swal.fire("File Selected!", "", "success");
        setfileFD(selectedFile);
        setdeleteUploadedFile(true);
      }
    } else {
      if (e.size > 10000000) {
        setfileFD(null);
        setdeleteUploadedFile(null);
        e = null;
        document.getElementsByName("fileFD")[0].value = null;
        Swal.fire({
          title: "file size should be less than 10mb",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire("File Selected!", "", "success");
        setfileFD(e);
        setdeleteUploadedFile(true);
      }
    }
  }

  function onFileChangeFD2(e) {
    setIsNewValueEntered(true);
    if (e.target) {
      const selectedFile = e.target.files[0];
      e.target.value = "";
      if (selectedFile && selectedFile.size > 10000000) {
        Swal.fire({
          title: "file size should be less than 10mb",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else if (selectedFile) {
        Swal.fire("File Selected!", "", "success");
        setfileFD2(selectedFile);
        setdeleteUploadedFile2(true);
      }
    } else {
      if (e.size > 10000000) {
        setfileFD2(null);
        setdeleteUploadedFile2(null);
        e = null;
        document.getElementsByName("fileFD2")[0].value = null;
        Swal.fire({
          title: "file size should be less than 10mb",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire("File Selected!", "", "success");
        setfileFD2(e);
        setdeleteUploadedFile2(true);
      }
    }
  }

  function deleteFile1(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete file?",
      icon: "success",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setfileFD("");
        setdeleteUploadedFile(false);
        seteditfileFD("");
        setIsNewValueEntered(true);
      }
    });
  }
  function deleteFile2(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete file?",
      icon: "success",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setfileFD2("");
        setdeleteUploadedFile2(false);
        seteditfileFD2("");
        setIsNewValueEntered(true);
      }
    });
  }
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
        setValues({
          yearOfAuditedFinancial: "",
          Revenue: "",
          Profit: "",
          netWorth: "",
          currentAssets: "",
          directorDetails: "",
          organisationType: "",
          shareholderName: "",
        });
        setIsNewValueEntered(true);
        setfileFD("");
        setdeleteUploadedFile(false);
        seteditfileFD("");
        setfileFD2("");
        setdeleteUploadedFile2(false);
        seteditfileFD2("");
      }
    });
  }
  const redirectToContactTeam = () => {
    if (redirectUrl===undefined||redirectUrl?.contactDetail?.length <= 0 || "" || undefined) {
      navigate("/ContactTeam");
    } else {
      navigate(`/ContactTeam/${redirectUrl?.contactDetail[0]?.userId}`);
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
          if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
          } else {
          saveFinancialDetail(e).then((response) => {
            if (response === "success") {
              redirectToContactTeam();
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
          if (redirectUrl===undefined||redirectUrl?.contactDetail?.length <= 0 || "" || undefined) {
            navigate("/ContactTeam");
          } else {
            navigate(`/ContactTeam/${redirectUrl?.contactDetail[0]?.userId}`);
          }
        }
      });
    } else {
      if (redirectUrl===undefined||redirectUrl?.contactDetail?.length <= 0 || "" || undefined) {
        navigate("/ContactTeam");
      } else {
        navigate(`/ContactTeam/${redirectUrl?.contactDetail[0]?.userId}`);
      }
    }
    // saveFinancialDetail(e);
  }
  const handleKeyDown = (event) => {
    // Prevent the letter 'e' from being typed in the input field
    if (event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  };
  const handleChange = (name) => (event) => {
    setIsNewValueEntered(true);
    setValues({ ...values, [name]: event.target.value });
    setErrors(event);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
      // if (name === "Revenue" && values.toLowerCase().includes("e")) {
        
      //   setValues({ ...values, [name]: "" });
      // } else {
       
      //   setValues({ ...values, [name]: values });
      // }
  };
  const validateForm = () => {
    const { yearOfAuditedFinancial,currentAssets,directorDetails,shareholderName } = values;

    const newErrors = {};

    if (yearOfAuditedFinancial.length > 10) {
      newErrors.yearOfAuditedFinancial = "yearOfAuditedFinancial must be less than or equal to 10 characters";
    }
    if (currentAssets.length > 30) {
      newErrors.currentAssets = "CurrentAssets must be less than or equal to 30 characters";
    }

if (directorDetails.length > 30) {
      newErrors.directorDetails = "DirectorDetails must be less than or equal to 30 characters";
    }
    if (shareholderName.length > 100) {
      newErrors.shareholderName = "shareholderName must be less than or equal to 100 characters";
    }
    return newErrors;
  };
  const saveFinancialDetail = (e) => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
    return new Promise((resolve) => {
      // e.preventDefault();
      setIsNewValueEntered(false);
      const data = new FormData();
      data.append("financial_data", fileFD);
      data.append("financial_data2", fileFD2);
      data.append("yearOfAuditedFinancial", values.yearOfAuditedFinancial);
      data.append("Revenue", values.Revenue);
      data.append("Profit", values.Profit);
      data.append("netWorth", values.netWorth);
      data.append("currentAssets", values.currentAssets);
      data.append("directorDetails", values.directorDetails);
      data.append("organisationType", values.organisationType);
      data.append("shareholderName", values.shareholderName);
      data.append(
        "userId",
        JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
      );
      if (params.userId) {
        if (style !== "notEditable") {
          apiService.updateFinacialDetail(params.userId, data).then((res) => {
            if (res.data.status === "success") {
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
              }).then((res) => {
                navigate(`/ContactTeam/${params.userId}`);
              });
            }
          }).catch((error) => {
            handleApiError(error);
          });
        } else {
          Swal.fire({
            title: "Vendor Data Already Submitted",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        let newuser = JSON.parse(
          window.sessionStorage.getItem("newregUser")
        )?.newregUser;
        if (newuser) {
          const financedata = new FormData();
          financedata.append("financial_data", fileFD);
          financedata.append("financial_data2", fileFD2);
          financedata.append(
            "yearOfAuditedFinancial",
            values.yearOfAuditedFinancial
          );
          financedata.append("Revenue", values.Revenue);
          financedata.append("Profit", values.Profit);
          financedata.append("netWorth", values.netWorth);
          financedata.append("currentAssets", values.currentAssets);
          financedata.append("directorDetails", values.directorDetails);
          data.append("organisationType", values.organisationType);
          data.append("shareholderName", values.shareholderName);
          financedata.append("userId", newuser);
          apiService.saveFinacialDetail(financedata).then((res) => {
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
              });
            }
          }).catch((error) => {
            handleApiError(error);
          });
        } else {
          apiService.saveFinacialDetail(data).then((res) => {
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
  const updateFinancialDetail = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
    return new Promise((resolve) => {
      // e.preventDefault();
      setIsNewValueEntered(false);
      const data = new FormData();
      data.append("financial_data", fileFD);
      data.append("financial_data2", fileFD2);
      data.append("yearOfAuditedFinancial", values.yearOfAuditedFinancial);
      data.append("Revenue", values.Revenue);
      data.append("Profit", values.Profit);
      data.append("netWorth", values.netWorth);
      data.append("currentAssets", values.currentAssets);
      data.append("directorDetails", values.directorDetails);
      data.append("organisationType", values.organisationType);
      data.append("shareholderName", values.shareholderName);
      data.append("userId", params.userId);
      if (params.userId) {
        apiService.updateFinacialDetail(params.userId, data).then((res) => {
          if (res.data.status === "success") {
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
          handleApiError(error);
        });
      }
    });
  }
  };
  useEffect(() => {
    let newuser = JSON.parse(
      window.sessionStorage.getItem("newregUser")
    )?.newregUser;
    if (params.userId) {
      let finalstatus = "";
      apiService.signupFindByUserId(params.userId).then((res) => {
        finalstatus = res.data.result?.finalStatus;
      }).catch((error) => {
        handleApiError(error);
      });
      apiService.getAllCollection(params.userId).then((res) => {
        setredirectUrl(res.data);
        Object.entries(res.data.FinancialDetail).map(([key, value]) => {
          if (res.data.basicInfo[0]?.submitStatus === "Submitted" && finalstatus !== "Approved" && JSON.parse(window.sessionStorage.getItem("jwt")).result.role !== "Admin") {
          
            setStyle("notEditable");
          }
         else if (res.data.basicInfo[0]?.submitStatus === "Submitted" && finalstatus === "Approved" && JSON.parse(window.sessionStorage.getItem("jwt")).result.role !== "Admin") {
          
            setStyle("notEditable");
          }
         else{
            setStyle("editable");
          }
          var initialUrlfinancial_data =
            res.data.FinancialDetail[0].financial_data;
          var replaceUrlFinancialData1 = initialUrlfinancial_data.replace(
            "uploads/",
            ""
          );
          var initialUrlfinancial_data2 =
            res.data.FinancialDetail[0].financial_data2;
          var replaceUrlFinancialData2 = initialUrlfinancial_data2.replace(
            "uploads/",
            ""
          );
          setValues({
            yearOfAuditedFinancial: value.yearOfAuditedFinancial,
            Revenue: value.Revenue,
            Profit: value.Profit,
            netWorth: value.netWorth,
            currentAssets: value.currentAssets,
            directorDetails: value.directorDetails,
            organisationType: value.organisationType,
            shareholderName: value.shareholderName,
          });
          setfileFD2(initialUrlfinancial_data2);
          setfileFD(initialUrlfinancial_data);
          seteditfileFD(replaceUrlFinancialData1);
          seteditfileFD2(replaceUrlFinancialData2);
          setEditfinancialDetail(true);
        });
      }).catch((error) => {
        handleApiError(error);
      });
    } else if (newuser) {
      let finalstatus = "";
      apiService.signupFindByUserId(newuser).then((res) => {
        finalstatus = res.data.result?.finalStatus;
      }).catch((error) => {
        handleApiError(error);
      });
      apiService.getAllCollection(newuser).then((res) => {
        setredirectUrl(res.data);
        Object.entries(res.data.FinancialDetail).map(([key, value]) => {
          if (res.data.basicInfo[0]?.submitStatus === "Submitted" && finalstatus !== "Approved" && JSON.parse(window.sessionStorage.getItem("jwt")).result.role !== "Admin") {
          
            setStyle("notEditable");
          }
         else if (res.data.basicInfo[0]?.submitStatus === "Submitted" && finalstatus === "Approved" && JSON.parse(window.sessionStorage.getItem("jwt")).result.role !== "Admin") {
          
            setStyle("notEditable");
          }
         else{
            setStyle("editable");
          }
          var initialUrlfinancial_data =
            res.data.FinancialDetail[0].financial_data;
          var replaceUrlFinancialData1 = initialUrlfinancial_data.replace(
            "uploads/",
            ""
          );
          var initialUrlfinancial_data2 =
            res.data.FinancialDetail[0].financial_data2;
          var replaceUrlFinancialData2 = initialUrlfinancial_data2.replace(
            "uploads/",
            ""
          );
          setValues({
            yearOfAuditedFinancial: value.yearOfAuditedFinancial,
            Revenue: value.Revenue,
            Profit: value.Profit,
            netWorth: value.netWorth,
            currentAssets: value.currentAssets,
            directorDetails: value.directorDetails,
            organisationType: value.organisationType,
            shareholderName: value.shareholderName,
          });
          setfileFD2(initialUrlfinancial_data2);
          setfileFD(initialUrlfinancial_data);
          seteditfileFD(replaceUrlFinancialData1);
          seteditfileFD2(replaceUrlFinancialData2);
          setEditfinancialDetail(true);
        });
      }).catch((error) => {
        handleApiError(error);
      });
    } else {
      let finalstatus = "";
      apiService
        .getAllCollection(
          JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        )
        .then((res) => {
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
        }).catch((error) => {
          handleApiError(error);
        });
      setEditfinancialDetail(false);
    }
  }, []);
  return (
    <div className="financial-details">
      <Navbar1 />
      <div
        className="container-fluid  py-5"
        style={{ backgroundColor: "#f3f4f7" }}
      >
        <form className={style}>
          <div className="container">
            <span className="financial_title">Financial Detail</span>
            <div className="row p-5" style={{ backgroundColor: "#fff" }}>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="yearOfAuditedFinancial">
                  Year of audited financial
                </label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="yearOfAuditedFinancial"
                  value={values.yearOfAuditedFinancial}
                  onChange={handleChange("yearOfAuditedFinancial")}
                />
                {errors.yearOfAuditedFinancial ? (
                  <p className="text text-danger small">
                    {errors.yearOfAuditedFinancial}
                  </p>
                ) : (
                  ""
                )}
                <label htmlFor="netWorth">Networth</label>
                <input
                  type="number"
                  className="mb-4 inputbox"
                  name="netWorth"
                  value={values.netWorth}
                  onChange={handleChange("netWorth")}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="Revenue">Revenue</label>
                <input
                  type="number"
                  className="mb-4 inputbox"
                  name="Revenue"
                  value={values.Revenue}
                  onChange={handleChange("Revenue")}
                  onKeyDown={handleKeyDown}
                />
                <label htmlFor="currentAssets">Current assets</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="currentAssets"
                  value={values.currentAssets}
                  onChange={handleChange("currentAssets")}
                />
                {errors.currentAssets ? (
                  <p className="text text-danger small">
                    {errors.currentAssets}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="Profit">Profit</label>
                <input
                  type="number"
                  className="mb-4 inputbox"
                  name="Profit"
                  value={values.Profit}
                  onChange={handleChange("Profit")}
                  onKeyDown={handleKeyDown}
                />
                <label htmlFor="directorDetails">Director detail</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="directorDetails"
                  value={values.directorDetails}
                  onChange={handleChange("directorDetails")}
                />
                {errors.directorDetails ? (
                  <p className="text text-danger small">
                    {errors.directorDetails}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="Organisationtype">Organisation type</label>
                <select
                  className="form-select"
                  id="Distributors"
                  name="Organisationtype"
                  aria-label="Disabled select example"
                  value={values.organisationType}
                  disabled={style === "notEditable" ? true : false}
                  onChange={handleChange("organisationType")}
                >
                  <option value="null">- Select Organisation Type -</option>
                  <option value="Company">Company</option>
                  <option value="LLP">LLP</option>
                  <option value="Partnership Firm">Partnership Firm</option>
                  <option value="Proprietorship">Proprietorship</option>
                </select>
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label htmlFor="Shareholdername">Shareholder name</label>
                <input
                  type="text"
                  className="mb-4 inputbox"
                  name="Shareholdername"
                  value={values.shareholderName}
                  onChange={handleChange("shareholderName")}
                />
                   {errors.shareholderName ? (
                  <p className="text text-danger small">
                    {errors.shareholderName}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="container mt-5">
            <span className="financial_title">Upload Files</span>
            <br />
            <span className="financial_subtitle">
              Upload your files here for verification.
            </span>
            <div className="row p-5" style={{ backgroundColor: "#fff" }}>
              <div className="col-sm-6 col-xs-12 my-auto">
                Financial Data
                {EditfinancialDetail ? (
                  <div>
                    {editfileFD ? (
                      <div>
                        <span>File name:{" "}{editfileFD}</span>
                      </div>
                    ) : (
                      <div>
                        <FileUploader
                          className="financial_fileupload"
                          handleChange={onFileChangeFD}
                          required
                          type="file"
                          name="fileFD"
                          fileOrFiles={fileFD}
                          disabled={style === "notEditable" ? true : false}
                        />
                         <span>
                          {fileFD
                              ? <>File name:{" "} ${fileFD.name}</>
                            : "No File Chosen"}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      className="financial_fileupload"
                      handleChange={onFileChangeFD}
                      required
                      type="file"
                      name="fileFD"
                      fileOrFiles={fileFD}
                      disabled={style === "notEditable" ? true : false}
                    />
                     <span>
                        {fileFD ? <>File name:{" "} ${fileFD.name}</> : "No File Chosen"}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-sm-4 col-xs-12 my-auto">
                {fileFD !== "" && fileFD !== null && fileFD !== undefined ? (
                  <button
                    type="button"
                    onClick={deleteFile1}
                    className="btn  m-2 uploadFile"
                    style={{ fontSize: "12px" }}
                  >
                    Delete files
                  </button>
                ) : (
                  <div className="finance-input">
                    <label htmlFor="fileupload1">upload files</label>
                    <input
                      type="file"
                      id="fileupload1"
                      onChange={onFileChangeFD}
                      required
                      disabled={style === "notEditable" ? true : false}
                    />
                  </div>
                )}
              </div>
              <div className="col-sm-2 col-xs-12"></div>
            </div>
            <div className="row p-5" style={{ backgroundColor: "#fff" }}>
              <div className="col-sm-6 col-xs-12 my-auto">
                Financial Data 2
                {EditfinancialDetail ? (
                  <div>
                    {editfileFD2 ? (
                      <div>
                        <span>File name:{" "}{editfileFD2}</span>
                      </div>
                    ) : (
                      <div>
                        <FileUploader
                          className="financial_fileupload"
                          handleChange={onFileChangeFD2}
                          required
                          type="file"
                          name="fileFD2"
                          fileOrFiles={fileFD2}
                          disabled={style === "notEditable" ? true : false}
                        />
                       <span>
                          {fileFD2
                              ? <>File name:{" "} ${fileFD2.name}</>
                            : "No File Chosen"}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      className="financial_fileupload"
                      handleChange={onFileChangeFD2}
                      required
                      type="file"
                      name="fileFD2"
                      fileOrFiles={fileFD2}
                      disabled={style === "notEditable" ? true : false}
                    />
                     <span>
                      {fileFD2
                          ? <>File name:{" "} ${fileFD2.name}</>
                        : "No File Chosen"}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-sm-4 col-xs-12 my-auto">
                {fileFD2 !== "" && fileFD2 !== null && fileFD2 !== undefined ? (
                  <button
                    type="button"
                    onClick={deleteFile2}
                    className="btn  m-2 uploadFile"
                    style={{ fontSize: "12px" }}
                  >
                    Delete files
                  </button>
                ) : (
                  <div className="finance-input">
                    <label htmlFor="fileupload2">upload files</label>
                    <input
                      type="file"
                      id="fileupload2"
                      onChange={onFileChangeFD2}
                      required
                      disabled={style === "notEditable" ? true : false}
                    />
                  </div>
                )}{" "}
              </div>
              <div className="col-sm-2 col-xs-12"></div>
            </div>
            <div className="float-end">
              <button
                type="button"
                onClick={cancel}
                className="btn financialbtn btn-md m-3"
              >
                Cancel
              </button>
              {params.userId &&
                JSON.parse(window.sessionStorage.getItem("jwt")).result.role ===
                "Admin" ? (
                <>
                  <button
                    type="button"
                    onClick={updateFinancialDetail}
                    className="btn financialbtn btn-md m-3"
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      saveFinancialDetail();
                    }}
                    className="btn financialbtn btn-md m-3"
                  >
                    Save
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={next}
                className="btn financialbtn btn-md m-3"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default FinancialDetails;
