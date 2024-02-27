import React, { useState, useEffect } from "react";
import "../css/Compliance.css";
import Navbar1 from "../common/navbar.js";
import { FileUploader } from "react-drag-drop-files";
import "../css/Dragfileuploader.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import handleApiError from '../utils/Errorhandler';
const ComplianceDetails = () => {
  const [redirectUrl, setredirectUrl] = useState();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [EditCompliance, setEditCompliance] = useState(true);
  console.log("EditCompliance", EditCompliance);
  const [showEditUploadsField, setshowEditUploadsField] = useState(true);
  const [fileRPD, setfileRPD] = useState();
  console.log("fileRPD", fileRPD);
  const [editVlauefileRPD, seteditVlauefileRPD] = useState();
  const [editVlauefileCOC, seteditVlauefileCOC] = useState();
  const [editVlauefileNDA, seteditVlauefileNDA] = useState();
  const [editfileRPD, seteditfileRPD] = useState();
  const [urlRPD, seturlRPD] = useState();
  const [urlCoc, seturlCoc] = useState();
  const [urlNDA, seturlNDA] = useState();
  const [fileCOC, setfileCOC] = useState();
  const [fileNDA, setfileNDA] = useState();
  const [financialYearEnd, setfinancialYearEnd] = useState();
  const [deleteUploadedFile, setdeleteUploadedFile] = useState(false);
  const [deleteCocFile, setdeleteCocFile] = useState(false);
  const [deleteNdaFile, setdeleteNdaFile] = useState(false);
  const [isNewValueEntered, setIsNewValueEntered] = useState(false);

  const [style, setStyle] = useState("editable");
  const [pdfValues, setpdfValues] = useState({
    companyName: JSON.parse(window.sessionStorage.getItem("jwt")).result
      .companyName,
    userName: JSON.parse(window.sessionStorage.getItem("jwt")).result.userName,
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
  });
  const [values, setValues] = useState({
    userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    NDA_Doc: "",
    COC_Doc: "",
    RPD_Doc: "",
  });
  function onFileChangeRPD(e) {
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
        setfileRPD(null);
        setdeleteUploadedFile(false);
      } else if (file) {
        Swal.fire("File Selected!", "", "success");
        setfileRPD(file);
        setdeleteUploadedFile(true);
      }
    } else {
      if (e.size > 5000000) {
        setfileRPD(null);
        setdeleteUploadedFile(null);
        e = null;
        document.getElementsByName("fileRPD")[0].value = null;
        Swal.fire({
          title: "File size should be less than 5mb",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        setfileRPD(null);
        setdeleteUploadedFile(false);
      } else {
        Swal.fire("File Selected!", "", "success");
        setfileRPD(e);
        setdeleteUploadedFile(true);
      }
    }
  }

  function onFileChangeCOC(e) {
    setIsNewValueEntered(true);
    if (e.target) {
      const file = e.target.files[0];
      e.target.value = "";
      if (file && file.size > 5000000) {
        Swal.fire({
          title: "file size should be less than 5mb",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else if (file) {
        Swal.fire("File Selected!", "", "success");
        setfileCOC(file);
        setdeleteCocFile(true);
      }
    } else {
      if (e.size > 5000000) {
        setfileCOC(null);
        setdeleteCocFile(null);
        e = null;
        document.getElementsByName("fileCOC")[0].value = null;
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
        setfileCOC(e);
        setdeleteCocFile(true);
      }
    }
  }

  function onFileChangeNDA(e) {
    setIsNewValueEntered(true);
    if (e.target) {
      const file = e.target.files[0];
      e.target.value = "";
      if (file && file.size > 5000000) {
        Swal.fire({
          title: "file size should be less than 5mb",
          icon: "error",
          confirmButtonText: "ok",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else if (file) {
        Swal.fire("File Selected!", "", "success");
        setfileNDA(file);
        setdeleteNdaFile(true);
      }
    } else {
      if (e.size > 5000000) {
        setfileNDA(null);
        setdeleteNdaFile(null);
        e = null;
        document.getElementsByName("fileNDA")[0].value = null;
        Swal.fire({
          title: "file size should be less than 5mb",
          icon: "error",
          confirmButtonText: "ok",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire("File Selected!", "", "success");
        setfileNDA(e);
        setdeleteNdaFile(true);
      }
    }
  }

  function deleteRpd(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete?",
      icon: "success",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setfileRPD("");
        seteditVlauefileRPD("");
        setdeleteUploadedFile(false);
      }
    });
  }
  function deleteCOC(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete?",
      icon: "success",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setfileCOC("");
        seteditVlauefileCOC("");
        setdeleteCocFile(false);
      }
    });
  }
  function deleteNDA(e) {
    setIsNewValueEntered(true);
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to delete?",
      icon: "success",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setfileNDA("");
        seteditVlauefileNDA("");
        setdeleteNdaFile(false);
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
        setIsNewValueEntered(true);
        setfileNDA("");
        seteditVlauefileNDA("");
        setdeleteNdaFile(false);
        setfileCOC("");
        seteditVlauefileCOC("");
        setdeleteCocFile(false);
        setfileRPD("");
        seteditVlauefileRPD("");
        setdeleteUploadedFile(false);
      }
    });
  }
  const downloadPdf = (e) => {
    const user = {
      companyName: pdfValues.companyName || undefined,
      userName: pdfValues.userName || undefined,
    };
    e.preventDefault();
    apiService.downloadPdf(user).then((response) => {}).catch((error) => {
      handleApiError(error);
    });
  };
  const redirectToBankdetail = () => {
    if (redirectUrl===undefined||redirectUrl?.Bankdetail?.length <= 0 || "" || undefined) {
      navigate("/bank");
    } else {
      navigate(`/bank/${redirectUrl?.Bankdetail[0]?.userId}`);
    }
  };
  function next(e) {
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
          saveComplianceDetail().then((response) => {
            if (response === "success") {
              redirectToBankdetail();
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          if (redirectUrl===undefined||redirectUrl?.Bankdetail?.length <= 0 || "" || undefined) {
            navigate("/bank");
          } else {
            navigate(`/bank/${redirectUrl.Bankdetail[0].userId}`);
          }
        }
      });
    } else {
      if (redirectUrl===undefined||redirectUrl?.Bankdetail?.length <= 0 || "" || undefined) {
        navigate("/bank");
      } else {
        navigate(`/bank/${redirectUrl.Bankdetail[0].userId}`);
      }
    }
  }
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
        if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          finalstatus !== "Approved" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
        ) {
          setStyle("notEditable");
        } else if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          finalstatus === "Approved" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
        ) {
          setStyle("notEditable");
        } else {
          setStyle("editable");
        }
        Object.entries(res.data.ComplianceDetail).map(([key, value]) => {
          var initialUrlRPD_Doc = res.data.ComplianceDetail[0].RPD_Doc;
          var RPD_Doc = initialUrlRPD_Doc.replace("uploads/", "");
          var initialUrlCOC_Doc = res.data.ComplianceDetail[0].COC_Doc;
          var COC_Doc = initialUrlCOC_Doc.replace("uploads/", "");
          var initialUrlNDA_Doc = res.data.ComplianceDetail[0].NDA_Doc;
          var NDA_Doc = initialUrlNDA_Doc.replace("uploads/", "");
          setfileRPD(initialUrlRPD_Doc);
          seteditVlauefileRPD(RPD_Doc);
          setfileCOC(initialUrlCOC_Doc);
          seteditVlauefileCOC(COC_Doc);
          setfileNDA(initialUrlNDA_Doc);
          seteditVlauefileNDA(NDA_Doc);
          setEditCompliance(true);
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
        if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
        ) {
          setStyle("notEditable");
        }
        if (res.data.ComplianceDetail?.length > 0) {
          Object.entries(res.data.ComplianceDetail).map(([key, value]) => {
            var initialUrlRPD_Doc = res.data.ComplianceDetail[0].RPD_Doc;
            var RPD_Doc = initialUrlRPD_Doc.replace("uploads/", "");
            var initialUrlCOC_Doc = res.data.ComplianceDetail[0].COC_Doc;
            var COC_Doc = initialUrlCOC_Doc.replace("uploads/", "");
            var initialUrlNDA_Doc = res.data.ComplianceDetail[0].NDA_Doc;
            var NDA_Doc = initialUrlNDA_Doc.replace("uploads/", "");
            setfileRPD(initialUrlRPD_Doc);
            seteditVlauefileRPD(RPD_Doc);
            setfileCOC(initialUrlCOC_Doc);
            seteditVlauefileCOC(COC_Doc);
            setfileNDA(initialUrlNDA_Doc);
            seteditVlauefileNDA(NDA_Doc);
            setEditCompliance(true);
          });
        }
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
      setEditCompliance(false);
    }
    const user = {
      companyName: pdfValues.companyName || undefined,
      userName: pdfValues.userName || undefined,
      userId: pdfValues.userId || undefined,
    };
    setshowEditUploadsField(true);
    apiService.createRelatedDisclosurePdf(user).then((res) => {}).catch((error) => {
      handleApiError(error);
    });
    apiService.createCocPdf(user).then((res) => {}).catch((error) => {
      handleApiError(error);
    });
    apiService.createNDAPdf(user).then((res) => {}).catch((error) => {
      handleApiError(error);
    });
    apiService.getFinancialDate().then((res) => {
      setfinancialYearEnd(res.data.endDate);
    }).catch((error) => {
      handleApiError(error);
    });
    seturlRPD(
      `${process.env.REACT_APP_API_URL}/downloadPdf/${pdfValues.companyName}Rpd.pdf`
    );
    seturlCoc(
      `${process.env.REACT_APP_API_URL}/downloadPdf/${pdfValues.companyName}COC.pdf`
    );
    seturlNDA(
      `${process.env.REACT_APP_API_URL}/downloadPdf/${pdfValues.companyName}NDA.pdf`
    );
  }, []);
  const saveComplianceDetail = (e) => {
    return new Promise((resolve) => {
      // e.preventDefault();
      setIsNewValueEntered(false);
      const data = new FormData();
      data.append("RPD_Doc", fileRPD);
      data.append("NDA_Doc", fileNDA);
      data.append("COC_Doc", fileCOC);
      data.append(
        "userId",
        JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
      );
      if (params.userId) {
        apiService.updateComplianceDetail(params.userId, data).then((res) => {
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
          const compdata = new FormData();
          compdata.append("RPD_Doc", fileRPD);
          compdata.append("NDA_Doc", fileNDA);
          compdata.append("COC_Doc", fileCOC);
          compdata.append("userId", newuser);
          apiService.saveComplianceDetail(compdata).then((res) => {
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
          apiService.saveComplianceDetail(data).then((res) => {
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
  };

  const updateComplianceDetail = (e) => {
    setIsNewValueEntered(false);
    return new Promise((resolve) => {
      e.preventDefault();
      const data = new FormData();
      data.append("RPD_Doc", fileRPD);
      data.append("NDA_Doc", fileNDA);
      data.append("COC_Doc", fileCOC);
      data.append("userId", params.userId);
      if (params.userId) {
        apiService.updateComplianceDetail(params.userId, data).then((res) => {
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
            });
          }
        }).catch((error) => {
          handleApiError(error);
        });
      }
    });
  };
  return (
    <div className="Compliance-details">
      <Navbar1 />
      <div
        className="container-fluid  py-5"
        style={{ backgroundColor: "#f3f4f7" }}
      >
        <Container fluid="md" className={style}>
          <Row>
            <Col>
              <div className="container">
                <h2 className="Compliance_title">Compliance Details</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Form>
                    <Row>
                      <Form.Label>Related Party Disclosure*</Form.Label>
                      <Col>
                        <a href={urlRPD} download>
                          <Button className="ViewBtn">Download</Button>
                        </a>
                      </Col>
                      <Col sm={6}>
                        {EditCompliance ? (
                          <div>
                            {editVlauefileRPD ? (
                              <div>
                                <span>File name: {editVlauefileRPD}</span>
                              </div>
                            ) : (
                              <div>
                                <FileUploader
                                  handleChange={onFileChangeRPD}
                                  required
                                  type="file"
                                  name="fileRPD"
                                  fileOrFiles={fileRPD}
                                  disabled={
                                    style === "notEditable" ? true : false
                                  }
                                />
                                <span>
                                  {fileRPD ? (
                                    <>File name: ${fileRPD.name}</>
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
                              handleChange={onFileChangeRPD}
                              required
                              type="file"
                              name="fileRPD"
                              fileOrFiles={fileRPD}
                              disabled={style === "notEditable" ? true : false}
                            />
                            <span>
                              {fileRPD ? (
                                <>File name: ${fileRPD.name}</>
                              ) : (
                                "No File Chosen"
                              )}
                            </span>
                          </div>
                        )}
                      </Col>
                      <Col>
                        {fileRPD ? (
                          <Button className="UploadBtn" onClick={deleteRpd}>
                            Delete files
                          </Button>
                        ) : (
                          // <Button className="UploadBtn">Upload files</Button>
                          <div className="comp-input">
                            <label htmlFor="fileupload1">upload files</label>
                            <input
                              type="file"
                              id="fileupload1"
                              // value={values.GST_Doc}
                              onChange={onFileChangeRPD}
                              required
                              disabled={style === "notEditable" ? true : false}
                            />
                          </div>
                        )}{" "}
                      </Col>

                      <Col>
                        {fileRPD ? (
                          <div>
                            <p className="ValidityofDeclaration">
                              Validity of Declaration
                            </p>
                            <p className="financialYearEnd">
                              {financialYearEnd}
                            </p>
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Form.Label>
                        COC for services support/installation*
                      </Form.Label>
                      <Col>
                        <a href={urlCoc} download="Related_Party_Declaration">
                          <Button className="ViewBtn">Download</Button>
                        </a>
                      </Col>
                      <Col sm={6}>
                        {editVlauefileCOC ? (
                          <span>File name: {editVlauefileCOC}</span>
                        ) : (
                          <div>
                            <FileUploader
                              handleChange={onFileChangeCOC}
                              required
                              type="file"
                              name="fileCOC"
                              fileOrFiles={fileCOC}
                              disabled={style === "notEditable" ? true : false}
                            />
                            <span>
                              {fileCOC ? (
                                <>File name: ${fileCOC.name}</>
                              ) : (
                                "No File Chosen"
                              )}
                            </span>
                          </div>
                        )}
                      </Col>
                      <Col>
                        {fileCOC ? (
                          <Button onClick={deleteCOC} className="UploadBtn">
                            Delete files
                          </Button>
                        ) : (
                          // <Button className="UploadBtn">Upload files</Button>
                          <div className="comp-input">
                            <label htmlFor="fileupload2">upload files</label>
                            <input
                              type="file"
                              id="fileupload2"
                              // value={values.GST_Doc}
                              onChange={onFileChangeCOC}
                              required
                              disabled={style === "notEditable" ? true : false}
                            />
                          </div>
                        )}
                      </Col>

                      <Col>
                        {fileCOC ? (
                          <div>
                            <p className="ValidityofDeclaration">
                              Validity of Declaration
                            </p>
                            <p className="financialYearEnd">
                              {financialYearEnd}
                            </p>
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Form.Label>Non-Disclosure agreement*</Form.Label>
                      <Col>
                        <a href={urlNDA} download="Related_Party_Declaration">
                          <Button className="ViewBtn">Download</Button>
                        </a>
                      </Col>
                      <Col sm={6}>
                        {editVlauefileNDA ? (
                          <span>File name: {editVlauefileNDA}</span>
                        ) : (
                          <div>
                            <FileUploader
                              handleChange={onFileChangeNDA}
                              required
                              type="file"
                              name="fileNDA"
                              fileOrFiles={fileNDA}
                              disabled={style === "notEditable" ? true : false}
                            />
                            <span>
                              {fileNDA ? (
                                <>File name: ${fileNDA.name}</>
                              ) : (
                                "No File Chosen"
                              )}
                            </span>
                          </div>
                        )}
                      </Col>
                      <Col>
                        {fileNDA ? (
                          <Button onClick={deleteNDA} className="UploadBtn">
                            Delete files
                          </Button>
                        ) : (
                          // <Button className="UploadBtn">Upload files</Button>
                          <div className="comp-input">
                            <label htmlFor="fileupload3">upload files</label>
                            <input
                              type="file"
                              id="fileupload3"
                              // value={values.GST_Doc}
                              onChange={onFileChangeNDA}
                              required
                              disabled={style === "notEditable" ? true : false}
                            />
                          </div>
                        )}
                      </Col>

                      <Col>
                        {fileNDA ? (
                          <div>
                            <p className="ValidityofDeclaration">
                              Validity of Declaration
                            </p>
                            <p className="financialYearEnd">
                              {financialYearEnd}
                            </p>
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="ComplianceNote">
                Note: Download the documents and fill necessary details and
                upload the filled document
              </p>
            </Col>
          </Row>
          <Row className="sbtn">
            <div className={style}>
              <div className="float-end mt-2">
                <button
                  type="button"
                  onClick={cancel}
                  className="btn bankbtn btn-md m-1"
                >
                  Cancel
                </button>
                {params.userId &&
                JSON.parse(window.sessionStorage.getItem("jwt")).result.role ===
                  "Admin" ? (
                  <>
                    <button
                      type="button"
                      onClick={updateComplianceDetail}
                      className="btn bankbtn btn-md m-1"
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        saveComplianceDetail();
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
                  className="btn bankbtn btn-md m-1"
                >
                  Next
                </button>
              </div>
            </div>
          </Row>
        </Container>
      </div>
      <div></div>
    </div>
  );
};

export default ComplianceDetails;
