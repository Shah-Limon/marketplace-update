import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Shared/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./components/Shared/Footer/Footer";
import RequireAuth from "./components/Shared/RequireAuth";
import Dashboard from "./Pages/Dashboard";
import Orders from "./Pages/Orders";
import Pricing from "./Pages/Pricing";
import AdminRoute from "./components/Shared/Footer/AdminRoute";
import AllMessages from "./Pages/ContactUsMessage/AllMessages";
import AllInvoice from "./Pages/Invoice/AllInvoice";
import CreateInvoice from "./Pages/Invoice/CreateInvoice";
import GenerateInvoice from "./Pages/Invoice/GenerateInvoice";
import InvoicePayment from "./Pages/Invoice/InvoicePayment";
import Services from "./Pages/Services/Services";
import Packages from "./Pages/Packages/Packages";
import Employees from "./Pages/Employees/Employees";
import FindLeads from "./Pages/Leads/FindLeads";
import FindLinkedinProfiles from "./Pages/Leads/FindLinkedinProfiles";
import GenerateAiArticles from "./Pages/GenerateAiArticles/GenerateAiArticles";
import MyLeads from "./Pages/Leads/MyLeads";
import Admin from "./Pages/Users/Admin";
import Managers from "./Pages/Users/Managers";
import EmailTemplate from "./Pages/EmailTemplate/EmailTemplate";
import Graphics from "./Pages/SMM/Graphics";
import Videos from "./Pages/SMM/Videos";
import NewsLatter from "./Pages/NewsLatter/NewsLatter";
import ApiSetting from "./Pages/Settings/ApiSetting";
import HomepageSetting from "./Pages/Settings/HomepageSetting";
import HelpOption from "./Pages/Settings/HelpOption";
import WhyChooseOption from "./Pages/Settings/WhyChooseOption";
import TestimonialsOption from "./Pages/Settings/TestimonialsOption";
import AllSetting from "./Pages/Settings/AllSetting";
import PaymentSetting from "./Pages/Settings/PaymentSetting";
import SellerDashboard from "./components/Seller/SellerDashboard";
import Products from "./components/Seller/Products/Products";
import Category from "./components/Seller/Category/Category";
import BuyerDashboard from "./components/Buyer/BuyerDashboard";
import SellerOrders from "./components/Seller/Orders/SellerOrders";
import BuyerOrders from "./components/Buyer/BuyerOrders";
import PaymentPending from "./components/Buyer/PaymentPending";
import Withdraw from "./components/Seller/Withdraw/Withdraw";
import Commission from "./Pages/Settings/Commission";
import { Toaster } from "react-hot-toast";
import AllWithdrawal from "./Pages/AllWithdrawal.js/AllWithdrawal";
import AllProducts from "./Pages/Orders/AllProducts";
import PayNow from "./components/Buyer/PayNow";
import UpdateProfile from "./components/Buyer/UpdateProfile";
import SellerProfileUpdate from "./components/Seller/SellerProfileUpdate";
import SupportMessage from "./components/Buyer/SupportMessage";
import AdminSupportMessage from "./Pages/SupportMessage/AdminSupportMessage";
import AllDashboard from "./Pages/AllDashboard/AllDashboard";
import AdminAuth from "./components/Shared/AdminAuth";
import SellerAuth from "./components/Shared/SellerAuth";
import BuyerAuth from "./components/Shared/BuyerAuth";


