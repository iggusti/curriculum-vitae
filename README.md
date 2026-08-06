# Curriculum Vitae

Personal CV / portfolio website — https://iggusti.github.io/curriculum-vitae/

## Fitur

- Profil, keahlian, pengalaman, dan portofolio dalam satu halaman (single-page)
- Animasi scroll menggunakan [AOS](https://github.com/michalsnik/aos)
- Navigasi smooth-scroll
- Portfolio dengan tab kategori (Web Development & Photography)
- Halaman portfolio terpisah untuk setiap proyek (`portfolio/`)
- PWA-ready dengan `manifest.json`
- Responsive (Bootstrap 4)

## Tech Stack

- HTML5, CSS3, JavaScript
- Bootstrap 4 + Now UI Kit
- jQuery 3.2.1 + Popper.js
- Font Awesome (kit CDN)
- Google Fonts (Montserrat)
- GitHub Pages (Jekyll)

## Struktur

```
.
├── index.html              # Halaman utama CV
├── manifest.json           # Manifest PWA
├── css/                    # Stylesheet (bootstrap, main, animasi per proyek)
├── js/                     # jQuery, Bootstrap, AOS, Now UI Kit
├── scripts/main.js         # Inisialisasi AOS & smooth-scroll
├── images/                 # Gambar (mayoritas .webp)
├── portfolio/              # Halaman detail portofolio
└── pdf/iggusti cv.pdf      # CV versi PDF
```

## Menjalankan Secara Lokal

Karena proyek ini statis, cukup buka `index.html` langsung di browser:

```
start index.html
```

atau gunakan server lokal sederhana:

```
python -m http.server 8000
```

lalu buka `http://localhost:8000`.

## Deployment

Site ini di-deploy otomatis ke GitHub Pages dari branch `main`. Setiap `git push` akan langsung dipublikasikan di:

```
https://iggusti.github.io/curriculum-vitae/
```

## Menambah Portofolio Baru

1. Tambahkan file di `portfolio/` mengikuti pola halaman yang sudah ada (mis. `portfolio/clock.html`)
2. Tambahkan kartu portofolio di section `#portfolio` pada `index.html`
3. Sertakan thumbnail di `images/` (format `.webp`)

## Lisensi

© iggusti's page. All rights reserved.
