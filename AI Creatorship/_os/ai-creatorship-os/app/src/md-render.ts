// Tiny markdown renderer. Handles the subset we actually produce:
//   - # / ## / ### headings
//   - paragraphs
//   - - bullet lists
//   - `inline code` and **bold** / *italic*
//   - ```fenced code blocks```
//   - horizontal rules (---)
//
// Returns a DOM fragment. Not a full CommonMark impl — deliberately minimal.

export function renderMarkdown(md: string): DocumentFragment {
  const frag = document.createDocumentFragment();
  const lines = md.split(/\r?\n/);
  let paraBuf: string[] = [];
  let listBuf: string[] = [];
  let codeBuf: string[] = [];
  let inCode = false;

  const flushPara = (): void => {
    if (paraBuf.length === 0) return;
    const p = document.createElement("p");
    renderInline(paraBuf.join(" "), p);
    frag.appendChild(p);
    paraBuf = [];
  };
  const flushList = (): void => {
    if (listBuf.length === 0) return;
    const ul = document.createElement("ul");
    for (const item of listBuf) {
      const li = document.createElement("li");
      renderInline(item, li);
      ul.appendChild(li);
    }
    frag.appendChild(ul);
    listBuf = [];
  };
  const flushCode = (): void => {
    if (codeBuf.length === 0) return;
    const pre = document.createElement("pre");
    pre.className = "md-code";
    pre.textContent = codeBuf.join("\n");
    frag.appendChild(pre);
    codeBuf = [];
  };

  for (const line of lines) {
    // Fenced code
    if (/^```/.test(line)) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushPara(); flushList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    // Headings
    const h3 = /^###\s+(.+)/.exec(line);
    if (h3) { flushPara(); flushList(); const h = document.createElement("h4"); renderInline(h3[1]!, h); frag.appendChild(h); continue; }
    const h2 = /^##\s+(.+)/.exec(line);
    if (h2) { flushPara(); flushList(); const h = document.createElement("h3"); renderInline(h2[1]!, h); frag.appendChild(h); continue; }
    const h1 = /^#\s+(.+)/.exec(line);
    if (h1) { flushPara(); flushList(); const h = document.createElement("h2"); renderInline(h1[1]!, h); frag.appendChild(h); continue; }

    // HR
    if (/^---+$/.test(line.trim())) {
      flushPara(); flushList();
      frag.appendChild(document.createElement("hr"));
      continue;
    }

    // List item
    const li = /^[-*]\s+(.+)/.exec(line);
    if (li) {
      flushPara();
      listBuf.push(li[1]!);
      continue;
    }

    // Blank line — flush paragraphs/lists
    if (!line.trim()) {
      flushPara(); flushList();
      continue;
    }

    // Continue paragraph
    flushList();
    paraBuf.push(line);
  }

  flushPara(); flushList(); flushCode();
  return frag;
}

/** Minimal inline: **bold**, *italic*, `code`. Others are raw text. */
function renderInline(text: string, target: HTMLElement): void {
  // Split into tokens by **, *, ` — process each chunk.
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) target.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
    const tok = m[0];
    if (tok.startsWith("**")) {
      const b = document.createElement("strong");
      b.textContent = tok.slice(2, -2);
      target.appendChild(b);
    } else if (tok.startsWith("*")) {
      const i = document.createElement("em");
      i.textContent = tok.slice(1, -1);
      target.appendChild(i);
    } else if (tok.startsWith("`")) {
      const c = document.createElement("code");
      c.textContent = tok.slice(1, -1);
      target.appendChild(c);
    }
    lastIndex = m.index + tok.length;
  }
  if (lastIndex < text.length) target.appendChild(document.createTextNode(text.slice(lastIndex)));
}
