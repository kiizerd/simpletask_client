import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";
import MantineApp from "./components/Mantine";
import Header from "./components/Header";

const App = () => {
  return (
    <MantineApp>
      <AppShell
        header={<Header />}
        styles={{ main: { paddingLeft: 0, paddingRight: 0 } }}
      >
        <Outlet />
      </AppShell>
    </MantineApp>
  );
};

export default App;
