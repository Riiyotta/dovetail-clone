import { CARDS } from './govern/cards.js'
import '../styles/Govern.css'

// CLONE_SPEC.md §8 "Govern customer context at scale"
export default function Govern() {
  return (
    <section className="govern-section bg-bg">
      <div className="container govern-container">
        <div className="govern-header">
          <h2 className="govern-h2 text-text-strong">
            Govern<span className="govern-icon"><img src="/assets/home-govern-icon.png" alt="" /></span>customer
            <br />
            <span className="govern-serif font-serif">context</span> at scale
          </h2>
          <p className="govern-intro text-text-strong">
            Placeholder copy for this whole section. It describes how teams keep shared customer knowledge organised, safe, and consistent as use grows across many groups, with clear controls that hold up well for large organisations and strict audits.
          </p>
          <div className="cta-row">
            <a href="#" className="btn btn-primary">Book a demo</a>
            <a href="#" className="btn btn-glass">Start free trial</a>
          </div>
        </div>

        <div className="govern-grid">
          {CARDS.map((c) => (
            <div key={c.img} className="govern-card">
              <img className="govern-img" src={`/assets/home-govern-${c.img}.png`} alt="" />
              <div className="govern-text">
                <h3 className="govern-h3 text-text-strong">{c.title}</h3>
                <p className="govern-body text-text-muted">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
