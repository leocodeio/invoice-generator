"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";

export const ImportState = () => {
  const { reset } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          
          // Reset form with the imported data
          reset(data);
          
          // Update local storage step if present
          if (data.step) {
            localStorage.setItem("step", data.step);
          }
          
          // Reset the input so the same file can be uploaded again if needed
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } catch (error) {
          console.error("Failed to parse JSON file:", error);
          alert("Invalid JSON file. Please provide a valid invoice state file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const onImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={onImportClick}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Import State
      </Button>
    </div>
  );
};
