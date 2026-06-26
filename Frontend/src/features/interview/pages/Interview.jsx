import { useMemo, useState } from "react"
import "../style/interview.scss"

const SECTIONS = {
  technical: "Technical questions",
  behavioral: "Behavioral questions",
  roadmap: "Road Map",
}

const SAMPLE_DATA = {
  matchScore: 85,
  technicalQuestions: [
    {
      question:
        "How do you implement JWT authentication in a MERN application, and where do you store the token securely?",
      intention:
        "To evaluate the candidate's understanding of security best practices, a key requirement in the job description.",
      answer:
        "Implementation involves signing tokens on the backend using jsonwebtoken and storing them either in HTTP-only cookies or secure local storage with proper CSRF/XSS protection measures.",
    },
    {
      question:
        "Explain the difference between Redux Toolkit and standard Redux, and why you would use it in a complex React application.",
      intention:
        "To verify the candidate's proficiency in state management, which is explicitly requested in the job description.",
      answer:
        "Redux Toolkit reduces boilerplate code, simplifies store configuration, and uses Immer internally for immutable state updates, making it more efficient for managing global state.",
    },
    {
      question:
        "How do you optimize a MongoDB query for a collection with millions of documents?",
      intention:
        "To test the candidate's knowledge of database performance and scalability, a core responsibility listed.",
      answer:
        "Optimization involves creating appropriate indexes, using aggregation pipelines efficiently, limiting the number of returned fields with projection, and ensuring proper query structure to utilize indexes.",
    },
  ],
  behavioralQuestions: [
    {
      question:
        "Describe a situation where you had to collaborate with a designer or product manager to change a feature mid-development.",
      intention:
        "To assess the candidate's teamwork and adaptability in an Agile environment.",
      answer:
        "I would highlight a scenario emphasizing clear communication, flexibility, and a focus on delivering user value through iterative adjustments.",
    },
    {
      question: "How do you handle technical debt while meeting tight project deadlines?",
      intention:
        "To evaluate the candidate's approach to balancing speed and code quality.",
      answer:
        "I prioritize critical bug fixes and essential features while documenting necessary refactoring tasks for future sprints to ensure long-term maintainability.",
    },
  ],
  skillGaps: [
    { skill: "Cloud Services (AWS/Docker/Kubernetes)", severity: "high" },
    { skill: "Testing Frameworks (Jest/React Testing Library)", severity: "medium" },
    { skill: "Database alternatives (PostgreSQL/Redis)", severity: "low" },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "Cloud and DevOps",
      task: "Study basic AWS services (EC2, S3) and the fundamentals of Docker containers and CI/CD pipelines.",
    },
    {
      day: 2,
      focus: "Testing and Quality Assurance",
      task: "Practice writing unit tests for React components using Jest and React Testing Library.",
    },
    {
      day: 3,
      focus: "System Design and Scaling",
      task: "Review Microservices Architecture concepts and strategies for scaling MERN applications to handle high traffic.",
    },
  ],
}

function matchesSearch(text, query) {
  return text.toLowerCase().includes(query.toLowerCase())
}

function filterQuestions(questions, query) {
  if (!query.trim()) return questions
  return questions.filter(
    (item) =>
      matchesSearch(item.question, query) ||
      matchesSearch(item.intention, query) ||
      matchesSearch(item.answer, query)
  )
}

function filterPlan(plan, query) {
  if (!query.trim()) return plan
  return plan.filter(
    (item) =>
      matchesSearch(item.focus, query) ||
      matchesSearch(item.task, query) ||
      matchesSearch(String(item.day), query)
  )
}

const Interview = ({ data = SAMPLE_DATA }) => {
  const [activeSection, setActiveSection] = useState("technical")
  const [search, setSearch] = useState("")

  const filteredTechnical = useMemo(
    () => filterQuestions(data.technicalQuestions ?? [], search),
    [data.technicalQuestions, search]
  )

  const filteredBehavioral = useMemo(
    () => filterQuestions(data.behavioralQuestions ?? [], search),
    [data.behavioralQuestions, search]
  )

  const filteredPlan = useMemo(
    () => filterPlan(data.preparationPlan ?? [], search),
    [data.preparationPlan, search]
  )

  const renderQuestions = (questions) => {
    if (questions.length === 0) {
      return <p className="interview-empty">No results match your search.</p>
    }

    return questions.map((item, index) => (
      <article className="question-card" key={index}>
        <h3 className="question-card__title">{item.question}</h3>
        <p className="question-card__intention">
          <span className="question-card__label">Intention</span>
          {item.intention}
        </p>
        <p className="question-card__answer">
          <span className="question-card__label">Suggested Answer</span>
          {item.answer}
        </p>
      </article>
    ))
  }

  const renderPlan = () => {
    if (filteredPlan.length === 0) {
      return <p className="interview-empty">No results match your search.</p>
    }

    return filteredPlan.map((item) => (
      <article className="plan-card" key={item.day}>
        <div className="plan-card__header">
          <span className="plan-card__day">Day {item.day}</span>
          <span className="plan-card__focus">{item.focus}</span>
        </div>
        <p className="plan-card__task">{item.task}</p>
      </article>
    ))
  }

  const renderMainContent = () => {
    if (activeSection === "technical") return renderQuestions(filteredTechnical)
    if (activeSection === "behavioral") return renderQuestions(filteredBehavioral)
    return renderPlan()
  }

  return (
    <main className="interview-page">
      <div className="interview-layout">
        <nav className="interview-nav">
          {Object.entries(SECTIONS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`interview-nav__item${activeSection === key ? " interview-nav__item--active" : ""}`}
              onClick={() => setActiveSection(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <section className="interview-main">
          <div className="interview-search">
            <svg
              className="interview-search__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <input
              type="search"
              className="interview-search__input"
              placeholder="Search questions, answers, or plan items…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="interview-content">{renderMainContent()}</div>
        </section>

        <aside className="interview-sidebar">
          <h2 className="interview-sidebar__title">Skill Gaps</h2>
          <div className="skill-gaps">
            {(data.skillGaps ?? []).map((gap, index) => (
              <span
                key={index}
                className={`skill-gap skill-gap--${gap.severity}`}
                title={`${gap.severity} priority`}
              >
                {gap.skill}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Interview
