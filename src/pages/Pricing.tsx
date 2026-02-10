import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const CONTACT_URL = "https://axiobit.com/contact";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center max-w-lg px-8">
        <Badge className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm mb-6">
          Pricing
        </Badge>
        <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
          Custom pricing for your volume.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          WhappO pricing scales with your order volume. Contact our team for a
          tailored quote and to see the ROI for your specific operation.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-10 gradient-savings text-primary-foreground font-semibold"
        >
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
            Contact us for pricing
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          You'll be redirected to axiobit.com
        </p>
      </div>
    </div>
  );
};

export default Pricing;
