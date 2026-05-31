# CareerDNA benchmark framework

This framework gives you a repeatable way to test the **structured recommendation engine** before and after selector, taxonomy, or prose changes.

## What it checks

For **school** profiles:
- exact 3 + 2 subject structure
- no duplicate subject titles
- minimum subject family diversity
- minimum subject cluster diversity
- included-archetype coverage across selected subjects
- whether other options genuinely broaden the main set
- whether secondary included archetypes are visible in the main suggestions
- optional custom family expectations per case

For **undergraduate/postgraduate** profiles:
- matched subject found
- exact role count
- no duplicate role titles
- minimum role family diversity
- max roles per family
- included-archetype coverage across selected roles

## Files

- `scripts/cdnaBenchmark.js` — runner
- `benchmarks/cdna_benchmark_cases.json` — editable seed benchmark set
- `benchmarks/output/` — generated reports

## Run

From the backend root:

```bash
node scripts/cdnaBenchmark.js
```

Optional arguments:

```bash
node scripts/cdnaBenchmark.js --cases benchmarks/cdna_benchmark_cases.json --out benchmarks/output
```

## Output

The runner writes:
- `benchmarks/output/cdna_benchmark_report.json`
- `benchmarks/output/cdna_benchmark_report.md`

It also exits with code **1** if any benchmark case has a `FAIL`, so it can be used in CI or pre-release checks.

## How to use it properly

1. Freeze the current benchmark set.
2. Add 1–2 new benchmark cases every time you discover a meaningful edge case.
3. Before changing selector or taxonomy logic, run the benchmark.
4. After changes, compare:
   - subject family spread
   - cluster spread
   - archetype coverage
   - role family spread
   - failure/warning count

## Important note

This framework benchmarks the **structured engine outputs** that your backend controls. It does **not** benchmark LLM writing quality directly. That is deliberate: structured recommendation quality should be stabilised first, and prose should be assessed separately once the inputs are trustworthy.
