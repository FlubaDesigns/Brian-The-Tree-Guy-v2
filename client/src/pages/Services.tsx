import { useQuery } from "@tanstack/react-query";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import type { Service } from "@shared/schema";

function ServiceSkeleton() {
  return (
    <Card className="card-padded">
      <Skeleton className="skeleton-icon" />
      <Skeleton className="skeleton-title" />
      <Skeleton className="skeleton-line" />
      <Skeleton className="skeleton-line" />
      <Skeleton className="skeleton-line-short" />
    </Card>
  );
}

export default function Services() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/data/services.json"],
  });

  return (
    <div className="page-container" data-testid="page-services">
      <section className="section bg-card-color" data-testid="section-services-header">
        <div className="section-content page-header">
          <h1 className="text-page-title">
            Our Tree Services
          </h1>
          <p className="text-page-subtitle">
            Professional tree care for residential and commercial properties in Englewood, Manasota Key, and throughout Sarasota and Charlotte counties. Fully insured with over 20 years of experience.
          </p>
        </div>
      </section>

      <section className="section bg-default" data-testid="section-services-grid">
        <div className="section-content">
          {isLoading ? (
            <div className="grid-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ServiceSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="page-header">
              <p className="error-message">
                Unable to load services. Please try again later.
              </p>
            </div>
          ) : (
            <div className="grid-3">
              {services?.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section cta-section" data-testid="section-services-cta">
        <div className="cta-content">
          <h2 className="text-cta-title">
            Ready to Get Started?
          </h2>
          <p className="text-cta-subtitle">
            Contact us today for a free estimate. We provide prompt, professional service for all your tree care needs.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="btn-cta"
            data-testid="button-services-call"
          >
            <a href="tel:941-445-2234" className="btn-link-content">
              <Phone className="icon-md" />
              Call Now – 941-445-2234
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
