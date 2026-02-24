import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { NextResponse } from "next/server";
import OpenAI from "openai";

//  Setup Azure Entra ID token provider
const tokenProvider = getBearerTokenProvider(
  new DefaultAzureCredential(),
  "https://cognitiveservices.azure.com/.default"
);

//  Configure OpenAI client for Azure
const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY, //  required
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_MODEL}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION }, //  correct
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },       //  needed for Azure
});

/*
// Health check
export async function GET(req) {
  try {
  //  const { message } = await req.json();

    const result = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_MODEL, //  must match deployment name
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Do you know js?" },
      ],
      max_tokens: 128,
    });

    return NextResponse.json({
      reply: result.choices[0].message.content,
    });
  } catch (err) {
    console.error("Azure Chat error:", err);
    return NextResponse.json({ error: "Azure Chat request failed" }, { status: 500 });
  }
 // return NextResponse.json({ status: " Azure Chat API ready. Use POST." });
}
*/

// Chat request
export async function POST(req) {
  try {
    // Parse JSON safely
    const body = await req.json();
    const userMessage = body?.message;

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "Invalid request: message must be a string" },
        { status: 400 }
      );
    }

    const result = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are PortfolioGPT, answering only questions about Narendra based on his resume:\n\n${DATA_RESUME}`,
        },
        { role: "user", content: userMessage }, //  string
      ],
      max_tokens: 256,
    });

    return NextResponse.json({
      message: result.choices[0].message.content,
    });
  } catch (err) {
    console.error("Azure Chat error:", err);
    return NextResponse.json(
      { error: "Azure Chat request failed" },
      { status: 500 }
    );
  }
}

const DATA_RESUME = `Narendra Korada
Chicago, IL (Open to Relocate) | +1 (312) 880-8673 | narendrakorada472@gmail.com | /Narendra Korada | /NKPortfolio


PROFESSIONAL SUMMARY
Software Engineer with experience in backend development, API integration, and production-level web systems. Strong foundation in Java, SQL, and object-oriented programming, with hands-on experience working in Agile environments. Seeking full-time Software Engineer / Java Developer roles to build scalable, high-quality software. 


TECHNICAL SKILLS
Programming Languages: Java, SQL, C, JavaScript, Python
Data Structures & Algorithms: Arrays, Strings, Linked List, Hash Maps, Stacks, Queues, Basic Recursion
Backend & APIs: Spring Boot, RESTful API development, request/response handling, input validation, error handling, JSON
Frontend Technologies: HTML, CSS, React (basic)
Databases: MySQL, Oracle
Low code / Enterprise Tools: PEGA PRPC (case management, workflows, report definitions)
Tools & Version Control: Git, GitHub, Visual Studio, IntelliJ
Software Engineering Fundamentals: Object-Oriented Programming (OOP), debugging, file handling, Agile/Scrum
Quality & Testing: Functional testing, UI testing, bug tracking, production validation


PROFESSIONAL EXPERIENCE
Website QA Analyst Intern
Oigetit – AI Fact Checker | Los Gatos, CA | Remote                                                                                                                   (Jul 2025 – Nov 2025)
•	Performed functional and UI testing on a live AI-powered web platform used in production.
•	Identified and documented 25+ critical UI and functional defects, contributing to approximately 30% improvement in platform stability after fixes
•	Executed end-to-end testing on key modules including Fact-Checked Stories, AI features, Sustainability, and Video
•	Collaborated closely with developers to validate fixes and reduce user-facing issues by 20%

Software Engineer
HCL Technologies | Chennai, India                                                                                                                                              (Aug 2022 – Jan 2024)
•	Developed backend features using PEGA PRPC, Java, and REST APIs to automate enterprise billing workflows, reducing processing time by approximately 25%
•	Built and maintained backend logic and UI components supporting large-scale case management systems 
•	Designed and optimized PEGA Report Definitions to retrieve and present structured operational data for workflow tracking 
•	Worked in Agile sprints to implement new features, troubleshoot defects, and resolve production issues to maintain system stability


PROJECTS
Full-Stack AI Web Application – Fluxora AI
React, Node.js, PostgreSQL 
•	Built a full-stack AI-powered web Application enabling users to generate content, images, and resume insights
•	Designed frontend components using React and implemented backend services to handle user requests and data storage
•	Integrated authentication and premium feature access to support multiple user roles
•	Ensured smooth data flow between frontend, backend, and database layers for a reliable user experience

ToDoRails Elite – Enterprise Backend Application
Java 17, Spring Boot, Spring Security, MySQL, Junit, MockMvc, Git
•	Developed a secure RESTful backend application using Java 17 and Spring Boot, implementing JWT-based authentication, role-based access control (RBAC), and BCrypt password encryption
•	Designed a layered architecture (Controller-Service-Repository) following SOLID principles, and implemented input validation, global exception handling, SLF4J logging, and automated unit/integration testing to ensure production-level reliability and maintainability


EDUCATION
Master of Information Technology and Management                                                                                                                       GPA: 3.80
Illinois Institute of Technology, Chicago, IL
December 2025

Bachelor of Technology in Electronics and Communication Engineering                                                                              CGPA: 8.5 / 10
Raghu Institute of Technology, India
April 2022


 CERTIFICATIONS
•	Amazon Junior Software Developer Certificate – Coursera
•	PEGA Certified System Architect (v8.4) & Senior System Architect (v8.6) – UAP, Talent Sprint

`