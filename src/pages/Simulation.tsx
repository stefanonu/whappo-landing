import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const WORKING_DAYS = 22;
const HOURS_PER_DAY = 8;
const REVIEWERS = 2;
const REVIEW_HOURS = 1; // ~1 hour total review per day for 2 reviewers

const Simulation = () => {
  const [people, setPeople] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(16);
  const [automationPct, setAutomationPct] = useState(90);

  const results = useMemo(() => {
    const monthlyToday = people * hourlyCost * HOURS_PER_DAY * WORKING_DAYS;
    const reviewCostMonthly = REVIEWERS * hourlyCost * REVIEW_HOURS * WORKING_DAYS;
    const remainingManual = (1 - automationPct / 100) * monthlyToday;
    const monthlyWhappO = reviewCostMonthly + remainingManual;
    const monthlySavings = monthlyToday - monthlyWhappO;
    const annualSavings = monthlySavings * 12;
    const pctReduction = monthlyToday > 0 ? (monthlySavings / monthlyToday) * 100 : 0;

    return {
      monthlyToday,
      monthlyWhappO,
      monthlySavings,
      annualSavings,
      pctReduction,
    };
  }, [people, hourlyCost, automationPct]);

  const chartData = [
    { name: "Current Cost", value: results.monthlyToday },
    { name: "With WhappO", value: results.monthlyWhappO },
  ];

  return (
    <div className="min-h-screen bg-background p-8 lg:p-16">
      <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
        Calculate your automation savings
      </h1>
      <p className="mt-3 text-muted-foreground">
        Adjust the inputs below to see your projected cost reduction with WhappO.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-8">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Your Current Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* People */}
              <div>
                <div className="flex items-center justify-between">
                  <Label>People processing orders</Label>
                  <Input
                    type="number"
                    value={people}
                    onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
                    className="w-20 text-center"
                    min={1}
                  />
                </div>
                <Slider
                  value={[people]}
                  onValueChange={([v]) => setPeople(v)}
                  min={1}
                  max={50}
                  step={1}
                  className="mt-3"
                />
              </div>

              {/* Hourly Cost */}
              <div>
                <div className="flex items-center justify-between">
                  <Label>Hourly cost per person (€)</Label>
                  <Input
                    type="number"
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(Math.max(1, Number(e.target.value)))}
                    className="w-20 text-center"
                    min={1}
                  />
                </div>
                <Slider
                  value={[hourlyCost]}
                  onValueChange={([v]) => setHourlyCost(v)}
                  min={5}
                  max={60}
                  step={1}
                  className="mt-3"
                />
              </div>

              {/* Automation */}
              <div>
                <div className="flex items-center justify-between">
                  <Label>Orders automated (%)</Label>
                  <Input
                    type="number"
                    value={automationPct}
                    onChange={(e) => setAutomationPct(Math.min(100, Math.max(0, Number(e.target.value))))}
                    className="w-20 text-center"
                    min={0}
                    max={100}
                  />
                </div>
                <Slider
                  value={[automationPct]}
                  onValueChange={([v]) => setAutomationPct(v)}
                  min={50}
                  max={100}
                  step={1}
                  className="mt-3"
                />
              </div>
            </CardContent>
          </Card>

          {/* Assumptions */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Fixed assumptions:</p>
            <p>• Review time: ~10 min per 200 orders ({REVIEWERS} reviewers)</p>
            <p>• {WORKING_DAYS} working days/month, {HOURS_PER_DAY}h shifts</p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Monthly Cost Today</p>
                <p className="mt-2 text-2xl font-bold text-card-foreground">
                  €{results.monthlyToday.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-card">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wider text-savings">Monthly with WhappO</p>
                <p className="mt-2 text-2xl font-bold text-savings-glow">
                  €{Math.round(results.monthlyWhappO).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Monthly Savings</p>
                <p className="mt-2 text-2xl font-bold text-savings-glow">
                  €{Math.round(results.monthlySavings).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Annual Savings</p>
                <p className="mt-2 text-2xl font-bold text-savings-glow">
                  €{Math.round(results.annualSavings).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* % Reduction */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-sm text-savings">Cost Reduction</p>
            <p className="mt-1 text-4xl font-bold text-savings-glow">
              {results.pctReduction.toFixed(1)}%
            </p>
          </div>

          {/* Bar chart */}
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 16%)" />
                <XAxis dataKey="name" stroke="hsl(220 10% 55%)" fontSize={12} />
                <YAxis stroke="hsl(220 10% 55%)" fontSize={12} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 25% 9%)",
                    border: "1px solid hsl(220 20% 16%)",
                    borderRadius: "8px",
                    color: "hsl(220 10% 92%)",
                  }}
                  formatter={(value: number) => [`€${value.toLocaleString()}`, "Monthly Cost"]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  <Cell fill="hsl(220 10% 40%)" />
                  <Cell fill="hsl(152 60% 45%)" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
