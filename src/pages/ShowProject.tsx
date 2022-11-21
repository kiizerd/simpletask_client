import { Button, Container, Group, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { getProject } from "../api/api"
import { Project } from "../types/models"

const ShowProjectPage = () => {
  const id = Number(useLoaderData())
  const [project, setProject] = useState<Project>()

  useEffect(() => {    
    getAndSetProject()
  }, [])

  const getAndSetProject = async () => {
    setProject(await getProject(id))
  }

  if (!project) return <></>
  return <Container>
    <Group position="apart">
      <Title>{project.title}</Title>
      <Group>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Group>
    </Group>
    <Text>{project.description}</Text>

  </Container>
}

export default ShowProjectPage