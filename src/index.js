import App from "./App.js";
import "./style2.scss";

try {
  const $app = document.querySelector("#app");
  new App($app);
} catch (e) {
  alert(e.message);
}
