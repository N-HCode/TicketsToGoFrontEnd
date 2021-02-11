import HomePage from '../components/HomePage';
import CreateTicketPage from '../components/ticket/CreateTicketPage';
import MainNavBar from '../components/homepagecomponents/mainnav/MainNavBar'
import CreateOrganization from '../components/organization/CreateOrganizationPage';
import LoginPage from '../components/user/LoginPage';
import UserList from '../components/user/UserList';
import EditUserPage from '../components/user/EditUserPage';
import MyAccountPage from '../components/myaccountpage/MyAccount';
import AdminPage from '../components/adminpage/AdminPage';
import TicketAdminPage from '../components/ticketadminpage/TicketAdminPage';



const PATHS = {
    editUser: "/edituser",
    createTicket: "/createticket",
    userList: "/users",
    myAccount: "/myaccount",
    home: "/",
    adminPage: "/admin",
    ticketAdminPage: "/ticketadmin"
}

const NoNavPATHS = {
    login: "/login",
    createOrganization: "/createorganization",
}

export {PATHS, NoNavPATHS}
