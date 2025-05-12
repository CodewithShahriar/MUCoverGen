import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const cloneAndPrepare = (element: HTMLElement): HTMLElement => {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  clone.style.width = '210mm';
  clone.style.height = '297mm';
  clone.style.padding = '20mm';
  clone.style.boxSizing = 'border-box';
  clone.style.background = '#ffffff';
  document.body.appendChild(clone);
  return clone;
};

export const exportAsPDF = async (elementId: string, filename: string = 'cover-page'): Promise<void> => {
  const original = document.getElementById(elementId);
  if (!original) return;

  const clone = cloneAndPrepare(original);
  const canvas = await html2canvas(clone, {
    scale: 3,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  pdf.save(`${filename}.pdf`);

  document.body.removeChild(clone);
};

export const exportAsPNG = async (elementId: string, filename: string = 'cover-page'): Promise<void> => {
  const original = document.getElementById(elementId);
  if (!original) return;

  const clone = cloneAndPrepare(original);
  const canvas = await html2canvas(clone, {
    scale: 3,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  document.body.removeChild(clone);
};
