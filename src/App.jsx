import React, {
  useState,
  useCallback,
  useRef,
  Suspense,
  useEffect,
} from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Sphere,
  Dodecahedron,
  Octahedron,
  Tetrahedron,
  Torus,
} from "@react-three/drei";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Car,
  QrCode,
  Wind,
  GraduationCap,
  Award,
  Phone,
  MapPin,
  Download,
  BrainCircuit,
  Code,
  Server,
  ToyBrick,
  Cpu,
  Coffee,
} from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// --- RESUME DOWNLOAD PATH ---
// ✅ FIX: Use import.meta.env.BASE_URL to handle GitHub Pages deployment
const resumeUrl = `${import.meta.env.BASE_URL}Saurabh-Resume.pdf`;

// --- PROFILE PICTURE PATH ---
// Correctly import the image from the 'src/assets' folder.
import profilePic from "./assets/profile.jpg";

// --- DATA (Updated from Resume) ---
const personalInfo = {
  name: "Saurabh Kumar",
  location: "Ghaziabad, Uttar Pradesh",
  email: "saurabh90262@gmail.com",
  phone: "+91-9026272421",
};

const education = {
  degree: "B.Tech Information Technology",
  college: "ABES Engineering College Ghaziabad",
  years: "2023 - 2027",
  cgpa: "8.0",
};

const LeetCodeIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="w-6 h-6"
  >
    <title>LeetCode</title>
    <path d="M13.48 4.26l1.72 1.72-1.06 1.06-1.72-1.72 1.06-1.06zm4.58 4.58l1.06-1.06-1.72-1.72-1.06 1.06 1.72 1.72zM20.44 2l1.06 1.06-1.72 1.72-1.06-1.06 1.72-1.72zM4 22h16v-2H4v2zM8.5 17l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41L8.5 17z" />
  </svg>
);
const GFGIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="w-6 h-6"
  >
    <title>GeeksforGeeks</title>
    <path d="M11.534 2.018c-5.204 1.83-8.236 7.42-6.406 12.623 1.83 5.204 7.42 8.236 12.623 6.406s8.236-7.42 6.406-12.623C22.33 3.22 16.737-.152 11.534 2.018zm.92 2.705c.34-.12.707-.12.98.054.272.17.432.485.432.82v1.12l-1.84.66V5.517c0-.25.1-.565.428-.794zm-1.84 9.328h3.68v-3.68h-3.68v3.68zm0 1.84v2.76c0 .485-.24.848-.616.98-.378.134-.848.027-1.148-.272l-1.568-1.568v-1.92h3.328zm-5.52-1.84v-3.68h3.68v3.68H5.1zm1.84-5.52H3.26c-.485 0-.848.24-.98.616-.134.378-.027-.848.272 1.148l1.568 1.568h1.92V8.697zm7.36 5.52v3.68h-3.68v-3.68h3.68zm1.84-1.84h2.76c.485 0 .848-.24.98-.616.134.378-.027-.848-.272-1.148l-1.568-1.568v1.92h-1.92v1.408zm-1.84-5.52h3.68V8.697h-3.68v3.68zm1.84-5.52V4.39c0-.485.24-.848.616-.98s.848-.027 1.148.272l1.568 1.568h-1.92v1.408h-1.408z" />
  </svg>
);

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/saurabh90262",
    color: "hover:text-white hover:border-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/saurabh-kumar-773a9928b/",
    color: "hover:text-blue-400 hover:border-blue-400",
  },
  {
    name: "LeetCode",
    icon: LeetCodeIcon,
    url: "https://leetcode.com/u/saurabh90262/",
    color: "hover:text-yellow-500 hover:border-yellow-500",
  },
  {
    name: "GFG",
    icon: GFGIcon,
    url: "https://www.geeksforgeeks.org/user/saurabh90262/",
    color: "hover:text-green-500 hover:border-green-500",
  },
];

