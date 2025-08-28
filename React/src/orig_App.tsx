import { useState } from 'react';
import { useEvent } from './utils';
import DataGrid, { Column, Editing, Popup, Form } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import { cellRender, FileUploaderEditor } from './FileUploaderEditor';

import { employees } from './data';

import { ColumnEditCellTemplateData, EditCanceledEvent, SavedEvent } from 'devextreme/ui/data_grid';


function App() {

  const [retryButtonVisible, setRetryButtonVisible] = useState(false);

  const onEditCanceled = useEvent((e: EditCanceledEvent) => {
    if (retryButtonVisible)
      setRetryButtonVisible(false);
  })

  const onSaved = useEvent((e: SavedEvent) => {
    if (retryButtonVisible)
      setRetryButtonVisible(false);
  })
  const editCellRender = useEvent((cellInfo: ColumnEditCellTemplateData) => <FileUploaderEditor cellInfo={cellInfo} retryButtonVisible={retryButtonVisible} setRetryButtonVisible={setRetryButtonVisible} />)

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
