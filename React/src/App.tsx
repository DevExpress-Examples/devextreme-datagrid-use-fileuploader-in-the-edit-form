import { useState, useCallback, useRef } from 'react';
import { useEvent } from './utils';
import DataGrid, { Column, Editing, Popup, Form } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import Button from 'devextreme-react/button';
import FileUploader from 'devextreme-react/file-uploader';

import { Employee, employees } from './data';

import { UploadedEvent, UploadErrorEvent, ValueChangedEvent } from 'devextreme/ui/file_uploader';
import { ColumnCellTemplateData, ColumnEditCellTemplateData, EditCanceledEvent, SavedEvent } from 'devextreme/ui/data_grid';
import { ClickEvent } from 'devextreme/ui/button';

const backendURL = "http://localhost:5000/";

const cellRender = (data: ColumnCellTemplateData) => {
  return <img src={backendURL + data.value} alt="employee pic" />;
}

function App() {

  const [retryButtonVisible, setRetryButtonVisible] = useState(false);

  const fileUploaderRef = useRef<FileUploader>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onValueChanged = (e: ValueChangedEvent) => {
    const reader = new FileReader();
    reader.onload = function (args) {
      if (typeof args.target?.result === 'string') {
        imgRef.current?.setAttribute('src', args.target.result);
      }
    }
    reader.readAsDataURL(e.value![0]); // convert to base64 string 

  };
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

  const onUploaded = useCallback((e: UploadedEvent, cellInfo: ColumnEditCellTemplateData) => {

    cellInfo.setValue("images/employees/" + e.request.responseText);
    setRetryButtonVisible(false);
  }, []);

  const onUploadError = useCallback((e: UploadErrorEvent) => {
    let xhttp = e.request;
    if (xhttp.status === 400) {
      e.message = e.error.responseText;
    }
    if (xhttp.readyState === 4 && xhttp.status === 0) {
      e.message = "Connection refused";
    }
    setRetryButtonVisible(true);
  }, []);

  const onEditCanceled = useEvent((e: EditCanceledEvent) => {
    if (retryButtonVisible)
      setRetryButtonVisible(false);
  })

  const onSaved = useEvent((e: SavedEvent) => {
    if (retryButtonVisible)
      setRetryButtonVisible(false);
  })

  const editCellRender = useCallback((cellInfo: ColumnEditCellTemplateData) => {
    return (
      <>
        <img ref={imgRef} className="uploadedImage" src={`${backendURL}${cellInfo.value}`} alt="employee pic" />
        <FileUploader ref={fileUploaderRef} multiple={false} accept="image/*" uploadMode="instantly"
          uploadUrl={backendURL + "FileUpload/post"} onValueChanged={onValueChanged}
          onUploaded={e => onUploaded(e, cellInfo)} onUploadError={onUploadError} />
        <Button className={"retryButton"} text="Retry" visible={retryButtonVisible} onClick={onClick} />
      </>
    );
  }, [onClick, onUploadError, onUploaded, retryButtonVisible]);

  return (
    <DataGrid id="gridContainer"
      dataSource={employees}
      keyExpr={"ID"}
      showBorders={true}
      onEditCanceled={onEditCanceled}
      onSaved={onSaved}
    >
      <Editing
        mode="popup"
        allowUpdating={true}>
        <Popup title="Employee Info" showTitle={true} width={700} />
        <Form>
          <Item itemType="group" colCount={2} colSpan={2}>
            <Item dataField="Prefix" />
            <Item dataField="FirstName" />
            <Item dataField="LastName" />
            <Item dataField="Position" />
            <Item dataField="BirthDate" />
            <Item dataField="HireDate" />
          </Item>
          <Item itemType="group" caption="Photo" colCount={2} colSpan={2}>
            <Item dataField="Picture" colSpan={2} />
          </Item>
        </Form>
      </Editing>
      <Column dataField="Picture"
        width={70}
        allowSorting={false}
        cellRender={cellRender}
        editCellRender={editCellRender}
      />
      <Column dataField="Prefix"
        width={70}
        caption="Title"
      />
      <Column dataField="FirstName" />
      <Column dataField="LastName" />
      <Column dataField="Position" />
      <Column dataField="BirthDate" dataType="date" />
      <Column dataField="HireDate" dataType="date" />
    </DataGrid>
  );
}

export default App;
