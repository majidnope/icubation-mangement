import { useState } from "react";

function TimeDelay(props) {
  const [element, setElement] = useState(props.compMain);
  setTimeout(() => setElement(''),props.time)

  return element;
}

export default TimeDelay;
