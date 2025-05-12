import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportAsPDF = async (elementId: string, filename: string = 'cover-page'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found");
    return;
  }

  // Force scale to original size (A4 ratio: 210 x 297 mm ≈ 794 x 1123 px at 96 DPI)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Add image to fill A4 (210 x 297 mm)
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  pdf.save(`${filename}.pdf`);
};

export const exportAsPNG = async (elementId: string, filename: string = 'cover-page'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  });

  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imgData;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
