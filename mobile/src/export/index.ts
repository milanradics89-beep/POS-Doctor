import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import type { DiagnosticReport, DiagnosticStatus } from '../native/DiagnosticsProcessor';

const STATUS_ICONS: Record<DiagnosticStatus, string> = {
  ok: '[OK]',
  warning: '[WARN]',
  fault: '[FAULT]',
  unknown: '[N/A]',
};

export function generateTextReport(report: DiagnosticReport): string {
  const lines: string[] = [];
  lines.push('POS DOCTOR - DIAGNOSTIC REPORT');
  lines.push('='.repeat(48));
  lines.push(`Timestamp: ${new Date(report.timestamp).toLocaleString()}`);
  lines.push(`Device: ${report.deviceManufacturer} ${report.deviceModel}`);
  lines.push(`Serial: ${report.deviceSerial}`);
  lines.push(`Android: ${report.androidVersion}`);
  lines.push(`Overall: ${report.overallScore}% (${report.overallStatus.toUpperCase()})`);
  lines.push('');

  for (const cat of report.categories) {
    lines.push(`${STATUS_ICONS[cat.status]} ${cat.title}`);
    lines.push(`Summary: ${cat.summary}`);
    for (const field of cat.data) {
      lines.push(`- ${field.key}: ${field.value}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export function generateHtmlReport(report: DiagnosticReport): string {
  const rows = report.categories
    .map(
      (cat) => `<div style="background:#121823;border:1px solid #243042;border-radius:12px;padding:12px;margin-bottom:10px;">
      <h3 style="margin:0 0 8px;color:#EAF0F7;">${cat.title}</h3>
      <p style="margin:0 0 8px;color:#B7C3D4;">${cat.summary}</p>
      ${cat.data
        .map((d) => `<div style="font-size:12px;color:#EAF0F7;margin-bottom:3px;"><b>${d.key}</b>: ${d.value}</div>`)
        .join('')}
    </div>`
    )
    .join('');

  return `<!doctype html><html><body style="background:#0B0D10;color:#EAF0F7;font-family:Arial;padding:16px;">
    <h1>POS Doctor Report</h1>
    <div>Device: ${report.deviceManufacturer} ${report.deviceModel}</div>
    <div>Android: ${report.androidVersion}</div>
    <div>Score: ${report.overallScore}%</div>
    <div style="margin-top:14px;">${rows}</div>
  </body></html>`;
}

async function exportAsPdf(report: DiagnosticReport): Promise<string> {
  const html = generateHtmlReport(report);
  const { uri } = await Print.printToFileAsync({ html, base64: false });
  return uri;
}

async function exportAsText(report: DiagnosticReport): Promise<string> {
  const content = generateTextReport(report);
  const uri = `${FileSystem.cacheDirectory}pos_doctor_report_${Date.now()}.txt`;
  await FileSystem.writeAsStringAsync(uri, content);
  return uri;
}

export async function shareReport(report: DiagnosticReport, _lang: 'en' | 'hu' = 'en', format: 'text' | 'pdf' = 'pdf'): Promise<void> {
  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) throw new Error('Sharing not available on this device');

  const uri = format === 'pdf' ? await exportAsPdf(report) : await exportAsText(report);
  await Sharing.shareAsync(uri, {
    mimeType: format === 'pdf' ? 'application/pdf' : 'text/plain',
    dialogTitle: 'Share Diagnostic Report',
  });
}
