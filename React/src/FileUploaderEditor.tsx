import React, { useRef, useCallback, Dispatch, SetStateAction } from "react";

import FileUploader from "devextreme-react/file-uploader";
import Button from "devextreme-react/button";
import { FileUploaderWithPreview } from "./FileUploaderWithPreview";

import { backendURL } from "./constants";

import { ColumnEditCellTemplateData, ColumnCellTemplateData } from "devextreme/ui/data_grid";
import { ClickEvent } from 'devextreme/ui/button';

type FileUploaderEditorProps = {
    cellInfo: ColumnEditCellTemplateData,
    setRetryButtonVisible: Dispatch<SetStateAction<boolean>>,
    retryButtonVisible: boolean
}

export const cellRender = (data: ColumnCellTemplateData) => {
    return <img src={backendURL + data.value} alt="employee pic" />;
}

export const FileUploaderEditor = React.memo(({ cellInfo, setRetryButtonVisible, retryButtonVisible }: FileUploaderEditorProps) => {
    const fileUploaderRef = useRef<FileUploader>(null);
      
    const onClick = useCallback((e: ClickEvent) => {
        // The retry UI/API is not implemented. Use a private API as shown at T611719.
        const fileUploaderInstance = fileUploaderRef.current?.instance;
        //@ts-ignore
        for (let i = 0; i < fileUploaderInstance._files.length; i++) {
            //@ts-ignore
            delete fileUploaderInstance._files[i].uploadStarted;
        }
        fileUploaderInstance?.upload();
    }, []);

    return (
        <>
            <FileUploaderWithPreview setRetryButtonVisible={setRetryButtonVisible} cellInfo={cellInfo} fileUploaderRef={fileUploaderRef} />
            <Button className={"retryButton"} text="Retry" visible={retryButtonVisible} onClick={onClick} />
        </>
    );
});