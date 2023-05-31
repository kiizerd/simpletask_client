import UserContext from "@contexts/UserContext"
import ProjectIndexPage from "project_index/ProjectIndex"
import { useContext } from "react"
import LandingPage from "./LandingPage"

const RootPage = (): JSX.Element => {
  const { currentUser } = useContext(UserContext)

  if (currentUser) return <ProjectIndexPage />
  return (<LandingPage />)
}

export default RootPage
