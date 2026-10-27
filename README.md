# Curriculum Vitae

Personal CV / portfolio website — https://iggusti.github.io/curriculum-vitae/

## Fitur

- Profil, keahlian, pengalaman, dan portofolio dalam satu halaman (single-page)
- Animasi scroll menggunakan [AOS](https://github.com/michalsnik/aos)
- Navigasi smooth-scroll
- Portfolio dengan tab kategori (Web Development & Photography)
- Halaman portfolio terpisah untuk setiap proyek (`portfolio/`)
- PWA-ready: `manifest.json` + service worker (`sw.js`) untuk akses offline
- Responsive (Bootstrap 4)

## Tech Stack

- HTML5, CSS3, JavaScript (tanpa bundler, file statis)
- Bootstrap 4 + Now UI Kit
- jQuery 3.7.1 + Popper.js
- Font Awesome 6 (self-hosted)
- Montserrat (self-hosted)
- GitHub Pages (static, `.nojekyll`)

## Struktur

```
.
├── index.html                 # Halaman utama CV
├── 404.html                   # Halaman 404
├── manifest.json              # Manifest PWA
├── sw.js                      # Service worker (precache + offline)
├── robots.txt                 # Aturan crawler
├── sitemap.xml                # Peta situs
├── assets/
│   ├── css/
│   │   ├── fonts.css          # @font-face Montserrat
│   │   ├── main.css           # Stylesheet utama
│   │   └── pages/             # CSS khusus tiap halaman portfolio
│   ├── js/
│   │   ├── main.js            # AOS, smooth-scroll, umur otomatis, service worker
│   │   └── pages/             # Skrip khusus tiap halaman portfolio
│   ├── fonts/                 # Montserrat + Font Awesome (woff2)
│   ├── images/
│   │   ├── icons/             # Favicon dan ikon PWA
│   │   ├── logos/             # Logo teknologi, perusahaan, dan institusi
│   │   ├── photos/            # Foto (hero background, galeri photography)
│   │   ├── profile/           # Foto profil
│   │   ├── projects/          # Thumbnail dan aset proyek
│   │   └── social/            # Gambar Open Graph / social preview
│   └── vendor/                # Bootstrap, jQuery, Popper, AOS, Now UI Kit, Font Awesome
├── portfolio/                 # Halaman detail portofolio
├── pdf/iggusti-cv.pdf         # CV versi PDF
└── tools/check-links.js       # Pemeriksa referensi lokal (dijalankan CI)
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

## Pemeriksaan

Validasi HTML dan referensi lokal (sama seperti yang dijalankan CI):

```
npx --yes html-validate@11 "*.html" "portfolio/*.html"
node tools/check-links.js
```

## Deployment

Site ini di-deploy otomatis ke GitHub Pages dari branch `main`. Setiap `git push` akan langsung dipublikasikan di:

```
https://iggusti.github.io/curriculum-vitae/
```

## Menambah Portofolio Baru

1. Tambahkan halaman di `portfolio/` mengikuti pola halaman yang sudah ada (mis. `portfolio/clock.html`)
2. Tambahkan CSS khusus di `assets/css/pages/` (opsional) dan skrip di `assets/js/pages/` (opsional)
3. Tambahkan kartu portofolio di section `#portfolio` pada `index.html`
4. Sertakan thumbnail di `assets/images/projects/` (format `.webp`)
5. Daftarkan URL halaman baru di `sitemap.xml`
6. Naikkan versi query `?ver=` pada aset yang berubah dan `CACHE` di `sw.js`

## Lisensi

© iggusti's page. All rights reserved.
