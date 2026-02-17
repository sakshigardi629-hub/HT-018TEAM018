let fraudCount = 0;
let safeCount = 0;

function checkFraud() {
    let amount = document.getElementById("amount").value;
    let location = document.getElementById("location").value;
    let time = document.getElementById("time").value;

    let riskScore = 0;

    if (amount > 50000) riskScore += 50;
    if (location === "new") riskScore += 30;
    if (time === "night") riskScore += 20;

    let resultText = "";

    if (riskScore >= 70) {
        resultText = "⚠️ Fraud Detected! Risk Score: " + riskScore;
        fraudCount++;
        alert("⚠️ Suspicious Transaction! Verification Required.");
    } else {
        resultText = "✅ Safe Transaction. Risk Score: " + riskScore;
        safeCount++;
    }
let table = document.getElementById("historyTable");
let row = table.insertRow();

row.insertCell(0).innerHTML = amount;
row.insertCell(1).innerHTML = location;
row.insertCell(2).innerHTML = time;
row.insertCell(3).innerHTML = riskScore;
row.insertCell(4).innerHTML = (riskScore >= 70) ? "Fraud" : "Safe";

    document.getElementById("result").innerHTML = resultText;
    updateChart();
}

let ctx = document.getElementById('chart').getContext('2d');

let chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Safe', 'Fraud'],
        datasets: [{
            data: [safeCount, fraudCount],
            backgroundColor: ['#00ff99', '#ff4b2b']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
});



function updateChart() {
    chart.data.datasets[0].data = [safeCount, fraudCount];
    chart.update();
}
