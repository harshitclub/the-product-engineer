# HTML Tables

HTML tables are used to display structured, multi-dimensional **tabular data** arranged in rows and columns (e.g. pricing matrices, database schema inspections, financial balances, comparison grids).

Tables should **never** be used to create website layouts (e.g. 2-column sidebar layouts). Layouts are the exclusive domain of CSS Grid and Flexbox.

## Semantic Table Architecture

A production-grade table consists of five structural elements:

```html
<table>
  <caption>Event Ticket Inventory & Pricing</caption>
  <thead>
    <tr>
      <th scope="col">Ticket Tier</th>
      <th scope="col">Access Privileges</th>
      <th scope="col">Price</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Early Bird</th>
      <td>General Keynotes & Panels</td>
      <td>$49.00</td>
      <td>Sold Out</td>
    </tr>
    <tr>
      <th scope="row">Standard Pass</th>
      <td>All Keynotes + Networking Hub</td>
      <td>$99.00</td>
      <td>Available</td>
    </tr>
    <tr>
      <th scope="row">VIP Workshop</th>
      <td>Full Access + 1-on-1 Mentorship</td>
      <td>$199.00</td>
      <td>5 Seats Left</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Total Capacity</td>
      <td>500 Attendees</td>
    </tr>
  </tfoot>
</table>
```

## Table Element Breakdown

| Element | Role in Table Architecture |
| :--- | :--- |
| `<table>` | The root wrapper enclosing all table nodes. |
| `<caption>` | A descriptive title rendered above the table (vital for screen readers). |
| `<thead>` | Groups header rows defining column categories. |
| `<tbody>` | Encloses the primary data rows of the table. |
| `<tfoot>` | Groups summary rows, totals, or footnote calculations. |
| `<tr>` | Represents a single horizontal Table Row. |
| `<th>` | Table Header cell (bold & centered by default; semantic label). |
| `<td>` | Table Data cell (standard left-aligned data container). |

## Essential Accessibility: The `scope` Attribute

Screen readers do not see tables as 2D visual grids; they navigate cell by cell. The `scope` attribute explicitly associates data cells with their respective header cells:

* `scope="col"`: Declares that the `<th>` is a header for all cells in that vertical column.
* `scope="row"`: Declares that the `<th>` is a header for all cells in that horizontal row.

## Spanning Multiple Rows & Columns

You can merge adjacent table cells using `colspan` and `rowspan`:

### 1. `colspan` (Spanning across columns horizontally)
```html
<tr>
  <th scope="row">Global VIP</th>
  <!-- Spans across 2 column tracks -->
  <td colspan="2">All Access + International Travel Stipend</td>
  <td>$499.00</td>
</tr>
```

### 2. `rowspan` (Spanning across rows vertically)
```html
<tr>
  <!-- Spans vertically across 2 consecutive rows -->
  <th rowspan="2" scope="rowgroup">Conference Pass</th>
  <td>Day 1 Keynote</td>
  <td>$50.00</td>
</tr>
<tr>
  <td>Day 2 Workshop</td>
  <td>$75.00</td>
</tr>
```

## Table Engineering Best Practices

1. **Always Use `<caption>`**: Gives immediate context to assistive technologies before reading dozens of rows.
2. **Always Wrap Rows in `<thead>`, `<tbody>`, and `<tfoot>`**: Enables browsers to scroll the table body independently while keeping headers pinned, and allows print engines to repeat headers on multi-page printed reports.
3. **Make Tables Responsive**: Wrap `<table>` in a `<div style="overflow-x: auto;">` container to enable horizontal scrolling on small mobile screens without breaking page layouts.
