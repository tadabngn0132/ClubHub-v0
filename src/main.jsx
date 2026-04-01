import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { setUnauthorizedHandler } from "./services/axios.js";
import { logoutUser } from "./store/slices/authSlice.js";
import { initializeAuthSession } from "./utils/helper.js";

initializeAuthSession();

setUnauthorizedHandler(async () => {
  const dispatch = store.dispatch;
  await dispatch(logoutUser());

  if (window.location.pathname !== "/sign-in") {
    window.location.href = "/sign-in";
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
