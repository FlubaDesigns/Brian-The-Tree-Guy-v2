/** Public content contracts; this site has no database or account backend. */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  order: number;
}
