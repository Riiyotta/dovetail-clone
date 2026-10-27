import { useEffect, useRef, useState } from 'react'
import { usePageChrome } from '../../chrome.jsx'
import { MkButton, Spacer, txt, usePageTitle } from './common.jsx'
import '../../styles/roles/quiz.css'

// specs/quiz.md §B — role quiz flow (intro → question → result), fully client-side.
// Content: src/data/marketing/roles__<role>__quiz.json. Result labels below are verbatim from specs/quiz.md
// (they're not in the marketing data file).
const LABELS = {
  levelLabel: (n) => `Level ${n} of 5`,
  costHeading: 'What this costs you',
  pitchHeading: 'How Dovetail helps',
  scoreLabel: (score, max) => `Your score: ${score} / ${max}`,
}
const KEYS = ['A', 'B', 'C', 'D']
const ADVANCE_MS = 280

function tierFor(answers) {
  const avg = answers.reduce((a, b) => a + b, 0) / (4 * answers.length)
  return avg <= 0.4 ? 1 : avg <= 0.575 ? 2 : avg <= 0.75 ? 3 : avg <= 0.9 ? 4 : 5
}

function primaryCta(level, cta) {
  if (level <= 2) return cta['level<=2']
  if (level <= 4) return cta['level3-4']
  return cta.level5
}

const isEmpty = (v) => v == null || v === '' || (typeof v === 'object' && !v.placeholder && !v.text)

