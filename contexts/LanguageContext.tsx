"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    projects: "Projects",
    achievements: "Achievements",
    certificates: "Certificates",
    contact: "Contact",
    downloadCV: "Download CV",
    
    // Hero
    heroName: "Abdulrahman Alnashri",
    heroTitle: "AI & Robotics Engineer",
    heroSubtitle: "Transforming Ideas into Intelligent Solutions",
    heroDescription: "Specialized in AI, Machine Learning, Computer Vision, and Robotics. Building innovative solutions that bridge the gap between technology and real-world impact.",
    exploreWork: "Explore My Work",
    getInTouch: "Get In Touch",
    browseCourses: "Browse Courses",
    
    // About
    aboutTitle: "About Me",
    aboutSubtitle: "Discover My Story",
    aboutBio: "I'm Abdulrahman Alnashri, an AI & Robotics Engineer passionate about creating intelligent systems that solve real-world problems. With expertise in machine learning, computer vision, and autonomous systems, I've supervised award-winning projects including the YAMAMAH Rescue Drone team that won 1st place at WRO Saudi Arabia 2025.",
    technicalArsenalTitle: "Technical Arsenal",
    skillCatAi: "AI & ML",
    skillCatRobotics: "Robotics",
    skillCatVision: "Computer Vision",
    skillCatMlops: "MLOps & Systems",
    skillCatDev: "Development",
    skillCatData: "Data Science",
    bestEngineer2024: "Best Engineer 2024",
    wro2025: "WRO 2025",
    technicalSupervisor: "Technical Supervisor",
    sdaChampion: "SDA Champion",
    weekFive: "Champion of the Week 5",
    smartMethods: "Smart Methods",
    
    // Education
    educationTitle: "Education",
    bscAI: "BSc in Artificial Intelligence",
    universityOfJeddah: "University of Jeddah",
    gpa: "GPA: 4.26/5.0",
    dataBootcamp: "Data Science & AI Bootcamp",
    leWagonSDA: "Le Wagon × Saudi Digital Academy",
    
    // Experience
    experienceTitle: "Experience",
    exp1Title: "Public Relations & Communication",
    exp1Company: "Drone Club",
    exp1Period: "Jul 2024 – Dec 2024 (6 months)",
    exp1Location: "Jeddah, Saudi Arabia · Hybrid",
    exp1Desc: "Managed public relations and presentations for robotics events and workshops",
    
    exp2Title: "Full Stack Robotics Engineering Intern",
    exp2Company: "Smart Methods",
    exp2Period: "Jun 2024 – Aug 2024 (3 months)",
    exp2Location: "Jeddah, Saudi Arabia · On-site",
    exp2Desc: "Comprehensive robotics internship covering mechanical design, electronics, AI/ROS, and web development",
    
    // Projects
    projectsTitle: "Signature Projects",
    projectsSubtitle: "Explore My Work",
    viewGithub: "View on GitHub",
    viewProject: "View Project",
    
    // Project 1 - YAMAMAH
    yamamahTitle: "YAMAMAH Rescue Drone",
    yamamahDesc: "AI-powered search & rescue system integrating GPT-4 Vision, n8n automation, mmWave sensors, and weather intelligence for autonomous emergency response. Supervised the team to victory at WRO Saudi Arabia 2025.",
    yamamahAch1: "🥇 1st Place WRO Saudi Arabia 2025 (Technical Supervisor)",
    yamamahAch2: "🌍 Team represented KSA in Singapore Finals",
    yamamahAch3: "🤖 Autonomous navigation system",
    yamamahAch4: "👁️ Victim detection with computer vision",
    
    // Project 2 - Heritage
    heritageTitle: "Hekaya: AI-Powered Cultural Heritage App",
    heritageDesc: "An intelligent AI-powered application that recognizes Saudi landmarks and generates personalized stories and visual content. Uses YOLOv8 for Lihyanite script detection, Google Gemini for translation and storytelling, and LangChain + Streamlit for real-time interaction.",
    heritageAch1: "🏆 Nominated for presentation at MCIT",
    heritageAch2: "🔍 Smart detection of landmarks and historical texts",
    heritageAch3: "📖 AI-powered personalized cultural storytelling",
    heritageAch4: "🎨 Real-time interactive visual content",
    
    // Project 3 - Football
    footballTitle: "V-TAC: Vision Tactical AI Coach",
    footballDesc: "An AI-powered tactical assistant designed to analyze football matches in real-time and predict player fatigue, game momentum shifts, and match outcomes. Built using AutoGluon, Streamlit, Whisper, and real football data (70K+ matches across 11 leagues).",
    footballAch1: "🏆 Nominated for presentation at MCIT",
    footballAch2: "⚽ Predicts player fatigue and game momentum",
    footballAch3: "📊 Analyzes 70K+ matches across 11 leagues",
    footballAch4: "🎙️ Voice-enabled AI assistant with Whisper",
    
    // Project 4 - Self-Driving Car
    selfDrivingTitle: "Self-Driving Car Using CV, ROS, and Jetson Nano",
    selfDrivingDesc: "A fully functional self-driving car prototype integrating computer vision, robotics, and embedded systems for autonomous navigation. Uses OpenCV for real-time lane detection with sliding window and Bird's Eye View transformation, ROS for node management, and Jetson Nano for processing.",
    selfDrivingAch1: "🚗 Autonomous lane detection and tracking",
    selfDrivingAch2: "👁️ Real-time CV with Bird's Eye View",
    selfDrivingAch3: "🤖 ROS-based control architecture",
    selfDrivingAch4: "🎓 Delivered educational workshop",
    
    // Project 5 - Weather IoT
    weatherIoTTitle: "IoT Weather Monitoring & Analytics System",
    weatherIoTDesc: "Advanced IoT-based weather monitoring system integrating multiple sensors with cloud analytics. Uses ESP32, DHT sensor, rain sensor, dust sensor, and pressure sensor connected to ThingSpeak for real-time data visualization and AI-powered weather analysis.",
    weatherIoTAch1: "🌤️ Real-time weather data visualization",
    weatherIoTAch2: "📊 Multi-sensor integration (Temperature, Humidity, Rain, Dust, Pressure)",
    weatherIoTAch3: "📡 Cloud analytics with ThingSpeak",
    weatherIoTAch4: "🤖 AI-powered weather pattern analysis",
    
    // Project 6 - Mostadaam
    mostadaamTitle: "Mostadaam: Sustainable Waste-to-Rewards Platform",
    mostadaamDesc: "A comprehensive sustainable platform featuring three interfaces: Vending Machines with facial recognition and barcode scanning, Control Room dashboard for monitoring, and Nusuk mobile app integration. Transforms waste into tangible rewards (Zamzam water) and points to encourage pilgrims and visitors to participate in sustainability.",
    mostadaamAch1: "🥇 1st Place Winner - Sustainable Innovation",
    mostadaamAch2: "♻️ Waste-to-rewards system with facial recognition",
    mostadaamAch3: "📱 Integrated with Nusuk app for seamless UX",
    mostadaamAch4: "🎯 Multi-interface platform (Vending, Control Room, Mobile)",
    
    // Project 7 - SABAQ
    sabaqTitle: "SABAQ: Proactive AI Customer Service Agent",
    sabaqDesc: "A functional prototype of an intelligent multi-agent system designed to predict and resolve customer issues. Demonstrates a scalable Agentic AI architecture capable of serving government sectors, with a roadmap to cover 563 services and integrate via REST APIs.",
    sabaqAch1: "🥉 3rd Place - AgentX Hackathon (Team Leader)",
    sabaqAch2: "🤖 Functional Multi-Agent AI Prototype",
    sabaqAch3: "🏗️ Scalable architecture designed for 563+ services",
    sabaqAch4: "🔌 API-first design for future government integration",
    
    // Achievements
    achievementsTitle: "Achievements & Recognition",
    achievementsSubtitle: "Hall of Fame",
    
    // Achievement 1
    ach1Title: "Drones Hackathon Winner",
    ach1Subtitle: "1st Place — Hajj & Umrah Track (Nov 2024)",
    ach1Desc: "Won 1st Place at University of Jeddah Drones Hackathon with Sidan project, using smart technologies to serve pilgrims and enhance their safety.",
    
    // Achievement 2
    ach2Title: "WRO Saudi Arabia 2025",
    ach2Subtitle: "Technical Supervisor — Yamama Rescue Drone",
    ach2Desc: "Supervised the winning team that secured 1st Place in World Robot Olympiad Saudi Arabia and represented KSA in Singapore Finals.",
    
    // Achievement 3
    ach3Title: "Best Engineer Award 2024",
    ach3Subtitle: "Smart Methods — Full Stack Robotics (Aug 2024)",
    ach3Desc: "Awarded Best Engineer 2024 for outstanding technical excellence across all tracks, standing out among trainees from various countries.",
    
    // Achievement 4
    ach4Title: "SDA Champion of the Week",
    ach4Subtitle: "Data Science Bootcamp — Week 5 (Apr 2025)",
    ach4Desc: "Recognized as Champion of the Week 5 in Saudi Digital Academy Data Science Bootcamp by Le Wagon.",
    
    // Achievement 5
    ach5Title: "Social Media Award",
    ach5Subtitle: "Smart Methods — Community Engagement (Aug 2024)",
    ach5Desc: "Recognized for effectively engaging the community through social media, showcasing innovative projects and collaborative efforts.",
    
    // Achievement 6
    ach6Title: "Robotics Workshop Instructor",
    ach6Subtitle: "Exploring Robotics — Hands-on Learning",
    ach6Desc: "Conducted first workshop guiding participants through building robots from scratch, supported by Drone Club and Smart Methods.",
    
    // Achievement 7
    ach7Title: "Smart Methods Hackathon",
    ach7Subtitle: "2nd Place — 4-Hour Challenge (Nov 2024)",
    ach7Desc: "Secured 2nd Place in intense 4-hour hackathon at THE SHOP FLOOR opening with Minister of Industry. Built solution using S-to-T, T-to-S, 3D Face, and OpenCV technologies.",
    
    // Achievement 8
    ach8Title: "AgentX Hackathon Winner",
    ach8Subtitle: "3rd Place — Team Leader (2025)",
    ach8Desc: "Led team to 3rd place at AgentX Hackathon with SABAQ project - a functional AI prototype demonstrating scalable Multi-Agent Architecture designed for future integration with government services.",
    
    // Courses
    coursesTitle: "Courses",
    coursesSubtitle: "Learn With Me",
    coursesIntro: "Self-paced courses I built from real project experience. Each module is a video plus slides plus a short reflection quiz. Sign up once and your progress is saved.",
    viewCourse: "View Course",
    enrollNow: "Enroll Now",
    continueLearning: "Continue Learning",
    courseLevel: "Level",
    courseDuration: "Duration",
    courseModules: "Modules",
    aboutCourse: "About this course",
    backToCourses: "Back to courses",
    backToCourse: "Back to course",
    moduleLocked: "Locked — finish previous module first",
    moduleCompleted: "Completed",
    moduleCurrent: "In progress",
    progressLabel: "Progress",
    // Course: Drone 360°
    drone360Title: "Drone 360°",
    drone360Desc: "Slides + a short reflection quiz. Register once and your progress is saved.",
    drone360About: "A 3-day camp covering drone fundamentals, simulation and programmatic control, and a final project. We start from UAV/UAS basics and quadcopter mechanics, move into simulation with PX4 + jMAVSim + QGroundControl + MAVSDK, and wrap up with a mini-project you build, present, and defend. No prior experience required.",
    drone360Mod1Title: "Day 1 — Drone Fundamentals & System Architecture",
    drone360Mod1Desc: "Start with the basics: drone components, systems, and how it moves.",
    drone360Mod1Q1: "Rate the clarity of this video",
    drone360Mod1Q2: "Did you understand the content?",
    drone360Mod1Q3: "Any feedback on this video? (optional)",
    drone360Mod2Title: "Day 2 — Simulation & Programmatic Control",
    drone360Mod2Desc: "Move to practice: run a simulation and control the drone with code.",
    drone360Mod2Q1: "Rate the clarity of this video",
    drone360Mod2Q2: "Did you understand the content?",
    drone360Mod2Q3: "Any feedback on this video? (optional)",
    drone360Mod3Title: "Day 3 — Projects & Final Presentation",
    drone360Mod3Desc: "Apply and ship: build your project and present it on the closing day.",
    drone360Mod3Q1: "Rate the clarity of this video",
    drone360Mod3Q2: "Did you understand the content?",
    drone360Mod3Q3: "Any feedback on this video? (optional)",
    // Course registration
    registrationTitle: "Register to start the course",
    registrationDesc: "I read every registration personally — share a bit about your background so I can shape future content for people like you.",
    fullName: "Full name",
    fullNamePlaceholder: "Your full name",
    universityField: "University / Institution",
    universityPlaceholder: "Pick your university",
    universityOtherOption: "Other",
    universityOtherPlaceholder: "Type your university / institution",
    majorField: "Major / Specialization",
    majorPlaceholder: "Pick your major",
    majorOtherOption: "Other",
    majorOtherPlaceholder: "Type your major / specialization",
    comboboxSearchPlaceholder: "Search…",
    uniSectorGov: "Government",
    uniSectorPrivate: "Private",
    levelField: "Educational stage",
    levelSecondary: "Secondary school",
    levelDiploma: "Diploma",
    levelBachelor: "Bachelor's",
    levelGraduate: "Graduate",
    levelEmployee: "Employee",
    levelOther: "Other",
    agreementText: "I agree to register and start the course",
    submitRegistration: "Start the course",
    registrationSending: "Submitting…",
    registrationSuccess: "You're in! Loading the course…",
    registrationError: "Something went wrong. Please try again or email me directly.",
    // Quiz multi-choice options (reused across modules)
    understoodYes: "Yes",
    understoodAlmost: "Almost",
    understoodNo: "No",
    benefitYesVery: "Yes, very much",
    benefitYes: "Yes",
    benefitAverage: "Somewhat",
    benefitNo: "No",
    recommendYes: "Yes",
    recommendMaybe: "Maybe",
    recommendNo: "No",
    quizFreeTextPlaceholder: "Optional comment…",
    // Final evaluation
    finalEvalTitle: "Final course evaluation",
    finalEvalSubtitle: "One last set of questions before we wrap up. Your feedback shapes the next cohort.",
    finalEvalQ1Overall: "Your overall rating of the course",
    finalEvalQ2Benefit: "Did you benefit from the course?",
    finalEvalQ3Recommend: "Would you recommend it to others?",
    finalEvalQ4Comments: "Any comments or suggestions? (optional)",
    finalEvalSubmit: "Submit evaluation",
    finalEvalSubmitted: "Saved. Wrapping up…",
    // Course sponsors
    courseSponsorsTitle: "Course Sponsors",
    // Course player
    playerNowPlaying: "Now playing",
    playerSlides: "Slides",
    playerNoSlides: "No slides for this module",
    playerCompleteAndContinue: "I watched it — take the quick quiz",
    playerNextModule: "Next module",
    playerCourseFinished: "You finished the course! Thank you for learning with me.",
    // Quiz
    quizTitle: "Quick reflection",
    quizSubtitle: "3 questions, 1–5 scale. Honest answers help me improve future modules.",
    quizScale1: "Not at all",
    quizScale5: "Very much",
    quizSubmit: "Submit & continue",
    quizSending: "Saving…",
    quizSubmitted: "Saved. Unlocking next module…",
    quizSubmitError: "Couldn't save your answers. Try again.",
    quizRetake: "Retake quiz",

    // Certificates
    certificatesTitle: "Certificates & Training",
    certificatesSubtitle: "Training Records",
    continuousLearning: "Continuous learning through industry-recognized certifications in AI, Robotics, Computer Vision, and Data Science from leading institutions.",
    viewCertificate: "View Certificate",
    totalCertificates: "Total Certificates",
    institutions: "Institutions",
    trainingHours: "Training Hours",
    specializations: "Specializations",

    // Certificate entries
    tvtcRoboticsCertTitle: "Full Stack Robotics Engineer",
    tvtcRoboticsCertIssuer: "TVTC",
    tvtcRoboticsCertDesc: "Comprehensive robotics engineering program covering design, assembly, ROS, and AI integration.",
    smartMethodsRoboticsCertTitle: "Robotics and Artificial Intelligence",
    smartMethodsRoboticsCertIssuer: "Smart Methods",
    smartMethodsRoboticsCertDesc: "Advanced training in robotics systems and AI implementation.",
    tvtcDataScienceCertTitle: "Data Science and Machine Learning",
    tvtcDataScienceCertIssuer: "TVTC",
    tvtcDataScienceCertDesc: "Comprehensive data science and machine learning certification.",
    mcitJrDataScientistCertTitle: "MCIT Jr Data Scientist",
    mcitJrDataScientistCertIssuer: "INE",
    mcitJrDataScientistCertDesc: "Ministry of Communications and IT certified data scientist program.",
    lewagonBootcampCertTitle: "Data Science Bootcamp Diploma",
    lewagonBootcampCertIssuer: "Le Wagon",
    lewagonBootcampCertDesc: "Intensive data science bootcamp covering Python, ML, and data analytics.",
    sdaQ1DataScienceCertTitle: "Data Science 2025 Q1",
    sdaQ1DataScienceCertIssuer: "Saudi Digital Academy",
    sdaQ1DataScienceCertDesc: "Advanced data science program with hands-on projects and industry applications.",

    // Contact
    contactTitle: "Get In Touch",
    contactSubtitle: "Communication Hub",
    contactDescription: "Interested in collaboration, have a project idea, or just want to connect? Feel free to reach out. Let's build something amazing together!",
    contactInfo: "Contact Information",
    email: "Email",
    location: "Location",
    saudiArabia: "Saudi Arabia",
    connectWithMe: "Connect With Me",
    sendMessage: "Send a Message",
    name: "Name",
    yourName: "Your name",
    yourEmail: "your.email@example.com",
    message: "Message",
    yourMessage: "Your message...",
    send: "Send Message",
    
    // Stats
    projectsCount: "Projects",
    awardsCount: "Awards",
    certificatesCount: "Certificates",
    gpaLabel: "GPA",
    firstPlaceAwards: "1st Place Awards",
    secondPlaceAwards: "2nd Place Awards",
    specialRecognition: "Special Recognition",
    totalAchievements: "Total Achievements",
    
    // Footer
    footerText: "© 2025 Abdulrahman Alnashri | Galactic AI Engineer",
    builtWith: "Built with",
    myCV: "My CV",
    sending: "Sending…",
    messageSent: "Message sent! I'll get back to you soon.",
    messageError: "Something went wrong. Please email me directly.",
    backHome: "Back to home",
    pageNotFound: "Lost in space — page not found.",

    // Project detail page
    backToProjects: "Back to projects",
    aboutProject: "About this project",
    keyHighlights: "Key Highlights",
    techStack: "Tech Stack",
    role: "Role",
    year: "Year",
    watchVideo: "Watch Video",
    viewOnGithub: "View on GitHub",
    liveDemo: "Live Demo",
    viewDetails: "View Details",
    relatedProjects: "Other Projects",

    // Achievement detail page
    backToAchievements: "Back to achievements",
    aboutAchievement: "About this achievement",
    recognition: "Recognition",
    relatedProject: "Related Project",
    otherAchievements: "Other Achievements",

    // Navigation Planets
    terranStation: "Terran Station",
    homeBase: "Home Base - Start Your Journey",
    iceWorld: "Ice World",
    darkMatter: "Dark Matter",
    lavaPlanet: "Lava Planet",
    crystalMoon: "Crystal Moon",
    workStation: "Work Station",
    outpost: "Outpost",
    navigate: "Navigate",
    
    // News
    newsTitle: "Latest Updates",
    newsSubtitle: "News & Insights",
    
    // Work With Me
    workWithMeTitle: "Work With Me",
    workWithMeSubtitle: "Let's Build Something Amazing Together",
    workWithMeIntro: "I'm available for freelance projects, consulting, and collaboration opportunities. With expertise in AI, Robotics, and Machine Learning, I can help bring your innovative ideas to life.",
    aiDevelopment: "AI Development",
    aiDevelopmentDesc: "Custom AI solutions, machine learning models, and intelligent systems tailored to your business needs.",
    roboticsEngineering: "Robotics Engineering",
    roboticsEngineeringDesc: "End-to-end robotics solutions from design to deployment, including autonomous systems and computer vision.",
    mlSolutions: "ML Solutions",
    mlSolutionsDesc: "Data analysis, predictive modeling, and machine learning pipelines for actionable insights.",
    consultingMentoring: "Consulting & Mentoring",
    consultingMentoringDesc: "Technical guidance, code reviews, and mentorship for AI/Robotics projects and teams.",
    scheduleCall: "Schedule a Call",
    availableForWork: "Available for Projects",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    about: "عني",
    projects: "المشاريع",
    achievements: "الإنجازات",
    certificates: "الشهادات",
    contact: "تواصل",
    downloadCV: "تحميل السيرة الذاتية",
    
    // Hero
    heroName: "عبدالرحمن الناشري",
    heroTitle: "مهندس ذكاء اصطناعي وروبوتات",
    heroSubtitle: "تحويل الأفكار إلى حلول ذكية",
    heroDescription: "متخصص في AI، Machine Learning، Computer Vision، والروبوتات. أبني حلول مبتكرة تربط بين التكنولوجيا والتأثير الواقعي.",
    exploreWork: "استكشف أعمالي",
    getInTouch: "تواصل معي",
    browseCourses: "تصفّح الكورسات",
    viewProjects: "عرض المشاريع",
    
    // About
    aboutTitle: "عني",
    aboutSubtitle: "اكتشف قصتي",
    aboutBio: "أنا عبدالرحمن الناشري، مهندس AI وروبوتات شغوف بإنشاء أنظمة ذكية تحل المشاكل الواقعية. بخبرة في Machine Learning، Computer Vision، والأنظمة المستقلة، أشرفت على مشاريع حائزة على جوائز منها فريق طائرة يمامة للإنقاذ الذي فاز بالمركز الأول في WRO السعودية 2025.",
    skills: "المهارات",
    experience: "الخبرة",
    technicalArsenal: "الترسانة التقنية",
    skillCatAi: "الذكاء الاصطناعي والتعلم الآلي",
    skillCatRobotics: "الروبوتات",
    skillCatVision: "الرؤية الحاسوبية",
    skillCatMlops: "MLOps والأنظمة",
    skillCatDev: "التطوير",
    skillCatData: "علم البيانات",
    smartMethods: "Smart Methods",
    wro2025: "WRO 2025",
    technicalSupervisor: "مرشد تقني",
    sdaChampion: "بطل SDA",
    weekFive: "بطل الأسبوع الخامس",
    
    // Education
    educationTitle: "التعليم",
    bscAI: "بكالوريوس في الذكاء الاصطناعي",
    universityOfJeddah: "جامعة جدة",
    gpa: "المعدل: 4.26 من 5.0",
    dataBootcamp: "معسكر علم البيانات والذكاء الاصطناعي",
    leWagonSDA: "Le Wagon × الأكاديمية السعودية الرقمية",
    
    // Experience
    experienceTitle: "الخبرة",
    exp1Title: "العلاقات العامة والتواصل",
    exp1Company: "Drone Club",
    exp1Period: "يوليو 2024 – ديسمبر 2024 (6 أشهر)",
    exp1Location: "جدة، السعودية · مختلط",
    exp1Desc: "إدارة العلاقات العامة والعروض التقديمية لفعاليات وورش الروبوتات",
    
    exp2Title: "متدرب هندسة روبوتات شاملة",
    exp2Company: "الأساليب الذكية Smart Methods",
    exp2Period: "يونيو 2024 – أغسطس 2024 (3 أشهر)",
    exp2Location: "جدة، السعودية · من المقر",
    exp2Desc: "تدريب شامل في الروبوتات يغطي التصميم الميكانيكي، الإلكترونيات، AI/ROS، وتطوير الويب",
    
    // Projects
    projectsTitle: "المشاريع المميزة",
    projectsSubtitle: "استكشف أعمالي",
    viewGithub: "عرض على GitHub",
    viewProject: "عرض المشروع",
    technologies: "التقنيات",
    
    // Project 1 - YAMAMAH
    yamamahTitle: "طائرة يمامة للإنقاذ",
    yamamahDesc: "نظام بحث وإنقاذ مدعوم بـ AI يدمج GPT-4 Vision، أتمتة n8n، مستشعرات mmWave، وذكاء الطقس للاستجابة الطارئة المستقلة. أشرفت على الفريق للفوز في WRO السعودية 2025.",
    yamamahAch1: "🥇 المركز الأول WRO السعودية 2025 (مرشد تقني)",
    yamamahAch2: "🌍 الفريق مثل المملكة في نهائيات سنغافورة",
    yamamahAch3: "🤖 نظام ملاحة مستقل",
    yamamahAch4: "👁️ كشف ضحايا بالرؤية الحاسوبية",
    
    // Project 2 - Heritage
    heritageTitle: "Hekaya: تطبيق التراث الثقافي بـ AI",
    heritageDesc: "تطبيق ذكي مدعوم بـ AI يتعرف على المعالم السعودية ويولد قصصاً مخصصة ومحتوى بصري. يستخدم YOLOv8 لاكتشاف النصوص اللحيانية، Google Gemini للترجمة وسرد القصص، وLangChain + Streamlit للتفاعل الفوري.",
    heritageAch1: "🏆 تم ترشيحه للعرض في وزارة الاتصالات وتقنية المعلومات",
    heritageAch2: "🔍 كشف ذكي للمعالم والنصوص التاريخية",
    heritageAch3: "📖 توليد قصص ثقافية مخصصة بـ AI",
    heritageAch4: "🎨 محتوى بصري تفاعلي في الوقت الفعلي",
    
    // Project 3 - Football
    footballTitle: "V-TAC: مساعد تكتيكي ذكي لكرة القدم",
    footballDesc: "مساعد تكتيكي مدعوم بـ AI مصمم لتحليل مباريات كرة القدم في الوقت الفعلي والتنبؤ بإرهاق اللاعبين، تحولات زخم المباراة، ونتائج المباريات. مبني باستخدام AutoGluon، Streamlit، Whisper، وبيانات حقيقية (+70 ألف مباراة عبر 11 دوري).",
    footballAch1: "🏆 تم ترشيحه للعرض في وزارة الاتصالات وتقنية المعلومات",
    footballAch2: "⚽ تنبؤ بإرهاق اللاعبين وزخم المباراة",
    footballAch3: "📊 تحليل +70 ألف مباراة عبر 11 دوري",
    footballAch4: "🎙️ مساعد صوتي ذكي بـ Whisper",
    
    // Project 4 - Self-Driving Car
    selfDrivingTitle: "سيارة ذاتية القيادة باستخدام CV، ROS، وJetson Nano",
    selfDrivingDesc: "نموذج سيارة ذاتية القيادة متكامل يدمج Computer Vision، الروبوتات، والأنظمة المدمجة للملاحة المستقلة. يستخدم OpenCV لكشف المسارات في الوقت الفعلي مع تحويل Bird's Eye View، ROS لإدارة العقد، وJetson Nano للمعالجة.",
    selfDrivingAch1: "🚗 كشف وتتبع مسارات مستقل",
    selfDrivingAch2: "👁️ رؤية حاسوبية في الوقت الفعلي مع Bird's Eye View",
    selfDrivingAch3: "🤖 معمارية تحكم قائمة على ROS",
    selfDrivingAch4: "🎓 قدمت ورشة عمل تعليمية",
    
    // Project 5 - Weather IoT
    weatherIoTTitle: "نظام مراقبة وتحليل الطقس بـ IoT",
    weatherIoTDesc: "نظام مراقبة طقس متقدم قائم على IoT يدمج عدة مستشعرات مع تحليلات سحابية. يستخدم ESP32، مستشعر DHT، مستشعر المطر، مستشعر الغبار، ومستشعر الضغط متصلة بـ ThingSpeak لعرض البيانات في الوقت الفعلي وتحليل الطقس بـ AI.",
    weatherIoTAch1: "🌤️ عرض بيانات الطقس في الوقت الفعلي",
    weatherIoTAch2: "📊 تكامل متعدد المستشعرات (حرارة، رطوبة، مطر، غبار، ضغط)",
    weatherIoTAch3: "📡 تحليلات سحابية مع ThingSpeak",
    weatherIoTAch4: "🤖 تحليل أنماط الطقس بـ AI",
    
    // Project 6 - Mostadaam
    mostadaamTitle: "مستدام: منصة تحويل النفايات إلى مكافآت",
    mostadaamDesc: "منصة استدامة شاملة تتكون من ثلاث واجهات: آلات البيع بالتعرف على الوجه ومسح الباركود، لوحة تحكم لغرفة المراقبة، وتكامل مع تطبيق نسك. تحول النفايات إلى مكافآت ملموسة (ماء زمزم) ونقاط لتشجيع الحجاج والزوار على المشاركة في الاستدامة.",
    mostadaamAch1: "🥇 المركز الأول - ابتكار الاستدامة",
    mostadaamAch2: "♻️ نظام تحويل النفايات مع التعرف على الوجه",
    mostadaamAch3: "📱 متكامل مع تطبيق نسك لتجربة سلسة",
    mostadaamAch4: "🎯 منصة متعددة الواجهات (آلات، غرفة تحكم، جوال)",
    
    // Project 7 - SABAQ
    sabaqTitle: "سَبَق: الوكيل الذكي الاستباقي لخدمة العملاء",
    sabaqDesc: "نموذج أولي وظيفي لنظام متعدد الوكلاء الأذكياء مصمم للتنبؤ بمشاكل العملاء. يستعرض معمارية ذكاء اصطناعي توكيلي قابلة للتوسع لخدمة القطاعات الحكومية، مع خطة مستقبلية لتغطية 563 خدمة والربط عبر REST APIs.",
    sabaqAch1: "🥉 المركز الثالث - هاكثون AgentX (قائد الفريق)",
    sabaqAch2: "🤖 نموذج أولي لنظام Multi-Agent AI",
    sabaqAch3: "🏗️ بنية تحتية مصممة لتغطية 563+ خدمة مستقبلاً",
    sabaqAch4: "🔌 تصميم يعتمد على APIs لتسهيل التكامل الحكومي",
    
    // Achievements
    achievementsTitle: "الإنجازات والتقدير",
    achievementsSubtitle: "قاعة المجد",
    
    // Achievement 1
    ach1Title: "فائز هاكثون الدرونز",
    ach1Subtitle: "المركز الأول — مسار الحج والعمرة (نوفمبر 2024)",
    ach1Desc: "فزت بالمركز الأول في هاكثون الدرونز بجامعة جدة بمشروع سِدان، باستخدام التقنيات الذكية لخدمة الحجاج وتعزيز سلامتهم.",
    
    // Achievement 2
    ach2Title: "WRO السعودية 2025",
    ach2Subtitle: "مرشد تقني — طائرة يمامة للإنقاذ",
    ach2Desc: "أشرفت على الفريق الفائز بالمركز الأول في أولمبياد الروبوت العالمي السعودية والذي مثل المملكة في نهائيات سنغافورة.",
    
    // Achievement 3
    ach3Title: "أفضل مهندس 2024",
    ach3Subtitle: "Smart Methods — Full Stack Robotics (أغسطس 2024)",
    ach3Desc: "حصلت على لقب أفضل مهندس 2024 للتميز التقني عبر جميع المسارات، متفوقاً على المتدربين من دول مختلفة.",
    
    // Achievement 4
    ach4Title: "بطل الأسبوع SDA",
    ach4Subtitle: "Data Science Bootcamp — الأسبوع الخامس (أبريل 2025)",
    ach4Desc: "تم تكريمي كبطل الأسبوع الخامس في برنامج Saudi Digital Academy لعلم البيانات من Le Wagon.",
    
    // Achievement 5
    ach5Title: "جائزة وسائل التواصل الاجتماعي",
    ach5Subtitle: "Smart Methods — التفاعل المجتمعي (أغسطس 2024)",
    ach5Desc: "تم تكريمي للتفاعل الفعال مع المجتمع عبر وسائل التواصل، وعرض المشاريع المبتكرة والجهود التعاونية.",
    
    // Achievement 6
    ach6Title: "مدرب ورشة الروبوتات",
    ach6Subtitle: "استكشاف الروبوتات — تعلم عملي",
    ach6Desc: "قدمت أول ورشة عمل لتوجيه المشاركين في بناء الروبوتات من الصفر، بدعم من Drone Club وSmart Methods.",
    
    // Achievement 7
    ach7Title: "هاكثون Smart Methods",
    ach7Subtitle: "المركز الثاني — تحدي 4 ساعات (نوفمبر 2024)",
    ach7Desc: "حصلت على المركز الثاني في هاكثون مكثف لمدة 4 ساعات في افتتاح THE SHOP FLOOR بحضور وزير الصناعة. بنيت حل باستخدام S-to-T، T-to-S، 3D Face، وOpenCV.",
    
    // Achievement 8
    ach8Title: "فائز هاكثون AgentX",
    ach8Subtitle: "المركز الثالث — قائد الفريق (2025)",
    ach8Desc: "قدت الفريق للمركز الثالث في هاكثون AgentX بمشروع سَبَق - نموذج أولي للذكاء الاصطناعي يستعرض معمارية متعددة الوكلاء قابلة للتوسع ومصممة للتكامل المستقبلي مع الخدمات الحكومية.",
    
    // Courses
    coursesTitle: "الكورسات",
    coursesSubtitle: "تعلّم معي",
    coursesIntro: "كورسات بنيتها من خبرتي العملية في مشاريع حقيقية. كل وحدة تتكون من فيديو + سلايدز + كويز قصير للتقييم. سجّل مرة وتقدمك يُحفظ.",
    viewCourse: "عرض الكورس",
    enrollNow: "سجّل الآن",
    continueLearning: "أكمل التعلم",
    courseLevel: "المستوى",
    courseDuration: "المدة",
    courseModules: "الوحدات",
    aboutCourse: "عن هذا الكورس",
    backToCourses: "العودة للكورسات",
    backToCourse: "العودة للكورس",
    moduleLocked: "مغلق — أكمل الوحدة السابقة أولاً",
    moduleCompleted: "مكتمل",
    moduleCurrent: "قيد التعلم",
    progressLabel: "التقدم",
    // Course: Drone 360°
    drone360Title: "درون 360°",
    drone360Desc: "سلايدات + كويز قصير للتقييم. سجّل مرة وتقدّمك يُحفظ.",
    drone360About: "معسكر 3 أيام يغطي أساسيات الدرونز، المحاكاة والتحكم البرمجي، ومشروع تطبيقي ختامي. نبدأ من معنى UAV/UAS وحركة الـ Quadcopter، ننتقل إلى المحاكاة باستخدام PX4 و jMAVSim و QGroundControl و MAVSDK، ثم نختم بمشروع مصغّر تبنيه وتعرضه. لا تحتاج خبرة سابقة.",
    drone360Mod1Title: "اليوم الأول — أساسيات الدرونز وبنية النظام",
    drone360Mod1Desc: "ابدأ من الأساسيات: افهم مكونات الدرون، أنظمته، وطريقة حركته.",
    drone360Mod1Q1: "قيّم وضوح المقطع",
    drone360Mod1Q2: "هل فهمت محتوى المقطع؟",
    drone360Mod1Q3: "ملاحظتك على المقطع؟ (اختياري)",
    drone360Mod2Title: "اليوم الثاني — المحاكاة والتحكم البرمجي",
    drone360Mod2Desc: "انتقل للتطبيق: شغّل المحاكاة وتحكم بالدرون برمجيًا.",
    drone360Mod2Q1: "قيّم وضوح المقطع",
    drone360Mod2Q2: "هل فهمت محتوى المقطع؟",
    drone360Mod2Q3: "ملاحظتك على المقطع؟ (اختياري)",
    drone360Mod3Title: "اليوم الثالث — المشاريع والعرض النهائي",
    drone360Mod3Desc: "طبّق وتحدّى: ابنِ مشروعك واعرضه في اليوم الختامي.",
    drone360Mod3Q1: "قيّم وضوح المقطع",
    drone360Mod3Q2: "هل فهمت محتوى المقطع؟",
    drone360Mod3Q3: "ملاحظتك على المقطع؟ (اختياري)",
    // Course registration
    registrationTitle: "فورم التسجيل",
    registrationDesc: "أقرأ كل تسجيل بنفسي — شاركني معلومة بسيطة عن خلفيتك حتى أستطيع تطوير المحتوى لمن يشبهك.",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "اسمك الكامل",
    universityField: "الجامعة / الجهة",
    universityPlaceholder: "اختر جامعتك",
    universityOtherOption: "أخرى",
    universityOtherPlaceholder: "اكتب الجامعة / الجهة",
    majorField: "التخصص",
    majorPlaceholder: "اختر تخصصك",
    majorOtherOption: "أخرى",
    majorOtherPlaceholder: "اكتب التخصص",
    comboboxSearchPlaceholder: "ابحث…",
    uniSectorGov: "حكومي",
    uniSectorPrivate: "أهلي",
    levelField: "المرحلة الدراسية",
    levelSecondary: "ثانوي",
    levelDiploma: "دبلوم",
    levelBachelor: "بكالوريوس",
    levelGraduate: "خريج",
    levelEmployee: "موظف",
    levelOther: "أخرى",
    agreementText: "أوافق على التسجيل وبدء الدورة",
    submitRegistration: "ابدأ الدورة",
    registrationSending: "جاري الإرسال…",
    registrationSuccess: "تمام! جاري فتح الكورس…",
    registrationError: "حصل خطأ. حاول مرة ثانية أو راسلني مباشرة.",
    // Quiz multi-choice options (reused across modules)
    understoodYes: "نعم",
    understoodAlmost: "تقريبًا",
    understoodNo: "لا",
    benefitYesVery: "نعم جدًا",
    benefitYes: "نعم",
    benefitAverage: "متوسط",
    benefitNo: "لا",
    recommendYes: "نعم",
    recommendMaybe: "ربما",
    recommendNo: "لا",
    quizFreeTextPlaceholder: "ملاحظة اختيارية…",
    // Final evaluation
    finalEvalTitle: "تقييم الكورس النهائي",
    finalEvalSubtitle: "أسئلة أخيرة قبل الختام. ملاحظاتك تشكّل الدفعة القادمة.",
    finalEvalQ1Overall: "تقييمك للكورس كامل",
    finalEvalQ2Benefit: "هل استفدت من الكورس؟",
    finalEvalQ3Recommend: "هل تنصح فيه غيرك؟",
    finalEvalQ4Comments: "ملاحظات أو اقتراحات (اختياري)",
    finalEvalSubmit: "إرسال التقييم",
    finalEvalSubmitted: "تم الحفظ. جاري الإنهاء…",
    // Course sponsors
    courseSponsorsTitle: "رعاة الكورس",
    // Course player
    playerNowPlaying: "قيد المشاهدة الآن",
    playerSlides: "السلايدز",
    playerNoSlides: "لا توجد سلايدز لهذه الوحدة",
    playerCompleteAndContinue: "شاهدت — خذني للكويز",
    playerNextModule: "الوحدة التالية",
    playerCourseFinished: "أكملت الكورس! شكراً لتعلمك معي.",
    // Quiz
    quizTitle: "تقييم سريع",
    quizSubtitle: "3 أسئلة، مقياس 1–5. إجاباتك الصادقة تساعدني أحسّن الوحدات القادمة.",
    quizScale1: "أبداً",
    quizScale5: "جداً",
    quizSubmit: "إرسال ومتابعة",
    quizSending: "جاري الحفظ…",
    quizSubmitted: "تم الحفظ. جاري فتح الوحدة التالية…",
    quizSubmitError: "ما قدرنا نحفظ إجاباتك. حاول مرة ثانية.",
    quizRetake: "إعادة الكويز",

    // Certificates
    certificatesTitle: "الشهادات والتدريب",
    certificatesSubtitle: "سجلات التدريب",
    viewCertificate: "عرض الشهادة",

    // Certificate entries
    tvtcRoboticsCertTitle: "مهندس روبوتات شامل",
    tvtcRoboticsCertIssuer: "TVTC",
    tvtcRoboticsCertDesc: "برنامج هندسة روبوتات شامل يغطي التصميم والتجميع وROS وتكامل الذكاء الاصطناعي.",
    smartMethodsRoboticsCertTitle: "الروبوتات والذكاء الاصطناعي",
    smartMethodsRoboticsCertIssuer: "Smart Methods",
    smartMethodsRoboticsCertDesc: "تدريب متقدم في أنظمة الروبوتات وتطبيق الذكاء الاصطناعي.",
    tvtcDataScienceCertTitle: "علم البيانات والتعلم الآلي",
    tvtcDataScienceCertIssuer: "TVTC",
    tvtcDataScienceCertDesc: "شهادة شاملة في علم البيانات والتعلم الآلي.",
    mcitJrDataScientistCertTitle: "MCIT Jr Data Scientist",
    mcitJrDataScientistCertIssuer: "INE",
    mcitJrDataScientistCertDesc: "برنامج عالم بيانات معتمد من وزارة الاتصالات وتقنية المعلومات.",
    lewagonBootcampCertTitle: "دبلومة معسكر علم البيانات",
    lewagonBootcampCertIssuer: "Le Wagon",
    lewagonBootcampCertDesc: "معسكر مكثف في علم البيانات يغطي Python والتعلم الآلي وتحليل البيانات.",
    sdaQ1DataScienceCertTitle: "علم البيانات 2025 Q1",
    sdaQ1DataScienceCertIssuer: "الأكاديمية السعودية الرقمية",
    sdaQ1DataScienceCertDesc: "برنامج متقدم في علم البيانات بمشاريع عملية وتطبيقات صناعية.",

    // Contact
    contactTitle: "تواصل معي",
    contactSubtitle: "مركز الاتصالات",
    contactDescription: "مهتم بالتعاون، لديك فكرة مشروع، أو تريد التواصل فقط؟ لا تتردد في التواصل. لنبني شيئاً رائعاً معاً!",
    contactInfo: "معلومات التواصل",
    email: "البريد الإلكتروني",
    location: "الموقع",
    saudiArabia: "المملكة العربية السعودية",
    connectWithMe: "تواصل معي",
    sendMessage: "إرسال رسالة",
    name: "الاسم",
    yourName: "اسمك",
    yourEmail: "بريدك@example.com",
    message: "الرسالة",
    yourMessage: "رسالتك...",
    send: "إرسال الرسالة",
    
    // Planet Navigation
    navigateGalaxy: "تنقل في المجرة",
    clickPlanet: "اضغط على كوكب للسفر",
    pressEsc: "اضغط ESC أو اضغط خارجاً للإغلاق",
    
    // Stats
    projectsCount: "مشاريع",
    awardsCount: "جوائز",
    certificatesCount: "شهادات",
    gpaLabel: "المعدل",
    
    // About Section Stats
    technicalArsenalTitle: "الترسانة التقنية",
    bestEngineer2024: "أفضل مهندس 2024",
    wro2025Winner: "فائز WRO 2025",
    teamSupervisor: "مشرف فريق",
    
    // Achievements Stats
    firstPlaceAwards: "جوائز المركز الأول",
    secondPlaceAwards: "جوائز المركز الثاني",
    specialRecognition: "تقدير خاص",
    totalAchievements: "إجمالي الإنجازات",
    
    // Certificates Stats
    totalCertificates: "إجمالي الشهادات",
    institutions: "مؤسسات",
    trainingHours: "ساعات تدريب",
    specializations: "تخصصات",
    continuousLearning: "التعلم المستمر من خلال شهادات معترف بها في AI، الروبوتات، Computer Vision، وعلم البيانات من مؤسسات رائدة.",
    
    // Form Labels
    formName: "الاسم",
    formEmail: "البريد الإلكتروني",
    formMessage: "الرسالة",
    formSend: "إرسال الرسالة",
    
    // Footer
    footerText: "© 2025 عبدالرحمن الناشري | مهندس AI فضائي",
    builtWith: "بُني باستخدام",
    myCV: "السيرة الذاتية",
    sending: "جاري الإرسال…",
    messageSent: "تم إرسال رسالتك! سأعود إليك قريباً.",
    messageError: "حدث خطأ. الرجاء مراسلتي مباشرة.",
    backHome: "العودة للرئيسية",
    pageNotFound: "ضائع في الفضاء — الصفحة غير موجودة.",

    // Project detail page
    backToProjects: "العودة للمشاريع",
    aboutProject: "عن المشروع",
    keyHighlights: "أبرز ما يميز المشروع",
    techStack: "التقنيات المستخدمة",
    role: "الدور",
    year: "السنة",
    watchVideo: "شاهد الفيديو",
    viewOnGithub: "عرض على GitHub",
    liveDemo: "تجربة مباشرة",
    viewDetails: "عرض التفاصيل",
    relatedProjects: "مشاريع أخرى",

    // Achievement detail page
    backToAchievements: "العودة للإنجازات",
    aboutAchievement: "عن هذا الإنجاز",
    recognition: "التقدير",
    relatedProject: "المشروع المرتبط",
    otherAchievements: "إنجازات أخرى",

    // Navigation Planets
    terranStation: "محطة تيران",
    homeBase: "القاعدة الرئيسية - ابدأ رحلتك",
    iceWorld: "عالم الجليد",
    darkMatter: "المادة المظلمة",
    lavaPlanet: "كوكب الحمم",
    crystalMoon: "القمر البلوري",
    workStation: "محطة العمل",
    outpost: "البؤرة الخارجية",
    navigate: "تنقل",
    
    // News
    newsTitle: "آخر التحديثات",
    newsSubtitle: "الأخبار والرؤى",
    
    // Work With Me
    workWithMeTitle: "اعمل معي",
    workWithMeSubtitle: "لنبني شيئاً مذهلاً معاً",
    workWithMeIntro: "متاح للمشاريع المستقلة والاستشارات وفرص التعاون. بخبرة في الذكاء الاصطناعي والروبوتات والتعلم الآلي، أستطيع مساعدتك في تحويل أفكارك المبتكرة إلى واقع.",
    aiDevelopment: "تطوير الذكاء الاصطناعي",
    aiDevelopmentDesc: "حلول ذكاء اصطناعي مخصصة، نماذج تعلم آلي، وأنظمة ذكية مصممة خصيصاً لاحتياجات عملك.",
    roboticsEngineering: "هندسة الروبوتات",
    roboticsEngineeringDesc: "حلول روبوتات متكاملة من التصميم إلى النشر، بما في ذلك الأنظمة المستقلة والرؤية الحاسوبية.",
    mlSolutions: "حلول التعلم الآلي",
    mlSolutionsDesc: "تحليل البيانات، النمذجة التنبؤية، وخطوط أنابيب التعلم الآلي للحصول على رؤى قابلة للتنفيذ.",
    consultingMentoring: "الاستشارات والإرشاد",
    consultingMentoringDesc: "إرشاد تقني، مراجعة الأكواد، وتوجيه لمشاريع وفرق الذكاء الاصطناعي والروبوتات.",
    scheduleCall: "حجز مكالمة",
    availableForWork: "متاح للمشاريع",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio:lang";

function detectInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "ar") return stored;
  const browser = window.navigator.language?.toLowerCase() || "";
  return browser.startsWith("ar") ? "ar" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    setLanguageState(detectInitialLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* ignore storage errors */
    }
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleLanguage = () =>
    setLanguageState((prev) => (prev === "en" ? "ar" : "en"));

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const dir: "ltr" | "rtl" = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, setLanguage, t, dir }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
