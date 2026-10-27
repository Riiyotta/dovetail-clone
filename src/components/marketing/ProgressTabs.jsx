import '../../styles/marketing/progress-tabs.css'

// ProgressTabs (marketing-shared.md §7.3, `e5b4pau*` / `e13fzi54*`).
// tone 'default' → inactive #7C7C7C / active #FFF; tone 'light' (inside CustomerStories) → always #FAFAFA.
export default function ProgressTabs({ labels, ariaLabels = [], index, progress, onSelect, tone = 'default', className = '' }) {
  return (
    <div className={`mk-ptabs mk-ptabs--${tone} ${className}`} role="tablist">
      {labels.map((label, i) => (
        <div key={i} className="mk-ptabs__tab">
          <button
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={ariaLabels[i] || undefined}
            className="mk-ptabs__num"
            data-active={i === index ? 'true' : undefined}
            onClick={() => onSelect(i)}
          >
            {label}
          </button>
          {i === index && (
            <div className="mk-ptabs__track" aria-hidden="true">
              <div className="mk-ptabs__fill" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
