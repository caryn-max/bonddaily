import Head from "next/head";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getAllSlugs } from "../../lib/posts";

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

/* ─── Nav ─── */
function Nav() {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: C.cream + "ee", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.sand}44`, padding: "0 20px",
    }}>
      <div style={{
        maxWidth: 960, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center", height: 56,
      }}>
        <Link href="/daily" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, color: C.purple, fontWeight: 600 }}>{"\u2190"}</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: C.greyBlack, letterSpacing: -0.5 }}>bond</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: C.purple, letterSpacing: -0.5 }}>daily</span>
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
    </nav>
  );
}

/* ─── Tag Pill ─── */
function TagPill({ tag }) {
  const colors = {
    "PCOS": C.purple, "fertility": C.coral, "immune system": C.navy,
    "gut health": C.green, "hormone balance": C.conceptionYellow,
    "autoimmune infertility": C.coral, "inositol": C.green,
    "cortisol": C.navy, "PMS": C.purple, "luteal": C.purple,
    "cycle regulation": C.green, "cycle support": C.green,
    "endometriosis": C.coral, "hormonal acne": C.coral,
    "insulin resistance": C.navy, "metabolic health": C.navy,
    "histamine levels": C.coral, "hormone production": C.green,
  };
  const color = colors[tag] || C.navy;
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 600,
      fontFamily: "'Nunito Sans', sans-serif", letterSpacing: 0.8,
      textTransform: "uppercase", color: color,
      background: color + "15", border: `1px solid ${color}30`,
      padding: "4px 12px", borderRadius: 20, marginRight: 8, marginBottom: 8,
    }}>
      {tag}
    </span>
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

/* ─── Main Post Page ─── */
export default function BlogPost({ post, relatedPosts }) {
  if (!post) {
    return (
      <div style={{ background: C.cream, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: C.greyBlack }}>Post not found.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Bond Daily</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://www.bonddaily.co/blog/${post.slug}`} />
      </Head>

      <div style={{ background: C.cream, minHeight: "100vh" }}>
        <Nav />

        {/* Hero */}
        <header style={{
          maxWidth: 960, margin: "0 auto", padding: "48px 20px 0",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {post.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700, color: C.greyBlack, lineHeight: 1.15, margin: "0 0 16px",
          }}>
            {post.title}
          </h1>
          <p style={{
            fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: C.greyBlack + "88",
            margin: "0 0 32px",
          }}>
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </header>

        {/* Hero Image */}
        {post.heroImage && (
          <div style={{
            maxWidth: 960, margin: "0 auto", padding: "0 20px 40px",
          }}>
            <div style={{
              borderRadius: 16, overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}>
              <img
                src={post.heroImage}
                alt={post.title}
                style={{ width: "100%", height: "auto", display: "block", maxHeight: 480, objectFit: "cover" }}
              />
            </div>
          </div>
        )}

        {/* Article Body */}
        <article style={{
          maxWidth: 720, margin: "0 auto", padding: "0 20px 64px",
        }}>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section style={{
            maxWidth: 960, margin: "0 auto", padding: "0 20px 64px",
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 28,
              fontWeight: 700, color: C.greyBlack, marginBottom: 24,
            }}>
              Keep Reading
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: C.white, borderRadius: 12, overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s ease",
                  }}>
                    {rp.heroImage && (
                      <img src={rp.heroImage} alt={rp.title}
                        style={{ width: "100%", height: 160, objectFit: "cover" }} />
                    )}
                    <div style={{ padding: 20 }}>
                      <p style={{
                        fontFamily: "'Nunito Sans', sans-serif", fontSize: 11, fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: 1, color: C.purple, margin: "0 0 8px",
                      }}>
                        {rp.tags[0]}
                      </p>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700,
                        color: C.greyBlack, lineHeight: 1.3, margin: 0,
                      }}>
                        {rp.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>

      <style jsx global>{`
        .blog-content {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 17px;
          line-height: 1.8;
          color: ${C.greyBlack};
        }
        .blog-content h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: ${C.greyBlack};
          margin: 48px 0 16px;
          line-height: 1.2;
        }
        .blog-content h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: ${C.navy};
          margin: 36px 0 12px;
          line-height: 1.3;
        }
        .blog-content h4 {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: ${C.purple};
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 32px 0 8px;
        }
        .blog-content p {
          margin: 0 0 20px;
        }
        .blog-content strong {
          color: ${C.greyBlack};
          font-weight: 700;
        }
        .blog-content em {
          font-style: italic;
        }
        .blog-content ul, .blog-content ol {
          margin: 0 0 20px;
          padding-left: 24px;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 24px 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .blog-content blockquote {
          border-left: 3px solid ${C.purple};
          margin: 24px 0;
          padding: 16px 24px;
          background: ${C.purple}08;
          border-radius: 0 8px 8px 0;
          font-style: italic;
        }
        .blog-content a {
          color: ${C.purple};
          text-decoration: underline;
          text-decoration-color: ${C.purple}44;
          text-underline-offset: 3px;
        }
        .blog-content a:hover {
          text-decoration-color: ${C.purple};
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          font-size: 15px;
        }
        .blog-content th {
          background: ${C.sand}44;
          font-weight: 700;
          text-align: left;
          padding: 12px 16px;
          border-bottom: 2px solid ${C.sand};
        }
        .blog-content td {
          padding: 10px 16px;
          border-bottom: 1px solid ${C.sand}66;
        }
        .blog-content .callout {
          background: ${C.navy}0a;
          border: 1px solid ${C.navy}20;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        .blog-content .callout-title {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${C.navy};
          margin-bottom: 8px;
        }
        @media (max-width: 600px) {
          .blog-content { font-size: 16px; }
          .blog-content h2 { font-size: 24px; }
          .blog-content h3 { font-size: 20px; }
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { notFound: true };

  // Get related posts (same tags, excluding current)
  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  return {
    props: {
      post,
      relatedPosts: related,
    },
  };
}
