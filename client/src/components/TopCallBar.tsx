import { Phone } from "lucide-react";

export function TopCallBar() {
  return (
    <a
      href="tel:941-445-2234"
      className="top-call-bar"
      data-testid="link-top-call-bar"
    >
      <Phone className="icon-sm" />
      <span>Tap to Call: 941-445-2234</span>
    </a>
  );
}
