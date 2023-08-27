import Spinner from "../Spinner/Spinner";
import "./InputPrepend.css";
import { ActionPrependEnum, IconsPrependEnum } from "./InputPrepend.enum";

interface InputPrependProps {
  onChangeState(action: ActionPrependEnum, value: string): void;
  icon: IconsPrependEnum;
  loading: boolean;
  disableInput: boolean;
  disableButton: boolean;
  actionState: ActionPrependEnum;
  link: string;
  onChangeValue: Function;
  children?: any;
}

function InputPrepend(props: InputPrependProps) {
  const onClick = () => {
    props.onChangeState(props.actionState, props.link);
  };

  const onChangeValue = (event: { target: { value: string } }) => {
    props.onChangeValue(event.target.value);
  };

  return (
    <>
      <div>
        {props.children}
        <div className="prepend-container align-center">
          <input
            type="url"
            placeholder="Insira um link para encurtar..."
            disabled={props.disableInput}
            value={props.link}
            onChange={onChangeValue}
            aria-label="Insira um link para encurtar..."
            aria-required="true"
          />

          <button
            className="btn-icon"
            onClick={() => onClick()}
            disabled={props.disableButton}
            aria-label="Clique para encurtar"
          >
            <Spinner loading={props.loading}></Spinner>
            <img
              src={props.icon}
              className="img-icon"
              hidden={props.loading}
              alt="icon action"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default InputPrepend;
