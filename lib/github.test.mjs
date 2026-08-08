// Run: node lib/github.test.mjs
import assert from "node:assert/strict";

const ACRONYMS = new Set(["api", "ui", "cli", "sdk", "db", "jwt", "sql", "rest"]);
function titleize(slug) {
  return slug
    .split(/[-_.]+/)
    .filter(Boolean)
    .map((w) =>
      ACRONYMS.has(w.toLowerCase())
        ? w.toUpperCase()
        : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

assert.equal(titleize("link-shortener-api"), "Link Shortener API");
assert.equal(titleize("net-core-enigpus"), "Net Core Enigpus");
assert.equal(titleize("bookshelf-app"), "Bookshelf App");
assert.equal(titleize("laundry-app-rest-api"), "Laundry App REST API");
assert.equal(titleize("sha_test.v2"), "Sha Test V2");
assert.equal(titleize("--weird--"), "Weird");
assert.equal(titleize(""), "");

console.log("titleize: ok");

// --- rank(): backend outranks frontend, Java breaks ties ---
const BACKEND_NAME = /(^|[-_])(api|be|backend|server|rest|crud|service)([-_]|$)/i;
const BACKEND_LANGS = new Set(["Java", "Go", "C#", "Kotlin", "Rust", "Python"]);
function rank(r) {
  const backend =
    BACKEND_NAME.test(r.name) ||
    (r.language !== null && BACKEND_LANGS.has(r.language)) ||
    r.topics.some((t) => BACKEND_NAME.test(t));
  return (backend ? 2 : 0) + (r.language === "Java" ? 1 : 0);
}
const R = (name, language, topics = []) => ({ name, language, topics });

assert.equal(rank(R("loan-app-api", "Java")), 3, "java api = top");
assert.equal(rank(R("zoo-ticket", "Java")), 3, "java lang alone counts backend");
assert.equal(rank(R("bank-merchant-api", "Go")), 2, "go api");
assert.equal(rank(R("link-shortener-api", "TypeScript")), 2, "ts api via name");
assert.equal(rank(R("vue-frontend", "Vue")), 0, "frontend last");
assert.equal(rank(R("todolist-react", "JavaScript")), 0, "js ui last");
assert.equal(rank(R("some-tool", "JavaScript", ["rest-api"])), 2, "topic counts");
// A Go API must outrank a Java frontend — backend weighted above language.
assert.ok(rank(R("bank-merchant-api", "Go")) < rank(R("x", "Java")), "java+backend wins");
assert.ok(rank(R("x-api", "Go")) > rank(R("vue-frontend", "Vue")), "go api > vue");
// Name matcher must not fire on substrings like "rapid" or "beta".
assert.equal(rank(R("rapid-notes", "JavaScript")), 0, "no substring match on api");
assert.equal(rank(R("beta-site", "HTML")), 0, "no substring match on be");

console.log("rank: ok");
