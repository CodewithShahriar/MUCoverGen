import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportAsPDF = async (elementId: string, filename: string = 'cover-page'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 3, // higher resolution
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    scrollX: 0,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = 210;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  const yOffset = (pageHeight - imgHeight) / 2;

  pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
  pdf.save(`${filename}.pdf`);
};

export const exportAsPNG = async (elementId: string, filename: string = 'cover-page'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 3, // higher resolution
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    scrollX: 0,
    scrollY: -window.scrollY,
  });

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};