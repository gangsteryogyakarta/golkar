Product Requirements Document (PRD)
Project Name: Golkar Digital Command Center (GDCC) - MVP Phase

1. Executive Summary
   Platform berbasis web untuk memantau percakapan publik terkait Partai Golkar di media sosial utama dan menyediakan asisten cerdas berbasis AI untuk pembuatan konten strategis. Tujuan utamanya adalah memberikan situational awareness (kesadaran situasi) kepada tim media partai.
2. Problem Statement
   • Blind Spot: Tim media partai sulit melacak sentimen negatif secara manual di tengah jutaan komentar.
   • Slow Response: Reaksi terhadap isu viral sering terlambat karena tidak ada sistem peringatan dini.
   • Content Guesswork: Pembuatan konten seringkali berdasarkan asumsi, bukan data tren aktual.
3. Target User
   • Admin/Operator: Tim Media Partai Golkar (Pusat/Daerah).
   • Decision Maker: Petinggi Partai (melihat ringkasan eksekutif).
4. Fitur Utama (Scope MVP)
   Agar realistis dikerjakan sendiri, kita batasi fitur menjadi:
   A. Modul Monitoring (The Ears)
   • Platform Fokus: Prioritas TikTok & Twitter (X). (Instagram/FB lebih sulit di-scrape, jadikan fase 2).
   • Keyword Tracking: Input kata kunci (misal: "Golkar", "Airlangga", "Isu X").
   • Sentiment Analysis Dashboard: Visualisasi grafik Pie/Bar Chart (Positif, Netral, Negatif) dalam 24 jam terakhir.
   • Stream View: Daftar mention terbaru yang bisa difilter berdasarkan sentimen negatif (untuk keperluan counter).
   B. Modul Early Warning (The Alarm)
   • Threshold Alert: Jika sentimen negatif pada keyword tertentu melonjak > 20% dalam 1 jam → Kirim notifikasi (Email/Telegram Bot).
   • Top Issues: Menampilkan 5 topik/hashtag yang paling sering muncul bersamaan dengan keyword partai.
   C. Modul Content Optimizer (The Brain)
   • AI Content Generator: Form input topik isu → Output berupa rekomendasi Caption, Hashtag, dan Konsep Video Pendek (Script).
   • Trend Insight (Simplified): Menampilkan daftar topik yang sedang trending di Twitter (via API) sebagai referensi id.
5. Spesifikasi Teknis
   Mengingat kebutuhan dalam pengembangan cepat (Rapid Application Development).
   • Backend: Laravel (PHP). Ini pilihan terbaik untuk kecepatan, keamanan, dan kemudahan manajemen database.
   • Frontend/Admin: FilamentPHP (berbasis Laravel).
   o Kenapa? Kita tidak perlu membuat UI admin, tabel, dan grafik dari nol. Filament sudah menyediakan komponen dashboard yang sangat bagus dan cepat di-setup.
   • Database: MySQL.
   • AI Engine (Sentiment & Rekomendasi): OpenAI API (GPT-4o-mini) atau Gemini Flash.
   o Strategi: Jangan buat model ML sendiri. Kirim teks komentar ke API LLM dengan prompt: "Analisis sentimen teks ini: [teks]. Output: Positif/Negatif.". Ini jauh lebih akurat dan mudah daripada melatih model Python sendiri.
   • Data Collection (Scraping): Apify atau RapidAPI.
   o Strategi: Jangan coding bot scraper sendiri (buang waktu maintenance). Sewa "aktor" di Apify untuk scrape TikTok/Twitter, lalu tarik datanya via API ke Laravel Kita.
6. Alur Kerja Sistem (Data Flow)
7. Ingest: Scheduler (Cron Job Laravel) berjalan tiap 30 menit → Panggil API Scraper (Apify) untuk keyword "Golkar".
8. Process: Data mentah masuk → Dikirim ke API OpenAI/Gemini untuk pelabelan sentimen (Positif/Negatif) dan ringkasan topik.
9. Store: Simpan hasil yang sudah bersih ke Database MySQL.
10. Display: Filament Dashboard menampilkan grafik tren dan daftar komentar.
11. Action: User melihat isu negatif → Masuk menu "Content Optimizer" → Minta AI buatkan strategi kontra-narasi.

12. Kebutuhan Sumber Daya (Cost Estimation)
    Kita perlu transparan ke klien bahwa ada biaya operasional pihak ketiga:
13. Server/Hosting: VPS (Contabo/DigitalOcean) - ~$10-20/bulan.
14. Scraping API (Apify/RapidAPI): ~$50-100/bulan (tergantung volume data).
15. AI Token (OpenAI/Gemini): ~$20-50/bulan.
    Konsep desainnya adalah "Command Center": Futuristik, bersih, data-driven, dan memberikan rasa kontrol penuh kepada pengguna.

---

