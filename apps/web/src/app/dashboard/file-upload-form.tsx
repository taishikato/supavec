"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function FileUploadForm({ apiKey }: { apiKey: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFiles([]);
    setError(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const response = await fetch(`${API_URL}/upload_file`, {
        method: "POST",
        headers: {
          authorization: apiKey,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to process file");
      }

      console.log("File processed successfully:", result);
      setFiles([]);
      router.refresh();
      toast.success("File processed successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      setError(
        error instanceof Error ? error.message : "Failed to upload file"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the file here"
            : "Drag 'n' drop a PDF or text file here (max 20MB), or click to select one"}
        </p>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between p-2 rounded bg-muted/50">
            <div className="flex items-center">
              <File className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium">{files[0].name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing file...
              </>
            ) : (
              "Upload file"
            )}
          </Button>
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
