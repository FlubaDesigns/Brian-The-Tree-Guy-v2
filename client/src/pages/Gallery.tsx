import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Phone, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import type { GalleryImage } from "@shared/schema";

const fallbackImages = [
  { id: "1", src: "/images/brian-the-tree-guy-oak-trees-trimmed-before.jpg", alt: "Oak Trees Before Trimming", order: 1 },
  { id: "2", src: "/images/brian-the-tree-guy-oak-trees-trimmed-after.jpg", alt: "Oak Trees After Trimming", order: 2 },
  { id: "3", src: "/images/brian-the-tree-guy-tree-trimming-before.jpg", alt: "Tree Trimming Before", order: 3 },
  { id: "4", src: "/images/brian-the-tree-guy-tree-trimming-after.jpg", alt: "Tree Trimming After", order: 4 },
  { id: "5", src: "/images/brian-the-tree-guy-palm-tree-trimming-during.jpg", alt: "Palm Tree Trimming In Progress", order: 5 },
  { id: "6", src: "/images/brian-the-tree-guy-palm-tree-trimming-during2.jpg", alt: "Palm Tree Trimming Work", order: 6 },
  { id: "7", src: "/images/brian-the-tree-guy-palm-tree-trimming-after.jpg", alt: "Palm Tree Trimming After", order: 7 },
  { id: "8", src: "/images/storm-damage-tree-removal-in-englewood-fl.jpg", alt: "Storm Damage Tree Removal in Englewood FL", order: 8 },
  { id: "9", src: "/images/tall-palm-trimming-englewood-florida.jpg", alt: "Tall Palm Trimming in Englewood Florida", order: 9 },
];

function GallerySkeleton() {
  return (
    <Card className="gallery-card">
      <Skeleton className="aspect-square" />
      <div className="gallery-card-caption">
        <Skeleton className="skeleton-caption" />
      </div>
    </Card>
  );
}

function GalleryPlaceholder({ alt }: { alt: string }) {
  return (
    <Card
      className="aspect-square gallery-placeholder bg-muted"
      data-testid={`placeholder-${alt.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <ImageOff className="gallery-placeholder-icon gallery-placeholder-icon-color" />
      <p className="gallery-placeholder-text">Image Coming Soon</p>
    </Card>
  );
}

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const { data: apiImages, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/data/gallery.json"],
  });

  const galleryImages = apiImages && apiImages.length > 0 ? apiImages : fallbackImages;

  const handleImageClick = (index: number) => {
    const image = galleryImages[index];
    if (!imageErrors.has(image.id)) {
      setCurrentIndex(index);
      setLightboxOpen(true);
    }
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const validImages = galleryImages.filter((img) => !imageErrors.has(img.id));
  const validIndex = validImages.findIndex((img) => img.id === galleryImages[currentIndex]?.id);

  return (
    <div className="page-container" data-testid="page-gallery">
      <section className="section bg-card-color" data-testid="section-gallery-header">
        <div className="section-content page-header">
          <h1 className="text-page-title">
            Our Work
          </h1>
          <p className="text-page-subtitle">
            Browse our gallery to see examples of our professional tree services. From trimming to complete removal, we take pride in every project.
          </p>
        </div>
      </section>

      <section className="section bg-default" data-testid="section-gallery-grid">
        <div className="section-content">
          {isLoading ? (
            <div className="gallery-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <GallerySkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <div key={image.id} className="pos-relative">
                  {imageErrors.has(image.id) ? (
                    <GalleryPlaceholder alt={image.alt} />
                  ) : (
                    <Card
                      className="gallery-card"
                      onClick={() => handleImageClick(index)}
                      data-testid={`card-gallery-${image.id}`}
                    >
                      <div className="aspect-square gallery-card-image-wrapper">
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className="gallery-card-image"
                          onError={() => handleImageError(image.id)}
                          data-testid={`img-gallery-${image.id}`}
                        />
                        <div className="gallery-card-overlay" />
                      </div>
                      <div className="gallery-card-caption bg-card-color">
                        <p className="gallery-caption">
                          {image.alt}
                        </p>
                      </div>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section cta-section" data-testid="section-gallery-cta">
        <div className="cta-content">
          <h2 className="text-cta-title">
            Like What You See?
          </h2>
          <p className="text-cta-subtitle">
            Let us bring the same quality and professionalism to your property. Call today for a free estimate!
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="btn-cta"
            data-testid="button-gallery-call"
          >
            <a href="tel:941-445-2234" className="btn-link-content">
              <Phone className="icon-md" />
              Call Now – 941-445-2234
            </a>
          </Button>
        </div>
      </section>

      <GalleryLightbox
        images={validImages.map((img) => ({ src: img.src, alt: img.alt }))}
        currentIndex={validIndex >= 0 ? validIndex : 0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
