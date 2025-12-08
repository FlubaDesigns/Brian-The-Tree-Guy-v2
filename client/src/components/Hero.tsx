import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    src: "/images/englewood-fl-tree-services.jpg",
    alt: "Professional tree services in Englewood Florida"
  },
  {
    src: "/images/englewood-fl-tree-removal.jpg",
    alt: "Expert tree removal services"
  },
  {
    src: "/images/englewood-fl-stump-grinding.jpg",
    alt: "Stump grinding services"
  },
  {
    src: "/images/englewood-fl-tree-trimming.jpg",
    alt: "Tree trimming in Englewood Florida"
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="hero-slider" data-testid="section-hero">
      <div className="hero-slider-container">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide hero-slide-${index} ${index === currentIndex ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
            aria-hidden={index !== currentIndex}
          />
        ))}
        
        <div className="hero-overlay" />
        
        <button 
          className="hero-nav-btn hero-nav-prev"
          onClick={goToPrevious}
          aria-label="Previous slide"
          data-testid="button-hero-prev"
        >
          <ChevronLeft />
        </button>
        
        <button 
          className="hero-nav-btn hero-nav-next"
          onClick={goToNext}
          aria-label="Next slide"
          data-testid="button-hero-next"
        >
          <ChevronRight />
        </button>


        <div className="hero-dots">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              data-testid={`button-hero-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
