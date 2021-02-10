# DataGrid - How to use FileUploader in an edit form

This example illustrates a simple scenario on how to use the [dxFileUploader](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxFileUploader/) component an the [dxDataGrid's](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/) edit form. 


DataGrid has the `Picture` field which holds an associated image file name. We use [cellTemplate](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/columns/#cellTemplate) to display images as illustrated in the following demo: [Column Template](https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/ColumnTemplate/jQuery/Light/). 

To implement the file upload UI/logic, we use the [onEditorPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onEditorPreparing) event handler and enable the [dxFileUploader](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxFileUploader/) component for the `Picture` field.

The server part for the file uploading is implemented as a separate backend solution located in the [BackendApp](./BackendApp/) directory. 

**Note:** Open the `BackendApp` project in Visual Studio first. When project dependencies are restored, launch it. Then, open/run the client-side part (jQuery, Angular, React, etc.) to test the example.