const skills = {
  languages: {
    name: "Languages",
    shape: "box",
    items: ["Java", "C++", "Python", "JavaScript", "C", "SQL"],
  },
  frontend: {
    name: "Frontend",
    shape: "sphere",
    items: ["HTML", "CSS", "React.js", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  backend: {
    name: "Backend",
    shape: "dodecahedron",
    items: [
      "Node.js",
      "Express.js",
      "Spring (Learning)",
      "Spring Boot (Learning)",
    ],
  },
  databases: {
    name: "Databases",
    shape: "octahedron",
    items: ["MongoDB", "MySQL", "Mongoose"],
  },
  tools: {
    name: "Tools & Platforms",
    shape: "tetrahedron",
    items: ["Git", "GitHub", "VS Code"],
  },
  ai_ml: {
    name: "AI/ML",
    shape: "torus",
    items: ["OpenAI GPT", "Gemini", "Prompt Engineering"],
  },
};

const coreCompetencies = [
  { title: "Java Development (SpringBoot)", icon: <Coffee /> },
  { title: "Data Structures & Algorithms", icon: <Cpu /> },
  { title: "Object Oriented Programming (OOPs)", icon: <ToyBrick /> },
  { title: "Full Stack Web Development", icon: <Server /> },
  { title: "Artificial Intelligence", icon: <BrainCircuit /> },
  { title: "Internet of Things", icon: <Code /> },
];

const projects = [
  {
    date: "February 2025",
    title: "Car Resale Price Predictor",
    description:
      "Built an ML model to predict used car resale prices with high accuracy. Engineered features and implemented multiple algorithms including Linear Regression, Random Forest, SVR, and XGBoost to achieve the best results.",
    icon: <Car />,
    tags: ["Python", "XGBoost", "SVR", "Machine Learning", "Data Science"],
  },
  {
    date: "December 2024",
    title: "QR Code Generator",
    description:
      "Developed a dynamic web app to generate QR codes from user-provided URLs. Integrated a third-party API with JavaScript and built a responsive UI with HTML & CSS.",
    icon: <QrCode />,
    tags: ["JavaScript", "API Integration", "HTML5", "CSS3"],
  },
  {
    date: "November 2024",
    title: "Weather Forecast Web App",
    description:
      "Created a live weather forecast app delivering real-time insights on temperature, humidity, and wind speed for any global location using the Weather API.",
    icon: <Wind />,
    tags: ["JavaScript", "API", "HTML", "CSS", "Responsive Design"],
  },
];

const achievements = [
  {
    title: "250+ Questions Solved",
    platform: "on LeetCode, demonstrating strong problem-solving skills.",
    icon: LeetCodeIcon,
  },
  {
    title: "155+ Questions Solved",
    platform: "on GeeksforGeeks, covering a wide range of DSA topics.",
    icon: GFGIcon,
  },
  {
    title: "LeetCode Pandas Badge",
    platform:
      "Earned for proficiency in data manipulation and analysis using Python.",
    icon: Award,
  },
  {
    title: "Smart India Hackathon 2025",
    platform: "College Level Hackathon",
    icon: GFGIcon,
  },
];

const certifications = [
  { name: "Programming in Java", issuer: "NPTEL (IIT Kharagpur)" },
  {
    name: "Introduction to Internet of Things",
    issuer: "NPTEL (IIT Kharagpur)",
  },
  { name: "Problem Solving", issuer: "HackerRank" },
  { name: "160 Days of Problem Solving", issuer: "GeeksforGeeks" },
];

// --- RESUME DOWNLOAD HANDLER ---
const handleResumeDownload = () => {
  try {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Saurabh Kumar - Resume.pdf";
    link.target = "_blank";

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading resume:", error);
    // Fallback: open in new tab
    window.open(resumeUrl, "_blank");
  }
};

// --- 3D Rotating Shape Component ---
const RotatingShape = ({ shapeType }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.25;
    }
  });
  const materialProps = {
    color: "#00ffff",
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  };
  const shapeProps = {
    ref,
    args: [1, 32, 32],
    material: <meshStandardMaterial {...materialProps} />,
  };
  switch (shapeType) {
    case "box":
      return <Box {...shapeProps} />;
    case "sphere":
      return <Sphere {...shapeProps} />;
    case "dodecahedron":
      return <Dodecahedron {...shapeProps} />;
    case "octahedron":
      return <Octahedron {...shapeProps} />;
    case "tetrahedron":
      return <Tetrahedron {...shapeProps} />;
    case "torus":
      return <Torus {...shapeProps} args={[0.8, 0.3, 16, 100]} />;
    default:
      return <Box {...shapeProps} />;
  }
};

// --- 3D Tilting Card Component ---
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { duration: 0.3 });
    animate(y, 0, { duration: 0.3 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ rotateX, rotateY }} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  );
};

// --- Animated Subtitle ---
const AnimatedSubtitle = () => {
  const text = "IT Student | Java Developer | Full-Stack Developer";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 2,
    });
    return controls.stop;
  }, []);

  return (
    <motion.p className="text-lg md:text-xl text-gray-400">
      {displayText}
    </motion.p>
  );
};

