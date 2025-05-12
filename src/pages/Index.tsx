
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoverPageForm, CoverPageData } from "@/components/CoverPageForm";
import { CoverPagePreview } from "@/components/CoverPagePreview";

const Index = () => {
  const [coverPageData, setCoverPageData] = useState<CoverPageData | null>(null);
  const [activeTab, setActiveTab] = useState("form");

  const handleFormSubmit = (data: CoverPageData) => {
    setCoverPageData(data);
    setActiveTab("preview");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-6 md:mb-10">
  <div className="flex items-center justify-center gap-3">
    <h1 className="text-3xl md:text-3xl font-bold text-navy">The Cover Cat</h1>
    <img
      src="https://www.shutterstock.com/image-vector/vector-cat-face-minimalist-adorable-600nw-2426797721.jpg"
      alt="Cat Logo"
      className="w-10 h-10 object-cover rounded-full"
    />
  </div>
  <p className="text-gray-600 mt-2">
    Create cover pages for your assignments and reports
  </p>
</header>




        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="form">Input Details</TabsTrigger>
              <TabsTrigger value="preview" disabled={!coverPageData}>
                Preview Cover Page
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="bg-white rounded-lg shadow">
              <CoverPageForm onFormSubmit={handleFormSubmit} />
            </TabsContent>
            
            <TabsContent value="preview" className="bg-white rounded-lg shadow p-6">
              {coverPageData && <CoverPagePreview data={coverPageData} />}
            </TabsContent>
          </Tabs>
        </div>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          TheCoverCat © 2025 – Built by{" "}
          <a
            href="https://linktr.ee/abidshahriar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Abid Shahriar 
          </a>  
          
        </p>
      </footer>

      </div>
    </div>
  );
};

export default Index;
