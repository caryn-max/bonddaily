// Bond Daily — Research & Content Hub
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../lib/posts";

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

const tagColors = {
  "PCOS": C.purple, "fertility": C.coral, "immune system": C.navy,
  "gut health": C.green, "hormone balance": C.conceptionYellow,
  "autoimmune infertility": C.coral, "inositol": C.green,
  "cortisol": C.navy, "PMS": C.purple, "luteal": C.purple,
  "cycle regulation": C.green, "cycle support": C.green,
  "endometriosis": C.coral, "hormonal acne": C.coral,
  "insulin resistance": C.navy, "metabolic health": C.navy,
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
  const links = [
    { id: "story", label: "Our Story" },
    { id: "research", label: "Research" },
    { id: "journal", label: "Journal" },
    { id: "tools", label: "Tools" },
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
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700,
            color: C.greyBlack, letterSpacing: -0.5,
          }}>bond</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700,
            color: C.purple, letterSpacing: -0.5,
          }}>daily</span>
        </Link>

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
          <a href="https://bond.life/collections/shop-all" target="_blank" rel="noopener noreferrer" style={{
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
    <section style={{
      minHeight: "70vh",
      background: `linear-gradient(135deg, ${C.cream} 0%, ${C.purple}11 50%, ${C.cream} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "80px 32px 60px", textAlign: "center",
    }}>
      <div style={{ maxWidth: 680 }}>
        <FadeIn>
          <p style={{
            fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 20px 0",
            fontFamily: "'Nunito Sans', sans-serif",
          }}>
            Bond Daily
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5.5vw, 56px)",
            fontWeight: 700, color: C.greyBlack,
            lineHeight: 1.1, margin: "0 0 20px 0",
          }}>
            Research that respects
            <br />
            <span style={{ color: C.purple }}>what your body knows.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontSize: 17, color: C.greyBlack, opacity: 0.5, lineHeight: 1.7,
            margin: "0 0 36px 0", fontFamily: "'Nunito Sans', sans-serif",
          }}>
            We translate the latest in reproductive immunology, fertility, hormones, and conditions like PCOS, endometriosis, and autoimmune disorders into real, actionable insights.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#journal" style={{
              textDecoration: "none", fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 13, fontWeight: 700, letterSpacing: 1,
              color: C.white, background: C.purple,
              padding: "14px 32px", borderRadius: 28,
              transition: "transform 0.2s ease",
            }}>
              Read the Journal
            </a>
            <a href="/tools/immune-markers" style={{
              textDecoration: "none", fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 13, fontWeight: 700, letterSpacing: 1,
              color: C.purple, background: "transparent",
              border: `2px solid ${C.purple}33`,
              padding: "12px 28px", borderRadius: 28,
              transition: "all 0.2s ease",
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
            What I found changed everything {"\u2014"} not just for my own journey, but for how I understand what women go through when their bodies won{"\u2019"}t cooperate with what their hearts want most. BOND exists because the science your body is telling you deserves to be heard.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18, fontStyle: "italic",
            color: C.purple, lineHeight: 1.5,
            margin: 0,
          }}>
            {"\u201C"}I{"\u2019"}m not telling you it{"\u2019"}s going to be easy.
            <br />I{"\u2019"}m telling you it{"\u2019"}s going to be worth it.{"\u201D"}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Research Pillars ───
function ResearchTeaser() {
  return (
    <section id="research" style={{
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
            fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 14px 0",
            fontFamily: "'Nunito Sans', sans-serif",
          }}>From the Research</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 30, fontWeight: 600,
            color: C.greyBlack, margin: "0 0 12px 0", lineHeight: 1.2,
          }}>
            Science you can
            <br />actually use.
          </h2>
          <p style={{
            fontSize: 14, color: C.greyBlack, opacity: 0.4, lineHeight: 1.7,
            margin: 0, fontFamily: "'Nunito Sans', sans-serif",
          }}>
            Deep dives into the research behind hormones, immunity, and reproductive health.
          </p>
        </FadeIn>
        <FadeIn delay={0.15} style={{ flex: "1 1 320px", minWidth: 280 }}>
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
                transition: "all 0.2s ease",
              }}>
                <p style={{
                  fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                  color: a.color, fontWeight: 700, margin: "0 0 5px 0",
                  fontFamily: "'Nunito Sans', sans-serif",
                }}>{a.tag}</p>
                <p style={{
                  fontSize: 15, fontWeight: 600, color: C.greyBlack,
                  margin: 0, lineHeight: 1.35,
                  fontFamily: "'Cormorant Garamond', serif",
                }}>{a.title}</p>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Journal Section (Blog Preview) ───
function JournalSection({ posts }) {
  return (
    <section id="journal" style={{
      padding: "88px 32px",
      background: C.cream,
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{
              fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
              color: C.purple, fontWeight: 700, margin: "0 0 14px 0",
              fontFamily: "'Nunito Sans', sans-serif",
            }}>The Journal</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 36, fontWeight: 600,
              color: C.greyBlack, margin: "0 0 8px", lineHeight: 1.15,
            }}>
              Bonded by Science
            </h2>
            <p style={{
              fontSize: 15, color: C.greyBlack, opacity: 0.45, lineHeight: 1.7,
              margin: 0, fontFamily: "'Nunito Sans', sans-serif",
            }}>
              Research-backed insights on hormones, immunity, and reproductive health.
            </p>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {posts.slice(0, 6).map((post, i) => {
            const tagColor = tagColors[post.tags[0]] || C.navy;
            return (
              <FadeIn key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{
                    background: C.white, borderRadius: 16, overflow: "hidden",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    cursor: "pointer", height: "100%",
                    display: "flex", flexDirection: "column",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"; }}
                  >
                    <div style={{
                      height: 140,
                      background: post.heroGradient || `linear-gradient(135deg, ${C.purple} 0%, ${C.navy} 100%)`,
                      position: "relative",
                    }}>
                      <div style={{
                        position: "absolute", top: 14, left: 14,
                        background: C.cream + "dd", backdropFilter: "blur(8px)",
                        padding: "3px 10px", borderRadius: 10,
                        fontFamily: "'Nunito Sans', sans-serif", fontSize: 10, fontWeight: 600,
                        color: tagColor, letterSpacing: 0.5, textTransform: "uppercase",
                      }}>
                        {post.tags[0]}
                      </div>
                    </div>
                    <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 20, fontWeight: 700, color: C.greyBlack,
                        lineHeight: 1.25, margin: "0 0 10px",
                      }}>
                        {post.title}
                      </h3>
                      <p style={{
                        fontFamily: "'Nunito Sans', sans-serif", fontSize: 13,
                        color: C.greyBlack + "77", lineHeight: 1.6,
                        margin: "0 0 14px", flex: 1,
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {post.excerpt}
                      </p>
                      <span style={{
                        fontFamily: "'Nunito Sans', sans-serif", fontSize: 12,
                        fontWeight: 600, color: C.purple,
                      }}>
                        Read {"\u2192"}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/blog" style={{
              textDecoration: "none", fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 13, fontWeight: 700, letterSpacing: 1,
              color: C.white, background: C.purple,
              padding: "14px 36px", borderRadius: 28,
              display: "inline-block",
            }}>
              View All Articles {"\u2192"}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Tools Teaser ───
function ToolsTeaser() {
  return (
    <section id="tools" style={{
      padding: "72px 32px",
      background: C.white,
      borderTop: `1px solid ${C.sand}33`,
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{
            fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 14px 0",
            fontFamily: "'Nunito Sans', sans-serif",
          }}>Interactive Tools</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 30, fontWeight: 600,
            color: C.greyBlack, margin: "0 0 16px 0", lineHeight: 1.2,
          }}>
            Check Your Markers
          </h2>
          <p style={{
            fontSize: 15, color: C.greyBlack, opacity: 0.45, lineHeight: 1.7,
            margin: "0 0 28px 0", fontFamily: "'Nunito Sans', sans-serif",
          }}>
            Enter your immune panel results and see where you stand. Built from the same panels used in reproductive immunology clinics.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <a href="/tools/immune-markers" style={{
            textDecoration: "none", fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 13, fontWeight: 700, letterSpacing: 1,
            color: C.white, background: C.navy,
            padding: "14px 36px", borderRadius: 28,
            display: "inline-block",
          }}>
            Try the Immune Marker Tool {"\u2192"}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Subscribe ───
function SubscribeSection() {
  return (
    <section style={{
      padding: "72px 32px",
      background: `linear-gradient(135deg, ${C.purple}08 0%, ${C.cream} 100%)`,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 28, fontWeight: 600,
            color: C.greyBlack, margin: "0 0 12px 0", lineHeight: 1.2,
          }}>
            Stay bonded.
          </h2>
          <p style={{
            fontSize: 14, color: C.greyBlack, opacity: 0.45, lineHeight: 1.7,
            margin: "0 0 28px 0", fontFamily: "'Nunito Sans', sans-serif",
          }}>
            New research, tools, and insights delivered to your inbox.
          </p>
          <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
            <input placeholder="Your email" style={{
              flex: 1, padding: "12px 16px", border: `1px solid ${C.sand}`,
              borderRadius: 8, fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 14, background: C.white, outline: "none",
            }} />
            <button style={{
              padding: "12px 24px", background: C.purple, color: C.white,
              border: "none", borderRadius: 8, fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5,
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
    <footer style={{ background: C.greyBlack, padding: "48px 20px", textAlign: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: C.cream, margin: 0 }}>
        bond<span style={{ color: C.purple }}>daily</span>
      </p>
      <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, color: C.cream + "66", marginTop: 12 }}>
        Research-backed insights on hormones, immunity, and reproductive health.
      </p>
      <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 11, color: C.cream + "44", marginTop: 24 }}>
        {"\u00A9"} {new Date().getFullYear()} BOND {"\u00B7"} bond.life
      </p>
    </footer>
  );
}

// ─── Main Page ───
export default function Daily({ posts }) {
  return (
    <>
      <Head>
        <title>Bond Daily | Research & Insights on Hormones, Immunity & Reproductive Health</title>
        <meta name="description" content="Research-backed insights on hormones, immunity, and reproductive health — by the founder of BOND." />
      </Head>

      <div style={{ background: C.cream, minHeight: "100vh" }}>
        <Nav />
        <Hero />
        <StorySection />
        <ResearchTeaser />
        <JournalSection posts={posts} />
        <ToolsTeaser />
        <SubscribeSection />
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts().map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    tags: p.tags,
    excerpt: p.excerpt,
    heroImage: p.heroImage || null,
    heroGradient: p.heroGradient || null,
  }));

  return { props: { posts } };
}
