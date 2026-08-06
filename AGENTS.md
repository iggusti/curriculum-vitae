# AGENTS.md

## Overview

CV/portfolio statis satu halaman (`index.html`) dengan halaman portfolio terpisah di `portfolio/`. Di-deploy otomatis ke GitHub Pages dari branch `main` (setiap push langsung dipublikasikan).

## Build / Test / Lint

TIDAK ada. Tidak ada package.json, bundler, atau test runner. File statis langsung berjalan di browser.

## Struktur

- `index.html` — halaman utama CV
- `portfolio/*.html` — halaman detail proyek (clock, keyboard, love-cube, dll.)
- `css/`, `js/`, `scripts/main.js` — aset; `js/core/` dan `js/plugins/` adalah library pihak ketiga (jangan diedit)
- `images/` — mayoritas `.webp`; `manifest.json` untuk PWA

## Konvensi Kode

- Bootstrap 4 + Now UI Kit + jQuery + AOS untuk animasi
- Cache-busting: semua asset lokal memakai query `?ver=1.1.0` — naikkan versi saat file asset berubah
- Alt text gambar mengikuti pola `gambar_<nama_file>` (berbahasa Indonesia)
- Navigasi section memakai class `smooth-scroll` + id anchor (`#about`, `#skill`, dll.)
- Animasi scroll memakai atribut `data-aos`
- Umur di section About dihitung otomatis dari tanggal lahir (22 Okt 1997) — jangan diubah manual

## Aturan Penting

- JANGAN menghapus file gambar/JS tanpa cek referensi terlebih dahulu (grep di `*.html`, `*.css`, `*.js`)
- `portfolio/love-cube.html` sengaja memakai PNG (bukan webp) — jangan diganti
- Jangan menambah komentar dalam kode
- Commit message singkat mengikuti gaya sejarah repo (prefix `fix:`, `perf:`, `docs:`, dst.)
