import { Component, ViewChild } from '@angular/core';
import type { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import type { DxFileUploaderTypes } from 'devextreme-angular/ui/file-uploader';
import { DxFileUploaderComponent } from 'devextreme-angular/ui/file-uploader';
import type { DxButtonTypes } from 'devextreme-angular/ui/button';
import { Service, type Employee } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service],
  standalone: false,
})
export class AppComponent {
  title = 'DataGrid - How to use FileUploader in an edit form';

  employees: Employee[];

  backendURL = 'http://localhost:5000/';

  retryButtonVisible = false;

  @ViewChild('uploadedImage') uploadedImageRef!: HTMLImageElement;

  @ViewChild('fileUploader') fileUploaderRef!: DxFileUploaderComponent;

  constructor(service: Service) {
    this.employees = service.getEmployees();
  }

  onClick(_e: DxButtonTypes.ClickEvent): void {
    // The retry UI/API is not implemented. Use the private API as shown at T611719.
    const fileUploaderInstance = this.fileUploaderRef.instance;
    const files = (fileUploaderInstance as any)._files;
    if (files) {
      for (const file of files) {
        delete file.uploadStarted;
      }
    }
    fileUploaderInstance.upload();
  }

  onValueChanged(e: DxFileUploaderTypes.ValueChangedEvent): void {
    if (!e.value || e.value.length === 0) return;

    const reader: FileReader = new FileReader();
    reader.onload = (args): void => {
      if (typeof args.target?.result === 'string') {
        this.uploadedImageRef.src = args.target.result;
      }
    };
    reader.readAsDataURL(e.value[0]); // convert to base64 string
  }

  onUploaded(e: DxFileUploaderTypes.UploadedEvent, cellInfo: DxDataGridTypes.ColumnEditCellTemplateData<Employee, number>): void {
    if (e.request?.responseText) {
      cellInfo.setValue(`images/employees/${e.request.responseText}`);
      this.retryButtonVisible = false;
    }
  }

  onUploadError(e: DxFileUploaderTypes.UploadErrorEvent): void {
    const xhttp = e.request;
    if (xhttp) {
      if (xhttp.status === 400 && e.error?.responseText) {
        e.message = e.error.responseText;
      }
      if (xhttp.readyState === 4 && xhttp.status === 0) {
        e.message = 'Connection refused';
      }
    }
    this.retryButtonVisible = true;
  }

  onEditCanceled(_e: DxDataGridTypes.EditCanceledEvent<Employee, number>): void {
    if (this.retryButtonVisible) {
      this.retryButtonVisible = false;
    }
  }

  onSaved(_e: DxDataGridTypes.SavedEvent<Employee, number>): void {
    if (this.retryButtonVisible) {
      this.retryButtonVisible = false;
    }
  }
}
