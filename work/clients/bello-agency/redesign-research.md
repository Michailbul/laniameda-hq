# Bello Agency - Website Redesign Research

> Extracted from bello.agency on 2026-03-13
> Source files: `.firecrawl/bello-*.md`, `.firecrawl/bello-agency.html`

---

## 1. Brand Identity

| Property | Value |
|----------|-------|
| **Name** | Bello Agency |
| **Legal** | УНП 193585743 (Belarus) |
| **Tagline (RU)** | "Создаем то, чем хочется делиться" (We create what you want to share) |
| **Positioning** | Lifestyle digital-agency |
| **Email** | ciao@bello.agency |
| **Founded** | ~2019 |
| **Languages** | Russian (primary), English |
| **Founders** | Alina Litvinova (Visual Manager, Photographer/Videographer), Vika Stefanovich (Digital Marketer, SMM & Brand Strategist) |

### Sub-brands
- **Bello Education** - Educational platform (launched 2022) - bello.education
- **Bello Ciao** - Podcast about social media (launched 2023) - bellociao.mave.digital
- **Bello SMM Talk** - Digital journal with insights

### Social Channels
- Instagram: instagram.com/bello.agency/
- Telegram: t.me/bello_agency
- TikTok: tiktok.com/@bello.agency
- YouTube: youtube.com/@bello.agency

---

## 2. Color Palette

| Role | Color | Hex | RGB |
|------|-------|-----|-----|
| **Background (primary)** | Warm cream | `#FFFDF5` | rgb(255, 253, 245) |
| **Text (primary)** | Black | `#000000` | rgb(0, 0, 0) |
| **Text (secondary)** | Dark charcoal | `#222222` | - |
| **Borders / Dividers** | Light gray | `#B3B3B3` | - |
| **Dots / Muted UI** | Medium gray | `#C7C7C7` | - |
| **Input backgrounds** | Light gray | `#EEEEEE` | rgba(238,238,238,1) |
| **White (accents)** | Pure white | `#FFFFFF` | - |

**Note:** The palette is intentionally restrained - warm off-white, black, and grays only. No bold accent colors. The warmth comes from the cream background rather than colored accents.

---

## 3. Typography

| Property | Value |
|----------|-------|
| **Font Family** | **Mont** (geometric sans-serif) |
| **Weights Used** | 400 (Regular), **700 (Bold)** |
| **Body Text** | 18-20px |
| **Subheadings** | 24px |
| **Headings** | 32px |
| **Smaller Text** | 19px |
| **Style** | Clean, modern, European |

**Decorative Text:** Several headings are rendered as custom SVG images rather than live text (e.g., "ABOUT US", "PORTFOLIO", "SERVICES", "REVIEWS", "FOUNDERS", "WIN WIN"). This is a signature design choice.

---

## 4. Design System & UI Elements

### Buttons
- **Primary CTA:** Black outline, 1px solid `#000000`, Mont font, no fill
- **Height:** ~102px (large CTAs)
- **Style:** Minimal, outlined, uppercase-ish

### Borders & Lines
- Thin 1px borders in `#B3B3B3`
- Used as section dividers

### Dot Indicators (Carousel)
- 6x6px circles
- Color: `#C7C7C7`

### Form Fields
- Simple, minimal styling
- Required fields marked with `*`

### Arrow Icons
- Custom SVG arrows for navigation/links
- Blue arrow for Education sub-brand
- Yellow arrow for Podcast sub-brand

### Layout
- Built on **Tilda** CMS (data-tilda-project-id="7270319")
- Responsive breakpoints: 320, 480, 640, 960, 1200px
- Full-width artboard sections
- Generous whitespace and padding
- Sections padded 30-165px top/bottom

---

## 5. Site Structure & Navigation

### Main Navigation (RU)
1. О нас (About us)
2. Портфолио (Portfolio)
3. Услуги (Services)
4. Контакты (Contacts)
- Language toggle: ENG/RU

