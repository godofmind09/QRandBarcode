const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrColor = wrapper.querySelector(".form .color-picker"),
qrImg = wrapper.querySelector(".qr-code img");

generateBtn.addEventListener("click",()=>{
    let qrValue = qrInput.value;
    if(!qrValue) return;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    qrImg.addEventListener("load",()=>{
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    })
    
});
function downloadQRCode() {
    // Get the QR code image element
    const qrCodeImg = document.querySelector('.qr-code img');
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.style.display = 'none';
    
    // Set the anchor element's href attribute to the QR code image's source
    link.href = qrCodeImg.src;
    
    // Set the anchor element's download attribute to the desired file name
    link.download = 'qrcode.png';
    
    // Add the anchor element to the page
    document.body.appendChild(link);
    
    // Click the anchor element to trigger the download
    link.click();
    
    document.body.removeChild(link);
}
const downloadBtn = document.querySelector('.download-btn');
downloadBtn.addEventListener('click', downloadQRCode);

