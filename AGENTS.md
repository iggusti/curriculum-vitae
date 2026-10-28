# AGENTS.md

## Overview

CV/portfolio statis satu halaman (`index.html`) dengan halaman portfolio terpisah di `portfolio/`. Di-deploy otomatis ke GitHub Pages dari branch `main` (setiap push langsung dipublikasikan).

## Build / Test / Lint

TIDAK ada. Tidak ada package.json, bundler, atau test runner. File statis langsung berjalan di browser.

## Struktur

- `index.html`, `404.html` — halaman utama CV dan halaman 404
- `portfolio/*.html` — halaman detail proyek (clock, keyboard, love-cube, dll.)
- `assets/css/` — `fonts.css` + `main.css`; CSS per halaman ada di `assets/css/pages/`
- `assets/js/` — `main.js`; skrip per halaman ada di `assets/js/pages/`
- `assets/vendor/` — library pihak ketiga (Bootstrap, jQuery, Popper, AOS, Now UI Kit, Font Awesome) — jangan diedit
- `assets/fonts/`, `assets/images/` — aset statis; gambar dikelompokkan per fungsi (`icons/`, `logos/`, `photos/`, `profile/`, `projects/`, `social/`)
- `sw.js`, `manifest.json` — service worker dan manifest PWA; `sw.js` harus tetap di root
- `tools/check-links.js` — pemeriksa referensi lokal yang dijalankan CI

## Konvensi Kode

- Bootstrap 4 + Now UI Kit + jQuery + AOS untuk animasi
- Cache-busting: semua asset lokal memakai query `?ver=1.6.1` — naikkan versi saat file asset berubah, termasuk `CACHE` di `sw.js`
- Path aset selalu relatif terhadap halaman (`./assets/...` atau `../assets/...`), bukan absolut
- Alt text gambar mengikuti pola `gambar_<nama_file>` (berbahasa Indonesia)
- Navigasi section memakai class `smooth-scroll` + id anchor (`#about`, `#skill`, dll.)
- Animasi scroll memakai atribut `data-aos`
- Umur di section About dihitung otomatis dari tanggal lahir (22 Okt 1997) — jangan diubah manual

## Aturan Penting

- JANGAN menghapus atau memindahkan file gambar/JS tanpa menjalankan `node tools/check-links.js` setelahnya
- `portfolio/love-cube.html` sengaja memakai PNG (bukan webp) — jangan diganti
- Jangan menambah komentar dalam kode
- Commit message singkat mengikuti gaya sejarah repo (prefix `fix:`, `perf:`, `docs:`, dst.)
