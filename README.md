# Mohammed Anas — Portfolio

This is a plain static site for GitHub Pages. It preserves the original Paper-derived homepage, adds the subtle line-field backdrop, and includes the password-protected Paytm case study.

## Publish

Copy this folder's contents to the root of a GitHub repository, then enable GitHub Pages for the repository root. No build step is required.

## Case studies

The Paytm tile in `index.html` links to `paytm.html`. Its content is encrypted in the browser, so the passcode and case-study copy are not stored as readable text in the published HTML.

For a new case study:

1. Follow `templates/CASE_STUDY_TEMPLATE.md` and place supplied media in `assets/<project-slug>/`.
2. Draft the case-study body outside the publishable site folder.
3. Run `tools/encrypt-case-study.mjs` with the draft, `templates/password-shell.template.html`, output path, and passcode.
4. Add a project tile to the homepage rail and link it to the generated page.
5. Test the wrong and correct passcodes, every media asset, keyboard navigation, and responsive layouts before publishing.

The reusable Codex template is available as `$artifact-template-portfolio-case-study`.
