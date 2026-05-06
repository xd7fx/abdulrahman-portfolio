# Raw form-data sources

Drop the source `.xlsx` files **here**, then run the parser to regenerate
`data/universities.ts` and `data/specializations.ts`.

## Expected files

| Filename | Purpose | Sheet shape (the parser is tolerant; column-name matching is case-insensitive) |
|---|---|---|
| `universities.xlsx` (or `3.xlsx`) | Universities & institutions list | Two columns: name (e.g. "اسم الجامعة" / "name") and sector (e.g. "نوع القطاع" / "sector") with values like "حكومي/أهلي" or "government/private". |
| `specializations.xlsx` (or `7.xlsx`) | Academic programs / majors | Two columns: program name (e.g. "البرنامج الأكاديمي" / "program") and optionally a university column (e.g. "اسم الجامعة" / "university"). |
| `broad-specializations.xlsx` (or `8.xlsx`) | Optional: broad category groupings | One column with a category name (e.g. "العلوم الطبيعية والرياضيات والإحصاء"). Currently not consumed by the form but kept for future filtering. |

The parser falls back to the first two/three columns of each sheet if the
headers don't match the expected names — so any reasonable layout works.

## Run the parser

```powershell
npm run import:form-data
```

It overwrites:
- `data/universities.ts`
- `data/specializations.ts`

Re-run anytime you replace the source `.xlsx` files. Commit the regenerated
`.ts` files (the `.xlsx` originals stay in `archive/raw-data/` for audit).

## Why xlsx and not the .ts files directly?

The lists are large (~2,259 specializations) and the user owns the canonical
spreadsheet. Editing in Excel + regenerating is faster than touching TypeScript
each time the list updates.
