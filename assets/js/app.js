document.addEventListener("DOMContentLoaded", () => {
    loadComponent("aside-container", "components/sidebar.html");
    loadComponent("header-container", "components/header.html");
    
    // Default module
    loadModule("dashboard");
});

function loadComponent(containerId, initialPath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(initialPath)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
            if (containerId === "aside-container") {
                initSidebarNavigation();
            }
        })
        .catch(err => {
            console.error(`Failed to load component ${initialPath}:`, err);
            container.innerHTML = "<p>Error loading component.</p>";
        });
}

function loadModule(moduleName) {
    const contentArea = document.getElementById("main-content-area");
    if (!contentArea) return;

    contentArea.innerHTML = '<div class="flex-center" style="height:100%;"><i class="fa-solid fa-circle-notch fa-spin fa-3x text-primary"></i></div>';

    fetch(`modules/${moduleName}.html`)
        .then(response => {
            if (!response.ok) throw new Error("Module not found");
            return response.text();
        })
        .then(html => {
            contentArea.innerHTML = html;
            updateActiveNav(moduleName);
            updateHeaderTitle(moduleName);
            
            // Re-initialize scripts based on module
            if (moduleName === "dashboard") {
                initDashboardScripts();
            } else if (moduleName === "situationroom") {
                initSituationRoomScripts();
            } else if (moduleName === "competitor") {
                initCompetitorScripts();
            } else if (moduleName === "optimizer") {
                initOptimizerScripts();
            } else if (moduleName === "webgis") {
                initWebGISScripts();
            } else if (moduleName === "kta") {
                initKTAScripts();
            } else if (moduleName === "social-media") {
                initSocialMediaScripts();
            }
        })
        .catch(err => {
            console.error(`Failed to load module ${moduleName}:`, err);
            contentArea.innerHTML = `<div class="flex-center" style="height:100%; flex-direction:column;"><i class="fa-solid fa-triangle-exclamation fa-3x text-danger"></i><p>Failed to load module: ${moduleName}</p></div>`;
        });
}

function initSidebarNavigation() {
    const navItems = document.querySelectorAll(".nav-item[data-target]");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const target = item.getAttribute("data-target");
            loadModule(target);
        });
    });
}

function updateActiveNav(moduleName) {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("data-target") === moduleName) {
            item.classList.add("active");
        }
    });
}

function updateHeaderTitle(moduleName) {
    const titles = {
        dashboard: "Dashboard Overview",
        events: "Manajemen Event",
        "create-event": "Tambah Event Baru",
        "event-details": "Detail Event",
        "report-council": "Pelaporan Kegiatan Dewan",
        checkin: "Sistem QR & Check-in",
        webgis: "WebGIS Sebaran Pemilih",
        kta: "Digitalisasi KTA",
        "wa-blast": "WhatsApp Blasting",
        "social-media": "Social Media Management",
        "database-pemilih": "Database Pemilih",
        situationroom: "Situation Room",
        competitor: "Regional Comparative Analysis",
        warning: "Early Warning System",
        troops: "Satgas Management",
        optimizer: "Public Comm. AI",
        accounts: "KOL Watchlist",
        reports: "Executive Reports"
    };
    const titleEl = document.getElementById("page-title");
    if (titleEl) {
        titleEl.innerText = titles[moduleName] || "Command Center";
    }
}

// --- Specific Module Scripts (Refactored from original script.js) ---

