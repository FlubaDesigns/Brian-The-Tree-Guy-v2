import { Link } from "wouter";
import { Phone, Shield, Clock, Award, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { VideoPlayer } from "@/components/VideoPlayer";

const featuredServices = [
  {
    title: "Tree Trimming",
    description: "Professional trimming to maintain the health and appearance of your trees. We shape trees for optimal growth and aesthetic appeal.",
    icon: "scissors",
  },
  {
    title: "Tree Removal",
    description: "Safe and efficient removal of unwanted or hazardous trees. We handle trees of all sizes with proper equipment and expertise.",
    icon: "axe",
  },
  {
    title: "Stump Grinding",
    description: "Complete stump removal to reclaim your yard space. Our grinding service eliminates stumps below ground level.",
    icon: "tree",
  },
];

const features = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Complete liability insurance for your peace of mind",
  },
  {
    icon: Clock,
    title: "Free Estimates",
    description: "No-obligation quotes for all tree services",
  },
  {
    icon: Award,
    title: "20+ Years Experience",
    description: "Trusted expertise in Englewood and surrounding areas",
  },
];

const testimonials = [
  {
    name: "Robert M.",
    location: "Englewood, FL",
    text: "Brian and his crew did an excellent job trimming our large oak trees. Very professional, cleaned up everything, and the price was fair. Highly recommend!",
    rating: 5,
  },
  {
    name: "Susan T.",
    location: "Rotonda West, FL",
    text: "After the storm, Brian was out the next day to remove the fallen trees from our yard. Fast, efficient, and reasonably priced. Will definitely use again.",
    rating: 5,
  },
  {
    name: "James K.",
    location: "Manasota Key, FL",
    text: "Great service for our palm tree trimming. They were on time, did quality work, and left the property spotless. Senior discount was a nice bonus!",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div data-testid="page-home">
      <Hero />

      <section className="section bg-default" data-testid="section-features">
        <div className="section-content">
          <div className="grid-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="card-transparent card-feature"
                data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CardContent className="card-content">
                  <div className="card-icon bg-primary-light">
                    <feature.icon className="icon-lg icon-primary" />
                  </div>
                  <h3 className="text-card-title">{feature.title}</h3>
                  <p className="text-card-description">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card-color" data-testid="section-services-preview">
        <div className="section-content">
          <div className="section-header">
            <h2 className="text-section-title">Our Tree Services</h2>
            <p className="text-section-subtitle">
              Professional tree care services for residential and commercial properties in Englewood, Manasota Key, and throughout Sarasota and Charlotte counties.
            </p>
          </div>

          <div className="grid-3">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>

          <div className="section-header" style={{ marginTop: '2.5rem', marginBottom: 0 }}>
            <Button asChild size="lg" variant="outline" data-testid="button-view-all-services">
              <Link href="/services">
                <span className="flex-center gap-sm">
                  View All Services
                  <ChevronRight className="icon-sm" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-default" data-testid="section-video">
        <div className="section-content">
          <div className="grid-2-lg">
            <div>
              <h2 className="text-section-title">Watch Us Work</h2>
              <p className="text-muted space-y-md">
                See our team in action! From precise tree trimming to complete removal, 
                we handle every job with professionalism and care. Click the expand button 
                to view in fullscreen.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Button asChild data-testid="button-video-cta">
                  <a href="tel:941-445-2234" className="flex-center gap-sm">
                    <Phone className="icon-sm" />
                    Get a Free Estimate
                  </a>
                </Button>
              </div>
            </div>
            <div>
              <VideoPlayer 
                title="Professional Tree Services in Englewood"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-card-color" data-testid="section-testimonials">
        <div className="section-content">
          <div className="section-header">
            <h2 className="text-section-title">What Our Customers Say</h2>
            <p className="text-section-subtitle">
              See why Englewood residents trust Brian The Tree Guy for all their tree care needs.
            </p>
          </div>

          <div className="grid-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card" data-testid={`card-testimonial-${index}`}>
                <CardContent className="card-content">
                  <Quote className="quote-icon" />
                  <div className="testimonial-stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="star-filled" />
                    ))}
                  </div>
                  <p className="text-muted text-italic testimonial-text">
                    "{testimonial.text}"
                  </p>
                  <div className="testimonial-author">
                    <p className="text-card-title">{testimonial.name}</p>
                    <p className="text-small text-muted">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section" data-testid="section-cta">
        <div className="cta-content">
          <h2 className="text-cta-title">Need Tree Service? Call Today!</h2>
          <p className="text-cta-subtitle">
            Get a free estimate for your tree care needs. We serve all of Englewood and surrounding areas with prompt, professional service.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            data-testid="button-cta-call"
          >
            <a href="tel:941-445-2234" className="flex-center gap-sm">
              <Phone className="icon-md" />
              Call Now – 941-445-2234
            </a>
          </Button>
        </div>
      </section>

      <section className="section bg-default" data-testid="section-about">
        <div className="section-content">
          <div className="grid-2-lg">
            <div>
              <h2 className="text-about-title">Trusted Tree Care in Englewood</h2>
              <div className="about-content text-about-body">
                <p>
                  Brian The Tree Guy has been providing professional tree services to Englewood, Manasota Key, and the surrounding areas for over 20 years. Our experienced team handles everything from routine trimming to complete tree removal throughout Sarasota and Charlotte counties.
                </p>
                <p>
                  We take pride in our work and treat every property with care and respect. Whether you need a single tree trimmed or an entire lot cleared, we have the equipment and expertise to get the job done safely and efficiently.
                </p>
                <p>
                  All of our work is fully insured, and we offer free estimates for every project. Call us today to discuss your tree care needs.
                </p>
              </div>
              <div className="mt-xl">
                <Button asChild data-testid="button-contact-us">
                  <Link href="/contact">
                    <span>Contact Us</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <Card className="card-padded">
                <div className="about-features">
                  <div className="about-feature-item">
                    <div className="about-feature-icon bg-primary-light">
                      <Shield className="icon-lg icon-primary" />
                    </div>
                    <div className="about-feature-text">
                      <h4>Licensed & Insured</h4>
                      <p className="text-muted">Full liability coverage protects your property</p>
                    </div>
                  </div>
                  <div className="about-feature-item">
                    <div className="about-feature-icon bg-primary-light">
                      <Award className="icon-lg icon-primary" />
                    </div>
                    <div className="about-feature-text">
                      <h4>Experienced Team</h4>
                      <p className="text-muted">Over 20 years of professional tree care</p>
                    </div>
                  </div>
                  <div className="about-feature-item">
                    <div className="about-feature-icon bg-primary-light">
                      <Clock className="icon-lg icon-primary" />
                    </div>
                    <div className="about-feature-text">
                      <h4>Prompt Service</h4>
                      <p className="text-muted">Quick response times and reliable scheduling</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
