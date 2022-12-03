const images = import.meta.glob("../assets/**/*.jpg");
const gallery: URL[] = [];

for (const imagePath in images) {
  images[imagePath]().then(() => {
    const imageURL = new URL(imagePath, import.meta.url);
    gallery.push(imageURL);
  });
}

export default function getImage() {
  return gallery[Math.floor(Math.random() * gallery.length)]
}

export function getAllImages() {
  return gallery
}
