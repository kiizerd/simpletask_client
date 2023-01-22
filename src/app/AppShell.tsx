import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";
import MantineApp from "./components/Mantine";
import Header from "./components/Header";

const App = () => {
  return (
    <MantineApp>
      <AppShell
        header={<Header />}
        styles={{ main: { padding: 0, margin: 0, minHeight: "unset" } }}
      >
        <Outlet />
      </AppShell>
    </MantineApp>
  );
};

export default App;
