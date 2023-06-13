import { Outlet } from "react-router-dom";
import { SWRConfig } from "swr";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppShell } from "@mantine/core";
import Header from "./components/Header";
import MantineApp from "./components/Mantine";
import TimerContext from "@contexts/TimerContext";
import UserContext from "@contexts/UserContext";
import useAuth from "@hooks/useAuth";
import useTimer from "@hooks/useTimer";

const App = (): JSX.Element => {
  // Track timer data in top level component to ensure
  // accurate time as traversing the app
  const timerData = useTimer();
  const authData = useAuth();

  return (
    <MantineApp>
      <UserContext.Provider value={authData}>
        <AppShell
          header={<Header />}
          styles={{ main: { paddingLeft: 0, paddingRight: 0 } }}
        >
          {/* Only disabled to make server output cleaner for development */}
          <SWRConfig value={{ revalidateOnFocus: false }}>
            <TimerContext.Provider value={timerData}>
              <DndProvider backend={HTML5Backend}>
                <Outlet />
              </DndProvider>
            </TimerContext.Provider>
          </SWRConfig>
        </AppShell>
      </UserContext.Provider>
    </MantineApp>
  );
};

export default App;
