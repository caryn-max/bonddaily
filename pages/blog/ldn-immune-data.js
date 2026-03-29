import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const C = {
  cream: "#FFF9E8",
  sand: "#E9E2D2",
  yellow: "#F3F1A9",
  purple: "#A1799B",
  navy: "#44697C",
  coral: "#F48F75",
  green: "#698A7E",
  greyBlack: "#2D2421",
  grey: "#C7CED3",
  white: "#FFFFFF",
  conceptionYellow: "#EDB468",
};

/* ─── Chart Data ─── */
const sections = [
  {
    id: "th1th2",
    label: "Th1/Th2 Ratios",
    title: "Th1/Th2 Cytokine Ratios",
    subtitle: "TNF-\u03B1 : IL-10 (CD3\u207ACD4\u207A)",
    what: "This ratio measures the tug-of-war between your pro-inflammatory (Th1) and anti-inflammatory (Th2) immune responses. For pregnancy, you want this ratio low \u2014 shifted toward tolerance. A Th1-dominant ratio signals an immune system in attack mode.",
    normalHigh: 30.6,
    normalLow: 13.2,
    pregnancyIdeal: 15,
    maxScale: 65,
    values: [
      { d: "10/19/17", v: 44.4 }, { d: "11/1/17", v: 25.9 }, { d: "11/15/17", v: 37.6 },
      { d: "11/26/17", v: 37.6 }, { d: "5/17/18", v: 58.9 }, { d: "8/6/18", v: 34.2 },
      { d: "5/2/19", v: 36.5 }, { d: "6/4/19", v: 42.5 }, { d: "8/7/19", v: 21.4 },
      { d: "9/25/19", v: 44.7 }, { d: "10/23/19", v: 46.4 }, { d: "11/11/19", v: 53.2 },
      { d: "11/25/19", v: 46.8 }, { d: "12/11/19", v: 43.5 }, { d: "1/8/20", v: 43.7 },
      { d: "1/22/20", v: 43.7 }, { d: "1/29/20", v: 49.2 }, { d: "3/5/24", v: 39.7 },
      { d: "5/1/24", v: 51.2 },
    ],
    ldn: "LDN reduces TNF-\u03B1 production in dendritic cells and IL-6 in monocytes after TLR stimulation. In fibromyalgia trials, 8 weeks of LDN lowered TNF-\u03B1 and other pro-inflammatory cytokines broadly \u2014 the same cytokines driving this ratio up.",
    cite: "Cant et al., Frontiers in Immunology 2017 \u00B7 Younger et al., Biomedicines 2017",
  },
  {
    id: "nk",
    label: "NK Cells",
    title: "NK Cell Cytotoxicity",
    subtitle: "50:1 Effector-to-Target Ratio",
    what: "This measures how aggressively your natural killer cells destroy target cells. In reproductive immunology, elevated NK cytotoxicity is directly linked to implantation failure and recurrent pregnancy loss. Fertile women average about 13%.",
    normalHigh: 18,
    normalLow: 10,
    pregnancyIdeal: 13.5,
    maxScale: 30,
    ivigVal: 9.1,
    values: [
      { d: "10/19/17", v: 21.1 }, { d: "11/15/17", v: 24.7 }, { d: "5/17/18", v: 22.4 },
      { d: "8/6/18", v: 24.2 }, { d: "5/2/19", v: 20.6 }, { d: "6/26/19", v: 22.1 },
      { d: "12/11/19", v: 25.6 },
    ],
    ldn: "LDN modulates innate immune activation upstream through TLR/NF-\u03BAB pathways \u2014 potentially reducing the inflammatory signaling that drives NK cell hyperactivation. The IVIG suppression test proved these NK cells respond to modulation, supporting LDN's subtler approach.",
    cite: "Kwak-Kim et al., J Reprod Immunol 2022 \u00B7 Younger & Mackey 2014",
  },
  {
    id: "ana",
    label: "ANA Titers",
    title: "ANA Titers",
    subtitle: "Antinuclear Antibodies \u00B7 Speckled Pattern",
    what: "ANA is a flag for systemic autoimmune activity \u2014 your immune system producing antibodies against your own cell components. Persistently high titers mean ongoing autoimmune activation, not a one-time blip.",
    titers: [
      { d: "10/19/17", t: ">1:1280", lv: 4 }, { d: "11/8/17", t: ">1:1280", lv: 4 },
      { d: "11/15/17", t: ">1:1280", lv: 4 }, { d: "12/13/17", t: ">1:1280", lv: 4 },
      { d: "1/4/18", t: "1:320", lv: 2 }, { d: "2/1/18", t: "1:320", lv: 2 },
      { d: "3/8/18", t: ">1:1280", lv: 4 }, { d: "5/17/18", t: ">1:1280", lv: 4 },
      { d: "5/31/18", t: ">1:1280", lv: 4 }, { d: "5/2/19", t: ">1:1280", lv: 4 },
      { d: "6/4/19", t: ">1:1280", lv: 4 }, { d: "6/26/19", t: ">1:320", lv: 2.5 },
      { d: "8/21/19", t: ">1:640", lv: 3 }, { d: "10/10/19", t: "1:160", lv: 1 },
      { d: "10/29/19", t: "1:160", lv: 1 }, { d: "11/25/19", t: "1:160", lv: 1 },
      { d: "12/11/19", t: "1:160", lv: 1 }, { d: "5/1/24", t: "1:640", lv: 3 },
    ],
    ldn: "LDN dampens innate immune signaling through TLR pathways and NF-\u03BAB, which may reduce the inflammatory drive fueling autoantibody production. Clinicians report gradual ANA titer reductions \u2014 not overnight \u2014 paralleling this patient's slow, partial improvement.",
    cite: "Younger et al., PMC 2014 \u00B7 Robinson NMD, LDN Research Trust",
  },
  {
    id: "b1a",
    label: "CD19\u207A/CD5\u207A",
    title: "CD19\u207A/CD5\u207A B Cells",
    subtitle: "B-1a Autoimmune B-Cell Subset",
    what: "Elevated CD19\u207A/CD5\u207A cells mean the immune system is producing self-reactive antibodies. Associated with thyroiditis, lupus, and immune-mediated pregnancy loss. Values above 10% are flagged by reproductive immunologists.",
    normalHigh: 10,
    normalLow: 5,
    maxScale: 18,
    values: [
      { d: "10/19/17", v: 6.4 }, { d: "11/1/17", v: 4.6 }, { d: "11/15/17", v: 5.0 },
      { d: "11/22/17", v: 4.7 }, { d: "5/17/18", v: 11.8 }, { d: "8/6/18", v: 10.4 },
      { d: "5/2/19", v: 10.6 }, { d: "6/4/19", v: 15.1 }, { d: "6/26/19", v: 9.9 },
      { d: "8/7/19", v: 14.0 }, { d: "9/4/19", v: 5.6 }, { d: "10/10/19", v: 10.9 },
      { d: "10/29/19", v: 5.3 }, { d: "11/25/19", v: 3.1 }, { d: "12/11/19", v: 4.3 },
      { d: "1/22/20", v: 9.2 }, { d: "1/29/20", v: 9.1 },
    ],
    ldn: "Spikes in these B cells correlated with higher ANA titers and elevated Th1 ratios \u2014 coordinated autoimmune flares, not isolated findings. LDN's upstream modulation of TLR/NF-\u03BAB may calm the signaling cascade that triggers these B-cell expansions.",
    cite: "Kwak-Kim & Gilman-Sachs 2008 \u00B7 Younger et al. 2014",
  },
];

