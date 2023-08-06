import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faGear, faClose } from "@fortawesome/free-solid-svg-icons";

export const App = () => {
  return (
    <div>
      <div>TODO</div>
      <FontAwesomeIcon icon={faCircleQuestion} />
      <FontAwesomeIcon icon={faGear} />
      <FontAwesomeIcon icon={faClose} />
    </div>
  );
};
