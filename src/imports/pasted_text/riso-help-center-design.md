🎨 FIGMA DESIGN SPECIFICATION: Riso Help Center / Hilfe-Seite

KONTEXT: Hilfe-Seite des Riso Help Centers (hilfe.riso-app.de)
Design: Landing page mit Kategorien, Sucche, populäre Artikel, Footer

PAGE-SETUP:
- Page-Name: "Help Center / Hilfe"
- Viewport: Desktop 1440px, Tablet 768px, Mobile 375px
- Background: White #FFFFFF

═══════════════════════════════════════════════════════════════

HEADER / NAVIGATION (Höhe: 64px)
- Background: White #FFFFFF
- Border-bottom: 1px #E0E0E0
- Padding: 0 32px
- Display: flex, justify-content space-between, align-items center

LEFT SIDE:
- Logo: "Riso" (Roboto Bold 18px, #0F429F)

CENTER (Nav Items):
- "Startseite" (Roboto Regular 13px, #666666, cursor pointer)
- "Wissensdatenbank" (Roboto Regular 13px, #0F429F, underline, active)
- "Anmelden" (Roboto Regular 13px, #666666, cursor pointer)
- "Registrieren" (Roboto Regular 13px, #666666, cursor pointer)
- Gap between items: 32px

RIGHT SIDE:
- Info Icon (24px, #0F429F, cursor help)

═══════════════════════════════════════════════════════════════

HERO SECTION (Höhe: 400px)
- Background: Linear Gradient #0F429F → #246AFF
- Padding: 64px 32px
- Text-Alignment: center
- Display: flex, flex-direction column, justify-content center, align-items center, gap 24px

TITLE:
- Text: "Willkommen beim Riso Help Center"
- Font: Roboto Bold 40px
- Color: White #FFFFFF
- Line-Height: 1.2

SUBTITLE:
- Text: "Suche nach Antworten, stöbere in der Wissensdatenbank oder erstelle ein Ticket."
- Font: Roboto Regular 16px
- Color: White #FFFFFF (opacity 0.95)
- Margin-bottom: 24px

SEARCH BAR:
- Container: White background, Border-Radius 24px, Padding 4px
- Input: Placeholder "Im Help Center suchen..." (Roboto Regular 13px, #999999)
- Input Padding: 12px 20px
- Input Width: 600px (max)
- Button: "Suchen" (Roboto Medium 13px, white text, bg #0F429F, Padding 12px 32px, Border-Radius 20px, cursor pointer)
- Hover: Input Border #0F429F (2px), Button bg #246AFF

═══════════════════════════════════════════════════════════════

CONTENT AREA (Padding: 64px 32px)
- Max-Width: 1400px
- Margin: 0 auto

SECTION A: Kategorien Overview (Grid)
- Display: grid, grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
- Gap: 24px
- Margin-bottom: 64px

KATEGORIE-CARD (5 Cards insgesamt):

Card 1: "Über Riso"
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 12px
- Padding: 24px
- Hover: Box-Shadow 0 4px 16px rgba(0,0,0,0.1), Transform translateY(-4px)
- Transition: all 0.3s ease

Icon Area (oben):
- Icon: 📄 (or custom file icon, 32px, color #0F429F)
- Margin-bottom: 16px

Title:
- Text: "Über Riso" (Roboto Bold 16px, #273A5F)
- Margin-bottom: 8px

Description:
- Text: "Alles Wissenswerte über Riso, unsere Mission und Werte" (Roboto Regular 13px, #666666)
- Line-Height: 1.5
- Margin-bottom: 16px

Link:
- Text: "Mehr erfahren →" (Roboto Medium 13px, #0F429F, cursor pointer)
- Hover: Text-Decoration underline

Article Count:
- Text: "4 Artikel" (Roboto Regular 11px, #999999, margin-top 16px, padding-top 16px, border-top 1px #E0E0E0)

Card 2: "Riso - Erste Schritte"
- Same styling as Card 1
- Icon: 🚀 (or custom icon)
- Title: "Riso - Erste Schritte"
- Description: "Schnelle Einführung für Arbeitgeber und Arbeitnehmer"
- Article Count: "6 Artikel"

Card 3: "Berichte, Rechtliches, Lohn & Steuerberatung"
- Same styling
- Icon: 📊 (or custom icon)
- Title: "Berichte, Rechtliches, Lohn & Steuerberatung"
- Description: "Reports erstellen, rechtliche Informationen und Steuerberatung"
- Article Count: "5 Artikel"

Card 4: "Riso - App"
- Same styling
- Icon: 📱 (or custom icon)
- Title: "Riso - App"
- Description: "Anleitungen und FAQs zur Riso Mobile App"
- Article Count: "3 Artikel"

Card 5: "Riso - Benefits"
- Same styling
- Icon: 🎁 (or custom icon)
- Title: "Riso - Benefits"
- Description: "Detaillierte Informationen zu allen Riso Benefits und Zuschüssen"
- Article Count: "18 Artikel"

═══════════════════════════════════════════════════════════════

SECTION B: Beliebte Artikel
- Margin-bottom: 64px

SECTION-TITLE:
- Text: "Beliebte Artikel" (Roboto Bold 18px, #273A5F)
- Margin-bottom: 24px

ARTICLE-LIST:
- Display: grid, grid-template-columns repeat(auto-fit, minmax(250px, 1fr))
- Gap: 16px

ARTICLE-ITEM (5-6 items):
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 16px
- Hover: Border #0F429F (2px), Box-Shadow light
- Cursor: pointer

Icon:
- 📄 (16px, #0F429F, margin-bottom 8px)

Title:
- Text: (z.B. "Erholungsbeihilfe - Nutzungsbedingungen") (Roboto Regular 13px, #333333)
- Line-Height: 1.4
- Hover: Color #0F429F

Metadata:
- Text: (z.B. "in Über Erholung") (Roboto Regular 11px, #999999, margin-top 8px, padding-top 8px, border-top 1px #E0E0E0)

═══════════════════════════════════════════════════════════════

SECTION C: Call-to-Action
- Background: #F0F4FF (Riso hellblau)
- Border-Radius: 12px
- Padding: 40px
- Text-Alignment: center
- Margin-bottom: 64px

CTA-TITLE:
- Text: "Noch keine Antwort gefunden?" (Roboto Bold 18px, #273A5F)
- Margin-bottom: 12px

CTA-SUBTITLE:
- Text: "Senden Sie uns ein Ticket – wir melden uns so schnell wie möglich bei Ihnen." (Roboto Regular 14px, #666666)
- Margin-bottom: 24px

CTA-BUTTON:
- Text: "Ticket erstellen" (Roboto Medium 14px, white)
- Background: #0F429F
- Padding: 12px 32px
- Border-Radius: 24px
- Hover: Background #246AFF

═══════════════════════════════════════════════════════════════

FOOTER (Höhe: auto, min 200px)
- Background: #273A5F (Dark Blue)
- Color: White
- Padding: 48px 32px
- Display: grid, grid-template-columns repeat(auto-fit, minmax(200px, 1fr))
- Gap: 32px

FOOTER COLUMN 1: Company Links
- Title: "Riso" (Roboto Bold 14px, white, margin-bottom 16px)
- Links:
  - "Startseite" (Roboto Regular 13px, white opacity 0.8, cursor pointer)
  - "Wissensdatenbank" (same)
  - "Ticket erstellen" (same)
  - "Mein Bereich" (same)
- Link Hover: opacity 1.0

FOOTER COLUMN 2: Legal
- Title: "Rechtliches" (Roboto Bold 14px, white, margin-bottom 16px)
- Links:
  - "Datenschutz" (same styling as Column 1)
  - "Impressum" (same)
  - "Kontakt" (same)

FOOTER COLUMN 3: Business
- Title: "Business" (Roboto Bold 14px, white, margin-bottom 16px)
- Links:
  - "riso-app.de" (same styling)

FOOTER COLUMN 4: Contact
- Title: "Support" (Roboto Bold 14px, white, margin-bottom 16px)
- Contact Info:
  - "E-Mail: support@risoapp.zohodesk.eu" (Roboto Regular 12px, white opacity 0.8)
  - "Telefon: +496223 969696 58" (same)

FOOTER BOTTOM:
- Text: "© Riso • Powered by Zoho Desk" (Roboto Regular 11px, white opacity 0.6)
- Padding-top: 32px
- Border-top: 1px white opacity 0.2
- Margin-top: 32px
- Text-Alignment: center

═══════════════════════════════════════════════════════════════

RESPONSIVE DESIGN

TABLET (768px):
- Hero Section: Padding 48px 24px, Title 32px, Search 100% width
- Kategorie-Cards: grid-template-columns repeat(2, 1fr)
- Article-Items: grid-template-columns repeat(2, 1fr)
- Footer: grid-template-columns repeat(2, 1fr)

MOBILE (375px):
- Hero Section: Padding 32px 16px, Title 28px, Subtitle 14px
- Search Bar: 100% width, Button width 100%
- Kategorie-Cards: 1 column
- Article-Items: 1 column
- Footer: 1 column
- All Padding: 16px
- Nav Items: Hamburger Menu (collapsible)

═══════════════════════════════════════════════════════════════

ANIMATIONS & INTERACTIONS:
- Cards Hover: translateY(-4px), Box-Shadow increase
- Links Hover: Color #0F429F, opacity 1.0
- Search Input Focus: Border #0F429F (2px)
- Button Hover: Background darker, cursor pointer
- Transitions: all 0.3s ease

FARBEN (Riso CI):
- Primary Blue: #0F429F
- Light Blue: #246AFF
- Hellblau BG: #F0F4FF
- Dark Blue (Text): #273A5F
- Dark Blue (Footer): #273A5F
- Gray Text: #666666
- Gray Text Light: #999999
- Light BG: #F9FAFB
- Border: #E0E0E0
- White: #FFFFFF

FONT: Roboto (Regular, Medium, Bold)
- Hero Title: 40px Bold
- Section Title: 18px Bold
- Card Title: 16px Bold
- Body: 13px Regular
- Label/Meta: 11px Regular

SPACING:
- Section Gap: 64px
- Card Gap: 24px
- Padding: 32px (Desktop), 24px (Tablet), 16px (Mobile)
- Input Height: 40px
- Button Padding: 12px 32px
- Border Radius: 24px (buttons), 12px (cards), 8px (items)
