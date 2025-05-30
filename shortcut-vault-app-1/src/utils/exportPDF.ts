
export const exportToPDF = (shortcuts: any[], title: string = 'Shortcuts') => {
  // Create a new window with the content to print
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 40px;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .shortcut {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            break-inside: avoid;
          }
          .tool-platform {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
          }
          .badge {
            background: #f3f4f6;
            border: 1px solid #d1d5db;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          .key-combo {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
            margin: 10px 0;
          }
          .description {
            color: #374151;
            margin-bottom: 8px;
          }
          .category {
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          @media print {
            body { margin: 20px; }
            .shortcut { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Shortcut Library - ${title}</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        ${shortcuts.map(shortcut => `
          <div class="shortcut">
            <div class="tool-platform">
              <span class="badge">${shortcut.tool}</span>
              <span class="badge">${shortcut.platform}</span>
            </div>
            <div class="key-combo">${shortcut.keyCombo}</div>
            <div class="description">${shortcut.description}</div>
            <div class="category">${shortcut.category}</div>
          </div>
        `).join('')}
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};
