import React, { useState, useEffect } from 'react';
import { Route, useLocation } from 'react-router';
import { Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from './component/signUp';
import Login from './component/login';
import { AdminRoute, UserRoute, CommonRoute,FinanceRoute,OtherRoute,VCTRoute,MRTRoute,JapanRoute,TDSTeamRoute,AggrementTeamRoute,FinanceTeamRoute,PurchaseTeamRoute } from './auth/PrivateRoute';
import Navbar1 from './common/navbar';
import Spinner from './common/spinner';
import Basic from './component/Basic.js';
import Statutory from './component/StatutoryDetails.js';
import Bank from './component/BankDetails.js';
import NewUser from './component/NewUser';
import Password from './component/password';
import FinancialDetail from './component/FinancialDetail';
import ComplianceDetail from './component/Compliance';
import ContactTeam from './component/ContactTeam';
import AdminPage from './component/AdminPage';
import ApprovedVendors from './component/ApprovedVendors';
import RejectedVendors from './component/RejectedVendors';
import JapanTeam from './component/JapanTeam';
import JapanApprovedvendors from './component/JapanApprovedvendors';
import JapanRejectedVendors from './component/JapanRejectedVendors';
import MRTteam from './component/MRTteam';
import MRTapprovedvendors from './component/MRTapprovedvendors';
import MRTrejectedvendors from './component/MRTrejectedvendors';
import ApprovalRequest from './component/ApprovalRequest';
import VendorPortalHeader from './common/VendorPortalHeader';
import MasterVendorHeader from './common/MasterVendorHeader';
import MasterVendorSidemenu from './common/MasterVendorSidemenu';
import Documents from './component/Documents';
import AccountStatements from './component/AccountStatements';
import UserCreation from './component/UserCreation';
import UserAccess from './component/UserAccess';
import PoApproval from './component/PoApproval';
import PoApproved from './component/PoApproved';
import PoReject from './component/PoReject';
import EstimateDeliveryDate from './component/EstimateDeliveryDate';
import PoVendor from './component/PoVendor';
import InvoiceTeam from './component/InvoiceTeam';
import InvoiceApproved from './component/InvoiceApproved';
import InvoiceRejected from './component/InvoiceRejected';
import InvoicePortal from './component/InvoicePortal';
import VendorHomePage from './component/VendorHomePage';
import FinanceTeam from './component/FinanceTeam';
import FinanceTeamApproved from './component/FinanceTeamApproved';
import FinanceTeamRejected from './component/FinanceTeamReject';
import Assent from './component/Assent';
import AgreementDocuments from './component/AgreementDocuments';

const MainRouter = () => {
  const { isLoggedIn } = useSelector((state) => state.onlineStatus);
  const [state, setState] = useState({
    userInfo: JSON.parse(window.sessionStorage.getItem('jwt')),
    userName: '',
    userRole: '',
    verifiedUser: '',
  });
  console.log(isLoggedIn);
  const pathname = useLocation().pathname;
  useEffect(() => {
    state.userInfo = JSON.parse(window.sessionStorage.getItem('jwt'));
    state.verifiedUser = state?.userInfo?.user?.verifiedUser;
    state.userRole = state?.userInfo?.user?.role;
  }, [pathname, isLoggedIn]);
  return (
    <div>
      <Routes>
        {/* adminroute */}
        <Route element={<AdminRoute />}>
          <Route path="/userCreation" element={<UserCreation />} />
          <Route path="/UserAccess" element={<UserAccess />} />
          <Route path="/UserAccess/:Parent_Vendor_Code" element={<UserAccess />} />
        </Route>
        {/* userRoutes */}
        <Route element={<UserRoute />}></Route>
        {/* CommonRoute */}
        <Route element={<CommonRoute />}>
          <Route path="/statutory" element={<Statutory />} />
          <Route path="/statutory/:userId" element={<Statutory />} />
          <Route path="/FinancialDetail" element={<FinancialDetail />} />
          <Route
            path="/FinancialDetail/:userId"
            element={<FinancialDetail />}
          />
          <Route path="/ComplianceDetail" element={<ComplianceDetail />} />
          <Route
            path="/ComplianceDetail/:userId"
            element={<ComplianceDetail />}
          />
          <Route path="/ContactTeam" element={<ContactTeam />} />
          <Route path="/ContactTeam/:userId" element={<ContactTeam />} />
          <Route path="/basic" element={<Basic />} />
          <Route path="/basic/:userId" element={<Basic />} />
          <Route path="/basic/newReg/:newReg" element={<Basic />} />
          <Route
            path="/bank/:userId"
            element={<Bank user={state.userInfo} />}
          />
          <Route path="/bank" element={<Bank user={state.userInfo} />} />{' '}
        </Route>
         {/*FinanceRoute */}
        <Route element={<FinanceRoute />}>
          
          </Route>
                {/*otherRoutes */}
        {/* <Route element={<OtherRoute />}> */}
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/:vId" element={<Documents />} />
        {/* </Route> */}
        {/*VCTRoutes */}
        <Route element={<VCTRoute/>}>
        <Route path="/approval" element={<AdminPage />} />
        <Route path="/approvedVendors" element={<ApprovedVendors />} />
        <Route path="/rejectedVendors" element={<RejectedVendors />} />
          </Route>
          {/*MRTRoutes */}
          <Route element={<MRTRoute />}>
          <Route path="/MRTteam" element={<MRTteam />} />
        <Route path="/MRTapprovedvendors" element={<MRTapprovedvendors />} />
        <Route path="/MRTrejectedvendors" element={<MRTrejectedvendors />} />
          </Route>
            {/*JapanRoutes */}
            <Route element={<JapanRoute />}>
            <Route path="/japanTeam" element={<JapanTeam />} />
        <Route
          path="/japanapprovedVendors"
          element={<JapanApprovedvendors />}
        />
        <Route
          path="/japanrejectedVendors"
          element={<JapanRejectedVendors />}
        />
          </Route>
        <Route path="/" element={<NewUser />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="Test" element={<Test />} /> */}
        <Route path="/Navbar" element={<Navbar1 />} />
        <Route path="/Spinner" element={<Spinner />} />
        <Route path="/passwordGeneration" element={<Password />} />
        <Route
          path="/passwordGeneration/:emailId/:mailConfirmationCode/:userName"
          element={<Password />}
        />
         <Route
          path="/passwordGeneration/:emailId/:mailConfirmationCode/:userName/:new"
          element={<Password />}
        />
        <Route path="/approvalReq" element={<ApprovalRequest />} />
        <Route path="/vendorPortal" element={<VendorPortalHeader />} />
        <Route path="/MasterVendorHeader" element={<MasterVendorHeader />} />
        <Route
          path="/MasterVendorSidemenu"
          element={<MasterVendorSidemenu />}
        />
       
        <Route path="/acStatement" element={<AccountStatements />} />
        <Route path="/estimateDD" element={<EstimateDeliveryDate />} />
        <Route path="/povendor" element={<PoVendor />} />
        <Route path="/invoiceTeam" element={<InvoiceTeam />} />
        <Route path="/invoiceApproved" element={<InvoiceApproved />} />
        <Route path="/invoiceRejected" element={<InvoiceRejected />} />
        <Route path="/invoicePortal" element={<InvoicePortal />} />
        <Route path="/Homesidemenu" element={<VendorHomePage />} />
                {/* TDSTeamRoute */}
                <Route element={<TDSTeamRoute />}>
          {/* <Route path="/test" element={<tds />} /> */}
          </Route>
          {/* AggrementTeamRoute */}
          <Route element={<AggrementTeamRoute />}>
          {/* <Route path="/agree" element={<Agres />} /> */}
          </Route>
          {/* financeTeam */}
          <Route element={<FinanceTeamRoute />}>
          <Route path="/FinanceTeam" element={<FinanceTeam />} />
        <Route path="/FinanceTeamApproved" element={<FinanceTeamApproved />} />
        <Route path="/FinanceTeamRejected" element={<FinanceTeamRejected />} />
          </Route>
          {/* PurchaseTeamRoute */}
          <Route element={<PurchaseTeamRoute />}>
          <Route path="/poTeam" element={<PoApproval />} />
        <Route path="/poApproved" element={<PoApproved />} />
        <Route path="/poRejected" element={<PoReject />} />
          </Route>

        <Route path="/assent" element={<Assent/>} />
        <Route path="/agreementDocuments" element={<AgreementDocuments />} />
      </Routes>
    </div>
  );
};
export default MainRouter;
