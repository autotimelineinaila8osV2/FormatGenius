const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, HeadingLevel, TextRun } = require('docx');

(async () => {
  try {
    const outDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({ text: 'The Impact of Sleep on Academic Performance', heading: HeadingLevel.TITLE }),
          new Paragraph({ children: [new TextRun({ text: 'Abstract', bold: true })] }),
          new Paragraph('This paper explores the relationship between sleep and grades.'),
          new Paragraph({ text: 'Introduction', heading: HeadingLevel.HEADING_1 }),
          new Paragraph('Sleep affects cognition and attention (Smith, 2020).'),
          new Paragraph({ text: 'References', heading: HeadingLevel.HEADING_1 }),
          new Paragraph('Smith, J. (2020). Why We Sleep. Dreamwell Press.')
        ]
      }]
    });

    const buffer = await Packer.toBuffer(doc);
    const outPath = path.join(outDir, 'sample-essay.docx');
    fs.writeFileSync(outPath, buffer);
    console.log('Generated', outPath);
  } catch (e) {
    console.log('Sample generation skipped:', e.message);
  }
})();
