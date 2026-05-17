import Link from 'next/link';

export const metadata = {
  title: 'Curriculum & Frameworks — Summit Fellowship',
};

type Concept = { num: string; title: string; desc: string };

const M1: Concept[] = [
  { num: '1.1', title: 'Mission · 8 words, outcome-focused', desc: "Strip every word until what's left names a specific outcome for a specific population. No nouns about activities. No “empowering” or “transforming”. The mission either causes the outcome or it doesn't." },
  { num: '1.2', title: 'Big Idea · ≤ 6 words', desc: "The compact, replicable mechanism. The thing that, if copy-pasted onto someone else's organization, would still produce the outcome." },
  { num: '1.3', title: 'Theory · idea → behavior → outcome', desc: "The causal chain. What behavior change does your idea produce, in whom, that produces the outcome? If any link is fuzzy, the model isn't ready." },
  { num: '1.4', title: 'The Model · 4–6 core elements', desc: 'The minimum set of activities the model must do to produce the behavior change. Strip anything else.' },
  { num: '1.5', title: 'Behavior map + drivers', desc: 'What gets in the way of the behavior change? What removes the barriers? Map drivers explicitly — most failed scale-ups failed at exactly one of them.' },
];
const M2: Concept[] = [
  { num: '2.1', title: 'Good enough?', desc: 'Does the solution work? Show me the evidence chain — and where it has gaps.' },
  { num: '2.2', title: 'Big enough?', desc: "Will solving the problem move a population-level outcome? Or are we describing a slice that doesn't matter at the national level?" },
  { num: '2.3', title: 'Simple enough?', desc: 'Can a stranger, with the manual, replicate this without you? The founder dependency is the single biggest scale killer.' },
  { num: '2.4', title: 'Cheap enough?', desc: 'Can the ultimate payer afford to reach everyone? Pilot-scale unit economics do not translate. Scale-scale unit economics must.' },
  { num: '2.5', title: 'Doer & Payer at scale', desc: 'The two questions Mulago will ask before anything else. Who, specifically, is the entity that implements your model at scale? Who pays them, sustainably, to do it?' },
];
const M3: Concept[] = [
  { num: '3.1', title: 'Levels of evidence', desc: 'The ladder from anecdote to RCT. Where on the ladder are you? Where do you actually need to be?' },
  { num: '3.2', title: 'Metrics hierarchy', desc: 'Outputs, outcomes, impact. Most organizations confuse these — and pay for it during funder due diligence.' },
  { num: '3.3', title: 'Designing your evidence plan', desc: 'A 12-month, costed plan that closes your most expensive evidence gap. Built in workshop format, with critique.' },
];
const M4: Concept[] = [
  { num: '4.1', title: 'Why iteration matters', desc: 'Theory of why this is the difference between organizations that scale and organizations that grow.' },
  { num: '4.2', title: 'Iteration methods', desc: 'From A/B testing program design to operational quarterly rhythms. Concrete patterns from organizations who do it well.' },
  { num: '4.3', title: 'Data flows', desc: 'What data flows up, down, and across the organization — and on what cadence — for iteration to be possible.' },
  { num: '4.4', title: 'People & culture', desc: 'The hardest part. What does it look like inside the org to be one that genuinely runs on iteration, not on heroics?' },
];
const M5: Concept[] = [
  { num: '5.1', title: 'Clear language', desc: 'The discipline of plain language. What jargon you can keep, what you must drop, and why most decks fail on slide three.' },
  { num: '5.2', title: 'Narrative structure', desc: 'The four-beat structure every memorable funder pitch follows. Designed, not improvised.' },
  { num: '5.3', title: 'The 10-minute pitch', desc: 'Built live, in workshop. Every fellow drafts theirs on Day 5 and delivers it on Day 6.' },
];

