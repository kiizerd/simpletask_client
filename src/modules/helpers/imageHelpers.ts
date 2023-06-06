import imageCount from "imageCount";

export default function getImage(index?: number): string {
  const randomNumber: number = Math.floor(Math.random() * (imageCount + 1));
  const image = index ? index % imageCount : randomNumber;
  return `./1k/${image}.png`;
}
