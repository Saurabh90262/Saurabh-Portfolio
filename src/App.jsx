import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Github, Linkedin, Mail, Menu, X, Car, QrCode, Wind,
  Award, Phone, MapPin, Download, BrainCircuit, Server,
  ToyBrick, Cpu, Coffee, Database, RadioTower, ExternalLink,
  ArrowUpRight, ChevronDown, Code2, Train,
} from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import { FaJava, FaNodeJs, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaDatabase } from "react-icons/fa";
import { SiPython } from "react-icons/si";
import { SiJavascript, SiCplusplus, SiMysql, SiReact, SiNextdotjs, SiTailwindcss, SiExpress, SiSpringboot, SiMongodb, SiIntellijidea, SiOpenai, SiGooglegemini } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

  :root {
    --bg: #04050a;
    --surface: #0b0d16;
    --surface2: #10121e;
    --border: rgba(255,255,255,0.07);
    --accent: #e8ff47;
    --accent2: #ff3d6b;
    --accent3: #00e5ff;
    --text: #c0c2d4;
    --muted: #46495e;
    --white: #eef0f9;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Space Grotesk', sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    cursor: none;
  }
  @media (max-width: 768px) { body { cursor: auto; } }
  ::selection { background: var(--accent); color: #000; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
  a, button { cursor: none; }
  @media (max-width: 768px) { a, button { cursor: auto; } }

  .grid-bg {
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .noise::after {
    content: '';
    position: fixed; inset: 0;
    pointer-events: none; z-index: 9999; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  .c-dot {
    position: fixed; top: 0; left: 0; width: 8px; height: 8px;
    background: var(--accent); border-radius: 50%;
    pointer-events: none; z-index: 99999; mix-blend-mode: difference; will-change: transform;
  }
  .c-ring {
    position: fixed; top: 0; left: 0; width: 36px; height: 36px;
    border: 1.5px solid var(--accent); border-radius: 50%;
    pointer-events: none; z-index: 99998; mix-blend-mode: difference;
    will-change: transform; transition: width 0.15s, height 0.15s;
  }
  .c-ring.pressed { width: 18px; height: 18px; }
  @media (max-width: 900px) { .c-dot, .c-ring { display: none !important; } }

  .scrollbar-progress {
    position: fixed; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3));
    transform-origin: left; z-index: 10000;
  }

  .display { font-family: 'Bebas Neue', sans-serif; }
  .mono    { font-family: 'IBM Plex Mono', monospace; }

  .npill {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 7px 16px; border-radius: 100px;
    color: var(--muted); text-decoration: none;
    transition: all 0.2s ease; border: 1px solid transparent;
  }
  .npill:hover { color: var(--accent); border-color: rgba(0,240,255,0.3); background: rgba(0,240,255,0.05); }

  .slabel {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    color: var(--accent); display: block; margin-bottom: 12px;
  }

  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; transition: border-color 0.3s, box-shadow 0.3s; position: relative;
  }
  .card:hover {
    border-color: rgba(0,240,255,0.2);
    box-shadow: 0 0 60px rgba(0,240,255,0.05), 0 24px 64px rgba(0,0,0,0.5);
  }

  @property --rot { syntax:"<angle>"; inherits:false; initial-value:0deg; }
  @keyframes spin-rot { to { --rot: 360deg; } }
  .rot-border { position: relative; overflow: hidden; }
  .rot-border::before {
    content: ''; position: absolute; inset: 0; padding: 1px; border-radius: inherit;
    background: conic-gradient(from var(--rot), transparent 270deg, var(--accent) 360deg);
    animation: spin-rot 4s linear infinite;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none; z-index: 1;
  }
  .rot-border > * { position: relative; z-index: 2; }

  @keyframes glitch1 { 0%,100%{clip-path:inset(0 0 96% 0);transform:translate(-3px,0)} 33%{clip-path:inset(40% 0 40% 0);transform:translate(3px,0)} 66%{clip-path:inset(80% 0 5% 0);transform:translate(-2px,0)} }
  @keyframes glitch2 { 0%,100%{clip-path:inset(90% 0 0 0);transform:translate(3px,0)} 33%{clip-path:inset(20% 0 60% 0);transform:translate(-3px,0)} 66%{clip-path:inset(5% 0 85% 0);transform:translate(2px,0)} }
  .gw { position: relative; display: inline-block; }
  .gw::before,.gw::after { content: attr(data-text); position: absolute; inset: 0; font: inherit; }
  .gw::before { color: var(--accent2); animation: glitch1 3s steps(1) infinite; opacity: 0; }
  .gw::after  { color: var(--accent3); animation: glitch2 3s steps(1) infinite; opacity: 0; }
  .gw:hover::before,.gw:hover::after { opacity: 1; }

  .stag {
    font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.07em;
    padding: 4px 10px; border-radius: 4px; border: 1px solid var(--border);
    background: rgba(255,255,255,0.03); color: var(--muted);
    transition: all 0.18s ease; cursor: default; display: inline-block;
  }
  .stag:hover { border-color: var(--accent); color: var(--accent); background: rgba(0,240,255,0.06); transform: translateY(-2px); }

  .btn-y {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 28px; background: var(--accent); color: #000;
    border-radius: 100px; font-weight: 700; font-size: 12px;
    letter-spacing: 0.07em; text-transform: uppercase;
    border: none; cursor: none; transition: all 0.2s ease; text-decoration: none;
  }
  .btn-y:hover { background: #fff; transform: translateY(-3px); box-shadow: 0 14px 40px rgba(0,240,255,0.3); }
  .btn-g {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 28px; background: transparent; color: var(--white);
    border-radius: 100px; font-weight: 600; font-size: 12px;
    letter-spacing: 0.07em; text-transform: uppercase;
    border: 1px solid var(--border); cursor: none; transition: all 0.2s ease; text-decoration: none;
  }
  .btn-g:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-3px); }

  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .mtrack { display: flex; animation: marquee 20s linear infinite; width: max-content; }
  .mtrack:hover { animation-play-state: paused; }

  .comp-row {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px; border-radius: 12px;
    border: 1px solid var(--border); background: var(--surface);
    transition: all 0.2s ease; cursor: default;
  }
  .comp-row:hover { border-color: rgba(0,240,255,0.3); background: rgba(0,240,255,0.03); transform: translateX(8px); }

  .clink {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 20px; border-radius: 12px;
    border: 1px solid var(--border); background: var(--surface);
    text-decoration: none; color: var(--text); transition: all 0.25s ease;
  }
  .clink:hover { border-color: var(--accent); background: rgba(0,240,255,0.04); transform: translateX(8px); color: var(--white); }

  @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} 50%{border-radius:50% 60% 30% 60%/40% 70% 60% 40%} 75%{border-radius:70% 30% 60% 40%/30% 50% 60% 70%} }
  .blob { animation: blob 12s ease-in-out infinite; }

  .social-btn {
    width: 48px; height: 48px; border-radius: 50%;
    background: color-mix(in srgb, var(--glow-clr) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--glow-clr) 40%, transparent);
    color: var(--glow-clr);
    display: flex; align-items: center; justify-content: center;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative; z-index: 1;
    flex-shrink: 0;
  }
  .social-btn::after {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    box-shadow: 0 0 15px var(--glow-clr), 0 0 30px var(--glow-clr), 0 0 45px var(--glow-clr);
    opacity: 0; transition: opacity 0.3s ease; z-index: -1;
  }
  .social-btn:hover { background: var(--glow-clr); border-color: var(--glow-clr); color: #000; transform: scale(1.35) translateY(-4px); }
  .social-btn:hover::after { opacity: 0.85; animation: pulse-glitter 1.2s infinite alternate; }

  @keyframes pulse-glitter {
    0% { box-shadow: 0 0 10px var(--glow-clr), 0 0 20px var(--glow-clr); filter: brightness(1); }
    100% { box-shadow: 0 0 25px var(--glow-clr), 0 0 50px var(--glow-clr), 0 0 70px var(--glow-clr); filter: brightness(1.4); }
  }

  @keyframes orbit {
    from { transform: rotate(0deg) translateX(28px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
  }
  @keyframes orbit-reverse {
    from { transform: rotate(0deg) translateX(22px) rotate(0deg); }
    to   { transform: rotate(-360deg) translateX(22px) rotate(360deg); }
  }
  @keyframes float-icon {
    0%, 100% { transform: translateY(0px) scale(1); }
    33%       { transform: translateY(-6px) scale(1.05); }
    66%       { transform: translateY(4px) scale(0.97); }
  }
  @keyframes pulse-glow {
    0%,100% { filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 8px currentColor); opacity: 0.85; }
    50%      { filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor); opacity: 1; }
  }
  @keyframes drift {
    0%   { transform: translate(0px, 0px) rotate(0deg) scale(1); }
    25%  { transform: translate(4px, -5px) rotate(5deg) scale(1.05); }
    50%  { transform: translate(-3px, -9px) rotate(-3deg) scale(0.97); }
    75%  { transform: translate(-6px, -4px) rotate(4deg) scale(1.03); }
    100% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
  }

  .icon-cluster {
    position: relative; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .icon-centre {
    position: absolute; display: flex; align-items: center; justify-content: center;
    animation: float-icon var(--dur, 3s) ease-in-out infinite; animation-delay: var(--del, 0s);
    filter: drop-shadow(0 0 6px var(--clr)) drop-shadow(0 0 12px var(--clr)); transition: transform 0.3s; z-index: 2;
  }
  .icon-sat {
    position: absolute; top: 50%; left: 50%; width: 18px; height: 18px; margin: -9px 0 0 -9px;
    display: flex; align-items: center; justify-content: center;
    animation: orbit var(--orb-dur, 5s) linear infinite; animation-delay: var(--orb-del, 0s);
    opacity: 0.7; transition: opacity 0.2s;
  }
  .icon-sat.rev { animation-name: orbit-reverse; }
  .icon-sat:hover { opacity: 1; }
  .skill-card:hover .icon-centre { transform: scale(1.15); }
  .skill-card:hover .icon-sat    { opacity: 1; }

  /* ── RESPONSIVE BREAKPOINTS ── */

  /* Tablets and below */
  @media (max-width: 900px) {
    .hide-desktop { display: none !important; }
    .grid-about { grid-template-columns: 1fr !important; gap: 40px !important; }
    .grid-contact { grid-template-columns: 1fr !important; gap: 40px !important; }
    .ach-grid { grid-template-columns: 1fr 1fr !important; }
    .skills-grid { grid-template-columns: 1fr 1fr !important; }
    .timeline-wrapper { padding: 0 !important; }
  }

  /* Mobile */
  @media (max-width: 600px) {
    .skills-grid { grid-template-columns: 1fr !important; }
    .ach-grid { grid-template-columns: 1fr !important; }

    /* Hero mobile */
    .hero-grid {
      grid-template-columns: 1fr !important;
      justify-items: center !important;
      text-align: center !important;
    }
    .hero-stats {
      justify-content: center !important;
    }
    .hero-buttons {
      justify-content: center !important;
    }
    .hero-profile {
      display: flex !important;
      order: -1 !important;
      margin-bottom: 8px !important;
    }

    /* About mobile */
    .grid-about { gap: 28px !important; }

    /* Contact mobile */
    .grid-contact { gap: 28px !important; }

    /* Footer mobile */
    .footer-inner {
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      gap: 16px !important;
    }

    /* Nav padding */
    .nav-wrap { padding: 0 16px !important; }
    .section-wrap { padding: 0 16px !important; }
    .section-pad { padding: 60px 0 !important; }
  }

  /* Very small screens */
  @media (max-width: 380px) {
    .btn-y, .btn-g { padding: 10px 18px !important; font-size: 11px !important; }
    .social-btn { width: 40px !important; height: 40px !important; }
  }

  /* PCard full width on mobile */
  @media (max-width: 700px) {
    .pcard-wrap { max-width: 100% !important; width: 100% !important; }
  }
`;

const resumeUrl = `${import.meta.env.BASE_URL}Saurabh-Resume.pdf`;
import profilePic from "./assets/profile.jpg";

const LeetCodeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);
const GFGIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-1.42.24c-.568 0-1.093-.09-1.577-.27a3.34 3.34 0 0 1-1.188-.78 3.31 3.31 0 0 1-.74-1.2 4.47 4.47 0 0 1-.245-1.51 4.61 4.61 0 0 1 .27-1.594 3.44 3.44 0 0 1 .77-1.23 3.4 3.4 0 0 1 1.214-.786 4.47 4.47 0 0 1 1.6-.27c.59 0 1.12.1 1.592.3a3.3 3.3 0 0 1 1.154.78c.31.33.536.714.674 1.153.14.44.208.908.208 1.415v.42H15.88a2.64 2.64 0 0 0 .55 1.674c.377.44.94.66 1.69.66.518 0 .94-.1 1.268-.3a1.64 1.64 0 0 0 .66-.81zm-1.98-2.73a2.1 2.1 0 0 0-.48-1.4c-.316-.37-.78-.556-1.392-.556-.61 0-1.08.2-1.4.6a2.24 2.24 0 0 0-.52 1.356zM2.55 14.315a3.22 3.22 0 0 1-.566-.745A2.24 2.24 0 0 1 1.88 13h1.782a1.64 1.64 0 0 0 .66.81c.33.2.75.3 1.267.3.75 0 1.313-.22 1.69-.66a2.64 2.64 0 0 0 .55-1.674H2.55V11.36c0-.507.07-.975.21-1.415.138-.44.364-.824.673-1.153a3.3 3.3 0 0 1 1.154-.78 4.47 4.47 0 0 1 1.593-.27c.59 0 1.133.09 1.6.27.465.18.867.444 1.214.786.346.34.612.748.77 1.23.157.48.27.994.27 1.594a4.47 4.47 0 0 1-.246 1.51 3.31 3.31 0 0 1-.74 1.2 3.34 3.34 0 0 1-1.188.78 4.47 4.47 0 0 1-1.577.27c-.512 0-.984-.08-1.42-.24a3.69 3.69 0 0 1-1.104-.695zm1.98-2.73h3.94a2.24 2.24 0 0 0-.52-1.356c-.32-.4-.79-.6-1.4-.6-.613 0-1.076.186-1.393.556a2.1 2.1 0 0 0-.627 1.4z"/>
  </svg>
);

const SKILL_ICON_CONFIGS = {
  Languages: {
    centre: { Icon: FaJava, color: "#f89820", size: 32, dur: "3.2s", del: "0s" },
    sats: [
      { Icon: SiJavascript, color: "#f7df1e", size: 13, orbDur: "5s",  orbDel: "0s",   rev: false },
      { Icon: SiPython,     color: "#3776ab", size: 13, orbDur: "7s",  orbDel: "-2s",  rev: true  },
      { Icon: SiCplusplus,  color: "#00599c", size: 12, orbDur: "6s",  orbDel: "-3.5s",rev: false },
      { Icon: SiMysql,      color: "#4479a1", size: 11, orbDur: "8s",  orbDel: "-1s",  rev: true  },
    ],
  },
  Frontend: {
    centre: { Icon: SiReact, color: "#61dafb", size: 32, dur: "3.5s", del: "0.2s" },
    sats: [
      { Icon: SiNextdotjs,    color: "#ffffff", size: 13, orbDur: "5.5s", orbDel: "0s",   rev: false },
      { Icon: SiTailwindcss,  color: "#06b6d4", size: 13, orbDur: "7s",   orbDel: "-2s",  rev: true  },
      { Icon: FaHtml5,        color: "#e34f26", size: 12, orbDur: "6s",   orbDel: "-4s",  rev: false },
      { Icon: FaCss3Alt,      color: "#1572b6", size: 11, orbDur: "8.5s", orbDel: "-1.5s",rev: true  },
    ],
  },
  Backend: {
    centre: { Icon: FaNodeJs, color: "#68a063", size: 32, dur: "2.8s", del: "0.5s" },
    sats: [
      { Icon: SiExpress,    color: "#ffffff", size: 13, orbDur: "6s",  orbDel: "0s",  rev: false },
      { Icon: SiSpringboot, color: "#6db33f", size: 14, orbDur: "5s",  orbDel: "-3s", rev: true  },
    ],
  },
  Databases: {
    centre: { Icon: SiMongodb, color: "#4db33d", size: 32, dur: "4s", del: "0s" },
    sats: [
      { Icon: SiMysql,    color: "#4479a1", size: 13, orbDur: "6.5s", orbDel: "0s",   rev: false },
      { Icon: FaDatabase, color: "#e8ff47", size: 12, orbDur: "5s",   orbDel: "-2.5s",rev: true  },
    ],
  },
  Tools: {
    centre: { Icon: FaGitAlt, color: "#f05032", size: 32, dur: "3s", del: "0.3s" },
    sats: [
      { Icon: FaGithub,       color: "#ffffff",  size: 13, orbDur: "5s",  orbDel: "0s",   rev: false },
      { Icon: VscVscode,      color: "#007acc",  size: 13, orbDur: "7s",  orbDel: "-3s",  rev: true  },
      { Icon: SiIntellijidea, color: "#ff318c",  size: 12, orbDur: "6.5s",orbDel: "-1.5s",rev: false },
    ],
  },
  "AI / ML": {
    centre: { Icon: SiOpenai, color: "#10a37f", size: 32, dur: "3.8s", del: "0s" },
    sats: [
      { Icon: SiGooglegemini, color: "#8e75b2", size: 14, orbDur: "5.5s", orbDel: "0s",  rev: false },
      { Icon: BrainCircuit,   color: "#e8ff47", size: 12, orbDur: "7s",   orbDel: "-2s", rev: true  },
    ],
  },
};

const TechIconCluster = ({ label }) => {
  const cfg = SKILL_ICON_CONFIGS[label];
  if (!cfg) return null;
  const { centre, sats } = cfg;
  const CIcon = centre.Icon;
  return (
    <div className="icon-cluster">
      {sats.map((s, i) => {
        const SIcon = s.Icon;
        return (
          <div key={i} className={`icon-sat${s.rev ? " rev" : ""}`} style={{ "--orb-dur": s.orbDur, "--orb-del": s.orbDel, "--clr": s.color, color: s.color }}>
            <SIcon size={s.size} style={{ filter: `drop-shadow(0 0 4px ${s.color})` }} />
          </div>
        );
      })}
      <div className="icon-centre" style={{ "--dur": centre.dur, "--del": centre.del, "--clr": centre.color, color: centre.color }}>
        <CIcon size={centre.size} style={{ filter: `drop-shadow(0 0 8px ${centre.color}) drop-shadow(0 0 16px ${centre.color})` }} />
      </div>
    </div>
  );
};

const ME = { name:"Saurabh Kumar", location:"Ghaziabad, UP", email:"saurabh90262@gmail.com", phone:"+91-9026272421" };
const EDU = { degree:"B.Tech — Information Technology", college:"ABES Engineering College", years:"2023 – 2027", cgpa:"8.0 / 10" };

const SOCIALS = [
  { name:"GitHub",   Icon:Github,       url:"https://github.com/saurabh90262",                  color: "#ff00a0" },
  { name:"LinkedIn", Icon:Linkedin,     url:"https://linkedin.com/in/saurabh-kumar-255911288/", color: "#00e5ff" },
  { name:"LeetCode", Icon:LeetCodeIcon, url:"https://leetcode.com/u/saurabh90262/",             color: "#ffe600" },
  { name:"GFG",      Icon:GFGIcon,      url:"https://www.geeksforgeeks.org/user/saurabh90262/", color: "#00ff66" },
];

const SocialIconBtn = ({ name, Icon, url, color }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" title={name} className="social-btn"
    style={{ "--glow-clr": color }}>
    <Icon size={18} />
  </a>
);

const SKILLS = [
  { label:"Languages", items:["Java","C++","Python","JavaScript","C","SQL"] },
  { label:"Frontend",  items:["React.js","Next.js","Tailwind CSS","HTML5","CSS3"] },
  { label:"Backend",   items:["Node.js","Express.js","Spring Boot"] },
  { label:"Databases", items:["MongoDB","MySQL","Mongoose"] },
  { label:"Tools",     items:["Git","GitHub","VS Code","IntelliJ"] },
  { label:"AI / ML",   items:["OpenAI GPT","Gemini","Prompt Eng."] },
];

const COMPS = [
  { icon:<Coffee size={15}/>,       label:"Java & Spring Boot" },
  { icon:<Cpu size={15}/>,          label:"DSA & Algorithms" },
  { icon:<ToyBrick size={15}/>,     label:"Object-Oriented Design" },
  { icon:<Server size={15}/>,       label:"Full-Stack Engineering" },
  { icon:<Database size={15}/>,     label:"Database Architecture" },
  { icon:<BrainCircuit size={15}/>, label:"Artificial Intelligence" },
  { icon:<RadioTower size={15}/>,   label:"Internet of Things" },
];

const PROJECTS = [
  {
    num:"01", year:"Apr 2026",
    title:"TrainExpert — Ticket Sharing",
    sub:"MERN Stack · Web App",
    desc:"A comprehensive platform designed to facilitate seamless railway ticket sharing and management. Engineered to optimize travel collaboration and user coordination in real-time.",
    icon:<Train size={18}/>,
    tags:["MongoDB","Express.js","React","Node.js"],
    live:"https://trainexpert.vercel.app/",
    repo:"https://github.com/Saurabh90262/Rail-Ticket-Sharing",
    accent:"#a855f7",
  },
  {
    num:"02", year:"Feb 2025",
    title:"CarSense — Resale Intelligence",
    sub:"Machine Learning · Predictive Analytics",
    desc:"High-accuracy ML engine that decodes true market value of used cars. Benchmarked Linear Regression, Random Forest, SVR, and XGBoost — converging on predictions within razor-thin error margins.",
    icon:<Car size={18}/>,
    tags:["Python","XGBoost","Scikit-learn","Pandas"],
    live:"https://github.com/saurabh90262",
    repo:"https://github.com/saurabh90262",
    accent:"#00f0ff",
  },
  {
    num:"03", year:"Dec 2024",
    title:"QR Nexus — Code Generator",
    sub:"API Integration · Web App",
    desc:"Zero-friction QR portals to any corner of the web, generated in milliseconds. A slick interface consumes a third-party API and returns crisp, scan-ready codes — responsive by design.",
    icon:<QrCode size={18}/>,
    tags:["JavaScript","REST API","HTML5","CSS3"],
    live:"https://github.com/saurabh90262",
    repo:"https://github.com/saurabh90262",
    accent:"#ff00a0",
  },
  {
    num:"04", year:"Nov 2024",
    title:"Atmos — Weather Intelligence",
    sub:"Live Data · OpenWeather API",
    desc:"The atmosphere, rendered live. Temperature, humidity, wind velocity for any city on Earth — pulled from robust meteorological APIs and delivered through a fluid, immersive interface.",
    icon:<Wind size={18}/>,
    tags:["JavaScript","OpenWeather API","CSS3"],
    live:"https://github.com/saurabh90262",
    repo:"https://github.com/saurabh90262",
    accent:"#ff6c00",
  },
];

const CERTS = [
  { name:"Programming in Java",               issuer:"NPTEL · IIT Kharagpur" },
  { name:"Introduction to IoT",               issuer:"NPTEL · IIT Kharagpur" },
  { name:"OCI 2025 AI Foundations Associate", issuer:"Oracle University" },
  { name:"GFG 160 Days of Problem Solving",   issuer:"GeeksforGeeks" },
  { name:"Problem Solving Certification",     issuer:"HackerRank" },
  { name:"Full Stack Web Development",        issuer:"Apna College" },
  { name:"DSA with Java",                     issuer:"Apna College" },
  { name:"Python — Mastering the Essentials", issuer:"Scaler" },
];

const ACHIEVEMENTS = [
  { num:"250+", label:"LeetCode Problems", sub:"Algorithmic mastery, one submission at a time.", Icon:LeetCodeIcon, accent:"#ffe600" },
  { num:"155+", label:"GFG Problems",      sub:"Spanning the full DSA spectrum.",                Icon:GFGIcon,      accent:"#00ff66" },
  { num:"★",    label:"Pandas Badge",      sub:"LeetCode — data analysis proficiency certified.",Icon:Award,        accent:"#ff00a0" },
];

const MARQUEE = ["Java","React","Node.js","Python","Spring Boot","MongoDB","Next.js","XGBoost","DSA","AI/ML","IoT","SQL","Git","C++"];
const ROLES   = ["IT Student","Java Developer","Full-Stack Engineer","AI Enthusiast","DSA Solver"];

// ─── CURSOR ───────────────────────────────────────────────────────────────
const Cursor = () => {
  const dot  = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current)  dot.current.style.transform  = `translate(${e.clientX-4}px,${e.clientY-4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${e.clientX-18}px,${e.clientY-18}px)`;
    };
    const dn = () => ring.current?.classList.add("pressed");
    const up = () => ring.current?.classList.remove("pressed");
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup",   up);
    return () => { window.removeEventListener("mousemove",move); window.removeEventListener("mousedown",dn); window.removeEventListener("mouseup",up); };
  }, []);
  return (<><div ref={dot} className="c-dot"/><div ref={ring} className="c-ring"/></>);
};

// ─── SCROLL BAR ───────────────────────────────────────────────────────────
const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return <motion.div className="scrollbar-progress" style={{ scaleX }} />;
};

// ─── TILT CARD ────────────────────────────────────────────────────────────
const Tilt = ({ children }) => {
  const r = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rX = useTransform(y,[-100,100],[7,-7]);
  const rY = useTransform(x,[-100,100],[-7,7]);
  const onMove = (e) => {
    if (!r.current) return;
    const b=r.current.getBoundingClientRect();
    x.set(e.clientX-b.left-b.width/2);
    y.set(e.clientY-b.top-b.height/2);
  };
  const onOut  = () => { animate(x,0,{duration:0.5}); animate(y,0,{duration:0.5}); };
  return (
    <div ref={r} style={{perspective:"900px"}} onMouseMove={onMove} onMouseLeave={onOut}>
      <motion.div style={{rotateX:rX,rotateY:rY,willChange:"transform"}}>{children}</motion.div>
    </div>
  );
};

// ─── ANIMATED ROLE ────────────────────────────────────────────────────────
const AnimRole = () => {
  const [i,setI] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setI(x=>(x+1)%ROLES.length),2600); return ()=>clearInterval(t); },[]);
  return (
    <div style={{height:28,overflow:"hidden",marginBottom:16}}>
      <AnimatePresence mode="wait">
        <motion.span key={i}
          initial={{y:28,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-28,opacity:0}}
          transition={{duration:0.3,ease:"easeInOut"}}
          style={{display:"block",fontFamily:"'IBM Plex Mono',monospace",fontSize:12,letterSpacing:"0.25em",textTransform:"uppercase",color:"var(--accent)"}}
        >{ROLES[i]}</motion.span>
      </AnimatePresence>
    </div>
  );
};

// ─── SECTION HEAD ─────────────────────────────────────────────────────────
const SH = ({ label, title }) => (
  <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} style={{marginBottom:60}}>
    <span className="slabel">{label}</span>
    <h2 className="display" style={{fontSize:"clamp(40px,7vw,82px)",color:"var(--white)",lineHeight:1,letterSpacing:"-0.01em"}}>{title}</h2>
  </motion.div>
);

const Wrap = ({children,style}) => (
  <div className="section-wrap" style={{maxWidth:1080,margin:"0 auto",padding:"0 32px",...style}}>{children}</div>
);
const Sec = ({id,children,style}) => (
  <section id={id} className="section-pad" style={{padding:"96px 0",position:"relative",...style}}>{children}</section>
);

// ─── NAV ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["Home","About","Skills","Projects","Certifications","Achievements","Contact"];
const Nav = () => {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);

  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setIsMobileNav(window.innerWidth <= 900);
    onScroll(); onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  },[]);

  return (
    <motion.nav
      initial={{y:-60,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5}}
      style={{position:"fixed",top:0,left:0,right:0,zIndex:500,
        background: scrolled || open ? "rgba(4,5,10,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition:"all 0.4s ease"}}
    >
      <div style={{maxWidth:1080,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:62}}>
        <a href="#home" style={{textDecoration:"none",flexShrink:0}}>
          <span className="display" style={{fontSize:26,color:"var(--white)",letterSpacing:2}}>SK</span>
          <span style={{color:"var(--accent)",fontSize:26}}>.</span>
        </a>

        {/* Desktop nav links */}
        {!isMobileNav && (
          <div style={{display:"flex",gap:2,alignItems:"center"}}>
            {NAV_ITEMS.map(n=><a key={n} href={`#${n.toLowerCase()}`} className="npill">{n}</a>)}
          </div>
        )}

        {/* Desktop resume button */}
        {!isMobileNav && (
          <button onClick={()=>window.open(resumeUrl,"_blank")} className="btn-y" style={{padding:"8px 18px",fontSize:11,flexShrink:0}}>
            <Download size={12}/> Resume
          </button>
        )}

        {/* Mobile hamburger — always visible on mobile */}
        {isMobileNav && (
          <button
            onClick={()=>setOpen(o=>!o)}
            style={{background:"rgba(255,255,255,0.06)",border:"1px solid var(--border)",borderRadius:"50%",color:"var(--white)",width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}
          >
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && isMobileNav && (
          <motion.div
            initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
            style={{background:"rgba(4,5,10,0.98)",borderTop:"1px solid var(--border)",overflow:"hidden"}}
          >
            {NAV_ITEMS.map(n=>(
              <a key={n} href={`#${n.toLowerCase()}`} onClick={()=>setOpen(false)}
                style={{display:"flex",alignItems:"center",padding:"15px 24px",color:"var(--text)",textDecoration:"none",fontFamily:"'IBM Plex Mono',monospace",fontSize:13,letterSpacing:"0.08em",borderBottom:"1px solid rgba(255,255,255,0.04)",transition:"color 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="var(--accent)"}
                onMouseLeave={e=>e.currentTarget.style.color="var(--text)"}
              >
                {n}
              </a>
            ))}
            {/* Resume button always visible at bottom of mobile menu */}
            <div style={{padding:"16px 24px 20px"}}>
              <button
                onClick={()=>{ window.open(resumeUrl,"_blank"); setOpen(false); }}
                className="btn-y"
                style={{width:"100%",justifyContent:"center",padding:"13px",fontSize:12}}
              >
                <Download size={14}/> Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const pInit = useCallback(async(e)=>{ await loadFull(e); },[]);
  const isMobile = useIsMobile();
  return (
    <section id="home" className="grid-bg" style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden"}}>
      <Particles id="tsparticles" init={pInit} options={{
        background:{color:{value:"transparent"}},fpsLimit:60,
        particles:{
          color:{value:["#00f0ff","#ff00a0","#ff6c00"]},
          links:{enable:true,color:"#00f0ff",opacity:0.06,distance:140},
          move:{enable:true,speed:0.55,outModes:{default:"out"}},
          number:{value:30},opacity:{value:{min:0.04,max:0.18}},
          size:{value:{min:1,max:2.5}},shape:{type:"circle"},
        },detectRetina:true,
      }} style={{position:"absolute",inset:0}}/>

      <div className="blob" style={{position:"absolute",right:"-12%",top:"5%",width:550,height:550,background:"radial-gradient(circle,rgba(0,240,255,0.055) 0%,transparent 70%)",filter:"blur(50px)",pointerEvents:"none"}}/>
      <div className="blob" style={{position:"absolute",left:"-8%",bottom:"5%",width:400,height:400,background:"radial-gradient(circle,rgba(255,0,160,0.04) 0%,transparent 70%)",filter:"blur(40px)",pointerEvents:"none",animationDelay:"4s"}}/>

      <Wrap style={{position:"relative",zIndex:10,paddingTop:80,width:"100%"}}>
        {/* HERO GRID — responsive: side-by-side on desktop, stacked on mobile */}
        <div className="hero-grid" style={{display:"grid",gridTemplateColumns:"1fr auto",gap:40,alignItems:"center"}}>

          {/* TEXT CONTENT */}
          <div>
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
              <AnimRole/>
            </motion.div>
            <motion.h1
              initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.1}}
              className="display gw" data-text="SAURABH KUMAR"
              style={{fontSize:"clamp(48px,10vw,130px)",lineHeight:0.88,color:"var(--white)",letterSpacing:"-0.02em",marginBottom:26}}
            >
              SAURABH<br/><span style={{color:"var(--accent)",textShadow:"0 0 80px rgba(0,240,255,0.35)"}}>KUMAR</span>
            </motion.h1>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.35,duration:0.6}}
              style={{color:"var(--muted)",maxWidth:460,lineHeight:1.75,fontSize:14,marginBottom:32}}>
              Full-stack architect and ML enthusiast. Building digital systems that bridge elegant theory with real-world impact. B.Tech IT at ABES Engineering College.
            </motion.p>
            <motion.div className="hero-buttons" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.5,duration:0.5}}
              style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:44}}>
              <a href="#projects" className="btn-y">View Projects <ArrowUpRight size={13}/></a>
              <a href="#contact"  className="btn-g">Get In Touch</a>
              {isMobile && (
                <button
                  onClick={()=>window.open(resumeUrl,"_blank")}
                  className="btn-g"
                  style={{gap:8, borderColor:"var(--accent)", color:"var(--accent)"}}
                >
                  <Download size={13}/> Download Resume
                </button>
              )}
            </motion.div>
            <motion.div className="hero-stats" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.65}}
              style={{display:"flex",gap:36,paddingTop:24,borderTop:"1px solid var(--border)"}}>
              {[["8.0","CGPA"],["250+","LeetCode"],["155+","GFG"]].map(([n,l])=>(
                <div key={l}>
                  <div className="display" style={{fontSize:34,color:"var(--accent)",lineHeight:1}}>{n}</div>
                  <div className="mono" style={{fontSize:9,color:"var(--muted)",letterSpacing:"0.22em",textTransform:"uppercase",marginTop:4}}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* PROFILE PICTURE — shown on desktop inline, on mobile shown above via CSS order */}
          <motion.div
            className="hero-profile"
            initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.7,delay:0.2}}
            style={{position:"relative",display:"flex",justifyContent:"center"}}
          >
            <motion.div animate={{rotate:360}} transition={{duration:14,repeat:Infinity,ease:"linear"}}
              style={{position:"absolute",inset:-10,borderRadius:"50%",background:"conic-gradient(from 0deg,var(--accent),transparent 40%,var(--accent2),transparent 80%,var(--accent3))",filter:"blur(5px)",opacity:0.65}}/>
            <img src={profilePic} alt="Saurabh Kumar"
              style={{width:"clamp(150px,25vw,220px)",height:"clamp(150px,25vw,220px)",borderRadius:"50%",objectFit:"cover",border:"6px solid var(--bg)",position:"relative",zIndex:2,display:"block"}}/>
            <div style={{position:"absolute",bottom:10,right:-4,zIndex:10,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:100,padding:"5px 13px",display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 8px #22c55e"}}/>
              <span className="mono" style={{fontSize:9,color:"var(--text)",letterSpacing:"0.12em"}}>AVAILABLE</span>
            </div>
          </motion.div>

        </div>

        <motion.div animate={{y:[0,9,0]}} transition={{repeat:Infinity,duration:2.2}}
          style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,marginTop:56,color:"var(--muted)"}}>
          <span className="mono" style={{fontSize:9,letterSpacing:"0.35em"}}>SCROLL</span>
          <ChevronDown size={15}/>
        </motion.div>
      </Wrap>
    </section>
  );
};