### Pages Map (29 total)
```
bello.agency/                          # Homepage (RU)
bello.agency/en                        # Homepage (EN)
bello.agency/links                     # Link tree
bello.agency/portfolio                 # All cases
bello.agency/portfolio/complex-promotion           # Category
bello.agency/portfolio/social-media-management     # Category
bello.agency/portfolio/other-services              # Category

Case Studies:
├── /portfolio/complex-promotion/volkswagen
├── /portfolio/complex-promotion/gorilla-energy
├── /portfolio/complex-promotion/keyman
├── /portfolio/social-media-management/vizaprom
├── /portfolio/social-media-management/velmi
├── /portfolio/social-media-management/fraai
├── /portfolio/other-services/lion-visa
├── /portfolio/other-services/macroom-online
├── /portfolio/other-services/papaya

English mirrors:
├── /en/portfolio
├── /en/portfolio/complex-promotion
├── /en/portfolio/social-media-management
├── /en/portfolio/other-services
├── /en/portfolio/complex-promotion/volkswagen
├── /en/portfolio/complex-promotion/gorilla-energy
├── /en/portfolio/social-media-management/vizaprom
├── /en/portfolio/social-media-management/velmi
├── /en/portfolio/social-media-management/fraai
├── /en/portfolio/other-services/lion-visa
├── /en/portfolio/other-services/macroom-online
├── /en/portfolio/other-services/papaya
```

---

## 6. Homepage Sections (Content Architecture)

### Section 1: Hero
- Full-screen background image
- Logo SVG top-left
- Navigation links
- Team/lifestyle hero image

### Section 2: About Us
- Agency description text
- Lifestyle photography
- SVG decorative elements
- "We help brands establish a deep connection with their audience, evoke emotions and spark a desire to try their products."

### Section 3: Portfolio Categories
Three visual cards with hover images:
1. **Social media management** (Ведение аккаунта)
2. **Complex promotion** (Комплексное продвижение)
3. **Other services** (Другие услуги)

### Section 4: Services (Accordion/Expandable)
Click "+" to expand. 7 services:

1. **SMM Strategy** - Account audit, audience analysis, competitor analysis, communication strategy, visual concept, analytics
2. **Social Media Management** (Instagram, TikTok, Telegram) - Content plan, copywriting, stories, graphic design, reporting
3. **Targeted Advertising** - Strategy, creative ideas, layouts, Facebook ads setup, reporting
4. **Influence Marketing** - Concept, blogger selection, communication, quality control
5. **Brand Strategy** - Brand audit, market analysis, audience research, brand personality, mission/philosophy, TOV
6. **Visual Identity** - Logo creation, color palette, font pairs
7. **Content Creation** - Visual concept, filming, photo/video editing
8. **Consulting** - Account audit, 2-hour Q&A session

### Section 5: Reviews/Testimonials
- Client testimonials in carousel/slider
- Clients: Fraai (Netherlands), OSH, Heyday, My Cosmetics Lab, Biopiel, Beauty Skill School, Choice, Клиника флебологии, Клиника в Уручье

### Section 6: Founders
- Two founders with photos and bios
- Alina Litvinova & Vika Stefanovich

### Section 7: Sub-brands
- Bello Education (2022) with blue arrow CTA
- Bello Ciao podcast (2023) with yellow arrow CTA

### Section 8: Contact / Win-Win Form
- "Win-win" SVG heading
- Form fields: Name*, Email*, Phone, Brand name*, Account link, Main promotion goal, Monthly budget
- Budget options: до 500 BYN / 500-1000 / 1000-2000 / более 2000

### Footer
- Logo
- Email
- Copyright
- Social links (Telegram, TikTok, YouTube, Instagram)

---

## 7. Portfolio / Case Studies

### Portfolio Categories
| Category | Cases |
|----------|-------|
| **Complex Promotion** | Volkswagen, Gorilla Energy, Keyman |
| **Social Media Management** | Fraai, Vizaprom, Velmi |
| **Other Services** | Lion Visa, MacROOM, Papaya |

