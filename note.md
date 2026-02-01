Berikut adalah analisa lengkap project Golkar Digital Command Center (GDCC) beserta tantangan pengembangannya.

1. Analisa Project
   Tujuan: Membangun "War Room" digital untuk memantau sentimen publik terhadap Partai Golkar di TikTok & X, mendeteksi krisis lebih awal, dan merumuskan strategi konten menggunakan AI.

Status Saat Ini:

Blueprint (PRD): Sangat jelas dan terstruktur. Menggunakan stack modern (Laravel 11, FilamentPHP, OpenAI/Gemini).
Mockup: Sudah tersedia mockup Frontend statis (HTML/CSS/JS) yang sangat "polite" dan premium dengan tema Command Center. Visualisasinya sudah ready-to-code.
Arsitektur Sistem:

Input: Data media sosial (via Apify/RapidAPI).
Process: Laravel Scheduler (cron) mengambil data -> Queue Worker mengirim ke AI (Sentiment Analysis) -> Simpan di MySQL.
Output: Dashboard Visual (Filament/Blade) untuk tim media. 2. Tantangan Pengembangan (The Hard Truth)
Berikut adalah 5 tantangan teknis & operasional terbesar dalam merealisasikan project ini:

A. Stabilitas Data Source (Scraping is Fragile)
Masalah: Platform seperti TikTok & X sangat agresif memblokir scraper. Bot yang jalan hari ini bisa mati besok jika API Key dibanned atau struktur HTML target berubah.
Risiko: Dashboard menjadi "buta" (kosong) tiba-tiba.
Solusi: Jangan bergantung pada satu provider. Siapkan fallback mechanism (misal: utama pakai Apify, cadangan pakai RapidAPI).
B. Biaya & Latency AI (Cost Management)
Masalah: Jika ada 10,000 komentar masuk per hari dan semua dikirim ke GPT/Gemini API satu per satu, biayanya akan bengkak dan antrian proses (queue) akan sangat panjang (bottleneck).
Risiko: Tagihan API membengkak jutaan rupiah dan data di dashboard delay (tidak realtime).
Solusi Setup:
Filtering Awal: Gunakan keyword blocking sederhana di PHP sebelum kirim ke AI (buang spam/iklan obat).
Batching: Kirim data ke AI per 50-100 komentar sekaligus, bukan satu-satu.
Model Selection: Gunakan model hemat (GPT-4o-mini atau Gemini Flash) untuk klasifikasi sentimen massal, baru gunakan GPT-4o untuk "Content Strategy" yang butuh kreatifitas tinggi.
C. Integrasi Frontend (HTML vs FilamentPHP)
Masalah: Mockup yang ada adalah HTML custom dengan desain sangat spesifik (glassmorphism, layout grid khusus). FilamentPHP sangat bagus, tapi basisnya adalah komponen standar (Tables/Widgets) yang kaku.
Tantangan: Memaksa Filament untuk tampil persis 100% seperti mockup HTML akan sulit dan butuh banyak custom view.
Saran:
Opsi 1 (Cepat): Gunakan layout bawaan Filament dan sesuaikan CSS-nya sedikit (mungkin 80% mirip mockup)..
Opsi 2 (Sesuai Mockup): Jangan pakai Filament panel untuk dashboard utama. Buat halaman Blade biasa (Laravel View) yang meng-copy paste HTML mockup tersebut, lalu inject datanya dari Controller. Filament hanya dipakai untuk admin panel (input user, setting API key).
D. Penanganan "False Positive" (Konteks Politik)
Masalah: AI mungkin salah baca. Kalimat "Banjir kuning dimana-mana" bisa berarti positif (kampanye sukses) atau negatif (bencana banjir beneran).
Risiko: Early warning berbunyi untuk hal yang salah, membuat admin panik tanpa alasan.
Solusi: Fine-tuning prompt sistem AI dengan kamus istilah politik lokal.
E. Infrastruktur Real-time (Queue & WebSocket)
Masalah: User mengharapkan grafik bergerak sendiri (Real-time). PHP secara default tidak real-time.
Solusi: Wajib menggunakan Redis untuk manajemen antrian job (supaya user tidak loading lama saat generate strategi) dan pertimbangkan Laravel Reverb/Pusher jika ingin notifikasi dan grafik update tanpa refresh halaman.
Kesimpulan: Secara visual dan konsep, aplikasi ini High Value & Premium. Tantangan utamanya bukan di coding tampilannya, melainkan di "Pipa Data" (backend pipeline) agar data terus mengalir lancar dan murah.

Apakah Anda ingin saya mulai mengerjakan salah satu bagian (misal: Integrasi Mockup HTML ke Laravel Blade)?
