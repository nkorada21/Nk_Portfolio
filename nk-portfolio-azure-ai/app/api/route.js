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
+1 (312) 880-8673 | narendrakorada26@gmail.com | Chicago, IL | linkedin | portfolio | certification

SUMMARY
Software Engineer with experience developing scalable backend systems, full-stack applications, and AI-powered solutions. Skilled in Java,
Python, JavaScript, REST APIs, React, Node.js, and SQL, with proven impact in improving performance 25%+ efficiency gains and user
engagement 30% increase. Experienced in Agile development, testing, and system optimization, delivering reliable, high-quality software solutions.

PROFESSIONAL EXPERIENCE
IT Development Intern, Community Action Scheme Africa (CASAF) | Cameroon
Nov 2025 - Jan 2026
Redesigned tutoring platform UI using user-centric design and AI-driven usability insights, improving accessibility and increasing user
engagement by 30%, while streamlining navigation flows for faster content discovery.
Developed dynamic frontend features using HTML, CSS, and JavaScript, optimizing rendering and form handling, increasing user interaction
rates by 25% and improving page responsiveness across devices.
Performed end-to-end testing and performance optimization, ensuring cross-browser compatibility and responsive design, reducing usability
issues by 20% and improving overall platform reliability and user satisfaction.

Software Engineer Intern, Oigetit – AI Fact Checker | Los Gatos, CA
Jul 2025 - Nov 2025
Conducted functional and UI testing on AI-powered platform, validating NLP model outputs and workflows, identifying 25+ defects,
improving system accuracy and increasing platform stability by 30% across diverse user scenarios.
Designed and executed end-to-end test cases across AI modules, fact-checking systems, and media features, ensuring seamless integration,
consistent functionality, and reducing regression issues in production environments by 20%.
Collaborated with cross-functional teams to validate fixes and enhancements, reducing user-facing defects by 20%, improving product quality,
and accelerating release cycles through structured QA processes and continuous feedback loops.
Developed and maintained automated test scenarios and validation workflows, improving test coverage and execution efficiency by 25%,
ensuring reliable performance and consistent functionality across high-traffic production environments.

Software Engineer, HCL Technologies | Chennai, India
Aug 2022 - Jan 2024
Engineered backend solutions using PEGA PRPC, Java, and REST APIs, automating billing workflows and reducing processing time by 25%,
improving scalability and operational efficiency across enterprise systems.
Developed scalable backend logic and UI components supporting case management systems, ensuring high availability, optimized
performance, and seamless user experience across high-volume enterprise applications.
Optimized PEGA Report Definitions to improve data retrieval efficiency and reporting accuracy, enabling faster decision-making and enhanced
workflow visibility for stakeholders through structured data analysis techniques.
Contributed to Agile sprint cycles, delivering features and resolving defects, improving release velocity and system stability through continuous
integration, testing practices, and collaboration with cross-functional engineering teams.
Diagnosed and resolved production issues using root cause analysis, reducing system downtime by 20%, enhancing application reliability, and
ensuring consistent performance across large-scale enterprise environments.

Software Engineer Intern, Cognizant | India
Jan 2022 - Jul 2022
Developed and enhanced HR management system “PRO_DNA” by building backend forms and data pipelines using PeopleSoft and SQL,
improving data processing efficiency and supporting seamless employee data management workflows.
Optimized complex SQL queries and database operations, improving data retrieval performance by 15%, reducing query execution time, and
enhancing system responsiveness for high-volume HR transactions across enterprise applications.
Participated in Agile ceremonies and collaborated with cross-functional teams to deliver features and resolve issues, improving sprint velocity
by 20% and ensuring timely delivery of high-quality software releases.

PROJECTS
Full-Stack AI Web Application – Fluxora AI
Developed a full-stack AI-powered web application enabling users to generate text, images, and resume insights, enhancing engagement and
productivity through intelligent automation and personalized content generation capabilities.
Engineered responsive React frontend and scalable Node.js/Express backend with MongoDB, implementing secure authentication and role
based access control for efficient user management and secure data handling.
Optimized data flow using RESTful APIs and WebSocket integration, ensuring real-time responsiveness and seamless system communication,
improving overall user experience and increasing user satisfaction ratings by 30%.

Enterprise Case Management & Workflow Automation System
Developed a scalable case management system using Java, REST APIs, and SQL, automating workflow processes and reducing manual task
handling time by 30% across enterprise operations.
Engineered optimized database queries and data pipelines, improving data retrieval performance by 25% and ensuring efficient handling of
high-volume transactional data.
Integrated role-based access control and monitoring dashboards, improving system security, visibility, and operational efficiency, supporting
real-time tracking of workflows and user activities.

CERTIFICATIONS
Java Masterclass 2025: 130+ Hours of Expert Lessons, Udemy
Amazon Junior Software Developer Certificate, Coursera
PEGA Certified System Architect (v8.4) & Senior System Architect (v8.6), UAP, Talent Sprint

EDUCATION
Illinois Institute Of Technology - Master of Information Technology And Management, Management Information Systems Jan 2024- Dec 2025

SKILLS
Programming Languages : Java, Python, JavaScript, SQL, C
Backend Development : Spring Boot, RESTful APIs, Microservices, API Integration, Request/Response Handling, Input Validation,
Exception Handling
Frontend Development : React.js, HTML5, CSS3, Responsive UI Design, DOM Manipulation
Databases : MySQL, Oracle, MongoDB (NoSQL), Database Design, Query Optimization
Enterprise & Low-Code Tools : PEGA PRPC (Case Management, Workflow Automation, Report Definitions)
Software Engineering Concepts : Object-Oriented Programming (OOP), Data Structures & Algorithms, Design Patterns, SOLID Principles
Testing & Quality Assurance : Functional Testing, UI Testing, End-to-End Testing, Bug Tracking, Test Case Design, Production Validation
Tools & Technologies : Git, GitHub, IntelliJ IDEA, Visual Studio Code, Postman
Development Methodologies : Agile, Scrum, CI/CD Fundamentals, Version Control

`