### Case Study Template (Volkswagen example)
- **Breadcrumb:** Главная > Портфолио > Brand Name
- **Header:** Date range + Brand name + hero images
- **Sections:**
  - Client description
  - Task/objective
  - "Our actions" (with icon illustrations)
  - Insight/approach description
  - Visual content gallery (lifestyle photos, social media screenshots)
  - Results/metrics
- **CTA:** "Work together" popup form
- **Tags:** Service types (e.g., "ведение Instagram", "таргет", "создание контента")

### Portfolio Page Layout
- Category tabs at top (All cases / Complex promotion / Account management / Other services)
- Grid of case study cards
- Each card: thumbnail image + brand name + date + service tags + arrow link

---

## 8. Contact Form (Updated Version - Case Study Pages)

The newer case study pages have an updated form:
- Name*
- Email*
- Phone/Telegram
- Brand name*
- Website or account link
- "How can we help your brand?" (multi-select checkboxes):
  - SMM-стратегия
  - Ведение аккаунта (Instagram, TikTok, Telegram)
  - Таргет
  - Работа с блогерами
  - Бренд-стратегия
  - Визуальная айдентика
  - Создание контента
  - Консультация
- Budget selector: до 500 BYN / 500-1000 / 1000-2000 / более 2000

---

## 9. Visual & Imagery Style

### Photography
- High-quality lifestyle photography
- Warm, natural tones
- People-centric (team photos, client shoots)
- Modern, editorial aesthetic
- European/cosmopolitan feel

### SVG Decorative Elements
- Hand-drawn organic flourishes and shapes
- Section headings rendered as custom SVG graphics
- Arrow icons in various styles (black, blue, yellow)
- Playful dot/circle patterns

### Key Image Assets
| Asset | URL |
|-------|-----|
| Hero background | `https://static3.tildacdn.com/tild3563-3033-4439-a634-633238653338/bg_image.png` |
| Logo | `https://static.tildacdn.biz/tild3936-6531-4135-b737-363662333535/logo.svg` |
| Footer logo | `https://static.tildacdn.biz/tild3936-6335-4537-a639-333231383839/Group_48_1.svg` |
| "About Us" SVG | `https://static.tildacdn.biz/tild3435-6533-4661-b932-633431656539/ABOUT_US.svg` |
| "Portfolio" SVG | `https://static.tildacdn.biz/tild3237-3033-4662-b933-343639323936/PORTFOLIO.svg` |
| "Services" SVG | `https://static.tildacdn.biz/tild3336-6261-4938-a661-346130613266/Services.svg` |
| "Reviews" SVG | `https://static.tildacdn.biz/tild6232-6362-4534-a637-333233656665/REVIEWS.svg` |
| "Founders" SVG | `https://static.tildacdn.biz/tild6631-6436-4335-b839-646130326639/Founders.svg` |
| "Win-Win" SVG | `https://static.tildacdn.biz/tild6262-6435-4636-b935-313662393039/WIN_WIN.svg` |
| Education logo | `https://static.tildacdn.biz/tild3362-3339-4738-a235-386663373030/BELLO_EDUCATION.svg` |
| Podcast logo | `https://static.tildacdn.biz/tild6563-6265-4635-b637-336464616333/BELLO_CIAO.svg` |
| Education badge | `https://static.tildacdn.biz/tild3635-3061-4933-a133-313732336138/bello_education_2_ro.svg` |
| Blue arrow | `https://static.tildacdn.biz/tild3834-6237-4336-b066-363332663062/blue_arrow.svg` |
| Yellow arrow | `https://static.tildacdn.biz/tild6432-3135-4438-a531-326139303630/yellow_arrow.svg` |
| Black arrow | `https://static.tildacdn.biz/tild6663-3433-4266-a331-646433323531/arrow.svg` |
| Founder 1 photo | `https://static.tildacdn.biz/tild6335-3030-4237-a335-353861643239/IMG_0704_1_1.png` |
| Founder 2 photo | `https://static.tildacdn.biz/tild3762-3536-4563-b533-636234396363/IMG_1064.png` |
| Hero team photo | `https://static.tildacdn.biz/tild3863-6631-4031-a233-353434383566/IMG_1071_1.png` |
| About photo | `https://static.tildacdn.biz/tild3138-6238-4330-b966-306239303934/IMG_6603.jpg` |
| Links BG | `https://static.tildacdn.biz/tild3065-3634-4431-b338-326562383764/background.png` |
| Education BG | `https://static.tildacdn.biz/tild6635-3837-4562-b032-393933376264/Mask_group.png` |
| Podcast photo | `https://static.tildacdn.biz/tild3230-3033-4132-b265-313430656537/IMG_7917_1.png` |

