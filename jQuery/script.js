$(function () {
  $("#gridContainer").dxDataGrid({
    dataSource: employees,
    keyExpr: "ID",
    showBorders: true,
    editing: {
      mode: "popup",
      allowUpdating: true
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
  $("<div>")
    .append($("<img>", { "src": backendURL + options.value }))
    .appendTo(container);
}

function editCellTemplate(cellElement, cellInfo) {
  return $("<div>").dxFileUploader({
    multiple: false,
    accept: "image/*",
    uploadMode: "instantly",
    uploadUrl: backendURL + "FileUpload/post",
    onValueChanged: function (e) {
      var url = e.component.option("uploadUrl");
      let uuid = uuidv4();
      console.log(uuid);
      url = updateQueryStringParameter(url, "fileGuid", uuid);
      e.component.option("uploadUrl", url);
      cellInfo.setValue("images/employees/" + uuid + ".png")
    }
  });
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
