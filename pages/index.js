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
};

// ─── Utility ───
function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
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
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Nav ───
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? C.cream + "f0" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.sand}33` : "1px solid transparent",
      transition: "all 0.4s ease",
      padding: "0 32px",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        height: 64,
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26, fontWeight: 700, letterSpacing: 2,
            color: C.greyBlack, textTransform: "uppercase",
          }}>BOND</span>
        </a>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[
            { label: "Research", href: "/daily" },
            { label: "Journal", href: "/blog" },
            { label: "Our Story", href: "#story" },
          ].map(l => (
            <a key={l.label} href={l.href} style={{
              textDecoration: "none", fontSize: 11, fontWeight: 600,
              letterSpacing: 1.6, textTransform: "uppercase",
              fontFamily: "'Nunito Sans', sans-serif",
              color: C.greyBlack, opacity: 0.6,
              transition: "opacity 0.2s ease",
            }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.6}
            >{l.label}</a>
          ))}
          <a href="/blog" style={{
            textDecoration: "none", fontSize: 10, fontWeight: 700,
            letterSpacing: 1.8, textTransform: "uppercase",
            fontFamily: "'Nunito Sans', sans-serif",
            color: C.white, background: C.greyBlack,
            padding: "9px 22px", borderRadius: 28,
            transition: "background 0.2s ease",
          }}>
            Read Now
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ───
function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: C.cream,
      padding: "120px 32px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle gradient orb */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.purple}08 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", left: "-5%",
        width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.coral}06 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 720, textAlign: "center", position: "relative" }}>
        <FadeIn>
          <p style={{
            fontSize: 11, letterSpacing: 5, textTransform: "uppercase",
            color: C.purple, fontWeight: 600, margin: "0 0 24px 0",
            fontFamily: "'Nunito Sans', sans-serif",
          }}>
            Wellness, Rooted in Science
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 56, fontWeight: 600,
            color: C.greyBlack, margin: "0 0 24px 0",
            lineHeight: 1.08, letterSpacing: -0.5,
          }}>
            Your body has a language.
            <br />
            <span style={{ color: C.purple }}>We help you read it.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.24}>
          <p style={{
            fontSize: 16, color: C.greyBlack, opacity: 0.5,
            lineHeight: 1.75, margin: "0 auto 40px",
            maxWidth: 520, fontFamily: "'Nunito Sans', sans-serif",
          }}>
            Science-backed research and education for hormones, immunity,
            and reproductive health. Built by a woman who lived it.
          </p>
        </FadeIn>
        <FadeIn delay={0.36}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/blog" style={{
              textDecoration: "none", padding: "14px 36px", borderRadius: 32,
              background: C.greyBlack, color: C.white,
              fontSize: 12, fontWeight: 700, letterSpacing: 1,
              fontFamily: "'Nunito Sans', sans-serif",
              textTransform: "uppercase",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}>
              Explore the Journal
            </a>
            <a href="/daily" style={{
              textDecoration: "none", padding: "14px 36px", borderRadius: 32,
              background: "transparent", color: C.greyBlack,
              border: `1.5px solid ${C.sand}`,
              fontSize: 12, fontWeight: 700, letterSpacing: 1,
              fontFamily: "'Nunito Sans', sans-serif",
              textTransform: "uppercase",
              transition: "border-color 0.2s ease",
            }}>
              Read the Research
            </a>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <FadeIn delay={0.6}>
          <div style={{
            marginTop: 72, display: "flex", flexDirection: "column",
            alignItems: "center", opacity: 0.3,
          }}>
            <div style={{
              width: 1, height: 40,
              background: `linear-gradient(to bottom, ${C.greyBlack}, transparent)`,
            }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Philosophy Strip ───
function PhilosophyStrip() {
  const pillars = [
    { label: "Research-Led", desc: "Every article starts with published clinical data, not trends." },
    { label: "Transparent Science", desc: "Real studies, cited sources, and plain-language explanations." },
    { label: "Woman-Founded", desc: "Built from seven years of personal health advocacy." },
  ];

  return (
    <section style={{
      padding: "72px 32px",
      background: C.white,
      borderTop: `1px solid ${C.sand}33`,
      borderBottom: `1px solid ${C.sand}33`,
    }}>
      <div style={{
        maxWidth: 960, margin: "0 auto",
        display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap",
      }}>
        {pillars.map((p, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{ textAlign: "center", maxWidth: 240 }}>
              <p style={{
                fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                color: C.purple, fontWeight: 700, margin: "0 0 10px 0",
                fontFamily: "'Nunito Sans', sans-serif",
              }}>{p.label}</p>
              <p style={{
                fontSize: 14, color: C.greyBlack, opacity: 0.5, lineHeight: 1.65, margin: 0,
                fontFamily: "'Nunito Sans', sans-serif",
              }}>{p.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Research Deep Dives ───
function ResearchDeepDives() {
  const topics = [
    {
      name: "Fertility & Inositol",
      subtitle: "The clinical evidence behind Myo-Inositol and D-Chiro at the 40:1 ratio — what the research actually shows for PCOS, egg quality, and ovulation.",
      tag: "Ingredient Science",
      accent: C.purple,
      href: "/blog/why-inositol-works",
    },
    {
      name: "Immunity & Pregnancy",
      subtitle: "Th1/Th2 cytokine ratios, NK cell activity, and what your immune labs are telling you about implantation and recurrent loss.",
      tag: "Understanding Your Labs",
      accent: C.coral,
      href: "/blog/how-your-immune-system-affects-fertility",
    },
    {
      name: "Hormonal Balance",
      subtitle: "From cortisol and insulin resistance to thyroid function and cycle regulation — the science your doctor doesn\u2019t have time to explain.",
      tag: "Hormones",
      accent: C.navy,
      href: "/blog/the-best-supplements-for-female-hormone-balance",
    },
  ];

  return (
    <section style={{
      padding: "88px 32px",
      background: C.cream,
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{
              fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
              color: C.purple, fontWeight: 700, margin: "0 0 14px 0",
              fontFamily: "'Nunito Sans', sans-serif",
            }}>The Research</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 36, fontWeight: 600,
              color: C.greyBlack, margin: 0, lineHeight: 1.15,
            }}>
              Built from the data.
              <br />
              <span style={{ opacity: 0.4 }}>Not the marketing.</span>
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}>
          {topics.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a href={p.href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: C.white, borderRadius: 20,
                  border: `1px solid ${C.sand}`,
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(45,36,33,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Gradient hero area */}
                  <div style={{
                    height: 200,
                    background: `linear-gradient(135deg, ${C.cream} 0%, ${p.accent}15 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column", gap: 8,
                  }}>
                    <span style={{
                      fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
                      color: p.accent, fontWeight: 700,
                      fontFamily: "'Nunito Sans', sans-serif",
                    }}>{p.tag}</span>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 36, fontWeight: 300, color: p.accent, opacity: 0.25,
                    }}>BOND</span>
                  </div>

                  <div style={{ padding: "24px 24px 28px" }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 22, fontWeight: 700,
                      color: C.greyBlack, margin: "0 0 8px 0",
                    }}>{p.name}</h3>
                    <p style={{
                      fontSize: 13, color: C.greyBlack, opacity: 0.5,
                      lineHeight: 1.55, margin: "0 0 18px 0",
                      fontFamily: "'Nunito Sans', sans-serif",
                    }}>{p.subtitle}</p>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                      textTransform: "uppercase", color: p.accent,
                      fontFamily: "'Nunito Sans', sans-serif",
                    }}>Read the Research →</span>
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="/blog" style={{
              textDecoration: "none", fontSize: 11, fontWeight: 700,
              letterSpacing: 1.5, textTransform: "uppercase",
              color: C.greyBlack, opacity: 0.5,
              fontFamily: "'Nunito Sans', sans-serif",
              borderBottom: `1px solid ${C.sand}`,
              paddingBottom: 2,
            }}>View All Articles →</a>
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
      padding: "88px 32px",
      background: C.white,
    }}>
      <div style={{
        maxWidth: 640, margin: "0 auto", textAlign: "center",
      }}>
        <FadeIn>
          <p style={{
            fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 18px 0",
            fontFamily: "'Nunito Sans', sans-serif",
          }}>Our Story</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 34, fontWeight: 600,
            color: C.greyBlack, margin: "0 0 24px 0", lineHeight: 1.2,
          }}>
            Born from seven years of
            <br />searching for answers.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{
            fontSize: 15, color: C.greyBlack, opacity: 0.55, lineHeight: 1.8,
            margin: "0 0 20px 0", fontFamily: "'Nunito Sans', sans-serif",
          }}>
            Before BOND was a brand, it was a binder full of lab results. Th1/Th2 cytokine panels. NK cell cytotoxicity testing. ANA titers that came back positive so many times I lost count. I learned to read my own immune labs because I had to.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            fontSize: 15, color: C.greyBlack, opacity: 0.55, lineHeight: 1.8,
            margin: "0 0 32px 0", fontFamily: "'Nunito Sans', sans-serif",
          }}>
            What I found changed everything — not just for my own journey, but for how I understand what women go through when their bodies won&apos;t cooperate with what their hearts want most. BOND exists because the science your body is telling you deserves to be heard.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18, fontStyle: "italic",
            color: C.purple, lineHeight: 1.5,
            margin: 0,
          }}>
            &ldquo;I&apos;m not telling you it&apos;s going to be easy.
            <br />I&apos;m telling you it&apos;s going to be worth it.&rdquo;
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Research Teaser ───
function ResearchTeaser() {
  return (
    <section style={{
      padding: "72px 32px",
      background: `linear-gradient(135deg, ${C.cream} 0%, ${C.purple}06 100%)`,
      borderTop: `1px solid ${C.sand}33`,
    }}>
      <div style={{
        maxWidth: 800, margin: "0 auto",
        display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <FadeIn style={{ flex: "1 1 320px", minWidth: 280 }}>
          <p style={{
            fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 14px 0",
            fontFamily: "'Nunito Sans', sans-serif",
          }}>Bond Daily</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 30, fontWeight: 600,
            color: C.greyBlack, margin: "0 0 14px 0", lineHeight: 1.2,
          }}>
            The research behind
            <br />the science.
          </h2>
          <p style={{
            fontSize: 14, color: C.greyBlack, opacity: 0.5,
            lineHeight: 1.7, margin: "0 0 24px 0",
            fontFamily: "'Nunito Sans', sans-serif",
          }}>
            Deep dives into hormones, immunity, fertility, and the science your doctor doesn&apos;t have time to explain. Free tools to help you understand your labs.
          </p>
          <a href="/daily" style={{
            textDecoration: "none", display: "inline-block",
            padding: "12px 28px", borderRadius: 28,
            background: C.purple, color: C.white,
            fontSize: 11, fontWeight: 700, letterSpacing: 1,
            fontFamily: "'Nunito Sans', sans-serif",
            textTransform: "uppercase",
          }}>
            Explore the Research
          </a>
        </FadeIn>

        <FadeIn delay={0.15} style={{ flex: "1 1 300px", minWidth: 260 }}>
          <div style={{
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            {[
              { tag: "Understanding Your Labs", title: "The Immune Panel Your OB Never Ordered", color: C.navy, href: "/blog/how-your-immune-system-affects-fertility" },
              { tag: "Ingredient Science", title: "Myo-Inositol & D-Chiro: The Clinical Evidence", color: C.green, href: "/blog/why-inositol-works" },
              { tag: "Fertility + Immunity", title: "What Your NK Cells Are Actually Telling You", color: C.coral, href: "/blog/how-your-immune-system-changes-during-pregnancy" },
            ].map((a, i) => (
              <a key={i} href={a.href} style={{
                textDecoration: "none",
                background: C.white, borderRadius: 14, padding: "16px 18px",
                border: `1px solid ${C.sand}`,
                transition: "transform 0.2s ease",
                display: "block",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
              >
                <p style={{
                  fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                  color: a.color, fontWeight: 700, margin: "0 0 4px 0",
                  fontFamily: "'Nunito Sans', sans-serif",
                }}>{a.tag}</p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16, fontWeight: 700,
                  color: C.greyBlack, margin: 0, lineHeight: 1.3,
                }}>{a.title}</p>
              </a>
            ))}
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
    <section style={{
      padding: "80px 32px",
      background: C.white,
      borderTop: `1px solid ${C.sand}33`,
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{
            fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 14px 0",
            fontFamily: "'Nunito Sans', sans-serif",
          }}>Stay Connected</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 28, fontWeight: 600,
            color: C.greyBlack, margin: "0 0 10px 0", lineHeight: 1.2,
          }}>New research. New science. No noise.</h2>
          <p style={{
            fontSize: 14, color: C.greyBlack, opacity: 0.45,
            lineHeight: 1.65, margin: "0 0 28px 0",
            fontFamily: "'Nunito Sans', sans-serif",
          }}>
            Join the BOND community for research-backed insights delivered to your inbox.
          </p>
          <div style={{
            display: "flex", gap: 8, maxWidth: 400, margin: "0 auto",
          }}>
            <input
              type="email" placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: "13px 18px", borderRadius: 12,
                border: `1px solid ${C.sand}`, fontSize: 13,
                fontFamily: "'Nunito Sans', sans-serif",
                background: C.cream, color: C.greyBlack, outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={e => e.target.style.borderColor = C.purple}
              onBlur={e => e.target.style.borderColor = C.sand}
            />
            <button style={{
              padding: "13px 28px", borderRadius: 12, border: "none",
              background: C.greyBlack, color: C.white, fontSize: 12,
              fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif",
              cursor: "pointer", letterSpacing: 0.5, flexShrink: 0,
              transition: "background 0.2s ease",
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
      padding: "48px 32px 40px",
      background: C.cream,
      borderTop: `1px solid ${C.sand}33`,
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: 40, marginBottom: 40,
        }}>
          <div>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22, fontWeight: 700, color: C.greyBlack,
              letterSpacing: 2, textTransform: "uppercase",
            }}>BOND</span>
            <p style={{
              fontSize: 13, color: C.greyBlack, opacity: 0.4, lineHeight: 1.6,
              margin: "8px 0 0", maxWidth: 240,
              fontFamily: "'Nunito Sans', sans-serif",
            }}>
              Research-backed education for women who want the real data.
            </p>
          </div>

          <div style={{ display: "flex", gap: 48 }}>
            <div>
              <p style={{
                fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                color: C.greyBlack, fontWeight: 700, margin: "0 0 12px 0", opacity: 0.4,
                fontFamily: "'Nunito Sans', sans-serif",
              }}>Research</p>
              {[
                { label: "All Articles", href: "/blog" },
                { label: "Fertility & Immunity", href: "/blog/how-your-immune-system-affects-fertility" },
                { label: "Hormonal Balance", href: "/blog/the-best-supplements-for-female-hormone-balance" },
              ].map((l, i) => (
                <a key={i} href={l.href} style={{
                  display: "block", textDecoration: "none",
                  fontSize: 13, color: C.greyBlack, opacity: 0.5,
                  margin: "0 0 8px 0", fontFamily: "'Nunito Sans', sans-serif",
                }}>{l.label}</a>
              ))}
            </div>
            <div>
              <p style={{
                fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                color: C.greyBlack, fontWeight: 700, margin: "0 0 12px 0", opacity: 0.4,
                fontFamily: "'Nunito Sans', sans-serif",
              }}>Tools</p>
              {[
                { label: "Immune Markers", href: "/tools/immune-markers" },
                { label: "Immune Data", href: "/blog/ldn-immune-data" },
                { label: "BOND Daily", href: "/daily" },
              ].map((l, i) => (
                <a key={i} href={l.href} style={{
                  display: "block", textDecoration: "none",
                  fontSize: 13, color: C.greyBlack, opacity: 0.5,
                  margin: "0 0 8px 0", fontFamily: "'Nunito Sans', sans-serif",
                }}>{l.label}</a>
              ))}
            </div>
            <div>
              <p style={{
                fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                color: C.greyBlack, fontWeight: 700, margin: "0 0 12px 0", opacity: 0.4,
                fontFamily: "'Nunito Sans', sans-serif",
              }}>Connect</p>
              {["Instagram", "Newsletter", "Contact"].map((l, i) => (
                <a key={i} href="#" style={{
                  display: "block", textDecoration: "none",
                  fontSize: 13, color: C.greyBlack, opacity: 0.5,
                  margin: "0 0 8px 0", fontFamily: "'Nunito Sans', sans-serif",
                }}>{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${C.sand}44`,
          paddingTop: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{
            fontSize: 11, color: C.greyBlack, opacity: 0.25, margin: 0,
            fontFamily: "'Nunito Sans', sans-serif",
          }}>
            &copy; 2026 BOND. All rights reserved.
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 14, fontStyle: "italic",
            color: C.purple, opacity: 0.5, margin: 0,
          }}>
            Life starts with a Bond.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main ───
export default function Home() {
  return (
    <>
      <Head>
        <title>BOND — Science-Backed Wellness for Hormones, Immunity & Reproductive Health</title>
        <meta name="description" content="Research-led education and tools for women navigating hormones, immunity, and fertility. Built by a woman who spent seven years searching for answers." />
      </Head>
      <div style={{
        background: C.cream, minHeight: "100vh",
        fontFamily: "'Nunito Sans', sans-serif", color: C.greyBlack,
      }}>
        <Nav />
        <Hero />
        <PhilosophyStrip />
        <ResearchDeepDives />
        <StorySection />
        <ResearchTeaser />
        <SubscribeSection />
        <Footer />
      </div>
    </>
  );
}
