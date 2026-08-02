import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Triangle } from "lucide-react";
import { toast } from "sonner";

const faqs = [
  {
    question: "What is a Triangle Calculator?",
    answer: "A triangle calculator is an advanced mathematical tool that solves for unknown sides and angles of a triangle given any 3 known values (such as SSS, SAS, ASA, or AAS). It also calculates derived properties like area, perimeter, and circumradius."
  },
  {
    question: "How many inputs do I need?",
    answer: "You must provide exactly 3 inputs, and at least one of them must be a side length. Providing 3 angles without a side length is insufficient because the triangle's scale cannot be determined."
  },
  {
    question: "What happens if there are two solutions (SSA)?",
    answer: "The SSA (Side-Side-Angle) case is often called the ambiguous case because it can sometimes result in two valid triangles. This calculator computes and returns the primary (principal) triangle."
  }
];

const TriangleCalculator = () => {
  const [inputs, setInputs] = useState({
    a: "", b: "", c: "",
    A: "", B: "", C: ""
  });

  const [results, setResults] = useState<{
    a: string; b: string; c: string;
    A: string; B: string; C: string;
    area: number; perimeter: number; s: number;
    inradius: number; circumradius: number;
    altA: number; altB: number; altC: number;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setInputs({ a: "", b: "", c: "", A: "", B: "", C: "" });
    setResults(null);
  };

  const deg2rad = (deg: number) => deg * Math.PI / 180;
  const rad2deg = (rad: number) => rad * 180 / Math.PI;

  const solve = () => {
    let sideA = parseFloat(inputs.a);
    let sideB = parseFloat(inputs.b);
    let sideC = parseFloat(inputs.c);
    let angleA = parseFloat(inputs.A);
    let angleB = parseFloat(inputs.B);
    let angleC = parseFloat(inputs.C);

    const providedInputs = [sideA, sideB, sideC, angleA, angleB, angleC].filter(x => !isNaN(x)).length;
    
    if (providedInputs < 3) {
      toast.error("Please provide exactly 3 values.");
      return;
    }
    if (providedInputs > 3) {
      toast.error("Please provide exactly 3 values. Clear the form first.");
      return;
    }

    if (isNaN(sideA) && isNaN(sideB) && isNaN(sideC)) {
      toast.error("At least one side length must be provided.");
      return;
    }

    // Two angles provided -> find third
    if (!isNaN(angleA) && !isNaN(angleB) && isNaN(angleC)) angleC = 180 - angleA - angleB;
    if (!isNaN(angleA) && !isNaN(angleC) && isNaN(angleB)) angleB = 180 - angleA - angleC;
    if (!isNaN(angleB) && !isNaN(angleC) && isNaN(angleA)) angleA = 180 - angleB - angleC;

    // SSS Case
    if (!isNaN(sideA) && !isNaN(sideB) && !isNaN(sideC)) {
      if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
        toast.error("Invalid triangle: sum of two sides must be greater than the third.");
        return;
      }
      angleA = rad2deg(Math.acos((sideB*sideB + sideC*sideC - sideA*sideA) / (2*sideB*sideC)));
      angleB = rad2deg(Math.acos((sideA*sideA + sideC*sideC - sideB*sideB) / (2*sideA*sideC)));
      angleC = 180 - angleA - angleB;
    }
    // SAS Case
    else if (!isNaN(sideA) && !isNaN(sideB) && !isNaN(angleC)) {
      sideC = Math.sqrt(sideA*sideA + sideB*sideB - 2*sideA*sideB*Math.cos(deg2rad(angleC)));
      angleA = rad2deg(Math.acos((sideB*sideB + sideC*sideC - sideA*sideA) / (2*sideB*sideC)));
      angleB = 180 - angleA - angleC;
    }
    else if (!isNaN(sideA) && !isNaN(sideC) && !isNaN(angleB)) {
      sideB = Math.sqrt(sideA*sideA + sideC*sideC - 2*sideA*sideC*Math.cos(deg2rad(angleB)));
      angleA = rad2deg(Math.acos((sideB*sideB + sideC*sideC - sideA*sideA) / (2*sideB*sideC)));
      angleC = 180 - angleA - angleB;
    }
    else if (!isNaN(sideB) && !isNaN(sideC) && !isNaN(angleA)) {
      sideA = Math.sqrt(sideB*sideB + sideC*sideC - 2*sideB*sideC*Math.cos(deg2rad(angleA)));
      angleB = rad2deg(Math.acos((sideA*sideA + sideC*sideC - sideB*sideB) / (2*sideA*sideC)));
      angleC = 180 - angleA - angleB;
    }
    // ASA or AAS Case (Now we have all 3 angles)
    else if (!isNaN(angleA) && !isNaN(angleB) && !isNaN(angleC)) {
      if (Math.abs(angleA + angleB + angleC - 180) > 0.01) {
        toast.error("Angles must sum to exactly 180 degrees.");
        return;
      }
      if (!isNaN(sideA)) {
        sideB = sideA * Math.sin(deg2rad(angleB)) / Math.sin(deg2rad(angleA));
        sideC = sideA * Math.sin(deg2rad(angleC)) / Math.sin(deg2rad(angleA));
      } else if (!isNaN(sideB)) {
        sideA = sideB * Math.sin(deg2rad(angleA)) / Math.sin(deg2rad(angleB));
        sideC = sideB * Math.sin(deg2rad(angleC)) / Math.sin(deg2rad(angleB));
      } else if (!isNaN(sideC)) {
        sideA = sideC * Math.sin(deg2rad(angleA)) / Math.sin(deg2rad(angleC));
        sideB = sideC * Math.sin(deg2rad(angleB)) / Math.sin(deg2rad(angleC));
      }
    }
    // SSA (Ambiguous Case)
    else {
      try {
        if (!isNaN(sideA) && !isNaN(sideB) && !isNaN(angleA)) {
          let sinB = (sideB * Math.sin(deg2rad(angleA))) / sideA;
          if (sinB > 1) throw new Error("No solution possible.");
          angleB = rad2deg(Math.asin(sinB));
          angleC = 180 - angleA - angleB;
          if (angleC <= 0) throw new Error("Invalid inputs.");
          sideC = sideA * Math.sin(deg2rad(angleC)) / Math.sin(deg2rad(angleA));
        } else if (!isNaN(sideA) && !isNaN(sideB) && !isNaN(angleB)) {
          let sinA = (sideA * Math.sin(deg2rad(angleB))) / sideB;
          if (sinA > 1) throw new Error("No solution possible.");
          angleA = rad2deg(Math.asin(sinA));
          angleC = 180 - angleA - angleB;
          if (angleC <= 0) throw new Error("Invalid inputs.");
          sideC = sideB * Math.sin(deg2rad(angleC)) / Math.sin(deg2rad(angleB));
        } else if (!isNaN(sideB) && !isNaN(sideC) && !isNaN(angleB)) {
          let sinC = (sideC * Math.sin(deg2rad(angleB))) / sideB;
          if (sinC > 1) throw new Error("No solution possible.");
          angleC = rad2deg(Math.asin(sinC));
          angleA = 180 - angleB - angleC;
          if (angleA <= 0) throw new Error("Invalid inputs.");
          sideA = sideB * Math.sin(deg2rad(angleA)) / Math.sin(deg2rad(angleB));
        } else if (!isNaN(sideB) && !isNaN(sideC) && !isNaN(angleC)) {
          let sinB = (sideB * Math.sin(deg2rad(angleC))) / sideC;
          if (sinB > 1) throw new Error("No solution possible.");
          angleB = rad2deg(Math.asin(sinB));
          angleA = 180 - angleB - angleC;
          if (angleA <= 0) throw new Error("Invalid inputs.");
          sideA = sideC * Math.sin(deg2rad(angleA)) / Math.sin(deg2rad(angleC));
        } else if (!isNaN(sideA) && !isNaN(sideC) && !isNaN(angleA)) {
          let sinC = (sideC * Math.sin(deg2rad(angleA))) / sideA;
          if (sinC > 1) throw new Error("No solution possible.");
          angleC = rad2deg(Math.asin(sinC));
          angleB = 180 - angleA - angleC;
          if (angleB <= 0) throw new Error("Invalid inputs.");
          sideB = sideA * Math.sin(deg2rad(angleB)) / Math.sin(deg2rad(angleA));
        } else if (!isNaN(sideA) && !isNaN(sideC) && !isNaN(angleC)) {
          let sinA = (sideA * Math.sin(deg2rad(angleC))) / sideC;
          if (sinA > 1) throw new Error("No solution possible.");
          angleA = rad2deg(Math.asin(sinA));
          angleB = 180 - angleA - angleC;
          if (angleB <= 0) throw new Error("Invalid inputs.");
          sideB = sideC * Math.sin(deg2rad(angleB)) / Math.sin(deg2rad(angleC));
        } else {
          throw new Error("Unable to solve with these inputs.");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to solve triangle.");
        return;
      }
    }

    if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC) || isNaN(angleA) || isNaN(angleB) || isNaN(angleC)) {
        toast.error("Calculation yielded invalid numbers. Please check inputs.");
        return;
    }

    const perimeter = sideA + sideB + sideC;
    const s = perimeter / 2;
    let area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
    if (isNaN(area) || area <= 0) {
        toast.error("This does not form a valid triangle.");
        return;
    }

    const inradius = area / s;
    const circumradius = (sideA * sideB * sideC) / (4 * area);
    const altA = 2 * area / sideA;
    const altB = 2 * area / sideB;
    const altC = 2 * area / sideC;

    setResults({
      a: sideA.toFixed(4),
      b: sideB.toFixed(4),
      c: sideC.toFixed(4),
      A: angleA.toFixed(4),
      B: angleB.toFixed(4),
      C: angleC.toFixed(4),
      area, perimeter, s, inradius, circumradius, altA, altB, altC
    });
    
    // Auto-fill inputs with results so the user sees the complete triangle
    setInputs({
        a: sideA.toFixed(4).replace(/\.0000$/, ''),
        b: sideB.toFixed(4).replace(/\.0000$/, ''),
        c: sideC.toFixed(4).replace(/\.0000$/, ''),
        A: angleA.toFixed(4).replace(/\.0000$/, ''),
        B: angleB.toFixed(4).replace(/\.0000$/, ''),
        C: angleC.toFixed(4).replace(/\.0000$/, ''),
    });
    
    toast.success("Triangle solved successfully!");
  };

  return (
    <CalculatorLayout
      title="Triangle Calculator"
      description="Solve any triangle given 3 known values (SSS, SAS, SSA, ASA, AAS). Calculates missing sides, angles, area, and properties."
      icon={Triangle}
      slug="triangle-calculator"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-heading font-semibold">Triangle Inputs</h3>
            <Button variant="ghost" size="sm" onClick={clearForm}>Clear</Button>
          </div>
          
          <div className="mb-8">
            <svg viewBox="0 0 200 200" className="w-full max-w-[250px] mx-auto" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="10,180 190,180 80,20" className="fill-primary/5 stroke-primary transition-all duration-500 hover:fill-primary/10" />
              <text x="0" y="195" fill="currentColor" className="text-sm font-bold stroke-none">Angle A</text>
              <text x="150" y="195" fill="currentColor" className="text-sm font-bold stroke-none">Angle B</text>
              <text x="50" y="15" fill="currentColor" className="text-sm font-bold stroke-none">Angle C</text>
              <text x="100" y="195" fill="currentColor" className="text-sm stroke-none text-muted-foreground">side c</text>
              <text x="25" y="100" fill="currentColor" className="text-sm stroke-none text-muted-foreground">side b</text>
              <text x="145" y="100" fill="currentColor" className="text-sm stroke-none text-muted-foreground">side a</text>
            </svg>
          </div>

          <p className="text-sm text-muted-foreground mb-6 text-center">
            Fill exactly 3 fields (at least one side) to solve the triangle.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-4 border-r border-border pr-6">
              <h4 className="font-semibold text-sm text-center">Sides</h4>
              <div className="space-y-2">
                <Label>Side a</Label>
                <Input type="number" placeholder="0" value={inputs.a} onChange={(e) => handleInputChange("a", e.target.value)} className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label>Side b</Label>
                <Input type="number" placeholder="0" value={inputs.b} onChange={(e) => handleInputChange("b", e.target.value)} className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label>Side c</Label>
                <Input type="number" placeholder="0" value={inputs.c} onChange={(e) => handleInputChange("c", e.target.value)} className="bg-background/50" />
              </div>
            </div>

            <div className="space-y-4 pl-2">
              <h4 className="font-semibold text-sm text-center">Angles (Degrees)</h4>
              <div className="space-y-2">
                <Label>Angle A</Label>
                <Input type="number" placeholder="0°" value={inputs.A} onChange={(e) => handleInputChange("A", e.target.value)} className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label>Angle B</Label>
                <Input type="number" placeholder="0°" value={inputs.B} onChange={(e) => handleInputChange("B", e.target.value)} className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label>Angle C</Label>
                <Input type="number" placeholder="0°" value={inputs.C} onChange={(e) => handleInputChange("C", e.target.value)} className="bg-background/50" />
              </div>
            </div>
          </div>

          <Button onClick={solve} className="w-full" size="lg">Calculate Triangle</Button>
        </Card>

        {results && (
          <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl h-fit animate-fade-in">
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
              <Triangle className="w-5 h-5 text-primary" />
              Triangle Properties
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Primary Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 p-3 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Area</p>
                    <p className="font-semibold">{results.area.toFixed(4)}</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Perimeter</p>
                    <p className="font-semibold">{results.perimeter.toFixed(4)}</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Semi-Perimeter</p>
                    <p className="font-semibold">{results.s.toFixed(4)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Radii</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 p-3 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Inradius (r)</p>
                    <p className="font-semibold">{results.inradius.toFixed(4)}</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Circumradius (R)</p>
                    <p className="font-semibold">{results.circumradius.toFixed(4)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Altitudes</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-background/50 p-3 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Alt a</p>
                    <p className="font-semibold">{results.altA.toFixed(4)}</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Alt b</p>
                    <p className="font-semibold">{results.altB.toFixed(4)}</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Alt c</p>
                    <p className="font-semibold">{results.altC.toFixed(4)}</p>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default TriangleCalculator;
