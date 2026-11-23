const start = document.querySelector("#startButton");
const result = document.querySelector("#result");
let scanning = false;

function stop() {
  if (!scanning) return;
  scanning = false;
  Quagga.offDetected(onDetection);
  Quagga.stop();
  start.disabled = false;
}

function onDetection(detection) {
  const code = detection?.codeResult?.code;
  if (!code) return;
  result.textContent = code;
  stop();
}

start.addEventListener("click", () => {
  if (!window.Quagga) {
    result.textContent = "The barcode scanner could not load.";
    return;
  }
  start.disabled = true;
  result.textContent = "Starting camera...";
  Quagga.init({
    inputStream: {
      type: "LiveStream",
      target: document.querySelector("#preview"),
      constraints: { facingMode: "environment" },
    },
    decoder: {
      readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader", "code_39_reader", "codabar_reader", "i2of5_reader"],
    },
  }, (error) => {
    if (error) {
      result.textContent = "Could not start the camera. Check camera access and try again.";
      start.disabled = false;
      return;
    }
    scanning = true;
    Quagga.onDetected(onDetection);
    Quagga.start();
    result.textContent = "Point the camera at a barcode.";
  });
});

window.addEventListener("pagehide", stop);
