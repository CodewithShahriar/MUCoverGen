
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportAsPDF = async (elementId: string, filename: string = 'cover-page'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  
  // A4 size in mm: 210mm x 297mm
  // We convert to inches for jsPDF (1 inch = 25.4 mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
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
  });

  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imgData;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
