# Portfolio case-study template

Use the Paytm case study as the canonical visual and structural reference. A new case study should:

1. Preserve the shared case-study stylesheet, line-field backdrop, password screen, content widths, typography, spacing rhythm, media treatment, and footer.
2. Create a clear narrative from the supplied evidence. Use only sections supported by the material; do not invent outcomes, metrics, responsibilities, or process.
3. Start with a short project kicker, an outcome-oriented title, a compact role/date line, one hero asset, and any required confidentiality note.
4. Structure the body with numbered sections. Typical sections are Context, Problem, Research, Insights, Solution, Key decisions, Outcome, and Reflection.
5. Place supporting images or videos immediately after the paragraph they substantiate. Give every meaningful visual descriptive alternative text and every demo a short caption.
6. Keep prose within the narrow column and primary visuals within the wide column.
7. Encrypt the finished content into a root-level project HTML file using the encryption tool. Never publish the plaintext project content.
8. Add one project tile to the homepage rail using a representative 608 × 343 preview. Link the entire tile to the encrypted page.
9. Verify the wrong-passcode state, successful unlock, all local assets, return links, desktop layout, and mobile layout before publishing.

## Content skeleton

~~~html
<article class="case-shell">
  <header class="case-header content-narrow">
    <a class="back-link" href="index.html#selected-work">… Back to selected work</a>
    <p class="case-kicker">{{COMPANY}} · {{DISCIPLINE}}</p>
    <h1 class="case-title" tabindex="-1">{{CASE_STUDY_TITLE}}</h1>
    <p class="case-meta">{{DATE}} · {{ROLE}}</p>
  </header>

  <figure class="content-wide">
    <div class="hero-media"><img src="{{HERO_ASSET}}" alt="{{HERO_ALT}}" /></div>
    <figcaption class="nda-note">{{OPTIONAL_CONFIDENTIALITY_NOTE}}</figcaption>
  </figure>

  <section class="case-section content-narrow" aria-labelledby="{{SECTION_ID}}">
    <div class="section-heading">
      <span class="section-index">01</span>
      <h2 id="{{SECTION_ID}}">{{SECTION_TITLE}}</h2>
    </div>
    <div class="prose"><p>{{SECTION_COPY}}</p></div>
  </section>

  <footer class="case-footer content-narrow">
    <a href="index.html#selected-work">← Back to selected work</a>
    <span>Mohammed Anas · {{YEAR}}</span>
  </footer>
</article>
~~~

The password shell can be adapted from the existing Paytm gate. The encryption tool expects four arguments:

~~~text
node tools/encrypt-case-study.mjs <plaintext-content> <password-shell> <output-html> <passcode>
~~~
