$(function () {
  $("#gridContainer").dxDataGrid({
    dataSource: employees,
    keyExpr: "ID",
    showBorders: true,
    editing: {
      mode: "popup",
      allowUpdating: true,
      popup: {
        title: "Employee Info",
        showTitle: true,
        width: 700,
      },
      form: {
        items: [{
          itemType: "group",
          colCount: 2,
          colSpan: 2,
          items: ["Prefix", "FirstName", "LastName", "Position", "BirthDate", "HireDate"]
        }, {
          itemType: "group",
          colCount: 2,
          colSpan: 2,
          caption: "Photo",
          items: [{
            dataField: "Picture",
            colSpan: 2
          }]
        }]
      }
    },
    columns: [{
      dataField: "Picture",
      allowFiltering: false,
      allowSorting: false,
      cellTemplate: cellTemplate,
      editCellTemplate: editCellTemplate
    }, {
      dataField: "Prefix",
      caption: "Title",
      width: 70
    },
      "FirstName",
      "LastName",
      "Position",
      {
        dataField: "BirthDate",
        dataType: "date"
      }, {
        dataField: "HireDate",
        dataType: "date"
      }
    ]
  });
});

let backendURL = "http://localhost:5000/"

function cellTemplate(container, options) {
  let imgElement = document.createElement("img");
  imgElement.setAttribute("src", backendURL + options.value);
  container.append(imgElement);
}

function editCellTemplate(cellElement, cellInfo) {
  let buttonElement = document.createElement("div");
  buttonElement.classList.add("buttonClear");
  let buttonClear = $(buttonElement).dxButton({
    text: "Retry",
    visible: false,
    onClick: function() {
      // The retry UI/API is not implemented. Use a private API as shown at T611719.
      for (var i = 0; i < fileUploader._files.length; i++) {
        delete fileUploader._files[i].uploadStarted;
      }
      fileUploader._uploadFiles();
    }
  }).dxButton("instance");

  let fileUploaderElement = document.createElement("div");
  let fileUploader = $(fileUploaderElement).dxFileUploader({
    multiple: false,
    accept: "image/*",
    uploadMode: "instantly",
    uploadUrl: backendURL + "FileUpload/post",
    onValueChanged: function(e) {
      let reader = new FileReader();
      reader.onload = function(e) {
        imageElement.setAttribute('src', e.target.result);
      }
      reader.readAsDataURL(e.value[0]); // convert to base64 string
    },
    onUploaded: function(e){
      cellInfo.setValue("images/employees/" + e.request.responseText);
      buttonClear.option("visible", false);
    },
    onUploadError: function(e){
      let xhttp = e.request;
      if(xhttp.status === 400){
        e.message = e.error.responseText;
      }
      if(xhttp.readyState == 4 && xhttp.status == 0) {
        e.message = "Connection refused";
      }
      buttonClear.option("visible", true);
    }
  }).dxFileUploader("instance");

  let imageElement = document.createElement("img");
  imageElement.classList.add("uploadedImage");
  imageElement.setAttribute('src', backendURL + cellInfo.value);

  cellElement.append(imageElement);
  cellElement.append(fileUploaderElement);
  cellElement.append(buttonElement);
}
