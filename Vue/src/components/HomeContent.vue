<script setup lang="ts">
import { ref } from "vue";

import "devextreme/dist/css/dx.material.blue.light.compact.css";

import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxPopup,
  DxForm,
} from "devextreme-vue/data-grid";
import DxFileUploader from "devextreme-vue/file-uploader";
import { DxItem } from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";

import type {
  UploadedEvent,
  UploadErrorEvent,
  ValueChangedEvent,
} from "devextreme/ui/file_uploader";
import type {
  ColumnEditCellTemplateData,
  EditCanceledEvent,
  SavedEvent,
} from "devextreme/ui/data_grid";
import type { ClickEvent } from "devextreme/ui/button";
import { employees } from "../data";

const backendURL = "http://localhost:5000/";

const fileUploaderRef = ref<DxFileUploader>();
const imageRef = ref<HTMLImageElement | null>(null);

const retryButtonVisible = ref(false);

function onClick(_e: ClickEvent): void {
  // The retry UI/API is not implemented. Use the private API as shown at T611719.
  const fileUploaderInstance = fileUploaderRef.value?.instance;
  // @ts-ignore
  for (let i = 0; i < fileUploaderInstance._files.length; i++) {
    // @ts-ignore
    delete fileUploaderInstance._files[i].uploadStarted;
  }
  fileUploaderInstance?.upload();
}

function onValueChanged(e: ValueChangedEvent): void {
  const reader: FileReader = new FileReader();
  reader.onload = (args) => {
    if (typeof args.target?.result === "string" && imageRef?.value) {
      imageRef.value.src = args.target.result;
    }
  };
  reader.readAsDataURL(e.value![0]); // convert to base64 string
}

const onUploaded =
  (cellInfo: ColumnEditCellTemplateData) => (e: UploadedEvent) => {
    cellInfo.setValue("images/employees/" + e.request.responseText);
    retryButtonVisible.value = false;
  };

const onUploadError = (e: UploadErrorEvent) => {
  const xhttp = e.request;
  if (xhttp.status === 400) {
    e.message = e.error.responseText;
  }
  if (xhttp.readyState === 4 && xhttp.status === 0) {
    e.message = "Connection refused";
  }
  retryButtonVisible.value = true;
};

function onEditCanceled(_e: EditCanceledEvent): void {
  if (retryButtonVisible.value) {
    retryButtonVisible.value = false;
  }
}

function onSaved(_e: SavedEvent): void {
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
      <DxEditing :allow-updating="true" mode="popup">
        <DxPopup :show-title="true" :width="700" title="Employee Info">
        </DxPopup>
        <DxForm>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="Prefix" />
            <DxItem data-field="FirstName" />
            <DxItem data-field="LastName" />
            <DxItem data-field="Position" />
            <DxItem data-field="BirthDate" />
            <DxItem data-field="HireDate" />
          </DxItem>
          <DxItem
            :col-count="2"
            :col-span="2"
            item-type="group"
            caption="Photo"
          >
            <DxItem data-field="Picture" :col-span="2" />
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
      <DxColumn data-field="Prefix" :width="70" caption="Title" />
      <DxColumn data-field="FirstName" />
      <DxColumn data-field="LastName" />
      <DxColumn data-field="Position" />
      <DxColumn data-field="BirthDate" data-type="date" />
      <DxColumn data-field="HireDate" data-type="date" />
      <template #cellTemplate="{ data }">
        <img :src="backendURL + data.value" />
      </template>
      <template #editCellTemplate="{ data }">
        <div>
          <img
            ref="imageRef"
            class="uploadedImage"
            :src="backendURL + data.value"
          />
          <DxFileUploader
            :ref="fileUploaderRef"
            :multiple="false"
            accept="image/*"
            upload-mode="instantly"
            :upload-url="backendURL + 'FileUpload/post'"
            @value-changed="onValueChanged"
            @uploaded="onUploaded"
            @upload-error="onUploadError"
          />
          <DxButton
            class="retryButton"
            text="Retry"
            :visible="retryButtonVisible"
            @click="onClick"
          />
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>
<style scoped>
#gridContainer {
  min-height: 530px;
  width: 1000px;
}

.dx-row img {
  height: 50px;
}

.buttonClear {
  margin-left: 7px;
}

.uploadedImage {
  height: 50px;
  margin-left: 7px;
  margin-bottom: 7px;
}
</style>
