# AI Career Coach: Design Guidelines

## Design Approach

**Selected Approach**: Design System (Material Design 3 + LinkedIn Learning inspiration)

**Rationale**: As a professional career preparation tool, the interface must convey trust, competence, and clarity. The information-dense nature (questions, feedback, scores, dashboards) requires consistent patterns and clear hierarchy. Material Design 3's emphasis on readable typography and structured layouts aligns perfectly with educational productivity tools.

**Core Principles**:
- Professional credibility through clean, structured layouts
- Cognitive clarity - minimize distractions during practice sessions
- Progress visibility - always show where users are in their journey
- Encouraging tone through thoughtful micro-copy and visual feedback

---

## Typography

**Font System** (Google Fonts):
- **Primary**: Inter (body text, UI elements, data) - 400, 500, 600 weights
- **Display**: Poppins (headings, role titles) - 600, 700 weights

**Hierarchy**:
- H1 (Page titles): Poppins 700, 3xl-4xl
- H2 (Section headers): Poppins 600, 2xl-3xl  
- H3 (Card titles, question headers): Poppins 600, xl
- Body text: Inter 400, base
- UI labels: Inter 500, sm
- Captions/metadata: Inter 400, xs-sm

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 8, 12, 16** for consistent rhythm
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16
- Card gaps: gap-4, gap-6
- Form elements: space-y-4

**Grid Structure**:
- Container: max-w-7xl mx-auto px-6
- Dashboard grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Interview interface: Single column max-w-3xl for focus
- Role selection: grid-cols-1 md:grid-cols-2 lg:grid-cols-4

---

## Component Library

### Navigation
- **Top Bar**: Fixed header with logo left, role selector center, profile/progress right
- Clean horizontal navigation with subtle borders
- Breadcrumbs for multi-step interview flows

### Role Selection Cards
- Card-based grid layout with hover elevation
- Icon (top), Role title, skill tags, "Start Practice" CTA
- Border treatment with subtle shadows

### Interview Simulation Interface
- **Question Panel**: Large, centered card with question number indicator
- **Answer Input**: Full-width textarea with character count
- **Action Bar**: "Submit Answer" (primary), "Skip" (secondary), "End Session" (ghost)
- **Progress Indicator**: Linear progress bar showing questions completed

### Feedback Components
- **Score Display**: Large numerical score with circular progress indicator
- **Criteria Breakdown**: Horizontal bar charts for Technical/Communication/Confidence
- **AI Feedback Text**: Bordered callout box with constructive suggestions
- **Improvement Tips**: Bullet list with checkmark icons

### Dashboard Elements
- **KPI Cards**: Grid of metric cards (Avg Score, Practice Sessions, Weakest Area)
- **Performance Charts**: Line chart for progress over time, bar chart by role
- **Skill Radar**: Multi-axis chart showing competency across skills
- **Recent Activity Feed**: List with timestamps and quick-view scores

### Forms
- Clean input fields with floating labels
- Dropdown for role/difficulty selection with search
- Checkbox groups for skill selection with visual tags
- Primary CTA buttons, always right-aligned in forms

---

## Page-Specific Layouts

### Landing Page (Marketing)
**Structure** (6 sections):
1. **Hero**: Left-aligned headline + subtext, right-side illustration/mockup, dual CTAs (Start Free / Learn More)
2. **How It Works**: 3-column process cards with numbered steps
3. **Roles Covered**: 4-column grid of supported career paths with icons
4. **Features**: 2-column alternating feature showcases (image + text)
5. **Success Metrics**: 4-column stat cards with large numbers
6. **CTA Footer**: Centered call-to-action with testimonial snippets

**Multi-column usage**: Strategic - process steps, role cards, feature grid

### Dashboard (Main App)
**Layout**: Sidebar navigation (roles/settings) + main content area
- Top row: 3 KPI cards
- Middle: 2-column (chart left, activity feed right)
- Bottom: Full-width skill assessment table

### Mock Interview Page
**Single-column focus layout** (max-w-3xl centered):
- Progress bar (top)
- Question card (large, centered)
- Answer textarea (full-width)
- Actions (bottom, right-aligned)

---

## Images

**Hero Section**: Use professional stock image showing diverse young professionals in collaborative learning environment - positioned right side, taking ~50% width on desktop

**Feature Sections**: 
- Interview simulation mockup screenshot (UI preview)
- Dashboard analytics visualization 
- Happy candidate celebrating (success story)

**Role Cards**: Icon-based graphics (no photos needed - use Heroicons)

**Placement**: Images appear in landing page only; app interface focuses on data clarity without decorative imagery

---

## Interaction Patterns

**Minimal animations**:
- Card hover: Subtle scale (1.02) + shadow elevation
- Button press: Scale down (0.98)
- Page transitions: Simple fade-in
- Score reveals: Count-up animation (brief)

**No distracting motion** during interview sessions - focus is paramount

---

## Accessibility Standards

- Minimum 4.5:1 contrast for all text
- Focus indicators: 2px solid outline on interactive elements
- Form inputs: Clear labels, error states with icons + text
- Keyboard navigation: Logical tab order throughout
- ARIA labels on dashboard charts and progress indicators
- Screen reader announcements for score updates and feedback