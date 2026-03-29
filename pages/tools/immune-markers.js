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
  white: "#FFFFFF",
  conceptionYellow: "#EDB468",
};

const MARKERS = [
  {
    id: "tnf_il10",
    name: "TNF-\u03B1 : IL-10 Ratio",
    group: "Th1/Th2 Balance",
    subtitle: "CD3\u207ACD4\u207A T Cells",
    unit: "ratio",
    placeholder: "e.g. 34.2",
    normalLow: 13.2,
    normalHigh: 30.6,
    pregnancyIdeal: 15,
    max: 80,
    what: "This ratio measures the balance between your pro-inflammatory (Th1) and anti-inflammatory (Th2) immune responses. For healthy pregnancy, this ratio should be low \u2014 shifted toward Th2 tolerance. A high ratio means your immune system is tilted toward inflammatory attack rather than the tolerance an embryo needs.",
    elevated: "Your ratio is above the reference range, indicating a Th1-dominant, pro-inflammatory immune state. In reproductive immunology, persistently elevated TNF-\u03B1:IL-10 ratios are associated with implantation failure, recurrent pregnancy loss, and autoimmune activation. This is one of the most commonly tracked markers by reproductive immunologists for a reason \u2014 it reflects the core immune balance that pregnancy depends on.",
    normal: "Your ratio falls within the reference range, suggesting a balanced Th1/Th2 immune response. This is a positive sign for immune regulation and is the kind of balance that supports healthy implantation and pregnancy.",
    low: "Your ratio is on the lower end, suggesting a Th2-leaning immune profile. This can be favorable for pregnancy tolerance, though very low Th1 activity may mean reduced defense against infections. Discuss with your provider if you have concerns about immune suppression.",
    source: "Reference range per reproductive immunology panels \u00B7 Raghupathy et al., Changes in Th1:Th2 Cytokine Bias in Pregnancy, PMC 2012",
  },
  {
    id: "ifn_il10",
    name: "IFN-\u03B3 : IL-10 Ratio",
    group: "Th1/Th2 Balance",
    subtitle: "CD3\u207ACD4\u207A T Cells",
    unit: "ratio",
    placeholder: "e.g. 25.8",
    normalLow: 5.8,
    normalHigh: 20.5,
    pregnancyIdeal: 10,
    max: 60,
    what: "Another measure of Th1/Th2 balance. IFN-\u03B3 is a potent pro-inflammatory cytokine. When this ratio is high, it confirms an immune system biased toward inflammatory attack rather than the tolerance needed for pregnancy.",
    elevated: "Your IFN-\u03B3:IL-10 ratio is elevated, reinforcing a Th1-dominant immune pattern. When both this and the TNF-\u03B1:IL-10 ratio are elevated, it paints a clear picture of systemic Th1 skewing \u2014 the type of immune environment that can work against embryo implantation and pregnancy maintenance.",
    normal: "Within the expected range \u2014 this suggests appropriate balance between inflammatory and tolerant immune responses.",
    low: "A low ratio suggests strong Th2/regulatory dominance, which supports pregnancy tolerance. Very low values may warrant discussion with your provider about overall immune function.",
    source: "Raghupathy et al., PMC 2012 \u00B7 Kwak-Kim & Gilman-Sachs 2008",
  },
  {
    id: "nk50",
    name: "NK Cytotoxicity (50:1)",
    group: "NK Cells",
    subtitle: "50:1 Effector-to-Target Ratio",
    unit: "%",
    placeholder: "e.g. 22.4",
    normalLow: 10,
    normalHigh: 18,
    pregnancyIdeal: 13.5,
    max: 40,
    what: "This measures how aggressively your natural killer cells destroy target cells. In reproductive immunology, elevated NK cytotoxicity is directly linked to implantation failure and recurrent pregnancy loss. A large study of 883 women found fertile women averaged about 13% at this ratio.",
    elevated: "Your NK cytotoxicity is above the threshold associated with recurrent pregnancy loss and implantation failure. Research shows that women with RPL have significantly higher NK cytotoxicity than fertile women, who average around 13% at the 50:1 ratio. This suggests your NK cells may be more aggressive than what supports healthy implantation.",
    normal: "Your NK cytotoxicity is within the normal range \u2014 this suggests appropriate killer cell activity that is unlikely to interfere with implantation or pregnancy.",
    low: "Low NK cytotoxicity may indicate reduced immune surveillance. While this is less concerning for pregnancy specifically, discuss with your provider if you have a history of recurrent infections.",
    source: "Kwak-Kim et al., J Reprod Immunol 2022 (n=883) \u00B7 Fukui et al., Reprod Med Biol 2015",
  },
  {
    id: "nk25",
    name: "NK Cytotoxicity (25:1)",
    group: "NK Cells",
    subtitle: "25:1 Effector-to-Target Ratio",
    unit: "%",
    placeholder: "e.g. 17.0",
    normalLow: 5,
    normalHigh: 15,
    pregnancyIdeal: 10,
    max: 30,
    what: "NK cytotoxicity measured at a lower effector concentration. This provides a second data point on how aggressive your NK cells are. Values consistently above 15\u201318% are flagged by reproductive immunologists.",
    elevated: "Elevated at this ratio confirms the pattern seen at 50:1 \u2014 both readings being high strengthens the evidence of NK-mediated immune dysregulation. This is a marker worth tracking over time with your reproductive immunologist.",
    normal: "Within normal limits \u2014 a reassuring data point for balanced NK cell activity.",
    low: "Low activity at this ratio is typically not a concern for reproductive outcomes.",
    source: "Kwak-Kim et al., J Reprod Immunol 2022",
  },
  {
    id: "cd19cd5",
    name: "CD19\u207A/CD5\u207A B Cells",
    group: "B Cell Markers",
    subtitle: "B-1a Autoimmune Subset",
    unit: "%",
    placeholder: "e.g. 10.6",
    normalLow: 5,
    normalHigh: 10,
    max: 20,
    what: "CD19\u207A/CD5\u207A cells (B-1a cells) are a B-cell subset frequently associated with autoimmune disorders. When elevated above 10%, they suggest the immune system is producing self-reactive antibodies \u2014 a pattern seen in thyroiditis, lupus, and immune-mediated pregnancy loss.",
    elevated: "Elevated CD19\u207A/CD5\u207A B cells indicate active autoimmune B-cell expansion. Reproductive immunologists flag values above 10% because this subset is frequently elevated in women with immune-related recurrent pregnancy loss. Watch for correlation with ANA titers and Th1/Th2 ratios \u2014 when multiple markers are elevated together, it points to a coordinated autoimmune pattern rather than isolated findings.",
    normal: "Within the normal range \u2014 this suggests appropriate B-cell regulation without excessive self-reactive antibody production.",
    low: "Low B-1a cells are not typically a concern. This subset is most clinically relevant when elevated.",
    source: "Kwak-Kim & Gilman-Sachs 2008 \u00B7 Aria Fertility NK Cell Testing Review 2022",
  },
  {
    id: "ana",
    name: "ANA Titer",
    group: "Autoimmune Markers",
    subtitle: "Antinuclear Antibodies",
    unit: "titer",
    isANA: true,
    placeholder: "Select your titer",
    what: "ANA tests whether your immune system is producing antibodies against your own cell nuclei \u2014 a hallmark of autoimmune activation. The pattern (speckled, homogeneous, etc.) and the titer level both matter. A single mildly positive result can be incidental, but persistently elevated titers are clinically significant.",
    source: "Standard clinical reference ranges",
  },
];

