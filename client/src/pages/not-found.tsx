import { Link } from "wouter";
import { Home, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-background" data-testid="page-not-found">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-10 pb-8 px-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Trees className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild data-testid="button-go-home">
            <Link href="/">
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