function initDashboardScripts() {
    // 1. Region Bar Chart
    const regionCtx = document.getElementById("regionChart");
    if (regionCtx) {
        new Chart(regionCtx.getContext("2d"), {
            type: "bar",
            data: {
                labels: ["Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur"],
                datasets: [{
                    label: "Jumlah Pemilih",
                    data: [4500, 3800, 5200, 4800, 5500],
                    backgroundColor: "#FFD700", // Golkar Yellow
                    borderRadius: 4,
                    barPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { borderDash: [5, 5] }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // 2. Demographics Pie Chart
    const demographicCtx = document.getElementById("demographicChart");
    if (demographicCtx) {
        new Chart(demographicCtx.getContext("2d"), {
            type: "doughnut",
            data: {
                labels: ["17-25", "26-35", "36-50", "50+"],
                datasets: [{
                    data: [2500, 5800, 8200, 7300],
                    backgroundColor: [
                        "#FFFACD", // Lightest
                        "#F0E68C",
                        "#DAA520",
                        "#8B4513"  // Darkest
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 8
                        }
                    }
                },
                cutout: '0%' // Make it a pie chart as per image (or '50%' for donut) - Image looks like pie with hole or donut? Image is Pie. Let's set cutout to 0.
            }
        });
    }

    // 3. Trend Line Chart
    const trendCtx = document.getElementById("trendChart");
    if (trendCtx) {
        new Chart(trendCtx.getContext("2d"), {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "Mei"],
                datasets: [
                    {
                        label: "Jumlah Event",
                        data: [12, 15, 18, 14, 20],
                        borderColor: "#FFD700",
                        backgroundColor: "#FFD700",
                        yAxisID: 'y',
                        tension: 0.4
                    },
                    {
                        label: "Total Kehadiran",
                        data: [950, 1200, 1450, 980, 1650], // Higher scale
                        borderColor: "#B8860B", // Darker Gold
                        backgroundColor: "#B8860B",
                        yAxisID: 'y1',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: { position: 'bottom' }
                },
                scales: {
                    x: {
                        grid: { display: false }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        grid: { borderDash: [5, 5] }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: { display: false }
                    }
                }
            }
        });
    }
}

function initCompetitorScripts() {
    const ctx = document.getElementById("competitorChart");
    if (ctx) {
        new Chart(ctx.getContext("2d"), {
            type: "bar",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [
                    {
                        label: "Partai Golkar",
                        data: [75, 78, 80, 82, 85],
                        backgroundColor: "#FFD700",
                        borderRadius: 4,
                    },
                    {
                        label: "Partai X",
                        data: [70, 72, 71, 74, 76],
                        backgroundColor: "#334155",
                        borderRadius: 4,
                    },
                    {
                        label: "Partai Y",
                        data: [65, 68, 66, 69, 70],
                        backgroundColor: "#94A3B8",
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
                                if (label) label += ": ";
                                if (context.parsed.y !== null) label += context.parsed.y + "% (Indeks Kepuasan)";
                                return label;
                            },
                        },
                    },
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { borderDash: [5, 5] },
                        ticks: { callback: function (value) { return value + "%"; } },
                    },
                },
                interaction: { mode: "nearest", axis: "x", intersect: false },
            },
        });
    }
}

function initOptimizerScripts() {
    const btn = document.getElementById("btnGenerate");
    if (btn) {
        btn.addEventListener("click", function () {
            const loader = btn.querySelector(".loader");
            btn.disabled = true;
            if(loader) loader.style.display = "block";
          
            setTimeout(() => {
                btn.disabled = false;
                if(loader) loader.style.display = "none";
                document.getElementById("outputPlaceholder").style.display = "none";
                document.getElementById("aiOutput").style.display = "block";
            }, 2000);
        });
    }
}

// Global function for switchModule that might be called from inline events
window.switchModule = loadModule;

// Global report generation
window.generateReport = function(type) {
  if (confirm(`Generate and download ${type} Report?`)) {
    alert("Generating report... Download will start automatically.");
  }
};

function initSituationRoomScripts() {
    // Dates (managed globally usually, but can update if needed)

    // Main Chart (Old Sentinel Logic)
    const ctx = document.getElementById("mainChart");
    if (ctx) {
        const context = ctx.getContext("2d");
        const gradientPos = context.createLinearGradient(0, 0, 0, 400);
        gradientPos.addColorStop(0, "rgba(16, 185, 129, 0.5)");
        gradientPos.addColorStop(1, "rgba(16, 185, 129, 0.0)");

        new Chart(context, {
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
    }

    // Map
    const mapEl = document.getElementById("map");
    if (mapEl) {
         // Cleanup simple check
         if (mapEl._leaflet_id) {
            mapEl._leaflet_id = null;
         }

        const map = L.map("map", {
            zoomControl: false,
            scrollWheelZoom: false,
        }).setView([-2.5, 118], 5);

        L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            { attribution: "&copy; OpenStreetMap &copy; CARTO" }
        ).addTo(map);

        L.control.zoom({ position: "bottomright" }).addTo(map);

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
            .addTo(map)
            .bindPopup(`<b>Region Activity</b><br>Sentiment: ${p.val}`);
        });

        // Trigger resize to ensure map renders correctly after dynamic load
        setTimeout(() => { map.invalidateSize(); }, 200);
    }

    // Live Stream Sim
    const streamContainer = document.getElementById("streamList");
    if (streamContainer && !streamContainer.hasAttribute("data-sim-active")) {
        streamContainer.setAttribute("data-sim-active", "true");
        // Clear previous interval if any? simplified for demo
        setInterval(() => {
            if(!document.getElementById("streamList")) return;
            const item = document.createElement("div");
            item.className = "stream-item";
            item.innerHTML = `
                <div class="stream-header">
                <span><i class="fa-solid fa-user"></i> @Kader${Math.floor(Math.random() * 900)}</span>
                <span>Just now</span>
                </div>
                Laporan dari lapangan: Antusiasme warga semakin tinggi! #GolkarSolid
            `;
            streamContainer.prepend(item);
            if (streamContainer.children.length > 5) streamContainer.lastElementChild.remove();
        }, 3000);
    }
}

