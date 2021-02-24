import {Component, ViewChild} from '@angular/core';
import {Service, Employee} from './app.service';
import {DxFileUploaderComponent} from 'devextreme-angular/ui/file-uploader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})
export class AppComponent {
  title = 'DataGrid - How to use FileUploader in an edit form';
  employees: Employee[];
  backendURL = 'http://localhost:5000/';
  retryButtonVisible = false;
  @ViewChild('uploadedImage') uploadedImageRef: HTMLImageElement;
  @ViewChild('fileUploader') fileUploaderRef: DxFileUploaderComponent;

  constructor(service: Service) {
    this.employees = service.getEmployees();
  }

  onClick(e: any): void {
    // The retry UI/API is not implemented. Use a private API as shown at T611719.
    const fileUploaderInstance = this.fileUploaderRef.instance;
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < fileUploaderInstance._files.length; i++) {
      // @ts-ignore
      delete fileUploaderInstance._files[i].uploadStarted;
    }
    // @ts-ignore
    fileUploaderInstance._uploadFiles();
  }

  onValueChanged(e: any): void {
    const reader: FileReader = new FileReader();
    reader.onload = (args) => {
      if (typeof args.target.result === 'string') {
        this.uploadedImageRef.src = args.target.result;
      }
    };
    reader.readAsDataURL(e.value[0]); // convert to base64 string
  }

  onUploaded(e: any, cellInfo: any): void {
    cellInfo.setValue('images/employees/' + e.request.responseText);
    this.retryButtonVisible = false;
  }

  onUploadError(e: any): void {
    const xhttp = e.request;
    if (xhttp.status === 400) {
      e.message = e.error.responseText;
    }
    if (xhttp.readyState === 4 && xhttp.status === 0) {
      e.message = 'Connection refused';
    }
    this.retryButtonVisible = true;
  }

  onEditCanceled(e: any): void {
    if (this.retryButtonVisible) {
      this.retryButtonVisible = false;
    }
  }

  onSaved(e: any): void {
    if (this.retryButtonVisible) {
      this.retryButtonVisible = false;
    }
  }
}
