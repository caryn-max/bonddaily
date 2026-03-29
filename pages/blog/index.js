// Bond Daily — Blog Listing Page
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts, getAllTags } from "../lib/posts";

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
  "histamine levels": C.coral, "hormone production": C.green,
};

/* ─── Nav ─── */
function Nav() {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: C.cream + "ee", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.sand}44`, padding: "0 20px",
    }}>
      <div style={{
        maxWidth: 1080, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center", height: 56,
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: C.greyBlack, letterSpacing: -0.5 }}>bond</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: C.purple, letterSpacing: -0.5 }}>daily</span>
        </Link>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Link href="/tools/immune-markers" style={{
            textDecoration: "none", fontSize: 11, fontWeight: 600,
            letterSpacing: 1, textTransform: "uppercase",
            fontFamily: "'Nunito Sans', sans-serif", color: C.greyBlack, opacity: 0.6,
          }}>
            Tools
          </Link>
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

/* ─── Tag Filter Pill ─── */
function FilterPill({ label, active, onClick }) {
  const color = tagColors[label] || C.navy;
  return (
    <button onClick={onClick} style={{
      border: active ? `2px solid ${color}` : `1px solid ${C.sand}`,
      background: active ? color + "15" : "transparent",
      color: active ? color : C.greyBlack + "88",
      fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, fontWeight: 600,
      padding: "6px 16px", borderRadius: 20, cursor: "pointer",
      letterSpacing: 0.5, transition: "all 0.2s ease",
      whiteSpace: "nowrap",
    }}>
      {label}
    </button>
  );
}

/* ─── Post Card ─── */
function PostCard({ post, featured }) {
  const tagColor = tagColors[post.tags[0]] || C.navy;

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article style={{
        background: C.white, borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",
        height: "100%",
        display: "flex", flexDirection: "column",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"; }}
      >
        {/* Gradient Hero */}
        <div style={{
          height: featured ? 220 : 160,
          background: post.heroImage ? `url(${post.heroImage}) center/cover` : (post.heroGradient || `linear-gradient(135deg, ${C.purple} 0%, ${C.navy} 100%)`),
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 16, left: 16,
            background: C.cream + "dd", backdropFilter: "blur(8px)",
            padding: "4px 12px", borderRadius: 12,
            fontFamily: "'Nunito Sans', sans-serif", fontSize: 11, fontWeight: 600,
            color: tagColor, letterSpacing: 0.5, textTransform: "uppercase",
          }}>
            {post.tags[0]}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: featured ? "24px 28px" : "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: featured ? 26 : 21,
            fontWeight: 700, color: C.greyBlack,
            lineHeight: 1.25, margin: "0 0 12px",
          }}>
            {post.title}
          </h3>
          <p style={{
            fontFamily: "'Nunito Sans', sans-serif", fontSize: 14,
            color: C.greyBlack + "88", lineHeight: 1.6,
            margin: "0 0 16px", flex: 1,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {post.excerpt}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{
              fontFamily: "'Nunito Sans', sans-serif", fontSize: 12,
              color: C.greyBlack + "55",
            }}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span style={{
              fontFamily: "'Nunito Sans', sans-serif", fontSize: 12,
              fontWeight: 600, color: C.purple,
            }}>
              Read {"\u2192"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ─── Footer ─── */
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

/* ─── Main Page ─── */
export default function DailyBlog({ posts, tags }) {
  const [activeTag, setActiveTag] = useState(null);

  const filtered = activeTag
    ? posts.filter(p => p.tags.includes(activeTag))
    : posts;

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <Head>
        <title>Bond Daily | Research & Insights on Hormones, Immunity & Reproductive Health</title>
        <meta name="description" content="Research-backed insights on hormones, immunity, and reproductive health — by the founder of BOND." />
        <link rel="canonical" href="https://www.bonddaily.co/blog" />
      </Head>

      <div style={{ background: C.cream, minHeight: "100vh" }}>
        <Nav />

        {/* Hero Header */}
        <header style={{
          maxWidth: 1080, margin: "0 auto", padding: "56px 20px 24px",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Nunito Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: 2.5, textTransform: "uppercase", color: C.purple,
            margin: "0 0 12px",
          }}>
            The Journal
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 700, color: C.greyBlack, lineHeight: 1.1,
            margin: "0 0 16px",
          }}>
            Bonded by Science
          </h1>
          <p style={{
            fontFamily: "'Nunito Sans', sans-serif", fontSize: 17,
            color: C.greyBlack + "88", maxWidth: 560, margin: "0 auto 36px",
            lineHeight: 1.6,
          }}>
            Research-backed insights on hormones, immunity, and reproductive health {"\u2014"} translated into real, actionable guidance.
          </p>

          {/* Tag Filters */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 8,
            justifyContent: "center", maxWidth: 720, margin: "0 auto",
          }}>
            <FilterPill label="All" active={!activeTag} onClick={() => setActiveTag(null)} />
            {tags.map(t => (
              <FilterPill key={t} label={t} active={activeTag === t} onClick={() => setActiveTag(t)} />
            ))}
          </div>
        </header>

        {/* Featured Post */}
        {featured && (
          <section style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 20px 0" }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <PostCard post={featured} featured />
            </div>
          </section>
        )}

        {/* Post Grid */}
        {rest.length > 0 && (
          <section style={{
            maxWidth: 1080, margin: "0 auto",
            padding: "36px 20px 64px",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 28,
            }}>
              {rest.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          </section>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 20px" }}>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 16, color: C.greyBlack + "88" }}>
              No articles found for this topic yet. Check back soon!
            </p>
          </div>
        )}

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

  const tags = getAllTags();

  return { props: { posts, tags } };
}
