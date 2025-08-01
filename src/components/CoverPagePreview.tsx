import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { CoverPageData } from "@/components/CoverPageForm";
import { departmentList } from "@/data/departmentData";
import { facultyList } from "@/data/facultyData";
import { exportAsPDF, exportAsPNG } from "@/lib/exportUtils";
import { format } from "date-fns";

interface CoverPagePreviewProps {
  data: CoverPageData;
}

export const CoverPagePreview = ({ data }: CoverPagePreviewProps) => {
  const coverPageRef = useRef<HTMLDivElement>(null);

  const faculty = facultyList.find(f => f.id === data.facultyId);
  const department = departmentList.find(d => d.id === data.departmentId);

  const filename = `${data.studentName.replace(/\s+/g, '_')}_${data.studentId}_cover`;

  const handleExportPDF = () => {
    exportAsPDF("coverPage", filename);
  };

  const handleExportPNG = () => {
    exportAsPNG("coverPage", filename);
  };

  return (
    <div className="space-y-4">
      {/* Download Buttons at the Top */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 justify-center">
        <Button 
          onClick={handleExportPDF} 
          className="bg-gradient-to-r from-blue-900 to-sky-600 text-white hover:from-blue-700 hover:to-sky-400"
        >
          Download as PDF
        </Button>
        <Button 
          onClick={handleExportPNG} 
          className="bg-gradient-to-r from-blue-900 to-sky-600 text-white hover:from-blue-700 hover:to-sky-400"
        >
          Download as PNG
        </Button>
      </div>


      {/* Preview Section */}
      <div className="preview-container relative border border-black">
        <div 
          ref={coverPageRef} 
          id="coverPage" 
          className="cover-page"
        >
          <div className='cover-inner'>
            <div className="flex justify-center mb-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/MU_Logo.svg" alt="University Logo" className="h-28 object-contain" />
          </div>
          
          <div className="mb-6">
            <h2 className="report-type">{data.reportType}</h2>
            {data.title && <h1 className="report-title">{data.title}</h1>}
          </div>
          
          <div className="course-section space-y-1">
            <p className="course-info">
              <span className="font-bold">Course Name:</span> {data.courseName}
            </p>
            <p className="course-info">
              <span className="font-bold">Course Code:</span> {data.courseCode}
            </p>
          </div>

          
          <div className="mb-8">
            <p className="section-title">Submitted to:</p>
            {faculty && (
              <div>
                <p className="faculty-name">{faculty.name}</p>
                <p className="faculty-position">{faculty.position}</p>
                <p className="department-text">Department of {faculty.department},</p>
                <p className="university-text">Metropolitan University, Sylhet.</p>

              </div>
            )}
          </div>
          
          <div className="mb-24">
            <p className="section-title">Submitted by:</p>
            <div>
              <p className="student-name">{data.studentName}</p>
              <p className="mb-1">ID: {data.studentId}</p>
              <p className="mb-1">Batch: {data.batch}, Section: {data.section}</p>
              <p className="department-text">Department of {department?.name},</p>
              <p className="university-text">Metropolitan University, Sylhet.</p>

            </div>
          </div>
          
          <div className="submission-date">
            <p><span className="font-bold">Date of submission:</span> {format(data.submissionDate, "dd-MM-yyyy")}</p>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};
