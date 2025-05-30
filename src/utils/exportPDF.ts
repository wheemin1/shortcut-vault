
import type { Shortcut } from '@/types';

interface ExportOptions {
  title?: string;
  includeHeader?: boolean;
  groupByTool?: boolean;
}

export const exportToPDF = (
  shortcuts: Shortcut[], 
  title: string = 'Shortcuts',
  options: ExportOptions = {}
) => {
  try {
    if (!shortcuts || shortcuts.length === 0) {
      console.warn('No shortcuts to export');
      return;
    }

    const { includeHeader = true, groupByTool = false } = options;

    // Create a new window with the content to print
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Failed to open print window. Please check popup blockers.');
    }

    let organizedShortcuts: Shortcut[] | Record<string, Shortcut[]> = shortcuts;
    
    if (groupByTool) {
      organizedShortcuts = shortcuts.reduce((acc, shortcut) => {
        if (!acc[shortcut.tool]) {
          acc[shortcut.tool] = [];
        }
        acc[shortcut.tool].push(shortcut);
        return acc;
      }, {} as Record<string, Shortcut[]>);
    }

    const generateShortcutHTML = (shortcut: Shortcut) => `
      <div class="shortcut">
        <div class="tool-platform">
          <span class="badge tool-badge">${shortcut.tool}</span>
          <span class="badge platform-badge">${shortcut.platform}</span>
          <span class="badge category-badge">${shortcut.category}</span>
        </div>
        <div class="key-combo">${shortcut.keyCombo}</div>
        <div class="description">${shortcut.description}</div>
      </div>
    `;

    const generateContentHTML = () => {
      if (Array.isArray(organizedShortcuts)) {
        return organizedShortcuts.map(generateShortcutHTML).join('');
      } else {
        return Object.entries(organizedShortcuts)
          .map(([tool, toolShortcuts]) => `
            <div class="tool-section">
              <h2 class="tool-header">${tool}</h2>
              ${toolShortcuts.map(generateShortcutHTML).join('')}
            </div>
          `).join('');
      }
    };

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 40px;
              line-height: 1.6;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              color: #2563eb;
            }
            .header .subtitle {
              margin: 5px 0 0 0;
              color: #666;
              font-size: 14px;
            }
            .tool-section {
              margin-bottom: 40px;
            }
            .tool-header {
              font-size: 20px;
              font-weight: bold;
              color: #1f2937;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 8px;
              margin-bottom: 16px;
            }
            .shortcut {
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 15px;
              margin-bottom: 15px;
              break-inside: avoid;
              background: #fafafa;
            }
            .tool-platform {
              display: flex;
              gap: 8px;
              margin-bottom: 10px;
              flex-wrap: wrap;
            }
            .badge {
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 500;
              border: 1px solid;
            }
            .tool-badge {
              background: #dbeafe;
              border-color: #93c5fd;
              color: #1e40af;
            }
            .platform-badge {
              background: #dcfce7;
              border-color: #86efac;
              color: #166534;
            }
            .category-badge {
              background: #fef3c7;
              border-color: #fcd34d;
              color: #92400e;
            }
            .key-combo {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              padding: 8px 12px;
              border-radius: 6px;
              font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
              font-size: 14px;
              margin: 10px 0;
              font-weight: bold;
              color: #374151;
            }
            .description {
              color: #4b5563;
              font-size: 14px;
              line-height: 1.5;
            }
            @media print {
              body { margin: 20px; }
              .shortcut { page-break-inside: avoid; }
              .tool-section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${includeHeader ? `
            <div class="header">
              <h1>${title}</h1>
              <p class="subtitle">Generated on ${new Date().toLocaleDateString('ko-KR')} • ${shortcuts.length} shortcuts</p>
            </div>
          ` : ''}
          ${generateContentHTML()}
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    
    // Wait for content to load before printing
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };

  } catch (error) {
    console.error('Failed to export PDF:', error);
    alert('PDF 내보내기에 실패했습니다. 다시 시도해주세요.');
  }
};
