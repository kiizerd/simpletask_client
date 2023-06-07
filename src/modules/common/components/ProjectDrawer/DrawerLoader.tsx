import { Accordion, Loader } from "@mantine/core";

interface DrawerLoaderProps {
  id: number;
}

const DrawerLoader = ({ id }: DrawerLoaderProps): JSX.Element => (
  <Accordion.Item key={id} value={"loading"}>
    <Loader size="sm" m="md" mb={5} />
  </Accordion.Item>
);

export default DrawerLoader;
