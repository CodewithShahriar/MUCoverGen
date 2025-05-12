import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;
const SCALE_FACTOR = 3; // for high DPI exports

export const exportAsPDF = async (elementId: string, filename = 'cover-page'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    width: A4_WIDTH_PX,
    height: A4_HEIGHT_PX,
    scale: SCALE_FACTOR,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: A4_WIDTH_PX,
    windowHeight: A4_HEIGHT_PX,
    scrollX: 0,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  pdf.save(`${filename}.pdf`);
};

export const exportAsPNG = async (elementId: string, filename = 'cover-page'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    width: A4_WIDTH_PX,
    height: A4_HEIGHT_PX,
    scale: SCALE_FACTOR,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: A4_WIDTH_PX,
    windowHeight: A4_HEIGHT_PX,
    scrollX: 0,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imgData;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
