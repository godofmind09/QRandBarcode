const wrapper = document.querySelector(".wrapper");
const input = wrapper.querySelector(".form input");
const generate = wrapper.querySelector(".form button");
const image = wrapper.querySelector(".qr-code img");
const download = wrapper.querySelector(".download-btn");
const error = wrapper.querySelector(".qr-error");
let imageUrl;

generate.addEventListener("click", async () => {
  if (!input.value.trim()) return;

  generate.disabled = true;
  download.disabled = true;
  generate.textContent = "Generating QR Code...";
  error.textContent = "";
  wrapper.classList.remove("active");
  if (imageUrl) URL.revokeObjectURL(imageUrl);
  imageUrl = undefined;
  image.removeAttribute("src");

  try {
    const url = new URL("https://api.qrserver.com/v1/create-qr-code/");
    url.search = new URLSearchParams({ size: "150x150", data: input.value });
    const response = await fetch(url);
    if (!response.ok || !response.headers.get("Content-Type")?.startsWith("image/")) {
      throw new Error("Unexpected QR code response");
    }
    imageUrl = URL.createObjectURL(await response.blob());
    image.src = imageUrl;
    wrapper.classList.add("active");
    download.disabled = false;
  } catch {
    error.textContent = "Could not generate the QR code. Please try again.";
  } finally {
    generate.disabled = false;
    generate.textContent = "Generate QR Code";
  }
});

download.addEventListener("click", () => {
  if (!imageUrl) return;
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "qrcode.png";
  link.click();
});
