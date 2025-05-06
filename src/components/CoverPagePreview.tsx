
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

  const handleExportPDF = () => {
    // Generate filename based on student name and ID
    const filename = `${data.studentName.replace(/\s+/g, '_')}_${data.studentId}_cover`;
    exportAsPDF("coverPage", filename);
  };

  const handleExportPNG = () => {
    // Generate filename based on student name and ID
    const filename = `${data.studentName.replace(/\s+/g, '_')}_${data.studentId}_cover`;
    exportAsPNG("coverPage", filename);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 justify-center">
        <Button 
          onClick={handleExportPDF} 
          className="bg-navy hover:bg-navy-light"
        >
          Download as PDF
        </Button>
        <Button 
          onClick={handleExportPNG} 
          className="bg-navy hover:bg-navy-light"
        >
          Download as PNG
        </Button>
      </div>
      
      <div ref={coverPageRef} id="coverPage" className="cover-page">
        <div className="flex justify-center mb-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/MU_Logo.svg" alt="University Logo" className="h-28 object-contain" />
        </div>
        
        <div className="mb-6">
          <h2 className="report-type">{data.reportType}</h2>
          {data.title && <h1 className="report-title">{data.title}</h1>}
        </div>
        
        <div className="course-section">
          <p className="course-info"><span className="font-bold">Course Name:</span></p>
          <p className="course-info">{data.courseName}</p>
          <p className="course-info"><span className="font-bold">Course Code:</span></p>
          <p className="course-info">{data.courseCode}</p>
        </div>
        
        <div className="mb-8">
          <p className="section-title">Submitted to:</p>
          {faculty && (
            <div>
              <p className="faculty-name">{faculty.name}</p>
              <p className="faculty-position">{faculty.position}</p>
              <p>{faculty.department},</p>
              <p>Metropolitan University, Sylhet.</p>
            </div>
          )}
        </div>
        
        <div className="mb-24">
          <p className="section-title">Submitted by:</p>
          <div>
            <p className="student-name">{data.studentName}</p>
            <p className="mb-1">ID: {data.studentId}</p>
            <p className="mb-1">Batch: {data.batch}, Section: {data.section}</p>
            <p>Department of {department?.name},</p>
            <p>Metropolitan University, Sylhet.</p>
          </div>
        </div>
        
        <div className="submission-date">
          <p><span className="font-bold">Date of submission:</span> {format(data.submissionDate, "dd-MM-yyyy")}</p>
        </div>
      </div>
    </div>
  );
};
