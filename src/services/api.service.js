import http from '../common/http-common';
import axios from 'axios';
import handleApiError from '../utils/Errorhandler';
class apiService {
  verifiedUser = '';
  signup(data) {
    return http.post('/signUp', data).catch(handleApiError);
  }
  signupFindByUserId(userId) {
    return http.get(`/signUp/getByUserId/${userId}`).catch(handleApiError);
  }
  signupFindSubUserList(userId) {
    return http.get(`/signUp/signupFindSubUserList/${userId}`).catch(handleApiError);
  }
  saveUser(data) {
    return http.post('/saveUser', data).catch(handleApiError);
  }
  login(emailId, password) {
    return http.get(`/login/${emailId}/${password}`).catch(handleApiError);
  }
  getImage() {
    return http.get('/getImage').catch(handleApiError);
  }
  resetPasswordByCode(data) {
    return http.post('/resetPasswordByCode', data).catch(handleApiError);
  }
  resetPassword(data) {
    return http.post('/resetPassword', data).catch(handleApiError);
  }
  saveVendordetail(data) {
    return http.post('/saveVdetail', data).catch(handleApiError);
  }
  saveNewRegVendordetail(data){
    return http.post('/saveNewRegVendordetail', data).catch(handleApiError);
  }
  SaveVendorCommunication(data) {
    return http.post('/SaveVendorCommunication', data).catch(handleApiError);
  }
  getCountry() {
    return http.get('/getCountry').catch(handleApiError);
  }
  getStateAndcityByzipcode(code, Post_Code) {
    return http.get(`/getStateAndcityByzipcode/${code}/${Post_Code}`).catch(handleApiError);
  }
  saveStatutoryDetail(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/saveStatutoryDetail`, data).catch(handleApiError);
  }
  saveComplianceDetail(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/saveComplianceDetail`, data).catch(handleApiError);
  }
  savebankdetail(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/saveBankDetail`, data).catch(handleApiError);
  }
  saveFinacialDetail(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/saveFinacialDetail`, data).catch(handleApiError);
  }
  createRelatedDisclosurePdf(data) {
    return axios.post(
      `${process.env.REACT_APP_API_URL}/createRelatedDisclosurePdf`,
      data
    ).catch(handleApiError);
  }
  createCocPdf(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/createCompliancePdf`, data).catch(handleApiError);
  }
  createNDAPdf(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/createnonDisclosure`, data).catch(handleApiError);
  }
  downloadPdf(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/downloadPdf`, data).catch(handleApiError);
  }
  readPdf() {
    return http.get('/readPdf').catch(handleApiError);
  }
  saveContactTeam(data) {
    return http.post('/saveContactTeam', data).catch(handleApiError);
  }
  send2FactorOTP(data){
    return http.post(`/twoFactorOTP`, data).catch(handleApiError);
  }
  OTP2FactorVerification(data){
    return http.post(`/twoFactorOTPVerification`, data).catch(handleApiError);
  }
  getAllCollection(userId) {
    return http.get(`/getAllCollection/${userId}`).catch(handleApiError);
  }
  getvendorDetail(userId) {
    return http.get(`/getvendorDetail/${userId}`).catch(handleApiError);
  }
  getFinancialDate() {
    return http.get('/getfinacialYear').catch(handleApiError);
  }
  updateVendordetail(userId, data) {
    return http.put(`/updateVdetail/${userId}`, data).catch(handleApiError);
  }
  updateErpResourcePortalVendorlist(Entry_No, data) {
    return http.put(`/updateErpResourcePortalVendorlist/${Entry_No}`, data).catch(handleApiError);
  }
  getAllUserDetail() {
    return http.get('/getAllUserDetail').catch(handleApiError);
  }
  updateAllCollection(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/updateAllCollection/${userId}`,
      data
    ).catch(handleApiError);
  }
  saveApproval(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/saveApproval`, data).catch(handleApiError);
  }
  updateApprovalStatus(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/updateApprovalStatus/${userId}`,
      data
    ).catch(handleApiError);
  }
  getApprovedStatus() {
    return axios.get(`${process.env.REACT_APP_API_URL}/getApprovedStatus`).catch(handleApiError);
  }
  getRejectStatus() {
    return axios.get(`${process.env.REACT_APP_API_URL}/getRejectStatus`).catch(handleApiError);
  }
  getApprovalList() {
    return axios.get(`${process.env.REACT_APP_API_URL}/getApprovalList`).catch(handleApiError);
  }
  updateCommunicationdetail(userId, data) {
    return http.put(`/updateCommunication/${userId}`, data).catch(handleApiError);
  }
  updateStatutoryDetail(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/updateStatutoryDetail/${userId}`,
      data
    ).catch(handleApiError);
  }
  updateComplianceDetail(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/updateComplianceDetail/${userId}`,
      data
    ).catch(handleApiError);
  }
  updateBankDetail(userId, data) {
    return axios.put(`${process.env.REACT_APP_API_URL}/updateBankDetail/${userId}`, data).catch(handleApiError);
  }
  updateFinacialDetail(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/updateFinacialDetail/${userId}`,
      data
    ).catch(handleApiError);
  }
  updateContactTeam(userId, data) {
    return http.put(`/updateContactTeam/${userId}`, data).catch(handleApiError);
  }
  saveMasterVendor(data) {
    return http.post('/saveMasterVendorSubUser', data).catch(handleApiError);
  }
  getMasterVendorSubUserById(data) {
    return http.post('/getMasterVendorSubUserById', data).catch(handleApiError);
  }

  UpdateMasterSubUserById(data) {
    return http.put('/UpdateMasterSubUserById', data).catch(handleApiError);
  }



  deleteMasterVendorSubUserById(id) {
    return http.delete(`/deleteMasterVendorSubUserById/${id}`).catch(handleApiError);
  }
  getAllMasterVendorSubUser() {
    return http.get('/getAllMasterVendorSubUser').catch(handleApiError);
  }

  getAllVendorSubUser() {
    return http.get('/getAllVendorSubUser').catch(handleApiError);
  }

  saveMasterVendorUserAccess(data) {
    return http.post('/saveMasterVendorUserAccess', data).catch(handleApiError);
  }
  getMasterVendorUserAccessById(data) {
    return http.post('/getMasterVendorUserAccessById', data).catch(handleApiError);
  }
  UpdateMasterVendorUserAccessById(data) {
    return http.put('/UpdateMasterVendorUserAccessById', data).catch(handleApiError);
  }
  deleteMasterVendorUserAccessById(id) {
    return http.delete(`/deleteMasterVendorUserAccessById/${id}`).catch(handleApiError);
  }
  getAllMasterVendorUserAccess() {
    return http.get('/getAllMasterVendorUserAccess').catch(handleApiError);
  }
  savePeriodicReq(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/savePeriodicReq`, data).catch(handleApiError);
  }
  getPeriodicReq() {
    return axios.get(`${process.env.REACT_APP_API_URL}/getPeriodicReq`).catch(handleApiError);
  }
  deletePeriodicReq(id) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/deletePeriodicReq/${id}`).catch(handleApiError);
  }
  updatePeriodicReq(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/updatePeriodicReq/${userId}`,
      data
    ).catch(handleApiError);
  }
  saveVendorApproval(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/accountStatementApproval`, data).catch(handleApiError);
  }
  updatevendorApprovalStatus(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/accountStatementApproval/update/${userId}`,
      data
    ).catch(handleApiError);
  }
  vendorApprovalList() {
    return axios.get(`${process.env.REACT_APP_API_URL}/accountStatementApproval/findAll`).catch(handleApiError);
  }
  downloadVendorApprovalList(vendorCode) {
    return axios.get(
      `${process.env.REACT_APP_API_URL}/accountStatementApproval/exportExcel/${vendorCode}`,
      { responseType: 'blob' }
    ).catch(handleApiError);
  }
  VendorregList() {
    return axios.get(`${process.env.REACT_APP_API_URL}/vendorCodeDetail/findAll`).catch(handleApiError);
  }
  vendorIdList(vendorId) {
    return axios.get(`${process.env.REACT_APP_API_URL}/vendorIdList/${vendorId}`).catch(handleApiError);
  }
  AllRejectVendorList() {
    return axios.get(`${process.env.REACT_APP_API_URL}/AllRejectVendorList`).catch(handleApiError);
  }
  //ERP
  getErpVendor_API() {
    return http.get("/getErpVendor_API").catch(handleApiError);
  }
  getErpVendor_APIById(No) {
    return http.get(`/getErpVendor_APIById/${No}`).catch(handleApiError);
  }
  postErpResourcePortalVendorlist(data) {
    return http.post('/postErpResourcePortalVendorlist', data).catch(handleApiError);
  }
  getErpResourcePortalVendorlist() {
    return http.get("/getErpResourcePortalVendorlist").catch(handleApiError);
  }
  getErpResourcePortalVendorlistById(Vendor_No) {
    return http.get(`/getErpResourcePortalVendorlistById/${Vendor_No}`).catch(handleApiError);
  }
  getErpVendor_APIByParent_Vendor_Code(Parent_Vendor_Code) {
    return http.get(`/getErpVendor_APIByParent_Vendor_Code/${Parent_Vendor_Code}`).catch(handleApiError);
  }
  getErpVendor_APIByP_A_N_No(P_A_N_No) {
    return http.get(`/getErpVendor_APIByP_A_N_No/${P_A_N_No}`).catch(handleApiError);
  }
  getErpVendor_APIByVendorId(ticketId) {
    return http.get(`/getErpVendor_APIByVendorId/${ticketId}`).catch(handleApiError);
  }
  updateTicketIdbyUserId(userId) {
    return http.put(`/updateTicketIdbyUserId/${userId}`).catch(handleApiError);
  }
  getVendorLedgerEntries() {
    return http.get('/getVendorLedgerEntries').catch(handleApiError);
  }
  getVendorLedgerEntriesById(Vendor_No) {
    return http.get(`/getVendorLedgerEntriesById/${Vendor_No}`).catch(handleApiError);
  }
  

  downloadCurrentAccountStatement() {
    return axios.get(
      `${process.env.REACT_APP_API_URL}/downloadCurrentAccountStatement/exportExcel`,
      { responseType: 'blob' }
    ).catch(handleApiError);
  }

  downloadAccStatementConfirmation() {
    return axios.get(
      `${process.env.REACT_APP_API_URL}/downloadAccStatementConfirmation/exportExcel`,
      { responseType: 'blob' }
    ).catch(handleApiError);
  }

  approveAccStatementDetail(value) {
    return axios.post(`${process.env.REACT_APP_API_URL}/approveAccStatementDetail`, value).catch(handleApiError);
  }

  rejectAccStatementDetail(data, No) {
    return axios.post(`${process.env.REACT_APP_API_URL}/rejectAccStatementDetail/${No}`, data).catch(handleApiError);
  }
  saveMasterLogin(data) {
    return http.post('/saveMasterLogin', data).catch(handleApiError);
  }

  getErpPurchaseOrder_API() {
    return axios.get(`${process.env.REACT_APP_API_URL}/getErpPurchaseOrder_API`).catch(handleApiError);
  }

  getErpPurchaseOrderLineEDD_API() {
    return http.get(`${process.env.REACT_APP_API_URL}/getErpPurchaseOrderLineEDD_API`).catch(handleApiError);
  }
  getPOfileDownload(){
    return http.get(`${process.env.REACT_APP_API_URL}/getPOfileDownload`, { responseType: 'blob' }).catch(handleApiError);
  }
  getErpPurchaseOrdersLists()
  {
    return http.get('/getErpPurchaseOrdersLists').catch(handleApiError);
  }
  getPo()
{
  return http.get('/getPo');
}
updatePo(data) {
  return axios.put(`${process.env.REACT_APP_API_URL}/updatePo`, data).catch(handleApiError);
}
savePO(data)
{
  return axios.post(`${process.env.REACT_APP_API_URL}/savePo`, data).catch(handleApiError);
}
getMailIdbyvendorNo(No)
{
  return http.get(`/getMailIdbyvendorNo/${No}`).catch(handleApiError);
}
updatePoInvoice(data)
{
  return axios.put(`${process.env.REACT_APP_API_URL}/updatePoInvoice`, data).catch(handleApiError);
}
mailApprovePo_Invoice(data)
{
  return axios.post(`${process.env.REACT_APP_API_URL}/POInvoiceMailApprove`, data).catch(handleApiError);
}
mailApproveFinance_order(data)
{
  return axios.post(`${process.env.REACT_APP_API_URL}/mailApprovePo_Invoice`, data).catch(handleApiError);
}
updateFinanceInvoiceApproval(data)
{
  return http.put(`/updateFinanceInvoiceApproval`,data).catch(handleApiError);
}
updateFinanceInvoiceReject(data)
{
  return axios.put(`${process.env.REACT_APP_API_URL}/updateFinanceInvoiceReject`, data).catch(handleApiError);
}

