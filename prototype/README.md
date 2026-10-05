# TaxAI Landing Page — Enterprise Redesign Prototype

> **Status:** Prototype untuk review desain. Bukan untuk production.
> **Cara membuka:** buka `index.html` langsung di browser (butuh internet untuk Tailwind CDN, Google Fonts, dan Lucide icons), atau `npx serve landing/prototype`.

Prototype ini menjabarkan seluruh redesign landing page TaxAI menjadi **enterprise-grade B2B SaaS** dengan pola *"Trust & Authority + Conversion"*: Hero (kredibilitas) → Proof (logo + stats) → Solution → CTA path yang jelas. Implementasi React dilakukan **setelah prototype disetujui**.

---

## 1. Keputusan desain

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Mode visual | **Light hybrid** (light surfaces + hero/CTA navy gelap) | Standar SaaS B2B fintech (Stripe/Ramp/Mercury); konsisten dengan brand biru existing |
| Bahasa | **EN dulu, markup RTL-ready** | Iterasi cepat; AR menyusul saat implementasi via i18next existing |
| Tipografi | **Plus Jakarta Sans** 400/600/700/800 | Karakter enterprise modern; mengganti Inter yang saat ini *dideklarasikan tapi tidak pernah dimuat* |
| Warna | Navy `#0F172A` + trust blue `#2563EB` | Mengganti biru terang saturasi-penuh `hsl(210 100% 50%)` yang dipakai merata |
| Visual hero | Mockup aplikasi dibangun murni CSS | Mengganti tsparticles; B2B enterprise selalu menampilkan produk |
| Anti-pattern yang dibuang | Glassmorphism masif, karosel auto-rotate, ungu/pink gradient, emoji icon | Tanda khas output generator AI (Lovable origin) |

---

## 2. Design tokens

### Warna

| Token | Hex | HSL (untuk shadcn `index.css`) | Penggunaan |
|---|---|---|---|
| `navy-950` | `#0A0F1E` | `222 47% 8%` | Background hero/CTA/footer |
| `navy-900` | `#0F172A` | `222 47% 11%` | Teks heading, tombol sekunder, kartu gelap |
| `navy-800` | `#1E293B` | `217 33% 17%` | Floating cards, permukaan gelap sekunder |
| `brand-600` | `#2563EB` | `221 83% 53%` | **CTA primer** (satu-satunya pemakaian warna kuat) |
| `brand-700` | `#1D4ED8` | `224 76% 48%` | Hover state CTA |
| `brand-400` | `#60A5FA` | `213 94% 68%` | Aksen di atas navy (link, gradient text) |
| `surface` | `#F8FAFC` | `210 40% 98%` | Background section selang-seling |
| `--foreground` | `#020617` | `222 84% 5%` | Body text |
| `--muted-foreground` | `#475569` | `215 19% 35%` | Teks sekunder (slate-600, kontras 7.5:1) |
| `--border` | `#E2E8F0` | `214 32% 91%` | Border kartu 1px |
| `success-700` | `#047857` | `161 94% 24%` | Badge/bullet positif |

**Aturan restraint:** brand-600 hanya untuk CTA primer + aksen eyebrow label + highlight satu elemen per visual. Sisanya navy/slate. Tidak ada gradient ungu/pink.

### Tipografi

| Role | Weight | Ukuran | Line-height |
|---|---|---|---|
| Display (H1) | 800 | 36→60px (`text-4xl sm:text-5xl lg:text-6xl`) | 1.08 |
| Section (H2) | 800 | 30→36px (`text-3xl sm:text-4xl`) | tight |
| Card (H3) | 800 | 18–20px | tight |
| Body | 400 | 15–18px | 1.6 |
| Eyebrow label | 700, uppercase | 12px, tracking `0.16em` | — |
| Meta/microcopy | 500 | 11–12px | — |

