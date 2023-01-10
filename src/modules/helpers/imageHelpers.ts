import image1 from "../../assets/AutumnForest.jpg";
import image2 from "../../assets/DesertMountains.jpg";
import image3 from "../../assets/CountryRoadStormy.jpg";
import image4 from "../../assets/MossyCanyon.jpg";
import image5 from "../../assets/VerticalHill.jpg";

const gallery: string[] = [image1, image2, image3, image4, image5];

// Globbing method seems to not work in production
// Haven't tried with vite 4
//
// const images = import.meta.glob("../assets/**/*.jpg");
// for (const imagePath in images) {
//   images[imagePath]().then(() => {
//     const imageURL = new URL(imagePath, import.meta.url);
//     gallery.push(imageURL);
//   });
// }

export default function getImage() {
  return gallery[Math.floor(Math.random() * gallery.length)];
}

export function getAllImages() {
  return gallery;
}
