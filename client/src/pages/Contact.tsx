import { Phone, MapPin, Clock, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  return (
    <div className="page-container" data-testid="page-contact">
      <section className="section bg-card-color" data-testid="section-contact-header">
        <div className="section-content page-header">
          <h1 className="text-page-title">
            Contact Us
          </h1>
          <p className="text-page-subtitle">
            Ready to get started? Give us a call for a free estimate. We proudly serve Englewood, Manasota Key, and all of Sarasota and Charlotte counties.
          </p>
        </div>
      </section>

      <section className="section bg-default" data-testid="section-contact-main">
        <div className="section-narrow">
          <Card className="card-overflow-hidden">
            <CardContent className="contact-card-content">
              <div className="contact-header">
                <div className="contact-icon-large bg-primary-light">
                  <Phone className="icon-xl icon-primary" />
                </div>
                <h2 className="text-section-title">
                  Call Brian The Tree Guy
                </h2>
                <p className="contact-intro-text">
                  Get a free, no-obligation estimate for all your tree service needs.
                </p>
              </div>

              <div className="contact-button-wrapper">
                <Button
                  asChild
                  size="lg"
                  className="btn-contact-lg btn-responsive-full"
                  data-testid="button-contact-call"
                >
                  <a href="tel:941-445-2234" className="btn-link-content-lg">
                    <Phone className="btn-contact-lg-icon" />
                    941-445-2234
                  </a>
                </Button>
              </div>

              <div className="contact-info-grid">
                <div className="contact-info-item" data-testid="info-service-area">
                  <div className="contact-info-icon bg-primary-light">
                    <MapPin className="icon-xxl icon-primary" />
                  </div>
                  <h3 className="contact-info-title">Service Area</h3>
                  <p className="contact-info-text">
                    Englewood, Manasota Key<br />
                    Sarasota & Charlotte Counties
                  </p>
                </div>

                <div className="contact-info-item" data-testid="info-availability">
                  <div className="contact-info-icon bg-primary-light">
                    <Clock className="icon-xxl icon-primary" />
                  </div>
                  <h3 className="contact-info-title">Availability</h3>
                  <p className="contact-info-text">
                    Monday - Saturday<br />
                    7:00 AM - 6:00 PM
                  </p>
                </div>

                <div className="contact-info-item" data-testid="info-services">
                  <div className="contact-info-icon bg-primary-light">
                    <Trees className="icon-xxl icon-primary" />
                  </div>
                  <h3 className="contact-info-title">Services</h3>
                  <p className="contact-info-text">
                    Trimming, Removal<br />
                    Stump Grinding & More
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="contact-description">
            <p className="contact-about-text">
              Brian The Tree Guy has been serving Englewood and the surrounding areas for over 20 years. We offer free estimates for all tree services including trimming, removal, stump grinding, storm damage cleanup, and land clearing. Our team is fully insured and committed to providing professional, reliable service throughout Manasota Key, Rotonda West, and all of Sarasota and Charlotte counties.
            </p>
          </div>
        </div>
      </section>

      <section className="section cta-section" data-testid="section-contact-cta">
        <div className="cta-content">
          <h2 className="text-cta-title">
            Don't Wait – Call Today!
          </h2>
          <p className="text-cta-subtitle">
            Whether it's routine maintenance or emergency storm damage, we're here to help. Contact us now for fast, professional tree service.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="btn-cta"
            data-testid="button-contact-cta-call"
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
