
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Faculty, facultyList } from "@/data/facultyData";
import { Department, departmentList } from "@/data/departmentData";
import { toast } from "sonner";

export interface CoverPageData {
  reportType: string;
  title: string; // Now optional in validation
  courseName: string;
  courseCode: string;
  facultyId: string;
  studentName: string;
  studentId: string;
  batch: string;
  section: string;
  departmentId: string;
  facultyDepartmentId: string; // Added new field to track faculty department separately
  submissionDate: Date;
}

interface CoverPageFormProps {
  onFormSubmit: (data: CoverPageData) => void;
}

const defaultFormData: CoverPageData = {
  reportType: "",
  title: "",
  courseName: "",
  courseCode: "",
  facultyId: "",
  studentName: "",
  studentId: "",
  batch: "",
  section: "",
  departmentId: "",
  facultyDepartmentId: "", // Initialize the new field
  submissionDate: new Date(),
};

const STORAGE_KEY = "universityFormData";

export const CoverPageForm = ({ onFormSubmit }: CoverPageFormProps) => {
  const [formData, setFormData] = useState<CoverPageData>(defaultFormData);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [filteredFacultyList, setFilteredFacultyList] = useState<Faculty[]>(facultyList);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Convert string date back to Date object
        parsedData.submissionDate = new Date(parsedData.submissionDate);
        setFormData(parsedData);
        
        if (parsedData.facultyId) {
          const faculty = facultyList.find(f => f.id === parsedData.facultyId) || null;
          setSelectedFaculty(faculty);
        }

        // Filter faculty list based on saved faculty department
        if (parsedData.facultyDepartmentId) {
          const dept = departmentList.find(d => d.id === parsedData.facultyDepartmentId);
          if (dept) {
            const deptName = dept.name;
            const filtered = facultyList.filter(faculty => faculty.department === deptName);
            setFilteredFacultyList(filtered);
          }
        }
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  // Save to localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (field: keyof CoverPageData, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFacultyDepartmentChange = (departmentId: string) => {
    // Update the form data with the new faculty department
    handleInputChange('facultyDepartmentId', departmentId);
    
    // Clear any previously selected faculty when department changes
    handleInputChange('facultyId', '');
    setSelectedFaculty(null);
    
    // Find the selected department
    const department = departmentList.find(d => d.id === departmentId);
    if (department) {
      // Filter faculty list based on selected department
      const deptFaculty = facultyList.filter(faculty => faculty.department === department.name);
      setFilteredFacultyList(deptFaculty);
    } else {
      // If no department selected, show all faculty
      setFilteredFacultyList(facultyList);
    }
  };

  const handleFacultyChange = (facultyId: string) => {
    const faculty = facultyList.find(f => f.id === facultyId) || null;
    setSelectedFaculty(faculty);
    handleInputChange('facultyId', facultyId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation - title is no longer required
    const requiredFields: Array<keyof CoverPageData> = [
      'reportType', 'courseName', 'courseCode',
      'facultyId', 'studentName', 'studentId', 'batch', 'section', 'departmentId'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields", {
        description: `Missing: ${missingFields.join(', ')}`,
      });
      return;
    }
    
    onFormSubmit(formData);
    toast.success("Cover page generated successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 md:p-6 bg-white rounded-lg shadow">
      <div className="space-y-2">
        <Label htmlFor="reportType">Report Type & Number</Label>
        <Input 
          id="reportType" 
          placeholder="e.g., Assignment No: 1" 
          value={formData.reportType} 
          onChange={(e) => handleInputChange('reportType', e.target.value)} 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title of Work (Optional)</Label>
        <Input 
          id="title" 
          placeholder="e.g., Assignment on Dot & Cross Product" 
          value={formData.title} 
          onChange={(e) => handleInputChange('title', e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="courseName">Course Name</Label>
          <Input 
            id="courseName" 
            placeholder="e.g., Geometry Vector and Analysis" 
            value={formData.courseName} 
            onChange={(e) => handleInputChange('courseName', e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="courseCode">Course Code</Label>
          <Input 
            id="courseCode" 
            placeholder="e.g., MAT123" 
            value={formData.courseCode} 
            onChange={(e) => handleInputChange('courseCode', e.target.value)} 
          />
        </div>
      </div>

      {/* Faculty Department selector */}
      <div className="space-y-2">
        <Label htmlFor="facultyDepartment">Faculty Department</Label>
        <Select 
          value={formData.facultyDepartmentId} 
          onValueChange={handleFacultyDepartmentChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select faculty department" />
          </SelectTrigger>
          <SelectContent>
            {departmentList.map(dept => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name} ({dept.shortName})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Faculty selector that's filtered by the selected department */}
      <div className="space-y-2">
        <Label htmlFor="faculty">Submitted To (Faculty)</Label>
        <Select 
          value={formData.facultyId} 
          onValueChange={handleFacultyChange}
          disabled={!formData.facultyDepartmentId} // Disable if no department selected
        >
          <SelectTrigger>
            <SelectValue placeholder={formData.facultyDepartmentId ? "Select faculty" : "Select faculty department first"} />
          </SelectTrigger>
          <SelectContent>
            {filteredFacultyList.length > 0 ? (
              filteredFacultyList.map(faculty => (
                <SelectItem key={faculty.id} value={faculty.id}>
                  {faculty.name} ({faculty.position})
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>No faculty available for this department</SelectItem>
            )}
          </SelectContent>
        </Select>
        
        {selectedFaculty && (
          <div className="mt-2 text-sm text-gray-600">
            <p>{selectedFaculty.position}</p>
            <p>{selectedFaculty.department}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentName">Student Name</Label>
          <Input 
            id="studentName" 
            placeholder="Your full name" 
            value={formData.studentName} 
            onChange={(e) => handleInputChange('studentName', e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentId">Student ID</Label>
          <Input 
            id="studentId" 
            placeholder="e.g., 232-115-000" 
            value={formData.studentId} 
            onChange={(e) => handleInputChange('studentId', e.target.value)} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="batch">Batch</Label>
          <Input 
            id="batch" 
            placeholder="e.g., 59" 
            value={formData.batch} 
            onChange={(e) => handleInputChange('batch', e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="section">Section</Label>
          <Input 
            id="section" 
            placeholder="e.g., A" 
            value={formData.section} 
            onChange={(e) => handleInputChange('section', e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentDepartment">Student Department</Label>
          <Select 
            value={formData.departmentId} 
            onValueChange={(val) => handleInputChange('departmentId', val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent>
              {departmentList.map(dept => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name} ({dept.shortName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Date of Submission</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.submissionDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.submissionDate ? format(formData.submissionDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.submissionDate}
              onSelect={(date) => handleInputChange('submissionDate', date || new Date())}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full bg-navy hover:bg-navy-light">
        Generate Cover Page
      </Button>
    </form>
  );
};