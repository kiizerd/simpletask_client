import imageCount from "imageCount";

export default function getImage(index?: number): string {
  const randomNumber: number = Math.floor(Math.random() * (imageCount + 1));
  const image = index ? index % imageCount : randomNumber;
  return urls[image];
}

const urls = [
  "https://iili.io/H6BZUR1.png",
  "https://iili.io/H6BZSHP.png",
  "https://iili.io/H6BZvUB.png",
  "https://iili.io/H6BZeKQ.png",
  "https://iili.io/H6BZNix.png",
  "https://iili.io/H6BZwVj.png",
  "https://iili.io/H6BZjob.png",
  "https://iili.io/H6BZXDu.png",
  "https://iili.io/H6BZWNe.png",
  "https://iili.io/H6BZVR9.png",
  "https://iili.io/H6BZMH7.png",
  "https://iili.io/H6BZESS.png",
  "https://iili.io/H6BZ1l2.png",
  "https://iili.io/H6BZ0Kl.png",
  "https://iili.io/H6BZcP4.png",
  "https://iili.io/H6BZaVf.png",
  "https://iili.io/H6BZYoG.png",
  "https://iili.io/H6BZRNn.png",
  "https://iili.io/H6BQeyX.png",
  "https://iili.io/H6BQOvt.png",
  "https://iili.io/H6BQNaI.png",
  "https://iili.io/H6BQw3N.png",
  "https://iili.io/H6BQh4p.png",
  "https://iili.io/H6BQWCv.png",
  "https://iili.io/H6BQMZJ.png",
  "https://iili.io/H6BQGja.png",
  "https://iili.io/H6BQ0yF.png",
  "https://iili.io/H6BQlv1.png",
  "https://iili.io/H6BQcYP.png",
  "https://iili.io/H6BQ74V.png",
  "https://iili.io/H6BQ5EQ.png",
  "https://iili.io/H6BQRCx.png",
  "https://iili.io/H6BQuQj.png",
  "https://iili.io/H6BQThb.png",
  "https://iili.io/H6BQITu.png",
  "https://iili.io/H6BQxpe.png",
];
