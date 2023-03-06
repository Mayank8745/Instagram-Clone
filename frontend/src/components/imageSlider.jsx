import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function ImageSlider({ images }) {
  const [slides, setSlides] = useState(images);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [url, setUrl] = useState(
    `http://localhost:8000/${slides.map((slide, i) => {
      if (i == currentIndex) {
        return slide.image_location;
      }
    })}`
  );

  const changeUrl = (temp) => {
    var n = temp.length;
    var newTemp = temp;
    while (newTemp[n - 1] === ",") {
      newTemp = temp.slice(0, n - 1);
      n = temp.length;
    }
    return newTemp;
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setUrl(
      (url) =>
        `http://localhost:8000/${slides.map((slide, i) => {
          if (i == currentIndex) {
            return slide.image_location;
          }
        })}`
    );
    console.log(url);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setUrl(
      (url) =>
        `http://localhost:8000/${slides.map((slide, i) => {
          if (i == currentIndex) {
            return slide.image_location;
          }
        })}`
    );
    console.log(url);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    setUrl(
      (url) => `http://localhost:8000/${slides[currentIndex].image_location}`
    );
  };

  return (
    <div className="max-w-[1400px] h-[500px] w-[40vw] m-auto   relative group">
      {console.log(changeUrl(url))}
      <div
        style={{
          backgroundImage: `url("${changeUrl(url)}")`,
        }}
        className={`w-full h-full  bg-center bg-cover duration-500`}
      ></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={20} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={20} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            {/* <RxDotFilled/> */}
          </div>
        ))}
      </div>
    </div>
  );
}
