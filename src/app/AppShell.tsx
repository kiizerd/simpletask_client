import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";
import MantineApp from "./components/Mantine";
import Header from "./components/Header";
import TimerContext from "@contexts/TimerContext";
import useTimer from "@hooks/useTimer";

const App = () => {
  // Track timer data in top level component to ensure
  // accurate time as traversing the app
  const timerData = useTimer();

  return (
    <MantineApp>
      <AppShell
        header={<Header />}
        styles={{ main: { paddingLeft: 0, paddingRight: 0 } }}
      >
        <TimerContext.Provider value={timerData}>
          <Outlet />
        </TimerContext.Provider>
      </AppShell>
    </MantineApp>
  );
};

export default App;
