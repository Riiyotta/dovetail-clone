import { MaskIcon } from '../shared.jsx'
import { pick } from './data.js'

// Arrow bullet list (launch.md `e1osxjcu12/13/14/15`): arrow svg + #042FA7 pill label.
export default function Bullets({ sec, arrowEl, labelEl, className = '' }) {
  const arrows = pick(sec, arrowEl)
  const labels = pick(sec, labelEl)
  return (
    <div className={`lx-bullets ${className}`}>
      {labels.map((l, i) => (
        <div className="lx-bullet" key={l.text}>
          <MaskIcon src={(arrows[i] || arrows[0]).src} className="lx-bullet__arrow" />
          <div className="lx-bullet__pill">{l.text}</div>
        </div>
      ))}
    </div>
  )
}