Import: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap` — **wajib** ditambahkan ke `index.html` produksi (bug: Inter dikonfigurasi tapi tidak pernah dimuat).

### Spacing, radius, shadow

- Section padding: `py-24` (96px), container `max-w-7xl px-6`.
- Radius: kartu `rounded-2xl` (16px), tombol `rounded-lg` (8px).
- Shadow: `card` (resting), `lift` (hover), `hero` (mockup), `float` (floating chips). Definisi ada di `tailwind.config` inline prototype.
- Hover kartu: `-translate-y-0.5` + shadow naik, transisi 300ms.

---

## 3. Struktur section → mapping implementasi React

| # | Section prototype | File React target (baru/diubah) | Catatan |
|---|---|---|---|
| 1 | Navbar | `components/Navbar.tsx` (rewrite) | Hapus glass-transparan semua-warna; state solid saat scroll; CTA: Login ghost + Get started solid |
| 2 | Hero | `components/Hero.tsx` (rewrite) | **Hapus tsparticles** (`react-tsparticles`, `tsparticles-slim`, `lib/particles-config.ts` dapat dibuang dari deps); mockup chat CSS inline atau `components/hero/AppMockup.tsx` |
| 3 | Logo wall | `components/LogoWall.tsx` (baru) | Ganti text-wordmark dengan PNG asli dari `public/lovable-uploads/` (grayscale via `grayscale opacity-60`) |
| 4 | Stats bar | `components/StatsBar.tsx` (baru) | Angka `[SAMPLE]` — konfirmasi angka riil sebelum rilis |
| 5 | Features bento | `components/FeaturesFixed.tsx` (rewrite, ganti nama → `Features.tsx`) | 8 fitur → 6; hapus karosel auto-rotate; mini-visual per kartu |
| 6 | ATTO demo | `components/AIChat.tsx` (rewrite) | Ganti GIF `attopreview-*.gif` dengan conversation card; CTA tetap ke chat eksternal |
| 7 | How it works | `components/Process.tsx` (rewrite) | 4 langkah + connector line dashed |
| 8 | Pricing | `components/Pricing.tsx` (rewrite) | 4 kartu + Enterprise band; **fix bug**: CTA Enterprise → `/collaborate-with-us` (bukan `/contact` yang 404) |
| 9 | Testimonials | `components/Testimonials.tsx` (rewrite) | Re-enable di `Index.tsx`; isi `[SAMPLE]` — perlu kutipan riil/klien sebelum rilis |
| 10 | FAQ | `components/FAQ.tsx` (rewrite) | 8 dari 17 item; akordeon single-open dengan `aria-expanded`/`aria-controls` |
| 11 | Final CTA | `components/CTA.tsx` (rewrite) | Navy band, 1 CTA primer + 1 sekunder |
| 12 | Footer | `components/Footer.tsx` (rewrite) | 4 kolom + compliance badges; badge FTA/ADGM/GDPR perlu validasi legal |
| 13 | `collaborate.html` → `/collaborate-with-us` | `pages/CollaborateWithUs.tsx` (rewrite) | Header band navy + 2 kolom (value props kiri, form kanan); emoji 👉 dihapus dari CTA/submit; partnership types jadi selectable cards; validasi native + error summary; sukses = panel inline (toast sonner tetap opsional) |
| 14 | `privacy.html` → `/privacy-policy` | `pages/PrivacyPolicy.tsx` (rewrite) | **Hapus tsparticles** dari halaman; sticky TOC + scroll-spy; 10 section bernomor; "Your Rights" jadi grid chips; copy legal **verbatim** dari `en.json` — jangan di-rewrite; tanggal "27 May 2025" dari `last_updated_date` |
| 15 | `disclaimer.html` → `/disclaimer` | `pages/Disclaimer.tsx` (rewrite) | Shell legal sama; callout "Not professional advice" diekstrak dari teks existing; paragraf dipecah dari 1 blok jadi 4; tanggal **belum ada di source** — ditandai `[SAMPLE]`, konfirmasi tanggal rilis |
| 16 | Navbar halaman dalam | `components/Navbar.tsx` | Variant **light** (bg white/90 + border-b, teks navy) untuk halaman non-hero — prototype `collaborate/privacy/disclaimer.html` memakai shell ini; link antar-halaman pakai route React saat implementasi |

Komposisi halaman tetap di `pages/Index.tsx`; observer animasi IO yang lama (class `slide-up`/`fade-in` manual di `Index.tsx:20-60`) diganti hook `useScrollReveal` yang menghormati `prefers-reduced-motion`.

---

## 4. Perubahan design system produksi

### `tailwind.config.ts` — extend tambahan
```ts
fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
colors: {
  navy: { 950:'#0A0F1E', 900:'#0F172A', 800:'#1E293B', 700:'#334155' },
  brand:{ 50:'#EFF6FF',100:'#DBEAFE',400:'#60A5FA',500:'#3B82F6',600:'#2563EB',700:'#1D4ED8',800:'#1E40AF' },
  success:{ DEFAULT:'#059669', 700:'#047857' },
},
boxShadow: {
  card:'0 1px 2px rgba(15,23,42,.04), 0 8px 24px -8px rgba(15,23,42,.08)',
  lift:'0 2px 4px rgba(15,23,42,.05), 0 16px 40px -12px rgba(15,23,42,.14)',
  hero:'0 32px 90px -24px rgba(2,6,23,.55)',
},
```

### `index.html` (produksi)
```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
```

### `index.css` — token shadcn yang diubah
```css
:root {
  --primary: 221 83% 53%;        /* #2563EB — sebelumnya 210 100% 50% */
  --primary-foreground: 0 0% 100%;
  --ring: 221 83% 53%;
  --radius: 0.75rem;             /* 12px — sebelumnya 0.5rem */
}
.dark {
  --background: 222 47% 8%;      /* #0A0F1E — navy yang lebih dalam */
}
```
Hapus utility `.glass-effect` + override `.dark .bg-white`/`.dark .text-gray-900` massal (sumber inkonsistensi dark mode saat ini).

---

## 5. Aturan RTL (untuk implementasi AR)

Prototype EN memakai pola yang sudah RTL-ready:
- Tailwind logical utilities: `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-` (bukan `pl-`/`pr-`/`left-`/`right-`).
- Icon arrow memakai `rtl:rotate-180`.
- `dir` attribute tetap dikontrol `useLanguageDetection` existing.
- Plus Jakarta Sans tidak punya glif Arab → tambahkan fallback font Arab saat implementasi i18n AR, mis. `"IBM Plex Sans Arabic"` sebagai font ke-2 di stack `sans` (jangan terapkan sekarang di EN).

---

## 6. Accessibility (sudah diterapkan di prototype)

- Kontras: slate-600 body di putih 7.5:1; slate-400 di navy-950 ≈ 7:1; white di brand-600 4.5:1.
- Focus visible: outline 2px brand-500 + offset di semua link/tombol.
- Akordeon & mobile menu memakai `aria-expanded`/`aria-controls`; panel akordeon `role="region"`.
- Skip-link ke `#main`; mockup produk `aria-hidden` (dekoratif); animasi `prefers-reduced-motion` dihormati.
- Touch target ≥ 44px di navbar mobile & CTA.

