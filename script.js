document.getElementById('dischargeForm').addEventListener('submit', (event) => {
    event.preventDefault();

    function toggleInputFields() {
        const type = document.getElementById("type").value;
        const widthLabel = document.getElementById("width-label");
        const widthInput = document.getElementById("width");
        const angleLabel = document.getElementById("angle-label");
        const angleInput = document.getElementById("angle");
    
        if (type === "rectangular-notch") {
            widthLabel.style.display = "inline";
            widthInput.style.display = "inline";
            angleLabel.style.display = "none";
            angleInput.style.display = "none";
        } else if (type === "v-notch") {
            angleLabel.style.display = "inline";
            angleInput.style.display = "inline";
            widthLabel.style.display = "none";
            widthInput.style.display = "none";
        }
    }


    const type = document.getElementById('notchType').value;
    const head = parseFloat(document.getElementById('head').value);
    const discharge = parseFloat(document.getElementById('discharge').value);
    const g = 981; // Acceleration due to gravity in cm/s^2
    let Cd, Q_theoretical;

    if (type === 'rectangular') {
        const width = parseFloat(document.getElementById('width').value);
        Q_theoretical = (2 / 3) * width * Math.sqrt(2 * g) * Math.pow(head, 1.5);
        Cd = Math.sqrt(discharge / Q_theoretical);
    } else if (type === 'v-notch') {
        const angle = parseFloat(document.getElementById('angle').value); // Angle of the V-notch in degrees
        const theta = angle * (Math.PI / 180); // Convert angle to radians
        Q_theoretical = (8 / 15) * Math.tan(theta / 2) * Math.sqrt(2 * g) * Math.pow(head, 2.5);
        Cd = Math.sqrt(discharge / Q_theoretical);
    }

    document.getElementById('result').innerText = `Coefficient of Discharge (Cd): ${Cd.toFixed(4)}`;
});
