const form = document.querySelector("#password-form");
const input = document.querySelector("#case-password");
const error = document.querySelector("#password-error");
const gate = document.querySelector("#password-gate");
const content = document.querySelector("#case-study-content");
const payload = document.querySelector("#encrypted-case-study");

function fromBase64(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function deriveKey(password, salt, iterations) {
  const encoded = new TextEncoder().encode(password);
  const sourceKey = await crypto.subtle.importKey("raw", encoded, "PBKDF2", false, ["deriveKey"]);

  return crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    sourceKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
}

async function unlock(password) {
  const encrypted = JSON.parse(payload.textContent);
  const salt = fromBase64(encrypted.salt);
  const iv = fromBase64(encrypted.iv);
  const ciphertext = fromBase64(encrypted.ciphertext);
  const key = await deriveKey(password, salt, encrypted.iterations);
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return new TextDecoder().decode(plaintext);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  error.textContent = "";
  form.querySelector("button").disabled = true;

  try {
    content.innerHTML = await unlock(input.value);
    document.querySelectorAll("[data-legacy-case-style]").forEach((stylesheet) => stylesheet.removeAttribute("disabled"));
    gate.classList.add("is-hidden");
    content.classList.remove("is-hidden");
    document.title = content.querySelector("[data-case-title]")?.dataset.caseTitle || "Case study — Mohammed Anas";
    document.querySelectorAll("video[autoplay]").forEach((video) => video.play().catch(() => {}));
    content.querySelector("h1")?.focus({ preventScroll: true });
  } catch {
    error.textContent = "That passcode didn’t work. Please try again.";
    input.select();
  } finally {
    form.querySelector("button").disabled = false;
  }
});
