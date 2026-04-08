import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">agent-generated-webpage</p>
        <h1>Web</h1>
        <p className="lede">
          This is the <strong>product application</strong> workspace. Implement screens and
          components here while following the repository skills below.
        </p>
        <p className="home-cta">
          <Link className="home-cta__link" to="/dashboard">
            Open Apple-style analytics dashboard →
          </Link>
        </p>
      </header>

      <section className="panels" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="sr-only">
          Repository skills
        </h2>
        <article className="panel">
          <h3>Design — design-md</h3>
          <p>
            Pick a brand folder under <code>design-md/&lt;brand&gt;/</code>. Treat{' '}
            <code>DESIGN.md</code> as the visual and UX source of truth (tokens, typography,
            components, motion). Use <code>preview.html</code> / <code>preview-dark.html</code>{' '}
            as reference renders.
          </p>
          <p className="hint">
            Example: <code>design-md/bmw/DESIGN.md</code>
          </p>
        </article>
        <article className="panel">
          <h3>Engineering — react-best-practices</h3>
          <p>
            Follow <code>react-best-practices/SKILL.md</code> and the rule files under{' '}
            <code>react-best-practices/rules/</code> (or the compiled{' '}
            <code>react-best-practices/AGENTS.md</code>) for React performance, data flow,
            bundle shape, and rendering patterns.
          </p>
        </article>
      </section>

      <footer className="foot">
        <p>
          Run <code>npm run dev</code> in <code>web/</code> for local development. Use{' '}
          <code>preview-app/</code> to browse all design-md HTML previews in one place.
        </p>
      </footer>
    </div>
  )
}
