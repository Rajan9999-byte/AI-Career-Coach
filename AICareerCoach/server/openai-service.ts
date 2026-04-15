import OpenAI from "openai";
import type { Role, Difficulty } from "@shared/schema";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
});

const roleProfiles: Record<Role, string> = {
  "Data Analyst": "SQL, Python, Tableau, Excel, data visualization, business intelligence",
  "Software Engineer": "DSA, System Design, Git, APIs, OOP, databases",
  "Product Manager": "Strategy, Analytics, User Research, Market Analysis, Roadmapping",
  "HR Associate": "Recruitment, Communication, HRIS, Employee Relations",
  "Marketing Manager": "SEO, Analytics, Content Strategy, Campaign Management",
  "Data Scientist": "ML, Statistics, Python, R, Deep Learning",
  "Business Analyst": "Requirements Gathering, Process Mapping, Documentation",
  "UI/UX Designer": "Figma, User Testing, Prototyping, Design Systems"
};

// Fallback questions for each role at different difficulty levels
const fallbackQuestions: Record<Role, Record<Difficulty, string[]>> = {
  "Data Analyst": {
    "Beginner": [
      "Explain the difference between a primary key and a foreign key in SQL.",
      "What are the main data types in Excel?",
      "How do you filter data in a pivot table?",
      "What is data normalization?",
      "Describe the difference between VLOOKUP and INDEX/MATCH."
    ],
    "Intermediate": [
      "Write a SQL query to find the top 5 highest earners per department.",
      "How would you handle missing values in a dataset?",
      "Explain window functions in SQL with an example.",
      "What are the differences between inner join, left join, and full outer join?",
      "How do you create a Tableau dashboard that updates in real-time?"
    ],
    "Advanced": [
      "Design a data warehouse schema for an e-commerce company.",
      "Explain ETL vs ELT and when to use each approach.",
      "How would you optimize a slow SQL query?",
      "Describe your approach to building a machine learning model for churn prediction.",
      "What are the challenges of handling petabyte-scale data?"
    ]
  },
  "Software Engineer": {
    "Beginner": [
      "Explain the difference between an array and a linked list.",
      "What is a time complexity and why does it matter?",
      "Describe the difference between REST and SOAP.",
      "What is a database index and why is it important?",
      "Explain the concept of recursion."
    ],
    "Intermediate": [
      "Design a system to handle URL shortening (like bit.ly).",
      "Explain the CAP theorem and its implications.",
      "How would you implement a cache eviction policy?",
      "Describe the differences between horizontal and vertical scaling.",
      "What are microservices and what are their advantages?"
    ],
    "Advanced": [
      "Design a distributed system for real-time notifications.",
      "How would you build a real-time collaborative editing system?",
      "Explain how to implement consistent hashing for load balancing.",
      "Design a database sharding strategy for a social media platform.",
      "How would you approach building a highly available system with 99.99% uptime?"
    ]
  },
  "Product Manager": {
    "Beginner": [
      "What makes a good product roadmap?",
      "Explain the difference between features and benefits.",
      "How do you define product success metrics?",
      "What is user research and why is it important?",
      "Describe the product lifecycle stages."
    ],
    "Intermediate": [
      "How would you prioritize features when resources are limited?",
      "Walk through your approach to defining product requirements.",
      "How do you measure and improve user engagement?",
      "Explain the difference between OKRs and KPIs.",
      "How would you approach entering a new market?"
    ],
    "Advanced": [
      "Design a go-to-market strategy for a new product.",
      "How would you analyze competitive threats?",
      "Explain how to build a data-driven product organization.",
      "How would you handle a situation where your product is losing market share?",
      "Design a product strategy for the next 3 years."
    ]
  },
  "HR Associate": {
    "Beginner": [
      "Describe the recruitment process from posting a job to onboarding.",
      "What are the key responsibilities of HR?",
      "How do you maintain confidentiality in HR matters?",
      "Explain the difference between full-time and part-time employees.",
      "What is employee engagement and why does it matter?"
    ],
    "Intermediate": [
      "How would you handle a conflict between two team members?",
      "Describe your approach to conducting performance reviews.",
      "What is organizational culture and how do you build it?",
      "How would you manage a reduction in workforce?",
      "Explain the importance of diversity and inclusion in the workplace."
    ],
    "Advanced": [
      "Design an employee development program for high-potential talent.",
      "How would you approach restructuring an organization?",
      "Explain succession planning and its importance.",
      "How would you handle a serious workplace misconduct case?",
      "Design a compensation and benefits strategy for a growing company."
    ]
  },
  "Marketing Manager": {
    "Beginner": [
      "Explain the marketing funnel (awareness, consideration, conversion).",
      "What is a marketing campaign?",
      "Describe the difference between B2B and B2C marketing.",
      "What are the main channels for digital marketing?",
      "How do you measure marketing ROI?"
    ],
    "Intermediate": [
      "Design a social media strategy for a new product launch.",
      "How would you segment your customer base?",
      "Explain A/B testing and its importance in marketing.",
      "How would you create a content marketing strategy?",
      "Describe how you would use email marketing effectively."
    ],
    "Advanced": [
      "Design a complete go-to-market strategy for a new market.",
      "How would you approach building a brand from scratch?",
      "Explain marketing attribution and its challenges.",
      "How would you optimize customer lifetime value?",
      "Design a marketing stack for a scaling company."
    ]
  },
  "Data Scientist": {
    "Beginner": [
      "Explain the difference between supervised and unsupervised learning.",
      "What is overfitting and how do you prevent it?",
      "Describe the steps in a machine learning project.",
      "What are the common data types and distributions?",
      "Explain the purpose of training, validation, and test sets."
    ],
    "Intermediate": [
      "How would you handle imbalanced datasets?",
      "Explain different evaluation metrics for classification models.",
      "What is feature engineering and why is it important?",
      "Describe how gradient boosting works.",
      "How would you approach a time series forecasting problem?"
    ],
    "Advanced": [
      "Design a recommendation system from scratch.",
      "Explain how to implement a neural network for NLP.",
      "How would you approach detecting anomalies in data?",
      "Design a real-time machine learning system.",
      "Explain how to handle concept drift in production models."
    ]
  },
  "Business Analyst": {
    "Beginner": [
      "What is requirements gathering and why is it important?",
      "Explain the difference between functional and non-functional requirements.",
      "What is a use case diagram?",
      "Describe the purpose of a business process flow.",
      "What is the role of a business analyst in a project?"
    ],
    "Intermediate": [
      "Walk through your approach to documenting requirements.",
      "How do you handle conflicting requirements?",
      "Explain the purpose and components of a requirements specification.",
      "How would you approach analyzing process improvements?",
      "Describe how to create effective user personas."
    ],
    "Advanced": [
      "Design a complete business analysis framework.",
      "How would you approach digital transformation in an organization?",
      "Explain how to measure the success of implemented solutions.",
      "How would you approach enterprise architecture planning?",
      "Design a business case for a major investment."
    ]
  },
  "UI/UX Designer": {
    "Beginner": [
      "Explain the difference between UI and UX design.",
      "What is user research and why is it important?",
      "Describe the design thinking process.",
      "What is a wireframe and when do you use it?",
      "Explain the principles of good design."
    ],
    "Intermediate": [
      "Walk through your approach to designing a mobile app.",
      "How do you conduct user testing?",
      "Explain the importance of accessibility in design.",
      "What is information architecture?",
      "How would you approach improving an existing design?"
    ],
    "Advanced": [
      "Design a complex SaaS application interface.",
      "Explain how to build and maintain a design system.",
      "How would you approach designing for multiple platforms?",
      "Describe your approach to handling edge cases in design.",
      "How would you measure the success of a design?"
    ]
  }
};