// --- Main App Component ---
const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particleOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#00ffff",
        distance: 150,
        enable: true,
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "out" },
      },
      number: { value: 50, density: { enable: true, area: 800 } },
      opacity: { value: 0.2 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-300 relative overflow-x-hidden font-sans selection:bg-cyan-400 selection:text-black">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleOptions}
        />
      </div>

      <nav className="fixed w-full bg-gray-900/70 backdrop-blur-lg z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-cyan-400 tracking-wider"
          >
            SK.
          </motion.a>
          <div className="hidden md:flex space-x-8 items-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Certifications",
              "Achievements",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
          <button
            className="md:hidden z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-900/90 absolute w-full">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Certifications",
              "Achievements",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-6 py-3 hover:bg-cyan-400/20"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="relative z-10 pt-20">
        <section
          id="home"
          className="min-h-screen flex items-center justify-center text-center px-4 -mt-20"
        >
          <div className="flex flex-col items-center">
            <motion.img
              src={profilePic}
              alt={personalInfo.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-cyan-400/60 shadow-lg shadow-cyan-500/20 mx-auto mb-6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            />
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Hi, I'm <span className="text-cyan-400">{personalInfo.name}</span>
            </motion.h1>
            <AnimatedSubtitle />
            <motion.button
              onClick={handleResumeDownload}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors cursor-pointer"
            >
              <Download size={20} />
              Download Resume
            </motion.button>
          </div>
        </section>

        <section id="about" className="py-24 max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
                About Me
              </h2>
              <p className="text-gray-300 leading-relaxed max-w-2xl">
                I am a dedicated Information Technology student at{" "}
                {education.college} with a strong passion for software
                development and artificial intelligence. I thrive on solving
                complex problems and continuously learning new technologies to
                build efficient and impactful applications.
              </p>
            </motion.div>
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400/90">
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {coreCompetencies.map((comp, i) => (
                  <motion.div
                    key={comp.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <div className="text-cyan-400">{comp.icon}</div>
                    <span>{comp.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-24 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-cyan-400 text-center">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(skills).map((category, i) => (
              <TiltCard key={i}>
                <motion.div
                  className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/80 backdrop-blur-sm transition-all duration-300 h-full group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="absolute inset-0 bg-dot-cyan-500/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-cyan-400 pt-2">
                      {category.name}
                    </h3>
                    <div className="w-20 h-20 -mt-4 -mr-2">
                      <Suspense
                        fallback={
                          <div className="w-full h-full bg-gray-700/50 rounded-lg animate-pulse"></div>
                        }
                      >
                        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                          <ambientLight intensity={0.8} />
                          <pointLight position={[10, 10, 10]} intensity={1} />
                          <RotatingShape shapeType={category.shape} />
                          <OrbitControls
                            enableZoom={false}
                            autoRotate
                            autoRotateSpeed={3}
                          />
                        </Canvas>
                      </Suspense>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300 transition-colors hover:bg-cyan-400/20 hover:text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="projects" className="py-24 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-cyan-400 text-center">
            My Projects
          </h2>
          <div className="space-y-12">
            {projects.map((project) => (
              <TiltCard key={project.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 w-full group overflow-hidden"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-lg"></div>
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-cyan-400">{project.icon}</span>
                      <p className="text-sm font-semibold text-gray-400">
                        {project.date}
                      </p>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-700/80 rounded-full text-cyan-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="certifications" className="py-24 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-cyan-400 text-center">
            Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <TiltCard key={index}>
                <motion.div
                  className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 text-center h-full group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-dot-cyan-500/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex flex-col items-center justify-center h-full">
                    <Award className="text-cyan-400 w-10 h-10 mx-auto mb-4" />
                    <h3 className="text-md font-bold">{cert.name}</h3>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="achievements" className="py-24 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-cyan-400 text-center">
            Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((ach, index) => {
              const Icon = ach.icon;
              return (
                <TiltCard key={index}>
                  <motion.div
                    className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 text-center h-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-cyan-400 w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gray-700/50 rounded-full">
                      <Icon />
                    </div>
                    <h3 className="text-lg font-bold">{ach.title}</h3>
                    <p className="text-gray-400 text-sm">{ach.platform}</p>
                  </motion.div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        <section id="contact" className="py-24 text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
            Get In Touch
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            I'm currently open to new opportunities and collaborations. Feel
            free to reach out!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-12">
            <motion.a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Phone size={20} />
              <span>{personalInfo.phone}</span>
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Mail size={20} />
              <span>{personalInfo.email}</span>
            </motion.a>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin size={20} />
              <span>{personalInfo.location}</span>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-14 h-14 rounded-full bg-gray-800/50 border border-gray-600/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color}`}
                  whileHover={{ scale: 1.2 }}
                  title={social.name}
                >
                  <Icon />
                </motion.a>
              );
            })}
          </div>
        </section>

        <footer className="text-center py-6 border-t border-gray-800 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
