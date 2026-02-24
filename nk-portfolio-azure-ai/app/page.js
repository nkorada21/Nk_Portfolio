"use client";
import { useState } from "react";



export default function Home() {

    const [menuOpen, setMenuOpen] = useState(false);

    const [messageInput, setMessageInput] = useState('');

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "How can I help you learn more about Narendra and his Resume?" 
        }
        
    ]);

    const submitForm = async (e) => {
        e.preventDefault();
        let newMessages = [...messages, {role: "user", content: messageInput }]
        setMessages(newMessages);
        setMessageInput('');
        const apiMessage = await fetch(
            "/api",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({message: messageInput})
            }
        ).then(res => res.json());
        setMessages([...newMessages, {role: "system", content: apiMessage.message }]);
    }

    const toggleMobileMenu = () => {
        setMenuOpen(!menuOpen);

}

  return (
    <>
      <header>
            <a href="#" className="logo-holder">
            <div className="logo"> NK </div>
                <div className="logo-text">Narendra Korada</div>
            </a>
            <nav>
                <ul id="menu" className={menuOpen ? "active" : ""}>
                    <li>
                        <a href="#Home">Home</a>
                    </li>
                    <li>
                        <a href="#skills">Skills</a>
                    </li>
                    <li>
                        <a href="#projects">Projects</a>
                    </li>
                    <li>
                        <a href="mailto:narendrakorada472@gmail.com" className="button">Contact Me</a>
                    </li>
                </ul>

                <a href="#" className="mobile-toggle" title="Toggle navigation menu" onClick= {toggleMobileMenu} >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
                    </svg>
                </a>

            </nav>
        </header>

        <main>
            <section className="hero container">
                <div className="hero-blue">
                    <div>
                        <h1><small>Hi I'm</small>
                            Narendra Korada
                        </h1>
                        <p>I’m an ITM master’s student at IIT Chicago with skills in Java, Python, JavaScript, SQL, and APIs. 
                            I enjoy solving real-world problems, automating processes, and creating software that works smoothly and efficiently.<br></br>
                            <span>I’m passionate about AI and enjoy creating projects that show how intelligent systems can solve real-world problems.</span>
                        </p>
                        <div className="call-to-action">
                            <a href="./Narendra_Korada_SWE.pdf" className="button black">
                                View Resume
                            </a>
                            <a href="mailto:narendrakorada472@gmail.com" className="button white">
                                Contact Me
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://github.com/nkorada21">
                                <img src="./images/github.png" alt="GitHub" width="48"/>
                            </a>
                            <a href="https://www.linkedin.com/in/narendra-korada-2a3034185/">
                                <img src="./images/linkedin.png" alt="LinkedIn" width="48"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hero-yellow">
                    <img src="./images/image-NK.png" alt="Narendra Korada" width="100%"/>
                </div>
            </section>
            <section className="logos container">
                <div className="marquee">
                    <div className="track">
                        <img src="./images/html.png" alt="HTML" width="128"/>
                        <img src="./images/css.png" alt="CSS" width="128"/>
                        <img src="./images/javascript.png" alt="JavaScript" width="128"/>
                        <img src="./images/Java.png" alt="JAVA" width="128"/>
                        <img src="./images/python.png" alt="Python" width="128"/>
                        <img src="./images/react.png" alt="React" width="128"/>
                        <img src="./images/nextjs.png" alt="NextJS" width="128"/>
                        <img src="./images/azure.png" alt="Azure" width="128"/>
                        <img src="./images/vscode.png" alt="Vscode" width="128"/>
                        <img src="./images/html.png" alt="HTML" width="128"/>
                        <img src="./images/css.png" alt="CSS" width="128"/>
                        <img src="./images/javascript.png" alt="JavaScript" width="128"/>
                        <img src="./images/Java.png" alt="JAVA" width="128"/>
                        <img src="./images/python.png" alt="Python" width="128"/>
                        <img src="./images/react.png" alt="React" width="128"/>
                        <img src="./images/nextjs.png" alt="NextJS" width="128"/>
                        <img src="./images/azure.png" alt="Azure" width="128"/>
                        <img src="./images/vscode.png" alt="Vscode" width="128"/>

                    </div>
                </div>
            </section>
            <section id="skills" className="skills container">
                <h2>
                    <small>About Me</small>
                    Skills & Technologies
                </h2>
                <div className="holder-blue">
                    <div className="left-column">
                        <h3>Frontend</h3>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>React.js</li>
                            <li>Next.js</li>
                            <li>Tailwind CSS</li>
                            {/* <li>Need to add more skills later</li> */}
                        </ul>
                        <h3>Backend</h3>
                        <ul>
                            <li>Java</li>
                            <li>Spring Boot</li>
                            <li>Python</li>
                            <li>REST API</li>
                            <li>MySQL</li>
                            <li>PEGA PRPC</li>
                        </ul>
                    </div>
                    <div className="right-column">
                        <h3>A bit about me</h3>
                        <p>
                            Master’s student in ITM at IIT Chicago with technical strengths in Python, Java, JavaScript, SQL, and HTML/CSS.<br></br>
                            Experienced in API development, backend workflows, database operations, and automation. 
                            Focused on creating scalable, efficient systems with emerging interest in AI and modern software engineering practices.
                        </p>
                            <p>
                                Outside of coding, I enjoy traveling, photography, and learning about the universe - everything from stars and galaxies to how space works.<br></br>
                                I love exploring new technologies and connecting with people who share the same curiosity and passion for innovation.
                            </p>
                    </div>
                </div>
            </section>
            <section className="work-experience container">
                <h2>
                    <small>Recent</small>
                    Work Experience
                </h2>
                <div className="jobs">
                    <article>
                        <figure>
                            <div>
                                <img src="./images/oigetit_cover.jpg" alt="Workplace 1 - Oigetit AI Fact Checker" width="100%" />
                                <figcaption>Workplace 1 - Oigetit AI Fact Checker</figcaption>
                            </div>
                        </figure>
                        <h3>QA Analyst</h3>
                        <div>July 2025 - Nov 2025</div>
                        <p>QA Analyst with hands-on experience testing Oigetit’s AI-powered fact-checking platform. 
                            I performed end-to-end testing, identified critical bugs, validated fixes with developers, and improved overall platform stability.</p>
                    </article>
                    <article>
                        <figure>
                            <div>
                                <img src="./images/HCLTECH.jpg" alt="Workplace 2 - HCL Technologies" width="100%" />
                                <figcaption>Workplace 2 - HCL Technologies</figcaption>
                            </div>
                        </figure>
                        <h3>Software Engineer</h3>
                        <div>Aug 2022 - Jan 2024</div>
                        <p>Software Engineer at HCL Technologies focused on backend development, 
                            workflow automation, and API integration using PEGA and REST services.</p>
                    </article>
                    <article>
                        <figure>
                            <div>
                                <img src="./images/cognizant.jpg" alt="Workplace 2 - Cognizant" width="100%" />
                                <figcaption>Workplace 2 - Cognizant</figcaption>
                            </div>
                        </figure>
                        <h3>Intern - graduate Trainee</h3>
                        <div>Mar 2022 - July 2022</div>
                        <p>PeopleSoft Technical Intern focused on developing backend components, 
                            optimizing Oracle SQL queries, and enhancing HR system workflows. 
                            Gained strong experience in PeopleSoft tools, data integration, and enterprise application support.</p>
                    </article>
                </div>
            </section>

            <section id="projects" className="bento container">
                <h2>
                    <small>
                        Previous
                    </small>
                    Completed Projects
                </h2>
                <div className="bento-grid">

                    <a href="#" className="bento-item" title="Task Management Using SpringBoot">
                        <img src="./images/Application-Dev.png" alt="Task Management Using SpringBoot" width="100%"/>
                    </a>

                    <a href="#" className="bento-item" title="ChatBot Rule Based Application">
                        <img src="./images/Chatbot-AI-dev.png" alt="ChatBot Rule Based Application" width="100%"/>
                    </a>

                    <a href="#" className="bento-item" title="Expense Tracker Application">
                        <img src="./images/Expense-Tracker.png" alt="Expense Tracker Application" width="100%"/>
                    </a>

                    <a href="https://pomodoro-five-theta.vercel.app/" className="bento-item" title="Pomodoro-App">
                        <img src="./images/pomodoro-app.png" alt="Pomodoro-App" width="100%"/>
                    </a>

                    <a href="#" className="bento-item" title="Library Management System Using Java(OOP Concepts)">
                        <img src="./images/Library-Management-System.jpg" alt="Library Management System Using Java(OOP Concepts)" width="100%"/>
                    </a>

                    <a href="https://fluxora-ai.vercel.app/" className="bento-item" title="Fluxora AI">
                        <img src="./images/fluxora-ai.png" alt="Fluxora AI" width="100%"/>
                    </a>

                </div>
            </section>

            <section className="chatbot container">
                <h2>
                    <small>
                        Talk to me
                    </small>
                    Chatbot
                </h2>

            <div className="chatbot-blue">
                <div className="chat-info">
                    <h3>Azure AI Chatbot</h3>
                    <p>Here, I have created a chatbot that is aware of all my abilities, employment history, and a copy of my resume.
                        To learn more about me and my background, you can utilize it to ask me questions. </p>
                    <p>You can also download my resume here if you want to take a look at it. I'm currently looking for new 
                        opportunities so if you have a project you think I'd be a good fit for, please get in touch! </p>
                    <a href="./Narendra_Korada_SWE.pdf" className="button black">Download Resume</a>
                </div>
                <div className="chat-box">
                    <div className="scroll-area">
                        <ul id="chat-log">
                            {
                                messages.map((message, index) => (
                                <li key={index} className={`${message.role}`}>
                                    <span className={`avatar`}>{message.role === 
                                    "user" ? "You" : "AI"}</span>
                                    <div className="message">{message.content}</div>
                                </li>
                                ))}
                        </ul>
                    </div>
                    <form onSubmit={submitForm} className="chat-message">
                        <input type="text"
                        placeholder="Hey Narendra, what skills are you best at?" value={messageInput} onChange={e => setMessageInput(e.target.value)}/>
                        <button className="button black">Send</button>
                    </form>
                </div>
            </div>
            </section>
        </main>
        <footer className="footer">
            <p>&copy; 2025 Narendra Korada. All rights reserved.</p>
        </footer>

    </>
  );
}