saveInvoiceInfo(data) {
  return axios.post(`${process.env.REACT_APP_API_URL}/saveInvoiceInfo`, data).catch(handleApiError);
}

uploadDocbyVendorCode(data){
  console.log("data-------->", data);
  return axios.post(`${process.env.REACT_APP_API_URL}/uploadDocbyVendorCode`, data).catch(handleApiError);
}

getOutOfIndiaVcode(ticketId) {
  return http.get(`/getOutOfIndiaVcode/${ticketId}`).catch(handleApiError);
}

getInvoiceinfo() {
  return http.get('/getInvoiceinfo').catch(handleApiError);
}

UpdateMasterVendorSubUserById(data) {
  return http.put('/UpdateMasterVendorSubUserById', data).catch(handleApiError);
}

getuserIdByVcode(vCode) {
  return http.get(`/getuserIdByVcode/${vCode}`).catch(handleApiError);
}

postEddDetails(data) {
  console.log("data------>", data);
  return http.post('/postEddDetails', data).catch(handleApiError);
}
getMasterVendorById(userId) {
  return http.post('/getMasterVendorById',userId).catch(handleApiError);
}
createsharepointFolderByTicketId(data)
{
  return http.post("/createsharepointFolderByTicketId",data).catch(handleApiError);
}