export async function generateQuestion(
  role: Role,
  difficulty: Difficulty,
  questionCount: number = 1
): Promise<string> {
  try {
    const skillsForRole = roleProfiles[role];
    
    const prompt = `You are an expert technical interviewer. Generate ${questionCount} interview question(s) for a ${role} position at ${difficulty} difficulty level.

Focus on these skills: ${skillsForRole}

Return ONLY a valid JSON object with this exact format (no markdown, no extra text):
{
  "questions": [
    {
      "question": "the interview question",
      "difficulty": "${difficulty}",
      "role": "${role}"
    }
  ]
}

Make questions realistic, technical where appropriate, and suitable for assessing ${role} candidates. Output ONLY the JSON object.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 1024,
    });

    const content = response.choices[0].message.content || "";
    return content;
  } catch (error) {
    console.error("Error generating question with OpenAI:", error);
    // Return a fallback question
    const fallbackList = fallbackQuestions[role][difficulty] || fallbackQuestions[role]["Beginner"];
    const randomQuestion = fallbackList[Math.floor(Math.random() * fallbackList.length)];
    return JSON.stringify({
      questions: [
        {
          question: randomQuestion,
          difficulty,
          role
        }
      ]
    });
  }
}

export async function evaluateAnswer(
  question: string,
  answer: string,
  role: Role
): Promise<{
  overallScore: number;
  technicalAccuracy: number;
  communication: number;
  confidence: number;
  feedback: string;
}> {
  try {
    const prompt = `You are an expert interviewer evaluating a candidate's answer for a ${role} position.

Question: ${question}
Candidate's Answer: ${answer}

Evaluate the answer and return ONLY a valid JSON object with this exact format (no markdown, no extra text):
{
  "overallScore": number from 0-100,
  "technicalAccuracy": number from 0-100,
  "communication": number from 0-100,
  "confidence": number from 0-100,
  "feedback": "constructive feedback about the answer (2-3 sentences)"
}

Base technical accuracy on the correctness and depth of the response. Evaluate communication based on clarity and organization. Assess confidence based on how well-articulated and complete the answer is. Output ONLY the JSON object.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 512,
    });

    const content = response.choices[0].message.content || "{}";
    const result = JSON.parse(content);

    return {
      overallScore: Math.round(Math.min(100, Math.max(0, result.overallScore || 70))),
      technicalAccuracy: Math.round(Math.min(100, Math.max(0, result.technicalAccuracy || 70))),
      communication: Math.round(Math.min(100, Math.max(0, result.communication || 70))),
      confidence: Math.round(Math.min(100, Math.max(0, result.confidence || 70))),
      feedback: result.feedback || "Good effort on this question. Keep practicing to improve your responses.",
    };
  } catch (error) {
    console.error("Error evaluating answer with OpenAI:", error);
    // Return a default evaluation
    return {
      overallScore: 75,
      technicalAccuracy: 75,
      communication: 75,
      confidence: 75,
      feedback: "Good effort on this question. Keep practicing to improve your responses.",
    };
  }
}
