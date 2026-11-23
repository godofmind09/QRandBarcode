const form = document.querySelector("#generateBarcode").form;
const barcode = form.querySelector("#barcode");
const download = form.querySelector("#downloadBarcode");
const error = form.querySelector("#barcodeError");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = form.elements.barcodeValue.value.trim();
  barcode.hidden = true;
  download.disabled = true;
  error.textContent = "";
  if (!value) {
    error.textContent = "Enter a barcode value.";
    return;
  }

  try {
    JsBarcode(barcode, value, {
      format: form.elements.barcodeType.value,
      displayValue: form.elements.showText.value === "true",
      lineColor: "#24292e",
      width: 2,
      height: 40,
      fontSize: 20,
    });
    barcode.hidden = false;
    download.disabled = false;
  } catch {
    error.textContent = "Could not generate a barcode for that value and format.";
  }
});

download.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = barcode.toDataURL("image/png");
  link.download = "barcode.png";
  link.click();
});
