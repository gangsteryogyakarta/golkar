// Navigation
function switchView(viewId) {
  // Nav Active State
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
    const onclick = item.getAttribute("onclick");
    if (onclick && onclick.includes(viewId)) item.classList.add("active");
  });

  // Content Visibility
  document
    .querySelectorAll(".view-section")
    .forEach((sec) => sec.classList.remove("active"));
  const target = document.getElementById(viewId);
  if (target) target.classList.add("active");

  // Header Title
  const titles = {
    dashboard: "Situation Room",
    competitor: "Competitor Intelligence",
    warning: "Early Warning System",
    troops: "Troops Command Center",
    optimizer: "AI Content Optimizer",
    accounts: "KOL & Influencer Management",
    reports: "Executive Reports",
  };
  document.getElementById("page-title").innerText =
    titles[viewId] || "Command Center";

  // Chart Lazy Init
  if (viewId === "competitor" && !window.competitorChartInited) {
    initCompetitorChart();
    window.competitorChartInited = true;
  }

  // Map Resize Fix
  if (viewId === "dashboard" && window.map) {
    setTimeout(() => {
      window.map.invalidateSize();
    }, 100);
  }
}

// Chart.js Init
document.addEventListener("DOMContentLoaded", function () {
  // Dates
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  document.getElementById("current-date").innerText =
    new Date().toLocaleDateString("id-ID", options);

  // Main Chart
  const ctx = document.getElementById("mainChart").getContext("2d");
  const gradientPos = ctx.createLinearGradient(0, 0, 0, 400);
  gradientPos.addColorStop(0, "rgba(16, 185, 129, 0.5)");
  gradientPos.addColorStop(1, "rgba(16, 185, 129, 0.0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      datasets: [
        {
          label: "Positif",
          data: [12, 15, 30, 50, 55, 65],
          borderColor: "#10B981",
          backgroundColor: gradientPos,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Negatif",
          data: [8, 10, 15, 20, 30, 15],
          borderColor: "#EF4444",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } } },
    },
  });

  // Live Stream Sim
  const streamContainer = document.getElementById("streamList");
    const comments = [
        { text: "Golkar terus berkarya untuk rakyat! #GolkarMenang", sentiment: "positive", user: "@kuning_sejati" },
        { text: "Harga pupuk di Jatim tolong dikawal", sentiment: "negative", user: "@petani_muda" },
        { text: "Airlangga dampingi UMKM naik kelas", sentiment: "positive", user: "@umkm_bangkit" }
    ];

  setInterval(() => {
    const c = comments[Math.floor(Math.random() * comments.length)];
    const el = document.createElement("div");
    el.className = `stream-item ${c.sentiment}`;
    el.innerHTML = `<div class="stream-header"><span>${c.user}</span><span>Just now</span></div><div class="stream-content">${c.text}</div>`;
    streamContainer.prepend(el);
    if (streamContainer.children.length > 8)
      streamContainer.lastElementChild.remove();
  }, 3000);

  // Leaflet Map Init
  window.map = L.map("map", {
    zoomControl: false,
    scrollWheelZoom: false,
  }).setView([-2.5, 118], 5);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
    },
  ).addTo(window.map);

  L.control.zoom({ position: "bottomright" }).addTo(window.map);

  const points = [
    { loc: [-6.2, 106.8], val: "High", color: "#FFD700" },
    { loc: [-7.2, 112.7], val: "High", color: "#FFD700" },
    { loc: [-0.9, 131.2], val: "Medium", color: "#B8860B" },
    { loc: [5.5, 95.3], val: "Medium", color: "#B8860B" },
    { loc: [-5.1, 119.4], val: "Low", color: "#4B3A00" },
    { loc: [-3.7, 128.1], val: "Medium", color: "#FFD700" },
  ];

  points.forEach((p) => {
    L.circle(p.loc, {
      color: p.color,
      fillColor: p.color,
      fillOpacity: 0.6,
      radius: 120000,
      weight: 0,
    })
      .addTo(window.map)
      .bindPopup(`<b>Region Activity</b><br>Sentiment: ${p.val}`);
  });
});

// Competitor Chart
// Competitor Chart
function initCompetitorChart() {
  const ctx = document.getElementById("competitorChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Partai Golkar",
          data: [75, 78, 80, 82, 85],
          backgroundColor: "#FFD700", // Golkar Yellow
          borderRadius: 4,
        },
        {
          label: "Partai X",
          data: [70, 72, 71, 74, 76],
          backgroundColor: "#334155", // Neutral Dark
          borderRadius: 4,
        },
        {
          label: "Partai Y",
          data: [65, 68, 66, 69, 70],
          backgroundColor: "#94A3B8", // Neutral Light
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + "% (Indeks Kepuasan)";
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { borderDash: [5, 5] },
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
    },
  });
}

// Interactions
document.getElementById("btnGenerate").addEventListener("click", function () {
  const btn = this;
  const loader = btn.querySelector(".loader");
  btn.disabled = true;
  loader.style.display = "block";

  setTimeout(() => {
    btn.disabled = false;
    loader.style.display = "none";
    document.getElementById("outputPlaceholder").style.display = "none";
    document.getElementById("aiOutput").style.display = "block";
  }, 2000);
});

function generateReport(type) {
  if (confirm(`Generate and download ${type} Report?`)) {
    alert("Generating report... Download will start automatically.");
  }
}
