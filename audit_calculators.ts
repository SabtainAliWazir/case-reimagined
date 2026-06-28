import { allCalculatorConfigs } from "./src/lib/calculators";

let passed = 0;
let failed = 0;

console.log("Starting automated audit of all calculator configurations...\n");

for (const [id, config] of Object.entries(allCalculatorConfigs)) {
  try {
    // Construct an input object using the default values
    const testInputs: Record<string, number> = {};
    for (const input of config.inputs) {
      testInputs[input.id] = input.defaultValue;
    }

    // Attempt to calculate
    const results = config.calculate(testInputs);
    
    // Validate results
    if (!Array.isArray(results) || results.length === 0) {
      throw new Error(`Calculator returned empty or invalid results array.`);
    }

    results.forEach(res => {
      if (res.label === undefined || res.value === undefined || Number.isNaN(res.value) || res.value === "NaN" || res.value === "Infinity") {
        throw new Error(`Invalid result format: ${JSON.stringify(res)}`);
      }
    });

    console.log(`✅ [PASS] ${id}: Successfully calculated ${results.length} results.`);
    passed++;
  } catch (error: any) {
    console.error(`❌ [FAIL] ${id}: ${error.message}`);
    failed++;
  }
}

console.log(`\nAudit Complete: ${passed} Passed, ${failed} Failed.`);
if (failed > 0) {
  process.exit(1);
}
