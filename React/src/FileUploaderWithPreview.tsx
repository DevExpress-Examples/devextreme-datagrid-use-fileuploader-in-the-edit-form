import { useRef, type Dispatch, type SetStateAction, type RefObject, memo } from "react";
import FileUploader, { type FileUploaderRef } from "devextreme-react/file-uploader";
import { useEvent } from "./utils";
import { backendURL } from "./constants";
import type { FileUploaderTypes } from "devextreme-react/file-uploader";
import type { DataGridTypes } from "devextreme-react/data-grid";
import type { Employee } from "./data";

interface FileUploaderPreviewProps {
  cellInfo: DataGridTypes.ColumnEditCellTemplateData<Employee, number>;
  setRetryButtonVisible: Dispatch<SetStateAction<boolean>>;
  fileUploaderRef: RefObject<FileUploaderRef>;
}

export const FileUploaderWithPreview = memo<FileUploaderPreviewProps>(({ 
  setRetryButtonVisible, 
  cellInfo, 
  fileUploaderRef 
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  
  const onValueChanged = useEvent((e: FileUploaderTypes.ValueChangedEvent): void => {
    const files = e.value;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (args) {
        if (typeof args.target?.result === 'string' && imgRef.current) {
          imgRef.current.setAttribute('src', args.target.result);
        }
      };
      reader.readAsDataURL(files[0]); // convert to base64 string 
    }
  });

  const onUploaded = useEvent((e: FileUploaderTypes.UploadedEvent): void => {
    if (e.request?.responseText) {
      cellInfo.setValue("images/employees/" + e.request.responseText);
      setRetryButtonVisible(false);
    }
  });

  const onUploadError = useEvent((e: FileUploaderTypes.UploadErrorEvent): void => {
    const xhttp = e.request;
    if (xhttp && xhttp.status === 400) {
      e.message = e.error?.responseText || "Upload error";
    }
    if (xhttp && xhttp.readyState === 4 && xhttp.status === 0) {
      e.message = "Connection refused";
    }
    setRetryButtonVisible(true);
  });

  return (
    <>
      <img 
        ref={imgRef} 
        className="uploadedImage" 
        src={`${backendURL}${cellInfo.value}`} 
        alt="employee pic" 
        style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
      />
      <FileUploader 
        ref={fileUploaderRef} 
        multiple={false} 
        accept="image/*" 
        uploadMode="instantly"
        uploadUrl={backendURL + "FileUpload/post"} 
        onValueChanged={onValueChanged}
        onUploaded={onUploaded} 
        onUploadError={onUploadError} 
      />
    </>
  );
});

FileUploaderWithPreview.displayName = 'FileUploaderWithPreview';