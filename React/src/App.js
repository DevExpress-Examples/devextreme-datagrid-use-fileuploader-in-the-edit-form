import React, {useState, useCallback} from 'react';
import DataGrid, {Column, Editing, Popup, Form} from 'devextreme-react/data-grid';
import {Item} from 'devextreme-react/form';
import Button from 'devextreme-react/button';
import FileUploader from 'devextreme-react/file-uploader';

import {employees} from './data.js';

const backendURL = "http://localhost:5000/";
let fileUploaderRef = React.createRef();
let imgRef = React.createRef();

const cellRender = data => {
  return <img src={backendURL + data.value} alt="employee pic"/>;
}

const onClick = e => {
  // The retry UI/API is not implemented. Use a private API as shown at T611719.
  const fileUploaderInstance = fileUploaderRef.current.instance;
  for (let i = 0; i < fileUploaderInstance._files.length; i++) {
    delete fileUploaderInstance._files[i].uploadStarted;
  }
  fileUploaderInstance.upload();
};

const onValueChanged = e => {
  const reader = new FileReader();
  reader.onload = function (args) {
    imgRef.current.setAttribute('src', args.target.result);
  }
  reader.readAsDataURL(e.value[0]); // convert to base64 string
};

function App(props) {
  const [retryButtonVisible, setRetryButtonVisible] = useState(false);

  function editCellRender(cellInfo) {
    return (
      <>
        <img ref={imgRef} className="uploadedImage" src={backendURL + cellInfo.value} alt="employee pic"/>
        <FileUploader ref={fileUploaderRef} multiple={false} accept="image/*" uploadMode="instantly"
                      uploadUrl={backendURL + "FileUpload/post"} onValueChanged={onValueChanged}
                      onUploaded={e => onUploaded(e, cellInfo)} onUploadError={onUploadError}/>
        <Button className={"retryButton"} text="Retry" visible={retryButtonVisible} onClick={onClick}/>
      </>
    );
  }

  const onUploaded = useCallback((e, cellInfo) => {
    cellInfo.setValue("images/employees/" + e.request.responseText);
    setRetryButtonVisible(false);
  }, []);

  const onUploadError = useCallback(e => {
    let xhttp = e.request;
    if (xhttp.status === 400) {
      e.message = e.error.responseText;
    }
    if (xhttp.readyState === 4 && xhttp.status === 0) {
      e.message = "Connection refused";
    }
    setRetryButtonVisible(true);
  }, []);

  const onEditCanceled = useCallback(e => {
    if (retryButtonVisible)
      setRetryButtonVisible(false);
  }, [retryButtonVisible])

  const onSaved = useCallback(e => {
    if (retryButtonVisible)
      setRetryButtonVisible(false);
  }, [retryButtonVisible])

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
        <Popup title="Employee Info" showTitle={true} width={700}/>
        <Form>
          <Item itemType="group" colCount={2} colSpan={2}>
            <Item dataField="Prefix"/>
            <Item dataField="FirstName"/>
            <Item dataField="LastName"/>
            <Item dataField="Position"/>
            <Item dataField="BirthDate"/>
            <Item dataField="HireDate"/>
          </Item>
          <Item itemType="group" caption="Photo" colCount={2} colSpan={2}>
            <Item dataField="Picture" colSpan={2}/>
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
      <Column dataField="FirstName"/>
      <Column dataField="LastName"/>
      <Column dataField="Position"/>
      <Column dataField="BirthDate" dataType="date"/>
      <Column dataField="HireDate" dataType="date"/>
    </DataGrid>
  );
}

export default App;
