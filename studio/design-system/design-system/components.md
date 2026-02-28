# Component Patterns — Laniameda Design System
**Source: ImageStitch app patterns**
**Date: 2026-02-28**

---

## Buttons

### Primary (Accent)
```tsx
<button className="px-4 py-1.5 bg-accent text-white text-xs font-medium rounded hover:opacity-90 transition-opacity">
  Action
</button>
```

### Secondary / Ghost
```tsx
<button className="px-3 py-1.5 text-xs text-secondary hover:text-primary hover:bg-surface border border-border rounded transition-colors">
  Secondary
</button>
```

### Icon Button
```tsx
<button className="p-1.5 rounded hover:bg-border text-secondary hover:text-primary transition-colors">
  <Icon size={14} />
</button>
```

### Accent Icon Button (active/danger)
```tsx
<button className="p-1.5 rounded hover:bg-accent hover:text-white text-secondary transition-colors">
  <Icon size={14} />
</button>
```

---

## Cards / Surfaces

### Default Card
```tsx
<div className="bg-surface border border-border rounded-md shadow-sharp p-4">
  {/* content */}
</div>
```

### Interactive Card (hover state)
```tsx
<div className="bg-surface border border-border rounded-md hover:shadow-elevated transition-all cursor-pointer p-3">
  {/* content */}
</div>
```

### Active Card (selected)
```tsx
<div className="bg-accentDim/30 border border-accent/20 rounded-md p-3">
  {/* active indicator on left edge */}
  <div className="absolute inset-y-0 left-0 w-0.5 bg-accent rounded-full" />
  {/* content */}
</div>
```

---

## Navigation / Tabs

### Tab Bar Item
```tsx
// Inactive
<button className="px-4 py-2 text-xs text-secondary hover:text-primary transition-colors border-b-2 border-transparent">
  Tab Label
</button>

// Active
<button className="px-4 py-2 text-xs text-accent font-medium border-b-2 border-accent">
  Tab Label
</button>
```

### Sidebar Item
```tsx
<div className={`
  flex items-center gap-2 px-3 py-2 text-xs rounded cursor-pointer transition-colors
  ${isActive ? 'bg-accentDim/50 text-accent font-medium' : 'text-secondary hover:text-primary hover:bg-surface'}
`}>
  <Icon size={14} />
  <span>Label</span>
</div>
```

---

## Inputs

### Text Input
```tsx
<input
  className="w-full bg-background border border-border text-sm px-2 py-1 rounded outline-none focus:border-accent transition-colors text-primary placeholder:text-secondary"
/>
```

### Inline Edit Input
```tsx
<input
  className="w-full bg-background border border-accent text-sm px-1 py-0.5 rounded outline-none text-primary"
/>
```

### Range Slider
```tsx
<input
  type="range"
  className="range-clean w-full"
  // CSS in global styles:
  // height: 1px, background: var(--border-color)
  // thumb: 14x14, white bg, accent border, hover scale(1.25)
/>
```

---

## Dropdowns / Context Menus

```tsx
<div className="absolute right-0 top-8 w-40 bg-background border border-border shadow-elevated rounded-md overflow-hidden z-50 animate-fade-in">
  <button className="w-full text-left px-4 py-2 text-xs hover:bg-surface flex items-center gap-2 text-primary">
    <Icon size={12} />
    Menu Item
  </button>
  <div className="h-px bg-border" />  {/* divider */}
  <button className="w-full text-left px-4 py-2 text-xs hover:bg-red-50 text-red-500 flex items-center gap-2">
    <Trash2 size={12} />
    Destructive Action
  </button>
</div>
```

---

## Badges / Tags

### Count Badge
```tsx
<span className="text-[9px] text-secondary bg-surface border border-border rounded px-1">
  {count} items
</span>
```

### Status Badge
```tsx
<span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-accent/10 text-accent">
  Active
</span>
```

---

## Dividers
```tsx
<div className="h-px bg-border" />           {/* horizontal */}
<div className="w-px bg-border h-full" />    {/* vertical */}
<div className="h-px bg-border/50" />        {/* subtle */}
```

---

## Thumbnails / Image Previews
```tsx
<div className="w-6 h-6 rounded overflow-hidden bg-surface border border-border flex-shrink-0">
  <img src={src} className="w-full h-full object-cover" />
</div>
```

---

## Drag & Drop States
```tsx
// Drag target highlight
<div className={`
  transition-all
  ${isDragTarget ? 'ring-2 ring-accent ring-inset bg-accent/5' : ''}
`}>

// Drag over overlay
<div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center bg-accent/10">
  <span className="text-accent font-bold text-xs bg-background px-2 py-1 rounded shadow-sm">
    Drop here
  </span>
</div>
```

---

## Checkboxes
```tsx
<div className={`w-4 h-4 rounded border flex items-center justify-center ${
  isSelected ? 'bg-accent border-accent text-white' : 'border-secondary'
}`}>
  {isSelected && <Check size={10} />}
</div>
```

---

## Section Headers (Sidebar)
```tsx
<div className="px-3 py-2 flex items-center justify-between">
  <span className="text-[10px] font-medium text-secondary uppercase tracking-wide">
    Section Title
  </span>
  <button className="p-1 hover:bg-border rounded text-secondary hover:text-primary">
    <Plus size={12} />
  </button>
</div>
```

---

## Scrollable Container
```tsx
<div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
  {/* content */}
</div>
```
