"use client";

import { Carousel } from "flowbite-react";
import img1 from "../assets/Banner/img1.jpeg"
import img2 from "../assets/Banner/img2.jpg"
import img3 from "../assets/Banner/img3.jpg"
import img4 from "../assets/Banner/prueba1.jpg"
import img5 from "../assets/Banner/img5.webp"
import img6 from "../assets/Banner/images.jpeg"

export function Banner() {
  return (
    <div className="sm:h-64 xl:h-80 2xl:h-96 ">
      <Carousel>
        <img className="w-full h-96" src={img1} alt="..." />
        <img className="w-full h-96" src={img2} alt="..." />
        <img className="w-full h-96" src={img3} alt="..." />
        <img className="w-full h-96" src={img4} alt="..." />
        <img className="w-full h-96" src={img5} alt="..." />
        <img className="w-full h-96" src={img6} alt="..." />
      </Carousel>
    </div>

  );
}

export default Banner
