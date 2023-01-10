import { createContext } from "react";
import Section from "types/Section";

const defaultSection = new Section(0, {});
const SectionContext = createContext(defaultSection);
export default SectionContext;
