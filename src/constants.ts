import { RoadmapData } from "./types";

export const ROADMAP_DATA: RoadmapData = {
  why: [
    "Context is King: You understand the 'Why' behind the numbers. AI needs that context.",
    "The Fintech Boom: India's fintech sector is projected to reach $2.1T by 2030. They need AI analysts, not just coders.",
    "Regulatory Moat: Understanding RBI/SEBI guidelines is a superpower when building compliant AI systems.",
    "Low Barrier to Entry: You don't need a CS degree to master Prompt Engineering and AI Orchestration."
  ],
  retentionRules: [
    { title: "24-Hour Rule", rule: "Apply what you learn within 24 hours or lose 70% of it." },
    { title: "2-Resource Rule", rule: "Don't get stuck in tutorial hell. Use max 2 resources per topic, then build." },
    { title: "The Struggle Log", rule: "Document your errors. A fixed bug is a learned lesson." }
  ],
  milestones: [
    {
      stage: 1,
      title: "Foundations: The AI Mindset",
      duration: "2 weeks",
      description: "Understanding LLMs, Transformers, and how AI 'thinks' without getting lost in math.",
      topics: ["What are LLMs?", "Tokens & Context Windows", "The Transformer Architecture (High Level)", "AI vs. Traditional Software"],
      resources: [
        { title: "Generative AI for Everyone", url: "https://www.deeplearning.ai/courses/generative-ai-for-everyone/", type: "course", provider: "Andrew Ng" },
        { title: "But what is a GPT?", url: "https://www.youtube.com/watch?v=wjZofJX0v4M", type: "video", provider: "3Blue1Brown" }
      ]
    },
    {
      stage: 2,
      title: "Prompt Engineering Mastery",
      duration: "3 weeks",
      description: "Moving beyond 'write an email' to complex reasoning and structured outputs.",
      topics: ["Zero-shot vs. Few-shot", "Chain of Thought (CoT)", "Iterative Prompting", "System Instructions", "Output Formatting (JSON/Markdown)"],
      resources: [
        { title: "ChatGPT Prompt Engineering for Developers", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", type: "course", provider: "DeepLearning.AI" },
        { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", type: "article", provider: "DAIR.AI" }
      ]
    },
    {
      stage: 3,
      title: "Python for Business Analysts",
      duration: "6 weeks",
      description: "The minimum viable Python needed to automate tasks and call APIs.",
      topics: ["Variables & Data Types", "Lists & Dictionaries", "Functions & Loops", "Pandas for Excel-like Data", "Calling OpenAI/Gemini APIs"],
      resources: [
        { title: "Python for Data Science (IBM)", url: "https://www.edx.org/learn/python/ibm-python-for-data-science-and-ai", type: "course", provider: "edX" },
        { title: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/", type: "article", provider: "Al Sweigart" }
      ]
    },
    {
      stage: 4,
      title: "RAG & Knowledge Retrieval",
      duration: "5 weeks",
      description: "Connecting AI to private data (like RBI circulars or company reports).",
      topics: ["Embeddings & Vector DBs", "Semantic Search", "Retrieval Augmented Generation (RAG)", "Chunking Strategies"],
      resources: [
        { title: "LangChain for LLM Application Development", url: "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/", type: "course", provider: "DeepLearning.AI" },
        { title: "Vector Databases Explained", url: "https://www.pinecone.io/learn/vector-database/", type: "article", provider: "Pinecone" }
      ]
    },
    {
      stage: 5,
      title: "Local AI & Privacy",
      duration: "3 weeks",
      description: "Running models locally for sensitive financial data.",
      topics: ["Ollama & LM Studio", "Privacy-first AI", "Quantization (High Level)", "Local RAG"],
      resources: [
        { title: "Ollama Official Guide", url: "https://ollama.com/", type: "tool", provider: "Ollama" },
        { title: "Running LLMs Locally", url: "https://www.youtube.com/watch?v=Wjrdr0NU4Sk", type: "video", provider: "NetworkChuck" }
      ]
    },
    {
      stage: 6,
      title: "Governance, Ethics & Evaluation",
      duration: "3 weeks",
      description: "The 'B.Com Edge': Ensuring AI follows rules and doesn't hallucinate numbers.",
      topics: ["DPDP Act 2023 (India)", "AI Hallucinations in Finance", "Red Teaming Prompts", "RAGAS Evaluation"],
      resources: [
        { title: "AI Ethics & Governance", url: "https://www.coursera.org/learn/ai-ethics-governance", type: "course", provider: "Coursera" },
        { title: "India's DPDP Act Explained", url: "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023", type: "article", provider: "MeitY" }
      ]
    }
  ],
  projects: [
    {
      id: "rbi-rag",
      title: "RBI Circular RAG",
      description: "A chatbot that answers questions based on the latest RBI Master Directions. It uses vector embeddings to retrieve relevant sections of the circulars and provides accurate, context-aware answers to user queries about compliance and regulations.",
      category: "Compliance",
      difficulty: "Hard",
      tags: ["Python", "RAG", "Fintech"],
      milestones: [
        { id: "m1", title: "Data Collection", status: "completed", dueDate: "2026-04-10" },
        { id: "m2", title: "Vector Database Setup", status: "in-progress", dueDate: "2026-04-20" },
        { id: "m3", title: "RAG Implementation", status: "pending", dueDate: "2026-05-05" }
      ]
    },
    {
      id: "kyc-vision",
      title: "KYC Document Extractor",
      description: "Automate data extraction from PAN/Aadhaar cards using Vision LLMs. This project involves processing images of identity documents, identifying key fields like name, DOB, and ID number, and structuring the output for easy integration into KYC workflows.",
      category: "Fintech",
      difficulty: "Medium",
      tags: ["Prompting", "Vision AI", "Automation"],
      milestones: [
        { id: "m1", title: "Image Preprocessing", status: "completed", dueDate: "2026-04-05" },
        { id: "m2", title: "Vision Model Integration", status: "completed", dueDate: "2026-04-12" },
        { id: "m3", title: "Field Extraction Logic", status: "in-progress", dueDate: "2026-04-25" }
      ]
    },
    {
      id: "fin-analyzer",
      title: "Financial Statement Analyzer",
      description: "Upload a P&L statement and get a summary of key ratios and red flags. The tool parses financial documents, calculates essential metrics like gross margin and debt-to-equity, and uses AI to highlight potential areas of concern for auditors.",
      category: "Fintech",
      difficulty: "Hard",
      tags: ["Python", "Pandas", "LLM"],
      milestones: [
        { id: "m1", title: "PDF Parsing", status: "completed", dueDate: "2026-04-01" },
        { id: "m2", title: "Ratio Calculation", status: "in-progress", dueDate: "2026-04-15" },
        { id: "m3", title: "AI Analysis Engine", status: "pending", dueDate: "2026-05-01" }
      ]
    },
    {
      id: "loan-guardrail",
      title: "Loan Approval Guardrail",
      description: "Stress-test a loan bot to ensure it doesn't promise 0% interest rates. This project focuses on building a safety layer that monitors AI-driven customer interactions and prevents the model from making unauthorized or non-compliant financial commitments.",
      category: "Compliance",
      difficulty: "Expert",
      tags: ["Red Teaming", "Guardrails"],
      milestones: [
        { id: "m1", title: "Adversarial Testing", status: "in-progress", dueDate: "2026-04-18" },
        { id: "m2", title: "Guardrail Implementation", status: "pending", dueDate: "2026-05-10" }
      ]
    },
    {
      id: "ca-automation",
      title: "Email Automation for CA",
      description: "Categorize client emails and draft responses for tax queries. This system uses natural language processing to understand the intent of incoming emails and suggests appropriate responses based on tax laws and previous client interactions.",
      category: "General",
      difficulty: "Easy",
      tags: ["Prompting", "Automation"],
      milestones: [
        { id: "m1", title: "Email Integration", status: "completed", dueDate: "2026-03-25" },
        { id: "m2", title: "Intent Classification", status: "completed", dueDate: "2026-04-02" },
        { id: "m3", title: "Draft Generation", status: "in-progress", dueDate: "2026-04-15" }
      ]
    }
  ]
};
