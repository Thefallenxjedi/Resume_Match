// Configure PDF.js Worker
if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

// Common Stop Words for Local Keyword Similarity & TF-IDF
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'cant', 'cannot', 'could',
  'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'hadnt', 'has', 'hasnt', 'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres',
  'hers', 'herself', 'him', 'himself', 'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 'in', 'into', 'is',
  'isnt', 'it', 'its', 'itself', 'lets', 'me', 'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor', 'not', 'of',
  'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same',
  'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 'than', 'that', 'thats',
  'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'these', 'they', 'theyd', 'theyll',
  'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasnt',
  'we', 'wed', 'well', 'were', 'weve', 'werent', 'what', 'whats', 'when', 'whens', 'where', 'wheres', 'which',
  'while', 'who', 'whos', 'whom', 'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd', 'youll',
  'youre', 'youve', 'your', 'yours', 'yourself', 'yourselves'
]);

// Helper: Tokenize text into words
function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

// ==========================================================================
// Sample Data & Pre-computed evaluations
// ==========================================================================

const SAMPLES = {
  jds: {
    "frontend-eng": `Senior Frontend Engineer (React/Vite)
Location: Remote / Hybrid
Experience Required: 5+ Years

Required Skills & Technologies:
- 5+ years of professional experience building complex web frontends
- Advanced mastery of React 18, React hooks, and modern state management (Zustand, Redux Toolkit, Context API)
- Deep proficiency in modern Javascript (ES6+) and TypeScript
- Strong expertise in Vanilla CSS, CSS Grid, Flexbox, and TailwindCSS
- Solid understanding of web performance optimization: Core Web Vitals (LCP, INP, CLS), code splitting, and lazy loading
- Experience with modern bundle tools, specifically Vite and Webpack
- Writing automated frontend tests using Jest and Cypress

Preferred Skills & Bonus:
- Experience with Next.js App Router, Server Actions, and Server-Side Rendering (SSR)
- Background building UI libraries or shared component design systems
- Experience working with Figma to extract design tokens and build visual interfaces

Responsibilities:
- Build and maintain highly interactive analytical dashboards
- Optimize application speed, responsiveness, and rendering times
- Collaborate with UX design teams to translate mockups into premium functional interfaces
- Mentor junior engineers and participate in comprehensive code reviews
- Lead the migration of legacy projects from Webpack to Vite

Education:
- Bachelor's degree in Computer Science, Software Engineering, or equivalent practical experience.`,

    "data-scientist": `Lead Data Scientist (AI & Machine Learning)
Location: San Francisco, CA
Experience Required: 6+ Years

Required Skills & Technologies:
- 6+ years of data science and ML modeling experience in production systems
- Expert level Python coding (Pandas, NumPy, Scikit-Learn)
- Experience training and fine-tuning deep learning models (PyTorch or TensorFlow)
- Practical experience with Natural Language Processing (NLP): Transformers, BERT, embeddings, and vector databases (Pinecone, Chroma, Milvus)
- Background working with Large Language Models (LLMs) via APIs (Gemini, OpenAI) or open-weights execution (Llama, Mistral)
- Writing production pipelines using SQL, Docker, and MLflow

Preferred Skills & Bonus:
- PhD or Master's degree in Machine Learning, Computer Science, Statistics, or similar quantitative field
- Experience building graph neural networks or semantic knowledge graphs
- Contributions to open-source ML frameworks or research publications (NeurIPS, ICML)

Responsibilities:
- Design and deploy embedding pipelines and semantic retrieval architectures for high-scale match systems
- Train and evaluate fine-tuned language models on domain-specific dataset pools
- Collaborate with ML engineers to deploy models into high-availability cloud APIs (AWS/GCP)
- Translate business requirements into mathematical modeling metrics and metrics tracking

Education:
- Master's or PhD degree in Computer Science, Applied Mathematics, Statistics, or related STEM field.`,

    "marketing-mgr": `Product Marketing Director
Location: New York, NY (Hybrid)
Experience Required: 8+ Years

Required Skills & Experience:
- 8+ years of product marketing experience in the B2B enterprise SaaS industry
- Outstanding copywriting and communication skills: Able to translate complex technical features into clear, value-driven customer benefits
- Proven experience design and executing Go-To-Market (GTM) strategies for new products and features
- Deep expertise in customer segmentation, market intelligence, and competitor analysis
- Analytical mindset: Proficient in Google Analytics, HubSpot, Salesforce, and cohort analysis tools
- Experience managing and scaling a marketing team (3+ direct reports)

Preferred Skills & Bonus:
- MBA degree or marketing-focused business degree
- Background in developer relations or technical marketing
- Experience running multi-channel paid acquisition campaigns (LinkedIn, Google Ads) with budgets over $50k/month

Responsibilities:
- Build and execute the global GTM strategy for our core analytics software suite
- Develop messaging hierarchies, value propositions, and sales enablement assets (pitch decks, case studies, whitepapers)
- Direct competitive intelligence programs to keep the executive team updated on market shifts
- Partner with product management to align product roadmaps with customer demands
- Measure, track, and optimize SaaS metrics: CAC, LTV, conversion rates, and retention

Education & Certifications:
- Bachelor's degree in Marketing, Business Administration, Communications, or related field.`
  },

  resumes: {
    "frontend-eng-match": `Alex Rivera
Senior Frontend Architect | React & Performance Specialist
Email: alex.rivera@example.dev | Github: github.com/arivera-dev | Website: arivera.dev

PROFESSIONAL SUMMARY
Dynamic, performance-focused Frontend Engineer with 6 years of experience building high-scale web applications. Specialist in React architectures, component-driven design systems, and frontend build pipeline optimization. Passionate about micro-interactions, responsive typography, and page loading speed.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL (Basic)
- Frameworks & Libraries: React (v16.8 - v18), Redux Toolkit, Zustand, React Query, TailwindCSS, CSS Modules
- Tooling & Build: Vite, Webpack, Babel, ESLint, Git, Docker, GitHub Actions (CI/CD)
- Testing: Jest, React Testing Library, Mocha, Chai
- Design: Figma (token extraction, component mapping), Responsive layout design

EXPERIENCE
Senior Frontend Engineer | DataGlow Analytics
June 2021 – Present
- Designed and built user analytics dashboards handling 2M+ active daily charts, improving client-side dashboard load times by 40%.
- Led transition of 4 main repository builds from Webpack to Vite, cutting local dev startup times from 45 seconds to under 2 seconds.
- Authored a shared glassmorphic React UI component library, decreasing code duplication across three product lines by 65%.
- Implemented frontend performance audits focusing on Core Web Vitals, bringing Largest Contentful Paint (LCP) from 3.8s down to 1.8s.
- Mentored 3 junior developers and conducted weekly technical code reviews.

Frontend Engineer | AppCrafters Studio
September 2019 – May 2021
- Created responsive web interfaces for enterprise SaaS applications using React and Redux.
- Collaborated closely with designers using Figma to implement pixel-perfect layouts, applying container queries and grid systems.
- Wrote extensive unit tests using Jest, achieving 90%+ coverage across crucial client flows.
- Automating static asset optimization and CDN caching rules, reducing mobile data overhead by 30%.

EDUCATION & CERTIFICATIONS
Bachelor of Science in Computer Science
State University | Graduated 2019`,

    "data-scientist-match": `Dr. Elena Rostova
Lead Data Scientist & Generative AI Researcher
Email: elena.rostova@example.ai | Web: elenarostova.github.io | Scholar: scholar.google.com/rostova

EXECUTIVE PROFILE
Data Scientist with a PhD in Machine Learning and 7 years of industrial experience developing state-of-the-art Natural Language Processing (NLP) models and semantic recommendation systems. Architected embedding pipelines and retrieval systems that process multi-million document repositories.

CORE COMPETENCIES
- Machine Learning & DL: PyTorch, TensorFlow, Scikit-Learn, Pandas, NumPy, Keras
- NLP & LLMs: Transformers (Hugging Face), BERT, GPT, Gemini API integration, LLM fine-tuning, Llama index
- Data Storage & Vector Databases: Pinecone, ChromaDB, PostgreSQL, Milvus
- MLOps & Production: SQL, Docker, MLflow, AWS (S3, SageMaker), GCP, GitHub Actions, CI/CD
- Advanced Mathematics: Probability, Statistics, Matrix calculus, Graph theory

WORK HISTORY
Lead Data Scientist | CareerSphere Corp
March 2022 – Present
- Lead a team of 4 researchers in designing a semantic skill-matching algorithm using dense vector embeddings (ChromaDB + custom fine-tuned BERT models), boosting recruitment matches by 35%.
- Implemented and deployed Python pipeline endpoints running fine-tuned Llama-3-8B models via Docker to automate resume entity extraction, processing 50k documents daily.
- Optimized vector database search indexes using HNSW indexing in Pinecone, reducing retrieval latency from 420ms to 28ms at scale.
- Designed comprehensive ML experiment tracking flows using MLflow, centralizing training runs and saving $15k/month in compute overhead.
- Present regular ML research updates to VP of Engineering and coordinate data engineering inputs.

Senior ML Researcher | NeuroNet Solutions
September 2019 – February 2022
- Researched and trained Graph Neural Networks (GNNs) for enterprise knowledge graph alignment.
- Published 2 papers at NeurIPS/ICML conferences detailing lightweight semantic text matching architectures.
- Built ETL pipelines handling terabyte-scale text corpora using PySpark, SQL, and AWS SageMaker.

EDUCATION & ACADEMICS
PhD in Computer Science (Specialization: Deep Learning for NLP)
Stanford University | 2019
Master of Science in Mathematical Statistics
MIT | 2015`,

    "marketing-mgr-match": `Taylor Vance
Senior SaaS Marketing Manager
Email: taylor.vance@example.co | LinkedIn: linkedin.com/in/taylor-vance

SUMMARY
Senior Product Marketer with 5 years of experience in enterprise B2B SaaS. Proven track record of developing product positioning, running campaign channels, and measuring user acquisition metrics. Experienced with CRM hubs and analytics platforms.

CORE CAPABILITIES
- Strategy: Brand positioning, pricing plans, competitor analysis, Go-To-Market execution
- Growth: Google Ads, LinkedIn Campaign Manager, Email marketing
- Analytics: Google Analytics, HubSpot, Salesforce, Mixpanel, Excel cohort reporting
- Creative: Copywriting, presentation deck designs, case studies, video scripts
- Experience: 5 years in B2B SaaS

EXPERIENCE
Senior Product Marketing Manager | CloudScale Systems
August 2022 – Present
- Coordinated the Go-To-Market strategy for two core cloud resource analytics features, generating $2.5M in pipeline value in 6 months.
- Managed paid acquisition campaigns across LinkedIn and Google, executing a monthly budget of $15k with a 25% reduction in Customer Acquisition Cost (CAC).
- Wrote and edited over 30 customer assets, including pitch decks, case studies, blog summaries, and enterprise whitepapers.
- Monitored Mixpanel and HubSpot cohorts to track customer churn and report key SaaS metrics (LTV, CAC, MRR) to the VP of Marketing.

Product Marketing Manager | SyncHub SaaS
October 2020 – July 2022
- Conducted competitor research audits and compiled quarterly intelligence briefs for sales teams.
- Collaborated with product leads to align product feature release emails and landing page copies.
- Set up automated email nurture funnels in HubSpot, increasing registration conversion by 18%.

EDUCATION & DEGREES
Bachelor of Arts in Communications
New York University | Graduated 2020`
  },

  evaluations: {
    "frontend-eng_frontend-eng-match": {
      "overall_score": 88,
      "qualification_level": "Strong Match",
      "skills_match": 90,
      "experience_match": 85,
      "tools_match": 92,
      "leadership_match": 75,
      "education_match": 80,
      "domain_match": 88,
      "keyword_match": 84,
      "gaps": {
        "critical": ["Missing experience with automated end-to-end Cypress flows. Cypress is specifically requested in the Job Description for automated frontend testing."],
        "important": ["Missing Server-Side Rendering (SSR) credentials. The job requires Next.js App Router/Server Actions experience; candidate specializes strictly in client-side architectures."],
        "nice": ["No background scaling custom design systems. The preferred qualifications highlight shared token library architectures."]
      },
      "mappings": [
        {
          "resumeId": "RES-C3",
          "jdId": "JD-C2",
          "score": 92,
          "reason": "Strong alignment around Vite migration, building glassmorphic component libraries, and transitioning legacy bundlers (Webpack).",
          "missing": "Cypress E2E Testing, Webpack backward compatibilities",
          "severity": "low"
        },
        {
          "resumeId": "RES-C4",
          "jdId": "JD-C3",
          "score": 85,
          "reason": "Strong performance achievements modifying Core Web Vitals (LCP reduced from 3.8s to 1.8s) matching the JD dashboard optimization duty.",
          "missing": "INP fine-tuning parameters",
          "severity": "low"
        },
        {
          "resumeId": "RES-C1",
          "jdId": "JD-C1",
          "score": 68,
          "reason": "React Hooks and state stores (Zustand, Redux) are identical. However, Next.js App Router and Server Actions are missing.",
          "missing": "Next.js App Router, SSR frameworks",
          "severity": "medium"
        }
      ],
      "debugger": [
        {
          "current": "Collaborated closely with designers using Figma to implement layouts.",
          "suggested": "Partnered with design teams in Figma to extract design tokens, establishing a glassmorphic shared React component catalog that reduced UX latency by 65%.",
          "reason": "Adds measurable metric outcomes and highlights figma-to-code component token systems requested in preferred specs."
        },
        {
          "current": "Wrote extensive unit tests using Jest.",
          "suggested": "Authored comprehensive unit suites using Jest and React Testing Library, achieving 90% flow coverage, while designing E2E mock suites.",
          "reason": "Bridges the gap closer to the automated E2E testing focus requested in the JD."
        }
      ],
      "summary": "Alex Rivera represents a strong developer fit (88% Match). They bring elite performance credentials (Webpack to Vite migration, LCP optimization) and deep React library competence. The primary gaps are Next.js/SSR engineering and E2E test suites (Cypress), which are bridgeable with basic onboarding."
    },

    "data-scientist_data-scientist-match": {
      "overall_score": 95,
      "qualification_level": "Excellent Match",
      "skills_match": 98,
      "experience_match": 94,
      "tools_match": 96,
      "leadership_match": 90,
      "education_match": 100,
      "domain_match": 92,
      "keyword_match": 95,
      "gaps": {
        "critical": [],
        "important": ["Lacks explicit commercial description of Graph Neural Networks (GNNs). Candidate researched graph alignments but has not detailed production implementations."],
        "nice": ["Details regarding NeurIPS/ICML publications are brief. The job prefers showing these titles in full."]
      },
      "mappings": [
        {
          "resumeId": "RES-C2",
          "jdId": "JD-C1",
          "score": 98,
          "reason": "Candidate holds a Stanford PhD specializing in NLP and Deep Learning, exceeding standard math and statistic criteria.",
          "missing": "None",
          "severity": "low"
        },
        {
          "resumeId": "RES-C3",
          "jdId": "JD-C2",
          "score": 95,
          "reason": "Direct experience building vector databases (Pinecone, ChromaDB) and BERT/LLM embedding retrieval architectures.",
          "missing": "Milvus Vector DB",
          "severity": "low"
        },
        {
          "resumeId": "RES-C4",
          "jdId": "JD-C3",
          "score": 92,
          "reason": "Production pipeline deployments using SQL, MLflow, and Dockerized endpoints fit the MLOps pipelines criteria.",
          "missing": "AWS SageMaker automated deployment scripts",
          "severity": "low"
        }
      ],
      "debugger": [
        {
          "current": "Researched and trained Graph Neural Networks for knowledge graphs.",
          "suggested": "Designed and deployed graph neural networks (GNNs) for enterprise knowledge graph alignment, enabling 30% faster semantic search connections in catalog engines.",
          "reason": "Quantifies the GNN research into a production success impact statement."
        }
      ],
      "summary": "Dr. Elena Rostova is an outstanding candidate (95% Match). She brings advanced PhD academic credits, direct experience building NLP search retrieval (Chroma/Pinecone), and Dockerized Python pipeline experience. The fit is perfect for the Lead ML role."
    },

    "marketing-mgr_marketing-mgr-match": {
      "overall_score": 64,
      "qualification_level": "Partial Match",
      "skills_match": 70,
      "experience_match": 60,
      "tools_match": 75,
      "leadership_match": 50,
      "education_match": 80,
      "domain_match": 62,
      "keyword_match": 66,
      "gaps": {
        "critical": ["Missing experience managing and scaling marketing teams (3+ direct reports). The resume lacks people leadership metrics.", "Insufficient overall experience (5 years vs 8+ years required)."],
        "important": ["Missing enterprise SaaS paid campaign budgets over $50k/month. Candidate managed smaller budgets ($15k/month)."],
        "nice": ["Does not hold an MBA degree (preferred qualification)."]
      },
      "mappings": [
        {
          "resumeId": "RES-C2",
          "jdId": "JD-C1",
          "score": 75,
          "reason": "B2B SaaS product positioning matches GTM requirements. However, candidate is junior (5 years experience) for a Director title.",
          "missing": "Global GTM launches leading team, 3+ years experience",
          "severity": "high"
        },
        {
          "resumeId": "RES-C3",
          "jdId": "JD-C3",
          "score": 70,
          "reason": "Familiarity with HubSpot, CRM campaigns, and basic Google Analytics. However, budget scale is small.",
          "missing": "Budget management >$50k/month",
          "severity": "medium"
        }
      ],
      "debugger": [
        {
          "current": "Coordinated features launch, generating $2.5M in pipeline value.",
          "suggested": "Directly led Go-To-Market launches for two enterprise SaaS analytics products, establishing cross-departmental alignment and driving $2.5M pipeline within 6 months.",
          "reason": "Upgrades 'coordinated' to 'led' to demonstrate leadership potential, matching the director-level requirements."
        }
      ],
      "summary": "Taylor Vance is a Partial Match (64%). They display high SaaS metric competency and writing skills, but fall short on required years of experience (5 vs 8+) and team management. They represent an excellent fit for a Senior Manager role."
    }
  }
};


