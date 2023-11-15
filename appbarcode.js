$('document').ready(function() {
	$('#generateBarcode').on('click', function() {
	  var barcodeValue = $("#barcodeValue").val();
	  var barcodeType = $("#barcodeType").val();
	  var showText = $("#showText").val();
	  if (!barcodeValue || !barcodeType || !showText) {
		alert("Please fill all the required fields");
		return;
	  }
	  JsBarcode("#barcode", barcodeValue, {
		format: barcodeType,
		displayValue: showText === "true",
		lineColor: "#24292e",
		width: 2,
		height: 40,
		fontSize: 20
	  });
  
	  var downloadBtn = document.createElement("a");
	  downloadBtn.href = document.getElementById("barcode").toDataURL("image/png");
	  downloadBtn.download = "barcode.png";
	  downloadBtn.innerHTML = "Download Barcode";
  
	  var barcodeDiv = document.getElementById("barcode").parentNode;
	  barcodeDiv.appendChild(downloadBtn);
	});
  });
  