---

## 10. Tone of Voice

### Characteristics
- **Warm & Personal** - Uses informal address, first names
- **Confident but Approachable** - Professional yet friendly
- **Lifestyle-oriented** - Emphasizes aesthetics, emotions, community
- **Bilingual casual** - Mixes Russian and English naturally
- **Community-focused** - "Win-win", "work together", "trusting cooperation"

### Key Phrases (EN)
- "We create what you want to share"
- "Your company can be next"
- "100% desired result"
- "Deep connection with their audience"
- "Evoke emotions and spark a desire"
- "Creating unique and meaningful content"
- "Win-win"

### Key Phrases (RU)
- "Создаем то, чем хочется делиться"
- "Помогаем брендам установить глубокую связь со своей аудиторией"
- "Ценим проекты, которые хотят привнести что-то новое в этот мир"
- "100% получение желаемого результата"

---

## 11. Technical Notes

| Property | Value |
|----------|-------|
| **CMS** | Tilda |
| **Project ID** | 7270319 |
| **Country** | Belarus (BY) |
| **Responsive Breakpoints** | 320, 480, 640, 960, 1200px |
| **Image CDN** | static.tildacdn.biz / optim.tildacdn.biz |
| **Lazy Loading** | Yes (data-tilda-lazy="yes") |
| **Animation** | Appear animations on sections |
| **Forms** | Tilda native forms with key f0e3c17853e450ec3668190947270319 |

---

## 12. Clients / Portfolio Brands

| Brand | Service Type | Duration |
|-------|-------------|----------|
| **Volkswagen** | Complex promotion (Instagram, targeting, content) | 02.2022 - present |
| **Gorilla Energy** | Complex promotion | - |
| **Keyman** | Complex promotion | - |
| **Fraai** (Netherlands) | Social media management (Instagram) | 09.2022 - present |
| **Vizaprom** | Social media management | - |
| **Velmi** | Social media management | - |
| **Lion Visa** | Other services | - |
| **MacROOM** | Branding, SMM strategy | 10.2023 |
| **Papaya** | Other services | - |
| **OSH** | SMM (from testimonials) | ~2019-2022+ |
| **Heyday** | SMM (from testimonials) | - |
| **My Cosmetics Lab** | SMM (from testimonials) | ~2019-2022+ |
| **Biopiel** | SMM strategy, visual (from testimonials) | - |
| **Beauty Skill School** | SMM strategy (from testimonials) | - |
| **Choice** | SMM (from testimonials) | - |
| **Клиника флебологии** | SMM, advertising (from testimonials) | - |
| **Клиника в Уручье** | SMM (from testimonials) | - |

---

## 13. Links Page (bello.agency/links)

A link-tree style page with background image:
1. Вебсайт агентства (Agency website)
2. BELLO EDUCATION - Educational platform
3. BELLO CIAO - Podcast
4. BELLO SMM TALK - Digital journal
5. TIK TOK - Agency TikTok
6. INSTAGRAM - Agency Instagram
