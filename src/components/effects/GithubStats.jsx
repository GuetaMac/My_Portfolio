import { useEffect, useState } from "react";

const USERNAME = "GuetaMac";

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.floor(months / 12)} yr ago`;
}

export default function GithubStats({ t }) {
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(
            `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
          ),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("bad response");

        const user = await userRes.json();
        const repos = await reposRes.json();

        const nonForks = repos.filter((r) => !r.fork);
        const totalStars = nonForks.reduce(
          (sum, r) => sum + (r.stargazers_count || 0),
          0,
        );

        const langCounts = {};
        nonForks.forEach((r) => {
          if (r.language)
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        });
        const topLangs = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([lang]) => lang);

        const lastPush = nonForks.reduce((latest, r) => {
          const t = new Date(r.pushed_at).getTime();
          return t > latest ? t : latest;
        }, 0);

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos,
            followers: user.followers,
            totalStars,
            topLangs,
            lastPush: lastPush ? new Date(lastPush).toISOString() : null,
            memberSince: new Date(user.created_at).getFullYear(),
          });
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const Row = ({ label, value }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        padding: "7px 0",
      }}
    >
      <span
        style={{
          color: t.muted,
          fontFamily: "monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: t.bodyStrong,
          fontFamily: "monospace",
          fontSize: "0.7rem",
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <div
      style={{
        marginTop: "40px",
        border: "1px solid " + t.cardBorder,
        borderRadius: "8px",
        background: t.bg,
        overflow: "hidden",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 18px",
          borderBottom: "1px solid " + t.cardBorder,
          transition: "border-color 0.4s",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#ff5f56",
          }}
        />
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#ffbd2e",
          }}
        />
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#27c93f",
          }}
        />
        <span
          style={{
            marginLeft: "8px",
            fontFamily: "monospace",
            fontSize: "0.62rem",
            color: t.muted,
            letterSpacing: "0.06em",
          }}
        >
          curl api.github.com/users/{USERNAME}
        </span>
      </div>

      <div style={{ padding: "16px 18px" }}>
        {status === "loading" && (
          <p
            style={{
              color: t.accentText,
              fontFamily: "monospace",
              fontSize: "0.7rem",
            }}
          >
            fetching live stats…
          </p>
        )}

        {status === "error" && (
          <p
            style={{
              color: t.muted,
              fontFamily: "monospace",
              fontSize: "0.7rem",
            }}
          >
            couldn't reach the GitHub API right now — view it live on{" "}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: t.accentText }}
            >
              github.com/{USERNAME} ↗
            </a>
          </p>
        )}

        {status === "ready" && stats && (
          <>
            <Row label="PUBLIC REPOS" value={stats.publicRepos} />
            <Row label="STARS EARNED" value={stats.totalStars} />
            <Row label="FOLLOWERS" value={stats.followers} />
            <Row
              label="TOP LANGUAGES"
              value={stats.topLangs.length ? stats.topLangs.join(" · ") : "—"}
            />
            <Row
              label="LAST PUSH"
              value={stats.lastPush ? timeAgo(stats.lastPush) : "—"}
            />
            <Row label="MEMBER SINCE" value={stats.memberSince} />
            <div
              style={{
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "1px solid " + t.divider,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                data-cursor="OPEN"
                style={{
                  color: t.accentText,
                  fontFamily: "monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                }}
              >
                view full profile ↗
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
