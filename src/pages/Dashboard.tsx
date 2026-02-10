import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Clock,
  AlertTriangle,
  Cog,
  ArrowRight,
  FileJson,
  Settings,
  UserCheck,
  MousePointerClick,
  TrendingUp,
  DollarSign,
  Plug,
  BarChart3,
  Brain,
  ChevronRight,
  Mail,
  MessageCircle,
  Smartphone,
  Globe,
  Inbox,
  ScanSearch,
  Send,
  Languages,
  Package,
  UtensilsCrossed,
  Factory,
  ShoppingCart,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const weeklyOrders = [
  { day: "Mon", orders: 155 },
  { day: "Tue", orders: 130 },
  { day: "Wed", orders: 168 },
  { day: "Thu", orders: 145 },
  { day: "Fri", orders: 190 },
  { day: "Sat", orders: 120 },
  { day: "Sun", orders: 67 },
];

const weeklyFTE = [
  { day: "Mon", fte: 1.55 },
  { day: "Tue", fte: 1.30 },
  { day: "Wed", fte: 1.68 },
  { day: "Thu", fte: 1.45 },
  { day: "Fri", fte: 1.90 },
  { day: "Sat", fte: 1.20 },
  { day: "Sun", fte: 0.67 },
];

const weeklyCost = [
  { day: "Mon", cost: 465 },
  { day: "Tue", cost: 390 },
  { day: "Wed", cost: 504 },
  { day: "Thu", cost: 435 },
  { day: "Fri", cost: 570 },
  { day: "Sat", cost: 360 },
  { day: "Sun", cost: 201 },
];

const weeklyAccuracy = [
  { day: "Mon", accuracy: 97.2, exceptions: 4 },
  { day: "Tue", accuracy: 96.8, exceptions: 5 },
  { day: "Wed", accuracy: 97.5, exceptions: 3 },
  { day: "Thu", accuracy: 97.0, exceptions: 6 },
  { day: "Fri", accuracy: 97.8, exceptions: 5 },
  { day: "Sat", accuracy: 96.5, exceptions: 4 },
  { day: "Sun", accuracy: 97.1, exceptions: 2 },
];

const weeklyRevenue = [
  { day: "Mon", revenue: 1350 },
  { day: "Tue", revenue: 1100 },
  { day: "Wed", revenue: 1480 },
  { day: "Thu", revenue: 1250 },
  { day: "Fri", revenue: 1620 },
  { day: "Sat", revenue: 950 },
  { day: "Sun", revenue: 500 },
];

const monthlyOrders = [
  { day: "Wk 1", orders: 820 },
  { day: "Wk 2", orders: 975 },
  { day: "Wk 3", orders: 1050 },
  { day: "Wk 4", orders: 910 },
];

const monthlyFTE = [
  { day: "Wk 1", fte: 8.2 },
  { day: "Wk 2", fte: 9.8 },
  { day: "Wk 3", fte: 10.5 },
  { day: "Wk 4", fte: 9.1 },
];

const monthlyCost = [
  { day: "Wk 1", cost: 2460 },
  { day: "Wk 2", cost: 2925 },
  { day: "Wk 3", cost: 3150 },
  { day: "Wk 4", cost: 2730 },
];

const monthlyAccuracy = [
  { day: "Wk 1", accuracy: 96.8, exceptions: 18 },
  { day: "Wk 2", accuracy: 97.1, exceptions: 15 },
  { day: "Wk 3", accuracy: 97.5, exceptions: 12 },
  { day: "Wk 4", accuracy: 97.3, exceptions: 14 },
];

const monthlyRevenue = [
  { day: "Wk 1", revenue: 6800 },
  { day: "Wk 2", revenue: 8250 },
  { day: "Wk 3", revenue: 9100 },
  { day: "Wk 4", revenue: 7600 },
];

const CHART_GRID = "hsl(220 20% 16%)";
const CHART_AXIS = "hsl(220 10% 45%)";
const CYAN = "hsl(190 90% 55%)";
const PINK = "hsl(330 80% 65%)";
const TOOLTIP_STYLE = {
  backgroundColor: "hsl(220 25% 9%)",
  border: "1px solid hsl(220 20% 16%)",
  borderRadius: "8px",
  color: "hsl(220 10% 92%)",
};

const cumulativeTotals = {
  W: { orders: 975, fte: 9.8, savings: 2925, accuracy: 97.1, revenue: 8250 },
  M: { orders: 3755, fte: 37.6, savings: 11265, accuracy: 97.2, revenue: 31750 },
};

type Period = "W" | "M";