export default function QuizPage({ data }) {
  usePageChrome({ navSpacer: false, footer: 'default' })
  usePageTitle(data.title)
  const quiz = data.quiz
  const introSection = data.sections.find((s) => s.slice !== 'Spacer')
  const topSpacer = data.sections.find((s) => s.slice === 'Spacer')
  const eyebrow = introSection.content.find((c) => c.el === 'ev3cpd62')
  const startBtn = introSection.content.find((c) => c.role === 'button')

  const [state, setState] = useState('intro')
  const [q, setQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const headingRef = useRef(null)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])
  // Question H2 / result H1 receive focus on every state change.
  useEffect(() => {
    if (state !== 'intro') headingRef.current?.focus()
  }, [state, q])

  const questions = quiz.questions
  const total = questions.length

  const start = () => { setAnswers([]); setQ(0); setSelected(null); setState('question') }
  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
    timer.current = setTimeout(() => {
      setAnswers((a) => [...a, i + 1])
      setSelected(null)
      if (q + 1 < total) setQ(q + 1)
      else setState('result')
    }, ADVANCE_MS)
  }
  const retake = () => { setAnswers([]); setQ(0); setSelected(null); setState('intro') }

  let body
  if (state === 'intro') {
    body = (
      <div className="qz__wrap qz__wrap--intro">
        <span className="qz__eyebrow">{txt(eyebrow)}</span>
        <div className="qz__sp24" />
        <h1 className="qz__h48">{quiz.introHeading}</h1>
        <div className="qz__sp24" />
        <p className="qz__p18 qz__intro-p">{txt(quiz.introSubtitle, 3)}</p>
        <div className="qz__sp40" />
        <MkButton variant="primary" onClick={start}>{startBtn?.text}</MkButton>
      </div>
    )
  } else if (state === 'question') {
    const question = questions[q]
    body = (
      <div className="qz__wrap qz__wrap--question">
        <div className="qz__counter-row"><span className="qz__counter">{`${q + 1} / ${total}`}</span></div>
        <div className="qz__sp16" />
        <div className="qz__track" role="progressbar" aria-valuenow={q + 1} aria-valuemin={1} aria-valuemax={total}>
          <div className="qz__fill" style={{ width: `${(q / total) * 100}%` }} />
        </div>
        <div className="qz__sp40" />
        <h2 className="qz__question" tabIndex={-1} ref={headingRef}>{question.text}</h2>
        <div className="qz__sp32" />
        <div className="qz__options">
          {question.options.map((opt, i) => (
            <button key={`${q}-${i}`} type="button" className={`qz__opt${selected === i ? ' is-selected' : ''}`}
              disabled={selected !== null} aria-label={`Option ${KEYS[i]}: ${opt}`} onClick={() => choose(i)}>
              <span className="qz__key" aria-hidden="true">{KEYS[i]}</span>
              <span className="qz__opt-text">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    )
  } else {
    const level = tierFor(answers)
    const tier = quiz.tiers.find((t) => t.level === level)
    const score = answers.reduce((a, b) => a + b, 0)
    const cta = primaryCta(level, quiz.resultCta)
    body = (
      <div className="qz__wrap qz__wrap--result">
        <div className="qz__tiers" role="img" aria-label={LABELS.levelLabel(level)}>
          {[1, 2, 3, 4, 5].map((n) => <span key={n} className={`qz__seg${n <= level ? ' is-on' : ''}`} />)}
        </div>
        <div className="qz__sp24" />
        <span className="qz__eyebrow">{LABELS.levelLabel(level)}</span>
        <div className="qz__sp16" />
        <h1 className="qz__h48" tabIndex={-1} ref={headingRef}>{tier.name}</h1>
        <div className="qz__sp16" />
        <p className="qz__tagline">{tier.tagline}</p>
        <div className="qz__sp24" />
        <p className="qz__p18">{txt(tier.description, level)}</p>
        {!isEmpty(tier.cost) && (
          <>
            <div className="qz__sp32" />
            <div className="qz__cost">
              <p className="qz__cost-h">{LABELS.costHeading}</p>
              <p className="qz__p16">{txt(tier.cost, level + 1)}</p>
            </div>
          </>
        )}
        {!isEmpty(tier.nextLevel) && (
          <>
            <div className="qz__sp24" />
            <p className="qz__p16 qz__next">{txt(tier.nextLevel, level + 2)}</p>
          </>
        )}
        <div className="qz__sp40" />
        <div className="qz__pitch">
          <p className="qz__pitch-label">{LABELS.pitchHeading}</p>
          <p className="qz__p16 qz__pitch-body">{txt(tier.dovetailPitch, level + 3)}</p>
        </div>
        <div className="qz__sp16" />
        <p className="qz__score">{LABELS.scoreLabel(score, 4 * answers.length)}</p>
        <div className="qz__sp40" />
        <div className="qz__btns">
          <MkButton variant="primary" href={cta.href} newTab={cta.href.startsWith('/auth/signup')}>{cta.label}</MkButton>
          <MkButton variant="secondary" onClick={retake}>{quiz.resultCta.secondary}</MkButton>
        </div>
      </div>
    )
  }

  const fc = quiz.resultFooterCta
  return (
    <main className="quiz-page">
      <Spacer height={topSpacer?.height || { 1440: 88, 1280: 88, 768: 88, 390: 88 }} />
      <section className="mk-container qz">
        {body}
        <div className="qz__bottom" />
      </section>
      {/* CTA footer slice (tools-shared §H) — only rendered with the result (intro doc height has no room for it). */}
      {state === 'result' && fc && (
        <>
          <Spacer height={{ 1440: 200, 1280: 96, 768: 96, 390: 96 }} />
          <section className="mk-grid">
            <div className="qz__cta-col">
              <h2 className="mk-h64 qz__cta-h">{fc.heading}</h2>
              <div className="mk-btn-row qz__cta-row">
                <MkButton variant="primary" href={fc.primary.href} newTab>{fc.primary.label}</MkButton>
                <MkButton variant="secondary" href={fc.secondary.href}>{fc.secondary.label}</MkButton>
              </div>
            </div>
          </section>
          <Spacer height={{ 1440: 120, 1280: 96, 768: 96, 390: 96 }} />
        </>
      )}
    </main>
  )
}
