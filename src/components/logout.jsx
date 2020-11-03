import { logout } from "./../services/authService";

function Logout() {
  logout();
  window.location = "/";
  return null;
}

export default Logout;