const PeriodToggle = ({ value, onChange }: { value: Period; onChange: (p: Period) => void }) => (
  <div className="flex items-center rounded-lg border border-border bg-muted/30 p-0.5 text-xs font-medium">
    {(["W", "M"] as const).map((p) => (
      <button
        key={p}
        onClick={() => onChange(p)}
        className={`rounded-md px-3 py-1 transition-colors ${
          value === p
            ? "bg-cyan-500 text-primary-foreground"
            : "text-muted-foreground hover:text-card-foreground"
        }`}
      >
        {p}
      </button>
    ))}
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>("W");

  const totals = cumulativeTotals[period];
  const ordersData = period === "W" ? weeklyOrders : monthlyOrders;
  const fteData = period === "W" ? weeklyFTE : monthlyFTE;
  const costData = period === "W" ? weeklyCost : monthlyCost;
  const accuracyData = period === "W" ? weeklyAccuracy : monthlyAccuracy;
  const revenueData = period === "W" ? weeklyRevenue : monthlyRevenue;

  const scrollToSavings = () => {
    document.getElementById("cost-savings")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="px-8 py-20 lg:px-16">
        <div className="max-w-5xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
            Turn any order channel into ERP-ready data —{" "}
            <span className="text-savings-glow">automatically.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground lg:text-xl">
            WhappO captures orders from every channel — email, WhatsApp, web, apps — and pushes them
            straight into your ERP. No manual transcription, no errors.
          </p>

          {/* Flow Diagram */}
          <div className="mt-14 flex items-center gap-0 text-sm font-medium max-w-4xl">
            {/* Input Channels */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: Mail, label: "Email" },
                { icon: MessageCircle, label: "WhatsApp" },
                { icon: Smartphone, label: "App" },
                { icon: Globe, label: "Web Portal" },
              ].map((ch) => (
                <div
                  key={ch.label}
                  className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm px-5 py-2.5 text-card-foreground transition-all duration-200 hover:border-primary/40 hover:bg-card hover:shadow-[0_0_12px_hsl(152_60%_45%/0.1)]"
                >
                  <ch.icon className="h-4 w-4 text-savings shrink-0" />
                  <span>{ch.label}</span>
                </div>
              ))}
            </div>

            {/* Connector left */}
            <div className="flex items-center mx-1 sm:mx-3">
              <div className="h-px w-4 sm:w-10 bg-gradient-to-r from-border/40 to-primary/50" />
              <ArrowRight className="h-4 w-4 text-primary/60 -ml-1.5 animate-flow-pulse" />
            </div>

            {/* WhappO Hub */}
            <div className="shrink-0 gradient-savings rounded-2xl px-6 py-6 sm:px-8 sm:py-7 text-base sm:text-lg font-bold text-primary-foreground shadow-[0_0_40px_hsl(152_60%_45%/0.3)] ring-1 ring-white/10">
              WhappO
            </div>

            {/* Connector right */}
            <div className="flex items-center mx-1 sm:mx-3">
              <ArrowRight className="h-4 w-4 text-primary/60 -mr-1.5 animate-flow-pulse" />
              <div className="h-px w-4 sm:w-10 bg-gradient-to-l from-border/40 to-primary/50" />
            </div>

            {/* ERP Targets */}
            <div className="flex flex-col gap-2.5">
              {["SAP", "Oracle NetSuite", "Microsoft Dynamics", "Odoo"].map((erp) => (
                <div
                  key={erp}
                  className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm px-5 py-2.5 text-card-foreground transition-all duration-200 hover:border-primary/40 hover:bg-card hover:shadow-[0_0_12px_hsl(152_60%_45%/0.1)]"
                >
                  <Plug className="h-4 w-4 text-savings shrink-0" />
                  <span>{erp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm">
              90%+ accuracy
            </Badge>
            <Badge className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm">
              Human-in-the-loop
            </Badge>
            <Badge className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm">
              ERP-ready output
            </Badge>
            <Badge className="bg-primary/10 text-savings border-primary/20 px-4 py-1.5 text-sm">
              <Languages className="mr-1.5 h-3.5 w-3.5" />
              Multi-language AI
            </Badge>
          </div>

          <Button onClick={scrollToSavings} size="lg" className="mt-10 gradient-savings text-primary-foreground font-semibold">
            See the cost savings
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* How It Works - Quick Overview */}
      <section className="px-8 py-20 lg:px-16">
        <h2 className="text-3xl font-bold lg:text-4xl">
          Three steps. Zero manual entry.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          From messy inbound message to clean ERP record — fully automated.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {[
            {
              step: "01",
              icon: Inbox,
              title: "Capture",
              desc: "Orders arrive via email, WhatsApp, web portals, or apps. WhappO ingests them all — in any language, any format.",
            },
            {
              step: "02",
              icon: ScanSearch,
              title: "Review",
              desc: "AI extracts structured fields: products, quantities, delivery dates. A human reviewer validates with one click.",
            },
            {
              step: "03",
              icon: Send,
              title: "Push",
              desc: "Validated orders are pushed directly into your ERP — SAP, Oracle, Dynamics, Odoo — as clean, ready-to-process records.",
            },
          ].map((item, i) => (
            <div key={item.title} className="relative">
              <div className="text-6xl font-black text-primary/10 absolute -top-4 -left-2 select-none">
                {item.step}
              </div>
              <Card className="border-border bg-card relative z-10">
                <CardContent className="p-6">
                  <item.icon className="h-8 w-8 text-savings mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
              {i < 2 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 z-20">
                  <ChevronRight className="h-6 w-6 text-primary/40 animate-flow-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Live Order Example */}
      <section className="px-8 py-20 lg:px-16">
        <h2 className="text-3xl font-bold lg:text-4xl">
          See it in action.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A real-world order message, transformed into ERP-ready data in seconds.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr,auto,1fr] items-center">
          {/* Messy Input */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-muted-foreground">Email Order</span>
                <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs ml-auto">
                  Unstructured
                </Badge>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm text-muted-foreground leading-relaxed">
                <p>"Hi, we need 120 units of steel bolts ref SB-M10, 60 packs of rubber gaskets GK-25 and 200 hex nuts HN-M10. Please deliver Thursday to BuildRight Ltd, 47 Industrial Park Rd, Birmingham. Thanks, Mark"</p>
              </div>
            </CardContent>
          </Card>

          {/* Center Arrow */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-10 w-10 rounded-full gradient-savings flex items-center justify-center shadow-[0_0_20px_hsl(152_60%_45%/0.3)]">
              <ArrowRight className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xs text-savings font-medium">WhappO AI</span>
          </div>

          {/* Clean Output */}
          <Card className="border-primary/30 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileJson className="h-5 w-5 text-savings" />
                <span className="text-sm font-medium text-muted-foreground">ERP Order</span>
                <Badge className="bg-primary/10 text-savings border-primary/20 text-xs ml-auto">
                  Structured
                </Badge>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Customer", value: "BuildRight Ltd" },
                  { label: "Delivery", value: "Thursday — 47 Industrial Park Rd, Birmingham" },
                  { label: "Line 1", value: "SB-M10 × 120 — Steel Bolts M10" },
                  { label: "Line 2", value: "GK-25 × 60 — Rubber Gaskets" },
                  { label: "Line 3", value: "HN-M10 × 200 — Hex Nuts M10" },
                ].map((field) => (
                  <div key={field.label} className="flex items-start gap-3 rounded-md bg-muted/30 px-3 py-2">
                    <span className="text-xs font-medium text-savings uppercase tracking-wider w-20 shrink-0 pt-0.5">
                      {field.label}
                    </span>
                    <span className="text-sm text-card-foreground">{field.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-8 py-20 lg:px-16">
        <h2 className="text-3xl font-bold lg:text-4xl">
          Manual order processing doesn't scale.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, title: "High Labor Costs", desc: "Entire departments dedicated to translating intent into structured orders." },
            { icon: Clock, title: "Slow Throughput", desc: "Manual processing creates bottlenecks that grow with order volume." },
            { icon: AlertTriangle, title: "Error-Prone", desc: "Human errors in data entry lead to costly downstream failures." },
            { icon: Cog, title: "Brittle RPAs", desc: "Rule-based automation breaks with any format or language variation." },
          ].map((item) => (
            <Card key={item.title} className="border-border bg-card">
              <CardContent className="p-6">
                <item.icon className="h-8 w-8 text-savings mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-8 py-20 lg:px-16">
        <h2 className="text-3xl font-bold lg:text-4xl">
          Automate intent. Keep control.
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Before */}
          <Card className="border-destructive/30 bg-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-destructive">Before WhappO</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-destructive shrink-0" /> Manual reading & interpretation of orders</li>
                <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-destructive shrink-0" /> Error-prone data entry into ERP</li>
                <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-destructive shrink-0" /> Large teams needed for volume</li>
                <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-destructive shrink-0" /> Brittle RPA workarounds</li>
              </ul>
            </CardContent>
          </Card>

          {/* After */}
          <Card className="border-primary/30 bg-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-savings">With WhappO</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  { icon: FileJson, text: "Any channel → ERP-ready data automatically" },
                  { icon: Plug, text: "Integrates with SAP, Oracle, Dynamics, Odoo and more" },
                  { icon: UserCheck, text: "Human reviewers validate, not create" },
                  { icon: MousePointerClick, text: "One-click ERP insertion" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2">
                    <item.icon className="mt-0.5 h-4 w-4 text-savings shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section id="cost-savings" className="px-8 py-20 lg:px-16">
        <h2 className="text-3xl font-bold lg:text-4xl">
          Live performance dashboard.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Real metrics from a WhappO deployment — orders processed, time saved, cost reduction, and accuracy.
        </p>

        {/* Cumulative Totals Bar */}
        <Card className="mt-10 border-border bg-card">
          <CardContent className="px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
                <span className="font-medium uppercase tracking-wider">Cumulative Totals — {period === "W" ? "This Week" : "This Month"}</span>
              </div>
              <PeriodToggle value={period} onChange={setPeriod} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { icon: ShoppingCart, label: "Orders Processed", value: totals.orders.toLocaleString() },
                { icon: Clock, label: "Time Saved", value: `${totals.fte} FTE` },
                { icon: DollarSign, label: "Cost Savings", value: `${totals.savings.toLocaleString()} €` },
                { icon: AlertTriangle, label: "Accuracy", value: `${totals.accuracy}%` },
                { icon: TrendingUp, label: "Agent Revenue", value: `${totals.revenue.toLocaleString()} €` },
              ].map((kpi) => (
                <div key={kpi.label}>
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <kpi.icon className="h-3.5 w-3.5" />
                    <span className="text-xs">{kpi.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-card-foreground tracking-tight">{kpi.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 2x2 Chart Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Conversations Processed */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-card-foreground">Conversations Processed</span>
                </div>
                <PeriodToggle value={period} onChange={setPeriod} />
              </div>
              <p className="text-3xl font-bold text-card-foreground tracking-tight mt-2">{totals.orders.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{period === "W" ? "This Week" : "This Month"} — Orders registered in ERP</p>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
                    <XAxis dataKey="day" stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Bar dataKey="orders" fill={CYAN} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Time Saved */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-card-foreground">Time Saved</span>
                </div>
                <PeriodToggle value={period} onChange={setPeriod} />
              </div>
              <p className="text-3xl font-bold text-card-foreground tracking-tight mt-2">{totals.fte} <span className="text-lg font-medium text-muted-foreground">FTE</span></p>
              <p className="text-xs text-muted-foreground">{period === "W" ? "This Week" : "This Month"} — Based on 6 min/order baseline</p>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fteData}>
                    <defs>
                      <linearGradient id="fteFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CYAN} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
                    <XAxis dataKey="day" stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} unit=" FTE" />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Area type="monotone" dataKey="fte" stroke={CYAN} strokeWidth={2} fill="url(#fteFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Savings */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-card-foreground">Cost Savings</span>
                </div>
                <PeriodToggle value={period} onChange={setPeriod} />
              </div>
              <p className="text-3xl font-bold text-card-foreground tracking-tight mt-2">{totals.savings.toLocaleString()} <span className="text-lg font-medium text-muted-foreground">€</span></p>
              <p className="text-xs text-muted-foreground">{period === "W" ? "This Week" : "This Month"} — Time saved × €35/hour</p>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={costData}>
                    <defs>
                      <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CYAN} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
                    <XAxis dataKey="day" stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v} €`} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v} €`, "Savings"]} />
                    <Area type="monotone" dataKey="cost" stroke={CYAN} strokeWidth={2} fill="url(#costFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Accuracy & Exceptions */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-pink-400" />
                  <span className="text-sm font-semibold text-card-foreground">Accuracy & Exceptions</span>
                </div>
                <PeriodToggle value={period} onChange={setPeriod} />
              </div>
              <p className="text-3xl font-bold text-card-foreground tracking-tight mt-2">{totals.accuracy}% <span className="text-lg font-medium text-muted-foreground">accuracy</span></p>
              <p className="text-xs text-muted-foreground">{period === "W" ? "This Week" : "This Month"} — Manual interventions by supervisor</p>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
                    <XAxis dataKey="day" stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Line type="monotone" dataKey="exceptions" stroke={PINK} strokeWidth={2} dot={{ fill: PINK, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent-Generated Revenue — Full Width */}
        <Card className="mt-6 border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold text-card-foreground">Agent-Generated Revenue</span>
              </div>
              <PeriodToggle value={period} onChange={setPeriod} />
            </div>
            <p className="text-3xl font-bold text-card-foreground tracking-tight mt-2">{totals.revenue.toLocaleString()} <span className="text-lg font-medium text-muted-foreground">€</span></p>
            <p className="text-xs text-muted-foreground">{period === "W" ? "This Week" : "This Month"} — Revenue from agent proposals</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CYAN} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
                  <XAxis dataKey="day" stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke={CHART_AXIS} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v} €`} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v} €`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke={CYAN} strokeWidth={2} fill="url(#revFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-20 lg:px-16">
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Stop paying humans to translate intent.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            WhappO captures orders from every channel and pushes them into your ERP — faster, cheaper, and with confidence.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gradient-savings text-primary-foreground font-semibold">
              <a href="https://axiobit.com/contact" target="_blank" rel="noopener noreferrer">
                Request a demo
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/simulation")}
              className="border-primary/30 text-savings hover:bg-primary/10"
            >
              View automation potential
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