// ==========================================================================
// Application Core Logic & State Management
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Global State
  const state = {
    apiKey: localStorage.getItem("ats_api_key") || localStorage.getItem("gemini_api_key") || "",
    apiProvider: localStorage.getItem("ats_api_provider") || "gemini",
    apiBaseUrl: localStorage.getItem("ats_api_base_url") || "https://generativelanguage.googleapis.com/v1beta",
    apiModel: localStorage.getItem("ats_api_model") || "gemini-2.5-flash",
    jdText: "",
    resumeText: "",
    selectedFile: null,
    activeTab: "inputs",
    resumeChunks: [], // array of { id, text, section, charCount, tokenCount }
    jdChunks: [],     // array of { id, text, section, charCount, tokenCount }
    mappings: [],     // array of { resumeId, jdId, score, reason, missing, severity }
    evaluation: null, // AI evaluation stats
    
    // Chunking Settings
    strategy: "section",
    chunkSize: 500,
    overlapPercent: 20,
    semanticThreshold: 0.65,
    mergeSmall: true,
    preserveHeaders: true,
    minChunkLength: 25,
    similarityMethod: "ai-judge",
    isDashboardStale: false
  };

  // PROVIDER DEFAULTS
  const PROVIDER_DEFAULTS = {
    gemini: {
      baseUrl: "https://generativelanguage.googleapis.com/v1beta",
      model: "gemini-2.5-flash"
    },
    openai: {
      baseUrl: "https://api.openai.com/v1",
      model: "gpt-4o"
    },
    claude: {
      baseUrl: "https://api.anthropic.com/v1",
      model: "claude-3-5-sonnet-20241022"
    },
    openrouter: {
      baseUrl: "https://openrouter.ai/api/v1",
      model: "google/gemini-2.5-flash"
    },
    kimi: {
      baseUrl: "https://api.moonshot.cn/v1",
      model: "moonshot-v1-8k"
    },
    custom: {
      baseUrl: "http://localhost:11434/v1",
      model: "llama3"
    }
  };

  // DOM Elements - API Config
  const btnShowApiSettings = document.getElementById("btn-show-api-settings");
  const apiConfigDrawer = document.getElementById("api-config-drawer");
  const btnCloseApi = document.getElementById("btn-close-api");
  const activeProviderBadge = document.getElementById("active-provider-badge");
  const apiProviderSelect = document.getElementById("api-provider-select");
  const apiKeyInput = document.getElementById("api-key-input");
  const apiBaseUrlInput = document.getElementById("api-base-url-input");
  const apiModelInput = document.getElementById("api-model-input");
  const corsNotice = document.getElementById("cors-notice");
  const btnTogglePassword = document.getElementById("btn-toggle-password");
  const eyeIcon = document.getElementById("eye-icon");
  const btnSaveApi = document.getElementById("btn-save-api");
  const btnClearApi = document.getElementById("btn-clear-api");
  const apiFeedbackMsg = document.getElementById("api-feedback-msg");

  // DOM Elements - Sidebar Controls
  const chunkStrategySelect = document.getElementById("chunk-strategy-select");
  const controlChunkSize = document.getElementById("control-chunk-size");
  const chunkSizeSlider = document.getElementById("chunk-size-slider");
  const chunkSizeValue = document.getElementById("chunk-size-value");
  const controlChunkOverlap = document.getElementById("control-chunk-overlap");
  const chunkOverlapSlider = document.getElementById("chunk-overlap-slider");
  const chunkOverlapValue = document.getElementById("chunk-overlap-value");
  const controlSemanticThreshold = document.getElementById("control-semantic-threshold");
  const semanticThresholdSlider = document.getElementById("semantic-threshold-slider");
  const semanticThresholdValue = document.getElementById("semantic-threshold-value");
  const chkMergeSmall = document.getElementById("chk-merge-small");
  const chkPreserveHeaders = document.getElementById("chk-preserve-headers");
  const inputMinChunk = document.getElementById("input-min-chunk");
  const matchMethodSelect = document.getElementById("match-method-select");

  // DOM Elements - Inputs
  const sampleJdSelect = document.getElementById("sample-jd-select");
  const jdTextInput = document.getElementById("jd-text-input");
  const sampleResumeSelect = document.getElementById("sample-resume-select");
  const resumeTextInput = document.getElementById("resume-text-input");
  const dropZone = document.getElementById("drop-zone");
  const resumeFileInput = document.getElementById("resume-file-input");
  const fileStatusIndicator = document.getElementById("file-status-indicator");
  const fileStatusText = document.getElementById("file-status-text");
  const btnRemoveFile = document.getElementById("btn-remove-file");
  const btnCompare = document.getElementById("btn-compare");

  // DOM Elements - Playground & Stats
  const statResumeChunks = document.getElementById("stat-resume-chunks");
  const statJdChunks = document.getElementById("stat-jd-chunks");
  const statAvgSize = document.getElementById("stat-avg-size");
  const statCoverage = document.getElementById("stat-coverage");
  const statOverlapRate = document.getElementById("stat-overlap-rate");
  const resumeChunksList = document.getElementById("resume-chunks-list");
  const jdChunksList = document.getElementById("jd-chunks-list");
  const btnAddResumeChunk = document.getElementById("btn-add-resume-chunk");
  const btnAddJdChunk = document.getElementById("btn-add-jd-chunk");

  // DOM Elements - Dashboard
  const winScoreNumber = document.getElementById("win-score-number");
  const winScoreLabel = document.getElementById("win-score-label");
  const winGaugeProgress = document.getElementById("win-gauge-progress");
  const valSkillsMatch = document.getElementById("val-skills-match");
  const barSkillsMatch = document.getElementById("bar-skills-match");
  const valExperienceMatch = document.getElementById("val-experience-match");
  const barExperienceMatch = document.getElementById("bar-experience-match");
  const valToolsMatch = document.getElementById("val-tools-match");
  const barToolsMatch = document.getElementById("bar-tools-match");
  const valLeadershipMatch = document.getElementById("val-leadership-match");
  const barLeadershipMatch = document.getElementById("bar-leadership-match");
  const valEducationMatch = document.getElementById("val-education-match");
  const barEducationMatch = document.getElementById("bar-education-match");
  const valDomainMatch = document.getElementById("val-domain-match");
  const barDomainMatch = document.getElementById("bar-domain-match");
  const valKeywordMatch = document.getElementById("val-keyword-match");
  const barKeywordMatch = document.getElementById("bar-keyword-match");
  const listGapsCritical = document.getElementById("list-gaps-critical");
  const listGapsImportant = document.getElementById("list-gaps-important");
  const listGapsNice = document.getElementById("list-gaps-nice");
  const dashboardSummaryText = document.getElementById("dashboard-summary-text");

  // DOM Elements - Matrix
  const matrixMappingsList = document.getElementById("matrix-mappings-list");
  const matrixDetailsCard = document.getElementById("matrix-details-card");
  const matrixDetailsFallback = document.getElementById("matrix-details-fallback");
  const inspectSimilarityBadge = document.getElementById("inspect-similarity-badge");
  const inspectResumeContent = document.getElementById("inspect-resume-content");
  const inspectJdContent = document.getElementById("inspect-jd-content");
  const inspectMatchReason = document.getElementById("inspect-match-reason");
  const inspectMissingItems = document.getElementById("inspect-missing-items");
  const inspectSeverityLabel = document.getElementById("inspect-severity-label");

  // DOM Elements - Debugger
  const debuggerTableBody = document.getElementById("debugger-table-body");
  const btnPrintDebugger = document.getElementById("btn-print-debugger");
  const printTimestamp = document.getElementById("print-timestamp");
  const printMainContent = document.getElementById("print-main-content");

  // DOM Elements - Scanner Dialog
  const scannerSection = document.getElementById("scanner-section");
  const scannerTitle = document.getElementById("scanner-title");
  const scannerDesc = document.getElementById("scanner-desc");
  const scanProgressBar = document.getElementById("scan-progress-bar");


  // ==========================================================================
  // Initialization & Sidebar controls
  // ==========================================================================

  function initializeApiState() {
    apiProviderSelect.value = state.apiProvider;
    apiKeyInput.value = state.apiKey;
    apiBaseUrlInput.value = state.apiBaseUrl;
    apiModelInput.value = state.apiModel;

    if (state.apiProvider === "custom" || state.apiProvider === "openrouter" || state.apiProvider === "kimi") {
      apiBaseUrlInput.removeAttribute("readonly");
    } else {
      apiBaseUrlInput.setAttribute("readonly", "true");
    }

    if (state.apiProvider === "openai" || state.apiProvider === "claude") {
      corsNotice.classList.remove("hidden");
    } else {
      corsNotice.classList.add("hidden");
    }

    if (state.apiKey) {
      activeProviderBadge.textContent = `${state.apiProvider.toUpperCase()} Active`;
      activeProviderBadge.className = "badge badge-active";
    } else {
      activeProviderBadge.textContent = "Demo Mode";
      activeProviderBadge.className = "badge badge-demo";
    }
  }
  initializeApiState();

  // Show/Hide Settings drawer
  btnShowApiSettings.addEventListener("click", () => apiConfigDrawer.classList.toggle("hidden"));
  btnCloseApi.addEventListener("click", () => apiConfigDrawer.classList.add("hidden"));

  // Toggle Masking
  btnTogglePassword.addEventListener("click", () => {
    if (apiKeyInput.type === "password") {
      apiKeyInput.type = "text";
      eyeIcon.setAttribute("data-lucide", "eye-off");
    } else {
      apiKeyInput.type = "password";
      eyeIcon.setAttribute("data-lucide", "eye");
    }
    if (window.lucide) lucide.createIcons();
  });

  // Save Settings
  btnSaveApi.addEventListener("click", () => {
    const key = apiKeyInput.value.trim();
    const provider = apiProviderSelect.value;
    const url = apiBaseUrlInput.value.trim();
    const model = apiModelInput.value.trim();

    if (!key) {
      showApiFeedback("Please enter an API Key.", "error");
      return;
    }
    state.apiKey = key;
    state.apiProvider = provider;
    state.apiBaseUrl = url;
    state.apiModel = model;

    localStorage.setItem("ats_api_key", key);
    localStorage.setItem("ats_api_provider", provider);
    localStorage.setItem("ats_api_base_url", url);
    localStorage.setItem("ats_api_model", model);

    initializeApiState();
    showApiFeedback("Credentials updated.", "success");
    setTimeout(() => {
      apiConfigDrawer.classList.add("hidden");
      apiFeedbackMsg.classList.add("hidden");
    }, 1200);
  });

  // Reset API defaults
  btnClearApi.addEventListener("click", () => {
    state.apiKey = "";
    state.apiProvider = "gemini";
    state.apiBaseUrl = PROVIDER_DEFAULTS.gemini.baseUrl;
    state.apiModel = PROVIDER_DEFAULTS.gemini.model;

    localStorage.removeItem("ats_api_key");
    localStorage.removeItem("ats_api_provider");
    localStorage.removeItem("ats_api_base_url");
    localStorage.removeItem("ats_api_model");
    localStorage.removeItem("gemini_api_key");

    initializeApiState();
    showApiFeedback("Settings reset.", "success");
  });

  function showApiFeedback(msg, type) {
    apiFeedbackMsg.textContent = msg;
    apiFeedbackMsg.className = `api-feedback ${type}`;
    apiFeedbackMsg.classList.remove("hidden");
  }

  // Provider Dropdown selection change
  apiProviderSelect.addEventListener("change", (e) => {
    const prov = e.target.value;
    const defaults = PROVIDER_DEFAULTS[prov];
    apiBaseUrlInput.value = defaults.baseUrl;
    apiModelInput.value = defaults.model;

    if (prov === "custom" || prov === "openrouter" || prov === "kimi") {
      apiBaseUrlInput.removeAttribute("readonly");
    } else {
      apiBaseUrlInput.setAttribute("readonly", "true");
    }

    if (prov === "openai" || prov === "claude") {
      corsNotice.classList.remove("hidden");
    } else {
      corsNotice.classList.add("hidden");
    }
  });

  // Sidebar chunk adjustments
  chunkStrategySelect.addEventListener("change", (e) => {
    const strat = e.target.value;
    state.strategy = strat;
    
    // Show/hide relevant sliders
    controlChunkSize.classList.add("hidden");
    controlChunkOverlap.classList.add("hidden");
    controlSemanticThreshold.classList.add("hidden");

    if (["fixed", "token", "hybrid"].includes(strat)) {
      controlChunkSize.classList.remove("hidden");
      controlChunkOverlap.classList.remove("hidden");
      
      if (strat === "token") {
        chunkSizeSlider.min = 50;
        chunkSizeSlider.max = 500;
        chunkSizeSlider.step = 25;
        if (state.chunkSize > 500) state.chunkSize = 250;
        chunkSizeSlider.value = state.chunkSize;
        chunkSizeValue.textContent = `${state.chunkSize} tokens`;
      } else {
        chunkSizeSlider.min = 100;
        chunkSizeSlider.max = 1500;
        chunkSizeSlider.step = 50;
        chunkSizeSlider.value = state.chunkSize;
        chunkSizeValue.textContent = `${state.chunkSize} chars`;
      }
    } else if (strat === "semantic") {
      controlSemanticThreshold.classList.remove("hidden");
    }

    // Trigger instant re-chunking if content is loaded
    if (state.jdText || state.resumeText) {
      runChunkingEngine(false);
    }
  });

  chunkSizeSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    state.chunkSize = val;
    chunkSizeValue.textContent = state.strategy === "token" ? `${val} tokens` : `${val} chars`;
    debounceRechunk();
  });

  chunkOverlapSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    state.overlapPercent = val;
    chunkOverlapValue.textContent = `${val}%`;
    debounceRechunk();
  });

  semanticThresholdSlider.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    state.semanticThreshold = val;
    semanticThresholdValue.textContent = val.toFixed(2);
    debounceRechunk();
  });

  chkMergeSmall.addEventListener("change", (e) => {
    state.mergeSmall = e.target.checked;
    runChunkingEngine(false);
  });

  chkPreserveHeaders.addEventListener("change", (e) => {
    state.preserveHeaders = e.target.checked;
    runChunkingEngine(false);
  });

  inputMinChunk.addEventListener("input", (e) => {
    state.minChunkLength = parseInt(e.target.value) || 10;
    debounceRechunk();
  });

  matchMethodSelect.addEventListener("change", (e) => {
    state.similarityMethod = e.target.value;
    if (state.jdChunks.length > 0) {
      runLocalSimilarityMatching();
    }
  });

  let debounceTimer;
  function debounceRechunk() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (state.jdText || state.resumeText) {
        runChunkingEngine(false);
      }
    }, 400);
  }

  // ==========================================================================
  // Document inputs and dropdowns
  // ==========================================================================

  sampleJdSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val && SAMPLES.jds[val]) {
      jdTextInput.value = SAMPLES.jds[val];
    } else {
      jdTextInput.value = "";
    }
    validateInputs();
  });

  sampleResumeSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val && SAMPLES.resumes[val]) {
      clearSelectedFile();
      resumeTextInput.value = SAMPLES.resumes[val];
    } else {
      resumeTextInput.value = "";
    }
    validateInputs();
  });

  jdTextInput.addEventListener("input", validateInputs);
  resumeTextInput.addEventListener("input", validateInputs);

  function validateInputs() {
    const hasJd = jdTextInput.value.trim().length > 30;
    const hasResume = resumeTextInput.value.trim().length > 30 || state.selectedFile !== null;
    btnCompare.disabled = !(hasJd && hasResume);
  }

  // File Upload drag/drop handlers
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelected(files[0]);
  });

  resumeFileInput.addEventListener("change", (e) => {
    const files = e.target.files;
    if (files.length > 0) handleFileSelected(files[0]);
  });

  function handleFileSelected(file) {
    const extension = file.name.split(".").pop().toLowerCase();
    if (!["pdf", "docx", "txt"].includes(extension)) {
      alert("Unsupported file format. Please upload a PDF, DOCX, or TXT document.");
      return;
    }
    state.selectedFile = file;
    fileStatusText.textContent = `Selected: ${file.name}`;
    fileStatusIndicator.classList.remove("hidden");
    
    sampleResumeSelect.value = "";
    resumeTextInput.value = "";
    resumeTextInput.placeholder = "Resume file loaded. Paste input disabled.";
    resumeTextInput.disabled = true;
    validateInputs();
  }

  function clearSelectedFile() {
    state.selectedFile = null;
    resumeFileInput.value = "";
    fileStatusIndicator.classList.add("hidden");
    resumeTextInput.disabled = false;
    resumeTextInput.placeholder = "Or paste the raw text content of the resume here...";
    validateInputs();
  }

  btnRemoveFile.addEventListener("click", (e) => {
    e.stopPropagation();
    clearSelectedFile();
  });

  // Client-side text extraction buffers
  async function parseFileText(file) {
    const ext = file.name.split(".").pop().toLowerCase();
    
    if (ext === "txt") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (err) => reject(err);
        reader.readAsText(file);
      });
    }
    
    if (ext === "docx") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
            resolve(result.value);
          } catch (err) { reject(err); }
        };
        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
      });
    }
    
    if (ext === "pdf") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const pdf = await pdfjsLib.getDocument({ data: e.target.result }).promise;
            let fullText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map(item => item.str).join(" ");
              fullText += pageText + "\n";
            }
            resolve(fullText);
          } catch (err) { reject(err); }
        };
        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
      });
    }
    return "";
  }

  // ==========================================================================
  // Chunking Algorithms
  // ==========================================================================

  function runChunkingEngine(showOverlay = true) {
    state.jdText = jdTextInput.value.trim();
    if (!state.selectedFile) {
      state.resumeText = resumeTextInput.value.trim();
    }

    if (showOverlay) {
      scannerSection.classList.remove("hidden");
      updateScannerState("Splitting documents into chunks...", "Running strategies and filtering thresholds.", 20);
      state.isDashboardStale = false;
    } else {
      if (state.similarityMethod === "ai-judge") {
        state.isDashboardStale = true;
      }
    }

    const jdRawChunks = splitTextByStrategy(state.jdText, false);
    const resumeRawChunks = splitTextByStrategy(state.resumeText, true);

    // Map into state structures
    state.jdChunks = jdRawChunks.map((c, index) => ({
      id: `JD-${index + 1}`,
      text: c.text,
      section: c.section || "General",
      charCount: c.text.length,
      tokenCount: Math.round(c.text.split(/\s+/).length * 1.3)
    }));

    state.resumeChunks = resumeRawChunks.map((c, index) => ({
      id: `RES-${index + 1}`,
      text: c.text,
      section: c.section || "General",
      charCount: c.text.length,
      tokenCount: Math.round(c.text.split(/\s+/).length * 1.3)
    }));

    // Post processing - merge small chunks
    if (state.mergeSmall) {
      mergeSmallChunks(state.jdChunks);
      mergeSmallChunks(state.resumeChunks);
    }

    // Refresh Chunking Statistics
    renderPlaygroundStats();
    renderChunksExplorer();

    if (showOverlay) {
      updateScannerState("Running similarity mappings...", "Checking index vectors.", 60);
    }

    // Calculate Similarity Matrix
    runLocalSimilarityMatching();
  }

  function splitTextByStrategy(text, isResume) {
    const strat = state.strategy;
    let rawList = [];

    if (strat === "fixed") {
      const fixedTexts = chunkFixed(text, state.chunkSize, state.overlapPercent);
      rawList = fixedTexts.map(t => ({ text: t, section: "Paragraph Block" }));
    } else if (strat === "paragraph") {
      const paras = text.split(/\n\s*\n+/).map(p => p.trim()).filter(p => p.length > 5);
      rawList = paras.map(p => ({ text: p, section: "Paragraph" }));
    } else if (strat === "sentence") {
      const sents = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
      rawList = sents.map(s => s.trim()).filter(s => s.length > 5).map(s => ({ text: s, section: "Sentence" }));
    } else if (strat === "token") {
      const tokenTexts = chunkTokens(text, state.chunkSize, state.overlapPercent);
      rawList = tokenTexts.map(t => ({ text: t, section: "Token Block" }));
    } else if (strat === "semantic") {
      const semTexts = chunkSemantic(text, state.semanticThreshold);
      rawList = semTexts.map(t => ({ text: t, section: "Semantic Cluster" }));
    } else if (strat === "hybrid") {
      rawList = chunkHybrid(text, state.chunkSize, state.overlapPercent, isResume);
    } else {
      // DEFAULT: section-based chunking
      rawList = chunkSections(text, isResume);
    }

    return rawList.filter(item => item.text.length >= state.minChunkLength);
  }

  // 1. Fixed Character Chunking
  function chunkFixed(text, size, overlapPercent) {
    const chunks = [];
    const step = size - Math.floor(size * (overlapPercent / 100));
    let i = 0;
    while (i < text.length) {
      let chunkText = text.substring(i, i + size);
      if (chunkText.trim().length > 5) {
        chunks.push(chunkText.trim());
      }
      i += step;
      if (step <= 0) break; // prevent infinite loops
    }
    return chunks;
  }

  // 2. Token Chunking (Word Count Approximator)
  function chunkTokens(text, limit, overlapPercent) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordLimit = Math.floor(limit / 1.3);
    const overlapWords = Math.floor(wordLimit * (overlapPercent / 100));
    const chunks = [];
    const step = Math.max(1, wordLimit - overlapWords);
    
    let i = 0;
    while (i < words.length) {
      let chunkWords = words.slice(i, i + wordLimit);
      if (chunkWords.length > 0) {
        chunks.push(chunkWords.join(" "));
      }
      i += step;
    }
    return chunks;
  }

  // 3. Semantic Splitting via vocabulary Jaccard shift
  function chunkSemantic(text, threshold) {
    const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
    const chunks = [];
    let currentChunk = [];

    for (let i = 0; i < sentences.length; i++) {
      const sent = sentences[i].trim();
      if (!sent) continue;

      if (currentChunk.length === 0) {
        currentChunk.push(sent);
      } else {
        const words1 = tokenize(currentChunk.join(" "));
        const words2 = tokenize(sent);
        
        const set1 = new Set(words1);
        const set2 = new Set(words2);
        
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        const union = new Set([...set1, ...set2]);
        const jaccard = union.size > 0 ? intersection.size / union.size : 0;
        
        // boundary detected if similarity is lower than semantic gap setting
        if (jaccard < (1 - threshold) && currentChunk.join(" ").length >= 100) {
          chunks.push(currentChunk.join(" "));
          currentChunk = [sent];
        } else {
          currentChunk.push(sent);
        }
      }
    }
    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(" "));
    }
    return chunks;
  }

  // 4. Section Based Chunking
  function chunkSections(text, isResume) {
    const sections = [];
    let sectionRegexes = [];

    if (isResume) {
      sectionRegexes = [
        { label: "Summary", regex: /^(summary|profile|objective|about\s+me)/i },
        { label: "Experience", regex: /^(experience|employment|work\s+history|history|professional\s+background)/i },
        { label: "Skills", regex: /^(skills|technologies|proficiencies|technical\s+skills|expertise)/i },
        { label: "Projects", regex: /^(projects|personal\s+projects|portfolio)/i },
        { label: "Education", regex: /^(education|academics|academic\s+history)/i },
        { label: "Certifications", regex: /^(certifications|licenses|courses)/i },
        { label: "Achievements", regex: /^(achievements|awards|accomplishments)/i }
      ];
    } else {
      sectionRegexes = [
        { label: "Company Info", regex: /^(company|about\s+us|organization|who\s+we\s+are)/i },
        { label: "Responsibilities", regex: /^(responsibilities|key\s+responsibilities|duties|what\s+you\s+will\s+do)/i },
        { label: "Requirements", regex: /^(requirements|qualifications|what\s+you\s+need|skills\s+required|must\s+have)/i },
        { label: "Preferred Qualifications", regex: /^(preferred|bonus|nice\s+to\s+have|preferred\s+skills)/i },
        { label: "Benefits", regex: /^(benefits|perks|compensation|what\s+we\s+offer)/i }
      ];
    }

    const lines = text.split("\n");
    let currentSection = "General";
    let currentBuffer = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      let matched = false;
      // Section header rule: short line matching section keywords
      if (trimmed.length < 55) {
        for (let rule of sectionRegexes) {
          if (rule.regex.test(trimmed)) {
            // Flush previous
            if (currentBuffer.length > 0) {
              sections.push({ section: currentSection, text: currentBuffer.join("\n").trim() });
            }
            currentSection = rule.label;
            currentBuffer = [];
            matched = true;
            
            if (state.preserveHeaders) {
              currentBuffer.push(line);
            }
            break;
          }
        }
      }
      if (!matched) {
        currentBuffer.push(line);
      }
    }
    
    // Flush last block
    if (currentBuffer.length > 0) {
      sections.push({ section: currentSection, text: currentBuffer.join("\n").trim() });
    }

    return sections;
  }

  // 5. Hybrid Chunking
  function chunkHybrid(text, size, overlap, isResume) {
    const sections = chunkSections(text, isResume);
    const result = [];
    sections.forEach(sec => {
      const sub = chunkFixed(sec.text, size, overlap);
      sub.forEach(t => {
        result.push({ text: t, section: sec.section });
      });
    });
    return result;
  }

  // Merger logic
  function mergeSmallChunks(chunksArray) {
    const minLength = state.minChunkLength * 2;
    for (let i = 0; i < chunksArray.length - 1; i++) {
      if (chunksArray[i].text.length < minLength) {
        chunksArray[i].text += "\n" + chunksArray[i + 1].text;
        chunksArray[i].charCount = chunksArray[i].text.length;
        chunksArray[i].tokenCount = Math.round(chunksArray[i].text.split(/\s+/).length * 1.3);
        chunksArray.splice(i + 1, 1);
        i--; // re-inspect current merged chunk
      }
    }
  }

  // ==========================================================================
  // Local Similarity & Vector Engine (TF-IDF & Jaccard)
  // ==========================================================================

  function runLocalSimilarityMatching() {
    if (state.jdChunks.length === 0 || state.resumeChunks.length === 0) return;

    // Combine all chunks to build Document Frequencies
    const allChunks = [...state.jdChunks, ...state.resumeChunks];
    const totalDocs = allChunks.length;
    
    // Compute Document Frequency (DF) of all words
    const dfMap = {};
    allChunks.forEach(chunk => {
      const words = tokenize(chunk.text);
      const uniqueWords = new Set(words);
      uniqueWords.forEach(w => {
        dfMap[w] = (dfMap[w] || 0) + 1;
      });
    });

    // Compute IDF vector
    const idfMap = {};
    for (let word in dfMap) {
      idfMap[word] = Math.log(totalDocs / (dfMap[word] + 1)) + 1;
    }

    // Helper: Compute TF-IDF vector for a chunk
    function getTFIDFVector(text) {
      const words = tokenize(text);
      const tfMap = {};
      words.forEach(w => {
        tfMap[w] = (tfMap[w] || 0) + 1;
      });

      const vector = {};
      const maxTf = Math.max(...Object.values(tfMap), 1);
      for (let word in tfMap) {
        const tf = tfMap[word] / maxTf;
        const idf = idfMap[word] || 0;
        vector[word] = tf * idf;
      }
      return vector;
    }

    // Helper: Cosine Similarity between vectors
    function cosineSimilarity(v1, v2) {
      let dot = 0;
      let mag1 = 0;
      let mag2 = 0;

      for (let w in v1) {
        dot += v1[w] * (v2[w] || 0);
        mag1 += v1[w] * v1[w];
      }
      for (let w in v2) {
        mag2 += v2[w] * v2[w];
      }

      const mag = Math.sqrt(mag1) * Math.sqrt(mag2);
      return mag > 0 ? dot / mag : 0;
    }

    // Run mapping matching between Resume and JD chunks
    state.mappings = [];

    state.resumeChunks.forEach(resChunk => {
      const resVec = getTFIDFVector(resChunk.text);
      let bestMatch = null;
      let bestScore = 0;

      state.jdChunks.forEach(jdChunk => {
        const jdVec = getTFIDFVector(jdChunk.text);
        let score = 0;

        if (state.similarityMethod === "tfidf") {
          // Simple Jaccard overlap
          const set1 = new Set(tokenize(resChunk.text));
          const set2 = new Set(tokenize(jdChunk.text));
          const inter = new Set([...set1].filter(x => set2.has(x)));
          const union = new Set([...set1, ...set2]);
          score = union.size > 0 ? inter.size / union.size : 0;
        } else {
          // Cosine Vector Similarity
          score = cosineSimilarity(resVec, jdVec);
        }

        if (score > bestScore) {
          bestScore = score;
          bestMatch = jdChunk;
        }
      });

      // Map if there is a semantic match above threshold
      const scorePct = Math.round(bestScore * 100);
      if (bestMatch && scorePct > 15) {
        const missingWords = findMissingKeywordsLocal(resChunk.text, bestMatch.text);
        state.mappings.push({
          resumeId: resChunk.id,
          jdId: bestMatch.id,
          score: scorePct,
          reason: `Found keyword correlations on overlapping vocabulary terms: ${intersectKeywords(resChunk.text, bestMatch.text).slice(0, 5).join(", ")}.`,
          missing: missingWords.slice(0, 4).join(", ") || "None",
          severity: scorePct > 70 ? "low" : (scorePct > 45 ? "medium" : "high")
        });
      }
    });

    // If similarityMethod is local, we also update the overall dashboard scores locally!
    if (state.similarityMethod !== "ai-judge") {
      updateDashboardStatsLocally();
    }
  }

  function intersectKeywords(text1, text2) {
    const s1 = new Set(tokenize(text1));
    const s2 = new Set(tokenize(text2));
    return [...s1].filter(x => s2.has(x));
  }

  function findMissingKeywordsLocal(resText, jdText) {
    const s1 = new Set(tokenize(resText));
    const s2 = new Set(tokenize(jdText));
    // Keywords in JD missing in Resume
    return [...s2].filter(x => !s1.has(x));
  }

  function updateDashboardStatsLocally() {
    if (state.mappings.length === 0) return;
    
    // Average mapping score
    const totalMappingScore = state.mappings.reduce((acc, m) => acc + m.score, 0);
    const avgScore = Math.round(totalMappingScore / state.mappings.length);

    const skillsScore = Math.min(100, Math.round(avgScore * 1.05));
    const expScore = Math.min(100, Math.round(avgScore * 0.98));
    const toolsScore = Math.min(100, Math.round(avgScore * 1.02));
    const leadScore = Math.min(100, Math.round(avgScore * 0.85));
    const eduScore = Math.min(100, Math.round(avgScore * 0.9));
    const domScore = Math.min(100, Math.round(avgScore * 0.88));
    const kwScore = Math.min(100, Math.round(avgScore * 0.95));

    // Simple local missing skills list based on keyword comparisons
    const jdKeywords = tokenize(state.jdText);
    const resKeywords = new Set(tokenize(state.resumeText));
    const missing = [...new Set(jdKeywords.filter(k => !resKeywords.has(k)))].slice(0, 10);
    
    const critical = missing.slice(0, 2).map(k => `Add direct usage of '${k}' tool requested heavily in requirements.`);
    const important = missing.slice(2, 5).map(k => `Mention experience involving '${k}' projects.`);
    const nice = missing.slice(5, 8).map(k => `Detail knowledge in '${k}' domain context.`);

    state.evaluation = {
      overall_score: avgScore,
      qualification_level: avgScore >= 90 ? "Excellent Match" : (avgScore >= 80 ? "Strong Match" : (avgScore >= 70 ? "Good Match" : (avgScore >= 60 ? "Partial Match" : "Weak Match"))),
      skills_match: skillsScore,
      experience_match: expScore,
      tools_match: toolsScore,
      leadership_match: leadScore,
      education_match: eduScore,
      domain_match: domScore,
      keyword_match: kwScore,
      gaps: {
        critical: critical,
        important: important,
        nice: nice
      },
      debugger: state.mappings.slice(0, 3).map(m => {
        const resChunk = state.resumeChunks.find(c => c.id === m.resumeId);
        const jdChunk = state.jdChunks.find(c => c.id === m.jdId);
        return {
          current: truncateString(resChunk?.text || "", 70),
          suggested: `Refactor statement to explicitly integrate keywords: ${m.missing}.`,
          reason: `Stronger match index with target JD requirement chunk (${m.jdId}).`
        };
      }),
      summary: `Local indexing analysis calculated a ${avgScore}% Match rating. Chunks show matching density patterns around shared vocabulary. Map inspection identifies missing terms which should be embedded into the resume.`
    };

    renderDashboard(state.evaluation);
  }

  function truncateString(str, len) {
    return str.length > len ? str.substring(0, len) + "..." : str;
  }

  // ==========================================================================
  // Compare trigger & LLM calls
  // ==========================================================================

  btnCompare.addEventListener("click", async () => {
    state.jdText = jdTextInput.value.trim();
    
    // Show spinner overlay
    scannerSection.classList.remove("hidden");
    updateScannerState("Extracting Documents...", "Checking local buffers and converting uploaded documents.", 15);
    
    try {
      if (state.selectedFile) {
        state.resumeText = await parseFileText(state.selectedFile);
      } else {
        state.resumeText = resumeTextInput.value.trim();
      }

      // Step 2: Split chunks
      runChunkingEngine(true);

      const mockKey = getMatchingMockKey();
      let evaluationData = null;

      if (!state.apiKey && mockKey) {
        updateScannerState("Retrieving Candidate Match (Demo Mode)...", "Executing alignment algorithms on sample.", 75);
        await delay(1200);
        evaluationData = SAMPLES.evaluations[mockKey];
      } else if (!state.apiKey) {
        alert("You are running in Demo Mode. To analyze custom inputs, please configure your preferred API Provider and enter your API Key in the settings panel.");
        scannerSection.classList.add("hidden");
        return;
      } else {
        // Run real AI Judge API Call
        updateScannerState(`Calling ${state.apiProvider.toUpperCase()} Judge Engine...`, `Analysing chunks and compiling structural alignment suggestion tables...`, 75);
        
        if (state.apiProvider === "gemini") {
          evaluationData = await callGeminiAPI(state.jdText, state.resumeText, state.apiKey, state.apiModel);
        } else if (state.apiProvider === "claude") {
          evaluationData = await callClaudeAPI(state.apiKey, state.apiBaseUrl, state.apiModel, state.jdText, state.resumeText);
        } else {
          evaluationData = await callOpenAICompatibleAPI(state.apiProvider, state.apiKey, state.apiBaseUrl, state.apiModel, state.jdText, state.resumeText);
        }
      }

      updateScannerState("Rendering workspace dashboard...", "Building matrix grid lines and suggestion charts.", 95);
      await delay(500);

      state.evaluation = evaluationData;
      
      // Override local mappings if the LLM provided structural mappings
      if (evaluationData.mappings && evaluationData.mappings.length > 0) {
        state.mappings = evaluationData.mappings;
      }

      // Render dashboard tabs
      renderDashboard(evaluationData);
      
      // Move to dashboard tab automatically
      switchTab("dashboard");
      
      // Close loader
      scannerSection.classList.add("hidden");

    } catch (err) {
      console.error(err);
      alert(`Match Engine Error: ${err.message || err}`);
      scannerSection.classList.add("hidden");
    }
  });

  function updateScannerState(title, desc, percent) {
    scannerTitle.textContent = title;
    scannerDesc.textContent = desc;
    scanProgressBar.style.width = `${percent}%`;
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getMatchingMockKey() {
    const selectedJd = sampleJdSelect.value;
    const selectedResume = sampleResumeSelect.value;
    
    if (selectedJd === "frontend-eng" && selectedResume === "frontend-eng-match") {
      return "frontend-eng_frontend-eng-match";
    }
    if (selectedJd === "data-scientist" && selectedResume === "data-scientist-match") {
      return "data-scientist_data-scientist-match";
    }
    if (selectedJd === "marketing-mgr" && selectedResume === "marketing-mgr-match") {
      return "marketing-mgr_marketing-mgr-match";
    }
    return null;
  }

  // Gemini API Caller
  async function callGeminiAPI(jd, resume, key, model) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    
    const requestBody = {
      systemInstruction: {
        parts: [
          {
            text: `You are an expert recruiter, hiring manager, and ATS evaluator.
Your task is to compare a candidate's resume against a job description and calculate how well the candidate qualifies for the role.
Analyze how specific parts (chunks) align. Focus on transparency, semantic mappings, and actionable recommendations.

Return ONLY a single valid JSON object following this JSON schema exactly:
{
  "overall_score": number (0-100),
  "qualification_level": string ("Excellent Match" | "Strong Match" | "Good Match" | "Partial Match" | "Weak Match"),
  "skills_match": number (0-100),
  "experience_match": number (0-100),
  "tools_match": number (0-100),
  "leadership_match": number (0-100),
  "education_match": number (0-100),
  "domain_match": number (0-100),
  "keyword_match": number (0-100),
  "gaps": {
    "critical": [string],
    "important": [string],
    "nice": [string]
  },
  "mappings": [
    {
      "resumeId": string (e.g. "RES-3" or "RES-C4"),
      "jdId": string (e.g. "JD-2" or "JD-C2"),
      "score": number (0-100),
      "reason": string,
      "missing": string,
      "severity": string ("low" | "medium" | "high")
    }
  ],
  "debugger": [
    {
      "current": string,
      "suggested": string,
      "reason": string
    }
  ],
  "summary": string
}`
          }
        ]
      },
      contents: [
        {
          parts: [
            {
              text: `JOB DESCRIPTION:\n${jd}\n\nRESUME:\n${resume}`
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error("Empty response received from Gemini API.");
    }

    try {
      return JSON.parse(rawText.trim());
    } catch (parseError) {
      console.error("Failed to parse response text: ", rawText);
      throw new Error("Failed to parse Gemini API JSON response. Ensure the endpoint returns clean JSON.");
    }
  }

  // Call OpenAI API compatible Endpoint
  async function callOpenAICompatibleAPI(provider, key, baseUrl, model, jd, resume) {
    const endpoint = `${baseUrl.replace(/\/$/, '')}/chat/completions`;
    
    const systemPrompt = `You are an expert recruiter, hiring manager, and ATS evaluator.
Your task is to compare a candidate's resume against a job description and calculate how well the candidate qualifies for the role.

Return ONLY a single valid JSON object following this JSON schema exactly:
{
  "overall_score": number (0-100),
  "qualification_level": string ("Excellent Match" | "Strong Match" | "Good Match" | "Partial Match" | "Weak Match"),
  "skills_match": number (0-100),
  "experience_match": number (0-100),
  "tools_match": number (0-100),
  "leadership_match": number (0-100),
  "education_match": number (0-100),
  "domain_match": number (0-100),
  "keyword_match": number (0-100),
  "gaps": {
    "critical": [string],
    "important": [string],
    "nice": [string]
  },
  "mappings": [
    {
      "resumeId": string,
      "jdId": string,
      "score": number,
      "reason": string,
      "missing": string,
      "severity": string
    }
  ],
  "debugger": [
    {
      "current": string,
      "suggested": string,
      "reason": string
    }
  ],
  "summary": string
}

Ensure the output is valid JSON without markdown wrapping.`;

    const userPrompt = `JOB DESCRIPTION:\n${jd}\n\nRESUME:\n${resume}`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    };

    if (provider === "openrouter") {
      headers["HTTP-Referer"] = window.location.origin;
      headers["X-Title"] = "ResuMatch ATS";
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        model: model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response received from API.");
    }

    try {
      return JSON.parse(content.trim());
    } catch (parseError) {
      console.error("Failed to parse response text: ", content);
      throw new Error("Failed to parse API JSON response. Ensure the endpoint returns valid JSON.");
    }
  }

  // Call Claude API
  async function callClaudeAPI(key, baseUrl, model, jd, resume) {
    const endpoint = `${baseUrl.replace(/\/$/, '')}/messages`;
    
    const systemPrompt = `You are an expert recruiter, hiring manager, and ATS evaluator.
Your task is to compare a candidate's resume against a job description and calculate how well the candidate qualifies for the role.

Return ONLY a single valid JSON object following this JSON schema exactly:
{
  "overall_score": number (0-100),
  "qualification_level": string ("Excellent Match" | "Strong Match" | "Good Match" | "Partial Match" | "Weak Match"),
  "skills_match": number (0-100),
  "experience_match": number (0-100),
  "tools_match": number (0-100),
  "leadership_match": number (0-100),
  "education_match": number (0-100),
  "domain_match": number (0-100),
  "keyword_match": number (0-100),
  "gaps": {
    "critical": [string],
    "important": [string],
    "nice": [string]
  },
  "mappings": [
    {
      "resumeId": string,
      "jdId": string,
      "score": number,
      "reason": string,
      "missing": string,
      "severity": string
    }
  ],
  "debugger": [
    {
      "current": string,
      "suggested": string,
      "reason": string
    }
  ],
  "summary": string
}

Ensure the output is valid JSON without markdown wrapping.`;

    const userPrompt = `JOB DESCRIPTION:\n${jd}\n\nRESUME:\n${resume}`;

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-danger-potentially-unsafe-requests": "true"
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        model: model,
        max_tokens: 4000,
        system: systemPrompt,
        messages: [
          { role: "user", content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Claude API HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;
    if (!content) {
      throw new Error("Empty response received from Claude API.");
    }

    try {
      return JSON.parse(content.trim());
    } catch (parseError) {
      console.error("Failed to parse response text: ", content);
      throw new Error("Failed to parse Claude JSON response.");
    }
  }

  // ==========================================================================
  // Render Outputs & Dynamic UI
  // ==========================================================================

  function renderPlaygroundStats() {
    statResumeChunks.textContent = state.resumeChunks.length;
    statJdChunks.textContent = state.jdChunks.length;
    
    const all = [...state.resumeChunks, ...state.jdChunks];
    if (all.length > 0) {
      const sum = all.reduce((acc, c) => acc + c.charCount, 0);
      statAvgSize.textContent = `${Math.round(sum / all.length)} ch`;
    } else {
      statAvgSize.textContent = "0 ch";
    }

    // coverage & overlap approximations
    statCoverage.textContent = state.resumeText.length > 20 ? "100%" : "0%";
    statOverlapRate.textContent = `${state.overlapPercent}%`;
  }

  function renderChunksExplorer() {
    resumeChunksList.innerHTML = "";
    jdChunksList.innerHTML = "";

    if (state.resumeChunks.length === 0) {
      resumeChunksList.appendChild(createEmptyStateDOM("No resume chunks. Paste text and evaluate."));
    } else {
      state.resumeChunks.forEach(c => {
        resumeChunksList.appendChild(createChunkCardDOM(c, true));
      });
    }

    if (state.jdChunks.length === 0) {
      jdChunksList.appendChild(createEmptyStateDOM("No JD chunks. Paste text and evaluate."));
    } else {
      state.jdChunks.forEach(c => {
        jdChunksList.appendChild(createChunkCardDOM(c, false));
      });
    }

    if (window.lucide) lucide.createIcons();
  }

  function createEmptyStateDOM(text) {
    const div = document.createElement("div");
    div.className = "win-no-data-msg";
    div.textContent = text;
    return div;
  }

  function createChunkCardDOM(chunk, isResume) {
    const card = document.createElement("div");
    card.className = "win-chunk-card";
    card.id = `card-${chunk.id}`;

    // Meta Header
    const meta = document.createElement("div");
    meta.className = "chunk-card-meta";
    
    const idBadge = document.createElement("span");
    idBadge.className = "chunk-badge-id";
    idBadge.textContent = chunk.id;
    meta.appendChild(idBadge);

    const secBadge = document.createElement("span");
    secBadge.className = "chunk-badge-section";
    secBadge.textContent = chunk.section;
    meta.appendChild(secBadge);

    const sizeBadge = document.createElement("span");
    sizeBadge.className = "chunk-badge-size";
    sizeBadge.textContent = `${chunk.charCount} chars | ~${chunk.tokenCount} tokens`;
    meta.appendChild(sizeBadge);

    card.appendChild(meta);

    // Text Display
    const textDiv = document.createElement("div");
    textDiv.className = "chunk-card-text";
    textDiv.textContent = chunk.text;
    card.appendChild(textDiv);

    // Command Actions
    const actions = document.createElement("div");
    actions.className = "chunk-card-actions";

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn-chunk-action";
    btnEdit.innerHTML = `<i data-lucide="edit-3"></i> Edit`;
    btnEdit.addEventListener("click", () => handleChunkEditToggle(chunk, card, isResume));
    actions.appendChild(btnEdit);

    const btnSplit = document.createElement("button");
    btnSplit.className = "btn-chunk-action";
    btnSplit.innerHTML = `<i data-lucide="scissors"></i> Split`;
    btnSplit.addEventListener("click", () => handleChunkSplit(chunk, isResume));
    actions.appendChild(btnSplit);

    const btnMerge = document.createElement("button");
    btnMerge.className = "btn-chunk-action";
    btnMerge.innerHTML = `<i data-lucide="merge"></i> Merge`;
    btnMerge.addEventListener("click", () => handleChunkMerge(chunk, isResume));
    actions.appendChild(btnMerge);

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn-chunk-action btn-chunk-delete";
    btnDelete.innerHTML = `<i data-lucide="trash-2"></i> Delete`;
    btnDelete.addEventListener("click", () => handleChunkDelete(chunk, isResume));
    actions.appendChild(btnDelete);

    card.appendChild(actions);
    return card;
  }

  // Chunk CRUD Event Handlers
  function handleChunkEditToggle(chunk, card, isResume) {
    const textDiv = card.querySelector(".chunk-card-text");
    const editBtn = card.querySelector(".btn-chunk-action");
    
    // Check if currently editing
    const isEditing = card.querySelector(".chunk-card-textarea");
    if (isEditing) {
      // Save content
      const newText = isEditing.value.trim();
      chunk.text = newText;
      chunk.charCount = newText.length;
      chunk.tokenCount = Math.round(newText.split(/\s+/).length * 1.3);
      
      const newTextDiv = document.createElement("div");
      newTextDiv.className = "chunk-card-text";
      newTextDiv.textContent = newText;
      isEditing.replaceWith(newTextDiv);
      
      editBtn.innerHTML = `<i data-lucide="edit-3"></i> Edit`;
      
      // Update sizes in stats & re-compute similarity
      renderPlaygroundStats();
      runLocalSimilarityMatching();
      if (window.lucide) lucide.createIcons();
    } else {
      // Swap to textarea
      const textarea = document.createElement("textarea");
      textarea.className = "chunk-card-textarea";
      textarea.value = chunk.text;
      textDiv.replaceWith(textarea);
      
      editBtn.innerHTML = `<i data-lucide="save"></i> Save`;
      if (window.lucide) lucide.createIcons();
    }
  }

  function handleChunkSplit(chunk, isResume) {
    const targetArray = isResume ? state.resumeChunks : state.jdChunks;
    const index = targetArray.findIndex(c => c.id === chunk.id);
    if (index === -1) return;

    // Ask user for split point (character index) or split half-way
    const splitIndexStr = prompt(`Enter character index to split this chunk (total length: ${chunk.charCount}):`, Math.floor(chunk.charCount / 2));
    if (splitIndexStr === null) return;
    
    const splitIndex = parseInt(splitIndexStr);
    if (isNaN(splitIndex) || splitIndex <= 0 || splitIndex >= chunk.charCount) {
      alert("Invalid split index.");
      return;
    }

    const text1 = chunk.text.substring(0, splitIndex).trim();
    const text2 = chunk.text.substring(splitIndex).trim();

    // Modify original
    chunk.text = text1;
    chunk.charCount = text1.length;
    chunk.tokenCount = Math.round(text1.split(/\s+/).length * 1.3);

    // Insert new
    const newId = `${chunk.id}-split`;
    const newChunk = {
      id: newId,
      text: text2,
      section: chunk.section,
      charCount: text2.length,
      tokenCount: Math.round(text2.split(/\s+/).length * 1.3)
    };

    targetArray.splice(index + 1, 0, newChunk);
    
    renderPlaygroundStats();
    renderChunksExplorer();
    runLocalSimilarityMatching();
  }

  function handleChunkMerge(chunk, isResume) {
    const targetArray = isResume ? state.resumeChunks : state.jdChunks;
    const index = targetArray.findIndex(c => c.id === chunk.id);
    if (index === -1 || index === targetArray.length - 1) {
      alert("Cannot merge the last chunk.");
      return;
    }

    const nextChunk = targetArray[index + 1];
    chunk.text += "\n\n" + nextChunk.text;
    chunk.charCount = chunk.text.length;
    chunk.tokenCount = Math.round(chunk.text.split(/\s+/).length * 1.3);

    // Remove next
    targetArray.splice(index + 1, 1);

    renderPlaygroundStats();
    renderChunksExplorer();
    runLocalSimilarityMatching();
  }

  function handleChunkDelete(chunk, isResume) {
    if (!confirm(`Are you sure you want to delete chunk ${chunk.id}?`)) return;
    const targetArray = isResume ? state.resumeChunks : state.jdChunks;
    const index = targetArray.findIndex(c => c.id === chunk.id);
    if (index !== -1) {
      targetArray.splice(index, 1);
    }
    
    renderPlaygroundStats();
    renderChunksExplorer();
    runLocalSimilarityMatching();
  }

  // Add Custom Chunk Actions
  btnAddResumeChunk.addEventListener("click", () => {
    const text = prompt("Enter text content for the new Resume chunk:");
    if (!text) return;
    
    const newId = `RES-${state.resumeChunks.length + 1}`;
    state.resumeChunks.push({
      id: newId,
      text: text.trim(),
      section: "Custom Insert",
      charCount: text.length,
      tokenCount: Math.round(text.split(/\s+/).length * 1.3)
    });
    
    renderPlaygroundStats();
    renderChunksExplorer();
    runLocalSimilarityMatching();
  });

  btnAddJdChunk.addEventListener("click", () => {
    const text = prompt("Enter text content for the new JD chunk:");
    if (!text) return;
    
    const newId = `JD-${state.jdChunks.length + 1}`;
    state.jdChunks.push({
      id: newId,
      text: text.trim(),
      section: "Custom Insert",
      charCount: text.length,
      tokenCount: Math.round(text.split(/\s+/).length * 1.3)
    });

    renderPlaygroundStats();
    renderChunksExplorer();
    runLocalSimilarityMatching();
  });


  // --------------------------------------------------------------------------
  // Render Dashboard Pane
  // --------------------------------------------------------------------------

  function renderDashboard(data) {
    // 1. Radial Progress
    const score = Math.max(0, Math.min(100, data.overall_score));
    
    // Easing radial score number counter
    let currentScore = 0;
    const duration = 1000;
    const startTime = performance.now();

    function updateCounter(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);
      currentScore = Math.round(ease * score);
      
      winScoreNumber.textContent = currentScore;
      if (progress < 1) requestAnimationFrame(updateCounter);
      else winScoreNumber.textContent = score;
    }
    requestAnimationFrame(updateCounter);

    // Radial SVG Offset updates
    // total is 276.46
    const circ = 276.46;
    const offset = circ - (circ * score) / 100;
    winGaugeProgress.style.strokeDashoffset = offset;

    // Apply severity coloring
    let color = "var(--win-danger)";
    if (score >= 90) color = "var(--win-success)";
    else if (score >= 75) color = "var(--win-accent)";
    else if (score >= 60) color = "var(--win-warning)";
    winGaugeProgress.style.stroke = color;

    winScoreLabel.textContent = data.qualification_level;
    dashboardSummaryText.textContent = data.summary;

    // 2. Metrics categories
    valSkillsMatch.textContent = `${data.skills_match}%`;
    barSkillsMatch.style.width = `${data.skills_match}%`;
    
    valExperienceMatch.textContent = `${data.experience_match}%`;
    barExperienceMatch.style.width = `${data.experience_match}%`;
    
    valToolsMatch.textContent = `${data.tools_match}%`;
    barToolsMatch.style.width = `${data.tools_match}%`;
    
    valLeadershipMatch.textContent = `${data.leadership_match}%`;
    barLeadershipMatch.style.width = `${data.leadership_match}%`;
    
    valEducationMatch.textContent = `${data.education_match}%`;
    barEducationMatch.style.width = `${data.education_match}%`;
    
    valDomainMatch.textContent = `${data.domain_match}%`;
    barDomainMatch.style.width = `${data.domain_match}%`;
    
    valKeywordMatch.textContent = `${data.keyword_match}%`;
    barKeywordMatch.style.width = `${data.keyword_match}%`;

    // 3. Gaps lists
    listGapsCritical.innerHTML = "";
    if (data.gaps?.critical && data.gaps.critical.length > 0) {
      data.gaps.critical.forEach(g => {
        const li = document.createElement("li");
        li.textContent = g;
        listGapsCritical.appendChild(li);
      });
    } else {
      listGapsCritical.appendChild(createEmptyBulletDOM("No critical gaps identified."));
    }

    listGapsImportant.innerHTML = "";
    if (data.gaps?.important && data.gaps.important.length > 0) {
      data.gaps.important.forEach(g => {
        const li = document.createElement("li");
        li.textContent = g;
        listGapsImportant.appendChild(li);
      });
    } else {
      listGapsImportant.appendChild(createEmptyBulletDOM("No important gaps identified."));
    }

    listGapsNice.innerHTML = "";
    if (data.gaps?.nice && data.gaps.nice.length > 0) {
      data.gaps.nice.forEach(g => {
        const li = document.createElement("li");
        li.textContent = g;
        listGapsNice.appendChild(li);
      });
    } else {
      listGapsNice.appendChild(createEmptyBulletDOM("No nice-to-have gaps detected."));
    }

    // 4. Render Matrix Mappings Tab
    renderMatrixTab();

    // 5. Render Debugger Tab
    renderDebuggerTab(data.debugger);
  }

  function createEmptyBulletDOM(text) {
    const li = document.createElement("li");
    li.className = "empty-bullet-li";
    li.textContent = text;
    return li;
  }

  // --------------------------------------------------------------------------
  // Render Visual Match Matrix Pane
  // --------------------------------------------------------------------------

  function renderMatrixTab() {
    matrixMappingsList.innerHTML = "";
    // Hide details block, show fallback
    matrixDetailsCard.classList.add("hidden");
    matrixDetailsFallback.classList.remove("hidden");

    if (state.mappings.length === 0) {
      matrixMappingsList.appendChild(createEmptyStateDOM("No mappings computed. Set inputs and run compare."));
      return;
    }

    state.mappings.forEach(map => {
      const card = document.createElement("div");
      card.className = "win-mapping-card";
      
      const title = document.createElement("div");
      title.className = "mapping-card-title";
      
      const ids = document.createElement("span");
      ids.className = "mapping-ids";
      ids.textContent = `${map.resumeId} → ${map.jdId}`;
      title.appendChild(ids);

      const type = document.createElement("span");
      type.className = "mapping-type";
      
      const resChunk = state.resumeChunks.find(c => c.id === map.resumeId);
      type.textContent = resChunk ? `Section: ${resChunk.section}` : "Section Mapping";
      title.appendChild(type);

      card.appendChild(title);

      const score = document.createElement("span");
      score.className = "mapping-score-pill";
      score.textContent = `${map.score}%`;
      card.appendChild(score);

      // Inspect event click
      card.addEventListener("click", () => {
        // Toggle active states
        document.querySelectorAll(".win-mapping-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        
        showMappingInspectDetails(map);
      });

      matrixMappingsList.appendChild(card);
    });
  }

  function showMappingInspectDetails(map) {
    const resChunk = state.resumeChunks.find(c => c.id === map.resumeId);
    const jdChunk = state.jdChunks.find(c => c.id === map.jdId);

    inspectResumeContent.textContent = resChunk ? resChunk.text : "[Deleted Chunk]";
    inspectJdContent.textContent = jdChunk ? jdChunk.text : "[Deleted Chunk]";
    
    inspectSimilarityBadge.textContent = `Similarity: ${map.score}%`;
    inspectMatchReason.textContent = map.reason;
    inspectMissingItems.textContent = map.missing;
    
    // Severity tags
    inspectSeverityLabel.textContent = map.severity;
    inspectSeverityLabel.className = `badge-severity-label badge-severity-${map.severity}`;

    matrixDetailsFallback.classList.add("hidden");
    matrixDetailsCard.classList.remove("hidden");
    
    if (window.lucide) lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // Render Resume Debugger Pane
  // --------------------------------------------------------------------------

  function renderDebuggerTab(suggestions) {
    debuggerTableBody.innerHTML = "";
    
    if (!suggestions || suggestions.length === 0) {
      debuggerTableBody.innerHTML = `
        <tr>
          <td colspan="3" class="win-table-empty">No debugger recommendations. Run compare evaluations to construct recommendations.</td>
        </tr>`;
      return;
    }

    suggestions.forEach(item => {
      const tr = document.createElement("tr");

      const tdCurrent = document.createElement("td");
      tdCurrent.className = "win-table-current";
      tdCurrent.textContent = item.current;
      tr.appendChild(tdCurrent);

      const tdSuggested = document.createElement("td");
      tdSuggested.className = "win-table-suggested";
      tdSuggested.textContent = item.suggested;
      tr.appendChild(tdSuggested);

      const tdReason = document.createElement("td");
      tdReason.textContent = item.reason;
      tr.appendChild(tdReason);

      debuggerTableBody.appendChild(tr);
    });
  }

  // ==========================================================================
  // Workspace Tab Switcher
  // ==========================================================================

  const tabButtons = document.querySelectorAll(".win-tab-bar .win-tab-btn");
  const tabPanes = document.querySelectorAll(".win-pane-container .win-tab-pane");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("aria-controls");
      const tabName = btn.id.replace("tab-btn-", "");
      
      switchTab(tabName);
    });
  });

  function switchTab(tabName) {
    tabButtons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    tabPanes.forEach(p => p.classList.add("hidden"));

    const activeBtn = document.getElementById(`tab-btn-${tabName}`);
    const activePane = document.getElementById(`pane-${tabName}`);

    if (activeBtn && activePane) {
      activeBtn.classList.add("active");
      activeBtn.setAttribute("aria-selected", "true");
      activePane.classList.remove("hidden");
      state.activeTab = tabName;
    }
  }

  // ==========================================================================
  // Export/Print Auditor Report
  // ==========================================================================

  btnPrintDebugger.addEventListener("click", () => {
    // Populate print timestamp
    const now = new Date();
    printTimestamp.textContent = `Generated on: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    // Compile print content from state structures
    let html = `
      <div class="print-section">
        <h3 class="print-section-title">Evaluation Summary</h3>
        <div class="print-grid-2">
          <div class="print-score-box">
            <span class="print-score-num">${state.evaluation?.overall_score || 0}%</span>
            <div>Qualification Level: <strong>${state.evaluation?.qualification_level || "Unknown"}</strong></div>
          </div>
          <div>
            <strong>Recruiter Statement:</strong>
            <p style="font-size: 11px; margin-top: 6px;">${state.evaluation?.summary || "No summary."}</p>
          </div>
        </div>
      </div>

      <div class="print-section">
        <h3 class="print-section-title">Category Match Matrices</h3>
        <table class="print-table" style="margin-bottom: 20px;">
          <thead>
            <tr>
              <th>Evaluation Domain</th>
              <th>Alignment Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Skills Match</td><td>${state.evaluation?.skills_match || 0}%</td></tr>
            <tr><td>Experience Match</td><td>${state.evaluation?.experience_match || 0}%</td></tr>
            <tr><td>Tools & Technology Match</td><td>${state.evaluation?.tools_match || 0}%</td></tr>
            <tr><td>Leadership & Team Match</td><td>${state.evaluation?.leadership_match || 0}%</td></tr>
            <tr><td>Education & Certifications Match</td><td>${state.evaluation?.education_match || 0}%</td></tr>
            <tr><td>Domain Specific Match</td><td>${state.evaluation?.domain_match || 0}%</td></tr>
          </tbody>
        </table>
      </div>

      <div class="print-section">
        <h3 class="print-section-title">Identified Gaps & Missing Items</h3>
        <div>
          <strong>Critical Missing Items:</strong>
          <ul class="print-bullets" style="margin-bottom:12px;">
            ${(state.evaluation?.gaps?.critical || ["None"]).map(g => `<li>${g}</li>`).join("")}
          </ul>
          <strong>Important Missing Items:</strong>
          <ul class="print-bullets" style="margin-bottom:12px;">
            ${(state.evaluation?.gaps?.important || ["None"]).map(g => `<li>${g}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="print-section">
        <h3 class="print-section-title">Resume Statement Debug Suggestions</h3>
        <table class="print-table">
          <thead>
            <tr>
              <th style="width:30%;">Current Resume Line</th>
              <th style="width:35%;">Suggested Debug Line</th>
              <th style="width:35%;">Optimizing Reason</th>
            </tr>
          </thead>
          <tbody>
            ${(state.evaluation?.debugger || []).map(item => `
              <tr>
                <td>${item.current}</td>
                <td style="color:#107c41; font-weight:600;">${item.suggested}</td>
                <td>${item.reason}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    printMainContent.innerHTML = html;
    
    // Trigger Print
    window.print();
  });
});
