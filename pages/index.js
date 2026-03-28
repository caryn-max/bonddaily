import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const C = {
  cream: "#FFF9E8",
  sand: "#E9E2D2",
  yellow: "#F3F1A9",
  purple: "#A1799B",
  navy: "#44697C",
  coral: "#F48F75",
  green: "#698A7E",
  greyBlack: "#2D2421",
  white: "#FFFFFF",
  conceptionYellow: "#EDB468",
};

// ─── Utility ───
function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Nav ───
function Nav({ activeSection }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "story", label: "Our Story" },
    { id: "research", label: "Research" },
    { id: "tools", label: "Tools" },
    { id: "subscribe", label: "Subscribe" },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: C.cream + "ee", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.sand}44`,
      padding: "0 20px",
    }}>
      <div style={{
        maxWidth: 960, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        height: 56,
      }}>
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700,
            color: C.greyBlack, letterSpacing: -0.5,
          }}>bond</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700,
            color: C.purple, letterSpacing: -0.5,
          }}>daily</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} style={{
              textDecoration: "none", fontSize: 11, fontWeight: 600,
              letterSpacing: 1.2, textTransform: "uppercase",
              fontFamily: "'Nunito Sans', sans-serif",
              color: activeSection === l.id ? C.purple : C.greyBlack,
              opacity: activeSection === l.id ? 1 : 0.5,
              transition: "all 0.2s ease",
              borderBottom: activeSection === l.id ? `2px solid ${C.purple}` : "2px solid transparent",
              paddingBottom: 2,
            }}>
              {l.label}
            </a>
          ))}
          <a href="https://bond.life" target="_blank" rel="noopener noreferrer" style={{
            textDecoration: "none", fontSize: 10, fontWeight: 700,
            letterSpacing: 1.5, textTransform: "uppercase",
            fontFamily: "'Nunito Sans', sans-serif",
            color: C.white, background: C.purple,
            padding: "7px 16px", borderRadius: 20,
          }}>
            Shop BOND
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ───
function Hero() {
  return (
    <section id="top" style={{
      padding: "80px 20px 60px",
      background: `linear-gradient(180deg, ${C.cream} 0%, ${C.white} 100%)`,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 16px 0",
          }}>
            By the founder of BOND
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700,
            color: C.greyBlack, margin: "0 0 16px 0", lineHeight: 1.1,
          }}>
            The science your body
            <br />
            <em style={{ color: C.purple, fontStyle: "italic" }}>is already telling you.</em>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontSize: 15, color: C.greyBlack, opacity: 0.55, lineHeight: 1.7,
            margin: "0 0 28px 0", maxWidth: 480, marginLeft: "auto", marginRight: "auto",
          }}>
            Research-backed insights on hormones, immunity, and reproductive health — from someone who lived it, studied it, and built a company around it.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#research" style={{
              textDecoration: "none", padding: "12px 28px", borderRadius: 28,
              background: C.purple, color: C.white, fontSize: 12, fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif", letterSpacing: 0.5,
            }}>
              Read the Research
            </a>
            <a href="#tools" style={{
              textDecoration: "none", padding: "12px 28px", borderRadius: 28,
              background: "transparent", color: C.purple,
              border: `1.5px solid ${C.purple}`, fontSize: 12, fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif", letterSpacing: 0.5,
            }}>
              Check Your Markers
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Story Section ───
function StorySection() {
  return (
    <section id="story" style={{
      padding: "64px 20px", background: C.white,
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontSize: 9, letterSpacing: 3.5, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 14px 0",
          }}>
            Why this exists
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700,
            color: C.greyBlack, margin: "0 0 20px 0", lineHeight: 1.15,
          }}>
            I spent years searching for answers
            <br />my doctors weren&apos;t asking about.
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{
            background: C.cream, borderRadius: 20, padding: 28,
            border: `1px solid ${C.sand}`,
          }}>
            <p style={{ fontSize: 13, color: C.greyBlack, opacity: 0.65, lineHeight: 1.75, margin: "0 0 16px 0" }}>
              Before BOND was a brand, it was a binder full of lab results. Seven years of blood draws. Th1/Th2 cytokine panels. NK cell cytotoxicity testing. ANA titers that came back positive so many times I lost count. Genetic mutations that nobody explained until I found the right specialist.
            </p>
            <p style={{ fontSize: 13, color: C.greyBlack, opacity: 0.65, lineHeight: 1.75, margin: "0 0 16px 0" }}>
              I learned to read my own immune labs because I had to. And what I found changed everything — not just for my own journey, but for how I understand what women go through when their bodies won&apos;t cooperate with what their hearts want most.
            </p>
            <p style={{ fontSize: 13, color: C.greyBlack, opacity: 0.65, lineHeight: 1.75, margin: 0 }}>
              Bond Daily is where I share what I&apos;ve learned — the research, the real data, the conversations most of us never get to have with our doctors. Because the science your body is telling you deserves to be heard.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
            color: C.purple, fontStyle: "italic", marginTop: 20, lineHeight: 1.5,
            textAlign: "center",
          }}>
            &ldquo;I&apos;m not telling you it&apos;s going to be easy. I&apos;m telling you it&apos;s going to be worth it.&rdquo;
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Research Section ───
const articles = [
  {
    tag: "Immune Deep Dive",
    title: "Low-Dose Naltrexone and Your Immune Markers: What the Science Actually Shows",
    desc: "A walk through what LDN does to measurable immune markers like cytokines and T-cells \u2014 with real lab data mapped against the research.",
    expanded: [
      "Low-dose naltrexone (LDN) has gained significant attention in reproductive immunology circles for its ability to modulate immune function at doses far below those used for addiction treatment. At 1.5\u20134.5mg, LDN temporarily blocks opioid receptors, triggering an upregulation of endorphins and enkephalins that, in turn, help regulate immune cell behavior.",
      "The research shows measurable shifts in Th1/Th2 cytokine ratios, with several studies demonstrating a reduction in pro-inflammatory Th1 dominance \u2014 a pattern frequently seen in women with recurrent pregnancy loss. NK cell cytotoxicity, often elevated in women with unexplained infertility, has also been shown to normalize in some patients on LDN protocols.",
      "What makes LDN particularly interesting is its effect on regulatory T cells (Tregs), which play a critical role in immune tolerance during pregnancy. Early data suggests LDN may support Treg expansion, helping the body accept rather than attack an embryo. While large-scale randomized trials are still limited, the mechanistic evidence and clinical case data are compelling enough that many reproductive immunologists now include LDN in their protocols.",
    ],
    topics: ["LDN", "Th1/Th2", "NK Cells", "Autoimmunity"],
    color: C.coral,
  },
  {
    tag: "Understanding Your Labs",
    title: "The Immune Panel Your OB Probably Never Ordered",
    desc: "Th1/Th2 ratios, NK cell cytotoxicity, CD19+/CD5+ B cells, ANA titers \u2014 what they are, why they matter for fertility, and how to read yours.",
    expanded: [
      "Most OB-GYNs run a standard fertility panel: FSH, LH, estradiol, AMH, TSH. And those are important. But they tell you almost nothing about your immune system \u2014 which, for a significant percentage of women with unexplained infertility or recurrent loss, is where the real answers are hiding.",
      "A reproductive immunology panel typically includes: Th1/Th2 cytokine ratios (measuring the balance between pro-inflammatory and anti-inflammatory immune responses), NK cell cytotoxicity (how aggressively your natural killer cells attack \u2014 including potentially an embryo), CD19+/CD5+ B cells (associated with autoantibody production), and ANA titers (a marker for autoimmune activity).",
      "Understanding these numbers isn\u2019t just academic. Elevated NK cell activity above 15\u201318% cytotoxicity is considered a red flag by most reproductive immunologists. A Th1/Th2 ratio skewed toward Th1 dominance suggests your immune system may be creating a hostile environment for implantation. Positive ANA titers, especially at 1:80 or above, warrant further investigation into specific autoimmune conditions that can directly impact pregnancy outcomes.",
    ],
    topics: ["Lab Interpretation", "Reproductive Immunology", "Fertility"],
    color: C.navy,
  },
  {
    tag: "Root Cause",
    title: "Autoimmune Infertility: The Diagnosis Nobody Talks About",
    desc: "When your immune system is the reason you can\u2019t stay pregnant \u2014 the research, the markers, and what can actually be done about it.",
    expanded: [
      "Autoimmune infertility isn\u2019t a fringe diagnosis \u2014 it\u2019s an underdiagnosed one. Research suggests that immune dysfunction may be a contributing factor in up to 50% of cases classified as \u201Cunexplained\u201D infertility or recurrent pregnancy loss. Yet most women never receive the testing that would reveal it.",
      "The mechanism is straightforward: in some women, the immune system fails to make the necessary shift from Th1 (attack mode) to Th2 (tolerance mode) that is required for successful implantation and pregnancy maintenance. The body essentially treats the embryo as a foreign invader. This can manifest as failed implantation, biochemical pregnancies, or losses in the first trimester.",
      "Treatment protocols typically involve a combination of approaches: immunosuppressive medications like prednisone or intralipid infusions, immune modulators like LDN or hydroxychloroquine, and sometimes IVIG (intravenous immunoglobulin) for more severe cases. The key is identifying which specific immune pathways are dysregulated through comprehensive testing \u2014 and then targeting the treatment accordingly.",
    ],
    topics: ["Autoimmunity", "RPL", "Immune Protocol"],
    color: C.purple,
  },
  {
    tag: "Ingredient Science",
    title: "Myo-Inositol and D-Chiro Inositol: The Clinical Evidence",
    desc: "What the research actually shows about the 40:1 ratio, PCOS, ovulatory function, and why not all inositol supplements are the same.",
    expanded: [
      "Inositol has become one of the most talked-about supplements in fertility and PCOS management \u2014 but the details matter enormously. There are nine forms of inositol, and only two have substantial clinical evidence behind them: myo-inositol (MI) and D-chiro-inositol (DCI). The ratio between them is critical.",
      "The body naturally maintains a 40:1 ratio of MI to DCI in most tissues, and research consistently shows that supplementing at this ratio produces the best outcomes for ovulatory function, insulin sensitivity, and oocyte quality. Studies have demonstrated that women with PCOS who supplement with the 40:1 ratio show improved menstrual regularity, reduced androgens, and better IVF outcomes compared to those taking MI alone or at different ratios.",
      "Here\u2019s where it gets important: too much D-chiro-inositol can actually impair ovarian function. DCI at high doses has been shown to worsen oocyte quality in the ovaries, even while improving metabolic markers elsewhere. This is why the ratio matters \u2014 and why grabbing any inositol supplement off the shelf without checking the formulation can backfire. Look for products that explicitly state the 40:1 MI:DCI ratio, ideally at doses of 4000mg MI to 100mg DCI daily.",
    ],
    topics: ["Inositol", "PCOS", "Ovulation", "Clinical Data"],
    color: C.green,
  },
];

function ResearchCard({ article }) {
  const [open, setOpen] = useState(false);
  const a = article;

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: C.white, borderRadius: 18, padding: 22,
        border: `1px solid ${open ? a.color + "40" : C.sand}`,
        boxShadow: open ? `0 4px 20px rgba(45,36,33,0.08)` : "0 2px 12px rgba(45,36,33,0.04)",
        cursor: "pointer", transition: "all 0.3s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
        background: a.color, borderRadius: "18px 0 0 18px",
      }} />
      <div style={{ paddingLeft: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{
            fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
            color: a.color, fontWeight: 700,
          }}>
            {a.tag}
          </span>
          <span style={{
            fontSize: 18, color: a.color, transition: "transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0, marginLeft: 12, lineHeight: 1,
          }}>
            {open ? "\u2212" : "+"}
          </span>
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 700,
          color: C.greyBlack, margin: "6px 0 6px 0", lineHeight: 1.25,
        }}>
          {a.title}
        </h3>
        <p style={{
          fontSize: 12, color: C.greyBlack, opacity: 0.55, lineHeight: 1.6, margin: "0 0 10px 0",
        }}>
          {a.desc}
        </p>

        {/* Expanded content */}
        <div style={{
          maxHeight: open ? 800 : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s ease, opacity 0.4s ease",
        }}>
          <div style={{
            borderTop: `1px solid ${C.sand}`,
            marginTop: 12, paddingTop: 16,
          }}>
            {a.expanded.map((paragraph, pi) => (
              <p key={pi} style={{
                fontSize: 13, color: C.greyBlack, opacity: 0.65, lineHeight: 1.75,
                margin: pi < a.expanded.length - 1 ? "0 0 14px 0" : 0,
              }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: open ? 14 : 0 }}>
          {a.topics.map((t, j) => (
            <span key={j} style={{
              fontSize: 9, fontWeight: 600, padding: "3px 10px", borderRadius: 12,
              background: a.color + "10", color: a.color,
              fontFamily: "'Nunito Sans', sans-serif",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResearchSection() {
  return (
    <section id="research" style={{
      padding: "64px 20px",
      background: `linear-gradient(180deg, ${C.cream} 0%, ${C.white} 100%)`,
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontSize: 9, letterSpacing: 3.5, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 10px 0",
          }}>
            Research &amp; Writing
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700,
            color: C.greyBlack, margin: "0 0 8px 0", lineHeight: 1.15,
          }}>
            Go deeper.
          </h2>
          <p style={{
            fontSize: 13, color: C.greyBlack, opacity: 0.5, margin: "0 0 28px 0", lineHeight: 1.6,
          }}>
            Research-backed articles on hormones, immunity, fertility, and the science behind what your body is trying to tell you.
          </p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {articles.map((a, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <ResearchCard article={a} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tools Section ───
function ToolsSection() {
  return (
    <section id="tools" style={{ padding: "64px 20px", background: C.white }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontSize: 9, letterSpacing: 3.5, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 10px 0",
          }}>
            Interactive Tools
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700,
            color: C.greyBlack, margin: "0 0 8px 0", lineHeight: 1.15,
          }}>
            Know your numbers.
          </h2>
          <p style={{
            fontSize: 13, color: C.greyBlack, opacity: 0.5, margin: "0 0 28px 0", lineHeight: 1.6,
          }}>
            Free tools to help you understand your labs and take that knowledge to your next appointment.
          </p>
        </FadeIn>

        {/* Tool cards */}
        {[
          {
            icon: "\uD83D\uDD2C",
            title: "Immune Marker Assessment",
            desc: "Enter your Th1/Th2 ratios, NK cell cytotoxicity, ANA titers, and CD19+/CD5+ B cells. See where your numbers fall relative to published reproductive immunology reference ranges.",
            cta: "Check Your Markers",
            accent: C.coral,
            available: true,
          },
          {
            icon: "\uD83E\uDDEC",
            title: "Hormone Panel Decoder",
            desc: "TSH, Free T3, Free T4, DHEA-S, AMH, estradiol, progesterone — understand what your hormones are saying about your thyroid, stress response, and fertility window.",
            cta: "Coming Soon",
            accent: C.navy,
            available: false,
          },
          {
            icon: "\uD83D\uDC8A",
            title: "Supplement Stack Builder",
            desc: "Based on your labs and symptoms, see which supplements the research supports — and why. Built from clinical data, not marketing claims.",
            cta: "Coming Soon",
            accent: C.green,
            available: false,
          },
        ].map((tool, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{
              background: C.cream, borderRadius: 20, padding: 24, marginBottom: 14,
              border: `1px solid ${C.sand}`,
              opacity: tool.available ? 1 : 0.6,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{tool.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 700,
                    color: C.greyBlack, margin: "0 0 6px 0",
                  }}>
                    {tool.title}
                  </h3>
                  <p style={{
                    fontSize: 12, color: C.greyBlack, opacity: 0.55, lineHeight: 1.6, margin: "0 0 14px 0",
                  }}>
                    {tool.desc}
                  </p>
                  <span style={{
                    display: "inline-block", padding: "8px 20px", borderRadius: 24,
                    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                    fontFamily: "'Nunito Sans', sans-serif",
                    background: tool.available ? tool.accent : C.sand,
                    color: tool.available ? C.white : C.greyBlack,
                    cursor: tool.available ? "pointer" : "default",
                  }}>
                    {tool.cta}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Book Teaser ───
function BookTeaser() {
  return (
    <section style={{
      padding: "64px 20px",
      background: `linear-gradient(135deg, ${C.purple}0a 0%, ${C.cream} 50%, ${C.yellow}15 100%)`,
    }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{
            fontSize: 9, letterSpacing: 3.5, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 14px 0",
          }}>
            Coming Soon
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700,
            color: C.greyBlack, margin: "0 0 12px 0", lineHeight: 1.15,
          }}>
            Learning to Listen
          </h2>
          <p style={{
            fontSize: 14, color: C.greyBlack, opacity: 0.5, lineHeight: 1.7,
            margin: "0 0 24px 0",
          }}>
            A book about what happens when you stop ignoring your body&apos;s signals and start reading the data it&apos;s been giving you all along. Part memoir, part science, part permission slip to trust what you feel.
          </p>
          <div style={{
            display: "inline-block", padding: "10px 28px", borderRadius: 24,
            border: `1.5px solid ${C.purple}`, color: C.purple,
            fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
            fontFamily: "'Nunito Sans', sans-serif",
          }}>
            Notify Me When It&apos;s Ready
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Subscribe ───
function SubscribeSection() {
  const [email, setEmail] = useState("");

  return (
    <section id="subscribe" style={{ padding: "64px 20px", background: C.white }}>
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{
            fontSize: 9, letterSpacing: 3.5, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 14px 0",
          }}>
            Stay Connected
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700,
            color: C.greyBlack, margin: "0 0 8px 0", lineHeight: 1.2,
          }}>
            New research, straight to your inbox.
          </h2>
          <p style={{
            fontSize: 13, color: C.greyBlack, opacity: 0.5, lineHeight: 1.6,
            margin: "0 0 24px 0",
          }}>
            No spam. No sales pitches. Just the science — with the context your doctor probably doesn&apos;t have time to give you.
          </p>
          <div style={{
            display: "flex", gap: 8, maxWidth: 380, margin: "0 auto",
          }}>
            <input
              type="email" placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: "12px 16px", borderRadius: 12,
                border: `1px solid ${C.sand}`, fontSize: 13,
                fontFamily: "'Nunito Sans', sans-serif",
                background: C.cream, color: C.greyBlack, outline: "none",
              }}
            />
            <button style={{
              padding: "12px 24px", borderRadius: 12, border: "none",
              background: C.purple, color: C.white, fontSize: 12,
              fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif",
              cursor: "pointer", letterSpacing: 0.5, flexShrink: 0,
            }}>
              Subscribe
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer style={{
      padding: "40px 20px", background: C.cream,
      borderTop: `1px solid ${C.sand}44`, textAlign: "center",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: C.greyBlack,
          }}>bond</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: C.purple,
          }}>daily</span>
        </div>
        <p style={{ fontSize: 11, color: C.greyBlack, opacity: 0.35, lineHeight: 1.6, margin: "0 0 8px 0" }}>
          Research and education by the founder of{" "}
          <a href="https://bond.life" target="_blank" rel="noopener noreferrer"
            style={{ color: C.purple, textDecoration: "none", fontWeight: 600 }}>
            BOND
          </a>
        </p>
        <p style={{ fontSize: 10, color: C.greyBlack, opacity: 0.25, lineHeight: 1.5, margin: 0 }}>
          Content is for educational purposes only and does not constitute medical advice.
          Always consult a qualified healthcare provider.
        </p>
        <div style={{
          display: "flex", justifyContent: "center", gap: 20, marginTop: 16,
        }}>
          {["Instagram", "Newsletter", "BOND Shop"].map((link, i) => (
            <a key={i} href="#" style={{
              fontSize: 10, color: C.greyBlack, opacity: 0.4, textDecoration: "none",
              fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600,
              letterSpacing: 0.5, textTransform: "uppercase",
            }}>
              {link}
            </a>
          ))}
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
          color: C.purple, fontStyle: "italic", marginTop: 20, opacity: 0.6,
        }}>
          Life starts with a Bond.
        </p>
      </div>
    </footer>
  );
}

// ─── Main ───
export default function BondDaily() {
  return (
    <>
      <Head>
        <title>Bond Daily — Research-Backed Insights on Hormones, Immunity & Reproductive Health</title>
      </Head>
      <div style={{
        background: C.cream, minHeight: "100vh",
        fontFamily: "'Nunito Sans', sans-serif", color: C.greyBlack,
      }}>
        <Nav />
        <Hero />
        <StorySection />
        <ResearchSection />
        <ToolsSection />
        <BookTeaser />
        <SubscribeSection />
        <Footer />
      </div>
    </>
  );
}
