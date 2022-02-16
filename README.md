<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/337810507/20.2.5%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T972708)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# DataGrid - How to use the DevExtreme FileUploader in the edit form

This example illustrates how to use the [FileUploader](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxFileUploader/) component in the [DataGrid's](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/) edit form. 

![DevExtreme DataGrid - How to use the DevExtreme FileUploader in the edit form](/images/overview.png)
## Files to Look At:

- **jQuery**
    - [index.html](jQuery/index.html)
    - [script.js](jQuery/script.js)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **Vue**
    - [App.vue](Vue/src/App.vue)
- **React**
    - [App.js](React/src/App.js)
- **ASP.Net Core**    
    - [Index.cshtml](ASP.NET%20Core/ASP.NET%20Core/Views/Home/Index.cshtml)

## Implementation Details

The example consists of the backend service ([BackendApp](BackendApp)) and a client-side application (jQuery/Angular/React/Vue).

The **backend service** accepts POST requests from the [FileUploader](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxFileUploader/) component, saves uploaded images, and hosts static files. 

The **client-side application** displays a page with the [DataGrid](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/) component. The `Picture` field in the grid contains image file names. The [cellTemplate](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/columns/#cellTemplate) property allows you to display images in the column cells as illustrated in the [Column Template](https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/ColumnTemplate/)  demo. Use the [editCellTemplate](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/#editCellTemplate) property to implement the file upload UI for the `Picture` field.

##  How to Launch the Example

First, open and run the `BackendApp` project in Visual Studio. Then, run the client-side application.
