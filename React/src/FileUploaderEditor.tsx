import React, {
  useRef, useCallback, type Dispatch, type SetStateAction,
} from 'react';
import { type FileUploaderRef } from 'devextreme-react/file-uploader';
import Button from 'devextreme-react/button';
import type { DataGridTypes } from 'devextreme-react/data-grid';
import { FileUploaderWithPreview } from './FileUploaderWithPreview';
import { backendURL } from './constants';
import type { Employee } from './data';

interface FileUploaderEditorProps {
  cellInfo: DataGridTypes.ColumnEditCellTemplateData<Employee, number>;
  setRetryButtonVisible: Dispatch<SetStateAction<boolean>>;
  retryButtonVisible: boolean;
}

export function cellRender(data: DataGridTypes.ColumnCellTemplateData<Employee, number>): JSX.Element {
  return <img src={`${backendURL}${data.value as string}`} alt="employee pic" style={{ maxWidth: '100%', height: 'auto' }} />;
}

export const FileUploaderEditor = React.memo<FileUploaderEditorProps>(({
  cellInfo,
  setRetryButtonVisible,
  retryButtonVisible,
}) => {
  const fileUploaderRef = useRef<FileUploaderRef>(null);

  const onClick = useCallback((): void => {
    // The retry UI/API is not implemented. Use a private API as shown at T611719.
    const fileUploaderInstance = fileUploaderRef.current?.instance();
    if (fileUploaderInstance) {
      // @ts-expect-error: Accessing private API for retry functionality
      for (const file of fileUploaderInstance._files) {
        delete file.uploadStarted;
      }
      fileUploaderInstance.upload();
    }
  }, []);

  return (
    <React.Fragment>
      <FileUploaderWithPreview
        setRetryButtonVisible={setRetryButtonVisible}
        cellInfo={cellInfo}
        fileUploaderRef={fileUploaderRef}
      />
      <Button
        className="retry-button"
        text="Retry"
        visible={retryButtonVisible}
        onClick={onClick}
      />
    </React.Fragment>
  );
});

FileUploaderEditor.displayName = 'FileUploaderEditor';