const ANA_OPTIONS = [
  { label: "Negative", value: 0, level: "normal", color: C.green, interpretation: "No detectable antinuclear antibody activity. This is a reassuring result." },
  { label: "1:40", value: 40, level: "borderline", color: C.conceptionYellow, interpretation: "A very low titer that can be found in healthy individuals. On its own, this is usually not significant \u2014 but in the context of other elevated immune markers, it may be worth monitoring." },
  { label: "1:80", value: 80, level: "borderline", color: C.conceptionYellow, interpretation: "A low-level positive that is sometimes seen in healthy people. If your other immune markers are also elevated, discuss the pattern with your provider." },
  { label: "1:160", value: 160, level: "elevated", color: C.coral, interpretation: "A borderline-to-moderate titer that warrants attention, especially if persistent across multiple draws or accompanied by a speckled pattern. In reproductive immunology, this level in combination with other elevated markers (Th1 ratios, NK cells) strengthens the case for immune-mediated factors." },
  { label: "1:320", value: 320, level: "elevated", color: C.coral, interpretation: "A moderate titer that is often clinically significant. Persistent 1:320 with a speckled pattern indicates ongoing autoimmune activation. Your reproductive immunologist will likely want to track this alongside cytokine ratios and NK cell activity." },
  { label: "1:640", value: 640, level: "high", color: "#e07058", interpretation: "A high titer frequently associated with active autoimmune disease. At this level, systemic autoimmune activation is likely contributing to your immune profile. This is an important finding to discuss with your care team." },
  { label: ">1:1280", value: 1280, level: "high", color: "#c94a3a", interpretation: "A very high titer strongly associated with active autoimmune disease. Persistent titers at this level indicate significant autoimmune activation and are taken seriously in reproductive immunology, particularly when evaluating recurrent pregnancy loss." },
];