getSubuserId(subUserId) {
  return http.get(`/getSubuserId/${subUserId}`).catch(handleApiError);
}

getDocuments() {
  return http.get('/getDocuments');
}
  UpdateUserStatusByUserId(userId) {
    return http.put(`/updateVdetail/userStatus/${userId}`).catch(handleApiError);
  }
  updateMasterLogin(data) {
    return http.put(`/updateMasterLogin`, data).catch(handleApiError);
  }
  getErpStateCode(state) {
    return http.get(`/getErpStateCode/${state}`).catch(handleApiError);
  }
  GenerateVendorCode(data)
  {
    return http.post("/GenerateVendorCode",data).catch(handleApiError);
  }
  SearchpanNo(P_A_N_No,userId)
  {
    return http.get(`/SearchpanNo/${P_A_N_No}/${userId}`).catch(handleApiError);
  }
  resetUsernameAndPassword(data) {
    return http.post('/resetUsernameAndPassword', data).catch(handleApiError);
  }
  ReviewNewRegisteredVendorByMaster(userId) {
    return http.get(`/ReviewNewRegisteredVendorByMaster/${userId}`).catch(handleApiError);
  }
  getEditLogOfAllcollection(userId)
  {
    return http.get(`/getEditLogOfAllcollection/${userId}`).catch(handleApiError);
  }
}
export default new apiService();
