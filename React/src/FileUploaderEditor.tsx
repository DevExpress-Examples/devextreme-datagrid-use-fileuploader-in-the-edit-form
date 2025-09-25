import React, { useRef, useCallback, type Dispatch, type SetStateAction } from "react";
import { type FileUploaderRef } from "devextreme-react/file-uploader";
import Button from "devextreme-react/button";
import { FileUploaderWithPreview } from "./FileUploaderWithPreview";
import { backendURL } from "./constants";
import type { DataGridTypes } from "devextreme-react/data-grid";
import type { Employee } from "./data";

interface FileUploaderEditorProps {
  cellInfo: DataGridTypes.ColumnEditCellTemplateData<Employee, number>;
  setRetryButtonVisible: Dispatch<SetStateAction<boolean>>;
  retryButtonVisible: boolean;
}

export const cellRender = (data: DataGridTypes.ColumnCellTemplateData<Employee, number>): JSX.Element => {
  return <img src={backendURL + data.value} alt="employee pic" style={{ maxWidth: '100%', height: 'auto' }} />;
};

export const FileUploaderEditor = React.memo<FileUploaderEditorProps>(({ 
  cellInfo, 
  setRetryButtonVisible, 
  retryButtonVisible 
}) => {
  const fileUploaderRef = useRef<FileUploaderRef>(null);
  
  const onClick = useCallback((): void => {
    // The retry UI/API is not implemented. Use a private API as shown at T611719.
    const fileUploaderInstance = fileUploaderRef.current?.instance();
    if (fileUploaderInstance) {
      // @ts-expect-error: Accessing private API for retry functionality
      for (let i = 0; i < fileUploaderInstance._files.length; i++) {
        // @ts-expect-error: Accessing private API for retry functionality
        delete fileUploaderInstance._files[i].uploadStarted;
      }
      fileUploaderInstance.upload();
    }
  }, []);

  return (
    <>
      <FileUploaderWithPreview 
        setRetryButtonVisible={setRetryButtonVisible} 
        cellInfo={cellInfo} 
        fileUploaderRef={fileUploaderRef} 
      />
      <Button 
        className="retryButton" 
        text="Retry" 
        visible={retryButtonVisible} 
        onClick={onClick} 
      />
    </>
  );
});

FileUploaderEditor.displayName = 'FileUploaderEditor';