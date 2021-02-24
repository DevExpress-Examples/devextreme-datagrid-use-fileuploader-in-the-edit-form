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
        >
        </DxPopup>
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
            <DxItem data-field="Picture" :col-span="2"/>
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn
          :allow-sorting="false"
          data-field="Picture"
          cell-template="cellTemplate"
          edit-cell-template="editCellTemplate"
      />
      <DxColumn
          :width="70"
          data-field="Prefix"
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
      <template #cellTemplate="{ data }">
        <img :src="backendURL + data.value">
      </template>
      <template #editCellTemplate="{ data }">
        <div>
        <img :ref="imgRef" class="uploadedImage" :src="backendURL + data.value">
        <DxFileUploader :ref="fileUploaderRef" :multiple="false" accept="image/*" upload-mode="instantly"
                      :upload-url="backendURL + 'FileUpload/post'" @value-changed="onValueChanged"
        @uploaded="(e) => onUploaded(e, data)" @upload-error="onUploadError"/>
        <DxButton class="retryButton" text="Retry" v-model:visible="retryButtonVisible" @click="onClick"/>
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>
<script>
import DxDataGrid, { DxColumn, DxEditing, DxPopup, DxForm } from 'devextreme-vue/data-grid';
import DxFileUploader from 'devextreme-vue/file-uploader';
import { DxItem } from 'devextreme-vue/form';
import DxButton from 'devextreme-vue/button'

import employees from './data.js';

const fileUploaderRef = "fu";
const imgRef = "img"

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxPopup,
    DxForm,
    DxItem,
    DxFileUploader,
    DxButton
  },
  data() {
    return {
      backendURL: "http://localhost:5000/",
      employees: employees,
      retryButtonVisible: false,
      fileUploaderRef,
      imgRef
    };
  },
  methods: {
    onSaved() {
      if(this.retryButtonVisible) {
        this.retryButtonVisible = false;
      }
    },
    onEditCanceled() {
      if(this.retryButtonVisible) {
        this.retryButtonVisible = false;
      }
    },
    onClick() {
      // The retry UI/API is not implemented. Use a private API as shown at T611719.
      for (var i = 0; i < this.fileUploader._files.length; i++) {
        delete this.fileUploader._files[i].uploadStarted;
      }
      this.fileUploader._uploadFiles();
    },
    onValueChanged(e) {
      let reader = new FileReader();
      reader.onload = (args) => {
        this.imageElement.setAttribute('src', args.target.result);
      }
      reader.readAsDataURL(e.value[0]); // convert to base64 string
    },
    onUploaded(e, cellInfo) {
      cellInfo.setValue("images/employees/" + e.request.responseText);
      this.retryButtonVisible = false;
    },
    onUploadError(e) {
      let xhttp = e.request;
      if(xhttp.status === 400){
        e.message = e.error.responseText;
      }
      if(xhttp.readyState == 4 && xhttp.status == 0) {
        e.message = "Connection refused";
      }
      this.retryButtonVisible = true;
    }
  },
  computed: {
    fileUploader: function() {
      return this.$refs[fileUploaderRef].instance;
    },
    imageElement: function() {
      return this.$refs[imgRef];
    }
  }
};
</script>
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
