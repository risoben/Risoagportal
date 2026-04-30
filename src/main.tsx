
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { PasswordProtect } from "./app/components/PasswordProtect.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <PasswordProtect>
      <App />
    </PasswordProtect>
  );
  