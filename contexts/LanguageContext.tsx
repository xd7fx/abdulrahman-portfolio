"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
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
    
    // About
    aboutTitle: "About Me",
    aboutSubtitle: "Ice World - Discover My Story",
    aboutBio: "I'm Abdulrahman Alnashri, an AI & Robotics Engineer passionate about creating intelligent systems that solve real-world problems. With expertise in machine learning, computer vision, and autonomous systems, I've supervised award-winning projects including the YAMAMAH Rescue Drone team that won 1st place at WRO Saudi Arabia 2025.",
    technicalArsenalTitle: "Technical Arsenal",
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
    projectsSubtitle: "Dark Matter - Explore My Work",
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
    sabaqAch3: "� Scalable architecture designed for 563+ services",
    sabaqAch4: "🔌 API-first design for future government integration",
    
    // Achievements
    achievementsTitle: "Achievements & Recognition",
    achievementsSubtitle: "Lava Planet - Hall of Fame",
    
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
    
    // Certificates
    certificatesTitle: "Certificates & Training",
    certificatesSubtitle: "Crystal Moon - Training Records",
    continuousLearning: "Continuous learning through industry-recognized certifications in AI, Robotics, Computer Vision, and Data Science from leading institutions.",
    viewCertificate: "View Certificate",
    totalCertificates: "Total Certificates",
    institutions: "Institutions",
    trainingHours: "Training Hours",
    specializations: "Specializations",
    
    // Contact
    contactTitle: "Get In Touch",
    contactSubtitle: "Outpost - Communication Hub",
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
    viewProjects: "عرض المشاريع",
    
    // About
    aboutTitle: "عني",
    aboutSubtitle: "عالم الجليد - اكتشف قصتي",
    aboutBio: "أنا عبدالرحمن الناشري، مهندس AI وروبوتات شغوف بإنشاء أنظمة ذكية تحل المشاكل الواقعية. بخبرة في Machine Learning، Computer Vision، والأنظمة المستقلة، أشرفت على مشاريع حائزة على جوائز منها فريق طائرة يمامة للإنقاذ الذي فاز بالمركز الأول في WRO السعودية 2025.",
    skills: "المهارات",
    experience: "الخبرة",
    technicalArsenal: "الترسانة التقنية",
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
    projectsSubtitle: "المادة المظلمة - استكشف أعمالي",
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
    heritageAch1: "� تم ترشيحه للعرض في وزارة الاتصالات وتقنية المعلومات",
    heritageAch2: "� كشف ذكي للمعالم والنصوص التاريخية",
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
    sabaqAch3: "� بنية تحتية مصممة لتغطية 563+ خدمة مستقبلاً",
    sabaqAch4: "🔌 تصميم يعتمد على APIs لتسهيل التكامل الحكومي",
    
    // Achievements
    achievementsTitle: "الإنجازات والتقدير",
    achievementsSubtitle: "كوكب الحمم - قاعة المجد",
    
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
    
    // Certificates
    certificatesTitle: "الشهادات والتدريب",
    certificatesSubtitle: "القمر البلوري - سجلات التدريب",
    viewCertificate: "عرض الشهادة",
    
    // Certificate titles
    cert1: "AI والتعلم الآلي",
    cert2: "الرؤية الحاسوبية",
    cert3: "الروبوتات والأنظمة المستقلة",
    cert4: "تطوير الويب الكامل",
    cert5: "علم البيانات والتحليلات",
    cert6: "عمليات التعلم الآلي",
    
    // Certificate descriptions
    certDesc1: "برنامج تدريبي متقدم في AI والتعلم الآلي",
    certDesc2: "تقنيات معالجة الصور والتعرف على الأنماط",
    certDesc3: "أنظمة الروبوتات المستقلة وROS",
    certDesc4: "تطوير تطبيقات ويب حديثة وكاملة",
    certDesc5: "تحليل البيانات والتصور والنمذجة",
    certDesc6: "استراتيجيات MLOps والنشر",
    
    // Contact
    contactTitle: "تواصل معي",
    contactSubtitle: "البؤرة الخارجية - مركز الاتصالات",
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
    footerText: "© 2025 عبد الرحمن الناشري | مهندس AI فضائي",
    builtWith: "بُني باستخدام",
    
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
    // Update document direction
    document.documentElement.dir = language === "en" ? "rtl" : "ltr";
    document.documentElement.lang = language === "en" ? "ar" : "en";
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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
