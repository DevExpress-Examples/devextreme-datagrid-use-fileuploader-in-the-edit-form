<script setup lang="ts">
import { ref, type Ref } from 'vue';

import 'devextreme/dist/css/dx.material.blue.light.compact.css';

import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxPopup,
  DxForm,
  type DxDataGridTypes,
} from 'devextreme-vue/data-grid';
import DxFileUploader, { type DxFileUploaderTypes } from 'devextreme-vue/file-uploader';
import { DxItem } from 'devextreme-vue/form';
import DxButton from 'devextreme-vue/button';

import { employees, type Employee } from '../data';
import { backendURL } from '../constants';

// Reactive refs
const fileUploaderRef: Ref<InstanceType<typeof DxFileUploader> | null> = ref(null);
const imageRef: Ref<HTMLImageElement | null> = ref(null);
const retryButtonVisible = ref<boolean>(false);

// Event handlers with proper typing
function onClick(): void {
  // The retry UI/API is not implemented. Use the private API as shown at T611719.
  const fileUploaderInstance = fileUploaderRef.value?.instance;
  if (fileUploaderInstance) {
    // @ts-expect-error: Accessing private API for retry functionality
    for (let i = 0; i < fileUploaderInstance._files.length; i++) {
      // @ts-expect-error: Accessing private API for retry functionality
      delete fileUploaderInstance._files[i].uploadStarted;
    }
    fileUploaderInstance.upload();
  }
}

function onValueChanged(e: DxFileUploaderTypes.ValueChangedEvent): void {
  if (e.value && e.value.length > 0) {
    const reader = new FileReader();
    reader.onload = (args) => {
      if (typeof args.target?.result === 'string' && imageRef.value) {
        imageRef.value.src = args.target.result;
      }
    };
    reader.readAsDataURL(e.value[0]); // convert to base64 string
  }
}

// Higher-order function for upload success handler
const createUploadedHandler = (
  cellInfo: DxDataGridTypes.ColumnEditCellTemplateData<Employee, number>
) =>
  (e: DxFileUploaderTypes.UploadedEvent): void => {
    if (e.request?.responseText) {
      cellInfo.setValue(`images/employees/${e.request.responseText}`);
      retryButtonVisible.value = false;
    }
  };

function onUploadError(e: DxFileUploaderTypes.UploadErrorEvent): void {
  const xhttp = e.request;
  if (xhttp && xhttp.status === 400) {
    e.message = e.error?.responseText || 'Upload error';
  }
  if (xhttp && xhttp.readyState === 4 && xhttp.status === 0) {
    e.message = 'Connection refused';
  }
  retryButtonVisible.value = true;
}

function onEditCanceled(): void {
  if (retryButtonVisible.value) {
    retryButtonVisible.value = false;
  }
}

function onSaved(): void {
  if (retryButtonVisible.value) {
    retryButtonVisible.value = false;
  }
}
</script>

<template>
  <div>
    <DxDataGrid
      id="gridContainer"
      :data-source="employees"
      key-expr="ID"
      :show-borders="true"
      @saved="onSaved"
      @edit-canceled="onEditCanceled"
    >
      <DxEditing
        :allow-updating="true"
        mode="popup"
      >
        <DxPopup
          :show-title="true"
          :width="700"
          title="Employee Info"
        />
        <DxForm>
          <DxItem
            :col-count="2"
            :col-span="2"
            item-type="group"
          >
            <DxItem data-field="Prefix"/>
            <DxItem data-field="FirstName"/>
            <DxItem data-field="LastName"/>
            <DxItem data-field="Position"/>
            <DxItem data-field="BirthDate"/>
            <DxItem data-field="HireDate"/>
          </DxItem>
          <DxItem
            :col-count="2"
            :col-span="2"
            item-type="group"
            caption="Photo"
          >
            <DxItem
              data-field="Picture"
              :col-span="2"
            />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn
        data-field="Picture"
        :width="70"
        :allow-sorting="false"
        cell-template="cellTemplate"
        edit-cell-template="editCellTemplate"
      />
      <DxColumn
        data-field="Prefix"
        :width="70"
        caption="Title"
      />
      <DxColumn data-field="FirstName"/>
      <DxColumn data-field="LastName"/>
      <DxColumn data-field="Position"/>
      <DxColumn
        data-field="BirthDate"
        data-type="date"
      />
      <DxColumn
        data-field="HireDate"
        data-type="date"
      />

      <!-- Cell template for displaying images -->
      <template #cellTemplate="{ data }">
        <img
          :src="backendURL + data.value"
          alt="employee pic"
          style="max-width: 100%; height: auto;"
        >
      </template>

      <!-- Edit cell template for file upload -->
      <template #editCellTemplate="{ data }">
        <div class="file-uploader-container">
          <img
            ref="imageRef"
            class="uploaded-image"
            :src="backendURL + data.value"
            alt="employee pic"
          >
          <DxFileUploader
            ref="fileUploaderRef"
            :multiple="false"
            accept="image/*"
            upload-mode="instantly"
            :upload-url="backendURL + 'FileUpload/post'"
            @value-changed="onValueChanged"
            :on-uploaded="createUploadedHandler(data)"
            @upload-error="onUploadError"
          />
          <DxButton
            class="retry-button"
            :visible="retryButtonVisible"
            @click="onClick"
          >
            Retry
          </DxButton>
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>

<style scoped>
#gridContainer {
  min-height: 530px;
  width: 100%;
  max-width: 1000px;
}

.dx-row img {
  height: 50px;
  object-fit: cover;
}

.file-uploader-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.uploaded-image {
  max-width: 150px;
  max-height: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  object-fit: cover;
}

.retry-button {
  margin-top: 10px;
  align-self: flex-start;
}
</style>
