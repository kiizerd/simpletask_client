import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";
import MantineApp from "./components/Mantine";
import Header from "./components/Header";
import TimerContext from "@contexts/TimerContext";
import useTimer from "@hooks/useTimer";
import UserContext from "@contexts/UserContext";
import useAuth from "@hooks/useAuth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SWRConfig } from "swr";

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
          styles={(theme) => ({
            main: {
              paddingLeft: 0,
              paddingRight: 0,
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.colors.gray[1],
            },
          })}
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
