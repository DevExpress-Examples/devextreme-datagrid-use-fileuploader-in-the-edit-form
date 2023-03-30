import { useRef, Dispatch, SetStateAction, RefObject, memo } from "react";

import FileUploader from "devextreme-react/file-uploader";

import { useEvent } from "./utils";
import { backendURL } from "./constants";

import { UploadedEvent, UploadErrorEvent, ValueChangedEvent } from 'devextreme/ui/file_uploader';
import { ColumnEditCellTemplateData } from "devextreme/ui/data_grid";


type FileUploaderPreviewProps = {
    cellInfo: ColumnEditCellTemplateData,
    setRetryButtonVisible: Dispatch<SetStateAction<boolean>>,
    fileUploaderRef: RefObject<FileUploader>
}

export const FileUploaderWithPreview = memo(({ setRetryButtonVisible, cellInfo, fileUploaderRef }: FileUploaderPreviewProps) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const onValueChanged = useEvent((e: ValueChangedEvent) => {
        const reader = new FileReader();
        reader.onload = function (args) {
            if (typeof args.target?.result === 'string') {
                imgRef.current?.setAttribute('src', args.target.result);
            }
        }
        reader.readAsDataURL(e.value![0]); // convert to base64 string 

    });

    const onUploaded = useEvent((e: UploadedEvent) => {
        cellInfo.setValue("images/employees/" + e.request.responseText);
        setRetryButtonVisible(false);
    });

    const onUploadError = useEvent((e: UploadErrorEvent) => {
        let xhttp = e.request;
        if (xhttp.status === 400) {
            e.message = e.error.responseText;
        }
        if (xhttp.readyState === 4 && xhttp.status === 0) {
            e.message = "Connection refused";
        }
        setRetryButtonVisible(true);
    });

    return (
        <>
            <img ref={imgRef} className="uploadedImage" src={`${backendURL}${cellInfo.value}`} alt="employee pic" />
            <FileUploader ref={fileUploaderRef} multiple={false} accept="image/*" uploadMode="instantly"
                uploadUrl={backendURL + "FileUpload/post"} onValueChanged={onValueChanged}
                onUploaded={onUploaded} onUploadError={onUploadError} />
        </>)
})
