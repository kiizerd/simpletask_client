import { AppShell } from "@mantine/core";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import MantineApp from "./Mantine";

const App = () => {
  return (
    <MantineApp>
      <AppShell
        header={<Header />}
        styles={{ main: { padding: 0, margin: 0 } }}
      >
        <Outlet />
      </AppShell>
    </MantineApp>
  );
};

export default App;
