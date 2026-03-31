$(() => {
  // Configuration constants
  const backendURL = 'http://localhost:5020/';

  // State management object
  const state = {
    retryButtonVisible: false,
  };

  // Initialize DataGrid with modern configuration
  $('#grid-container').dxDataGrid({
    dataSource: employees,
    keyExpr: 'ID',
    showBorders: true,
    editing: {
      mode: 'popup',
      allowUpdating: true,
      popup: {
        title: 'Employee Info',
        showTitle: true,
        width: 700,
      },
      form: {
        items: [{
          itemType: 'group',
          colCount: 2,
          colSpan: 2,
          items: ['Prefix', 'FirstName', 'LastName', 'Position', 'BirthDate', 'HireDate'],
        }, {
          itemType: 'group',
          colCount: 2,
          colSpan: 2,
          caption: 'Photo',
          items: [{
            dataField: 'Picture',
            colSpan: 2,
          }],
        }],
      },
    },
    columns: [{
      dataField: 'Picture',
      width: 70,
      allowFiltering: false,
      allowSorting: false,
      cellTemplate: createCellTemplate,
      editCellTemplate: createEditCellTemplate,
    }, {
      dataField: 'Prefix',
      caption: 'Title',
      width: 70,
    },
    'FirstName',
    'LastName',
    'Position',
    {
      dataField: 'BirthDate',
      dataType: 'date',
    }, {
      dataField: 'HireDate',
      dataType: 'date',
    },
    ],
    onEditCanceled() {
      if (state.retryButtonVisible) {
        state.retryButtonVisible = false;
      }
    },
    onSaved() {
      if (state.retryButtonVisible) {
        state.retryButtonVisible = false;
      }
    },
  });

  /**
   * Creates cell template for displaying employee pictures
   * @param {HTMLElement} container - The container element
   * @param {Object} options - Cell data options
   */
  function createCellTemplate(container, options) {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', `${backendURL}${options.value}`);
    imgElement.setAttribute('alt', 'employee pic');
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto';
    container.append(imgElement);
  }

  /**
   * Creates edit cell template with FileUploader functionality
   * @param {HTMLElement} cellElement - The cell element
   * @param {Object} cellInfo - Cell information object
   */
  function createEditCellTemplate(cellElement, cellInfo) {
    // Create container elements
    const container = document.createElement('div');
    container.className = 'file-uploader-container';

    const imageElement = document.createElement('img');
    imageElement.className = 'uploaded-image';
    imageElement.setAttribute('src', `${backendURL}${cellInfo.value}`);
    imageElement.setAttribute('alt', 'employee pic');

    const fileUploaderElement = document.createElement('div');
    const buttonElement = document.createElement('div');
    buttonElement.className = 'retry-button';

    // Append elements to container
    container.append(imageElement);
    container.append(fileUploaderElement);
    container.append(buttonElement);
    cellElement.append(container);

    // Initialize retry button
    const retryButton = $(buttonElement).dxButton({
      text: 'Retry',
      visible: state.retryButtonVisible,
      onClick() {
        // The retry UI/API is not implemented. Use a private API as shown at T611719.
        try {
          if (fileUploader && fileUploader._files) {
            for (let i = 0; i < fileUploader._files.length; i += 1) {
              delete fileUploader._files[i].uploadStarted;
            }
            fileUploader.upload();
          }
        } catch (error) {
          DevExpress.ui.notify('Error during retry:', 'error', 1000);
        }
      },
    }).dxButton('instance');

    // Initialize FileUploader with proper error handling
    const fileUploader = $(fileUploaderElement).dxFileUploader({
      multiple: false,
      accept: 'image/*',
      uploadMode: 'instantly',
      uploadUrl: `${backendURL}FileUpload/post`,
      onValueChanged(e) {
        if (e.value && e.value.length > 0) {
          const reader = new FileReader();
          reader.onload = function (args) {
            if (args.target && args.target.result) {
              imageElement.setAttribute('src', args.target.result);
            }
          };
          reader.onerror = function () {
            DevExpress.ui.notify('Error reading file', 'error', 1000);
          };
          reader.readAsDataURL(e.value[0]); // convert to base64 string
        }
      },
      onUploaded(e) {
        if (e.request && e.request.responseText) {
          cellInfo.setValue(`images/employees/${e.request.responseText}`);
          state.retryButtonVisible = false;
          retryButton.option('visible', false);
        }
      },
      onUploadError(e) {
        const httpRequest = e.request;
        if (httpRequest) {
          if (httpRequest.status === 400) {
            e.message = e.error ? e.error.responseText : 'Upload error';
          }
          if (httpRequest.readyState === 4 && httpRequest.status === 0) {
            e.message = 'Connection refused';
          }
        }
        state.retryButtonVisible = true;
        retryButton.option('visible', true);
      },
    }).dxFileUploader('instance');
  }
});