1. Visual Identity (Style Guide)
   Karena ini untuk Partai Golkar, kita mainkan psikologi warna identitas mereka namun dengan sentuhan teknologi modern.
   • Tema Utama: Dark Mode (Sangat disarankan untuk dashboard monitoring karena terlihat lebih canggih/high-tech dan mata tidak cepat lelah).
   • Palet Warna:
   o Background: Deep Charcoal (#121212) atau Dark Blue-Grey (#0f172a).
   o Primary Accent (Golkar): Golkar Yellow (#FFE000 atau #FCCF00). Gunakan untuk tombol utama, angka penting, dan highlight aktif.
   o Sentiment Colors:
    Positif: Neon Green (#10B981)
    Negatif: Alert Red (#EF4444)
    Netral: Muted Grey (#6B7280)
   • Typography: Gunakan font sans-serif yang tegas dan modern. Contoh: Inter atau Roboto.
   • Komponen UI: Glassmorphism tipis (transparan buram) pada kartu dashboard untuk kesan modern.

---

2. User Flow (Alur Kerja Pengguna)
   Alur ini menceritakan bagaimana admin menangani sebuah krisis (isu negatif) menjadi peluang konten.
   Scenario: Muncul isu negatif tentang "Kader Golkar di daerah X".
1. Detection (Monitoring): Sistem menangkap lonjakan sentimen negatif > 20% pada keyword "Golkar Daerah X".
1. Notification (Alert): Admin menerima notifikasi "Early Warning: Negative Spike Detected" di Dashboard & WA.
1. Analysis (Drill Down): Admin mengklik notifikasi → Masuk ke halaman Issue Detail. Admin melihat grafik sentimen, word cloud (kata yang sering muncul: "korupsi", "jalan rusak", dll), dan sumber akun provokator utama.
1. Strategizing (AI Action): Admin klik tombol "Generate Counter Strategy".
1. Execution (Content Creation): AI menampilkan saran:
   o Angle: "Tunjukkan bukti kerja nyata perbaikan jalan".
   o Format: Video TikTok 15 detik.
   o Script: Dibuatkan otomatis oleh AI.
1. Distribution: Admin menyalin script dan mengirimkannya ke tim kreatif lapangan.

---

3. Mockup Description (Halaman Kunci)
   Berikut adalah deskripsi detail untuk 3 halaman utama yang wajib Anda buat mockup-nya (bisa pakai Figma, Canva, atau langsung di FilamentPHP).
   Halaman 1: "The Dashboard" (Situation Room)
   Ini adalah halaman pertama yang dilihat klien. Harus terlihat "sibuk" tapi rapi.
   • Header: Logo Golkar & Nama App (misal: "G-Radar"). Ada ticker text berjalan berisi Trending Topic terkini.
   • Top Stats (4 Kartu Besar):
1. Total Mention (24h): Angka Besar (misal: 15.4K) dengan indikator panah naik/turun.
1. Sentiment Score: Skala 0-100 (misal: 68 - Kondisi Aman). Warna teks berubah sesuai skor.
1. Potential Reach: Estimasi audiens (misal: 2.5 Juta).
1. Viral Probability: Prediksi AI (misal: "High - Isu Panas").
   • Main Chart (Tengah): Grafik garis real-time. Sumbu X adalah Jam, Sumbu Y adalah Volume. Ada dua garis: Garis Hijau (Positif) dan Merah (Negatif).
   • Live Stream (Sisi Kanan): Daftar card kecil yang terus update berisi tweet/komentar terbaru. Jika sentimen negatif, beri border merah tipis.
   • Peta Indonesia (Bawah): Heatmap. Warna kuning pekat di provinsi yang sedang banyak membicarakan Golkar.

Halaman 2: "Early Warning & Issue Detail"
Halaman ini muncul ketika admin mengklik sebuah isu spesifik.
• Judul Isu: "Isu: Harga Pupuk Mahal di Jatim" (Didapat dari clustering AI).
• Sentiment Breakdown: Donut Chart (60% Negatif, 10% Positif).
• Top Words (Word Cloud): Kata-kata kunci seperti "Mahal", "Petani", "Jerit", "Pemerintah".
• Influencer Watch: Tabel berisi akun-akun besar yang memposting isu ini.
o Kolom: Nama Akun | Follower | Sentimen | Link Post.

Halaman 3: "AI Content Optimizer" (Fitur Viral)
Ini adalah fitur "jualan" utama Anda.
• Input Section (Kiri):
o Dropdown: Pilih Isu (misal: "Harga Pupuk").
o Target Audience: (Pilihan: Gen Z / Emak-emak / Umum).
o Tone: (Pilihan: Formal / Santai / Humoris / Tegas).
o Tombol Besar: "Generate Content Strategy" (Warna Kuning).
• Output Section (Kanan - Tampil setelah loading):
o Rekomendasi Format: "Video TikTok (Vertical), Durasi 20 detik."
o Sound Trending: Menampilkan rekomendasi lagu yang sedang viral di TikTok (misal: "DJ Ojo Dibandingke Remix").
o AI Script Generator:
Hook (0-3 detik): (Visual: Petani sedang sedih) "Siapa bilang suara petani gak didengar? Golkar turun tangan!"
Isi (3-15 detik): (Visual: Kader Golkar memberikan bantuan) "Langsung gercep, hari ini distribusi pupuk subsidi diamankan..."
CTA (Call to Action): "Komen di bawah daerah mana lagi yang butuh bantuan!"
o Hashtag Generator: #GolkarPeduli #PetaniSejahtera #JatimBangkit (AI memilih hashtag yang relevan dan viral).
