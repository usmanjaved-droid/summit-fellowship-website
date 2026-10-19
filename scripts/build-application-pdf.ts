import { createWriteStream, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import PDFDocument from 'pdfkit';
import { BEFORE_YOU_START, CONFIRMATION_TEXT, SECTIONS } from '../lib/application/questions.ts';
import { schemaHash } from '../lib/application/schemaHash.ts';
import { SCREENER_QUESTIONS } from '../lib/application/screener.ts';

const site = JSON.parse(readFileSync(new URL('../data/site.json', import.meta.url), 'utf8')) as { currentCohort: { year: number } };
const year = site.currentCohort.year;
const outDir = new URL('../public/application/', import.meta.url);
mkdirSync(outDir, { recursive: true });

const doc = new PDFDocument({ size: 'A4', margin: 56, info: { Title: `Friends of Pakistan Fellowship — ${year} application (offline copy)`, Subject: schemaHash() } });
doc.pipe(createWriteStream(new URL('friends-of-pakistan-fellowship-application.pdf', outDir)));

const h1 = (t: string) => doc.font('Times-Roman').fontSize(24).fillColor('#142734').text(t).moveDown(0.4);
const h2 = (t: string) => doc.moveDown(0.8).font('Times-Roman').fontSize(18).fillColor('#142734').text(t).moveDown(0.3);
const body = (t: string, opts: PDFKit.Mixins.TextOptions = {}) => doc.font('Helvetica').fontSize(10).fillColor('#1a1410').text(t, opts);
const note = (t: string) => doc.font('Helvetica-Oblique').fontSize(9).fillColor('#6b625b').text(t);
const lines = (n: number) => {
  for (let i = 0; i < n; i++) {
    doc.moveDown(0.6);
    const y = doc.y;
    doc.moveTo(doc.page.margins.left, y).lineTo(doc.page.width - doc.page.margins.right, y).strokeColor('#d4cab5').stroke();
  }
  doc.moveDown(0.6);
};

h1(`Friends of Pakistan Fellowship — ${year} application`);
body('This is an offline copy of the online application, for drafting. Applications are only accepted through the online form at /apply/form — paste your answers in when you are ready. Character limits below are hard limits online.');
h2('Before you start, gather:');
BEFORE_YOU_START.forEach((b) => body(`•  ${b}`));
note('G3 (the path to 1M users) is the one long answer — plan five to eight minutes for it.');

h2('Eligibility (answer yes or no)');
SCREENER_QUESTIONS.forEach((q) => body(`[ ] Yes  [ ] No   ${q.label}`).moveDown(0.2));

for (const section of SECTIONS) {
  doc.addPage();
  h1(`Section ${section.id} — ${section.title}`);
  for (const q of section.questions) {
    doc.moveDown(0.6);
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#1a1410').text(`${q.id}. ${q.label}${q.required ? '' : ' (optional)'}`);
    if (q.help) note(q.help);
    switch (q.kind) {
      case 'text':
        note(`Max ${q.maxChars} characters.`);
        lines(Math.min(12, Math.max(1, Math.ceil(q.maxChars / 90))));
        break;
      case 'radio':
        q.options.forEach((o, i) => body(`[ ] ${q.numbered ? `${i + 1}. ` : ''}${o}`));
        note('Choose one.');
        break;
      case 'select':
      case 'multiselect':
        q.options.forEach((o) => body(`[ ] ${o}`));
        note(q.kind === 'select' ? 'Choose one.' : 'Choose all that apply.');
        if (q.specify) note(`If ${q.specify.options.join(' / ')}: please specify (max ${q.specify.maxChars} characters).`);
        break;
      case 'sentence':
        body(q.parts.map((p) => (typeof p === 'string' ? p : `[${p.hint} — max ${p.maxChars}]`)).join(' '));
        lines(2);
        break;
      case 'table':
        note(`Up to ${q.maxRows} row${q.maxRows > 1 ? 's' : ''}. Columns: ${q.columns.map((c) => c.label).join(' | ')}${q.columns.some((c) => c.allowUntracked) ? ' ("we don\'t track this" allowed for counts)' : ''}.`);
        lines(q.maxRows * 2);
        break;
      case 'number':
        note(`Digits only.${q.allowUntracked ? ' Or tick: [ ] We don\'t track this.' : ''}`);
        lines(1);
        break;
      default:
        lines(1);
    }
  }
}

doc.addPage();
h1('Confirmation');
body(`[ ] ${CONFIRMATION_TEXT}`);
doc.end();

writeFileSync(new URL('../lib/application/pdf-manifest.json', import.meta.url), `${JSON.stringify({ schemaHash: schemaHash(), generatedAt: new Date().toISOString() }, null, 2)}\n`);
console.log('Wrote public/application/friends-of-pakistan-fellowship-application.pdf');