function initWebGISScripts() {
    const mapEl = document.getElementById("webgis-map");
    if (mapEl) {
        if (mapEl._leaflet_id) mapEl._leaflet_id = null; // Reset if needed

        const map = L.map("webgis-map", {
            zoomControl: false, // Custom controls in UI
             scrollWheelZoom: false,
        }).setView([-7.88, 110.45], 10); // DIY Center

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

        // Data Points (DI Yogyakarta Regions)
        const clusters = [
            { name: "Kota Yogyakarta", loc: [-7.8014, 110.3647], count: "320K", color: "#FCD34D", size: 2500 }, 
            { name: "Sleman", loc: [-7.7125, 110.3541], count: "850K", color: "#B45309", size: 4000 }, // High density
            { name: "Bantul", loc: [-7.9230, 110.3235], count: "740K", color: "#F59E0B", size: 3500 }, 
            { name: "Gunung Kidul", loc: [-7.9946, 110.6074], count: "610K", color: "#F59E0B", size: 3200 },
            { name: "Kulon Progo", loc: [-7.8282, 110.1601], count: "265K", color: "#FCD34D", size: 2000 }
        ];

        const markers = [];

        clusters.forEach(c => {
            // Circle config
            const circle = L.circle(c.loc, {
                color: c.color,
                fillColor: c.color,
                fillOpacity: 1,
                radius: c.size, // Using dynamic size for better visualization
                weight: 2,
                className: 'pulse-marker'
            }).addTo(map);

            circle.bindTooltip(
                `<div style="text-align:center; font-weight:bold; color:white; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">${c.count}</div>`, 
                { permanent: true, direction: "center", className: "circle-label" }
            );
            
            circle.bindPopup(`<b>${c.name}</b><br>Total Pemilih: ${c.count}`);
            markers.push(circle);
        });
        
        // Ensure map renders properly
        setTimeout(() => map.invalidateSize(), 100);
    }
}