---

## 7. Bug existing yang ikut terferdasi saat implementasi

1. `Pricing.tsx:231` — CTA Enterprise ke `/contact` (route tidak ada → 404) → diarahkan ke `/collaborate-with-us`.
2. Inter tidak pernah dimuat → Plus Jakarta Sans + link font.
3. Testimonials dikomentari di `Index.tsx:100-102` → di-enable kembali.
4. Footer link mati `#` (About/Careers/Help) → diarahkan atau diberi halaman; yang belum ada diberi tag `sample`.
5. `ThemeProvider` default inkonsisten (`App.tsx` light vs `main.tsx` system) → samakan.
6. Deps bisa dikurangi: buang `react-tsparticles`, `tsparticles-slim`, `embla-carousel-react` (karosel dihapus).
7. Hapus file legacy: `Features.tsx`, `FeaturesOptimized.tsx`, `*.backup`, `console.log` di `FeaturesFixed.tsx`.
8. Footer copyright tahun → dinamis (`new Date().getFullYear()`), saat ini hardcode 2025.

---

## 8. Konten yang diputuskan tampil final (keputusan pemilik, 2026-10-06)

Label `[SAMPLE]` telah dihapus dari prototype sesuai keputusan pemilik — konten berikut **tampil apa adanya di produksi**:

| Item | Lokasi | Status |
|---|---|---|
| 4 angka stats (99.9%, 40+ jam, 12k+, 24/7) | Stats bar | Tampil final |
| 3 testimonial + nama/jabatan | Testimonials | Tampil final |
| Logo wall text-wordmark | Logo wall | Tampil final; opsional ganti PNG asli dari `public/lovable-uploads/` |
| Angka percakapan demo (VAT AED 25.000, dll.) | Hero mockup & ATTO section | Tampil final; direview praktisi pajak jika perlu |
| Halaman About/Careers/Terms | Footer | Link tetap; halaman menyusul |
| Badge "Licensed Tax Agency / ADGM / GDPR" | Footer | Tampil final |
| Tanggal "Last updated" disclaimer | Disclaimer | Memakai tanggal yang sama dengan Privacy Policy (27 May 2025) |

## 9. Cara iterasi prototype

- Semua token warna/shadow/font ada di satu tempat: blok `tailwind.config` inline di `<head>` + blok `<style>`.
- Setiap section dibungkus komentar `<!-- ══ N. NAMA ══ -->` — mudah dihapus/diubah per section.
- Mau coba arah gelap penuh (dark-first)? Ganti permukaan `bg-white`/`bg-surface` → `bg-navy-950`/`bg-navy-900` dan tukar teks slate → slate-300/400; strukturnya sudah mendukung.