function ConceptList({ items }: { items: Concept[] }) {
  return (
    <ul className="concept-list">
      {items.map((c) => (
        <li key={c.num} className="concept-item">
          <span className="concept-item__num">{c.num}</span>
          <div>
            <h4 className="concept-item__title">{c.title}</h4>
            <p className="concept-item__desc">{c.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function CurriculumPage() {
  return (
    <>
      <section className="page-hero" data-screen-label="Curriculum Hero">
        <div className="topo-bg topo-bg--on-dark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <div className="page-hero__crumbs"><Link href="/">Home</Link><span>/</span><span>Curriculum</span></div>
          <h1 className="page-hero__title">Five modules. <em style={{ color: 'var(--ochre)', fontStyle: 'italic' }}>One outcome.</em></h1>
          <p className="page-hero__subtitle">The curriculum is built around frameworks that work — the Mulago Scale Screen, Doer &amp; Payer at Scale, the Iterative Organization, and Clear-Language Communications.</p>
        </div>
      </section>

      <section className="module" id="m1">
        <div className="container">
          <div className="module__grid">
            <div className="module__head">
              <div className="module__num">Module 01</div>
              <h2 className="module__title">Design for impact<br />at <em>scale.</em></h2>
              <p className="module__sub">The foundational building blocks. Every cohort&rsquo;s models are reconstructed from these elements first.</p>
              <div className="module__when">Day 01 · Monday · 09:00 – 17:30</div>
            </div>
            <div className="module__body">
              <p className="lead">Most social enterprises know what they do. Far fewer can answer, in one sentence, what specific behavior change drives the outcome they care about — and which model elements actually produce that behavior.</p>
              <p>This module is the most precise of the week. By lunchtime, every fellow has rewritten their mission to eight words and their Big Idea to six. By the end of day, the Behavior Map and the model&rsquo;s core elements are on paper.</p>

              <div className="framework-vis">
                <div className="framework-vis__inner">
                  <div className="framework-vis__title">The Theory of Change · simplified</div>
                  <div className="framework-vis__diagram">
                    <div className="vis-row">
                      <div className="vis-box">Big Idea</div>
                      <span className="vis-arrow">→</span>
                      <div className="vis-box">Model</div>
                      <span className="vis-arrow">→</span>
                      <div className="vis-box is-key">Behavior</div>
                      <span className="vis-arrow">→</span>
                      <div className="vis-box is-key">Outcome</div>
                    </div>
                  </div>
                </div>
              </div>

              <ConceptList items={M1} />
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--alpine-deep)', borderLeft: '2px solid var(--clay)', paddingLeft: 20, marginTop: 32 }}>
                By the end of Day 1, every fellow has a one-pager: Mission, Big Idea, Theory, Model, Behaviors, Doer, and Payer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="module" id="m2">
        <div className="container">
          <div className="module__grid">
            <div className="module__head">
              <div className="module__num">Module 02</div>
              <h2 className="module__title">Scale strategy<br />+ the <em>Scale Screen.</em></h2>
              <p className="module__sub">The four-question filter every Mulago-backed model has to earn a yes on.</p>
              <div className="module__when">Day 02 · Tuesday · 09:00 – 13:00</div>
            </div>
            <div className="module__body">
              <p className="lead">The Scale Screen is the framework at the heart of Mulago&rsquo;s investment thesis. It is not a maturity model — it is a yes/no filter. By the end of this module, fellows can defensibly answer all four questions about their own model.</p>
              <div className="framework-vis">
                <div className="framework-vis__inner">
                  <div className="framework-vis__title">The Four Enoughs · Mulago Scale Screen</div>
                  <div className="framework-vis__diagram">
                    <div className="vis-row">
                      <div className="vis-box is-key">Good enough</div>
                      <div className="vis-box is-key">Big enough</div>
                      <div className="vis-box is-key">Simple enough</div>
                      <div className="vis-box is-key">Cheap enough</div>
                    </div>
                    <div className="vis-row">
                      <div className="vis-box">Evidence</div>
                      <div className="vis-box">Population</div>
                      <div className="vis-box">Replicable</div>
                      <div className="vis-box">Unit economics</div>
                    </div>
                  </div>
                </div>
              </div>
              <ConceptList items={M2} />
            </div>
          </div>
        </div>
      </section>

      <section className="module" id="m3">
        <div className="container">
          <div className="module__grid">
            <div className="module__head">
              <div className="module__num">Module 03</div>
              <h2 className="module__title">Impact <em>evidence.</em></h2>
              <p className="module__sub">Designing an evidence plan that&rsquo;s defensible to a skeptical funder — not just to a friendly evaluator.</p>
              <div className="module__when">Day 02 · Tuesday · 14:00 – 16:30</div>
            </div>
            <div className="module__body">
              <p className="lead">Most organizations measure too much, and the wrong things. We design from the outcome backwards: what is the smallest set of metrics that, taken together, force a funder to believe the model is causing the outcome?</p>
              <ConceptList items={M3} />
            </div>
          </div>
        </div>
      </section>

      <section className="module" id="m4">
        <div className="container">
          <div className="module__grid">
            <div className="module__head">
              <div className="module__num">Module 04</div>
              <h2 className="module__title">The iterative<br /><em>organization.</em></h2>
              <p className="module__sub">Theory, methods, data flows, and culture. How organizations actually improve at the speed scale requires.</p>
              <div className="module__when">Day 04 · Thursday · 09:00 – 17:00</div>
            </div>
            <div className="module__body">
              <p className="lead">A model designed for scale is necessary but not sufficient. Scale-ready organizations also <em>improve</em> at scale — they learn from data, kill what isn&rsquo;t working, and double down on what is, on a quarterly rhythm not an annual one.</p>
              <ConceptList items={M4} />
            </div>
          </div>
        </div>
      </section>

      <section className="module" id="m5">
        <div className="container">
          <div className="module__grid">
            <div className="module__head">
              <div className="module__num">Module 05</div>
              <h2 className="module__title">Comms &amp; <em>pitching.</em></h2>
              <p className="module__sub">&ldquo;The pitch is dead. Long live the conversation.&rdquo; Building a narrative that holds up across a 90-second pitch and a 90-minute meeting.</p>
              <div className="module__when">Day 05 · Friday · 09:00 – 17:00</div>
            </div>
            <div className="module__body">
              <p className="lead">By Day 5, every fellow has a defensible model. This module is about being able to communicate it — first to themselves, then to peers, then to a funder who&rsquo;s heard 200 pitches this year.</p>
              <ConceptList items={M5} />
              <div className="banned-words">
                <h4>The banned words list · examples</h4>
                <div className="banned-words__cloud">
                  {['empower', 'holistic', 'solution', 'at-risk', 'transform', 'impactful', 'capacity-building', 'ecosystem', 'stakeholders', 'leverage', 'synergy', 'cutting-edge'].map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
              </div>
              <p>By Day 6, the pitch has been rehearsed, critiqued, rebuilt, and delivered. The skill the cohort actually walks away with is not the pitch itself — it&rsquo;s the ability to rebuild it for any audience, in any room, for the next ten years.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
