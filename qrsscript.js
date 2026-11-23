const wrapper = document.querySelector(".wrapper");
const form = wrapper.querySelector("form");
const fileInput = form.querySelector("input");
const preview = form.querySelector("img");
const status = form.querySelector("p");
const result = wrapper.querySelector("textarea");
const copy = wrapper.querySelector(".copy");
const close = wrapper.querySelector(".close");
const uploadPrompt = status.textContent;
let scanning = false;
let previewUrl;

function clearPreview() {
  wrapper.classList.remove("active");
  preview.removeAttribute("src");
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = undefined;
}

fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];
  fileInput.value = "";
  if (!file || scanning) return;

  clearPreview();
  scanning = true;
  status.textContent = "Scanning QR Code...";
  try {
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("https://api.qrserver.com/v1/read-qr-code/", { method: "POST", body });
    if (!response.ok) throw new Error("QR code service unavailable");
    const data = await response.json();
    const symbol = data?.[0]?.symbol?.[0];
    if (symbol?.error || typeof symbol?.data !== "string") {
      throw new Error("No QR code found");
    }
    result.value = symbol.data;
    previewUrl = URL.createObjectURL(file);
    preview.src = previewUrl;
    wrapper.classList.add("active");
    status.textContent = uploadPrompt;
  } catch {
    status.textContent = "Couldn't scan QR Code. Choose an image to try again.";
  } finally {
    scanning = false;
  }
});

copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(result.value);
  } catch {
    result.select();
  }
});
form.addEventListener("click", (event) => {
  if (event.target !== fileInput && !scanning) fileInput.click();
});
close.addEventListener("click", clearPreview);
