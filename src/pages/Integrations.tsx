import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageCircle,
  Smartphone,
  Globe,
  Plug,
  FileJson,
  Database,
  Cloud,
  ChevronRight,
  Webhook,
  FileText,
  ShoppingBag,
} from "lucide-react";

const channels = [
  {
    icon: Mail,
    name: "Email",
    desc: "IMAP, Exchange, Gmail — parse attachments and body text.",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp",
    desc: "WhatsApp Business API — messages, voice notes, images.",
  },
  {
    icon: Smartphone,
    name: "Mobile Apps",
    desc: "In-app ordering SDKs and deep link integrations.",
  },
  {
    icon: Globe,
    name: "Web Portals",
    desc: "Customer-facing order portals and B2B storefronts.",
  },
  {
    icon: FileText,
    name: "PDF / Fax",
    desc: "Scanned documents and PDF purchase orders via OCR.",
  },
  {
    icon: ShoppingBag,
    name: "Marketplaces",
    desc: "Shopify, WooCommerce, and marketplace order feeds.",
  },
];

const erps = [
  {
    name: "SAP Business One",
    desc: "Direct integration via DI API and Service Layer.",
  },
  {
    name: "SAP S/4HANA",
    desc: "OData and RFC connectors for enterprise SAP.",
  },
  {
    name: "Oracle NetSuite",
    desc: "SuiteTalk REST/SOAP web services.",
  },
  {
    name: "Microsoft Dynamics 365",
    desc: "Business Central and Finance & Operations APIs.",
  },
  { name: "Odoo", desc: "XML-RPC and JSON-RPC native connectors." },
  {
    name: "Custom ERP",
    desc: "Webhook-based integration for proprietary systems.",
  },
];

const apis = [
  {
    icon: Webhook,
    name: "Webhooks",
    desc: "Real-time event notifications for order lifecycle.",
  },
  {
    icon: FileJson,
    name: "REST API",
    desc: "Full CRUD API for orders, products, and customers.",
  },
  {
    icon: Database,
    name: "Direct DB",
    desc: "Secure database connectors for legacy systems.",
  },
  {
    icon: Cloud,
    name: "Cloud Storage",
    desc: "S3, Azure Blob, GCS for document ingestion.",
  },
];

const Integrations = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-8 py-20 lg:px-16">
        <Badge className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm mb-6">
          Integrations
        </Badge>
        <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
          Connects to everything you already use.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          WhappO plugs into your existing channels, ERPs, and infrastructure —
          no rip-and-replace required.
        </p>
      </section>

      {/* Input Channels */}
      <section className="px-8 py-20 lg:px-16">
        <h2 className="text-3xl font-bold lg:text-4xl">Input Channels</h2>
        <p className="mt-4 text-muted-foreground">
          Every way your customers send orders.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((ch) => (
            <Card key={ch.name} className="border-border bg-card">
              <CardContent className="p-6">
                <ch.icon className="h-8 w-8 text-savings mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground">
                  {ch.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{ch.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ERP Systems */}
      <section className="px-8 py-20 lg:px-16">
        <h2 className="text-3xl font-bold lg:text-4xl">ERP Systems</h2>
        <p className="mt-4 text-muted-foreground">
          Push structured orders directly into your ERP.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {erps.map((erp) => (
            <Card key={erp.name} className="border-border bg-card">
              <CardContent className="p-6">
                <Plug className="h-8 w-8 text-savings mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground">
                  {erp.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{erp.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* APIs & Protocols */}
      <section className="px-8 py-20 lg:px-16">
        <h2 className="text-3xl font-bold lg:text-4xl">APIs & Protocols</h2>
        <p className="mt-4 text-muted-foreground">
          For custom integrations and advanced workflows.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {apis.map((api) => (
            <Card key={api.name} className="border-border bg-card">
              <CardContent className="p-6">
                <api.icon className="h-8 w-8 text-savings mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground">
                  {api.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{api.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 lg:px-16">
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Need a custom integration?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Our team can connect WhappO to any system in your stack.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 gradient-savings text-primary-foreground font-semibold"
          >
            <a
              href="https://axiobit.com/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to us
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Integrations;
