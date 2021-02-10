# DataGrid - How to use FileUploader in an edit form

This example illustrates a simple scenario on how to use the [dxFileUploader](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxFileUploader/) component in the [dxDataGrid's](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/) edit form. The example consists of two parts. The first part is a backend service written in ASP.NET Core (BackendApp). It accepts POST requests of the FileUploader component, saves uploaded images, and hosts static files. The second part is a client-side application (jQuery/Angular/React/Vue/ASP.NET Core). It displays a page with the DataGrid component.


DataGrid has the `Picture` field which holds an associated image file name. We use [cellTemplate](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/columns/#cellTemplate) to display images as illustrated in the following demo: [Column Template](https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/ColumnTemplate/jQuery/Light/). 

To implement the file upload UI/logic, we use the [onEditorPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onEditorPreparing) event handler and enable the [dxFileUploader](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxFileUploader/) component for the `Picture` field.

The server part for the file uploading is implemented as a separate backend solution located in the [BackendApp](./BackendApp/) directory. 

**Note:** Open the `BackendApp` project in Visual Studio first. When project dependencies are restored, launch it. Then, open/run the client-side part to test the example.