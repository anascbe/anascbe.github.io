import { readFile, writeFile } from "node:fs/promises";
import { webcrypto } from "node:crypto";
import { resolve } from "node:path";

const [sourcePath, shellPath, outputPath, password] = process.argv.slice(2);

if (!sourcePath || !shellPath || !outputPath || !password) {
  throw new Error("Usage: encrypt-case-study <content> <shell> <output> <password>");
}

const iterations = 310000;
const salt = webcrypto.getRandomValues(new Uint8Array(16));
const iv = webcrypto.getRandomValues(new Uint8Array(12));
const sourceKey = await webcrypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(password),
  "PBKDF2",
  false,
  ["deriveKey"],
);
const key = await webcrypto.subtle.deriveKey(
  { name: "PBKDF2", hash: "SHA-256", salt, iterations },
  sourceKey,
  { name: "AES-GCM", length: 256 },
  false,
  ["encrypt"],
);
const content = await readFile(resolve(sourcePath), "utf8");
const ciphertext = new Uint8Array(
  await webcrypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(content),
  ),
);
const payload = JSON.stringify({
  version: 1,
  algorithm: "AES-GCM",
  iterations,
  salt: Buffer.from(salt).toString("base64"),
  iv: Buffer.from(iv).toString("base64"),
  ciphertext: Buffer.from(ciphertext).toString("base64"),
});
const shell = await readFile(resolve(shellPath), "utf8");

if (!shell.includes("__ENCRYPTED_PAYLOAD__")) {
  throw new Error("Encrypted payload marker is missing");
}

await writeFile(
  resolve(outputPath),
  shell.replace("__ENCRYPTED_PAYLOAD__", payload),
  "utf8",
);
