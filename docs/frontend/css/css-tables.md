# CSS Table Styling

HTML tables (`<table>`) have specialized box model and layout rules. Applying modern CSS transforms raw data tables into clean, readable, and responsive data grids.

## 1. Core Table Layout Properties

```css
table {
  width: 100%;
  border-collapse: collapse; /* Merges adjacent cell borders into single lines */
  table-layout: fixed;      /* Faster rendering & predictable column widths */
}
```

### `border-collapse`: `collapse` vs `separate`

| Value | Behavior |
| :--- | :--- |
| **`collapse`** (Standard) | Merges adjacent cell borders into a single shared border line. Eliminates double-line borders. |
| **`separate`** (Default) | Keeps cell borders separated. Enables the `border-spacing: 8px;` property. |

### `table-layout`: `fixed` vs `auto`

- `auto` (Default): Browser scans the entire table's content across all rows before determining column widths. Slower on large datasets ($>1000$ rows) and column widths can shift during rendering.
- `fixed`: Column widths are determined immediately based on the `<col>` or first `<th>` row. Enables predictable text truncation (`text-overflow: ellipsis;`) inside table cells.

## 2. Professional Clean Table Design

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  text-align: left;
}

/* Header Styling */
.data-table thead {
  background-color: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
}

.data-table th {
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #0f172a;
}

/* Body Rows & Cells */
.data-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}

/* Zebra Striping */
.data-table tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

/* Row Hover State */
.data-table tbody tr:hover {
  background-color: #f1f5f9;
}
```

## 3. Sticky Table Headers

Keep table headers visible on screen while scrolling through lengthy datasets:

```css
/* Container with fixed height & vertical scroll */
.table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

/* Sticky Header Cells */
.table-container th {
  position: sticky;
  top: 0;
  background-color: #f8fafc;
  z-index: 10;
  box-shadow: inset 0 -1px 0 #e2e8f0; /* Crisp bottom border simulation */
}
```

## 4. Responsive Mobile Table Strategies

### Strategy 1: Horizontal Scroll Wrapper (Easiest & Most Reliable)
Wrap the `<table>` inside a responsive overflow container:

```css
.table-responsive-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

### Strategy 2: Card Transformation (For Compact Mobile Records)
Transforms table rows into individual vertical cards on mobile screens using CSS attributes and pseudo-elements:

```css
@media (max-width: 640px) {
  .responsive-card-table thead {
    display: none; /* Hide standard desktop header */
  }

  .responsive-card-table tr {
    display: block;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  .responsive-card-table td {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border: none;
  }

  /* Insert column label from HTML data-label attribute */
  .responsive-card-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #64748b;
  }
}
```
