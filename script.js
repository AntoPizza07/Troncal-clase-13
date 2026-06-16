new Chart(document.getElementById("barras"), {
    type: "bar",
    data: {
        labels: [
            "Gestión y Fabricación Avanzada",
            "Gestión Estratégica y Sistemas Complejos",
            "Territorios y Ciudadanías",
            "Lenguajes Visuales y Narrativas",
        ],
        datasets: [
            {
                label: "N° de electivos",
                data: [45, 44, 24, 19],
                backgroundColor: [
                    "rgba(23, 19, 221, 0.66)",
                    "rgba(128, 19, 221, 0.66)",
                    "rgba(191, 19, 221, 0.51)",
                    "rgba(22, 196, 120, 0.51)",
                ],
                borderColor: "transparent",
                borderRadius: 3,
                borderSkipped: false,
            },
        ],
    },
        options: {
        indexAxis: "y",
        responsive: true,
            scales: {
            x: {
                beginAtZero: true,
                max: 55,
                grid: { color: "rgba(0,0,0,0.06)" },
                border: { color: "#ccc" },
                ticks: {
                    font: { family: "'Georama', sans-serif", size: 11 },
                    color: "#999",
                    stepSize: 10,
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null;
                    },
                },
            },
            y: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                    font: { family: "'Georama', sans-serif", size: 11 },
                    color: "#404040",
                },
            },
        },
                plugins: {
                    legend: { display: false },
                     tooltip: {
                    backgroundColor: "#fff",
                    borderColor: "#ddd",
                    borderWidth: 1,
                    titleColor: "#111",
                    bodyColor: "#555",
                    titleFont: { family: "'Georama', sans-serif", size: 12, weight: "600" },
                    bodyFont: { family: "'Georama', sans-serif", size: 11 },
                    padding: 10,
                    callbacks: {
                            label: function (context) {
                            return " " + context.raw + " electivos";
                    },
                },
            },
        },
    },
});

new Chart(document.getElementById("apiladas"), {
    type: "bar",
    data: {
        labels: ["Mención I y S", "Mención V y M", "Ambas menciones", "Troncales"],
        datasets: [
            {
                label: "3 créditos",
                data: [57, 55, 44, 0],
                backgroundColor: "rgba(23, 19, 221, 0.66)rgba(128, 19, 221, 0.66)",
                borderColor: "transparent",
                borderRadius: 1,
            },
            {
                label: "6 créditos",
                data: [3, 1, 5, 6],
                backgroundColor: "rgba(128, 19, 221, 0.66)",
                borderColor: "transparent",
                borderRadius: 3,
            },
        ],
    },
            options: {
                responsive: true
            ,
                     scales: {
            x: {
                stacked: true,
                grid: { color: "rgba(0,0,0,0.06)" },
                border: { color: "#ccc" },
                ticks: {
                    font: { family: "'Georama', sans-serif", size: 11 },
                    color: "#404040",
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                max: 70,
                grid: { color: "rgba(0,0,0,0.06)" },
                border: { color: "#bbb", dash: [4, 4] },
                ticks: {
                    font: { family: "'Georama', sans-serif", size: 11 },
                    color: "#999",
                    stepSize: 10,
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null;
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
                align: "start",
                labels: {
                    font: { family: "'Georama', sans-serif", size: 11 },
                    color: "#999",
                    boxWidth: 12,
                    boxHeight: 12,
                    padding: 16,
                },
            },
            tooltip: {
                backgroundColor: "#fff",
                borderColor: "#ddd",
                borderWidth: 1,
                titleColor: "#111",
                bodyColor: "#555",
                titleFont: { family: "'Georama', sans-serif", size: 12, weight: "600" },
                bodyFont: { family: "'Georama', sans-serif", size: 11 },
                padding: 10,
                callbacks: {
                    label: function (context) {
                        return " " + context.dataset.label + ": " + context.raw + " electivos";
                    },
                },
            },
        },
    },
});

const input = document.getElementById("buscador");
const tbody = document.getElementById("tabla-body");
const URL = "https://api.myjson.online/v1/records/3888d6ca-cc05-4881-865c-153e456b7bf0";

fetch(URL)
    .then(function (respuesta) {
        if (!respuesta.ok) {
            throw new Error("Error HTTP: " + respuesta.status);
        }
        return respuesta.json();
    })
    .then(function (datos) {
        var trabajo = datos.data;
        trabajo.forEach(function (x) {
            tbody.innerHTML +=
                '<tr style="' +
                {x.ok == 1
                    ? "background-color: var(--color-iluminadisimo); color: var(--color-oscurisimo)"
                    : ""}"><td>${x.COD.}</td><td>${x.ELECTIVO}</td><td>${x.MENCIÓN}</td><td>${x.CRÉDITOS}</td><td>${x.n° REAL REAL}</td></tr>`;
                    
                    });
    })
    .catch((error) {
        console.error("Algo salió mal:", error);
    });

function sinAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

document.getElementById("buscador").addEventListener("keyup", function () {
    const valor = sinAcentos(this.value.toLowerCase());
    document.querySelectorAll("#tabla-body tr").forEach(function (fila) {
        fila.style.display = sinAcentos(fila.textContent.toLowerCase()).includes(valor) ? "" : "none";
    });
});