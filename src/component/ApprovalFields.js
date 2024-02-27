import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "../css/ApprovalFields.css";
import apiService from "../services/api.service";
import handleApiError from '../utils/Errorhandler';
import Swal from "sweetalert2";
function ApprovalFields(props) {
  const GSTValidation = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
  const PANValidation = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  const numberValidation = /^-?(0|[1-9]\d*)?$/;
  const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const groupEmailValidation = /^VND-APPV-[1-3]@hitachi-systems\.com$/;
  const desiredDomain = "hitachi-systems.com";
  const [editData, seteditData] = useState([]);
  const [editCommmData, seteditCommmData] = useState([]);
  const [editStatData, seteditStatData] = useState([]);
  const [editFinanceData, seteditFinanceData] = useState([]);
  const [editContactData, seteditContactData] = useState([]);
  const [editUploadFile, seteditUploadFile] = useState(false);
  const [editGstUploadFile, seteditGstUploadFile] = useState(false);
  const [editform10fUploadFile, seteditform10fUploadFile] = useState(false);
  const [editTRCUploadFile, seteditTRCUploadFile] = useState(false);
  const [editNPDUploadFile, seteditNPDUploadFile] = useState(false);
  const [editUnRegGstUploadFile, seteditUnRegGstUploadFile] = useState(false);
  const [editMSMEUploadFile, seteditMSMEUploadFile] = useState(false);
  const [editPanUploadFile, seteditPanUploadFile] = useState(false);
  const [editTanUploadFile, seteditTanUploadFile] = useState(false);
  const [editRPDUploadFile, seteditRPDUploadFile] = useState(false);
  const [editCOCUploadFile, seteditCOCUploadFile] = useState(false);
  const [editNDAUploadFile, seteditNDAUploadFile] = useState(false);
  const [editBankUploadFile, seteditBankUploadFile] = useState(false);
  const [editfindataUploadFile, seteditfindataUploadFile] = useState(false);
  const [editfindata2UploadFile, seteditfindata2UploadFile] = useState(false);
  const [editedFields, setEditedFields] = useState([]);

  const reload = () => {
    console.log("reloading------------------>>>>>");
    apiService.getAllCollection(props.userid).then((res) => {
      console.log(
        "res.data.basicInfo[0].Vendor_Account_Manager",
        res.data.basicInfo[0].Vendor_Account_Manager
      );
      if (res.data.basicInfo[0] !== "null" && res.data.basicInfo?.length > 0) {
        var abc = res.data.basicInfo;
        const countryCode = res.data.basicInfo[0]?.Country_Region_Code;
        if (countryCode === "GH") {
          setCountry("ACCRA");
        } else if (countryCode === "CF") {
          setCountry("AFRICA");
        } else if (countryCode === "AU") {
          setCountry("AUS");
        } else if (countryCode === "BD") {
          setCountry("BANGLADESH");
        } else if (countryCode === "CA") {
          setCountry("CANADA");
        } else if (countryCode === "CN") {
          setCountry("CHINA");
        } else if (countryCode === "AE") {
          setCountry("DUBAI");
        } else if (countryCode === "EG") {
          setCountry("EGY");
        } else if (countryCode === "GB") {
          setCountry("UK");
        } else if (countryCode === "FI") {
          setCountry("FINLAND");
        } else if (countryCode === "FR") {
          setCountry("FRANCE");
        } else if (countryCode === "DE") {
          setCountry("GER");
        } else if (countryCode === "HK") {
          setCountry("HONG KONG");
        } else if (countryCode === "IN") {
          setCountry("IND");
        } else if (countryCode === "IE") {
          setCountry("IER");
        } else if (countryCode === "IT") {
          setCountry("ITL");
        } else if (countryCode === "HM") {
          setCountry("JAM");
        } else if (countryCode === "JP") {
          setCountry("JAPAN");
        } else if (countryCode === "KP") {
          setCountry("KOREA");
        } else if (countryCode === "LU") {
          setCountry("LUX");
        } else if (countryCode === "MY") {
          setCountry("MALAYSIA");
        } else if (countryCode === "NL") {
          setCountry("NETHERLAND");
        } else if (countryCode === "NP") {
          setCountry("NPL");
        } else if (countryCode === "NZ") {
          setCountry("NZD");
        } else if (countryCode === "OM") {
          setCountry("OMAN");
        } else if (countryCode === "PH") {
          setCountry("PHIL");
        } else if (countryCode === "ZA") {
          setCountry("SAF");
        } else if (countryCode === "SG") {
          setCountry("SG");
        } else if (countryCode === "LK") {
          setCountry("SRL");
        } else if (countryCode === "CH") {
          setCountry("SWITZ");
        } else if (countryCode === "TW") {
          setCountry("TAIWAN");
        } else if (countryCode === "US") {
          setCountry("USA");
        } else {
          setCountry("");
        }
        seteditData([]);
        seteditData((prevState) => [...prevState, ...abc]);
        setaddress1(res.data.basicInfo[0].Address);
        setaddress2(res.data.basicInfo[0].Address_2);
        setcompanyName(res.data.basicInfo[0].companyName);
        setstateCode(res.data.basicInfo[0].stateCode);
        setcontactPerson(res.data.basicInfo[0].contactPerson);
        setphoneNumber(res.data.basicInfo[0].phoneNumber);
        setcountry(res.data.basicInfo[0].Country_Region_Code);
        setstate(res.data.basicInfo[0].state);
        setcity(res.data.basicInfo[0].City);
        setpinCode(res.data.basicInfo[0].Post_Code);
        setlogo(res.data.basicInfo[0].image);
        setuserStatus(res.data.basicInfo[0].userStatus);
        setVendor_Account_Manager(res.data.basicInfo[0].Vendor_Account_Manager);
        setVendor_Type(res.data.basicInfo[0].Vendor_Type);
      } else {
        setaddress1("");
        setstateCode("");
        setaddress2("");
        setcompanyName("");
        setcountry("");
        setstate("");
        setcity("");
        setpinCode("");
        setCountry("");
        userStatus("");
        setVendor_Account_Manager("");
        setVendor_Type("");
        setcontactPerson("");
        setphoneNumber("");
      }

      if (
        res.data.CommunicationDetails[0] !== "null" &&
        res.data.CommunicationDetails.length > 0
      ) {
        var communicate = res.data.CommunicationDetails;
        seteditCommmData([]);
        seteditCommmData((prevState) => [...prevState, ...communicate]);
        setfs_ContactName(
          res.data.CommunicationDetails[0].financeSpoccontactName
        );
        setfs_Designation(
          res.data.CommunicationDetails[0].financeSpocdesignation
        );
        setfs_PhoneNo(res.data.CommunicationDetails[0].financeSpocphoneNo);
        setfs_Email(res.data.CommunicationDetails[0].financeSpocemail);
        setops_ContactName(
          res.data.CommunicationDetails[0].operationSpoccontactName
        );
        setops_Designation(
          res.data.CommunicationDetails[0].operationSpocdesignation
        );
        setops_PhoneNo(res.data.CommunicationDetails[0].operationSpocphoneNo);
        setops_Email(res.data.CommunicationDetails[0].operationSpocemail);
        setcolls_ContactName(
          res.data.CommunicationDetails[0].collectionSpoccontactName
        );
        setcolls_Designation(
          res.data.CommunicationDetails[0].collectionSpocdesignation
        );
        setcolls_PhoneNo(
          res.data.CommunicationDetails[0].collectionSpocphoneNo
        );
        setcolls_Email(res.data.CommunicationDetails[0].collectionSpocemail);
        setmngs_ContactName(
          res.data.CommunicationDetails[0].managementSpoccontactName
        );
        setmngs_Designation(
          res.data.CommunicationDetails[0].managementSpocdesignation
        );
        setmngs_PhoneNo(res.data.CommunicationDetails[0].managementSpocphoneNo);
        setmngs_Email(res.data.CommunicationDetails[0].managementSpocemail);
        setothers_ContactName(res.data.CommunicationDetails[0].contactName);
        setothers_Designation(res.data.CommunicationDetails[0].designation);
        setothers_PhoneNo(res.data.CommunicationDetails[0].phoneNo);
        setothers_Email(res.data.CommunicationDetails[0].email);
        setmastervendor_email(
          res.data.CommunicationDetails[0].mastervendor_email
        );
      } else {
        setfs_ContactName("");
        setfs_Designation("");
        setfs_PhoneNo("");
        setfs_Email("");
        setops_ContactName("");
        setops_Designation("");
        setops_PhoneNo("");
        setops_Email("");
        setcolls_ContactName("");
        setcolls_Designation("");
        setcolls_PhoneNo("");
        setcolls_Email("");
        setmngs_ContactName("");
        setmngs_Designation("");
        setmngs_PhoneNo("");
        setmngs_Email("");
        setothers_ContactName("");
        setothers_Designation("");
        setothers_PhoneNo("");
        setothers_Email("");
        setmastervendor_email("");
      }

      if (res.data.Statutory[0] !== "null" && res.data.Statutory.length > 0) {
        var statarr = res.data.Statutory;
        console.log("res.data.Statutory", res.data.Statutory[0]);
        seteditStatData([]);
        seteditStatData((prevState) => [...prevState, ...statarr]);
        setGST_type(res.data.Statutory[0].GST_Vendor_Type);
        setGST_No(res.data.Statutory[0].GST_Registration_No);
        setGST_Doc(res.data.Statutory[0].GST_Doc);
        setfileDisclosure(res.data.Statutory[0].fileDisclosure);
        setPAN_No(
          res.data.basicInfo[0].Country_Region_Code === "IN"
            ? res.data.Statutory[0].P_A_N_No
            : "N/A"
        );
        setPAN_Doc(
          res.data.basicInfo[0].Country_Region_Code === "IN"
            ? res.data.Statutory[0].PAN_Doc
            : ""
        );
        setCIN_No(res.data.Statutory[0].CIN_No);
        setform_10f(res.data.Statutory[0].form_10f_Doc);
        setpe_declaration(res.data.Statutory[0].PE_Declaration_Doc);
        setMSME_status(res.data.Statutory[0].MSMED);
        setMSME_No(res.data.Statutory[0].MSMED_Number);
        setMSME_Doc(res.data.Statutory[0].MSME_Doc);
        setMSME_Type(res.data.Statutory[0].MSMED_Vendor_Type);
        setTAN_No(res.data.Statutory[0].TAN_No);
        setTAN_Doc(res.data.Statutory[0].TAN_Doc);
        setTax_residency(res.data.Statutory[0].Tax_residency_Doc);
        setTax_residency(res.data.Statutory[0].Tax_residency_Doc);
      } else {
        setGST_type("");
        setGST_No("");
        setGST_Doc("");
        setPAN_No("");
        setPAN_Doc("");
        setCIN_No("");
        setform_10f("");
        setpe_declaration("");
        setMSME_status("");
        setMSME_No("");
        setMSME_Doc("");
        setMSME_Type("");
        setTAN_No("");
        setTAN_Doc("");
        setTax_residency("");
      }

      if (
        res.data.ComplianceDetail[0] !== "null" &&
        res.data.ComplianceDetail.length > 0
      ) {
        setRPD_Doc(res.data.ComplianceDetail[0].RPD_Doc);
        setCOC_Doc(res.data.ComplianceDetail[0].COC_Doc);
        setNDA_Doc(res.data.ComplianceDetail[0].NDA_Doc);
      } else {
        setRPD_Doc("");
        setCOC_Doc("");
        setNDA_Doc("");
      }

      if (
        res.data.FinancialDetail[0] !== "null" &&
        res.data.FinancialDetail.length > 0
      ) {
        console.log("responsefromfinance");
        var fD = res.data.FinancialDetail;
        seteditFinanceData([]);
        seteditFinanceData((prevState) => [...prevState, ...fD]);
        setyearOfAuditedFinancial(
          res.data.FinancialDetail[0].yearOfAuditedFinancial
        );
        setRevenue(res.data.FinancialDetail[0].Revenue);
        setProfit(res.data.FinancialDetail[0].Profit);
        setnetWorth(res.data.FinancialDetail[0].netWorth);
        setcurrentAssets(res.data.FinancialDetail[0].currentAssets);
        setdirectorDetails(res.data.FinancialDetail[0].directorDetails);
        setorganisationType(res.data.FinancialDetail[0].organisationType);
        setshareholderName(res.data.FinancialDetail[0].shareholderName);
        setfinancial_data(res.data.FinancialDetail[0].financial_data);
        setfinancial_data2(res.data.FinancialDetail[0].financial_data2);
      } else {
        setyearOfAuditedFinancial("");
        setRevenue("");
        setProfit("");
        setnetWorth("");
        setcurrentAssets("");
        setdirectorDetails("");
        setorganisationType("");
        setshareholderName("");
        setfinancial_data("");
        setfinancial_data2("");
      }

      if (res.data.Bankdetail[0] !== "null" && res.data.Bankdetail.length > 0) {
        setbankAccountName(res.data.Bankdetail[0].Account_Holder_Name);
        setbankName(res.data.Bankdetail[0].Bank_Name);
        setbankAccountNumber(res.data.Bankdetail[0].Account_No);
        setifscCode(res.data.Bankdetail[0].IFSC_Code);
        setMICRcode(res.data.Bankdetail[0].MICRcode);
        setbranchAddress(res.data.Bankdetail[0].Bank_Address);
        setbankdetailDoc(res.data.Bankdetail[0].bankdetailDoc);
      } else {
        setbankAccountName("");
        setbankName("");
        setbankAccountNumber("");
        setifscCode("");
        setMICRcode("");
        setbranchAddress("");
        setbankdetailDoc("");
      }

      if (
        res.data.contactDetail[0] !== "null" &&
        res.data.contactDetail.length > 0
      ) {
        var contactarr = res.data.contactDetail;
        seteditContactData([]);
        seteditContactData((prevState) => [...prevState, ...contactarr]);
        setname(res.data.contactDetail[0].contactName1);
        setcontactNumber(res.data.contactDetail[0].contactNumber1);
        setemail(res.data.contactDetail[0].emailId1);
        setname2(res.data.contactDetail[0].contactName2);
        setcontactNumber2(res.data.contactDetail[0].contactNumber2);
        setemail2(res.data.contactDetail[0].emailId2);
        setname3(res.data.contactDetail[0].contactName3);
        setcontactNumber3(res.data.contactDetail[0].contactNumber3);
        setemail3(res.data.contactDetail[0].emailId3);
        setTicketID(res.data.contactDetail[0].Ticket_ID);
      } else {
        setname("");
        setcontactNumber("");
        setemail("");
        setname2("");
        setcontactNumber2("");
        setemail2("");
        setname3("");
        setcontactNumber3("");
        setemail3("");
        setTicketID("");
      }
    }).catch((error) => {
      handleApiError(error);
    });
  };
  const handleKeyDown = (event) => {
    if (event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    apiService.getEditLogOfAllcollection(props.userid).then((res) => {
      console.log("EditLog::",res.data.Result);
      if (res.data.Result && res.data.Result.EditedFields) {
        setEditedFields(JSON.parse(res.data.Result.EditedFields));
      }
    })
    apiService.getAllCollection(props.userid).then((res) => {
      console.log("acmanager::", res.data.basicInfo[0].Vendor_Account_Manager);
      if (res.data.basicInfo[0] !== "null" && res.data.basicInfo?.length > 0) {
        var abc = res.data.basicInfo;
        const countryCode = res.data.basicInfo[0]?.Country_Region_Code;
        if (countryCode === "GH") {
          setCountry("ACCRA");
        } else if (countryCode === "CF") {
          setCountry("AFRICA");
        } else if (countryCode === "AU") {
          setCountry("AUS");
        } else if (countryCode === "BD") {
          setCountry("BANGLADESH");
        } else if (countryCode === "CA") {
          setCountry("CANADA");
        } else if (countryCode === "CN") {
          setCountry("CHINA");
        } else if (countryCode === "AE") {
          setCountry("DUBAI");
        } else if (countryCode === "EG") {
          setCountry("EGY");
        } else if (countryCode === "GB") {
          setCountry("UK");
        } else if (countryCode === "FI") {
          setCountry("FINLAND");
        } else if (countryCode === "FR") {
          setCountry("FRANCE");
        } else if (countryCode === "DE") {
          setCountry("GER");
        } else if (countryCode === "HK") {
          setCountry("HONG KONG");
        } else if (countryCode === "IN") {
          setCountry("IND");
        } else if (countryCode === "IE") {
          setCountry("IER");
        } else if (countryCode === "IT") {
          setCountry("ITL");
        } else if (countryCode === "HM") {
          setCountry("JAM");
        } else if (countryCode === "JP") {
          setCountry("JAPAN");
        } else if (countryCode === "KP") {
          setCountry("KOREA");
        } else if (countryCode === "LU") {
          setCountry("LUX");
        } else if (countryCode === "MY") {
          setCountry("MALAYSIA");
        } else if (countryCode === "NL") {
          setCountry("NETHERLAND");
        } else if (countryCode === "NP") {
          setCountry("NPL");
        } else if (countryCode === "NZ") {
          setCountry("NZD");
        } else if (countryCode === "OM") {
          setCountry("OMAN");
        } else if (countryCode === "PH") {
          setCountry("PHIL");
        } else if (countryCode === "ZA") {
          setCountry("SAF");
        } else if (countryCode === "SG") {
          setCountry("SG");
        } else if (countryCode === "LK") {
          setCountry("SRL");
        } else if (countryCode === "CH") {
          setCountry("SWITZ");
        } else if (countryCode === "TW") {
          setCountry("TAIWAN");
        } else if (countryCode === "US") {
          setCountry("USA");
        } else {
          setCountry("");
        }
        seteditData([]);
        seteditData((prevState) => [...prevState, ...abc]);
        setaddress1(res.data.basicInfo[0].Address);
        setaddress2(res.data.basicInfo[0].Address_2);
        setcompanyName(res.data.basicInfo[0].companyName);
        setstateCode(res.data.basicInfo[0].stateCode);
        setcountry(res.data.basicInfo[0].Country_Region_Code);
        setstate(res.data.basicInfo[0].state);
        setcontactPerson(res.data.basicInfo[0].contactPerson);
        setphoneNumber(res.data.basicInfo[0].phoneNumber);
        setcity(res.data.basicInfo[0].City);
        setpinCode(res.data.basicInfo[0].Post_Code);
        setlogo(res.data.basicInfo[0].image);
        setuserStatus(res.data.basicInfo[0].userStatus);
        setVendor_Account_Manager(res.data.basicInfo[0].Vendor_Account_Manager);
        setVendor_Type(res.data.basicInfo[0].Vendor_Type);
      } else {
        setaddress1("");
        setstateCode("");
        setaddress2("");
        setcompanyName("");
        setcountry("");
        setstate("");
        setcity("");
        setpinCode("");
        userStatus("");
        setVendor_Account_Manager("");
        setVendor_Type("");
        setcontactPerson("");
        setphoneNumber("");
      }

      if (
        res.data.CommunicationDetails[0] !== "null" &&
        res.data.CommunicationDetails?.length > 0
      ) {
        var communicate = res.data.CommunicationDetails;
        seteditCommmData([]);
        seteditCommmData((prevState) => [...prevState, ...communicate]);
        setfs_ContactName(
          res.data.CommunicationDetails[0].financeSpoccontactName
        );
        setfs_Designation(
          res.data.CommunicationDetails[0].financeSpocdesignation
        );
        setfs_PhoneNo(res.data.CommunicationDetails[0].financeSpocphoneNo);
        setfs_Email(res.data.CommunicationDetails[0].financeSpocemail);
        setops_ContactName(
          res.data.CommunicationDetails[0].operationSpoccontactName
        );
        setops_Designation(
          res.data.CommunicationDetails[0].operationSpocdesignation
        );
        setops_PhoneNo(res.data.CommunicationDetails[0].operationSpocphoneNo);
        setops_Email(res.data.CommunicationDetails[0].operationSpocemail);
        setcolls_ContactName(
          res.data.CommunicationDetails[0].collectionSpoccontactName
        );
        setcolls_Designation(
          res.data.CommunicationDetails[0].collectionSpocdesignation
        );
        setcolls_PhoneNo(
          res.data.CommunicationDetails[0].collectionSpocphoneNo
        );
        setcolls_Email(res.data.CommunicationDetails[0].collectionSpocemail);
        setmngs_ContactName(
          res.data.CommunicationDetails[0].managementSpoccontactName
        );
        setmngs_Designation(
          res.data.CommunicationDetails[0].managementSpocdesignation
        );
        setmngs_PhoneNo(res.data.CommunicationDetails[0].managementSpocphoneNo);
        setmngs_Email(res.data.CommunicationDetails[0].managementSpocemail);
        setothers_ContactName(res.data.CommunicationDetails[0].contactName);
        setothers_Designation(res.data.CommunicationDetails[0].designation);
        setothers_PhoneNo(res.data.CommunicationDetails[0].phoneNo);
        setothers_Email(res.data.CommunicationDetails[0].email);
        setmastervendor_email(
          res.data.CommunicationDetails[0].mastervendor_email
        );
      } else {
        setfs_ContactName("");
        setfs_Designation("");
        setfs_PhoneNo("");
        setfs_Email("");
        setops_ContactName("");
        setops_Designation("");
        setops_PhoneNo("");
        setops_Email("");
        setcolls_ContactName("");
        setcolls_Designation("");
        setcolls_PhoneNo("");
        setcolls_Email("");
        setmngs_ContactName("");
        setmngs_Designation("");
        setmngs_PhoneNo("");
        setmngs_Email("");
        setothers_ContactName("");
        setothers_Designation("");
        setothers_PhoneNo("");
        setothers_Email("");
        setmastervendor_email("");
      }

      if (res.data.Statutory[0] !== "null" && res.data.Statutory?.length > 0) {
        var statarr = res.data.Statutory;
        console.log("res.data.Statutory", res.data.Statutory[0]);
        seteditStatData([]);
        seteditStatData((prevState) => [...prevState, ...statarr]);
        setGST_type(res.data.Statutory[0].GST_Vendor_Type);
        setGST_No(res.data.Statutory[0].GST_Registration_No);
        setGST_Doc(res.data.Statutory[0].GST_Doc);
        setfileDisclosure(res.data.Statutory[0].fileDisclosure);
        setPAN_No(
          res.data.basicInfo[0].Country_Region_Code === "IN"
            ? res.data.Statutory[0].P_A_N_No
            : "N/A"
        );
        setPAN_Doc(
          res.data.basicInfo[0].Country_Region_Code === "IN"
            ? res.data.Statutory[0].PAN_Doc
            : ""
        );
        setCIN_No(res.data.Statutory[0].CIN_No);
        setform_10f(res.data.Statutory[0].form_10f_Doc);
        setpe_declaration(res.data.Statutory[0].PE_Declaration_Doc);
        setMSME_status(res.data.Statutory[0].MSMED);
        setMSME_No(res.data.Statutory[0].MSMED_Number);
        setMSME_Doc(res.data.Statutory[0].MSME_Doc);
        setMSME_Type(res.data.Statutory[0].MSMED_Vendor_Type);
        setTAN_No(res.data.Statutory[0].TAN_No);
        setTAN_Doc(res.data.Statutory[0].TAN_Doc);
        setTax_residency(res.data.Statutory[0].Tax_residency_Doc);
        setTax_residency(res.data.Statutory[0].Tax_residency_Doc);
      } else {
        setGST_type("");
        setGST_No("");
        setGST_Doc("");
        setPAN_No("");
        setPAN_Doc("");
        setCIN_No("");
        setform_10f("");
        setpe_declaration("");
        setMSME_status("");
        setMSME_No("");
        setMSME_Doc("");
        setMSME_Type("");
        setTAN_No("");
        setTAN_Doc("");
        setTax_residency("");
      }

      if (
        res.data.ComplianceDetail[0] !== "null" &&
        res.data.ComplianceDetail?.length > 0
      ) {
        setRPD_Doc(res.data.ComplianceDetail[0].RPD_Doc);
        setCOC_Doc(res.data.ComplianceDetail[0].COC_Doc);
        setNDA_Doc(res.data.ComplianceDetail[0].NDA_Doc);
      } else {
        setRPD_Doc("");
        setCOC_Doc("");
        setNDA_Doc("");
      }

      if (
        res.data.FinancialDetail[0] !== "null" &&
        res.data.FinancialDetail?.length > 0
      ) {
        var fD = res.data.FinancialDetail;
        seteditFinanceData([]);
        seteditFinanceData((prevState) => [...prevState, ...fD]);
        setyearOfAuditedFinancial(
          res.data.FinancialDetail[0].yearOfAuditedFinancial
        );
        setRevenue(res.data.FinancialDetail[0].Revenue);
        setProfit(res.data.FinancialDetail[0].Profit);
        setnetWorth(res.data.FinancialDetail[0].netWorth);
        setcurrentAssets(res.data.FinancialDetail[0].currentAssets);
        setdirectorDetails(res.data.FinancialDetail[0].directorDetails);
        setorganisationType(res.data.FinancialDetail[0].organisationType);
        setshareholderName(res.data.FinancialDetail[0].shareholderName);
        setfinancial_data(res.data.FinancialDetail[0].financial_data);
        setfinancial_data2(res.data.FinancialDetail[0].financial_data2);
      } else {
        setyearOfAuditedFinancial("");
        setRevenue("");
        setProfit("");
        setnetWorth("");
        setcurrentAssets("");
        setdirectorDetails("");
        setorganisationType("");
        setshareholderName("");
        setfinancial_data("");
        setfinancial_data2("");
      }

      if (
        res.data.Bankdetail[0] !== "null" &&
        res.data.Bankdetail?.length > 0
      ) {
        setbankAccountName(res.data.Bankdetail[0].Account_Holder_Name);
        setbankName(res.data.Bankdetail[0].Bank_Name);
        setbankAccountNumber(res.data.Bankdetail[0].Account_No);
        setifscCode(res.data.Bankdetail[0].IFSC_Code);
        setMICRcode(res.data.Bankdetail[0].MICRcode);
        setbranchAddress(res.data.Bankdetail[0].Bank_Address);
        setbankdetailDoc(res.data.Bankdetail[0].bankdetailDoc);
      } else {
        setbankAccountName("");
        setbankName("");
        setbankAccountNumber("");
        setifscCode("");
        setMICRcode("");
        setbranchAddress("");
        setbankdetailDoc("");
      }

      if (
        res.data.contactDetail[0] !== "null" &&
        res.data.contactDetail?.length > 0
      ) {
        var contactarr = res.data.contactDetail;
        seteditContactData([]);
        seteditContactData((prevState) => [...prevState, ...contactarr]);
        setname(res.data.contactDetail[0].contactName1);
        setcontactNumber(res.data.contactDetail[0].contactNumber1);
        setemail(res.data.contactDetail[0].emailId1);
        setname2(res.data.contactDetail[0].contactName2);
        setcontactNumber2(res.data.contactDetail[0].contactNumber2);
        setemail2(res.data.contactDetail[0].emailId2);
        setname3(res.data.contactDetail[0].contactName3);
        setcontactNumber3(res.data.contactDetail[0].contactNumber3);
        setemail3(res.data.contactDetail[0].emailId3);
        setTicketID(res.data.contactDetail[0].Ticket_ID);
      } else {
        setname("");
        setcontactNumber("");
        setemail("");
        setname2("");
        setcontactNumber2("");
        setemail2("");
        setname3("");
        setcontactNumber3("");
        setemail3("");
        setTicketID("");
      }
    }).catch((error) => {
      handleApiError(error);
    });
  }, [props.userid]);
    // basicInfo
    const isCompanyNameEdited = editedFields?.includes('companyName');
    const isAddressEdited = editedFields?.includes('Address');
    const isAddress_2Edited = editedFields?.includes('Address_2');
    const isCountry_Region_CodeEdited = editedFields?.includes('Country_Region_Code');
    const isstateEdited = editedFields?.includes('state');
    const isCityEdited = editedFields?.includes('City');
    const isPost_CodeEdited = editedFields?.includes('Post_Code');
    //communication
    const isfinanceSpoccontactNameEdited = editedFields?.includes('financeSpoccontactName');
    const isfinanceSpocdesignationEdited = editedFields?.includes('financeSpocdesignation');
    const isfinanceSpocphoneNoEdited = editedFields?.includes('financeSpocphoneNo');
    const isfinanceSpocemailEdited = editedFields?.includes('financeSpocemail');
    const isoperationSpoccontactNameEdited = editedFields?.includes('operationSpoccontactName');
    const isoperationSpocdesignationEdited = editedFields?.includes('operationSpocdesignation');
    const isoperationSpocphoneNoEdited = editedFields?.includes('operationSpocphoneNo');
    const isoperationSpocemailEdited = editedFields?.includes('operationSpocemail');
    const iscollectionSpoccontactNameEdited = editedFields?.includes('collectionSpoccontactName');
    const iscollectionSpocdesignationEdited = editedFields?.includes('collectionSpocdesignation');
    const iscollectionSpocphoneNoEdited = editedFields?.includes('collectionSpocphoneNo');
    const iscollectionSpocemailEdited = editedFields?.includes('collectionSpocemail');
    const ismanagementSpoccontactNameEdited = editedFields?.includes('managementSpoccontactName');
    const ismanagementSpocdesignationEdited = editedFields?.includes('managementSpocdesignation');
    const ismanagementSpocphoneNoEdited = editedFields?.includes('managementSpocphoneNo');
    const ismanagementSpocemailEdited = editedFields?.includes('managementSpocemail');
    const iscontactNameEdited = editedFields?.includes('contactName');
    const isdesignationEdited = editedFields?.includes('designation');
    const isphoneNoEdited = editedFields?.includes('phoneNo');
    const isemailEdited = editedFields?.includes('email');
    const ismastervendor_emailEdited = editedFields?.includes('mastervendor_email');
    //statutory
    const isGST_DocEdited = editedFields?.includes('GST_Doc');
  
  const isfileDisclosureEdited = editedFields?.includes('fileDisclosure');
  
  const isPAN_DocEdited = editedFields?.includes('PAN_Doc');
  
  const isform_10f_DocEdited = editedFields?.includes('form_10f_Doc');
  
  const isTAN_DocEdited = editedFields?.includes('TAN_Doc');
  
  const isPE_Declaration_DocEdited = editedFields?.includes('PE_Declaration_Doc');
  
  const isMSME_DocEdited = editedFields?.includes('MSME_Doc');
  
  const isTax_residency_DocEdited = editedFields?.includes('Tax_residency_Doc');
  
  const isGST_Vendor_TypeEdited = editedFields?.includes('GST_Vendor_Type');
  
  const isGST_Registration_NoEdited = editedFields?.includes('GST_Registration_No');
  
  const isP_A_N_NoEdited = editedFields?.includes('P_A_N_No');
  
  const isCIN_NoEdited = editedFields?.includes('CIN_No');
  
  const isMSMEDEdited = editedFields?.includes('MSMED');
  
  const isMSMED_NumberEdited = editedFields?.includes('MSMED_Number');
  
  const isMSMED_Vendor_TypeEdited = editedFields?.includes('MSMED_Vendor_Type');
  
  const isTAN_NoEdited = editedFields?.includes('TAN_No');
  
    //compliance
    const isRPD_DocEdited = editedFields?.includes('RPD_Doc');
  
  const isCOC_DocEdited = editedFields?.includes('COC_Doc');
  
  const isNDA_DocEdited = editedFields?.includes('NDA_Doc');
    //bank
    const isbankdetailDocEdited = editedFields?.includes('bankdetailDoc');
  const isAccount_Holder_NameEdited = editedFields?.includes('Account_Holder_Name');
  const isBank_NameEdited = editedFields?.includes('Bank_Name');
  const isAccount_NoEdited = editedFields?.includes('Account_No');
  const isIFSC_CodeEdited = editedFields?.includes('IFSC_Code');
  const isMICRcodeEdited = editedFields?.includes('MICRcode');
  const isBank_AddressEdited = editedFields?.includes('Bank_Address');
    //finance 
    const isfinancial_dataEdited = editedFields?.includes('financial_data');
  const isfinancial_data2Edited = editedFields?.includes('financial_data2');
  const isyearOfAuditedFinancialEdited = editedFields?.includes('yearOfAuditedFinancial');
  const isRevenueEdited = editedFields?.includes('Revenue');
  const isProfitEdited = editedFields?.includes('Profit');
  const isnetWorthEdited = editedFields?.includes('netWorth');
  const iscurrentAssetsEdited = editedFields?.includes('currentAssets');
  const isdirectorDetailsEdited = editedFields?.includes('directorDetails');
  const isorganisationTypeEdited = editedFields?.includes('organisationType');
  const isshareholderNameEdited = editedFields?.includes('shareholderName');
    //contact 
  const iscontactName1Edited = editedFields?.includes('contactName1');
  const isemailId1Edited = editedFields?.includes('emailId1');
  const iscontactNumber1Edited = editedFields?.includes('contactNumber1');
  const iscontactName2Edited = editedFields?.includes('contactName2');
  const isemailId2Edited = editedFields?.includes('emailId2');
  const iscontactNumber2Edited = editedFields?.includes('contactNumber2');
  const iscontactName3Edited = editedFields?.includes('contactName3');
  const iscontactNumber3Edited = editedFields?.includes('contactNumber3');
  const isemailId3Edited = editedFields?.includes('emailId3');
    const shouldHighlightInput =
    JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&
    JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' &&
    (isCompanyNameEdited || isAddressEdited || isAddress_2Edited|| isCountry_Region_CodeEdited || isstateEdited || isCityEdited ||isPost_CodeEdited || isfinanceSpoccontactNameEdited || isfinanceSpocdesignationEdited ||isfinanceSpocphoneNoEdited || isfinanceSpocemailEdited || isoperationSpoccontactNameEdited || isoperationSpocdesignationEdited || isoperationSpocphoneNoEdited
      || isoperationSpocemailEdited || iscollectionSpoccontactNameEdited || iscollectionSpocdesignationEdited || iscollectionSpocphoneNoEdited
       || iscollectionSpocemailEdited || ismanagementSpoccontactNameEdited || ismanagementSpocdesignationEdited || ismanagementSpocphoneNoEdited
       || ismanagementSpocemailEdited || iscontactNameEdited || isdesignationEdited || isphoneNoEdited || isemailEdited || ismastervendor_emailEdited
       || isRPD_DocEdited || isCOC_DocEdited || isNDA_DocEdited 
      || isTAN_NoEdited || isMSMED_Vendor_TypeEdited ||isMSMED_NumberEdited || isMSMEDEdited || isCIN_NoEdited || isP_A_N_NoEdited
      || isGST_Registration_NoEdited || isGST_Vendor_TypeEdited || isGST_DocEdited || isfileDisclosureEdited  || isPAN_DocEdited  || isform_10f_DocEdited  || isTAN_DocEdited  || isPE_Declaration_DocEdited  || isMSME_DocEdited  || isTax_residency_DocEdited || isfinancial_dataEdited  || isfinancial_data2Edited   || isyearOfAuditedFinancialEdited   ||
      isRevenueEdited   ||isProfitEdited   || isnetWorthEdited  || iscurrentAssetsEdited  || isdirectorDetailsEdited || isorganisationTypeEdited  || isshareholderNameEdited  ||isbankdetailDocEdited  || isAccount_Holder_NameEdited  || isBank_NameEdited  || isAccount_NoEdited  ||isIFSC_CodeEdited   || isMICRcodeEdited   || isBank_AddressEdited 
       || iscontactName1Edited  || isemailId1Edited  || iscontactNumber1Edited  || iscontactName2Edited  || isemailId2Edited  || iscontactNumber2Edited   || iscontactName3Edited  ||  iscontactNumber3Edited   ||  isemailId3Edited );
  
   
  const [Vendor_Type, setVendor_Type] = useState("");
  const [Vendor_Account_Manager, setVendor_Account_Manager] = useState("");
  const [Address, setaddress1] = useState("");
  const [stateCode, setstateCode] = useState("");
  const [Address_2, setaddress2] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [Country_Region_Code, setcountry] = useState("");
  const [countryRegionCode, setCountry] = useState("");
  const [state, setstate] = useState("");
  const [City, setcity] = useState("");
  const [Post_Code, setpinCode] = useState("");
  const [logo, setlogo] = useState("");
  const [userStatus, setuserStatus] = useState("");

  const [fs_ContactName, setfs_ContactName] = useState("");
  const [fs_Designation, setfs_Designation] = useState("");
  const [fs_PhoneNo, setfs_PhoneNo] = useState("");
  const [fs_Email, setfs_Email] = useState("");
  const [ops_ContactName, setops_ContactName] = useState("");
  const [ops_Designation, setops_Designation] = useState("");
  const [ops_PhoneNo, setops_PhoneNo] = useState("");
  const [ops_Email, setops_Email] = useState("");
  const [colls_ContactName, setcolls_ContactName] = useState("");
  const [colls_Designation, setcolls_Designation] = useState("");
  const [colls_PhoneNo, setcolls_PhoneNo] = useState("");
  const [colls_Email, setcolls_Email] = useState("");
  const [mngs_ContactName, setmngs_ContactName] = useState("");
  const [mngs_Designation, setmngs_Designation] = useState("");
  const [mngs_PhoneNo, setmngs_PhoneNo] = useState("");
  const [mngs_Email, setmngs_Email] = useState("");
  const [others_ContactName, setothers_ContactName] = useState("");
  const [others_Designation, setothers_Designation] = useState("");
  const [others_PhoneNo, setothers_PhoneNo] = useState("");
  const [others_Email, setothers_Email] = useState("");
  const [mastervendor_email, setmastervendor_email] = useState("");

  const [GST_type, setGST_type] = useState("");
  const [GST_No, setGST_No] = useState("");
  const [fileDisclosure, setfileDisclosure] = useState("");
  const [GST_Doc, setGST_Doc] = useState("");
  const [PAN_No, setPAN_No] = useState("");
  const [PAN_Doc, setPAN_Doc] = useState("");
  const [CIN_No, setCIN_No] = useState("");
  const [form_10f, setform_10f] = useState("");
  const [pe_declaration, setpe_declaration] = useState("");
  const [MSME_status, setMSME_status] = useState("");
  const [MSME_No, setMSME_No] = useState("");
  const [MSME_Doc, setMSME_Doc] = useState("");
  const [MSME_Type, setMSME_Type] = useState("");
  const [TAN_No, setTAN_No] = useState("");
  const [TAN_Doc, setTAN_Doc] = useState("");
  const [Tax_residency, setTax_residency] = useState("");

  const [RPD_Doc, setRPD_Doc] = useState("");
  const [COC_Doc, setCOC_Doc] = useState("");
  const [NDA_Doc, setNDA_Doc] = useState("");

  const [yearOfAuditedFinancial, setyearOfAuditedFinancial] = useState("");
  const [Revenue, setRevenue] = useState("");
  const [Profit, setProfit] = useState("");
  const [netWorth, setnetWorth] = useState("");
  const [currentAssets, setcurrentAssets] = useState("");
  const [directorDetails, setdirectorDetails] = useState("");
  const [organisationType, setorganisationType] = useState("");
  const [shareholderName, setshareholderName] = useState("");
  const [financial_data, setfinancial_data] = useState("");
  const [financial_data2, setfinancial_data2] = useState("");

  const [bankAccountName, setbankAccountName] = useState("");
  const [bankName, setbankName] = useState("");
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [MICRcode, setMICRcode] = useState("");
  const [branchAddress, setbranchAddress] = useState("");
  const [bankdetailDoc, setbankdetailDoc] = useState("");
  const [name, setname] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [email, setemail] = useState("");
  const [name2, setname2] = useState("");
  const [contactNumber2, setcontactNumber2] = useState("");
  const [email2, setemail2] = useState("");
  const [name3, setname3] = useState("");
  const [contactNumber3, setcontactNumber3] = useState("");
  const [email3, setemail3] = useState("");
  const [TicketID, setTicketID] = useState("");
  const [contactPerson, setcontactPerson] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [vendorType, setvendorType] = useState("");
  const [acManager, setacManager] = useState("");
  const [mkcheck, setmkcheck] = useState(false);
  const [approverFile, setapproverFile] = useState("");
  const [style, setStyle] = useState("approvalsform");

  // Error states start
  const [address1Err, setaddress1Err] = useState("");
  const [address2Err, setaddress2Err] = useState("");
  // const [address2Err, setaddress2Err] = useState(false);
  const [companyNameErr, setcompanyNameErr] = useState("");
  const [countryErr, setcountryErr] = useState("");
  const [stateErr, setstateErr] = useState("");
  const [cityErr, setcityErr] = useState("");
  const [pinCodeErr, setpinCodeErr] = useState("");
  const [logoErr, setlogoErr] = useState("");

  const [fs_ContactNameErr, setfs_ContactNameErr] = useState("");
  const [fs_DesignationErr, setfs_DesignationErr] = useState("");
  const [fs_PhoneNoErr, setfs_PhoneNoErr] = useState("");
  const [fs_EmailErr, setfs_EmailErr] = useState("");

  const [mngs_ContactNameErr, setmngs_ContactNameErr] = useState("");
  const [mngs_DesignationErr, setmngs_DesignationErr] = useState("");
  const [mngs_PhoneNoErr, setmngs_PhoneNoErr] = useState("");
  const [mngs_EmailErr, setmngs_EmailErr] = useState("");
  const [mastervendor_emailErr, setmastervendor_emailErr] = useState("");

  const [GST_typeErr, setGST_typeErr] = useState("");
  const [GST_NoErr, setGST_NoErr] = useState("");
  const [GST_DocErr, setGST_DocErr] = useState("");
  const [fileDisclosureErr, setfileDisclosureErr] = useState("");
  const [PAN_NoErr, setPAN_NoErr] = useState("");
  const [PAN_DocErr, setPAN_DocErr] = useState("");
  const [CIN_NoErr, setCIN_NoErr] = useState("");
  const [form_10fErr, setform_10fErr] = useState("");
  const [pe_declarationErr, setpe_declarationErr] = useState("");
  const [MSME_statusErr, setMSME_statusErr] = useState("");
  const [MSME_NoErr, setMSME_NoErr] = useState("");
  const [MSME_DocErr, setMSME_DocErr] = useState("");
  const [MSME_TypeErr, setMSME_TypeErr] = useState("");
  const [TAN_NoErr, setTAN_NoErr] = useState("");
  const [TAN_DocErr, setTAN_DocErr] = useState("");
  const [Tax_residencyErr, setTax_residencyErr] = useState("");

  const [RPD_DocErr, setRPD_DocErr] = useState("");
  const [COC_DocErr, setCOC_DocErr] = useState("");
  const [NDA_DocErr, setNDA_DocErr] = useState("");

  const [bankAccountNameErr, setbankAccountNameErr] = useState("");
  const [bankNameErr, setbankNameErr] = useState("");
  const [bankAccountNumberErr, setbankAccountNumberErr] = useState("");
  const [ifscCodeErr, setifscCodeErr] = useState("");
  const [MICRcodeErr, setMICRcodeErr] = useState("");
  const [branchAddressErr, setbranchAddressErr] = useState("");
  const [bankdetailDocErr, setbankdetailDocErr] = useState("");

  const [nameErr, setnameErr] = useState("");
  const [contactNumberErr, setcontactNumberErr] = useState("");
  const [contactNumber2Err, setcontactNumber2Err] = useState("");
  const [contactNumber3Err, setcontactNumber3Err] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [email2Err, setemail2Err] = useState("");
  const [email3Err, setemail3Err] = useState("");
  const [vendorTypeErr, setvendorTypeErr] = useState("");
  const [acManagerErr, setacManagerErr] = useState("");
  const [mkcheckErr, setmkcheckErr] = useState("");
  const [approverFileErr, setapproverFileErr] = useState("");
  // Error states end

  // states update start
  const validatecompanyName = (e) => {
    setcompanyName(e.target.value);
    if (e.target.value.length === 0) {
      setcompanyNameErr("Company name is required");
    }
    else if(e.target.value.length>100)
    {
      setcompanyNameErr("Company name must be 100 characters or less");
    }
     else {
      setcompanyNameErr("");
      setcompanyName(e.target.value);
    }
  };

  const validateaddress1 = (e) => {
    setaddress1(e.target.value);
    if (e.target.value.length === 0) {
      setaddress1Err("Address 1 is required");
    }
    else if(e.target.value.length>50)
    {
      setaddress1Err("Address line-1  must be 50 characters or less");
    } else {
      setaddress1Err("");
      setaddress1(e.target.value);
    }
  };
  const validateaddress2 = (e) => {
    setaddress2(e.target.value);
    if(e.target.value.length>50)
    {
      setaddress2Err("Address line-2  must be 50 characters or less");
    }
  };
  const validatecountry = (e) => {
    setcountry(e.target.value);
    if (e.target.value.length === 0) {
      setcountryErr("Country is required");
    } else {
      setcountryErr("");
      setcountry(e.target.value);
    }
  };
  const validatestate = (e) => {
    setstate(e.target.value);
    apiService.getErpStateCode(e.target.value)
    .then((response) => {
      console.log("ERP API response:", response);
      if (
        response.data.message === "Success" &&
        response.data.result.length > 0
      ) {
        const firstCodeValue = response.data.result[0].Code;
        console.log("First value of Code:", firstCodeValue);
        setstateCode(response.data.result[0].Code);
      } else {
        console.log("No data found or an error occurred.");
        setstateCode("");
      }
    }).catch((error) => {
      handleApiError(error);
    });
    if (e.target.value.length === 0) {
      setstateErr("State is required");
    } else {
      setstateErr("");
      setstate(e.target.value);
    }
  };
  const validatecity = (e) => {
    setcity(e.target.value);
    if (e.target.value.length === 0) {
      setcityErr("City is required");
    }
    else if (e.target.value.length > 30) {
      setcityErr("City must be 30 characters or less.");
    } else {
      setcityErr("");
      setcity(e.target.value);
    }
  };
  const validatepinCode = (e) => {
    setpinCode(e.target.value);
    if (e.target.value.length === 0) {
      setpinCodeErr("Pincode is required");
    } 
    else if (e.target.value.length > 20) {
      setpinCodeErr("PinCode/Zipcode must be 20 or less.");
    } else {
      setpinCodeErr("");
      setpinCode(e.target.value);
    }
  };
  //Communication details
  const validatefs_ContactName = (e) => {
    setfs_ContactName(e.target.value);
    if (e.target.value.length === 0) {
      setfs_ContactNameErr("Contact name is required");
    }
    else if (e.target.value.length > 30) {
      setfs_ContactNameErr("Contact Name must be 30 or less.");
    } else {
      setfs_ContactNameErr("");
      setfs_ContactName(e.target.value);
    }
  };
  const validatefs_Designation = (e) => {
    setfs_Designation(e.target.value);
    if (e.target.value.length === 0) {
      setfs_DesignationErr("Designation is required");
    }
    else if (e.target.value.length > 30) {
      setfs_DesignationErr("Designation must be 30 or less.");
    } else {
      setfs_DesignationErr("");
      setfs_Designation(e.target.value);
    }
  };
  const validatefs_PhoneNo = (e) => {
    setfs_PhoneNo(e.target.value);
    if (e.target.value.length === 0) {
      setfs_PhoneNoErr("Phone number is required");
    }
     else if (!numberValidation.test(e.target.value)) {
      setfs_PhoneNoErr("Phone number is invalid");
    }
    else if (e.target.value.length > 50) {
      setfs_PhoneNoErr("Phone number must be 50 or less.");
    } else {
      setfs_PhoneNoErr("");
      setfs_PhoneNo(e.target.value);
    }
  };
  const validatefs_Email = (e) => {
    setfs_Email(e.target.value);
    if (e.target.value.length === 0) {
      setfs_EmailErr("Email is required");
    } else if (!emailValidation.test(e.target.value)) {
      setfs_EmailErr("Email is invalid");
    }
    else if (e.target.value.length > 50) {
      setfs_EmailErr("Email must be 50 or less.");
    } else {
      setfs_EmailErr("");
      setfs_Email(e.target.value);
    }
  };
  const validatemngs_ContactName = (e) => {
    setmngs_ContactName(e.target.value);
    if (e.target.value.length === 0) {
      setmngs_ContactNameErr("Contact name is required");
    }
    else if (e.target.value.length > 30) {
      setmngs_ContactNameErr("Contact name must be 30 or less.");
    } else {
      setmngs_ContactNameErr("");
      setmngs_ContactName(e.target.value);
    }
  };
  const validatemngs_Designation = (e) => {
    setmngs_Designation(e.target.value);
    if (e.target.value.length === 0) {
      setmngs_DesignationErr("Designation is required");
    }else if (e.target.value.length > 30) {
      setmngs_DesignationErr("Designation must be 30 or less.");
    } else {
      setmngs_DesignationErr("");
      setmngs_Designation(e.target.value);
    }
  };
  const validatemngs_PhoneNo = (e) => {
    setmngs_PhoneNo(e.target.value);
    if (e.target.value.length === 0) {
      setmngs_PhoneNoErr("Phone number is required");
    } else if (!numberValidation.test(e.target.value)) {
      setmngs_PhoneNoErr("Phone number is invalid");
    }
    else if (e.target.value.length > 50) {
      setmngs_PhoneNoErr("Phone number must be 50 or less.");
    } else {
      setmngs_PhoneNoErr("");
      setmngs_PhoneNo(e.target.value);
    }
  };
  const validatemngs_Email = (e) => {
    setmngs_Email(e.target.value);
    if (e.target.value.length === 0) {
      setmngs_EmailErr("Email is required");
    } else if (!emailValidation.test(e.target.value)) {
      setmngs_EmailErr("Email is invalid");
    }else if (e.target.value.length > 50) {
      setmngs_EmailErr("Email must be 50 or less.");
    } else {
      setmngs_EmailErr("");
      setmngs_Email(e.target.value);
    }
  };
  const validatemastervendor_email = (e) => {
    setmastervendor_email(e.target.value);
    if (e.target.value.length === 0 && userStatus !== "NewRegistration") {
      setmastervendor_emailErr("Email is required");
    }
    else if (e.target.value.length > 50) {
      setmastervendor_emailErr("Email must be 50 or less.");
    } else {
      setmastervendor_emailErr("");
      setmastervendor_email(e.target.value);
    }
  };
  //bank details
  const validatebankAccountName = (e) => {
    setbankAccountName(e.target.value);
    if (e.target.value.length === 0) {
      setbankAccountNameErr("Account name is required");
    } else {
      setbankAccountNameErr("");
      setbankAccountName(e.target.value);
    }
  };
  const validatebankName = (e) => {
    setbankName(e.target.value);
    if (e.target.value.length === 0) {
      setbankNameErr("Bank name is required");
    }
    else if (e.target.value.length > 30) {
      setbankNameErr("Bank name must be 30 or less.");
    }
     else {
      setbankNameErr("");
      setbankName(e.target.value);
    }
  };
  const validatebankAccountNumber = (e) => {
    setbankAccountNumber(e.target.value);
    if (e.target.value.length === 0) {
      setbankAccountNumberErr("Account number is required");
    }
    else if (e.target.value.length > 20) {
      setbankAccountNumberErr("Account number must be 20 or less.");
    } else {
      setbankAccountNumberErr("");
      setbankAccountNumber(e.target.value);
    }
  };
  const validateifscCode = (e) => {
    setifscCode(e.target.value);
    if (e.target.value.length === 0) {
      setifscCodeErr("IFSC code is required");
    }
    else if (e.target.value.length > 20) {
      setifscCodeErr("IFSC must be 20 or less.");
    }  else {
      setifscCodeErr("");
      setifscCode(e.target.value);
    }
  };
  const validateMICRcode = (e) => {
    setMICRcode(e.target.value);
    if (e.target.value.length === 0) {
      setMICRcodeErr("MICR code is required");
    }else if (e.target.value.length > 30) {
      setMICRcodeErr("IFSC must be 30 or less.");
    }  else {
      setMICRcodeErr("");
      setMICRcode(e.target.value);
    }
  };
  const validatebranchAddress = (e) => {
    setbranchAddress(e.target.value);
    if (e.target.value.length === 0) {
      setbranchAddressErr("Branch address is required");
    } else if (e.target.value.length > 50) {
      setbranchAddressErr("Branch address must be 50 or less.");
    } else {
      setbranchAddressErr("");
      setbranchAddress(e.target.value);
    }
  };
  // contact team
  const validatename = (e) => {
    setname(e.target.value);
    if (e.target.value.length === 0) {
      setnameErr("Name is required");
    }else if (e.target.value.length > 30) {
      setnameErr("Name must be 30 or less.");
    }
     else {
      setnameErr("");
      setname(e.target.value);
    }
  };
  const validatecontactNumber = (e) => {
    setcontactNumber(e.target.value);
    if (e.target.value.length === 0) {
      setcontactNumberErr("Contact number is required");
    } else if (e.target.value.length > 50){
      setcontactNumberErr("Contact number must be 50 or less.");
    } else {
      setcontactNumberErr("");
      setcontactNumber(e.target.value);
    }
  };
  const validatecontactNumber2 = (e) => {
    setcontactNumber2(e.target.value);
  if (e.target.value.length > 50){
      setcontactNumber2Err("Contact number must be 50 or less.");
    } else {
      setcontactNumber2Err("");
      setcontactNumber2(e.target.value);
    }
  };
  const validatecontactNumber3 = (e) => {
    setcontactNumber3(e.target.value);
  if (e.target.value.length > 50){
      setcontactNumber3Err("Contact number must be 50 or less.");
    } else {
      setcontactNumber3Err("");
      setcontactNumber3(e.target.value);
    }
  };
  const validateemail = (e) => {
    setemail(e.target.value);
    if (e.target.value.length === 0) {
      setemailErr("Email is required");
    } else if (
      email &&
      !new RegExp("@" + desiredDomain + "\\s*$").test(e.target.value)
    ) {
      setemailErr("Email is invalid");
    }else if (e.target.value.length > 50){
      setemailErr("Email must be 50 or less.");
    }
     else {
      setemailErr("");
      setemail(e.target.value);
    }
  };
  const validateemail2 = (e) => {
    setemail2(e.target.value);
    if (e.target.value.length > 50) {
      setemail2Err("HSI Contact E-Mail-2 must be 50 or less.");
    } else if (
      email &&
      !new RegExp("@" + desiredDomain + "\\s*$").test(e.target.value)
    ) {
      setemail2Err("HSI Contact E-Mail-2 is invalid");
    } else {
      setemail2Err("");
      setemail2(e.target.value);
    }
  };
  const validateemail3 = (e) => {
    setemail3(e.target.value);
    if (e.target.value.length > 50) {
      setemail3Err("HSI Contact E-Mail-3 must be 50 or less.");
    } else if (
      email &&
      !new RegExp("@" + desiredDomain + "\\s*$").test(e.target.value)
    ) {
      setemail3Err("HSI Contact E-Mail-3 is invalid");
    } else {
      setemail3Err("");
      setemail3(e.target.value);
    }
  };
  // approval manager
  const validatevendorType = (e) => {
    setvendorType(e.target.value);
    if (e.target.value.length === 0) {
      setvendorTypeErr("Vendor type is required");
    } else {
      setvendorTypeErr("");
      setvendorType(e.target.value);
    }
  };
  const validateacManager = (e) => {
    setacManager(e.target.value);
    if (e.target.value.length === 0) {
      setacManagerErr("A/C manager is required");
    } else {
      setacManagerErr("");
      setacManager(e.target.value);
    }
  };
  const validatemkcheck = (e) => {
    setmkcheck(e.target.checked);
    if (e.target.checked.length === 0) {
      setmkcheckErr("Check is required");
    } else {
      setmkcheckErr("");
      setmkcheck(e.target.checked);
    }
  };
  // satutory Details
  const validateGST_type = (e) => {
    setGST_type(e.target.value);
    if (e.target.value.length === 0) {
      setGST_typeErr("GST type is required");
    } else if (e.target.value === "UnRegistered") {
      setGST_No("N/A");
      setGST_typeErr("");
      setGST_NoErr("");
    } else if (e.target.value === "Import") {
      setGST_No("N/A");
      setPAN_No("N/A");
      setGST_typeErr("");
      setGST_NoErr("");
      setPAN_NoErr("");
      setfileDisclosureErr("");
      setGST_DocErr("");
      setPAN_DocErr("");
      // setGST_Doc("");
      // setfileDisclosure("");
    } else if (e.target.value === "N/A") {
      setGST_typeErr("GST type is required");
    } else {
      setGST_No(GST_No);
      setGST_typeErr("");
      setfileDisclosureErr("");
      setGST_type(e.target.value);
    }
  };
  const validateGST_No = (e) => {
    setGST_No(e.target.value);
    if (e.target.value.length === 0) {
      setGST_NoErr("GST Number is required");
    } else if (
      !GSTValidation.test(e.target.value) &&
      e.target.value !== "N/A"
    ) {
      setGST_NoErr("GST Number is not valid");
    }
    else if (e.target.value.length > 15) {
      setGST_NoErr("GST Number must be 15 or less.");
    }
     else {
      setGST_NoErr("");
      setGST_No(e.target.value);
    }
  };
  const validatePAN_No = (e) => {
    setPAN_No(e.target.value);
    if (e.target.value.length === 0) {
      setPAN_NoErr("Pan number is required");
    } else if (e.target.value.length > 20) {
      setPAN_NoErr("Pan number must be 20 or less.");
    }
    else if (!PANValidation.test(e.target.value)) {
      setPAN_NoErr("Pan number is not valid");
    } else {
      setPAN_NoErr("");
      setPAN_No(e.target.value);
    }
  };
  const validateCIN_No = (e) => {
    setCIN_No(e.target.value);
    if (e.target.value.length === 0) {
      setCIN_NoErr("CIN number is required");
    } else if (e.target.value.length > 21) {
      setCIN_NoErr("CIN number must be 21 or less.");
    }
    else {
      setCIN_NoErr("");
      setCIN_No(e.target.value);
    }
  };

  const validateMSME_status = (e) => {
    setMSME_status(e.target.value);
    if (e.target.value.length === 0) {
      setMSME_statusErr("MSME status is required");
    } else if (e.target.value === "UnRegistered") {
      setMSME_No("N/A");
      setMSME_Type("");
      setMSME_NoErr("");
      setMSME_TypeErr("");
      setMSME_DocErr("");
    } else {
      setMSME_statusErr("");
      setMSME_status(e.target.value);
    }
  };
  const validateMSME_No = (e) => {
    setMSME_No(e.target.value);
    if (e.target.value.length === 0) {
      setMSME_NoErr("MSME number is required");
    }else if (e.target.value.length > 50) {
      setMSME_NoErr("MSME number must be 50 or less.");
    } else {
      setMSME_NoErr("");
      setMSME_No(e.target.value);
    }
  };

  const validateMSME_Type = (e) => {
    setMSME_Type(e.target.value);
    if (e.target.value.length === 0) {
      setMSME_TypeErr("MSME type is required");
    } else {
      setMSME_TypeErr("");
      setMSME_Type(e.target.value);
    }
  };
  const validateTAN_No = (e) => {
    setTAN_No(e.target.value);
    if (e.target.value.length > 10) {
      setTAN_NoErr("TAN number must be 10 or less.");
    } else {
      setTAN_NoErr("");
      setTAN_No(e.target.value);
    }
  };


  const validateTax_residency = (e) => {
    setTax_residency(e.target.value);
    if (e.target.value.length === 0) {
      setTax_residencyErr("Tax residency is required");
    } else {
      setTax_residencyErr("");
      setTax_residency(e.target.value);
    }
  };

  const onApproverFileChange = (event) => {
    setapproverFile(event.target.files[0]);
  };

  const handleEdit = (event) => {
    if (style === "cont2") {
      setStyle("approvalsform");
    } else {
      setStyle("cont2");
    }
  };
  const handleLogoView = (event) => {
    console.log("event------------------logo--->>>>", event);
    Swal.fire({
      title: "Company Logo",
      html: ` <img className="camera-img" src='data:image/jpeg;base64,${event}' alt="image" width='100px' width='100px'/> `,
      focusConfirm: false,
    });
  };

  const handleView = (event) => {
    if (event.size) {
      const blobData = new Blob([event], { type: event.type });
      const blobUrl = URL.createObjectURL(blobData);
      window.open(blobUrl, "_blank");
    } else {
      if (event) {
        let text = event;
        let fname = text.split("/");
        fetch(
          `${process.env.REACT_APP_API_URL}/downloadPdfUploads/${fname[1]}`
        ).then((response) => {
          response.blob().then((blob) => {
            let url = URL.createObjectURL(blob, "application/pdf");
            window.open(url, "_blank");
          });
        });
      } else {
        Swal.fire({
          title: "File not found",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  const handleEditPopup = (event) => {
    if (
      (event === "logo" && logo) ||
      (event === "GST_Doc" && GST_Doc) ||
      (event === "PAN_Doc" && PAN_Doc) ||
      (event === "fileDisclosure" && fileDisclosure) ||
      (event === "form_10f" && form_10f) ||
      (event === "pe_declaration" && pe_declaration) ||
      (event === "Tax_residency" && Tax_residency) ||
      (event === "MSME_Doc" && MSME_Doc) ||
      (event === "TAN_Doc" && TAN_Doc) ||
      (event === "RPD_Doc" && RPD_Doc) ||
      (event === "COC_Doc" && COC_Doc) ||
      (event === "NDA_Doc" && NDA_Doc) ||
      (event === "financial_data" && financial_data) ||
      (event === "financial_data2" && financial_data2) ||
      (event === "bankdetailDoc" && bankdetailDoc) ||
      (event === "approverFile" && approverFile)
    ) {
      console.log("deletefile::");
      let bankDocument = "Copy of cancel Cheque.pdf";
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
              if (event === "GST_Doc") {
                seteditGstUploadFile(true);
                seteditUnRegGstUploadFile(false);
                setGST_Doc("");
                setGST_DocErr("GST document is required");
              } else if (event === "fileDisclosure") {
                seteditUnRegGstUploadFile(true);
                setfileDisclosure("");
                setfileDisclosureErr("FileDisclosure is required");
              } else if (event === "logo") {
                seteditUploadFile(true);
                setlogo("");
                setlogoErr("Logo is required");
              } else if (event === "PAN_Doc") {
                setPAN_Doc("");
                setPAN_DocErr("PAN document is required");
                seteditPanUploadFile(true);
              } else if (event === "form_10f") {
                setform_10f("");
                setform_10fErr("form_10f document is required");
                seteditform10fUploadFile(true);
              } else if (event === "pe_declaration") {
                setpe_declaration("");
                setpe_declarationErr("Pe_declaration document is required");
                seteditNPDUploadFile(true);
              } else if (event === "MSME_Doc") {
                setMSME_Doc("");
                setMSME_DocErr("MSME document is required");
                seteditMSMEUploadFile(true);
              } else if (event === "TAN_Doc") {
                setTAN_Doc("");
                seteditTanUploadFile(true);
                // setTAN_DocErr("TAN document is required");
              } else if (event === "Tax_residency") {
                setTax_residency("");
                setTax_residencyErr("TAX document is required");
                seteditTRCUploadFile(true);
              } else if (event === "RPD_Doc") {
                setRPD_Doc("");
                setRPD_DocErr("RPD document is required");
                seteditRPDUploadFile(true);
              } else if (event === "COC_Doc") {
                setCOC_Doc("");
                setCOC_DocErr("COC document is required");
                seteditCOCUploadFile(true);
              } else if (event === "NDA_Doc") {
                setNDA_Doc("");
                setNDA_DocErr("NDA document is required");
                seteditNDAUploadFile(true);
              } else if (event === "financial_data") {
                setfinancial_data("");
                seteditfindataUploadFile(true);
              } else if (event === "financial_data2") {
                seteditfindata2UploadFile(true);
                setfinancial_data2("");
              } else if (event === "bankdetailDoc") {
                seteditBankUploadFile(true);
                setbankdetailDoc("");
                setbankdetailDocErr("Bank document is required");
              } else if (event === "approverFile") {
                setapproverFile("");
                setapproverFileErr("File is required");
              }
              Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("File not deleted", "", "info");
            }
          });
         
        },
      });
    } else {
   
      Swal.fire({
        title: "Select File",
        input: "file",
        confirmButtonText: "Upload",
        confirmButtonColor: "#B1000E",
        showCancelButton: true,

        inputValidator: (value) => {
          if (!value) {
            return "You need to upload a file!";
          }
        },
      }).then((result) => {

        if (result.isConfirmed) {
          if (event === "GST_Doc") {
            seteditGstUploadFile(false);
            setGST_Doc(result.value);
            setGST_DocErr("");
          } else if (event === "fileDisclosure") {
            seteditUnRegGstUploadFile(false);
            setfileDisclosure(result.value);
            setfileDisclosureErr("");
          } else if (event === "logo") {
            seteditUploadFile(false);
            var filereader = new FileReader();
            filereader.readAsBinaryString(result.value);
            filereader.onload = function (evt) {
              var base64 = evt.target.result;
              console.log(
                "btoa(base64)-------------------------->>>>",
                btoa(base64)
              );
              setlogo(btoa(base64));
            };

            setlogoErr("");
          } else if (event === "PAN_Doc") {
            setPAN_Doc(result.value);
            setPAN_DocErr("");
            seteditPanUploadFile(false);
          } else if (event === "form_10f") {
            seteditform10fUploadFile(false);
            setform_10f(result.value);
            setform_10fErr("");
          } else if (event === "pe_declaration") {
            seteditNPDUploadFile(false);
            setpe_declaration(result.value);
            setpe_declarationErr("");
          } else if (event === "MSME_Doc") {
            setMSME_Doc(result.value);
            setMSME_DocErr("");
            seteditMSMEUploadFile(false);
          } else if (event === "TAN_Doc") {
            setTAN_Doc(result.value);
            setTAN_DocErr("");
            seteditTanUploadFile(false);
          } else if (event === "Tax_residency") {
            seteditTRCUploadFile(false);
            setTax_residency(result.value);
            setTax_residencyErr("");
          } else if (event === "RPD_Doc") {
            setRPD_Doc(result.value);
            setRPD_DocErr("");
            seteditRPDUploadFile(false);
          } else if (event === "COC_Doc") {
            setCOC_Doc(result.value);
            setCOC_DocErr("");
            seteditCOCUploadFile(false);
          } else if (event === "NDA_Doc") {
            setNDA_Doc(result.value);
            setNDA_DocErr("");
            seteditNDAUploadFile(false);
          } else if (event === "financial_data") {
            setfinancial_data(result.value);
            seteditfindataUploadFile(false);
          } else if (event === "financial_data2") {
            setfinancial_data2(result.value);
            seteditfindata2UploadFile(false);
          } else if (event === "bankdetailDoc") {
            setbankdetailDoc(result.value);
            setbankdetailDocErr("");
            seteditBankUploadFile(false);
          } else if (event === "approverFile") {
            setapproverFile(result.value);
            setapproverFileErr("");
          }
          Swal.fire("File Selected!", "", "success");
        }
      });

    }
  };

  const handleNoConcernFound = (event) => {
    const userId = event;
    const data = new FormData();
    data.append("userId", event);
    data.append("level2Status", "approved");
    data.append("level2Date", new Date());
    console.log("vendortype", Vendor_Type);
    console.log("acmanager::", Vendor_Account_Manager);
    const ERPData = {
      Refrence_Entry_No: TicketID || undefined,
      Vendor_Type: Vendor_Type || undefined,
      Name: companyName || undefined,
      Address: Address || undefined,
      Address_2: Address_2 || undefined,
      City: City || undefined,
      MSMED_Number: MSME_No || undefined,
      MSMED: MSME_status || undefined,
      MSMED_Vendor_Type: MSME_Type || undefined,
      Country_Region_Code: countryRegionCode || undefined,
      Post_Code: Post_Code || undefined,
      E_Mail: mastervendor_email || undefined,
      P_A_N_No: PAN_No || undefined,
      CIN_No: CIN_No || undefined,
      TAN_No: TAN_No || undefined,
      Vendor_Account_Manager: Vendor_Account_Manager || undefined,
      State_Code: stateCode || undefined,
      Contact: contactPerson || undefined,
      Phone_No:  phoneNumber || undefined,
      Finance_Contact_Name: fs_ContactName || undefined,
      Finance_Contact_Designation: fs_Designation || undefined,
      Finance_Contact_Phone_No: fs_PhoneNo || undefined,
      Finance_Contact_E_Mail: fs_Email || undefined,
      Operation_Contact_Name: ops_ContactName || undefined,
      Operation_Contact_Designation: ops_Designation || undefined,
      Operation_Contact_Phone_No: ops_PhoneNo || undefined,
      Operation_Contact_E_Mail: ops_Email || undefined,
      Collection_Contact_Name: colls_ContactName || undefined,
      Collection_Contact_Designation: colls_Designation || undefined,
      Collection_Contact_Phone_No: colls_PhoneNo || undefined,
      Collection_Contact_E_Mail: colls_Email || undefined,
      Management_Contact_Name: mngs_ContactName || undefined,
      Management_Contact_Designation: mngs_Designation || undefined,
      Management_Contact_Phone_No: mngs_PhoneNo || undefined,
      Management_Contact_E_Mail: mngs_Email || undefined,
      Others_Contact_Name: others_ContactName || undefined,
      Others_Contact_Designation: others_Designation || undefined,
      Others_Contact_Phone_No: others_PhoneNo || undefined,
      Others_Contact_E_Mail: others_Email || undefined,
      Master_Vendor_E_Mail_ID: mastervendor_email || undefined,
      MICR_Swift_Code: MICRcode || undefined,
      Year_of_audited_financials: yearOfAuditedFinancial || undefined,
      Revenue: Revenue || undefined,
      Profit: Profit || undefined,
      Networth: netWorth || undefined,
      Current_Assets: currentAssets || undefined,
      Director_Detail: directorDetails || undefined,
      GST_Registration_No: GST_No || undefined,
      GST_Vendor_Type: GST_type || undefined,
      Account_Holder_Name: bankAccountName || undefined,
      Account_No: bankAccountNumber || undefined,
      Bank_Name: bankName || undefined,
      Bank_Address: branchAddress || undefined,
      IFSC_Code: ifscCode || undefined,
      HSI_Contact_Name_1: name || undefined,
      HSI_Contact_E_Mail_1: email || undefined,
      HSI_Contact_No_1: contactNumber || undefined,
      HSI_Contact_Name_2: name2 || undefined,
      HSI_Contact_E_Mail_2: email2 || undefined,
      HSI_Contact_No_2: contactNumber2 || undefined,
      HSI_Contact_Name_3: name3 || undefined,
      HSI_Contact_E_Mail_3: email3 || undefined,
      HSI_Contact_No_3: contactNumber3 || undefined,
      Shareholder_Name: shareholderName || undefined,
      Organization_Type: organisationType || undefined,
    };
    const sharepointDocumentUpload = {
      Ticket_ID: TicketID,
      logo: logo,
      GST_Doc: GST_Doc,
      PAN_Doc: PAN_Doc,
      MSME_Doc: MSME_Doc,
      form_10f: form_10f,
      PE_Declaration_Doc: pe_declaration,
      Tax_residency_Doc: Tax_residency,
      fileDisclosure: fileDisclosure,
      TAN_Doc: TAN_Doc,
      RPD_Doc: RPD_Doc,
      COC_Doc: COC_Doc,
      NDA_Doc: NDA_Doc,
      financial_data: financial_data,
      financial_data2: financial_data2,
      bankdetailDoc: bankdetailDoc,
    };
    const MasterVendor = {
      mastervendor_email: mastervendor_email || undefined,
      companyName: companyName || undefined,
      Ticket_ID: TicketID || undefined,
      Country_Region_Code: countryRegionCode || undefined,
    };
    apiService
      .createsharepointFolderByTicketId(sharepointDocumentUpload)
      .then((response) => {
        console.log("Sharepointresponse::", response);
        if (response.data.message === "success") {
          apiService
            .postErpResourcePortalVendorlist(ERPData)
            .then((response) => {
              console.log("ERPData---->", ERPData);
              if (response && response.data.msg !== "error") {
                if (response && !response.data.Result?.["odata.error"]) {
                  console.log("ErpResponse::", response);
                  const VendorCodeGenration = {
                    ticketID: TicketID || undefined,
                  };

                  apiService
                    .GenerateVendorCode(VendorCodeGenration)
                    .then((response) => {
                      console.log("vendorCodeGenerate::", response);
                    }).catch((error) => {
                      handleApiError(error);
                    });
                  const MasterVendor = {
                    mastervendor_email: mastervendor_email || undefined,
                    companyName: companyName || undefined,
                    Ticket_ID: TicketID || undefined,
                    Country_Region_Code: countryRegionCode || undefined,
                  };
                  if (userStatus === "NewRegistration") {
                    console.log("NewRegistration::")
                    apiService
                    .updateApprovalStatus(userId, data)
                    .then((responseData) => {
                      if (responseData.data.status === "success") {
                        Swal.fire({
                          title: "Approved",
                          icon: "success",
                          confirmButtonText: "OK",
                          showCloseButton: false,
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            props.onApprovaljapanDone(); 
                          }
                        });
                        
                      } else {
                        Swal.fire({
                          title: responseData.data.message,
                          icon: "error",
                          confirmButtonText: "OK",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            props.onApprovaljapanDone(); 
                          }
                        });
                      }
                    }).catch((error) => {
                      handleApiError(error);
                    });
                                        }
                                        else
                                        {
                                          apiService
                                          .saveMasterLogin(MasterVendor)
                                          .then((Masterresponse) => {
                                            console.log("masterLogin::", Masterresponse);
                                            apiService
                                              .updateApprovalStatus(userId, data)
                                              .then((responseData) => {
                                                if (responseData.data.status === "success") {
                                                  Swal.fire({
                                                    title: "Approved",
                                                    icon: "success",
                                                    confirmButtonText: "OK",
                                                    showCloseButton: false,
                                                    allowOutsideClick: false,
                                                    allowEscapeKey: false,
                                                  }).then((result) => {
                                                    if (result.isConfirmed) {
                                                      props.onApprovaljapanDone(); 
                                                    }
                                                  });
                                                  
                                                } else {
                                                  Swal.fire({
                                                    title: responseData.data.message,
                                                    icon: "error",
                                                    confirmButtonText: "OK",
                                                  }).then((result) => {
                                                    if (result.isConfirmed) {
                                                      props.onApprovaljapanDone(); 
                                                    }
                                                  });
                                                }
                                              });
                                          }).catch((error) => {
                                            handleApiError(error);
                                          });
                                        }
                
                } else {
                  const errorMessage =
                    response.data.Result?.["odata.error"]?.message?.value ||
                    "An error occurred while processing the request.";
                  if (
                    response.data.Result?.["odata.error"]?.message?.value ===
                    "The record already exists."
                  ) {
                    console.log("already exists::");
                    const MasterVendor = {
                      mastervendor_email: mastervendor_email || undefined,
                      companyName: companyName || undefined,
                      Ticket_ID: TicketID || undefined,
                      Country_Region_Code: countryRegionCode || undefined,
                    };
                    const UpdateMasterVendor = {
                      mastervendor_email: mastervendor_email || undefined,
                      companyName: companyName || undefined,
                      Ticket_ID: TicketID || undefined,
                      Country_Region_Code: countryRegionCode || undefined,
                    };
                    const ERPData = {
                      Refrence_Entry_No: TicketID || undefined,
                      Vendor_Type: Vendor_Type || undefined,
                      Name: companyName || undefined,
                      Address: Address || undefined,
                      Address_2: Address_2 || undefined,
                      City: City || undefined,
                      MSMED_Number: MSME_No || undefined,
                      MSMED: MSME_status || undefined,
                      MSMED_Vendor_Type: MSME_Type || undefined,
                      Country_Region_Code: countryRegionCode || undefined,
                      Post_Code: Post_Code || undefined,
                      E_Mail: mastervendor_email || undefined,
                      P_A_N_No: PAN_No || undefined,
                      CIN_No: CIN_No || undefined,
                      TAN_No: TAN_No || undefined,
                      Vendor_Account_Manager:Vendor_Account_Manager || undefined,
                      State_Code: stateCode || undefined,
                      Contact: contactPerson || undefined,
      Phone_No:  phoneNumber || undefined,
                      Finance_Contact_Name: fs_ContactName || undefined,
                      Finance_Contact_Designation: fs_Designation || undefined,
                      Finance_Contact_Phone_No: fs_PhoneNo || undefined,
                      Finance_Contact_E_Mail: fs_Email || undefined,
                      Operation_Contact_Name: ops_ContactName || undefined,
                      Operation_Contact_Designation:
                        ops_Designation || undefined,
                      Operation_Contact_Phone_No: ops_PhoneNo || undefined,
                      Operation_Contact_E_Mail: ops_Email || undefined,
                      Collection_Contact_Name: colls_ContactName || undefined,
                      Collection_Contact_Designation:
                        colls_Designation || undefined,
                      Collection_Contact_Phone_No: colls_PhoneNo || undefined,
                      Collection_Contact_E_Mail: colls_Email || undefined,
                      Management_Contact_Name: mngs_ContactName || undefined,
                      Management_Contact_Designation:
                        mngs_Designation || undefined,
                      Management_Contact_Phone_No: mngs_PhoneNo || undefined,
                      Management_Contact_E_Mail: mngs_Email || undefined,
                      Others_Contact_Name: others_ContactName || undefined,
                      Others_Contact_Designation:
                        others_Designation || undefined,
                      Others_Contact_Phone_No: others_PhoneNo || undefined,
                      Others_Contact_E_Mail: others_Email || undefined,
                      Master_Vendor_E_Mail_ID: mastervendor_email || undefined,
                      MICR_Swift_Code: MICRcode || undefined,
                      Year_of_audited_financials:
                        yearOfAuditedFinancial || undefined,
                      Revenue: Revenue || undefined,
                      Profit: Profit || undefined,
                      Networth: netWorth || undefined,
                      Current_Assets: currentAssets || undefined,
                      Director_Detail: directorDetails || undefined,
                      GST_Registration_No: GST_No || undefined,
                      GST_Vendor_Type: GST_type || undefined,
                      Account_Holder_Name: bankAccountName || undefined,
                      Account_No: bankAccountNumber || undefined,
                      Bank_Name: bankName || undefined,
                      Bank_Address: branchAddress || undefined,
                      IFSC_Code: ifscCode || undefined,
                      HSI_Contact_Name_1: name || undefined,
                      HSI_Contact_E_Mail_1: email || undefined,
                      HSI_Contact_No_1: contactNumber || undefined,
                      HSI_Contact_Name_2: name2 || undefined,
                      HSI_Contact_E_Mail_2: email2 || undefined,
                      HSI_Contact_No_2: contactNumber2 || undefined,
                      HSI_Contact_Name_3: name3 || undefined,
                      HSI_Contact_E_Mail_3: email3 || undefined,
                      HSI_Contact_No_3: contactNumber3 || undefined,
                      Shareholder_Name: shareholderName || undefined,
                      Organization_Type: organisationType || undefined,
                    };
                    if (userStatus === "NewRegistration") {
                      console.log("NewRegistration::");
                      apiService
                      .updateApprovalStatus(userId, data)
                      .then((responseData) => {
                        if (responseData.data.status === "success") {
                          Swal.fire({
                            title: responseData.data.message,
                            icon: "success",
                            confirmButtonText: "OK",
                            showCloseButton: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              props.onApprovaljapanDone(); 
                            }
                          });
                         
                        } else {
                          Swal.fire({
                            title: responseData.data.message,
                            icon: "error",
                            confirmButtonText: "OK",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              props.onApprovaljapanDone(); 
                            }
                          });
                        }
                      }).catch((error) => {
                        handleApiError(error);
                      });
                                          }
                                          else
                                          {
                                             apiService.updateErpResourcePortalVendorlist(TicketID,ERPData).then((Masterresponse) => {
                    console.log("ErpDataupdates",Masterresponse);
                                            }).catch((error) => {
                                              handleApiError(error);
                                            });
                                            apiService
                                            .updateMasterLogin(UpdateMasterVendor)
                                            .then((Masterresponse) => {
                                              console.log("masterLogin::", Masterresponse);
                                              apiService
                                                .updateApprovalStatus(userId, data)
                                                .then((responseData) => {
                                                  if (responseData.data.status === "success") {
                                                    Swal.fire({
                                                      title: responseData.data.message,
                                                      icon: "success",
                                                      confirmButtonText: "OK",
                                                      showCloseButton: false,
                                                      allowOutsideClick: false,
                                                      allowEscapeKey: false,
                                                    }).then((result) => {
                                                      if (result.isConfirmed) {
                                                        props.onApprovaljapanDone(); 
                                                      }
                                                    });
                                                   
                                                  } else {
                                                    Swal.fire({
                                                      title: responseData.data.message,
                                                      icon: "error",
                                                      confirmButtonText: "OK",
                                                    }).then((result) => {
                                                      if (result.isConfirmed) {
                                                        props.onApprovaljapanDone(); 
                                                      }
                                                    });
                                                  }
                                                });
                                            }).catch((error) => {
                                              handleApiError(error);
                                            });
                                          }
                
                  } else {
                    const errorMessage =
                      response.data.Result?.["odata.error"]?.message?.value ||
                      "An error occurred while processing the request.";
                    Swal.fire({
                      title: errorMessage
                        ? `In ERP, ${errorMessage}`
                        : "An error occurred while processing the request in ERP",
                      icon: "error",
                      confirmButtonText: "OK",
                      showCloseButton: true,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                    });
                  }
                }
              } else {
                const erpErrorResponse = response.data.error;
                Swal.fire({
                  icon: "error",
                  title: `In ERP,${erpErrorResponse}`,
                  confirmButtonText: "OK",
                  showCloseButton: false,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                });
              }
            }).catch((error) => {
              handleApiError(error);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error in Fetching Api to Sharepoint",
            confirmButtonText: "OK",
            showCloseButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error in Fetching Api to Sharepoint",
          confirmButtonText: "OK",
          showCloseButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      });
  };
  const handleConcernFound = (event) => {
    Swal.fire({
      heightAuto: true,
      title: "Review vendor details",
      html: `<div class="rejectstyle">
            <textarea rows="10" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
            <input type="file" id="rejectdoc" class="swal01-input" placeholder="Select file">
       </div> `,
      confirmButtonText: "Reject",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        const rejectdoc = Swal.getPopup().querySelector("#rejectdoc").files[0];
        if (!comment) {
          Swal.showValidationMessage(`Please enter comments`);
        } else {
          const data = new FormData();
          console.log("new date--------", new Date());
          data.append("userId", event);
          data.append("level2Status", "rejected");
          data.append("level2RejectComment", comment);
          data.append("level2rejectFileDoc", rejectdoc);
          data.append("level2Date", new Date());
          const userId = event;
          apiService.updateApprovalStatus(userId, data).then((responseData) => {
            if (responseData.data.status === "success") {
              Swal.fire({
                title: "Rejected",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  props.onApprovaljapanDone();
                }
              });
             
            } else {
              Swal.fire({
                title: responseData.data.message,
                icon: "error",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  props.onApprovaljapanDone();
                }
              });
            }
          }).catch((error) => {
            handleApiError(error);
          });
        }
    
   
  }
})
    //     }
    //   },
    // });
  };

  const handleMRTApprove = (event) => {
    let FormarrayErr = [];
    if (companyName.length === 0) {
      FormarrayErr.push("companyName");
      setcompanyNameErr("Company name is required");
    }
    if (Address.length === 0) {
      FormarrayErr.push("Address");
      setaddress1Err("Address 1 is required");
    }
    if (Country_Region_Code.length === 0) {
      FormarrayErr.push("Country_Region_Code");
      setcountryErr("Country is required");
    }
    if (state.length === 0) {
      FormarrayErr.push("state");
      setstateErr("State is required");
    }
    if (City.length === 0) {
      FormarrayErr.push("City");
      setcityErr("City is required");
    }

    if (Post_Code.length === 0) {
      FormarrayErr.push("Post_Code");
      setpinCodeErr("Pincode is required");
    } else if (!numberValidation.test(Post_Code)) {
      FormarrayErr.push("Post_Code Invalid");
      setpinCodeErr("Pincode is Invalid");
    }
    if (fs_ContactName.length === 0) {
      FormarrayErr.push("fs_ContactName");
      setfs_ContactNameErr("Contact name is required");
    }
    if (fs_Designation.length === 0) {
      FormarrayErr.push("fs_Designation");
      setfs_DesignationErr("Designation is required");
    }

    if (fs_PhoneNo.length === 0) {
      FormarrayErr.push("fs_PhoneNo");
      setfs_PhoneNoErr("Phone number is required");
    } else if (!numberValidation.test(fs_PhoneNo)) {
      FormarrayErr.push("fs_PhoneNo Invalid");
      setfs_PhoneNoErr("Phone number is invalid");
    }

    if (fs_Email.length === 0) {
      FormarrayErr.push("fs_Email");
      setfs_EmailErr("Email is required");
    } else if (!emailValidation.test(fs_Email)) {
      FormarrayErr.push("fs_Email Invalid");
      setfs_EmailErr("Email is invalid");
    }

    if (mngs_ContactName.length === 0) {
      FormarrayErr.push("mngs_ContactName");
      setmngs_ContactNameErr("Contact name is required");
    }
    if (mngs_Designation.length === 0) {
      FormarrayErr.push("mngs_Designation");
      setmngs_DesignationErr("Designation is required");
    }

    if (mngs_PhoneNo.length === 0) {
      FormarrayErr.push("mngs_PhoneNo");
      setmngs_PhoneNoErr("Phone number is required");
    } else if (!numberValidation.test(mngs_PhoneNo)) {
      FormarrayErr.push("mngs_PhoneNo Invalid");
      setmngs_PhoneNoErr("Phone number is invalid");
    }

    if (mngs_Email.length === 0) {
      FormarrayErr.push("mngs_Email");
      setmngs_EmailErr("Email is required");
    } else if (!emailValidation.test(mngs_Email)) {
      FormarrayErr.push("mngs_Email Invalid");
      setmngs_EmailErr("Email is invalid");
    }

    if (mastervendor_email.length === 0) {
      FormarrayErr.push("mastervendor_email");
      setmastervendor_emailErr("Email is required");
    } else if (!emailValidation.test(mastervendor_email)) {
      FormarrayErr.push("mastervendor_email Invalid");
      setmastervendor_emailErr("Email is invalid");
    }

    if (bankAccountName.length === 0) {
      FormarrayErr.push("bankAccountName");
      setbankAccountNameErr("Account name is required");
    }
    if (bankName.length === 0) {
      FormarrayErr.push("bankName");
      setbankNameErr("Bank name is required");
    }
    if (bankAccountNumber.length === 0) {
      FormarrayErr.push("bankAccountNumber");
      setbankAccountNumberErr("Account number is required");
    }
    if (ifscCode.length === 0) {
      FormarrayErr.push("ifscCode");
      setifscCodeErr("IFSC code is required");
    }
    if (MICRcode.length === 0) {
      FormarrayErr.push("MICRcode");
      setMICRcodeErr("MICR code is required");
    }
    if (branchAddress.length === 0) {
      FormarrayErr.push("branchAddress");
      setbranchAddressErr("Branch address is required");
    }
    if (!bankdetailDoc) {
      FormarrayErr.push("bankdetailDoc");
      setbankdetailDocErr("Bank document is required");
    }

    if (!RPD_Doc) {
      FormarrayErr.push("RPD_Doc");
      setRPD_DocErr("RPD document is required");
    }
    if (!COC_Doc) {
      FormarrayErr.push("COC_Doc");
      setCOC_DocErr("COC document is required");
    }
    if (!NDA_Doc) {
      FormarrayErr.push("NDA_Doc");
      setNDA_DocErr("NDA document is required");
    }

    if (name.length === 0) {
      FormarrayErr.push("name");
      setnameErr("Name is required");
    }

    if (contactNumber.length === 0) {
      FormarrayErr.push("contactNumber");
      setcontactNumberErr("Contact number is required");
    } else if (!numberValidation.test(contactNumber)) {
      FormarrayErr.push("contactNumber Invalid");
      setcontactNumberErr("Phone number is invalid");
    }

    if (email.length === 0) {
      FormarrayErr.push("email");
      setemailErr("Email is required");
    } else if (
      email &&
      !new RegExp("@" + desiredDomain + "\\s*$").test(email)
    ) {
      FormarrayErr.push("email Invalid");
      setemailErr("Email is invalid");
    }

    if (GST_type.length === 0) {
      FormarrayErr.push("GST_type");
      setGST_typeErr("GST type is required");
    }

    if (
      (GST_No.length === 0 || GST_No === "N/A") &&
      GST_type === "Registered"
    ) {
      FormarrayErr.push("GST_No");
      setGST_NoErr("GST Number is required");
    } else if (!GSTValidation.test(GST_No) && GST_No !== "N/A") {
      FormarrayErr.push("GST_No Invalid");
      setGST_NoErr("GST Number is not valid");
    }

    if (!GST_Doc && GST_type === "Registered") {
      FormarrayErr.push("GST_Doc");
      setGST_DocErr("GST doc is required");
    }
    if (!fileDisclosure && GST_type === "UnRegistered") {
      FormarrayErr.push("fileDisclosure");
      setfileDisclosureErr("File Disclosure is required");
    }

    if (
      (PAN_No.length === 0 || PAN_No === "N/A") &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN"
    ) {
      FormarrayErr.push("PAN_No");
      setPAN_NoErr("Pan number is required");
    } else if (
      !PANValidation.test(PAN_No) &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN"
    ) {
      FormarrayErr.push("PAN_No Invalid");
      setPAN_NoErr("Pan number is not valid");
    }

    if (
      !PAN_Doc &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN" &&
      userStatus !== "NewRegistration"
    ) {
      FormarrayErr.push("PAN_Doc");
      setPAN_DocErr("Pan doc is required");
    }
    if (CIN_No.length === 0) {
      FormarrayErr.push("CIN_No");
      setCIN_NoErr("CIN number is required");
    }
    if (!form_10f && Country_Region_Code !== "IN") {
      FormarrayErr.push("form_10f");
      setform_10fErr("Form 10f is required");
    }
    if (MSME_status.length === 0) {
      FormarrayErr.push("MSME_status");
      setMSME_statusErr("MSME status is required");
    }
    if ((MSME_No.length === 0 || MSME_No === "N/A") && MSME_status === "1") {
      FormarrayErr.push("MSME_No");
      setMSME_NoErr("MSME number is required");
    }
    if (!MSME_Doc && MSME_status === "1") {
      FormarrayErr.push("MSME_Doc");
      setMSME_DocErr("MSME doc is required");
    }
    if (
      (MSME_Type.length === 0 || MSME_Type === "N/A") &&
      MSME_status === "1"
    ) {
      FormarrayErr.push("MSME_Type");
      setMSME_TypeErr("MSME type is required");
    }

    if (!Tax_residency && Country_Region_Code !== "IN") {
      FormarrayErr.push("Tax_residency");
      setTax_residencyErr("Tax residency is required");
    }
    if (!pe_declaration && Country_Region_Code !== "IN") {
      FormarrayErr.push("pe_declaration");
      setpe_declarationErr("PE declaration is required");
    }
    if (email && !new RegExp("@" + desiredDomain + "\\s*$").test(email)) {
      FormarrayErr.push("Email");
      setemailErr("Email is invalid");
    }
    const userId = props.userid;

    console.log("FormarrayErr######chandrasekaran##############", FormarrayErr);
    if (FormarrayErr.length === 0) {
      const data = new FormData();
      data.append("userId", props.userid);
      data.append("Address", Address);
      data.append("Address_2", Address_2);
      data.append("companyName", companyName);
      data.append("Country_Region_Code", Country_Region_Code);
      data.append("state", state);
      data.append("stateCode",stateCode);
      data.append("City", City);
      data.append("Post_Code", Post_Code);
      data.append("image", logo);
      data.append("Vendor_Type", vendorType);
      data.append("Vendor_Account_Manager", acManager);
      data.append("mkDenialCheque", mkcheck);
      data.append("financeSpoccontactName", fs_ContactName);
      data.append("financeSpocdesignation", fs_Designation);
      data.append("financeSpocphoneNo", fs_PhoneNo);
      data.append("financeSpocemail", fs_Email);
      data.append("operationSpoccontactName", ops_ContactName);
      data.append("operationSpocdesignation", ops_Designation);
      data.append("operationSpocphoneNo", ops_PhoneNo);
      data.append("operationSpocemail", ops_Email);
      data.append("collectionSpoccontactName", colls_ContactName);
      data.append("collectionSpocdesignation", colls_Designation);
      data.append("collectionSpocphoneNo", colls_PhoneNo);
      data.append("collectionSpocemail", colls_Email);
      data.append("managementSpoccontactName", mngs_ContactName);
      data.append("managementSpocdesignation", mngs_Designation);
      data.append("managementSpocphoneNo", mngs_PhoneNo);
      data.append("managementSpocemail", mngs_Email);
      data.append("contactName", others_ContactName);
      data.append("designation", others_Designation);
      data.append("phoneNo", others_PhoneNo);
      data.append("others_Email", others_Email);
      data.append("mastervendor_email", mastervendor_email);
      if (GST_type === "UnRegistered") {
        data.append("GST_Registration_No", "N/A");
        data.append("GST_Doc", "");

        data.append("fileDisclosure", fileDisclosure);

        data.append("P_A_N_No", PAN_No);
        data.append("PAN_Doc", PAN_Doc);
      } else if (GST_type === "Import") {
        data.append("GST_Registration_No", "N/A");
        data.append("GST_Doc", "");
        data.append("fileDisclosure", "");

        data.append("P_A_N_No", "N/A");
        data.append("PAN_Doc", "");
      } else {
        data.append("GST_Registration_No", GST_No);
        data.append("GST_Doc", GST_Doc);
        data.append("fileDisclosure", "");

        data.append("P_A_N_No", PAN_No);
        data.append("PAN_Doc", PAN_Doc);
      }
      data.append("RPD_Doc", RPD_Doc);
      data.append("NDA_Doc", NDA_Doc);
      data.append("COC_Doc", COC_Doc);
      data.append("GST_Vendor_Type", GST_type);

      data.append("form_10f_Doc", form_10f);
      data.append("TAN_Doc", TAN_Doc);
      data.append("PE_Declaration_Doc", pe_declaration);
      data.append("Tax_residency_Doc", Tax_residency);
      data.append("CIN_No", CIN_No);
      data.append("MSMED", MSME_status);
      if (MSME_status === "2") {
        data.append("MSMED_Number", "N/A");
        data.append("MSMED_Vendor_Type", "");
        data.append("MSME_Doc", "");

        // setMSME_No("N/A");
        // setMSME_Type("");
        // console.log("MSME statuse pe+++++++++++++++++")
        // setMSME_Doc("");
      } else {
        data.append("MSMED_Number", MSME_No);
        data.append("MSMED_Vendor_Type", MSME_Type);
        data.append("MSME_Doc", MSME_Doc);
      }

      data.append("TAN_No", TAN_No);
      data.append("financial_data", financial_data);
      data.append("financial_data2", financial_data2);
      data.append("yearOfAuditedFinancial", yearOfAuditedFinancial);
      data.append("Revenue", Revenue);
      data.append("Profit", Profit);
      data.append("netWorth", netWorth);
      data.append("currentAssets", currentAssets);
      data.append("directorDetails", directorDetails);
      data.append("organisationType", organisationType);
      data.append("shareholderName", shareholderName);
      data.append("Account_Holder_Name", bankAccountName);
      data.append("Bank_Name", bankName);
      data.append("Account_No", bankAccountNumber);
      data.append("IFSC_Code", ifscCode);
      data.append("MICRcode", MICRcode);
      data.append("Bank_Address", branchAddress);
      data.append("bankdetailDoc", bankdetailDoc);
      data.append("name", name);
      data.append("contactNumber", contactNumber);
      data.append("email", email);
      data.append("name2", name2);
      data.append("contactNumber2", contactNumber2);
      data.append("email2", email2);
      data.append("name3", name3);
      data.append("contactNumber3", contactNumber3);
      data.append("email3", email3);
      data.append("approverFile", approverFile);
      data.append("role", JSON.parse(window.sessionStorage.getItem("jwt")).result?.role);

      apiService.updateAllCollection(props.userid, data).then((response) => {
        console.log("data::");
      }).catch((error) => {
        handleApiError(error);
      });

      const userId = event;
      const data1 = new FormData();
      data1.append("userId", event);
      data1.append("level3Status", "approved");
      data1.append("level3Date", new Date());
      console.log("vendortype", Vendor_Type);
      console.log("acmanager::", Vendor_Account_Manager);
      const ERPData = {
        Refrence_Entry_No: TicketID || undefined,
        Vendor_Type: Vendor_Type || undefined,
        Name: companyName || undefined,
        Address: Address || undefined,
        Address_2: Address_2 || undefined,
        City: City || undefined,
        MSMED_Number: MSME_No || undefined,
        MSMED: MSME_status || undefined,
        MSMED_Vendor_Type: MSME_Type || undefined,
        Country_Region_Code: countryRegionCode || undefined,
        Post_Code: Post_Code || undefined,
        E_Mail: mastervendor_email || undefined,
        P_A_N_No: PAN_No || undefined,
        CIN_No: CIN_No || undefined,
        TAN_No: TAN_No || undefined,
        Vendor_Account_Manager: Vendor_Account_Manager || undefined,
        State_Code: stateCode || undefined,
        Contact: contactPerson || undefined,
      Phone_No:  phoneNumber || undefined,
        Finance_Contact_Name: fs_ContactName || undefined,
        Finance_Contact_Designation: fs_Designation || undefined,
        Finance_Contact_Phone_No: fs_PhoneNo || undefined,
        Finance_Contact_E_Mail: fs_Email || undefined,
        Operation_Contact_Name: ops_ContactName || undefined,
        Operation_Contact_Designation: ops_Designation || undefined,
        Operation_Contact_Phone_No: ops_PhoneNo || undefined,
        Operation_Contact_E_Mail: ops_Email || undefined,
        Collection_Contact_Name: colls_ContactName || undefined,
        Collection_Contact_Designation: colls_Designation || undefined,
        Collection_Contact_Phone_No: colls_PhoneNo || undefined,
        Collection_Contact_E_Mail: colls_Email || undefined,
        Management_Contact_Name: mngs_ContactName || undefined,
        Management_Contact_Designation: mngs_Designation || undefined,
        Management_Contact_Phone_No: mngs_PhoneNo || undefined,
        Management_Contact_E_Mail: mngs_Email || undefined,
        Others_Contact_Name: others_ContactName || undefined,
        Others_Contact_Designation: others_Designation || undefined,
        Others_Contact_Phone_No: others_PhoneNo || undefined,
        Others_Contact_E_Mail: others_Email || undefined,
        Master_Vendor_E_Mail_ID: mastervendor_email || undefined,
        MICR_Swift_Code: MICRcode || undefined,
        Year_of_audited_financials: yearOfAuditedFinancial || undefined,
        Revenue: Revenue || undefined,
        Profit: Profit || undefined,
        Networth: netWorth || undefined,
        Current_Assets: currentAssets || undefined,
        Director_Detail: directorDetails || undefined,
        GST_Registration_No: GST_No || undefined,
        GST_Vendor_Type: GST_type || undefined,
        Account_Holder_Name: bankAccountName || undefined,
        Account_No: bankAccountNumber || undefined,
        Bank_Name: bankName || undefined,
        Bank_Address: branchAddress || undefined,
        IFSC_Code: ifscCode || undefined,
        HSI_Contact_Name_1: name || undefined,
        HSI_Contact_E_Mail_1: email || undefined,
        HSI_Contact_No_1: contactNumber || undefined,
        HSI_Contact_Name_2: name2 || undefined,
        HSI_Contact_E_Mail_2: email2 || undefined,
        HSI_Contact_No_2: contactNumber2 || undefined,
        HSI_Contact_Name_3: name3 || undefined,
        HSI_Contact_E_Mail_3: email3 || undefined,
        HSI_Contact_No_3: contactNumber3 || undefined,
        Shareholder_Name: shareholderName || undefined,
        Organization_Type: organisationType || undefined,
      };
      const sharepointDocumentUpload = {
        Ticket_ID: TicketID,
        logo: logo,
        GST_Doc: GST_Doc,
        PAN_Doc: PAN_Doc,
        MSME_Doc: MSME_Doc,
        form_10f: form_10f,
        PE_Declaration_Doc: pe_declaration,
        Tax_residency_Doc: Tax_residency,
        fileDisclosure: fileDisclosure,
        TAN_Doc: TAN_Doc,
        RPD_Doc: RPD_Doc,
        COC_Doc: COC_Doc,
        NDA_Doc: NDA_Doc,
        financial_data: financial_data,
        financial_data2: financial_data2,
        bankdetailDoc: bankdetailDoc,
      };
      const MasterVendor = {
        mastervendor_email: mastervendor_email || undefined,
        companyName: companyName || undefined,
        Ticket_ID: TicketID || undefined,
        Country_Region_Code: countryRegionCode || undefined,
      };
      apiService
        .createsharepointFolderByTicketId(sharepointDocumentUpload)
        .then((response) => {
          console.log("Sharepointresponse::", response);
          if (response.data.message === "success") {
            apiService
              .postErpResourcePortalVendorlist(ERPData)
              .then((response) => {
                console.log("ERPData---->", ERPData);
                if (response && response.data.msg !== "error") {
                  if (response && !response.data.Result?.["odata.error"]) {
                    console.log("ErpResponse::", response);
                    const VendorCodeGenration = {
                      ticketID: TicketID || undefined,
                    };

                    apiService
                      .GenerateVendorCode(VendorCodeGenration)
                      .then((response) => {
                        console.log("vendorCodeGenerate::", response);
                      });
                    const MasterVendor = {
                      mastervendor_email: mastervendor_email || undefined,
                      companyName: companyName || undefined,
                      Ticket_ID: TicketID || undefined,
                      Country_Region_Code: countryRegionCode || undefined,
                    };
                    if (userStatus === "NewRegistration") {
console.log("NewRegistration::")
apiService
.updateApprovalStatus(userId, data1)
.then((responseData) => {
  if (responseData.data.status === "success") {
    Swal.fire({
      title: "Approved",
      icon: "success",
      confirmButtonText: "OK",
      showCloseButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        props.onMRTApprovalDone();
      }
    });
   
  } else {
    Swal.fire({
      title: responseData.data.message,
      icon: "error",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onMRTApprovalDone();
      }
    });
   
  }
}).catch((error) => {
  handleApiError(error);
});
                    }
                    else
                    {
                      apiService
                      .saveMasterLogin(MasterVendor)
                      .then((Masterresponse) => {
                        console.log("masterLogin::", Masterresponse);
                        apiService
                          .updateApprovalStatus(userId, data1)
                          .then((responseData) => {
                            if (responseData.data.status === "success") {
                              Swal.fire({
                                title: "Approved",
                                icon: "success",
                                confirmButtonText: "OK",
                                showCloseButton: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  props.onMRTApprovalDone();
                                }
                              });
                             
                            } else {
                              Swal.fire({
                                title: responseData.data.message,
                                icon: "error",
                                confirmButtonText: "OK",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  props.onMRTApprovalDone();
                                }
                              });
                             
                            }
                          }).catch((error) => {
                            handleApiError(error);
                          });
                      }).catch((error) => {
                        handleApiError(error);
                      });
                    }
                   
                  } else {
                    if (
                      response.data.Result?.["odata.error"]?.message?.value ===
                      "The record already exists."
                    ) {
                      //                   apiService.updateErpResourcePortalVendorlist(ERPData).then((updateresponse) => {

                      // console.log("updateresponse::")
                      //                   })
                      console.log("already exists::");
                      const UpdateMasterVendor = {
                        mastervendor_email: mastervendor_email || undefined,
                        companyName: companyName || undefined,
                        Ticket_ID: TicketID || undefined,
                        Country_Region_Code: countryRegionCode || undefined,
                      };
                      if (userStatus === "NewRegistration") {
                        console.log("NewRegistration::")
                        apiService
                        .updateApprovalStatus(userId, data1)
                        .then((responseData) => {
                          if (responseData.data.status === "success") {
                            Swal.fire({
                              title: responseData.data.message,
                              icon: "success",
                              confirmButtonText: "OK",
                              showCloseButton: false,
                              allowOutsideClick: false,
                              allowEscapeKey: false,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                props.onMRTApprovalDone();
                              }
                            });
                            
                          } else {
                            Swal.fire({
                              title: responseData.data.message,
                              icon: "error",
                              confirmButtonText: "OK",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                props.onMRTApprovalDone();
                              }
                            });
                          }
                        }).catch((error) => {
                          handleApiError(error);
                        });
                                            }
                                            else
                                            {
                                              apiService.updateErpResourcePortalVendorlist(TicketID,ERPData).then((Masterresponse) => {
                                                console.log("ErpDataupdates",Masterresponse);
                                                                        }).catch((error) => {
                                                                          handleApiError(error);
                                                                        });
                                              apiService
                                              .updateMasterLogin(UpdateMasterVendor)
                                              .then((Masterresponse) => {
                                                console.log("masterLogin::", Masterresponse);
                                                apiService
                                                  .updateApprovalStatus(userId, data1)
                                                  .then((responseData) => {
                                                    if (responseData.data.status === "success") {
                                                      Swal.fire({
                                                        title: responseData.data.message,
                                                        icon: "success",
                                                        confirmButtonText: "OK",
                                                        showCloseButton: false,
                                                        allowOutsideClick: false,
                                                        allowEscapeKey: false,
                                                      }).then((result) => {
                                                        if (result.isConfirmed) {
                                                          props.onMRTApprovalDone();
                                                        }
                                                      });
                                                      
                                                    } else {
                                                      Swal.fire({
                                                        title: responseData.data.message,
                                                        icon: "error",
                                                        confirmButtonText: "OK",
                                                      }).then((result) => {
                                                        if (result.isConfirmed) {
                                                          props.onMRTApprovalDone();
                                                        }
                                                      });
                                                    }
                                                  });
                                              }).catch((error) => {
                                                handleApiError(error);
                                              });
                                            }
                     
                    } else {
                      const errorMessage =
                        response.data.Result?.["odata.error"]?.message?.value ||
                        "An error occurred while processing the request.";
                      Swal.fire({
                        title: errorMessage
                          ? `In ERP, ${errorMessage}`
                          : "An error occurred while processing the request in ERP",
                        icon: "error",
                        confirmButtonText: "OK",
                        showCloseButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                      });
                    }
                  }
                } else {
                  const erpErrorResponse = response.data.error;
                  Swal.fire({
                    icon: "error",
                    title: `In ERP,${erpErrorResponse}`,
                    confirmButtonText: "OK",
                    showCloseButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                }
              }).catch((error) => {
                handleApiError(error);
              });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error in Fetching Api to Sharepoint",
              confirmButtonText: "OK",
              showCloseButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error in Fetching Api to Sharepoint",
            confirmButtonText: "OK",
            showCloseButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        });
    } else {
      Swal.fire({
        title: "Please fill the mandatory fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleMRTReject = (event) => {
    Swal.fire({
      heightAuto: true,
      title: "Review vendor details",
      html: `<div class="rejectstyle">
            <textarea rows="10" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
            <input type="file" id="rejectdoc" class="swal01-input" placeholder="Select file">
       </div> `,
      confirmButtonText: "Reject",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        const rejectdoc = Swal.getPopup().querySelector("#rejectdoc").files[0];
        if (!comment) {
          Swal.showValidationMessage(`Please enter comments`);
        } else {
          const data = new FormData();
          data.append("userId", event);
          data.append("level3Status", "rejected");
          data.append("level3RejectComment", comment);
          data.append("level3rejectFileDoc", rejectdoc);
          data.append("level3Date", new Date());
          const userId = event;
          apiService.updateApprovalStatus(userId, data).then((responseData) => {
            if (responseData.data.status === "success") {
              Swal.fire({
                title: "Rejected",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  props.onMRTApprovalDone();
                }
              });
              
            } else {
              Swal.fire({
                title: responseData.data.message,
                icon: "error",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  props.onMRTApprovalDone();
                }
              });
            }
          }).catch((error) => {
            handleApiError(error);
          });
        }
      },
    });
  };

  const handleApprove = (event) => {
    console.log("approvae click");
    // event.preventDefault();
    let FormarrayErr = [];
    if (companyName.length === 0) {
      FormarrayErr.push("companyName");
      setcompanyNameErr("Company name is required");
    }
    if (Address.length === 0) {
      FormarrayErr.push("Address");
      setaddress1Err("Address 1 is required");
    }
    if (Country_Region_Code.length === 0) {
      FormarrayErr.push("Country_Region_Code");
      setcountryErr("Country is required");
    }
    if (state.length === 0) {
      FormarrayErr.push("state");
      setstateErr("State is required");
    }
    if (City.length === 0) {
      FormarrayErr.push("City");
      setcityErr("City is required");
    }

    if (Post_Code.length === 0) {
      FormarrayErr.push("Post_Code");
      setpinCodeErr("Pincode is required");
    } else if (!numberValidation.test(Post_Code)) {
      // FormarrayErr.push("Post_Code Invalid")
      // setpinCodeErr("Pincode is Invalid");
    }

    // if (!logo) {
    //   FormarrayErr.push("logo")
    //   setlogoErr("Logo is required");
    //   console.log("hellossssssss", logoErr);
    // }
    if (fs_ContactName.length === 0) {
      FormarrayErr.push("fs_ContactName");
      setfs_ContactNameErr("Contact name is required");
    }
    if (fs_Designation.length === 0) {
      FormarrayErr.push("fs_Designation");
      setfs_DesignationErr("Designation is required");
    }

    if (fs_PhoneNo.length === 0) {
      FormarrayErr.push("fs_PhoneNo");
      setfs_PhoneNoErr("Phone number is required");
    } else if (!numberValidation.test(fs_PhoneNo)) {
      FormarrayErr.push("fs_PhoneNo Invalid");
      setfs_PhoneNoErr("Phone number is invalid");
    }

    if (fs_Email.length === 0) {
      FormarrayErr.push("fs_Email");
      setfs_EmailErr("Email is required");
    } else if (!emailValidation.test(fs_Email)) {
      FormarrayErr.push("fs_Email Invalid");
      setfs_EmailErr("Email is invalid");
    }


    if (mngs_ContactName.length === 0) {
      FormarrayErr.push("mngs_ContactName");
      setmngs_ContactNameErr("Contact name is required");
    }
    if (mngs_Designation.length === 0) {
      FormarrayErr.push("mngs_Designation");
      setmngs_DesignationErr("Designation is required");
    }

    if (mngs_PhoneNo.length === 0) {
      FormarrayErr.push("mngs_PhoneNo");
      setmngs_PhoneNoErr("Phone number is required");
    } else if (!numberValidation.test(mngs_PhoneNo)) {
      FormarrayErr.push("mngs_PhoneNo Invalid");
      setmngs_PhoneNoErr("Phone number is invalid");
    }

    if (mngs_Email.length === 0) {
      FormarrayErr.push("mngs_Email");
      setmngs_EmailErr("Email is required");
    } else if (!emailValidation.test(mngs_Email)) {
      FormarrayErr.push("mngs_Email Invalid");
      setmngs_EmailErr("Email is invalid");
    }

    if (mastervendor_email?.length === 0 && userStatus !== "NewRegistration") {
      FormarrayErr.push("mastervendor_email");
      setmastervendor_emailErr("Email is required");
    } else if (
      !emailValidation.test(mastervendor_email) &&
      userStatus !== "NewRegistration"
    ) {
      FormarrayErr.push("mastervendor_email Invalid");
      setmastervendor_emailErr("Email is invalid");
    }

    if (bankAccountName.length === 0) {
      FormarrayErr.push("bankAccountName");
      setbankAccountNameErr("Account name is required");
    }
    if (bankName.length === 0) {
      FormarrayErr.push("bankName");
      setbankNameErr("Bank name is required");
    }
    if (bankAccountNumber.length === 0) {
      FormarrayErr.push("bankAccountNumber");
      setbankAccountNumberErr("Account number is required");
    }
    if (ifscCode.length === 0) {
      FormarrayErr.push("ifscCode");
      setifscCodeErr("IFSC code is required");
    }
    if (MICRcode.length === 0) {
      FormarrayErr.push("MICRcode");
      setMICRcodeErr("MICR code is required");
    }
    if (branchAddress.length === 0) {
      FormarrayErr.push("branchAddress");
      setbranchAddressErr("Branch address is required");
    }
    if (!bankdetailDoc) {
      FormarrayErr.push("bankdetailDoc");
      setbankdetailDocErr("Bank document is required");
    }

    if (!RPD_Doc) {
      FormarrayErr.push("RPD_Doc");
      setRPD_DocErr("RPD document is required");
    }
    if (!COC_Doc) {
      FormarrayErr.push("COC_Doc");
      setCOC_DocErr("COC document is required");
    }
    if (!NDA_Doc) {
      FormarrayErr.push("NDA_Doc");
      setNDA_DocErr("NDA document is required");
    }

    if (name.length === 0) {
      FormarrayErr.push("name");
      setnameErr("Name is required");
    }

    if (contactNumber.length === 0) {
      FormarrayErr.push("contactNumber");
      setcontactNumberErr("Contact number is required");
    } else if (!numberValidation.test(contactNumber)) {
      FormarrayErr.push("contactNumber Invalid");
      setcontactNumberErr("Phone number is invalid");
    }

    if (email.length === 0) {
      FormarrayErr.push("email");
      setemailErr("Email is required");
    } else if (!emailValidation.test(email)) {
      FormarrayErr.push("email Invalid");
      setemailErr("Email is invalid");
    }

    if (vendorType.length === 0) {
      FormarrayErr.push("vendorType required");
      setvendorTypeErr("Vendor type is required");
    }
    if (acManager.length === 0) {
      FormarrayErr.push("acManager required");
      setacManagerErr("A/C manager is required");
    }
    if (mkcheck === false) {
      FormarrayErr.push("mkcheck required");
      setmkcheckErr("Check is required");
    }
    if (!approverFile) {
      FormarrayErr.push("approverFile required");
      setapproverFileErr("File is required");
    }

    if (GST_type.length === 0) {
      FormarrayErr.push("GST_type");
      setGST_typeErr("GST type is required");
    }

    if (
      (GST_No.length === 0 || GST_No === "N/A") &&
      GST_type === "Registered"
    ) {
      FormarrayErr.push("GST_No");
      setGST_NoErr("GST Number is required");
    } else if (!GSTValidation.test(GST_No) && GST_No !== "N/A") {
      FormarrayErr.push("GST_No Invalid");
      setGST_NoErr("GST Number is not valid");
    }

    if (!GST_Doc && GST_type === "Registered") {
      FormarrayErr.push("GST_Doc");
      setGST_DocErr("GST doc is required");
    }
    if (!fileDisclosure && GST_type === "UnRegistered") {
      FormarrayErr.push("fileDisclosure");
      setfileDisclosureErr("File Disclosure is required");
    }

    if (
      (PAN_No.length === 0 || PAN_No === "N/A") &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN"
    ) {
      FormarrayErr.push("PAN_No");
      setPAN_NoErr("Pan number is required");
    } else if (
      !PANValidation.test(PAN_No) &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN"
    ) {
      FormarrayErr.push("PAN_No Invalid");
      setPAN_NoErr("Pan number is not valid");
    }

    if (
      !PAN_Doc &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN" &&
      userStatus !== "NewRegistration"
    ) {
      FormarrayErr.push("PAN_Doc");
      setPAN_DocErr("Pan doc is required");
    }
    if (CIN_No.length === 0) {
      FormarrayErr.push("CIN_No");
      setCIN_NoErr("CIN number is required");
    }
    if (!form_10f && Country_Region_Code !== "IN") {
      FormarrayErr.push("form_10f");
      setform_10fErr("Form 10f is required");
    }
    if (MSME_status.length === 0) {
      FormarrayErr.push("MSME_status");
      setMSME_statusErr("MSME status is required");
    }
    if ((MSME_No.length === 0 || MSME_No === "N/A") && MSME_status === "1") {
      FormarrayErr.push("MSME_No");
      setMSME_NoErr("MSME number is required");
    }
    if (!MSME_Doc && MSME_status === "1") {
      FormarrayErr.push("MSME_Doc");
      setMSME_DocErr("MSME doc is required");
    }
    if (
      (MSME_Type.length === 0 || MSME_Type === "N/A") &&
      MSME_status === "1"
    ) {
      FormarrayErr.push("MSME_Type");
      setMSME_TypeErr("MSME type is required");
    }
    // if (TAN_No.length === 0) {
    //   setTAN_NoErr("TAN number is required");
    // }
    // if (!TAN_Doc) {
    //   setTAN_DocErr("TAN doc is required");
    // }
    if (!Tax_residency && Country_Region_Code !== "IN") {
      FormarrayErr.push("Tax_residency");
      setTax_residencyErr("Tax residency is required");
    }
    if (!pe_declaration && Country_Region_Code !== "IN") {
      FormarrayErr.push("pe_declaration");
      setpe_declarationErr("PE declaration is required");
    }
    if (email && !new RegExp("@" + desiredDomain + "\\s*$").test(email)) {
      FormarrayErr.push("Email");
      setemailErr("Email is invalid");
    }
    const userId = props.userid;

    console.log("FormarrayErr######chandrasekaran##############", FormarrayErr);
    if (FormarrayErr.length === 0) {
      const data = new FormData();
      data.append("userId", props.userid);
      data.append("Address", Address);
      data.append("Address_2", Address_2);
      data.append("companyName", companyName);
      data.append("Country_Region_Code", Country_Region_Code);
      data.append("state", state);
      data.append("stateCode",stateCode);
      data.append("City", City);
      data.append("Post_Code", Post_Code);
      data.append("image", logo);
      data.append("Vendor_Type", vendorType);
      data.append("Vendor_Account_Manager", acManager);
      data.append("mkDenialCheque", mkcheck);
      data.append("financeSpoccontactName", fs_ContactName);
      data.append("financeSpocdesignation", fs_Designation);
      data.append("financeSpocphoneNo", fs_PhoneNo);
      data.append("financeSpocemail", fs_Email);
      data.append("operationSpoccontactName", ops_ContactName);
      data.append("operationSpocdesignation", ops_Designation);
      data.append("operationSpocphoneNo", ops_PhoneNo);
      data.append("operationSpocemail", ops_Email);
      data.append("collectionSpoccontactName", colls_ContactName);
      data.append("collectionSpocdesignation", colls_Designation);
      data.append("collectionSpocphoneNo", colls_PhoneNo);
      data.append("collectionSpocemail", colls_Email);
      data.append("managementSpoccontactName", mngs_ContactName);
      data.append("managementSpocdesignation", mngs_Designation);
      data.append("managementSpocphoneNo", mngs_PhoneNo);
      data.append("managementSpocemail", mngs_Email);
      data.append("contactName", others_ContactName);
      data.append("designation", others_Designation);
      data.append("phoneNo", others_PhoneNo);
      data.append("others_Email", others_Email);
      data.append("mastervendor_email", mastervendor_email);
      if (GST_type === "UnRegistered") {
        data.append("GST_Registration_No", "N/A");
        data.append("GST_Doc", "");

        data.append("fileDisclosure", fileDisclosure);

        data.append("P_A_N_No", PAN_No);
        data.append("PAN_Doc", PAN_Doc);
      } else if (GST_type === "Import") {
        data.append("GST_Registration_No", "N/A");
        data.append("GST_Doc", "");
        data.append("fileDisclosure", "");

        data.append("P_A_N_No", "N/A");
        data.append("PAN_Doc", "");

      } else {
        data.append("GST_Registration_No", GST_No);
        data.append("GST_Doc", GST_Doc);
        data.append("fileDisclosure", "");

        data.append("P_A_N_No", PAN_No);
        data.append("PAN_Doc", PAN_Doc);
      }
      data.append("RPD_Doc", RPD_Doc);
      data.append("NDA_Doc", NDA_Doc);
      data.append("COC_Doc", COC_Doc);
      data.append("GST_Vendor_Type", GST_type);

      data.append("form_10f_Doc", form_10f);
      data.append("TAN_Doc", TAN_Doc);
      data.append("PE_Declaration_Doc", pe_declaration);
      data.append("Tax_residency_Doc", Tax_residency);
      data.append("CIN_No", CIN_No);
      data.append("MSMED", MSME_status);
      if (MSME_status === "2") {
        data.append("MSMED_Number", "N/A");
        data.append("MSMED_Vendor_Type", "");
        data.append("MSME_Doc", "");
      } else {
        data.append("MSMED_Number", MSME_No);
        data.append("MSMED_Vendor_Type", MSME_Type);
        data.append("MSME_Doc", MSME_Doc);
      }

      data.append("TAN_No", TAN_No);
      data.append("financial_data", financial_data);
      data.append("financial_data2", financial_data2);
      data.append("yearOfAuditedFinancial", yearOfAuditedFinancial);
      data.append("Revenue", Revenue);
      data.append("Profit", Profit);
      data.append("netWorth", netWorth);
      data.append("currentAssets", currentAssets);
      data.append("directorDetails", directorDetails);
      data.append("organisationType", organisationType);
      data.append("shareholderName", shareholderName);
      data.append("Account_Holder_Name", bankAccountName);
      data.append("Bank_Name", bankName);
      data.append("Account_No", bankAccountNumber);
      data.append("IFSC_Code", ifscCode);
      data.append("MICRcode", MICRcode);
      data.append("Bank_Address", branchAddress);
      data.append("bankdetailDoc", bankdetailDoc);
      data.append("name", name);
      data.append("contactNumber", contactNumber);
      data.append("email", email);
      data.append("name2", name2);
      data.append("contactNumber2", contactNumber2);
      data.append("email2", email2);
      data.append("name3", name3);
      data.append("contactNumber3", contactNumber3);
      data.append("email3", email3);
      data.append("approverFile", approverFile);

      apiService.updateAllCollection(props.userid, data).then((response) => {}).catch((error) => {
        handleApiError(error);
      });

      const data1 = new FormData();
      data1.append("level1Status", "approved");
      data1.append("userId", event);
      apiService.saveApproval(data1).then((responseData) => {
        if (responseData.data.status === "success") {
          Swal.fire({
            title: "Approved",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              props.onApprovalDone();
            }
          });
          
        } else {
          Swal.fire({
            title: responseData.data.message,
            icon: "error",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              props.onApprovalDone();
            }
          });
          
        }
      }).catch((error) => {
        handleApiError(error);
      });
    } else {
      Swal.fire({
        title: "Please fill the mandatory fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRegject = (event) => {
    Swal.fire({
      heightAuto: true,
      title: "Review vendor details",
      html: `<div class="rejectstyle">
            <textarea rows="10" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
            <input type="file" id="rejectdoc" class="swal01-input" placeholder="Select file">
       </div> `,
      confirmButtonText: "Reject",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        const rejectdoc = Swal.getPopup().querySelector("#rejectdoc").files[0];
        if (!comment) {
          Swal.showValidationMessage(`Please enter comments`);
        } else {
          const data = new FormData();
          data.append("userId", event);
          data.append("level1Status", "rejected");
          data.append("level1RejectComment", comment);
          data.append("level1rejectFileDoc", rejectdoc);

          apiService.saveApproval(data).then((responseData) => {
            if (responseData.data.status === "success") {
              Swal.fire({
                title: "Rejected",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  props.onApprovalDone();
                }
              });
              
            } else {
              Swal.fire({
                title: responseData.data.message,
                icon: "error",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  props.onApprovalDone();
                }
              });
            }
          }).catch((error) => {
            handleApiError(error);
          });
        }
      },
    });
  };

  const submitHandler = (e, team) => {
    e.preventDefault();
    let FormarrayErr = [];
    if (companyName.length === 0) {
      FormarrayErr.push("companyName");
      setcompanyNameErr("Company name is required");
    }
    if (Address.length === 0) {
      FormarrayErr.push("Address");
      setaddress1Err("Address 1 is required");
    }
    if (Country_Region_Code.length === 0) {
      FormarrayErr.push("Country_Region_Code");
      setcountryErr("Country is required");
    }
    if (state.length === 0) {
      FormarrayErr.push("state");
      setstateErr("State is required");
    }
    if (City.length === 0) {
      FormarrayErr.push("City");
      setcityErr("City is required");
    }

    if (Post_Code.length === 0) {
      FormarrayErr.push("Post_Code");
      setpinCodeErr("Pincode is required");
    } else if (!numberValidation.test(Post_Code)) {

    }

    if (fs_ContactName.length === 0) {
      FormarrayErr.push("fs_ContactName");
      setfs_ContactNameErr("Contact name is required");
    }
    if (fs_Designation.length === 0) {
      FormarrayErr.push("fs_Designation");
      setfs_DesignationErr("Designation is required");
    }

    if (fs_PhoneNo.length === 0) {
      FormarrayErr.push("fs_PhoneNo");
      setfs_PhoneNoErr("Phone number is required");
    } else if (!numberValidation.test(fs_PhoneNo)) {
      FormarrayErr.push("fs_PhoneNo Invalid");
      setfs_PhoneNoErr("Phone number is invalid");
    }

    if (fs_Email.length === 0) {
      FormarrayErr.push("fs_Email");
      setfs_EmailErr("Email is required");
    } else if (!emailValidation.test(fs_Email)) {
      FormarrayErr.push("fs_Email Invalid");
      setfs_EmailErr("Email is invalid");
    }


    if (mngs_ContactName.length === 0) {
      FormarrayErr.push("mngs_ContactName");
      setmngs_ContactNameErr("Contact name is required");
    }
    if (mngs_Designation.length === 0) {
      FormarrayErr.push("mngs_Designation");
      setmngs_DesignationErr("Designation is required");
    }

    if (mngs_PhoneNo.length === 0) {
      FormarrayErr.push("mngs_PhoneNo");
      setmngs_PhoneNoErr("Phone number is required");
    } else if (!numberValidation.test(mngs_PhoneNo)) {
      FormarrayErr.push("mngs_PhoneNo Invalid");
      setmngs_PhoneNoErr("Phone number is invalid");
    }

    if (mngs_Email.length === 0) {
      FormarrayErr.push("mngs_Email");
      setmngs_EmailErr("Email is required");
    } else if (!emailValidation.test(mngs_Email)) {
      FormarrayErr.push("mngs_Email Invalid");
      setmngs_EmailErr("Email is invalid");
    }

    if (mastervendor_email?.length === 0 && userStatus !== "NewRegistration") {
      FormarrayErr.push("mastervendor_email");
      setmastervendor_emailErr("Email is required");
    } else if (
      !emailValidation.test(mastervendor_email) &&
      userStatus !== "NewRegistration"
    ) {
      FormarrayErr.push("mastervendor_email Invalid");
      setmastervendor_emailErr("Email is invalid");
    }

    if (bankAccountName.length === 0) {
      FormarrayErr.push("bankAccountName");
      setbankAccountNameErr("Account name is required");
    }
    if (bankName.length === 0) {
      FormarrayErr.push("bankName");
      setbankNameErr("Bank name is required");
    }
    if (bankAccountNumber.length === 0) {
      FormarrayErr.push("bankAccountNumber");
      setbankAccountNumberErr("Account number is required");
    }
    if (ifscCode.length === 0) {
      FormarrayErr.push("ifscCode");
      setifscCodeErr("IFSC code is required");
    }
    if (MICRcode.length === 0) {
      FormarrayErr.push("MICRcode");
      setMICRcodeErr("MICR code is required");
    }
    if (branchAddress.length === 0) {
      FormarrayErr.push("branchAddress");
      setbranchAddressErr("Branch address is required");
    }
    if (!bankdetailDoc) {
      FormarrayErr.push("bankdetailDoc");
      setbankdetailDocErr("Bank document is required");
    }

    if (!RPD_Doc) {
      FormarrayErr.push("RPD_Doc");
      setRPD_DocErr("RPD document is required");
    }
    if (!COC_Doc) {
      FormarrayErr.push("COC_Doc");
      setCOC_DocErr("COC document is required");
    }
    if (!NDA_Doc) {
      FormarrayErr.push("NDA_Doc");
      setNDA_DocErr("NDA document is required");
    }

    if (name.length === 0) {
      FormarrayErr.push("name");
      setnameErr("Name is required");
    }

    if (contactNumber.length === 0) {
      FormarrayErr.push("contactNumber");
      setcontactNumberErr("Contact number is required");
    } else if (!numberValidation.test(contactNumber)) {
      FormarrayErr.push("contactNumber Invalid");
      setcontactNumberErr("Phone number is invalid");
    }

    if (email.length === 0) {
      FormarrayErr.push("email");
      setemailErr("Email is required");
    } else if (!emailValidation.test(email)) {
      FormarrayErr.push("email Invalid");
      setemailErr("Email is invalid");
    }

 

    if (GST_type.length === 0) {
      FormarrayErr.push("GST_type");
      setGST_typeErr("GST type is required");
    }

    if (
      (GST_No.length === 0 || GST_No === "N/A") &&
      GST_type === "Registered"
    ) {
      FormarrayErr.push("GST_No");
      setGST_NoErr("GST Number is required");
    } else if (!GSTValidation.test(GST_No) && GST_No !== "N/A") {
      FormarrayErr.push("GST_No Invalid");
      setGST_NoErr("GST Number is not valid");
    }

    if (!GST_Doc && GST_type === "Registered") {
      FormarrayErr.push("GST_Doc");
      setGST_DocErr("GST doc is required");
    }
    if (!fileDisclosure && GST_type === "UnRegistered") {
      FormarrayErr.push("fileDisclosure");
      setfileDisclosureErr("File Disclosure is required");
    }
    console.log("PAN_No****************************", PAN_No);
    console.log("PAN_Doc****************************", PAN_Doc);
    if (
      (PAN_No.length === 0 || PAN_No === "N/A") &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN"
    ) {
      FormarrayErr.push("PAN_No");
      setPAN_NoErr("Pan number is required");
    } else if (
      !PANValidation.test(PAN_No) &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN"
    ) {
      FormarrayErr.push("PAN_No Invalid");
      setPAN_NoErr("Pan number is not valid");
    }

    if (
      !PAN_Doc &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN" &&
      userStatus !== "NewRegistration"
    ) {
      FormarrayErr.push("PAN_Doc");
      setPAN_DocErr("Pan doc is required");
    }
    if (CIN_No.length === 0) {
      FormarrayErr.push("CIN_No");
      setCIN_NoErr("CIN number is required");
    }
    if (!form_10f && Country_Region_Code !== "IN") {
      FormarrayErr.push("form_10f");
      setform_10fErr("Form 10f is required");
    }
    if (MSME_status.length === 0) {
      FormarrayErr.push("MSME_status");
      setMSME_statusErr("MSME status is required");
    }
    if ((MSME_No.length === 0 || MSME_No === "N/A") && MSME_status === "1") {
      FormarrayErr.push("MSME_No");
      setMSME_NoErr("MSME number is required");
    }
    if (!MSME_Doc && MSME_status === "1") {
      FormarrayErr.push("MSME_Doc");
      setMSME_DocErr("MSME doc is required");
    }
    if (
      (MSME_Type.length === 0 || MSME_Type === "N/A") &&
      MSME_status === "1"
    ) {
      FormarrayErr.push("MSME_Type");
      setMSME_TypeErr("MSME type is required");
    }
 
    if (!Tax_residency && Country_Region_Code !== "IN") {
      FormarrayErr.push("Tax_residency");
      setTax_residencyErr("Tax residency is required");
    }
    if (!pe_declaration && Country_Region_Code !== "IN") {
      FormarrayErr.push("pe_declaration");
      setpe_declarationErr("PE declaration is required");
    }
    if (email && !new RegExp("@" + desiredDomain + "\\s*$").test(email)) {
      FormarrayErr.push("Email");
      setemailErr("Email is invalid");
    }
    const userId = props.userid;

    console.log("FormarrayErr######chandrasekaran##############", FormarrayErr);
    if (FormarrayErr.length === 0) {
      const data = new FormData();
      data.append("userId", props.userid);
      data.append("Address", Address);
      data.append("Address_2", Address_2);
      data.append("companyName", companyName);
      data.append("Country_Region_Code", Country_Region_Code);
      data.append("state", state);
      data.append("stateCode",stateCode);
      data.append("City", City);
      data.append("Post_Code", Post_Code);
      data.append("image", logo);
      data.append("Vendor_Type", vendorType);
      data.append("Vendor_Account_Manager", acManager);
      data.append("mkDenialCheque", mkcheck);
      data.append("financeSpoccontactName", fs_ContactName);
      data.append("financeSpocdesignation", fs_Designation);
      data.append("financeSpocphoneNo", fs_PhoneNo);
      data.append("financeSpocemail", fs_Email);
      data.append("operationSpoccontactName", ops_ContactName);
      data.append("operationSpocdesignation", ops_Designation);
      data.append("operationSpocphoneNo", ops_PhoneNo);
      data.append("operationSpocemail", ops_Email);
      data.append("collectionSpoccontactName", colls_ContactName);
      data.append("collectionSpocdesignation", colls_Designation);
      data.append("collectionSpocphoneNo", colls_PhoneNo);
      data.append("collectionSpocemail", colls_Email);
      data.append("managementSpoccontactName", mngs_ContactName);
      data.append("managementSpocdesignation", mngs_Designation);
      data.append("managementSpocphoneNo", mngs_PhoneNo);
      data.append("managementSpocemail", mngs_Email);
      data.append("contactName", others_ContactName);
      data.append("designation", others_Designation);
      data.append("phoneNo", others_PhoneNo);
      data.append("others_Email", others_Email);
      data.append("mastervendor_email", mastervendor_email);
      if (GST_type === "UnRegistered") {
        data.append("GST_Registration_No", "N/A");
        data.append("GST_Doc", "");

        data.append("fileDisclosure", fileDisclosure);

        data.append("P_A_N_No", PAN_No);
        data.append("PAN_Doc", PAN_Doc);
      }
      if (GST_type === "Import") {
        data.append("GST_Registration_No", "N/A");
        data.append("GST_Doc", "");
        data.append("fileDisclosure", "");

        data.append("P_A_N_No", "N/A");
        data.append("PAN_Doc", "");
      }
      if (GST_type === "Registered") {
        data.append("GST_Registration_No", GST_No);
        data.append("GST_Doc", GST_Doc);
        data.append("fileDisclosure", "");

        data.append("P_A_N_No", PAN_No);
        data.append("PAN_Doc", PAN_Doc);
      }
      data.append("RPD_Doc", RPD_Doc);
      data.append("NDA_Doc", NDA_Doc);
      data.append("COC_Doc", COC_Doc);
      data.append("GST_Vendor_Type", GST_type);

      data.append("form_10f_Doc", form_10f);
      data.append("TAN_Doc", TAN_Doc);
      data.append("PE_Declaration_Doc", pe_declaration);
      data.append("Tax_residency_Doc", Tax_residency);
      data.append("CIN_No", CIN_No);
      data.append("MSMED", MSME_status);
      if (MSME_status === "2") {
        data.append("MSMED_Number", "N/A");
        data.append("MSMED_Vendor_Type", "");
        data.append("MSME_Doc", "");

        // setMSME_No("N/A");
        // setMSME_Type("");
        // console.log("MSME statuse pe+++++++++++++++++")
        // setMSME_Doc("");
      } else {
        data.append("MSMED_Number", MSME_No);
        data.append("MSMED_Vendor_Type", MSME_Type);
        data.append("MSME_Doc", MSME_Doc);
      }
      console.log("financial_data", financial_data);
      data.append("TAN_No", TAN_No);
      data.append("financial_data", financial_data);
      data.append("financial_data2", financial_data2);
      data.append("yearOfAuditedFinancial", yearOfAuditedFinancial);
      data.append("Revenue", Revenue);
      data.append("Profit", Profit);
      data.append("netWorth", netWorth);
      data.append("currentAssets", currentAssets);
      data.append("directorDetails", directorDetails);
      data.append("organisationType", organisationType);
      data.append("shareholderName", shareholderName);
      data.append("Account_Holder_Name", bankAccountName);
      data.append("Bank_Name", bankName);
      data.append("Account_No", bankAccountNumber);
      data.append("IFSC_Code", ifscCode);
      data.append("MICRcode", MICRcode);
      data.append("Bank_Address", branchAddress);
      data.append("bankdetailDoc", bankdetailDoc);
      data.append("name", name);
      data.append("contactNumber", contactNumber);
      data.append("email", email);
      data.append("name2", name2);
      data.append("contactNumber2", contactNumber2);
      data.append("email2", email2);
      data.append("name3", name3);
      data.append("contactNumber3", contactNumber3);
      data.append("email3", email3);
      data.append("approverFile", approverFile);

      for (var pair of data.entries()) {
        console.log(
          "test------------->>>>>>>>>>>>>>>>>>",
          pair[0] + ", " + pair[1]
        );
      }

      apiService.updateAllCollection(userId, data).then((response) => {
        console.log("res=============>>>>>>>", response);
        if (response) {
          reload();
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
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
      Swal.fire({
        title: "Please fill the mandatory fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const submitMRTHandler = (e, team) => {
    console.log("Vendor_Type::",Vendor_Type);
    e.preventDefault();
    let FormarrayErr = [];
    if (companyName.length === 0) {
      FormarrayErr.push("companyName");
      setcompanyNameErr("Company name is required");
    }
    if (Address.length === 0) {
      FormarrayErr.push("Address");
      setaddress1Err("Address 1 is required");
    }
    if (Country_Region_Code.length === 0) {
      FormarrayErr.push("Country_Region_Code");
      setcountryErr("Country is required");
    }
    if (state.length === 0) {
      FormarrayErr.push("state");
      setstateErr("State is required");
    }
    if (City.length === 0) {
      FormarrayErr.push("City");
      setcityErr("City is required");
    }

    if (Post_Code.length === 0) {
      FormarrayErr.push("Post_Code");
      setpinCodeErr("Pincode is required");
    } else if (!numberValidation.test(Post_Code)) {
      // FormarrayErr.push("Post_Code Invalid")
      // setpinCodeErr("Pincode is Invalid");
    }

    // if (!logo) {
    //   FormarrayErr.push("logo")
    //   setlogoErr("Logo is required");
    //   console.log("hellossssssss", logoErr);
    // }
    if (fs_ContactName.length === 0) {
      FormarrayErr.push("fs_ContactName");
      setfs_ContactNameErr("Contact name is required");
    }
    if (fs_Designation.length === 0) {
      FormarrayErr.push("fs_Designation");
      setfs_DesignationErr("Designation is required");
    }

    if (fs_PhoneNo.length === 0) {
      FormarrayErr.push("fs_PhoneNo");
      setfs_PhoneNoErr("Phone number is required");
    } else if (!numberValidation.test(fs_PhoneNo)) {
      FormarrayErr.push("fs_PhoneNo Invalid");
      setfs_PhoneNoErr("Phone number is invalid");
    }

    if (fs_Email.length === 0) {
      FormarrayErr.push("fs_Email");
      setfs_EmailErr("Email is required");
    } else if (!emailValidation.test(fs_Email)) {
      FormarrayErr.push("fs_Email Invalid");
      setfs_EmailErr("Email is invalid");
    }
    // console.log("fs_Email",fs_Email);
    // console.log("mngs_ContactName",mngs_ContactName);
    // console.log("mngs_Designation",mngs_Designation);
    // console.log("mngs_PhoneNo",mngs_PhoneNo);
    // console.log("mngs_Email",mngs_Email);
    // console.log("mastervendor_email",mastervendor_email);

    if (mngs_ContactName.length === 0) {
      FormarrayErr.push("mngs_ContactName");
      setmngs_ContactNameErr("Contact name is required");
    }
    if (mngs_Designation.length === 0) {
      FormarrayErr.push("mngs_Designation");
      setmngs_DesignationErr("Designation is required");
    }

    if (mngs_PhoneNo.length === 0) {
      FormarrayErr.push("mngs_PhoneNo");
      setmngs_PhoneNoErr("Phone number is required");
    } else if (!numberValidation.test(mngs_PhoneNo)) {
      FormarrayErr.push("mngs_PhoneNo Invalid");
      setmngs_PhoneNoErr("Phone number is invalid");
    }

    if (mngs_Email.length === 0) {
      FormarrayErr.push("mngs_Email");
      setmngs_EmailErr("Email is required");
    } else if (!emailValidation.test(mngs_Email)) {
      FormarrayErr.push("mngs_Email Invalid");
      setmngs_EmailErr("Email is invalid");
    }

    if (mastervendor_email?.length === 0 && userStatus !== "NewRegistration") {
      FormarrayErr.push("mastervendor_email");
      setmastervendor_emailErr("Email is required");
    } else if (
      !emailValidation.test(mastervendor_email) &&
      userStatus !== "NewRegistration"
    ) {
      FormarrayErr.push("mastervendor_email Invalid");
      setmastervendor_emailErr("Email is invalid");
    }

    if (bankAccountName.length === 0) {
      FormarrayErr.push("bankAccountName");
      setbankAccountNameErr("Account name is required");
    }
    if (bankName.length === 0) {
      FormarrayErr.push("bankName");
      setbankNameErr("Bank name is required");
    }
    if (bankAccountNumber.length === 0) {
      FormarrayErr.push("bankAccountNumber");
      setbankAccountNumberErr("Account number is required");
    }
    if (ifscCode.length === 0) {
      FormarrayErr.push("ifscCode");
      setifscCodeErr("IFSC code is required");
    }
    if (MICRcode.length === 0) {
      FormarrayErr.push("MICRcode");
      setMICRcodeErr("MICR code is required");
    }
    if (branchAddress.length === 0) {
      FormarrayErr.push("branchAddress");
      setbranchAddressErr("Branch address is required");
    }
    if (!bankdetailDoc) {
      FormarrayErr.push("bankdetailDoc");
      setbankdetailDocErr("Bank document is required");
    }

    if (!RPD_Doc) {
      FormarrayErr.push("RPD_Doc");
      setRPD_DocErr("RPD document is required");
    }
    if (!COC_Doc) {
      FormarrayErr.push("COC_Doc");
      setCOC_DocErr("COC document is required");
    }
    if (!NDA_Doc) {
      FormarrayErr.push("NDA_Doc");
      setNDA_DocErr("NDA document is required");
    }

    if (name.length === 0) {
      FormarrayErr.push("name");
      setnameErr("Name is required");
    }

    if (contactNumber.length === 0) {
      FormarrayErr.push("contactNumber");
      setcontactNumberErr("Contact number is required");
    } else if (!numberValidation.test(contactNumber)) {
      FormarrayErr.push("contactNumber Invalid");
      setcontactNumberErr("Phone number is invalid");
    }

    if (email.length === 0) {
      FormarrayErr.push("email");
      setemailErr("Email is required");
    } else if (!emailValidation.test(email)) {
      FormarrayErr.push("email Invalid");
      setemailErr("Email is invalid");
    }

    // if (vendorType.length === 0) {
    //   setvendorTypeErr("Vendor type is required");
    // }
    // if (acManager.length === 0) {
    //   setacManagerErr("A/C manager is required");
    // }
    // if (mkcheck === false) {
    //   setmkcheckErr("Check is required");
    // }

    if (GST_type.length === 0) {
      FormarrayErr.push("GST_type");
      setGST_typeErr("GST type is required");
    }

    if (
      (GST_No.length === 0 || GST_No === "N/A") &&
      GST_type === "Registered"
    ) {
      FormarrayErr.push("GST_No");
      setGST_NoErr("GST Number is required");
    } else if (!GSTValidation.test(GST_No) && GST_No !== "N/A") {
      FormarrayErr.push("GST_No Invalid");
      setGST_NoErr("GST Number is not valid");
    }

    if (!GST_Doc && GST_type === "Registered") {
      FormarrayErr.push("GST_Doc");
      setGST_DocErr("GST doc is required");
    }
    if (!fileDisclosure && GST_type === "UnRegistered") {
      FormarrayErr.push("fileDisclosure");
      setfileDisclosureErr("File Disclosure is required");
    }

    if (
      (PAN_No.length === 0 || PAN_No === "N/A") &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN"
    ) {
      FormarrayErr.push("PAN_No");
      setPAN_NoErr("Pan number is required");
    } else if (
      !PANValidation.test(PAN_No) &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN"
    ) {
      FormarrayErr.push("PAN_No Invalid");
      setPAN_NoErr("Pan number is not valid");
    }

    if (
      !PAN_Doc &&
      GST_type !== "Import" &&
      Country_Region_Code === "IN" &&
      userStatus !== "NewRegistration"
    ) {
      FormarrayErr.push("PAN_Doc");
      setPAN_DocErr("Pan doc is required");
    }
    if (CIN_No.length === 0) {
      FormarrayErr.push("CIN_No");
      setCIN_NoErr("CIN number is required");
    }
    if (!form_10f && Country_Region_Code !== "IN") {
      FormarrayErr.push("form_10f");
      setform_10fErr("Form 10f is required");
    }
    if (MSME_status.length === 0) {
      FormarrayErr.push("MSME_status");
      setMSME_statusErr("MSME status is required");
    }
    if ((MSME_No.length === 0 || MSME_No === "N/A") && MSME_status === "1") {
      FormarrayErr.push("MSME_No");
      setMSME_NoErr("MSME number is required");
    }
    if (!MSME_Doc && MSME_status === "1") {
      FormarrayErr.push("MSME_Doc");
      setMSME_DocErr("MSME doc is required");
    }
    if (
      (MSME_Type.length === 0 || MSME_Type === "N/A") &&
      MSME_status === "1"
    ) {
      FormarrayErr.push("MSME_Type");
      setMSME_TypeErr("MSME type is required");
    }
    // if (TAN_No.length === 0) {
    //   setTAN_NoErr("TAN number is required");
    // }
    // if (!TAN_Doc) {
    //   setTAN_DocErr("TAN doc is required");
    // }
    if (!Tax_residency && Country_Region_Code !== "IN") {
      FormarrayErr.push("Tax_residency");
      setTax_residencyErr("Tax residency is required");
    }
    if (!pe_declaration && Country_Region_Code !== "IN") {
      FormarrayErr.push("pe_declaration");
      setpe_declarationErr("PE declaration is required");
    }
    if (email && !new RegExp("@" + desiredDomain + "\\s*$").test(email)) {
      FormarrayErr.push("Email");
      setemailErr("Email is invalid");
    }
    const userId = props.userid;

    console.log("FormarrayErr######chandrasekaran##############", FormarrayErr);
    if (FormarrayErr.length === 0) {
      const data = new FormData();
      data.append("role", JSON.parse(window.sessionStorage.getItem("jwt")).result?.role);
      data.append("userId", props.userid);
      data.append("Address", Address);
      data.append("Address_2", Address_2);
      data.append("companyName", companyName);
      data.append("Country_Region_Code", Country_Region_Code);
      data.append("state", state);
      data.append("stateCode",stateCode);
      data.append("City", City);
      data.append("Post_Code", Post_Code);
      data.append("image", logo);
      data.append("Vendor_Type", Vendor_Type);
      data.append("Vendor_Account_Manager",Vendor_Account_Manager);
      data.append("mkDenialCheque", mkcheck);
      data.append("financeSpoccontactName", fs_ContactName);
      data.append("financeSpocdesignation", fs_Designation);
      data.append("financeSpocphoneNo", fs_PhoneNo);
      data.append("financeSpocemail", fs_Email);
      data.append("operationSpoccontactName", ops_ContactName);
      data.append("operationSpocdesignation", ops_Designation);
      data.append("operationSpocphoneNo", ops_PhoneNo);
      data.append("operationSpocemail", ops_Email);
      data.append("collectionSpoccontactName", colls_ContactName);
      data.append("collectionSpocdesignation", colls_Designation);
      data.append("collectionSpocphoneNo", colls_PhoneNo);
      data.append("collectionSpocemail", colls_Email);
      data.append("managementSpoccontactName", mngs_ContactName);
      data.append("managementSpocdesignation", mngs_Designation);
      data.append("managementSpocphoneNo", mngs_PhoneNo);
      data.append("managementSpocemail", mngs_Email);
      data.append("contactName", others_ContactName);
      data.append("designation", others_Designation);
      data.append("phoneNo", others_PhoneNo);
      data.append("others_Email", others_Email);
      data.append("mastervendor_email", mastervendor_email);

      data.append("TAN_No", TAN_No);
      data.append("financial_data", financial_data);
      data.append("financial_data2", financial_data2);
      data.append("yearOfAuditedFinancial", yearOfAuditedFinancial);
      data.append("Revenue", Revenue);
      data.append("Profit", Profit);
      data.append("netWorth", netWorth);
      data.append("currentAssets", currentAssets);
      data.append("directorDetails", directorDetails);
      data.append("organisationType", organisationType);
      data.append("shareholderName", shareholderName);
      data.append("Account_Holder_Name", bankAccountName);
      data.append("Bank_Name", bankName);
      data.append("Account_No", bankAccountNumber);
      data.append("IFSC_Code", ifscCode);
      data.append("MICRcode", MICRcode);
      data.append("Bank_Address", branchAddress);
      data.append("bankdetailDoc", bankdetailDoc);
      data.append("name", name);
      data.append("contactNumber", contactNumber);
      data.append("email", email);
      data.append("name2", name2);
      data.append("contactNumber2", contactNumber2);
      data.append("email2", email2);
      data.append("name3", name3);
      data.append("contactNumber3", contactNumber3);
      data.append("email3", email3);
      data.append("approverFile", approverFile);

      if (GST_type === "UnRegistered") {
        data.append("GST_Registration_No", "N/A");
        data.append("GST_Doc", "");

        data.append("fileDisclosure", fileDisclosure);

        data.append("P_A_N_No", PAN_No);
        data.append("PAN_Doc", PAN_Doc);
      }
      if (GST_type === "Import") {
        data.append("GST_Registration_No", "N/A");
        data.append("GST_Doc", "");
        data.append("fileDisclosure", "");

        data.append("P_A_N_No", "N/A");
        data.append("PAN_Doc", "");
      }
      if (GST_type === "Registered") {
        data.append("GST_Registration_No", GST_No);
        data.append("GST_Doc", GST_Doc);
        data.append("fileDisclosure", "");

        data.append("P_A_N_No", PAN_No);
        data.append("PAN_Doc", PAN_Doc);
      }
      data.append("RPD_Doc", RPD_Doc);
      data.append("NDA_Doc", NDA_Doc);
      data.append("COC_Doc", COC_Doc);
      data.append("GST_Vendor_Type", GST_type);

      data.append("form_10f_Doc", form_10f);
      data.append("TAN_Doc", TAN_Doc);
      data.append("PE_Declaration_Doc", pe_declaration);
      data.append("Tax_residency_Doc", Tax_residency);
      data.append("CIN_No", CIN_No);
      data.append("MSMED", MSME_status);
      if (MSME_status === "2") {
        data.append("MSMED_Number", "N/A");
        data.append("MSMED_Vendor_Type", "");
        data.append("MSME_Doc", "");

        // setMSME_No("N/A");
        // setMSME_Type("");
        // console.log("MSME statuse pe+++++++++++++++++")
        // setMSME_Doc("");
      } else {
        data.append("MSMED_Number", MSME_No);
        data.append("MSMED_Vendor_Type", MSME_Type);
        data.append("MSME_Doc", MSME_Doc);
      }

      for (var pair of data.entries()) {
        console.log(
          "test------------->>>>>>>>>>>>>>>>>>",
          pair[0] + ", " + pair[1]
        );
      }

      apiService.updateAllCollection(userId, data).then((response) => {
        console.log("res=============>>>>>>>", response);
        if (response) {
          reload();
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
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
      Swal.fire({
        title: "Please fill the mandatory fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Box>
      <div
        className="container-fluid  py-2"
        style={{ backgroundColor: "#f3f4f7" }}
      >
        <form className={style} style={{ marginBottom: "3em" }}>
          {/* <div >onSubmit={submitHandler} */}
          <div className={style}>
            <div style={{ overflowY: "scroll", height: "300px" }}>
              <div
                className="row px-3  pt-3"
                style={{ backgroundColor: "#fff" }}
              >
                <h5 className="headlines">
                  <b>Vendor Details Basic Informations</b>
                </h5>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="companyName*">Company Name</label>
                  <input
                    type="text"
                    className={`mb-2 inputbox ${shouldHighlightInput && isCompanyNameEdited ? 'highlighted-input' : ''}`}
                    name="companyName"
                    value={companyName}
                    onChange={(e) => validatecompanyName(e)}
                  />
                   {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isCompanyNameEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  <span className="formError">{companyNameErr}</span>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="Address">Address 1</label>
                  <input
                    type="text"
                    className={`mb-2 inputbox ${shouldHighlightInput && isAddressEdited ? 'highlighted-input' : ''}`}
                    name="Address"
                    value={Address}
                    onChange={(e) => validateaddress1(e)}
                  />
                  <span className="formError">{address1Err}</span>
                  {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isAddressEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                </div>

                {editData[0]?.Address_2 !== "null" && editData[0]?.Address_2 ? (
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="Address_2">Address 2</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isAddress_2Edited ? 'highlighted-input' : ''}`}
                      name="Address_2"
                      value={Address_2}
                      onChange={(e) => validateaddress2(e)}
                    />
                    <span className="formError">{address2Err}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isAddress_2Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                ) : (
                  ""
                )}
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    className={`mb-2 inputbox ${shouldHighlightInput && isCountry_Region_CodeEdited ? 'highlighted-input' : ''}`}
                    name="country"
                    value={Country_Region_Code}
                    onChange={(e) => validatecountry(e)}
                    readOnly
                  />
                  <span className="formError">{countryErr}</span>
                  {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isCountry_Region_CodeEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className={`mb-2 inputbox ${shouldHighlightInput && isstateEdited ? 'highlighted-input' : ''}`}
                    name="state"
                    value={state}
                    onChange={(e) => validatestate(e)}
                  />
                  <span className="formError">{stateErr}</span>
                  {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isstateEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="City">City</label>
                  <input
                    type="text"
                    className={`mb-2 inputbox ${shouldHighlightInput && isCityEdited ? 'highlighted-input' : ''}`}
                    name="City"
                    value={City}
                    onChange={(e) => validatecity(e)}
                  />
                  <span className="formError">{cityErr}</span>
                  {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isCityEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                  <label htmlFor="Post_Code">PinCode</label>
                  <input
                    type="text"
                    className={`mb-2 inputbox ${shouldHighlightInput && isPost_CodeEdited ? 'highlighted-input' : ''}`}
                    name="Post_Code"
                    value={Post_Code}
                    onChange={(e) => validatepinCode(e)}
                  />
                  <span className="formError">{pinCodeErr}</span>
                  {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isPost_CodeEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12 mb-0">
                  {style === "cont2" ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleEditPopup("logo")}
                        className={`btn bankbtn ${
                          editUploadFile ? "upload" : "delete"
                        } btn-primary btn-md mt-3`}
                      >
                        {editUploadFile ? "Upload Logo" : "Delete Logo"}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleLogoView(logo)}
                      className="btn bankbtn btn-primary btn-md mt-3"
                    >
                      View Logo
                    </button>
                  )}
                  {/* <p className="formError">{logoErr}</p> */}
                </div>
                {/* <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Phone No.</label>
                                    <input type="text" className="mb-2 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Vendor Payment Term</label>
                                    <input type="text" className="mb-2 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Contact Name</label>
                                    <input type="text" className="mb-2 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <label htmlFor="country">Email</label>
                                    <input type="text" className="mb-2 inputbox" name="branchAdd" value={""} onChange={(e) => setcompanyName(e.target.value)}/>
                                </div> */}
                {/* <div className="col-lg-4 col-sm-6 col-xs-12 mt-2">
                                    <button type="button" className="btn bankbtn btn-primary btn-md m-2">View logo</button>
                                </div> */}
              </div>

              <div className="row px-3" style={{ backgroundColor: "#fff" }}>
                <h5 className="headlines">
                  <b>Communication Details</b>
                </h5>
                <p>
                  <b>Finance Spoc</b>
                </p>
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="fs_ContactName">Contact Name</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isfinanceSpoccontactNameEdited ? 'highlighted-input' : ''}`}
                      name="fs_ContactName"
                      value={fs_ContactName}
                      onChange={(e) => validatefs_ContactName(e)}
                    />
                    <span className="formError">{fs_ContactNameErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isfinanceSpoccontactNameEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="fs_Designation">Designation</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isfinanceSpocdesignationEdited ? 'highlighted-input' : ''}`}
                      name="fs_Designation"
                      value={fs_Designation}
                      onChange={(e) => validatefs_Designation(e)}
                    />
                    <span className="formError">{fs_DesignationErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isfinanceSpocdesignationEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="fs_PhoneNo">Phone no</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isfinanceSpocphoneNoEdited ? 'highlighted-input' : ''}`}
                      name="fs_PhoneNo"
                      value={fs_PhoneNo}
                      onChange={(e) => validatefs_PhoneNo(e)}
                    />
                    <span className="formError">{fs_PhoneNoErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isfinanceSpocphoneNoEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="fs_Email">Email</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isfinanceSpocemailEdited ? 'highlighted-input' : ''}`}
                      name="fs_Email"
                      value={fs_Email}
                      onChange={(e) => validatefs_Email(e)}
                    />
                    <span className="formError">{fs_EmailErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isfinanceSpocemailEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                </div>

                <>
                  {(editCommmData[0]?.operationSpoccontactName !== "null" &&
                    editCommmData[0]?.operationSpoccontactName) ||
                  (editCommmData[0]?.operationSpocdesignation !== "null" &&
                    editCommmData[0]?.operationSpocdesignation) ||
                  (editCommmData[0]?.operationSpocphoneNo !== "null" &&
                    editCommmData[0]?.operationSpocphoneNo) ||
                  (editCommmData[0]?.operationSpocemail !== "null" &&
                    editCommmData[0]?.operationSpocemail) ? (
                    <p>
                      <b>Operation Spoc</b>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="row">
                    {editCommmData[0]?.operationSpoccontactName !== "null" &&
                    editCommmData[0]?.operationSpoccontactName ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="ops_ContactName">Contact Name</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isoperationSpoccontactNameEdited ? 'highlighted-input' : ''}`}
                          name="ops_ContactName"
                          value={ops_ContactName}
                          onChange={(e) => setops_ContactName(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isoperationSpoccontactNameEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editCommmData[0]?.operationSpocdesignation !== "null" &&
                    editCommmData[0]?.operationSpocdesignation ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="ops_Designation">Designation</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isoperationSpocdesignationEdited ? 'highlighted-input' : ''}`}
                          name="ops_Designation"
                          value={ops_Designation}
                          onChange={(e) => setops_Designation(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isoperationSpocdesignationEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editCommmData[0]?.operationSpocphoneNo !== "null" &&
                    editCommmData[0]?.operationSpocphoneNo ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="ops_PhoneNo">Phone no</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isoperationSpocphoneNoEdited ? 'highlighted-input' : ''}`}
                          name="ops_PhoneNo"
                          value={ops_PhoneNo}
                          onChange={(e) => setops_PhoneNo(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isoperationSpocphoneNoEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editCommmData[0]?.operationSpocemail !== "null" &&
                    editCommmData[0]?.operationSpocemail ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="ops_Email">Email</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isoperationSpocemailEdited ? 'highlighted-input' : ''}`}
                          name="ops_Email"
                          value={ops_Email}
                          onChange={(e) => setops_Email(e.target.value)}
                        />
                         {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isoperationSpocemailEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>

                <>
                  {(editCommmData[0]?.collectionSpoccontactName !== "null" &&
                    editCommmData[0]?.collectionSpoccontactName) ||
                  (editCommmData[0]?.collectionSpocdesignation !== "null" &&
                    editCommmData[0]?.collectionSpocdesignation) ||
                  (editCommmData[0]?.collectionSpocphoneNo !== "null" &&
                    editCommmData[0]?.collectionSpocphoneNo) ||
                  (editCommmData[0]?.collectionSpocemail !== "null" &&
                    editCommmData[0]?.collectionSpocemail) ? (
                    <p>
                      <b>Collection Spoc</b>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="row">
                    {editCommmData[0]?.collectionSpoccontactName !== "null" &&
                    editCommmData[0]?.collectionSpoccontactName ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="country">Contact Name</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && iscollectionSpoccontactNameEdited ? 'highlighted-input' : ''}`}
                          name="colls_ContactName"
                          value={colls_ContactName}
                          onChange={(e) => setcolls_ContactName(e.target.value)}
                        />
                         {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscollectionSpoccontactNameEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editCommmData[0]?.collectionSpocdesignation !== "null" &&
                    editCommmData[0]?.collectionSpocdesignation ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="country">Designation</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && iscollectionSpocdesignationEdited ? 'highlighted-input' : ''}`}
                          name="colls_Designation"
                          value={colls_Designation}
                          onChange={(e) => setcolls_Designation(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscollectionSpocdesignationEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editCommmData[0]?.collectionSpocphoneNo !== "null" &&
                    editCommmData[0]?.collectionSpocphoneNo ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="country">Phone no</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && iscollectionSpocphoneNoEdited ? 'highlighted-input' : ''}`}
                          name="colls_PhoneNo"
                          value={colls_PhoneNo}
                          onChange={(e) => setcolls_PhoneNo(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscollectionSpocphoneNoEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editCommmData[0]?.collectionSpocemail !== "null" &&
                    editCommmData[0]?.collectionSpocemail ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="country">Email</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && iscollectionSpocemailEdited ? 'highlighted-input' : ''}`}
                          name="colls_Email"
                          value={colls_Email}
                          onChange={(e) => setcolls_Email(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscollectionSpocemailEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>

                <p>
                  <b>Management Spoc</b>
                </p>
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="mngs_ContactName">Contact Name</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && ismanagementSpoccontactNameEdited ? 'highlighted-input' : ''}`}
                      name="mngs_ContactName"
                      value={mngs_ContactName}
                      onChange={(e) => validatemngs_ContactName(e)}
                    />
                    <span className="formError">{mngs_ContactNameErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && ismanagementSpoccontactNameEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="mngs_Designation">Designation</label>
                    <input
                      type="text"                
className={`mb-2 inputbox ${shouldHighlightInput && ismanagementSpocdesignationEdited ? 'highlighted-input' : ''}`}
                      name="mngs_Designation"
                      value={mngs_Designation}
                      onChange={(e) => validatemngs_Designation(e)}
                    />
                    <span className="formError">{mngs_DesignationErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && ismanagementSpocdesignationEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="mngs_PhoneNo">Phone no</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && ismanagementSpocphoneNoEdited ? 'highlighted-input' : ''}`}
                      name="mngs_PhoneNo"
                      value={mngs_PhoneNo}
                      onChange={(e) => validatemngs_PhoneNo(e)}
                    />
                    <span className="formError">{mngs_PhoneNoErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && ismanagementSpocphoneNoEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="mngs_Email">Email</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && ismanagementSpocemailEdited ? 'highlighted-input' : ''}`}
                      name="mngs_Email"
                      value={mngs_Email}
                      onChange={(e) => validatemngs_Email(e)}
                    />
                    <span className="formError">{mngs_EmailErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && ismanagementSpocemailEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                </div>

                <>
                  {(editCommmData[0]?.contactName !== "null" &&
                    editCommmData[0]?.contactName) ||
                  (editCommmData[0]?.designation !== "null" &&
                    editCommmData[0]?.designation) ||
                  (editCommmData[0]?.phoneNo !== "null" &&
                    editCommmData[0]?.phoneNo) ||
                  (editCommmData[0]?.email !== "null" &&
                    editCommmData[0]?.email) ? (
                    <p>
                      <b>Others</b>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="row">
                    {editCommmData[0]?.contactName !== "null" &&
                    editCommmData[0]?.contactName ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="others_ContactName">Contact Name</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && iscontactNameEdited ? 'highlighted-input' : ''}`}
                          name="others_ContactName"
                          value={others_ContactName}
                          onChange={(e) =>
                            setothers_ContactName(e.target.value)
                          }
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscontactNameEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}

                    {editCommmData[0]?.designation !== "null" &&
                    editCommmData[0]?.designation ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="others_Designation">Designation</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isdesignationEdited ? 'highlighted-input' : ''}`}
                          name="others_Designation"
                          value={others_Designation}
                          onChange={(e) =>
                            setothers_Designation(e.target.value)
                          }
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isdesignationEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editCommmData[0]?.phoneNo !== "null" &&
                    editCommmData[0]?.phoneNo ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="others_PhoneNo">Phone no</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isphoneNoEdited ? 'highlighted-input' : ''}`}
                          name="others_PhoneNo"
                          value={others_PhoneNo}
                          onChange={(e) => setothers_PhoneNo(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isphoneNoEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editCommmData[0]?.email !== "null" &&
                    editCommmData[0]?.email ? (
                      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                        <label htmlFor="others_Email">Email</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isemailEdited ? 'highlighted-input' : ''}`}
                          name="others_Email"
                          value={others_Email}
                          onChange={(e) => setothers_Email(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isemailEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
                {userStatus === "NewRegistration" ? (
                  ""
                ) : (
                  <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12">
                    <label htmlFor="Post_Code">Master vendor email id*</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && ismastervendor_emailEdited ? 'highlighted-input' : ''}`}
                      name="mastervendor_email"
                      value={mastervendor_email}
                      onChange={(e) => validatemastervendor_email(e)}
                    />
                    <span className="formError">{mastervendor_emailErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && ismastervendor_emailEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                )}
              </div>

              <div className="row px-3" style={{ backgroundColor: "#fff" }}>
                <h5 className="headlines">
                  <b>Statutary Details</b>
                </h5>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                    <div className="row">
                      <label>Vendor GST Type*</label>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="GST_Vendor_Type"
                            id="flexRadioDefault1"
                            value={"Registered"}
                            checked={GST_type === "Registered"}
                            // disabled={GST_type !== "Registered"?true:false}
                            onChange={(e) => validateGST_type(e)}
                          />              
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Registered
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="GST_Vendor_Type"
                            id="flexRadioDefault2"
                            value={"UnRegistered"}
                            checked={GST_type === "UnRegistered"}
                            // disabled={GST_type !== "UnRegistered" ? true : false}
                            onChange={(e) => validateGST_type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            UnRegistered
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="GST_Vendor_Type"
                            id="flexRadioDefault3"
                            value={"Import"}
                            checked={GST_type === "Import"}
                            // disabled={GST_type !== "Import" ? true : false}
                            onChange={(e) => validateGST_type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault3"
                          >
                            Import
                          </label>
                        </div>
                      </div>
                      <span className="formError">{GST_typeErr}</span>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                    <div className="row">
                      <label>MSME status*</label>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSMED"
                            id="MSME_status1"
                            value={"1"}
                            checked={MSME_status === "1"}
                            onChange={(e) => validateMSME_status(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_status1"
                          >
                            Registered
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSMED"
                            id="MSME_status2"
                            value={"2"}
                            checked={MSME_status === "2"}
                            onChange={(e) => validateMSME_status(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_status2"
                          >
                            UnRegistered
                          </label>
                        </div>
                      </div>
                      <span className="formError">{MSME_statusErr}</span>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-2">
                    <div className="row">
                      <div className="col-sm-12 col-lg-8">
                        <label htmlFor="GST_Registration_No">GST no*</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isGST_Registration_NoEdited ? 'highlighted-input' : ''}`}
                          name="GST_Registration_No"
                          value={GST_No}
                          readOnly={
                            GST_type === "UnRegistered" || GST_type === "Import"
                          }
                          onChange={(e) => validateGST_No(e)}
                        />
                        <span className="formError">{GST_NoErr}</span>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isGST_Registration_NoEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                      {GST_type === "Registered" ? (
                        <div className="col-sm-12 col-lg-4 m-auto">
                          {style === "cont2" ? (
                            <>
                              <button
                                type="button"
                                onClick={(e) => handleEditPopup("GST_Doc")}
                                className={`btn bankbtn ${
                                  editGstUploadFile ? "upload" : "delete"
                                } btn-primary btn-md mt-3`}
                              >
                                {editGstUploadFile
                                  ? "Upload File"
                                  : "Delete File"}
                              </button>
                              {/* <button
                                type="button"
                                onClick={(e) => handleEditPopup("GST_Doc")}
                                className="btn bankbtn delete btn-primary btn-md mt-3"
                              >
                                Delete File
                              </button> */}
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleView(GST_Doc)}
                              className="btn bankbtn btn-primary btn-md mt-3"
                            >
                              View File
                            </button>
                          )}
                          <p className="formError">{GST_DocErr}</p>
                          {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isGST_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                        </div>
                      ) : (
                        <></>
                      )}
                      {GST_type === "UnRegistered" ? (
                        <div className="col-sm-12 col-lg-4 m-auto">
                          {style === "cont2" ? (
                            <>
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleEditPopup("fileDisclosure")
                                }
                                className={`btn bankbtn ${
                                  editUnRegGstUploadFile ? "upload" : "delete"
                                } btn-primary btn-md mt-3`}
                              >
                                {editUnRegGstUploadFile
                                  ? "Upload File"
                                  : "Delete File"}
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleView(fileDisclosure)}
                              className="btn bankbtn btn-primary btn-md mt-3"
                            >
                              View File
                            </button>
                          )}
                          <p className="formError">{fileDisclosureErr}</p>
                          {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isfileDisclosureEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-2">
                    <div className="row">
                      <div className="col-sm-12 col-lg-8">
                        <label htmlFor="MSME_No">MSME no*</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isMSMED_NumberEdited ? 'highlighted-input' : ''}`}
                          name="MSME_No"
                          value={MSME_No}
                          onChange={(e) => validateMSME_No(e)}
                          readOnly={MSME_status === "2"}
                        />
                        <span className="formError">{MSME_NoErr}</span>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isMSMED_NumberEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                      {MSME_status === "1" ? (
                        <div className="col-sm-12 col-lg-4 m-auto">
                          {style === "cont2" ? (
                            <button
                              type="button"
                              disabled={MSME_status === "2"}
                              onClick={(e) => handleEditPopup("MSME_Doc")}
                              className={`btn bankbtn ${
                                editMSMEUploadFile ? "upload" : "delete"
                              } btn-primary btn-md mt-3`}
                            >
                              {editMSMEUploadFile
                                ? "Upload File"
                                : "Delete File"}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={MSME_status === "2"}
                              onClick={(e) => handleView(MSME_Doc)}
                              className="btn bankbtn btn-primary btn-md mt-3"
                            >
                              View File
                            </button>
                          )}
                          <p className="formError">{MSME_DocErr}</p>
                          {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isMSME_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                    <div className="row">
                      <div className="col-sm-12 col-lg-8">
                        <label htmlFor="P_A_N_No">PAN no*</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isP_A_N_NoEdited ? 'highlighted-input' : ''}`}
                          name="P_A_N_No"
                          value={(Country_Region_Code !== "IN" ? "N/A" : PAN_No).toUpperCase()}
                          readOnly={
                            GST_type === "Import" ||
                            Country_Region_Code !== "IN"
                          }
                          onChange={(e) => validatePAN_No(e)}
                        />
                        <span className="formError">{PAN_NoErr}</span>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isP_A_N_NoEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                      {GST_type !== "Import" &&
                      Country_Region_Code === "IN" &&
                      userStatus !== "NewRegistration" ? (
                        <div className="col-sm-12 col-lg-4 m-auto">
                          {style === "cont2" ? (
                            <button
                              type="button"
                              onClick={(e) => handleEditPopup("PAN_Doc")}
                              className={`btn bankbtn ${
                                editPanUploadFile ? "upload" : "delete"
                              } btn-primary btn-md mt-3`}
                            >
                              {editPanUploadFile
                                ? "Upload File"
                                : "Delete File"}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleView(PAN_Doc)}
                              className="btn bankbtn btn-primary btn-md mt-3"
                            >
                              View File
                            </button>
                          )}
                          <p className="formError">{PAN_DocErr}</p>
                          {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isPAN_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12 pt-1">
                    <div className="row">
                      <label>MSME Type*</label>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSME_Type"
                            id="MSME_Type1"
                            value={"1"}
                            checked={MSME_Type === "1"}
                            disabled={MSME_status === "2"}
                            onChange={(e) => validateMSME_Type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_Type1"
                          >
                            Micro
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSME_Type"
                            id="MSME_Type2"
                            value={"2"}
                            checked={MSME_Type === "2"}
                            disabled={MSME_status === "2"}
                            onChange={(e) => validateMSME_Type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_Type2"
                          >
                            Small
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="MSME_Type"
                            id="MSME_Type3"
                            value={"3"}
                            checked={MSME_Type === "3"}
                            disabled={MSME_status === "2"}
                            onChange={(e) => validateMSME_Type(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="MSME_Type3"
                          >
                            Medium
                          </label>
                        </div>
                      </div>
                      <span className="formError">{MSME_TypeErr}</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                    {/* <div className="row">
                                            <div className="col-sm-12 col-md-8"> */}
                    <label htmlFor="CIN_No">CIN no*</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isCIN_NoEdited ? 'highlighted-input' : ''}`}
                      name="CIN_No"
                      value={CIN_No}
                      onChange={(e) => validateCIN_No(e)}
                    />
                    {/* </div> */}
                    {/* </div> */}
                    <span className="formError">{CIN_NoErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isCIN_NoEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-xs-12">
                    <div className="row">
                      <div className="col-sm-12 col-lg-8">
                        <label htmlFor="TAN_No">TAN no*</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isTAN_NoEdited ? 'highlighted-input' : ''}`}
                          name="TAN_No"
                          value={TAN_No}
                          onChange={(e) => validateTAN_No(e)}
                        />
                        <span className="formError">{TAN_NoErr}</span>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isTAN_NoEdited&& (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                      <div className="col-sm-12 col-lg-4 m-auto ">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("TAN_Doc")}
                            className={`btn bankbtn ${
                              editTanUploadFile ? "upload" : "delete"
                            } btn-primary btn-md mt-3`}
                          >
                            {editTanUploadFile ? "Upload File" : "Delete File"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(TAN_Doc)}
                            className="btn bankbtn btn-primary btn-md mt-3"
                          >
                            View File
                          </button>
                        )}
                        <p className="formError">{TAN_DocErr}</p>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isTAN_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    </div>
                  </div>
                  {Country_Region_Code !== "IN" ? (
                    <>
                      <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                        <div className="row text-center">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            <label className="banklabel mt-2">Form 10F*</label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            {style === "cont2" ? (
                              <button
                                type="button"
                                onClick={(e) => handleEditPopup("form_10f")}
                                className={`btn bankbtn ${
                                  editform10fUploadFile ? "upload" : "delete"
                                } btn-primary btn-md mt-3`}
                              >
                                {editform10fUploadFile
                                  ? "Upload File"
                                  : "Delete File"}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => handleView(form_10f)}
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            )}
                          </div>
                        </div>

                        {/* <label htmlFor="form_10f">Form 10F*</label>
                                        <input type="text" className="mb-2 inputbox" name="form_10f" value={form_10f} onChange={(e) => validateform_10f(e)}   /> */}

                        <span className="formError">{form_10fErr}</span>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isform_10f_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {Country_Region_Code !== "IN" ? (
                    <>
                      <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                        <div className="row text-center">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            <label className="banklabel mt-2">
                              Tax Residency certificate*
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            {style === "cont2" ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleEditPopup("Tax_residency")
                                }
                                className={`btn bankbtn ${
                                  editTRCUploadFile ? "upload" : "delete"
                                } btn-primary btn-md mt-3`}
                              >
                                {editTRCUploadFile
                                  ? "Upload File"
                                  : "Delete File"}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => handleView(Tax_residency)}
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            )}
                          </div>
                        </div>
                        {/* <label htmlFor="Tax_residency">Tax Residency certificate*</label>
                                        <input type="text" className="mb-2 inputbox" name="Tax_residency" value={Tax_residency} onChange={(e) => validateTax_residency(e)}  /> */}
                        <span className="formError">{Tax_residencyErr}</span>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isTax_residency_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {Country_Region_Code !== "IN" ? (
                    <>
                      <div className="col-lg-4 col-sm-6 col-xs-12 pt-1">
                        <div className="row text-center">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            <label className="banklabel mt-2">
                              No PE declaration*
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            {style === "cont2" ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleEditPopup("pe_declaration")
                                }
                                className={`btn bankbtn ${
                                  editNPDUploadFile ? "upload" : "delete"
                                } btn-primary btn-md mt-3`}
                              >
                                {editNPDUploadFile
                                  ? "Upload File"
                                  : "Delete File"}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => handleView(pe_declaration)}
                                className="btn bankbtn btn-primary btn-md mt-3"
                              >
                                View File
                              </button>
                            )}
                          </div>
                        </div>
                        {/* <label htmlFor="pe_declaration">No PE declaration*</label>
                                        <input type="text" className="mb-2 inputbox" name="pe_declaration" value={pe_declaration} onChange={(e) => validatepe_declaration(e)}  /> */}
                        <span className="formError">{pe_declarationErr}</span>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isPE_Declaration_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div
                className="row px-3 pt-2"
                style={{ backgroundColor: "#fff" }}
              >
                <h5 className="headlines">
                  <b>Compliance Details</b>
                </h5>
                <div className="row text-center">
                  <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                    <div className="row text-center">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                        <label className="banklabel">
                          Related party disclosure*
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("RPD_Doc")}
                            className={`btn bankbtn ${
                              editRPDUploadFile ? "upload" : "delete"
                            } btn-primary btn-md mt-3`}
                          >
                            {editRPDUploadFile ? "Upload File" : "Delete File"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(RPD_Doc)}
                            className="btn bankbtn btn-primary btn-md mt-1"
                          >
                            View File
                          </button>
                        )}
                        {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button> */}
                      </div>
                      <span className="formError">{RPD_DocErr}</span>
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isRPD_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                    <div className="row text-center">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                        <label className="banklabel">
                          COC for services support/ installation*
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("COC_Doc")}
                            className={`btn bankbtn ${
                              editCOCUploadFile ? "upload" : "delete"
                            } btn-primary btn-md mt-3`}
                          >
                            {editCOCUploadFile ? "Upload File" : "Delete File"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(COC_Doc)}
                            className="btn bankbtn btn-primary btn-md mt-1"
                          >
                            View File
                          </button>
                        )}
                        {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button> */}
                      </div>
                      <span className="formError">{COC_DocErr}</span>
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isCOC_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-1">
                    <div className="row text-center">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <label className="banklabel">
                          Non disclosure agreement*
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("NDA_Doc")}
                            className={`btn bankbtn ${
                              editNDAUploadFile ? "upload" : "delete"
                            } btn-primary btn-md mt-3`}
                          >
                            {editNDAUploadFile ? "Upload File" : "Delete File"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(NDA_Doc)}
                            className="btn bankbtn btn-primary btn-md mt-1"
                          >
                            View File
                          </button>
                        )}
                        {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">View File</button> */}
                      </div>
                      <span className="formError">{NDA_DocErr}</span>
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isNDA_DocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row px-3 pt-2"
                style={{ backgroundColor: "#fff" }}
              >
                <h5 className="headlines">
                  <b>Bank Details</b>
                </h5>
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Name as per Bank A/c</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isAccount_Holder_NameEdited ? 'highlighted-input' : ''}`}
                      name="Account_Holder_Name"
                      value={bankAccountName}
                      onChange={(e) => validatebankAccountName(e)}
                    />
                    <span className="formError">{bankAccountNameErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isAccount_Holder_NameEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">IFSC code*</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isIFSC_CodeEdited ? 'highlighted-input' : ''}`}
                      name="IFSC_Code"
                      value={(ifscCode || "").toUpperCase()}
                      onChange={(e) => validateifscCode(e)}
                    />
                    <span className="formError">{ifscCodeErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isIFSC_CodeEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Bank name*</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isBank_NameEdited ? 'highlighted-input' : ''}`}
                      name="Bank_Name"
                      value={(bankName || "").toUpperCase()}
                      onChange={(e) => validatebankName(e)}
                    />
                    <span className="formError">{bankNameErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isBank_NameEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">MICR code/ Swift code*</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isMICRcodeEdited ? 'highlighted-input' : ''}`}
                      name="MICRcode"
                      value={MICRcode}
                      onChange={(e) => validateMICRcode(e)}
                    />
                    <span className="formError">{MICRcodeErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isMICRcodeEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Bank A/C no*</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isAccount_NoEdited ? 'highlighted-input' : ''}`}
                      name="Account_No"
                      value={bankAccountNumber}
                      onChange={(e) => validatebankAccountNumber(e)}
                    />
                    <span className="formError">{bankAccountNumberErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isAccount_NoEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Branch address*</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isBank_AddressEdited ? 'highlighted-input' : ''}`}
                      name="Bank_Address"
                      value={(branchAddress|| "").toUpperCase()}
                      onChange={(e) => validatebranchAddress(e)}
                    />
                    <span className="formError">{branchAddressErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isBank_AddressEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-2">
                    <div className="d-flex">
                      <div className="p-2 ">
                        <label className="banklabel mt-2">
                          Copy of cancel Cheque/Bank detail duly certified from
                          bank*
                        </label>
                      </div>
                      <div className="p-2 justify-content-start my-auto">
                        {style === "cont2" ? (
                          <button
                            type="button"
                            onClick={(e) => handleEditPopup("bankdetailDoc")}
                            className={`btn bankbtn ${
                              editBankUploadFile ? "upload" : "delete"
                            } btn-primary btn-md mt-3`}
                          >
                            {editBankUploadFile ? "Upload File" : "Delete File"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleView(bankdetailDoc)}
                            className="btn bankbtn btn-primary btn-md "
                          >
                            View File
                          </button>
                        )}
                        <p className="formError">{bankdetailDocErr}</p>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isbankdetailDocEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    </div>

                    {/* {style === "cont2" ?
                                            <button type="button" onClick={handleRegject} className="btn bankbtn btn-primary btn-md m-2">View File</button>
                                            : <button type="button" className="btn bankbtn btn-primary btn-md m-2">View File</button>} */}
                  </div>
                </div>
              </div>
              {/* { editFinanceData[0] ?<> */}
              {/* { editFinanceData[0]?.yearOfAuditedFinancial || editFinanceData[0]?.Revenue || editFinanceData[0]?.Profit || editFinanceData[0]?.netWorth || editFinanceData[0]?.currentAssets || editFinanceData[0]?.directorDetails || editFinanceData[0]?.financial_data || editFinanceData[0]?.financial_data2 ? <> */}

              <div
                className="row px-3 pt-2"
                style={{ backgroundColor: "#fff" }}
              >
                {editFinanceData[0] ? (
                  <h5 className="headlines">
                    <b>Financial Details</b>
                  </h5>
                ) : (
                  ""
                )}
                <div className="row">
                  {/* {editFinanceData[0]?.yearOfAuditedFinancial ? ( */}
                  {editFinanceData[0]?.yearOfAuditedFinancial !== "null" &&
                  editFinanceData[0]?.yearOfAuditedFinancial ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">
                        Year of audited financials
                      </label>
                      <input
                        type="text"
                        className={`mb-2 inputbox ${shouldHighlightInput && isyearOfAuditedFinancialEdited ? 'highlighted-input' : ''}`}
                        name="yearOfAuditedFinancial"
                        value={yearOfAuditedFinancial}
                        onChange={(e) =>
                          setyearOfAuditedFinancial(e.target.value)
                        }
                      />
         {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isyearOfAuditedFinancialEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.Revenue ? ( */}
                  {editFinanceData[0]?.Revenue !== "null" &&
                  editFinanceData[0]?.Revenue ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Revenue</label>
                      <input
                        type="number"
                        className={`mb-2 inputbox ${shouldHighlightInput && isRevenueEdited ? 'highlighted-input' : ''}`}
                        name="Revenue"
                        value={Revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isRevenueEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.Profit ? ( */}
                  {editFinanceData[0]?.Profit !== "null" &&
                  editFinanceData[0]?.Profit ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Profit</label>
                      <input
                        type="number"
                        className={`mb-2 inputbox ${shouldHighlightInput && isProfitEdited ? 'highlighted-input' : ''}`}
                        name="Profit"
                        value={Profit}
                        onChange={(e) => setProfit(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isProfitEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.netWorth ? ( */}
                  {editFinanceData[0]?.netWorth !== "null" &&
                  editFinanceData[0]?.netWorth ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Networth</label>
                      <input
                        type="number"
                        className={`mb-2 inputbox ${shouldHighlightInput && isnetWorthEdited ? 'highlighted-input' : ''}`}
                        name="netWorth"
                        value={netWorth}
                        onChange={(e) => setnetWorth(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isnetWorthEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.currentAssets ? ( */}
                  {editFinanceData[0]?.currentAssets !== "null" &&
                  editFinanceData[0]?.currentAssets ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Current Assets</label>
                      <input
                        type="text"
                        className={`mb-2 inputbox ${shouldHighlightInput && iscurrentAssetsEdited ? 'highlighted-input' : ''}`}
                        name="currentAssets"
                        value={currentAssets}
                        onChange={(e) => setcurrentAssets(e.target.value)}
                      />
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscurrentAssetsEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.directorDetails ? ( */}
                  {editFinanceData[0]?.directorDetails !== "null" &&
                  editFinanceData[0]?.directorDetails ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="banklabel">Director detail</label>
                      <input
                        type="text"
                        className={`mb-2 inputbox ${shouldHighlightInput && isdirectorDetailsEdited ? 'highlighted-input' : ''}`}
                        name="directorDetails"
                        value={directorDetails}
                        onChange={(e) => setdirectorDetails(e.target.value)}
                      />
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isdirectorDetailsEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {editFinanceData[0]?.organisationType !== "null" &&
                  editFinanceData[0]?.organisationType ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label htmlFor="Organisationtype">
                        Organisation type
                      </label>
                      <select
                        className="form-select"
                        id="Distributors"
                        name="Organisationtype"
                        aria-label="Disabled select example"
                        value={organisationType}
                        disabled={style === "approvalsform" ? true : false}
                        onChange={(e) => setorganisationType(e.target.value)}
                      >
                        <option value="null">
                          - Select Organisation Type -
                        </option>
                        <option value="Company">Company</option>
                        <option value="LLP">LLP</option>
                        <option value="Partnership Firm">
                          Partnership Firm
                        </option>
                        <option value="Proprietorship">Proprietorship</option>
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                  {editFinanceData[0]?.shareholderName !== "null" &&
                  editFinanceData[0]?.shareholderName ? (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label htmlFor="Shareholdername">Shareholder name</label>
                      <input
                        type="text"
                        className={`mb-2 inputbox ${shouldHighlightInput && isshareholderNameEdited ? 'highlighted-input' : ''}`}
                        name="Shareholdername"
                        value={shareholderName}
                        onChange={(e) => setshareholderName(e.target.value)}
                      />
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isshareholderNameEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.financial_data ? ( */}

                  {editFinanceData[0]?.financial_data !== "null" &&
                  editFinanceData[0]?.financial_data ? (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6  my-auto">
                      {style === "cont2" ? (
                        <button
                          type="button"
                          onClick={(e) => handleEditPopup("financial_data")}
                          className={`btn bankbtn ${
                            editfindataUploadFile ? "upload" : "delete"
                          } btn-primary btn-md mt-2`}
                        >
                          {editfindataUploadFile
                            ? "Upload Financials data"
                            : "Delete Financials data"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleView(financial_data)}
                          className="btn bankbtn btn-primary btn-md mt-2"
                        >
                          View Financials data
                        </button>
                      )}
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isfinancial_dataEdited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">Financials data</button> */}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {editFinanceData[0]?.financial_data2 ? ( */}
                  {editFinanceData[0]?.financial_data2 !== "null" &&
                  editFinanceData[0]?.financial_data2 ? (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                      {style === "cont2" ? (
                        <button
                          type="button"
                          onClick={(e) => handleEditPopup("financial_data2")}
                          className={`btn bankbtn ${
                            editfindata2UploadFile ? "upload" : "delete"
                          } btn-primary btn-md mt-2 view-financial-data2-button`}
                        >
                          {editfindata2UploadFile
                            ? "Upload Financials data 2"
                            : "Delete Financials data 2"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleView(financial_data2)}
                          className="btn bankbtn btn-primary btn-md mt-2 view-financial-data2-button"
                        >
                          View Financials data 2
                        </button>
                      )}
                      {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isfinancial_data2Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      {/* <button type="button" className="btn bankbtn btn-primary btn-md m-1">Financials data 2</button> */}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* </> : ""} */}
              {/* </>:<></>} */}
              <div
                className="row px-3 pt-2"
                style={{ backgroundColor: "#fff" }}
              >
                <h5 className="headlines">
                  <b>Hitachi Contact Team</b>
                </h5>
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Name*</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && iscontactName1Edited ? 'highlighted-input' : ''}`}
                      name="name"
                      value={name}
                      onChange={(e) => validatename(e)}
                    />
                    <span className="formError">{nameErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscontactName1Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Email*</label>
                    <input
                      type="text"
                      className={`mb-2 inputbox ${shouldHighlightInput && isemailId1Edited ? 'highlighted-input' : ''}`}
                      name="email"
                      value={email}
                      onChange={(e) => validateemail(e)}
                    />
                    <span className="formError">{emailErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isemailId1Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <label className="banklabel">Contact number*</label>
                    <input
                    type="number"
                    className={`mb-2 inputbox ${shouldHighlightInput && iscontactNumber1Edited ? 'highlighted-input' : ''}`}
                      name="contactNumber"
                      value={contactNumber}
                      onChange={(e) => validatecontactNumber(e)}
                    />
                    <span className="formError">{contactNumberErr}</span>
                    {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscontactNumber1Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                  </div>
                </div>

                <>
                  <div className="row">
                    {editContactData[0]?.contactName2 !== "null" &&
                    editContactData[0]?.contactName2 ? (
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Name*</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && iscontactName2Edited ? 'highlighted-input' : ''}`}
                          name="name2"
                          value={name2}
                          onChange={(e) => setname2(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscontactName2Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}

                    {editContactData[0]?.emailId2 !== "null" &&
                    editContactData[0]?.emailId2 ? (
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Email*</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isemailId2Edited ? 'highlighted-input' : ''}`}
                          name="email2"
                          value={email2}
                          onChange={(e) => validateemail2(e)}
                          // onChange={(e) => setemail2(e.target.value)}
                        />
                         <span className="formError">{email2Err}</span>
                         {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isemailId2Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editContactData[0]?.contactNumber2 !== "null" &&
                    editContactData[0]?.contactNumber2 ? (
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Contact Number*</label>
                        <input
                          type="number"
                          className={`mb-2 inputbox ${shouldHighlightInput && iscontactNumber2Edited ? 'highlighted-input' : ''}`}
                          name="contactNumber2"
                          value={contactNumber2}
                          onChange={(e) => validatecontactNumber2(e)}
                        />
                        <span className="formError">{contactNumber2Err}</span>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscontactNumber2Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>

                <>
                  <div className="row">
                    {editContactData[0]?.contactName3 !== "null" &&
                    editContactData[0]?.contactName3 ? (
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Name*</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && iscontactName3Edited ? 'highlighted-input' : ''}`}
                          name="name3"
                          value={name3}
                          onChange={(e) => setname3(e.target.value)}
                        />
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscontactName3Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editContactData[0]?.emailId3 !== "null" &&
                    editContactData[0]?.emailId3 ? (
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Email*</label>
                        <input
                          type="text"
                          className={`mb-2 inputbox ${shouldHighlightInput && isemailId3Edited ? 'highlighted-input' : ''}`}
                          name="email3"
                          value={email3}
                          onChange={(e) => validateemail3(e)}
                          // onChange={(e) => setemail3(e.target.value)}
                        />
                         <span className="formError">{email3Err}</span>
                         {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && isemailId3Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                    {editContactData[0]?.contactNumber3 !== "null" &&
                    editContactData[0]?.contactNumber3 ? (
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <label className="banklabel">Contact Number*</label>
                        <input
                          type="number"
                          className={`mb-2 inputbox ${shouldHighlightInput && iscontactNumber3Edited ? 'highlighted-input' : ''}`}
                          name="contactNumber3"
                          value={contactNumber3}
                          onChange={(e) => validatecontactNumber3(e)}
                        />
                        <span className="formError">{contactNumber3Err}</span>
                        {JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'VCT' &&JSON.parse(window.sessionStorage.getItem("jwt")).result?.role !== 'MRT' && iscontactNumber3Edited && (
        <span className="formError">Edited by MRT*</span>
      )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              </div>
            </div>

            {props.approvedV === "approvalTeam" ? (
              <>
                <div className="section2">
                  <div className="row px-3 pt-2">
                    <div className="col-lg-4 col-sm-6 col-xs-12 mb-3">
                      <label htmlFor="Distributors">Vendor Type</label>
                      <select
                        className="form-select"
                        id="Distributors"
                        name="vendorType"
                        aria-label="Disabled select example"
                        value={vendorType}
                        disabled={style === "approvalsform" ? true : false}
                        onChange={(e) => validatevendorType(e)}
                      >
                        {/* <option selected>Open this select menu</option> */}
                        <option value="VENDOR-2">Distributor</option>
                        <option value="VENDOR-5">import</option>
                        <option value="VENDOR-1">OEM</option>
                        <option value="VENDOR-3">local vendor</option>
                        <option value="VENDOR-4">others</option>
                      </select>
                      <span className="formError">{vendorTypeErr}</span>
                    </div>
                    <div className="col-lg-8 col-sm-6 col-xs-12 pt-1">
                      <span>Vendor A/C Manager</span>
                      <div className="row">
                        <div className="col-lg-3 col-sm-12 col-xs-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="acManager"
                              id="acManager1"
                              value={"MCIPL\\M0790"}
                              checked={acManager === "MCIPL\\M0790"}
                              onChange={(e) => validateacManager(e)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="acManager1"
                            >
                              Rajender San
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-12 col-xs-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="acManager"
                              id="acManager2"
                              value={"MCIPL\\M0716"}
                              checked={acManager === "MCIPL\\M0716"}
                              onChange={(e) => validateacManager(e)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="acManager2"
                            >
                              Keshav San
                            </label>
                          </div>
                          <span className="formError">{acManagerErr}</span>
                        </div>
                        <div className="col-lg-3 col-sm-12 col-xs-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="mkcheck1"
                              name="mkcheck"
                              checked={mkcheck}
                              onChange={(e) => validatemkcheck(e)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="mkcheck1"
                            >
                              MK Denial Check
                            </label>
                          </div>
                          <span className="formError">{mkcheckErr}</span>
                        </div>

                        <div className="approvalManagerfile col-lg-3 col-sm-12 col-xs-12">
                          <button
                            disabled={style === "approvalsform" ? true : false}
                            type="button"
                            onClick={(e) => handleEditPopup("approverFile")}
                            className="btn bankbtn btn-primary btn-md m-1"
                          >
                            {approverFile ? "Delete file" : "Select File"}
                          </button>
                          <br></br>
                          <span className="formError">{approverFileErr}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          {props.japan ? (
            <>
              <div className="float-end my-2">
                <button
                  type="button"
                  onClick={(e) => handleConcernFound(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                 Reject
                </button>
                <button
                  type="button"
                  onClick={(e) => handleNoConcernFound(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Approve
                </button>
              </div>
            </>
          ) : props.MRT ? (
            <>
              <div className="float-end">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  {style === "cont2" ? "View" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={(e) => submitMRTHandler(e, "MRTsubmit")}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={(e) => handleMRTReject(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={(e) => handleMRTApprove(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Approve
                </button>
              </div>
            </>
          ) : props.approvedV ? (
            <>
              <div className="float-end">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  {style === "cont2" ? "View" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={(e) => submitHandler(e, "VCTsubmit")}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={(e) => handleRegject(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={(e) => handleApprove(props.userid)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Approve
                </button>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* </div> */}
        </form>
      </div>
    </Box>
  );
}

export default ApprovalFields;