function App() {
  return (
    <div id="layout-wrapper">
      <Toaster />
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<RequireAuth><AllDashboard></AllDashboard></RequireAuth>}></Route>
        
        <Route path="/admin/dashboard" element={<RequireAuth><AdminAuth><Dashboard></Dashboard></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/messages" element={<RequireAuth><AdminAuth><AllMessages></AllMessages></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/support-messages" element={<RequireAuth><AdminAuth><AdminSupportMessage></AdminSupportMessage></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/orders" element={<RequireAuth><AdminAuth><Orders></Orders></AdminAuth></RequireAuth>}></Route>

        <Route path="/admin/all-withdrawal" element={<RequireAuth><AdminAuth><AllWithdrawal></AllWithdrawal></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/all-products" element={<RequireAuth><AdminAuth><AllProducts></AllProducts></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/categories" element={<RequireAuth><AdminAuth><Category></Category></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/users/admins" element={<RequireAuth><AdminAuth><Admin></Admin></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/settings" element={<RequireAuth><AdminAuth><AllSetting></AllSetting></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/setting/homepage" element={<RequireAuth><AdminAuth><HomepageSetting></HomepageSetting></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/setting/paypal" element={<RequireAuth><AdminAuth><PaymentSetting></PaymentSetting></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/setting/commission" element={<RequireAuth><AdminAuth><Commission></Commission></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/homepage-setting" element={<RequireAuth><AdminAuth><HomepageSetting></HomepageSetting></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/setting/help-option" element={<RequireAuth><AdminAuth><HelpOption></HelpOption></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/setting/why-choose-option" element={<RequireAuth><AdminAuth><WhyChooseOption></WhyChooseOption></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/setting/testimonials-option" element={<RequireAuth><AdminAuth><TestimonialsOption></TestimonialsOption></AdminAuth></RequireAuth>}></Route>
        <Route path="/admin/set-newslatter" element={<RequireAuth><AdminAuth><NewsLatter></NewsLatter></AdminAuth></RequireAuth>}></Route>

        {/* seller */}
        <Route path="/seller/dashboard" element={<RequireAuth><SellerAuth><SellerDashboard></SellerDashboard></SellerAuth></RequireAuth>}></Route>
        <Route path="/seller/products" element={<RequireAuth><SellerAuth><Products></Products></SellerAuth></RequireAuth>}></Route>
        <Route path="/seller/orders" element={<RequireAuth><SellerAuth><SellerOrders></SellerOrders></SellerAuth></RequireAuth>}></Route>
        <Route path="/seller/withdraw" element={<RequireAuth><SellerAuth><Withdraw></Withdraw></SellerAuth></RequireAuth>}></Route>
        <Route path="/seller/update-profile" element={<RequireAuth><SellerAuth><SellerProfileUpdate></SellerProfileUpdate></SellerAuth></RequireAuth>}></Route>

        {/* buyer */}
        <Route path="/buyer/dashboard" element={<RequireAuth><BuyerAuth><BuyerDashboard></BuyerDashboard></BuyerAuth></RequireAuth>}></Route>
        <Route path="/buyer/orders" element={<RequireAuth><BuyerAuth><BuyerOrders></BuyerOrders></BuyerAuth></RequireAuth>}></Route>
        <Route path="/buyer/pending-payment" element={<RequireAuth><BuyerAuth><PaymentPending></PaymentPending></BuyerAuth></RequireAuth>}></Route>
        <Route path="/pay-now/" element={<RequireAuth><BuyerAuth><PaymentPending></PaymentPending></BuyerAuth></RequireAuth>}></Route>
        <Route path="/pay-now/:id" element={<RequireAuth><BuyerAuth><PayNow></PayNow></BuyerAuth></RequireAuth>}></Route>
        <Route path="/buyer/update-profile" element={<RequireAuth><BuyerAuth><UpdateProfile></UpdateProfile></BuyerAuth></RequireAuth>}></Route>
        <Route path="/buyer/support" element={<RequireAuth><BuyerAuth><SupportMessage></SupportMessage></BuyerAuth></RequireAuth>}></Route>













        <Route path="/invoice" element={<RequireAuth><AllInvoice></AllInvoice></RequireAuth>}></Route>
        <Route path="/invoice/:id" element={<RequireAuth><GenerateInvoice></GenerateInvoice></RequireAuth>}></Route>
        <Route path="/invoice-payment/:id" element={<RequireAuth><InvoicePayment></InvoicePayment></RequireAuth>}></Route>
        <Route path="/services" element={<RequireAuth><Services></Services></RequireAuth>}></Route>
        <Route path="/packages" element={<RequireAuth><Packages></Packages></RequireAuth>}></Route>
        <Route path="/employees" element={<RequireAuth><Employees></Employees></RequireAuth>}></Route>

        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
