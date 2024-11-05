"use client";

import { Carousel } from "flowbite-react";
import img1 from "../assets/Banner/img1.jpg"
import img2 from "../assets/Banner/img2.jpg"
import img3 from "../assets/Banner/img3.jpg"
import img4 from "../assets/Banner/img4.webp"
import img5 from "../assets/Banner/img5.jpg"
import img6 from "../assets/Banner/img6.jpg"
import img7 from "../assets/Banner/img7.jpg"

export function Banner() {
  return (
    <div className="h-56 sm:h-64 xl:h-45 2xl:h-96 flex items-center justify-center">
      <Carousel>
        <img className="object-contain mx-auto" src={img1} alt="..." />
        <img className="object-contain mx-auto" src={img2} alt="..." />
        <img className="object-contain mx-auto" src={img3} alt="..." />
        <img className="object-contain mx-auto" src={img4} alt="..." />
        <img className="object-contain mx-auto" src={img5} alt="..." />
        <img className="object-contain mx-auto" src={img6} alt="..." />
        <img className="object-contain mx-auto" src={img7} alt="..." />
      </Carousel>
    </div>
  );
}

export default Banner