/* ─── Chart Components ─── */
function Chart({ sec }) {
  const vals = sec.values;
  const bw = Math.max(14, Math.min(26, 460 / vals.length));
  const gap = 3;
  const pad = { t: 24, r: 16, b: 48, l: 38 };
  const w = vals.length * (bw + gap) + pad.l + pad.r + 20;
  const h = 200;
  const plotH = h - pad.t - pad.b;
  const plotW = w - pad.l - pad.r;
  const y = (v) => pad.t + plotH - (v / sec.maxScale) * plotH;

  const ticks = [];
  const step = sec.maxScale <= 20 ? 5 : sec.maxScale <= 40 ? 10 : 15;
  for (let i = 0; i <= sec.maxScale; i += step) ticks.push(i);

  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <svg width={w} height={h} style={{ display: "block" }}>
        <rect x={pad.l} y={y(sec.normalHigh)} width={plotW}
          height={y(sec.normalLow) - y(sec.normalHigh)}
          fill={C.green} opacity={0.1} rx={4}
        />
        <line x1={pad.l} x2={pad.l + plotW} y1={y(sec.normalHigh)} y2={y(sec.normalHigh)}
          stroke={C.green} strokeWidth={1} strokeDasharray="5 4" opacity={0.5}
        />
        {sec.pregnancyIdeal && (
          <line x1={pad.l} x2={pad.l + plotW} y1={y(sec.pregnancyIdeal)} y2={y(sec.pregnancyIdeal)}
            stroke={C.navy} strokeWidth={1} strokeDasharray="3 3" opacity={0.4}
          />
        )}
        {sec.ivigVal && (
          <>
            <line x1={pad.l} x2={pad.l + plotW} y1={y(sec.ivigVal)} y2={y(sec.ivigVal)}
              stroke={C.purple} strokeWidth={1.5} strokeDasharray="4 3"
            />
            <text x={pad.l + plotW + 4} y={y(sec.ivigVal) + 3} fill={C.purple}
              fontSize={8} fontFamily="'Nunito Sans', sans-serif" fontWeight={700}>
              IVIG: {sec.ivigVal}%
            </text>
          </>
        )}
        {ticks.map(t => (
          <g key={t}>
            <line x1={pad.l} x2={pad.l + plotW} y1={y(t)} y2={y(t)}
              stroke={C.greyBlack} strokeWidth={0.3} opacity={0.08}
            />
            <text x={pad.l - 6} y={y(t) + 3} fill={C.greyBlack} fontSize={9}
              textAnchor="end" fontFamily="'Nunito Sans', sans-serif" opacity={0.45}>
              {t}
            </text>
          </g>
        ))}
        {vals.map((v, i) => {
          const x = pad.l + i * (bw + gap) + 2;
          const elevated = v.v > sec.normalHigh;
          const color = elevated ? C.coral : C.green;
          const barH = (v.v / sec.maxScale) * plotH;
          return (
            <g key={i}>
              <rect x={x} y={y(v.v)} width={bw} height={barH}
                fill={color} rx={bw / 2} opacity={0.8}
              />
              <text x={x + bw / 2} y={y(v.v) - 5} fill={color} fontSize={8}
                textAnchor="middle" fontWeight={700} fontFamily="'Nunito Sans', sans-serif">
                {v.v}
              </text>
              <text x={x + bw / 2} y={h - pad.b + 12} fill={C.greyBlack} fontSize={6.5}
                textAnchor="middle" fontFamily="'Nunito Sans', sans-serif" opacity={0.4}
                transform={`rotate(-50 ${x + bw / 2} ${h - pad.b + 12})`}>
                {v.d}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ANAChart({ titers }) {
  const lvColors = { 1: C.conceptionYellow, 2: C.coral, 2.5: C.coral, 3: "#e07058", 4: "#c94a3a" };
  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, paddingBottom: 28, minWidth: titers.length * 42 }}>
        {titers.map((t, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 38 }}>
            <span style={{
              fontSize: 7, fontWeight: 700, color: lvColors[t.lv],
              fontFamily: "'Nunito Sans', sans-serif", marginBottom: 4, whiteSpace: "nowrap"
            }}>
              {t.t}
            </span>
            <div style={{
              width: 20, borderRadius: 10,
              height: t.lv * 18 + 8,
              background: lvColors[t.lv], opacity: 0.75,
            }} />
            <span style={{
              fontSize: 6.5, color: C.greyBlack, opacity: 0.4, marginTop: 6,
              fontFamily: "'Nunito Sans', sans-serif", transform: "rotate(-50deg)",
              transformOrigin: "center top", whiteSpace: "nowrap"
            }}>
              {t.d}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ items }) {
  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 10 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {it.dash ? (
            <svg width={14} height={8}><line x1={0} x2={14} y1={4} y2={4} stroke={it.color} strokeWidth={1.5} strokeDasharray={it.dash} /></svg>
          ) : (
            <div style={{ width: 8, height: 8, borderRadius: 3, background: it.color, opacity: it.opacity || 1 }} />
          )}
          <span style={{ fontSize: 9, color: C.greyBlack, opacity: 0.55, fontFamily: "'Nunito Sans', sans-serif" }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

function InteractiveGraphic() {
  const [idx, setIdx] = useState(0);
  const sec = sections[idx];

  return (
    <div style={{
      background: C.cream, borderRadius: 24, padding: "28px 20px", margin: "36px 0",
      border: `1px solid ${C.sand}`,
    }}>
      <p style={{
        fontSize: 9, letterSpacing: 3.5, textTransform: "uppercase",
        color: C.purple, fontWeight: 700, margin: "0 0 10px 0"
      }}>
        Bond {"\u00B7"} Immune Marker Deep Dive
      </p>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700,
        color: C.greyBlack, margin: "0 0 6px 0", lineHeight: 1.15
      }}>
        When the research meets{" "}
        <em style={{ color: C.purple, fontStyle: "italic" }}>your</em>{" "}
        lab data.
      </h2>
      <p style={{
        fontSize: 12, color: C.greyBlack, opacity: 0.55, margin: "0 0 22px 0", lineHeight: 1.6
      }}>
        Real immune labs tracked over 7 years {"\u2014"} mapped against the markers LDN research targets.
      </p>

      {/* Tab pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
        {sections.map((s, i) => (
          <button key={s.id} onClick={() => setIdx(i)} style={{
            padding: "8px 14px", borderRadius: 24, border: "none", cursor: "pointer",
            fontSize: 11, fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif",
            letterSpacing: 0.3, transition: "all 0.25s ease",
            background: i === idx ? C.purple : C.sand,
            color: i === idx ? C.white : C.greyBlack,
            opacity: i === idx ? 1 : 0.7,
          }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div style={{
        background: C.white, borderRadius: 20, padding: 24,
        boxShadow: "0 2px 20px rgba(45,36,33,0.06)",
        border: `1px solid ${C.sand}`,
      }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700,
          color: C.greyBlack, margin: "0 0 2px 0"
        }}>
          {sec.title}
        </h3>
        <p style={{ fontSize: 11, color: C.purple, fontWeight: 600, margin: "0 0 14px 0" }}>
          {sec.subtitle}
        </p>
        <p style={{ fontSize: 12, color: C.greyBlack, opacity: 0.6, lineHeight: 1.65, margin: "0 0 20px 0" }}>
          {sec.what}
        </p>

        {sec.id !== "ana" ? (
          <>
            <Chart sec={sec} />
            <Legend items={[
              { color: C.coral, label: "Above threshold" },
              { color: C.green, label: "Within range" },
              { color: C.green, label: "Normal range", opacity: 0.15 },
              ...(sec.pregnancyIdeal ? [{ color: C.navy, label: "Pregnancy ideal", dash: "3 3" }] : []),
              ...(sec.ivigVal ? [{ color: C.purple, label: "With IVIG suppression", dash: "4 3" }] : []),
            ]} />
          </>
        ) : (
          <>
            <ANAChart titers={sec.titers} />
            <Legend items={[
              { color: C.conceptionYellow, label: "1:160 (Borderline)" },
              { color: C.coral, label: "1:320 (Elevated)" },
              { color: "#e07058", label: ">1:640 (High)" },
              { color: "#c94a3a", label: ">1:1280 (Autoimmune)" },
            ]} />
          </>
        )}

        {/* LDN connection */}
        <div style={{
          marginTop: 24, padding: 18, borderRadius: 14,
          background: `linear-gradient(135deg, ${C.cream}, ${C.yellow}33)`,
          border: `1px solid ${C.yellow}55`,
        }}>
          <p style={{
            fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 8px 0"
          }}>
            What LDN targets here
          </p>
          <p style={{ fontSize: 12, color: C.greyBlack, lineHeight: 1.65, margin: "0 0 8px 0", opacity: 0.75 }}>
            {sec.ldn}
          </p>
          <p style={{ fontSize: 9, color: C.greyBlack, opacity: 0.35, margin: 0, fontStyle: "italic" }}>
            {sec.cite}
          </p>
        </div>
      </div>

      {/* Bottom summary */}
      <div style={{
        marginTop: 24, padding: 22, borderRadius: 20,
        background: C.white, border: `1px solid ${C.purple}22`,
        boxShadow: "0 2px 16px rgba(161,121,155,0.08)",
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700,
          color: C.greyBlack, margin: "0 0 10px 0", lineHeight: 1.3
        }}>
          The pattern across every marker is the same.
        </p>
        <p style={{ fontSize: 12, color: C.greyBlack, opacity: 0.6, lineHeight: 1.7, margin: "0 0 12px 0" }}>
          <strong style={{ color: C.coral }}>Th1-dominant.</strong>{" "}
          <strong style={{ color: C.coral }}>Autoimmune-activated.</strong>{" "}
          <strong style={{ color: C.coral }}>Hyperactive NK cells.</strong>{" "}
          This is exactly the immune profile LDN{"'"}s mechanism of action is designed to recalibrate {"\u2014"} not shut down, but{" "}
          <strong style={{ color: C.green }}>smooth out</strong>.
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
          color: C.purple, fontStyle: "italic", margin: 0, lineHeight: 1.5
        }}>
          Turning down a too-loud stereo {"\u2014"} while leaving the music playing.
        </p>
      </div>
    </div>
  );
}

/* ─── Prose styling helpers ─── */
const proseH2 = {
  fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700,
  color: C.greyBlack, margin: "40px 0 10px 0", lineHeight: 1.25,
};
const proseH3 = {
  fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700,
  color: C.greyBlack, margin: "32px 0 8px 0", lineHeight: 1.3,
};
const proseP = {
  fontSize: 14, color: C.greyBlack, opacity: 0.7, lineHeight: 1.75, margin: "0 0 16px 0",
  fontFamily: "'Nunito Sans', sans-serif",
};
const proseBold = { fontWeight: 700, opacity: 1, color: C.greyBlack };
const proseHighlight = { fontWeight: 700, color: C.coral };
const proseCite = {
  fontSize: 10, color: C.greyBlack, opacity: 0.35, fontStyle: "italic",
  margin: "0 0 16px 0", fontFamily: "'Nunito Sans', sans-serif",
};

/* ─── Main Page ─── */
export default function LDNBlogPost() {
  return (
    <>
      <Head>
        <title>Low-Dose Naltrexone and Your Immune Markers | Bond Daily</title>
        <meta name="description" content="Real immune data tracked over 7 years, mapped against the markers LDN research targets. A deep dive into Th1/Th2 ratios, NK cells, ANA titers, and autoimmune B cells." />
      </Head>
      <div style={{
        background: C.white, minHeight: "100vh",
        fontFamily: "'Nunito Sans', sans-serif", color: C.greyBlack,
      }}>
        {/* Top nav */}
        <div style={{
          background: C.white, borderBottom: `1px solid ${C.sand}`,
          padding: "14px 20px", position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{
              textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
              color: C.purple, fontSize: 12, fontWeight: 600,
              fontFamily: "'Nunito Sans', sans-serif",
            }}>
              {"\u2190"} Bond Daily
            </Link>
            <a href="https://bond.life" target="_blank" rel="noopener noreferrer" style={{
              textDecoration: "none", padding: "7px 18px", borderRadius: 20,
              background: C.purple, color: C.white, fontSize: 10, fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif", letterSpacing: 0.5,
            }}>
              Shop BOND
            </a>
          </div>
        </div>

        {/* Hero */}
        <div style={{
          background: `linear-gradient(180deg, ${C.cream} 0%, ${C.white} 100%)`,
          padding: "48px 20px 32px",
        }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <p style={{
              fontSize: 9, letterSpacing: 3.5, textTransform: "uppercase",
              color: C.coral, fontWeight: 700, margin: "0 0 12px 0"
            }}>
              Immune Deep Dive
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700,
              color: C.greyBlack, margin: "0 0 14px 0", lineHeight: 1.15
            }}>
              Low-Dose Naltrexone and{" "}
              <em style={{ color: C.purple, fontStyle: "italic" }}>Your</em>{" "}
              Immune Markers
            </h1>
            <p style={{
              fontSize: 14, color: C.greyBlack, opacity: 0.55, lineHeight: 1.7,
              margin: "0 0 8px 0", maxWidth: 560,
            }}>
              What happens when you overlay one woman{"'"}s real immune data onto the research behind LDN? The convergence is striking.
            </p>
            <p style={{ fontSize: 11, color: C.greyBlack, opacity: 0.35, margin: 0 }}>
              By Caryn Johnson {"\u00B7"} Bond Daily
            </p>
          </div>
        </div>

        {/* Article body */}
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 60px" }}>

          {/* Intro */}
          <p style={proseP}>
            The research on low-dose naltrexone can feel abstract {"\u2014"} cytokine ratios, TLR pathways, NF-{"\u03BA"}B cascades. So let{"'"}s ground it in something concrete: a real set of immune labs tracked over several years during a journey through recurrent pregnancy loss, autoimmune activation, and an immune protocol.
          </p>
          <p style={proseP}>
            This data comes from a woman who was monitored extensively by a reproductive immunologist {"\u2014"} the kind of testing most OBs never order and most patients never see. What it shows is a textbook case of the exact immune dysregulation that LDN research is designed to address.
          </p>

          <hr style={{ border: "none", borderTop: `1px solid ${C.sand}`, margin: "32px 0" }} />

          {/* Section: Th1/Th2 */}
          <h2 style={proseH2}>Th1/Th2 cytokine ratios: persistently Th1-dominant</h2>
          <p style={proseP}>
            The TNF-{"\u03B1"}:IL-10 ratio (measured on CD3{"\u207A"}CD4{"\u207A"} T cells) is one of the most commonly tracked markers in reproductive immunology. It reflects the balance between pro-inflammatory Th1 signaling and anti-inflammatory Th2/regulatory responses.
          </p>
          <h3 style={proseH3}>What a healthy ratio looks like</h3>
          <p style={proseP}>
            Balanced ratios typically fall between 5{"\u2013"}15, with some labs using 13.2{"\u2013"}30.6 as their reference range. During a healthy pregnancy, this ratio should shift lower {"\u2014"} toward Th2 dominance {"\u2014"} to create the tolerant immune environment an embryo needs to implant and thrive.
          </p>
          <h3 style={proseH3}>What this patient{"'"}s labs actually showed</h3>
          <p style={proseP}>
            Her TNF-{"\u03B1"}:IL-10 ratios across nearly 20 blood draws ranged from <span style={proseHighlight}>21.4 to 58.9</span> {"\u2014"} with the majority landing between 34 and 53. The normal high end of the reference range is 30.6. She was above it on almost every single draw.
          </p>
          <p style={proseP}>
            The IFN-{"\u03B3"}:IL-10 ratio told the same story: values ranging from 19.1 to 47.2, consistently above the balanced range of 5{"\u2013"}15 that supports healthy pregnancy.
          </p>
          <h3 style={proseH3}>Why this matters for LDN</h3>
          <p style={proseP}>
            This is precisely the pattern LDN{"'"}s mechanism of action targets. The Cant et al. study showed that naltrexone reduces TNF-{"\u03B1"} production in plasmacytoid dendritic cells and IL-6 production in monocytes after TLR stimulation. Younger{"'"}s fibromyalgia work showed broad reductions in pro-inflammatory cytokines {"\u2014"} including TNF-{"\u03B1"} {"\u2014"} after eight weeks of LDN. In a Th1-dominant patient like this, LDN{"'"}s role as a {"\u201C"}Th1 softener{"\u201D"} isn{"'"}t theoretical {"\u2014"} it{"'"}s aimed directly at the exact imbalance her labs document.
          </p>

          <hr style={{ border: "none", borderTop: `1px solid ${C.sand}`, margin: "32px 0" }} />

          {/* Section: ANA */}
          <h2 style={proseH2}>ANA titers: persistent autoimmune activation</h2>
          <p style={proseP}>
            Antinuclear antibodies (ANA) are a flag for systemic autoimmune activity {"\u2014"} the immune system producing antibodies against its own cell components.
          </p>
          <p style={proseP}>
            <span style={proseBold}>Normal:</span> Negative, or low titers ({"\u2264"}1:80) that can be incidental.
          </p>
          <p style={proseP}>
            <span style={proseBold}>This patient{"'"}s results:</span> Persistently positive with a speckled pattern, ranging from <span style={proseHighlight}>1:160 to {">"}1:1280</span> across years of monitoring. The earliest draws showed {">"}1:1280 speckled {"\u2014"} a level often associated with active autoimmune disease. Over the course of her immune protocol, titers gradually came down to 1:160, but never went negative.
          </p>
          <p style={proseP}>
            <span style={proseBold}>The LDN connection:</span> LDN{"'"}s proposed mechanism as an immune modulator {"\u2014"} not a suppressor {"\u2014"} is relevant here. By dampening excessive innate immune signaling through TLR pathways and NF-{"\u03BA"}B, LDN may help reduce the inflammatory drive that fuels autoantibody production. The gradual titer reduction this patient experienced parallels what clinicians working with LDN in thyroid autoimmunity and other autoimmune conditions have reported: not an overnight disappearance, but a slow recalibration.
          </p>

          <hr style={{ border: "none", borderTop: `1px solid ${C.sand}`, margin: "32px 0" }} />

          {/* Section: NK Cells */}
          <h2 style={proseH2}>NK cell cytotoxicity: elevated and aggressive</h2>
          <p style={proseP}>
            Natural killer cell cytotoxicity testing measures how aggressively NK cells attack target cells in a lab setting. In reproductive immunology, elevated NK cytotoxicity is associated with implantation failure and recurrent pregnancy loss.
          </p>
          <p style={proseP}>
            <span style={proseBold}>Published thresholds:</span> A large retrospective study of 883 women found that fertile women and women with normal pregnancies had NK cytotoxicity (at 50:1 E:T ratio) averaging around 13%, while women with recurrent pregnancy loss and implantation failure had significantly higher levels. Clinically, values above 18{"\u2013"}20% at the 50:1 ratio are considered elevated.
          </p>
          <p style={proseP}>
            <span style={proseBold}>This patient{"'"}s results:</span> Her 50:1 NK cytotoxicity values: <span style={proseHighlight}>21.1%, 24.7%, 22.4%, 24.2%, 20.6%, 22.1%, 25.6%</span> {"\u2014"} every single draw above the 18{"\u2013"}20% threshold.
          </p>
          <p style={proseP}>
            A critical finding: when her NK cells were tested with IVIG (intravenous immunoglobulin) in the lab, cytotoxicity dropped to approximately 9% at both ratios. This demonstrated that her NK cells <em>could</em> be suppressed {"\u2014"} the immune system was responsive to modulation, not locked in an irreversible state.
          </p>
          <p style={proseP}>
            <span style={proseBold}>Where LDN fits:</span> LDN acts on similar immune pathways to what IVIG targets, but through a different mechanism {"\u2014"} modulating opioid-receptor-mediated immune signaling rather than flooding the system with exogenous antibodies. The fact that this patient{"'"}s NK cells responded to immune modulation suggests she is exactly the type of patient whose immune system might respond to LDN{"'"}s subtler recalibration.
          </p>

          <hr style={{ border: "none", borderTop: `1px solid ${C.sand}`, margin: "32px 0" }} />

          {/* Section: CD19+/CD5+ */}
          <h2 style={proseH2}>CD19{"\u207A"}/CD5{"\u207A"} B cells: autoimmune B-cell activity</h2>
          <p style={proseP}>
            CD19{"\u207A"}/CD5{"\u207A"} cells (also called B-1a cells) are a B-cell subset frequently associated with autoimmune disorders. When elevated, they suggest the immune system is producing self-reactive antibodies {"\u2014"} a pattern seen in thyroiditis, lupus, and immune-mediated pregnancy loss.
          </p>
          <p style={proseP}>
            <span style={proseBold}>Normal range:</span> 5{"\u2013"}10%. This patient{"'"}s values fluctuated significantly, with several readings well above the 10% threshold {"\u2014"} spiking to <span style={proseHighlight}>11.8%, 15.1%, 14.0%</span> during periods that correlated with higher ANA titers and elevated Th1 cytokine ratios, painting a picture of coordinated autoimmune flares rather than isolated findings.
          </p>

          <hr style={{ border: "none", borderTop: `1px solid ${C.sand}`, margin: "32px 0" }} />

          {/* Section: Genetics */}
          <h2 style={proseH2}>The genetic backdrop: MTHFR and PAI-1 mutations</h2>
          <p style={proseP}>
            Underlying all of this immune dysregulation were two genetic findings: heterozygous MTHFR C677T and heterozygous PAI-1 4G/5G polymorphism.
          </p>
          <p style={proseP}>
            MTHFR C677T affects methylation {"\u2014"} the biochemical process that influences everything from DNA repair to neurotransmitter production to immune regulation. PAI-1 4G/5G affects fibrinolysis {"\u2014"} the body{"'"}s ability to break down blood clots. In pregnancy, this can contribute to microthrombosis at the implantation site.
          </p>
          <p style={proseP}>
            These mutations don{"'"}t cause pregnancy loss on their own, but in the context of an already Th1-skewed, autoimmune-activated immune system with hyperactive NK cells, they add layers of risk that compound the problem.
          </p>

          <hr style={{ border: "none", borderTop: `1px solid ${C.sand}`, margin: "32px 0" }} />

          {/* Interactive Graphic */}
          <InteractiveGraphic />

          <hr style={{ border: "none", borderTop: `1px solid ${C.sand}`, margin: "32px 0" }} />

          {/* Section: Putting it together */}
          <h2 style={proseH2}>Putting it all together: why this data matters for the LDN conversation</h2>
          <p style={proseP}>
            When you look at this patient{"'"}s full picture {"\u2014"} persistently elevated Th1 cytokine ratios, high ANA titers, aggressive NK cell cytotoxicity, autoimmune B-cell spikes, and underlying genetic vulnerabilities {"\u2014"} you{"'"}re looking at exactly the kind of immune dysregulation that LDN{"'"}s mechanism of action is designed to address.
          </p>
          <p style={proseP}>
            The research shows LDN reduces TNF-{"\u03B1"} and IL-6 production in innate immune cells, lowers broad panels of pro-inflammatory cytokines over 8{"\u2013"}10 weeks, modulates microglial and immune cell activity through TLR/NF-{"\u03BA"}B pathways, and shifts the immune {"\u201C"}tone{"\u201D"} toward regulation rather than attack.
          </p>
          <p style={proseP}>
            This patient{"'"}s labs show TNF-{"\u03B1"}:IL-10 ratios 1.5{"\u2013"}2{"\u00D7"} above the high end of normal on nearly every draw, IFN-{"\u03B3"}:IL-10 ratios consistently in the Th1-dominant range, NK cytotoxicity persistently above thresholds linked to pregnancy loss, autoimmune markers confirming systemic immune activation, and demonstrated responsiveness to immune modulation.
          </p>
          <p style={proseP}>
            The convergence is striking. This isn{"'"}t a patient who needs her immune system shut down {"\u2014"} she needs it <em>smoothed out</em>. That{"'"}s precisely the language researchers use to describe LDN: not immunosuppression, but immune normalization.
          </p>

          {/* CTA */}
          <div style={{
            marginTop: 40, padding: 28, borderRadius: 20,
            background: `linear-gradient(135deg, ${C.cream}, ${C.purple}08)`,
            border: `1px solid ${C.purple}22`, textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700,
              color: C.greyBlack, margin: "0 0 10px 0", lineHeight: 1.3,
            }}>
              Want to check your own immune markers?
            </p>
            <p style={{ fontSize: 12, color: C.greyBlack, opacity: 0.55, lineHeight: 1.6, margin: "0 0 18px 0" }}>
              Enter your lab values and see where they fall relative to published reproductive immunology reference ranges.
            </p>
            <a href="/tools/immune-markers" style={{
              display: "inline-block", padding: "12px 28px", borderRadius: 28,
              background: C.coral, color: C.white, fontSize: 12, fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif", letterSpacing: 0.5,
              textDecoration: "none",
            }}>
              Check Your Markers
            </a>
          </div>

          {/* Disclaimer */}
          <p style={{
            fontSize: 9, color: C.greyBlack, opacity: 0.3, marginTop: 32,
            lineHeight: 1.6, textAlign: "center", fontStyle: "italic",
          }}>
            This data is presented for educational purposes. Individual immune profiles are complex, and treatment decisions should always be made with a qualified reproductive immunologist or healthcare provider. LDN is an off-label medication, and its use in pregnancy and fertility contexts requires careful clinical supervision.
          </p>
        </div>
      </div>
    </>
  );
}
