import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TreeDeciduous,
  Axe,
  Scissors,
  Trees,
  Leaf,
  Wind,
  Truck,
  Shield,
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

function StumpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 20 L8 12 L5 12 L9 4" />
      <path d="M10 20 L11 14 L9 14 L12 8" />
      <ellipse cx="12" cy="20" rx="8" ry="2" />
      <path d="M8 18 L7 14" />
      <path d="M16 18 L17 14" />
      <path d="M14 20 L15 15 L13 15 L16 10" />
      <path d="M18 20 L19 16 L17 16 L19 12" />
      <path d="M20 8 L16 12" strokeDasharray="2 2" />
      <path d="M22 6 L18 10" strokeDasharray="2 2" />
    </svg>
  );
}

const iconMap: Record<string, typeof TreeDeciduous | typeof StumpIcon> = {
  tree: TreeDeciduous,
  stump: StumpIcon,
  axe: Axe,
  scissors: Scissors,
  trees: Trees,
  leaf: Leaf,
  wind: Wind,
  truck: Truck,
  shield: Shield,
};

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || TreeDeciduous;

  return (
    <Card
      className="service-card"
      data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <CardHeader>
        <div className="service-card-icon bg-primary-light">
          <IconComponent className="icon-xxl icon-primary" />
        </div>
        <CardTitle className="text-service-title">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-service-description">{description}</p>
      </CardContent>
    </Card>
  );
}
