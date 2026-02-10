import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Inbox,
  ScanSearch,
  Send,
  Mail,
  MessageCircle,
  Smartphone,
  Globe,
  FileJson,
  UserCheck,
  Plug,
  CheckCircle2,
  Languages,
  ChevronRight,
} from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-8 py-20 lg:px-16">
        <Badge className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm mb-6">
          How It Works
        </Badge>
        <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
          From message to ERP in three steps.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          WhappO's AI pipeline captures unstructured orders, extracts structured
          data, and pushes it into your ERP — with a human reviewer in the loop
          for confidence.
        </p>
      </section>

      {/* Step 1: Capture */}
      <section className="px-8 py-20 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <div className="text-7xl font-black text-primary/10 mb-4">01</div>
            <h2 className="text-3xl font-bold lg:text-4xl">Capture</h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Orders arrive through any channel — email, WhatsApp, web portals,
              mobile apps. WhappO connects to all of them and ingests every
              message regardless of format or language.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: Mail, label: "Email" },
                { icon: MessageCircle, label: "WhatsApp" },
                { icon: Smartphone, label: "Mobile Apps" },
                { icon: Globe, label: "Web Portals" },
              ].map((ch) => (
                <Badge
                  key={ch.label}
                  className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm"
                >
                  <ch.icon className="mr-1.5 h-3.5 w-3.5" />
                  {ch.label}
                </Badge>
              ))}
            </div>
          </div>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  {
                    channel: "WhatsApp",
                    lang: "ES",
                    text: 'Necesito 50 cajas de aceite de oliva extra virgen ref OLV-500...',
                  },
                  {
                    channel: "Email",
                    lang: "EN",
                    text: "PO #4521 — 200x Widget A, 100x Widget B, deliver Friday...",
                  },
                  {
                    channel: "Web",
                    lang: "FR",
                    text: "Commande: 30 palettes de farine bio, livraison lundi...",
                  },
                ].map((msg) => (
                  <div
                    key={msg.channel}
                    className="rounded-lg bg-muted/50 p-3 flex items-start gap-3"
                  >
                    <Badge className="bg-primary/10 text-savings border-primary/20 text-xs shrink-0">
                      {msg.channel}
                    </Badge>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        {msg.lang}
                      </span>
                      <p className="text-sm text-card-foreground">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Step 2: Review */}
      <section className="px-8 py-20 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <Card className="border-border bg-card lg:order-1">
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  {
                    label: "Customer",
                    value: "Restaurante Sol",
                    confidence: "98%",
                  },
                  { label: "SKU", value: "OLV-500", confidence: "96%" },
                  {
                    label: "Quantity",
                    value: "50 cases",
                    confidence: "99%",
                  },
                  {
                    label: "Delivery",
                    value: "Friday, Calle Mayor 12",
                    confidence: "94%",
                  },
                ].map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-medium text-savings uppercase tracking-wider w-20 shrink-0 pt-0.5">
                        {field.label}
                      </span>
                      <span className="text-sm text-card-foreground">
                        {field.value}
                      </span>
                    </div>
                    <Badge className="bg-primary/10 text-savings border-primary/20 text-xs">
                      {field.confidence}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <Button
                  size="sm"
                  className="gradient-savings text-primary-foreground font-medium"
                >
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border text-muted-foreground"
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="lg:order-0">
            <div className="text-7xl font-black text-primary/10 mb-4">02</div>
            <h2 className="text-3xl font-bold lg:text-4xl">Review</h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              WhappO's AI extracts structured fields — customer, products,
              quantities, delivery details — with confidence scores. A human
              reviewer validates or corrects with a single click. Reviewers
              validate; they don't create.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm">
                <UserCheck className="mr-1.5 h-3.5 w-3.5" />
                Human-in-the-loop
              </Badge>
              <Badge className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm">
                <Languages className="mr-1.5 h-3.5 w-3.5" />
                Any language
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Push */}
      <section className="px-8 py-20 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <div className="text-7xl font-black text-primary/10 mb-4">03</div>
            <h2 className="text-3xl font-bold lg:text-4xl">Push</h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Approved orders are pushed directly into your ERP as clean,
              structured records. No copy-paste, no re-keying, no errors. Works
              with SAP, Oracle NetSuite, Microsoft Dynamics, Odoo, and more.
            </p>
          </div>
          <Card className="border-primary/30 bg-card">
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  "SAP Business One",
                  "Oracle NetSuite",
                  "Microsoft Dynamics 365",
                  "Odoo",
                ].map((erp) => (
                  <div
                    key={erp}
                    className="flex items-center gap-3 rounded-md bg-muted/30 px-3 py-2.5"
                  >
                    <Plug className="h-4 w-4 text-savings shrink-0" />
                    <span className="text-sm text-card-foreground">{erp}</span>
                    <CheckCircle2 className="h-4 w-4 text-savings ml-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 lg:px-16">
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Ready to automate your order flow?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            See WhappO handle your real orders — in any language, from any
            channel.
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
              Request a demo
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
