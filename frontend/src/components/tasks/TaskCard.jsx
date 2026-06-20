/*
TaskCard.jsx
Purpose:
- Render one task item in a clean, reusable card.

Requirements:
- Show task title, description, priority, due date, category, tags, and completion status.
- Provide edit and delete actions.
- Show completion UI state clearly.

Challenges to solve later:
- Keep the card compact but readable.
- Avoid mixing display logic with action logic.
- Make priority and due date styling consistent across the app.
*/

export default function TaskCard() {
  return (
    <article className="rounded-panel border border-white/10 bg-background p-4 shadow-soft">
      <div className="space-y-2">
        <p className="text-sm text-text-secondary">TaskCard scaffold</p>
        <h4 className="text-base font-semibold">Single Task Item</h4>
        <p className="text-sm text-text-secondary">
          This component will later display one task with actions and badges.
        </p>
      </div>
    </article>
  );
}
