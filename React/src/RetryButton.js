import React, { useState, useCallback } from 'react';
import Button from "devextreme-react/button";


function RetryButton(props) {
  const [retryButtonVisible, setRetryButtonVisible] = useState(false);
  <Button className={"retryButton"} text="Retry" visible={retryButtonVisible} onClick={onClick}/>
}

export default RetryButton