function initKTAScripts() {
    const form = document.getElementById("kta-form");
    if (!form) return;

    // Helper to render KTA
    const renderKTA = (nama, nik, alamat, photoURL) => {
        const ktaId = nik ? "34.04." + nik.substring(0, 6) : "34.04.XXXXXX";
        const previewArea = document.getElementById("kta-preview-area");
        
        // Inline Styles
        const styles = `
            <style>
                .kta-card {
                    width: 400px;
                    height: 250px;
                    background: linear-gradient(135deg, #FFD700 0%, #FDB931 100%);
                    border-radius: 15px;
                    padding: 20px;
                    position: relative;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    color: #000;
                    font-family: 'Arial', sans-serif;
                    text-align: left;
                }
                .kta-bg-pattern {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    opacity: 0.1;
                    background-image: radial-gradient(#000 1px, transparent 1px);
                    background-size: 10px 10px;
                    z-index: 0;
                }
                .kta-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #000;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                    z-index: 1;
                    position: relative;
                }
                .kta-logo {
                    width: 50px; height: 50px;
                    background: #fff;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 800; font-size: 0.8rem;
                    border: 2px solid #000;
                    overflow: hidden;
                }
                .kta-title { text-align: right; }
                .kta-title h3 { font-weight: 900; font-size: 1.2rem; margin: 0; text-transform: uppercase; letter-spacing: 1px; color: #000; }
                .kta-title span { font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; color: #000; }
                .kta-body { display: flex; gap: 15px; z-index: 1; flex: 1; position: relative; }
                .kta-photo-area {
                    width: 100px; height: 120px;
                    background: #fff; // removed white
                    border: 1px solid #000;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.7rem; color: #aaa;
                    overflow: hidden;
                }
                .kta-photo-area img { width: 100%; height: 100%; object-fit: cover; }
                .kta-details { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 5px; }
                .kta-field { display: flex; flex-direction: column; }
                .kta-label { font-size: 0.55rem; font-weight: 700; color: #444; text-transform: uppercase; }
                .kta-value { font-size: 0.9rem; font-weight: 800; text-transform: uppercase; color: #000; }
            </style>
        `;

        previewArea.innerHTML = styles + `
            <div class="kta-card">
                <div class="kta-bg-pattern"></div>
                <div class="kta-header-row">
                    <div class="kta-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Partai_Golkar_Logo.png/600px-Partai_Golkar_Logo.png" alt="Golkar" style="width:80%;" onerror="this.src='https://via.placeholder.com/50?text=GOLKAR'">
                    </div>
                    <div class="kta-title">
                        <h3>PARTAI GOLKAR</h3>
                        <span>KARTU TANDA ANGGOTA</span>
                    </div>
                </div>
                <div class="kta-body">
                    <div class="kta-photo-area">
                        ${photoURL ? `<img src="${photoURL}">` : '<i class="fa-solid fa-user" style="font-size: 2rem; color: #ddd;"></i>'}
                    </div>
                    <div class="kta-details">
                        <div class="kta-field">
                            <span class="kta-label">NAMA</span>
                            <span class="kta-value" style="font-size: 1.1rem; color: #000;">${nama || "NAMA ANGGOTA"}</span>
                        </div>
                         <div class="kta-field">
                            <span class="kta-label">NOMOR ANGGOTA</span>
                            <span class="kta-value">${ktaId}</span>
                        </div>
                        <div class="kta-field">
                            <span class="kta-label">ALAMAT</span>
                            <span class="kta-value" style="font-size: 0.8rem; line-height: 1.2;">${alamat || "ALAMAT LENGKAP"}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <button class="btn-icon" style="width: auto; padding: 10px 20px; font-weight: bold; color: #166534; border-color: #166534;" onclick="alert('KTA Berhasil Disimpan!')">
                    <i class="fa-solid fa-download" style="margin-right: 8px;"></i> Simpan KTA
                </button>
            </div>
        `;
    };

    // Initial Render
    renderKTA("", "", "", "");

    // Real-time updates (Optional but better UX)
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach(input => {
        input.addEventListener("input", () => {
             const nama = document.getElementById("input-nama").value;
             const nik = document.getElementById("input-nik").value;
             const alamat = document.getElementById("input-alamat").value;
             const fotoInput = document.getElementById("input-foto");
             
             let photoURL = "";
             if (fotoInput.files && fotoInput.files[0]) {
                  photoURL = URL.createObjectURL(fotoInput.files[0]);
             }
             renderKTA(nama, nik, alamat, photoURL);
        });
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("KTA Generated and Ready to Download!");
    });
}

// Global Tab Switching Logic for Check-in Module
window.switchTab = function(tabId) {
    // Remove active class from buttons
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    // Add active class to clicked button
    const activeBtn = Array.from(document.querySelectorAll('.tab-item')).find(t => t.onclick.toString().includes(tabId));
    if(activeBtn) activeBtn.classList.add('active');

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    // Show target tab content
    const target = document.getElementById(tabId);
    if (target) {
        target.classList.add('active');
    }
};


function initSocialMediaScripts() {
    console.log("Initializing Social Media Scripts...");
    
    // Engagement Chart
    const engagementEl = document.getElementById("engagementChart");
    if (engagementEl) {
        new Chart(engagementEl.getContext("2d"), {
            type: "line",
            data: {
                labels: ["1 Feb", "2 Feb", "3 Feb", "4 Feb", "5 Feb"],
                datasets: [
                    {
                        label: "Likes",
                        data: [250, 310, 280, 420, 380],
                        borderColor: "#3B82F6",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: "Comments",
                        data: [45, 58, 52, 65, 55],
                        borderColor: "#10B981",
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: "Shares",
                        data: [30, 42, 38, 55, 48],
                        borderColor: "#8B5CF6",
                        borderWidth: 2,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                },
                scales: {
                    y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Reach Chart
    const reachEl = document.getElementById("reachChart");
    if (reachEl) {
        new Chart(reachEl.getContext("2d"), {
            type: "bar",
            data: {
                labels: ["1 Feb", "2 Feb", "3 Feb", "4 Feb", "5 Feb"],
                datasets: [{
                    label: "Reach",
                    data: [5400, 6800, 6100, 8900, 7500],
                    backgroundColor: "#FFD700",
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}