// ─── MARQUEE ──────────────────────────────────────────────────────────────
const Marquee = () => (
  <div style={{overflow:"hidden",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",background:"rgba(0,240,255,0.02)",padding:"13px 0"}}>
    <div className="mtrack">
      {[...MARQUEE,...MARQUEE].map((w,i)=>(
        <span key={i} style={{display:"inline-flex",alignItems:"center",gap:22,padding:"0 22px"}}>
          <span className="mono" style={{fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",color:"var(--muted)",whiteSpace:"nowrap"}}>{w}</span>
          <span style={{color:"var(--accent)"}}>✦</span>
        </span>
      ))}
    </div>
  </div>
);

// ─── ABOUT ────────────────────────────────────────────────────────────────
const About = () => (
  <Sec id="about">
    <Wrap>
      <div className="grid-about" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64}}>
        <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}>
          <span className="slabel">WHO I AM</span>
          <h2 className="display" style={{fontSize:"clamp(36px,5vw,70px)",color:"var(--white)",lineHeight:1,marginBottom:24}}>ABOUT<br/>ME</h2>
          <p style={{color:"var(--muted)",lineHeight:1.85,fontSize:14,marginBottom:18}}>
            I'm a dedicated IT student at <span style={{color:"var(--white)"}}>ABES Engineering College</span>, obsessively building things that work elegantly, efficiently, and at scale.
          </p>
          <p style={{color:"var(--muted)",lineHeight:1.85,fontSize:14,marginBottom:30}}>
            From low-level DSA mastery to deploying ML models and designing full-stack products — I debug Java at midnight with the same energy I bring to pixel-perfect UI at noon.
          </p>
          <Tilt>
            <div className="card rot-border" style={{padding:22}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                <div style={{width:40,height:40,borderRadius:10,background:"rgba(0,240,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Code2 size={17} color="var(--accent)"/>
                </div>
                <div>
                  <p style={{color:"var(--white)",fontWeight:600,fontSize:13,marginBottom:3}}>{EDU.degree}</p>
                  <p className="mono" style={{color:"var(--muted)",fontSize:10,marginBottom:8}}>{EDU.college}</p>
                  <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                    <span className="mono" style={{fontSize:9,color:"var(--muted)"}}>{EDU.years}</span>
                    <span className="mono" style={{fontSize:9,color:"var(--accent)"}}>CGPA {EDU.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
          <div style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap"}}>
            {SOCIALS.map((social) => (
              <SocialIconBtn key={social.name} {...social} />
            ))}
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}>
          <span className="slabel" style={{marginBottom:24}}>CORE EXPERTISE</span>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {COMPS.map((c,i)=>(
              <motion.div key={c.label} className="comp-row"
                initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
                transition={{delay:i*0.07,duration:0.4}}>
                <span style={{color:"var(--accent)"}}>{c.icon}</span>
                <span style={{fontSize:13,fontWeight:500,color:"var(--text)"}}>{c.label}</span>
                <ArrowUpRight size={12} style={{marginLeft:"auto",color:"var(--muted)",opacity:0.45}}/>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Wrap>
  </Sec>
);

// ─── SKILLS ───────────────────────────────────────────────────────────────
const Skills = () => (
  <Sec id="skills" style={{background:"var(--surface)"}}>
    <Wrap>
      <SH label="WHAT I KNOW" title="TECHNICAL ARSENAL"/>
      <div className="skills-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
        {SKILLS.map((g,i)=>(
          <Tilt key={g.label}>
            <motion.div className="card skill-card"
              initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08,duration:0.42}}
              style={{padding:22,height:"100%"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
                <span className="slabel" style={{fontSize:9,marginBottom:0,paddingTop:6}}>{g.label}</span>
                <TechIconCluster label={g.label}/>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {g.items.map(s=><span key={s} className="stag">{s}</span>)}
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </Wrap>
  </Sec>
);

// ─── PROJECT CARD ─────────────────────────────────────────────────────────
const PCard = ({p}) => (
  <Tilt>
    <motion.div className="card rot-border pcard-wrap" whileHover={{y:-6}} transition={{duration:0.22}}
      style={{padding:26,background:"var(--surface2)",position:"relative",overflow:"hidden",maxWidth:440,width:"100%"}}>
      <div style={{position:"absolute",top:-30,right:-30,width:130,height:130,borderRadius:"50%",background:`radial-gradient(circle,${p.accent}18,transparent 70%)`,filter:"blur(18px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${p.accent},transparent)`}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,position:"relative"}}>
        <div style={{width:40,height:40,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",background:`${p.accent}12`,border:`1px solid ${p.accent}25`,color:p.accent,flexShrink:0}}>
          {p.icon}
        </div>
        <span className="mono" style={{fontSize:9,color:"var(--muted)",letterSpacing:"0.2em"}}>{p.year}</span>
      </div>
      <h3 style={{fontSize:16,fontWeight:700,color:"var(--white)",marginBottom:3,lineHeight:1.2}}>{p.title}</h3>
      <p className="mono" style={{fontSize:9,color:p.accent,letterSpacing:"0.17em",textTransform:"uppercase",marginBottom:12}}>{p.sub}</p>
      <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.75,marginBottom:18}}>{p.desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {p.tags.map(t=><span key={t} className="stag" style={{borderColor:`${p.accent}22`,color:p.accent,background:`${p.accent}07`}}>{t}</span>)}
      </div>
      <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
        <motion.a href={p.live} target="_blank" rel="noopener noreferrer"
          whileHover={{scale:1.04,y:-2}}
          style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:100,background:p.accent,color:"#000",fontSize:11,fontWeight:700,textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase"}}>
          <ExternalLink size={11}/> Live Demo
        </motion.a>
        <motion.a href={p.repo} target="_blank" rel="noopener noreferrer"
          whileHover={{scale:1.04,y:-2}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=p.accent;e.currentTarget.style.color=p.accent;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text)";}}
          style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:100,border:"1px solid var(--border)",color:"var(--text)",fontSize:11,fontWeight:600,textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase",transition:"all 0.2s"}}>
          <Github size={11}/> Source
        </motion.a>
      </div>
    </motion.div>
  </Tilt>
);

// ─── PROJECTS TIMELINE ────────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const Projects = () => {
  const isMobile = useIsMobile();

  return (
    <Sec id="projects">
      <Wrap>
        <SH label="WHAT I'VE BUILT" title="MY PROJECTS"/>

        {/* ── MOBILE: simple vertical stack ── */}
        {isMobile ? (
          <div style={{position:"relative",paddingLeft:28}}>
            {/* Left rail line */}
            <div style={{position:"absolute",left:7,top:0,bottom:0,width:2,background:"linear-gradient(to bottom,transparent,var(--accent) 10%,var(--accent2) 50%,var(--accent3) 90%,transparent)",borderRadius:2,pointerEvents:"none"}}/>

            {PROJECTS.map((p,i)=>(
              <motion.div key={p.num}
                initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:0.15}} transition={{duration:0.45,delay:0.05}}
                style={{position:"relative",marginBottom:i<PROJECTS.length-1?36:0}}
              >
                {/* Dot on rail */}
                <motion.div
                  whileInView={{scale:[0,1.4,1]}} viewport={{once:true}} transition={{duration:0.4}}
                  style={{position:"absolute",left:-24,top:20,width:14,height:14,borderRadius:"50%",background:p.accent,border:"2px solid var(--bg)",boxShadow:`0 0 12px ${p.accent}99`,zIndex:2,flexShrink:0}}
                />
                <PCard p={p}/>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ── DESKTOP: alternating timeline ── */
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"linear-gradient(to bottom,transparent,var(--accent) 15%,var(--accent2) 50%,var(--accent3) 85%,transparent)",transform:"translateX(-50%)",pointerEvents:"none"}}/>
            {PROJECTS.map((p,i)=>{
              const isLeft = i%2===0;
              return (
                <motion.div key={p.num}
                  initial={{opacity:0,x:isLeft?-40:40}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:0.2}} transition={{duration:0.55,delay:0.05}}
                  style={{display:"grid",gridTemplateColumns:"1fr 48px 1fr",alignItems:"center",marginBottom:i<PROJECTS.length-1?64:0}}
                >
                  <div style={{paddingRight:32,display:"flex",justifyContent:"flex-end"}}>
                    {isLeft
                      ? <PCard p={p}/>
                      : <div style={{textAlign:"right"}}>
                          <div className="display" style={{fontSize:80,color:"rgba(255,255,255,0.04)",lineHeight:1}}>{p.num}</div>
                          <p className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:"0.22em"}}>{p.year}</p>
                        </div>
                    }
                  </div>
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <motion.div whileInView={{scale:[0,1.35,1]}} viewport={{once:true}} transition={{duration:0.45}}
                      style={{width:15,height:15,borderRadius:"50%",background:p.accent,border:"3px solid var(--bg)",boxShadow:`0 0 20px ${p.accent}88,0 0 50px ${p.accent}30`,position:"relative",zIndex:2,flexShrink:0}}/>
                  </div>
                  <div style={{paddingLeft:32}}>
                    {!isLeft
                      ? <PCard p={p}/>
                      : <div>
                          <div className="display" style={{fontSize:80,color:"rgba(255,255,255,0.04)",lineHeight:1}}>{p.num}</div>
                          <p className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:"0.22em"}}>{p.year}</p>
                        </div>
                    }
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Wrap>
    </Sec>
  );
};

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────
const Certifications = () => (
  <Sec id="certifications" style={{background:"var(--surface)"}}>
    <Wrap>
      <SH label="CREDENTIALS" title="CERTIFICATIONS"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>
        {CERTS.map((c,i)=>(
          <Tilt key={i}>
            <motion.div className="card rot-border"
              initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.06}}
              style={{padding:"20px 24px",display:"flex",alignItems:"center",gap:18,background:"var(--surface2)",position:"relative",overflow:"hidden"}}
            >
              <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,240,255,0.12) 0%,transparent 70%)",filter:"blur(15px)",pointerEvents:"none"}}/>
              <div style={{width:48,height:48,minWidth:48,borderRadius:12,background:"rgba(0,240,255,0.08)",border:"1px solid rgba(0,240,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--accent)",position:"relative",zIndex:2}}>
                <Award size={22}/>
              </div>
              <div style={{position:"relative",zIndex:2,minWidth:0}}>
                <p style={{fontSize:14,fontWeight:700,color:"var(--white)",marginBottom:5,lineHeight:1.3}}>{c.name}</p>
                <p className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:"0.08em",textTransform:"uppercase"}}>{c.issuer}</p>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </Wrap>
  </Sec>
);

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────
const Achievements = () => (
  <Sec id="achievements">
    <Wrap>
      <SH label="MILESTONES" title="ACHIEVEMENTS"/>
      <div className="ach-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {ACHIEVEMENTS.map((a,i)=>(
          <Tilt key={i}>
            <motion.div className="card" initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
              style={{padding:"32px 24px",textAlign:"center",background:"var(--surface)",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${a.accent},transparent)`}}/>
              <div style={{width:48,height:48,borderRadius:12,margin:"0 auto 18px",display:"flex",alignItems:"center",justifyContent:"center",background:`${a.accent}10`,border:`1px solid ${a.accent}22`,color:a.accent}}>
                <a.Icon size={20}/>
              </div>
              <div className="display" style={{fontSize:"clamp(36px,6vw,52px)",color:a.accent,lineHeight:1,marginBottom:8}}>{a.num}</div>
              <p style={{fontSize:13,fontWeight:700,color:"var(--white)",marginBottom:7}}>{a.label}</p>
              <p style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>{a.sub}</p>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </Wrap>
  </Sec>
);

// ─── CONTACT ──────────────────────────────────────────────────────────────
const Contact = () => (
  <Sec id="contact" style={{background:"var(--surface)"}}>
    <Wrap>
      <div className="grid-contact" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start"}}>
        <motion.div initial={{opacity:0,x:-28}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.55}}>
          <span className="slabel">LET'S CONNECT</span>
          <h2 className="display" style={{fontSize:"clamp(40px,6vw,80px)",color:"var(--white)",lineHeight:1,marginBottom:22}}>
            GET IN<br/><span style={{color:"var(--accent)"}}>TOUCH</span>
          </h2>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:32,maxWidth:340}}>
            Open to opportunities, collaborations, and conversations that spark something new. My inbox is always open.
          </p>
          <a href={`mailto:${ME.email}`} className="btn-y" style={{display:"inline-flex"}}>
            Send a Message <ArrowUpRight size={13}/>
          </a>
        </motion.div>
        <motion.div initial={{opacity:0,x:28}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.55}}>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
            {[
              {icon:<Mail size={15}/>,   label:"Email",    val:ME.email,    href:`mailto:${ME.email}`},
              {icon:<Phone size={15}/>,  label:"Phone",    val:ME.phone,    href:`tel:${ME.phone}`},
              {icon:<MapPin size={15}/>, label:"Location", val:ME.location, href:"#"},
            ].map(item=>(
              <motion.a key={item.label} href={item.href} className="clink" whileHover={{x:8}}>
                <div style={{width:34,height:34,minWidth:34,borderRadius:8,background:"rgba(0,240,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--accent)"}}>
                  {item.icon}
                </div>
                <div style={{minWidth:0}}>
                  <p className="mono" style={{fontSize:8,color:"var(--muted)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:2}}>{item.label}</p>
                  <p style={{fontSize:13,color:"var(--white)",fontWeight:500,wordBreak:"break-word"}}>{item.val}</p>
                </div>
              </motion.a>
            ))}
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {SOCIALS.map((social) => (
              <SocialIconBtn key={social.name} {...social} />
            ))}
          </div>
        </motion.div>
      </div>
    </Wrap>
  </Sec>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{borderTop:"1px solid var(--border)",padding:"32px",background:"var(--bg)"}}>
    <div className="footer-inner" style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
      <span className="display" style={{fontSize:24,color:"var(--accent)"}}>SK.</span>
      <p style={{fontSize:13,color:"#6b7280",fontWeight:500,textAlign:"center"}}>
        Built with <span style={{color:"#ff00a0"}}>❤️</span> by <span style={{color:"#eef0f9"}}>Saurabh (Sashi)</span> using React & Three.js
      </p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
        {SOCIALS.map((social) => (
          <SocialIconBtn key={social.name} {...social} />
        ))}
      </div>
    </div>
  </footer>
);

// ─── MOBILE HERO OVERRIDE ─────────────────────────────────────────────────
// Injected as a separate style block so it can use !important cleanly
const MOBILE_HERO_STYLES = `
  @media (max-width: 600px) {
    .hero-grid {
      grid-template-columns: 1fr !important;
      text-align: center !important;
    }
    .hero-profile {
      display: flex !important;
      justify-content: center !important;
      order: -1 !important;
      margin-bottom: 16px !important;
    }
    .hero-profile img {
      width: 160px !important;
      height: 160px !important;
    }
    .hero-buttons {
      justify-content: center !important;
    }
    .hero-stats {
      justify-content: center !important;
    }
    .gw {
      word-break: break-word !important;
    }
  }
  @media (max-width: 900px) and (min-width: 601px) {
    .hero-grid {
      grid-template-columns: 1fr auto !important;
    }
    .hero-profile {
      display: flex !important;
    }
    .hero-profile img {
      width: 180px !important;
      height: 180px !important;
    }
  }
`;

// ─── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{STYLES}</style>
      <style>{MOBILE_HERO_STYLES}</style>
      <div className="noise">
        <Cursor/>
        <ScrollBar/>
        <Nav/>
        <main>
          <Hero/>
          <Marquee/>
          <About/>
          <Skills/>
          <Projects/>
          <Certifications/>
          <Achievements/>
          <Contact/>
        </main>
        <Footer/>
      </div>
    </>
  );
}