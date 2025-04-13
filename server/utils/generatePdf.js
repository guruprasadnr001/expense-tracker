const PDFDocument = require("pdfkit");

const generatePDFStream = (userId, expenses, res) => {
  const doc = new PDFDocument({ margin: 30, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=expenses.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("Expense Report", 30, 30);

  doc.fontSize(15).text(`User ID: ${userId}`, 400, 30, {
    align: "right",
  });

  const tableTop = 80;
  const rowHeight = 20;
  let y = tableTop;

  doc
    .moveTo(30, y - 5)
    .lineTo(570, y - 5)
    .stroke();

  doc.fontSize(12).text("ID", 30, y);
  doc.text("Amount", 80, y);
  doc.text("Description", 180, y, { width: 180 });
  doc.text("Category", 400, y);
  y += rowHeight;

  doc
    .moveTo(30, y - 5)
    .lineTo(570, y - 5)
    .stroke();

  expenses.forEach((exp) => {
    if (y > 750) {
      doc.addPage();
      y = tableTop;
    }

    doc.fontSize(10).text(exp.id.toString(), 30, y);
    doc.text(`${exp.amount} Rs`, 80, y);
    doc.text(exp.description, 180, y, { width: 180 });
    doc.text(exp.category, 400, y);
    y += rowHeight;
  });

  doc.end();
};

module.exports = { generatePDFStream };