function getStatus(marker, val) {
  if (marker.isANA) {
    if (val === 0) return "normal";
    if (val <= 80) return "borderline";
    return "elevated";
  }
  if (val > marker.normalHigh) return "elevated";
  if (val < marker.normalLow) return "low";
  return "normal";
}

function statusColor(s) {
  if (s === "elevated" || s === "high") return C.coral;
  if (s === "low") return C.navy;
  if (s === "borderline") return C.conceptionYellow;
  return C.green;
}

function StatusBadge({ status }) {
  const labels = { elevated: "Elevated", normal: "Normal", low: "Low", borderline: "Borderline", high: "High" };
  const c = statusColor(status);
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 12,
      fontSize: 10, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif",
      background: c + "18", color: c, letterSpacing: 0.5,
    }}>
      {labels[status] || status}
    </span>
  );
}

function Gauge({ value, marker }) {
  const pct = Math.min(100, Math.max(2, (value / marker.max) * 100));
  const nLow = (marker.normalLow / marker.max) * 100;
  const nHigh = (marker.normalHigh / marker.max) * 100;
  const status = getStatus(marker, value);
  const c = statusColor(status);

  return (
    <div style={{ marginTop: 14, marginBottom: 6 }}>
      <div style={{
        position: "relative", height: 28, background: C.sand + "66",
        borderRadius: 14, overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: `${nLow}%`, width: `${nHigh - nLow}%`,
          top: 0, bottom: 0, background: C.green, opacity: 0.1, borderRadius: 4,
        }} />
        {marker.pregnancyIdeal && (
          <div style={{
            position: "absolute", left: `${(marker.pregnancyIdeal / marker.max) * 100}%`,
            top: 0, bottom: 0, width: 1.5, background: C.navy, opacity: 0.25,
          }} />
        )}
        <div style={{
          position: "absolute", left: 0, top: 3, bottom: 3,
          width: `${pct}%`, borderRadius: 11,
          background: `linear-gradient(90deg, ${c}33, ${c}cc)`,
          transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
        }} />
        <div style={{
          position: "absolute", left: `${pct}%`, top: "50%",
          transform: "translate(-50%, -50%)",
          width: 24, height: 24, borderRadius: "50%", background: c,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 2px 8px ${c}55`,
          transition: "left 0.6s cubic-bezier(.4,0,.2,1)",
        }}>
          <span style={{ fontSize: 7.5, fontWeight: 700, color: C.white, fontFamily: "'Nunito Sans', sans-serif" }}>
            {value}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, alignItems: "center" }}>
        <span style={{ fontSize: 8, color: C.greyBlack, opacity: 0.3 }}>0</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: 8, color: C.green, fontWeight: 600 }}>
            Normal: {marker.normalLow}\u2013{marker.normalHigh}
          </span>
          {marker.pregnancyIdeal && (
            <span style={{ fontSize: 8, color: C.navy, fontWeight: 600 }}>
              Pregnancy ideal: \u2264{marker.pregnancyIdeal}
            </span>
          )}
        </div>
        <span style={{ fontSize: 8, color: C.greyBlack, opacity: 0.3 }}>{marker.max}</span>
      </div>
    </div>
  );
}

function ANAVisual({ selectedIdx }) {
  return (
    <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
      {ANA_OPTIONS.map((a, i) => (
        <div key={i} style={{
          padding: "7px 12px", borderRadius: 10, fontSize: 10, fontWeight: 600,
          fontFamily: "'Nunito Sans', sans-serif",
          background: i === selectedIdx ? a.color : C.sand + "44",
          color: i === selectedIdx ? C.white : C.greyBlack,
          opacity: i === selectedIdx ? 1 : 0.35,
          border: i === selectedIdx ? `2px solid ${a.color}` : `1px solid transparent`,
          transition: "all 0.3s ease",
        }}>
          {a.label}
        </div>
      ))}
    </div>
  );
}

function SummaryPanel({ entries }) {
  const filled = entries.filter(e => e.value !== null);
  if (filled.length === 0) return null;

  const elevated = filled.filter(e => e.status === "elevated" || e.status === "high").length;
  const normal = filled.filter(e => e.status === "normal").length;
  const borderline = filled.filter(e => e.status === "borderline").length;

  const th1 = filled.filter(e => ["tnf_il10", "ifn_il10"].includes(e.id) && e.status === "elevated").length > 0;
  const nk = filled.filter(e => ["nk50", "nk25"].includes(e.id) && e.status === "elevated").length > 0;
  const auto = filled.filter(e => ["cd19cd5", "ana"].includes(e.id) && (e.status === "elevated" || e.status === "high")).length > 0;

  const patterns = [];
  if (th1) patterns.push("Th1-dominant cytokine pattern");
  if (nk) patterns.push("Elevated NK cell activity");
  if (auto) patterns.push("Autoimmune marker activation");

  return (
    <div style={{
      background: C.white, borderRadius: 20, padding: 24, marginTop: 28,
      boxShadow: "0 2px 20px rgba(45,36,33,0.06)",
      border: `1px solid ${elevated > 0 ? C.coral + "22" : C.green + "22"}`,
    }}>
      <p style={{
        fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
        color: C.purple, fontWeight: 700, margin: "0 0 14px 0"
      }}>
        Your Immune Marker Summary
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        {[
          { n: elevated, label: "Elevated", c: C.coral },
          { n: borderline, label: "Borderline", c: C.conceptionYellow },
          { n: normal, label: "Normal", c: C.green },
        ].filter(x => x.n > 0).map((x, i) => (
          <div key={i} style={{
            flex: 1, minWidth: 80, padding: 12, borderRadius: 14,
            background: x.c + "0a", border: `1px solid ${x.c}18`, textAlign: "center",
          }}>
            <div style={{
              fontSize: 26, fontWeight: 700, color: x.c,
              fontFamily: "'Cormorant Garamond', serif"
            }}>
              {x.n}
            </div>
            <div style={{ fontSize: 9, color: C.greyBlack, opacity: 0.5 }}>{x.label}</div>
          </div>
        ))}
      </div>

      {patterns.length > 0 && (
        <>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700,
            color: C.greyBlack, margin: "0 0 8px 0", lineHeight: 1.3
          }}>
            Patterns in your labs
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {patterns.map((p, i) => (
              <span key={i} style={{
                padding: "5px 12px", borderRadius: 20, fontSize: 10, fontWeight: 600,
                background: C.coral + "12", color: C.coral, fontFamily: "'Nunito Sans', sans-serif",
              }}>
                {p}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.greyBlack, opacity: 0.6, lineHeight: 1.65, margin: "0 0 14px 0" }}>
            {patterns.length >= 2
              ? "Multiple elevated markers occurring together suggest a coordinated immune pattern \u2014 not isolated findings. When Th1 cytokine ratios, NK cell activity, and autoimmune markers are elevated simultaneously, it points to systemic immune dysregulation that may be relevant to fertility, implantation, and pregnancy maintenance. This is the kind of pattern a reproductive immunologist can help you evaluate and address."
              : patterns.length === 1 && th1
              ? "A Th1-dominant cytokine pattern suggests your immune system is skewed toward inflammation rather than the tolerance needed for pregnancy. This is one of the most common findings in women evaluated by reproductive immunologists for recurrent pregnancy loss."
              : patterns.length === 1 && nk
              ? "Elevated NK cell activity suggests your natural killer cells may be more aggressive than what supports healthy implantation. A reproductive immunologist can assess whether immune modulation therapies are appropriate for your situation."
              : "Autoimmune marker activation suggests your immune system is producing antibodies or expanding cell populations that attack your own tissues. In the context of fertility and pregnancy, this can contribute to implantation difficulties and pregnancy loss."}
          </p>
        </>
      )}

      <div style={{
        padding: 16, borderRadius: 14,
        background: `linear-gradient(135deg, ${C.cream}, ${C.yellow}22)`,
        border: `1px solid ${C.sand}`,
      }}>
        <p style={{
          fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase",
          color: C.purple, fontWeight: 700, margin: "0 0 8px 0"
        }}>
          What to do with these results
        </p>
        <p style={{ fontSize: 12, color: C.greyBlack, opacity: 0.65, lineHeight: 1.65, margin: 0 }}>
          {elevated > 0
            ? "These markers are best interpreted by a reproductive immunologist who can look at your full clinical picture \u2014 including your history, timing, and how these values change over time. A single elevated result is a data point; a pattern across multiple markers and multiple draws is a story. Bring these results to your provider and ask about immune-mediated factors in your case."
            : "Your entered markers are within normal ranges \u2014 a reassuring sign of balanced immune regulation. If you have concerns about fertility or pregnancy maintenance, discuss your full clinical picture with your provider. Immune markers are just one piece of the puzzle."}
        </p>
      </div>

      {elevated === 0 && filled.length > 0 && (
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: C.green,
          fontWeight: 700, margin: "16px 0 0 0", lineHeight: 1.4
        }}>
          Your markers look balanced \u2014 that\u2019s a great foundation.
        </p>
      )}
    </div>
  );
}

export default function ImmuneMarkerPage() {
  const [values, setValues] = useState({});
  const [anaIdx, setAnaIdx] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const handleInput = (id, raw) => {
    const v = raw === "" ? null : parseFloat(raw);
    setValues(prev => ({ ...prev, [id]: isNaN(v) ? null : v }));
  };

  const entries = MARKERS.map(m => {
    if (m.isANA) {
      const val = anaIdx !== null ? ANA_OPTIONS[anaIdx].value : null;
      const status = val === null ? null : val === 0 ? "normal" : val <= 80 ? "borderline" : val <= 320 ? "elevated" : "high";
      return { ...m, value: val, status, anaIdx };
    }
    const val = values[m.id] ?? null;
    return { ...m, value: val, status: val !== null ? getStatus(m, val) : null };
  });

  const groups = {};
  MARKERS.forEach(m => { if (!groups[m.group]) groups[m.group] = []; groups[m.group].push(m); });

  return (
    <>
      <Head>
        <title>Immune Marker Assessment | Bond Daily</title>
        <meta name="description" content="Enter your lab values to see where each immune marker falls relative to published reproductive immunology reference ranges." />
      </Head>
      <div style={{
        background: C.cream, minHeight: "100vh", padding: "0 0 40px 0",
        fontFamily: "'Nunito Sans', sans-serif", color: C.greyBlack,
      }}>
        {/* Top nav bar */}
        <div style={{
          background: C.white, borderBottom: `1px solid ${C.sand}`,
          padding: "14px 20px",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{
              textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
              color: C.purple, fontSize: 12, fontWeight: 600,
              fontFamily: "'Nunito Sans', sans-serif",
            }}>
              \u2190 Bond Daily
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

        <div style={{ maxWidth: 640, margin: "0 auto", padding: "28px 16px 0" }}>
          <p style={{
            fontSize: 9, letterSpacing: 3.5, textTransform: "uppercase",
            color: C.purple, fontWeight: 700, margin: "0 0 10px 0"
          }}>
            Bond \u00B7 Know Your Immune Markers
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700,
            color: C.greyBlack, margin: "0 0 6px 0", lineHeight: 1.15
          }}>
            Where do{" "}
            <em style={{ color: C.purple, fontStyle: "italic" }}>your</em>{" "}
            numbers fall?
          </h1>
          <p style={{
            fontSize: 13, color: C.greyBlack, opacity: 0.5, margin: "0 0 6px 0",
            lineHeight: 1.6, maxWidth: 500
          }}>
            Enter your lab values to see where each immune marker falls relative to published reproductive immunology reference ranges. Learn what your numbers mean and what patterns to watch for.
          </p>
          <p style={{
            fontSize: 10, color: C.purple, fontWeight: 600, margin: "0 0 28px 0",
            fontStyle: "italic", opacity: 0.65
          }}>
            Your data stays in your browser. Nothing is stored or sent.
          </p>

          {Object.entries(groups).map(([groupName, markers]) => (
            <div key={groupName} style={{ marginBottom: 22 }}>
              <p style={{
                fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
                color: C.navy, fontWeight: 700, margin: "0 0 10px 0",
                paddingBottom: 6, borderBottom: `1px solid ${C.sand}`
              }}>
                {groupName}
              </p>
              {markers.map(m => {
                const entry = entries.find(e => e.id === m.id);
                const has = entry.value !== null;
                const sc = has ? statusColor(entry.status) : C.sand;

                return (
                  <div key={m.id} style={{
                    background: C.white, borderRadius: 16, padding: "14px 16px",
                    marginBottom: 8,
                    border: `1px solid ${has ? sc + "33" : C.sand}`,
                    transition: "all 0.3s ease",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.greyBlack }}>{m.name}</div>
                        <div style={{ fontSize: 10, color: C.purple, fontWeight: 500, marginTop: 1 }}>{m.subtitle}</div>
                      </div>
                      {m.isANA ? (
                        <select
                          value={anaIdx ?? ""}
                          onChange={e => setAnaIdx(e.target.value === "" ? null : parseInt(e.target.value))}
                          style={{
                            padding: "7px 10px", borderRadius: 10, border: `1px solid ${C.sand}`,
                            fontSize: 12, fontFamily: "'Nunito Sans', sans-serif",
                            background: C.cream, color: C.greyBlack, outline: "none",
                            width: 120, cursor: "pointer", flexShrink: 0,
                          }}
                        >
                          <option value="">Select...</option>
                          {ANA_OPTIONS.map((a, i) => <option key={i} value={i}>{a.label}</option>)}
                        </select>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                          <input
                            type="number" step="0.1" placeholder={m.placeholder}
                            value={values[m.id] ?? ""}
                            onChange={e => handleInput(m.id, e.target.value)}
                            style={{
                              width: 82, padding: "7px 10px", borderRadius: 10,
                              border: `1px solid ${C.sand}`, fontSize: 13,
                              fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600,
                              background: C.cream, color: C.greyBlack, outline: "none", textAlign: "center",
                            }}
                          />
                          <span style={{ fontSize: 9, color: C.greyBlack, opacity: 0.35 }}>{m.unit}</span>
                        </div>
                      )}
                      {has && <StatusBadge status={entry.status} />}
                    </div>

                    {has && (
                      <div style={{ marginTop: 12 }}>
                        {!m.isANA ? <Gauge value={entry.value} marker={m} /> : <ANAVisual selectedIdx={anaIdx} />}

                        <button
                          onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                          style={{
                            marginTop: 10, background: "none", border: "none", cursor: "pointer",
                            fontSize: 11, color: C.purple, fontWeight: 600,
                            fontFamily: "'Nunito Sans', sans-serif", padding: 0,
                            display: "flex", alignItems: "center", gap: 4,
                          }}
                        >
                          {expanded === m.id ? "\u25BE" : "\u25B8"} What does this mean?
                        </button>

                        {expanded === m.id && (
                          <div style={{
                            marginTop: 10, padding: 14, borderRadius: 12,
                            background: C.cream, border: `1px solid ${C.sand}`,
                          }}>
                            <p style={{
                              fontSize: 11, color: C.greyBlack, opacity: 0.5, lineHeight: 1.6, margin: "0 0 10px 0"
                            }}>
                              {m.what}
                            </p>
                            <p style={{
                              fontSize: 12, color: C.greyBlack, opacity: 0.75, lineHeight: 1.65, margin: "0 0 10px 0",
                            }}>
                              {m.isANA
                                ? ANA_OPTIONS[anaIdx].interpretation
                                : (entry.status === "elevated" ? m.elevated : entry.status === "low" ? m.low : m.normal)}
                            </p>
                            <p style={{
                              fontSize: 8, color: C.greyBlack, opacity: 0.3, margin: 0, fontStyle: "italic"
                            }}>
                              {m.source}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <SummaryPanel entries={entries} />

          <p style={{
            fontSize: 8, color: C.greyBlack, opacity: 0.25, marginTop: 24,
            lineHeight: 1.5, textAlign: "center",
          }}>
            For educational purposes only. This tool does not provide medical advice, diagnosis, or treatment recommendations. Immune markers should be interpreted by a qualified reproductive immunologist in the context of your complete clinical history. Individual results vary and a single test is not definitive.
          </p>
        </div>
      </div>
    </>
  );
}
