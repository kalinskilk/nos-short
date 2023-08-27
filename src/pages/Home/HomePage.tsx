import { useState } from "react";

import InputPrepend from "../../components/InputPrepend/InputPrepend";
import {
  ActionPrependEnum,
  IconsPrependEnum,
} from "../../components/InputPrepend/InputPrepend.enum";
import ShortService from "../../services/Short.service";
import ToastService from "../../services/Toast.service";
import "./HomePage.css";
import { SUCCESS_COPY_SHORT_LINK, URL_REQUIRED } from "./consts/Index";

function HomePage() {
  const [icon, setIcon] = useState(IconsPrependEnum.SHORT_LINK);
  const [loading, setLoading] = useState(false);
  const [actionState, setActionState] = useState(ActionPrependEnum.SHORT_LINK);
  const [link, setLink] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [showReturn, setShowReturn] = useState(false);

  const validationsLink = () => {
    if (!link.length) {
      ToastService.toastError({ message: URL_REQUIRED });
      throw new Error(URL_REQUIRED);
    }
  };

  const onChangeLink = (event: string) => {
    setLink(event);
  };

  const onChangeState = async (event: ActionPrependEnum, value: string) => {
    if (event === ActionPrependEnum.SHORT_LINK) {
      validationsLink();

      await shortLink();

      setActionState(ActionPrependEnum.COPY_LINK);
    }
    if (event === ActionPrependEnum.COPY_LINK) {
      navigator.clipboard.writeText(link);

      ToastService.toastSuccess({
        message: SUCCESS_COPY_SHORT_LINK,
        timeOut: 4500,
      });

      setActionState(ActionPrependEnum.SUCCESS_LINK);

      setIcon(IconsPrependEnum.SUCCESS_LINK);

      await sleep(5000);

      setActionState(ActionPrependEnum.COPY_LINK);

      setIcon(IconsPrependEnum.COPY_LINK);
    }
    console.log(value);
  };

  const shortLink = async () => {
    try {
      setLoading(true);

      setDisableButton(true);
      setDisableInput(true);

      const newLink = await ShortService.shortLink({
        url: link,
        ttl: 60 * 60 * 24 * 7, // 604800 uma semana
        message: "",
      });

      setLink(newLink.link_url);

      setIcon(IconsPrependEnum.COPY_LINK);

      setLoading(false);
      setDisableButton(false);
      setShowReturn(true);
    } catch (error: any) {
      setLoading(false);

      setDisableButton(false);

      const msg =
        error?.message || "Falha ao encurtar o link. Tente novamente.";
      ToastService.toastError({ message: msg });
      throw new Error(msg);
    }
  };

  const sleep = async (ms = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, ms);
    });
  };

  const clear = () => {
    setShowReturn(false);

    setIcon(IconsPrependEnum.SHORT_LINK);

    setActionState(ActionPrependEnum.SHORT_LINK);

    setDisableButton(false);

    setDisableInput(false);

    setLink("");
  };

  return (
    <>
      <div>
        <InputPrepend
          onChangeState={onChangeState}
          link={link}
          icon={icon}
          loading={loading}
          actionState={actionState}
          onChangeValue={onChangeLink}
          disableInput={disableInput}
          disableButton={!link}
        />

        {showReturn ? (
          <div className="mt-1 align-center" onClick={() => clear()}>
            <label
              className="label-subs label-pointer"
              aria-label="Voltar para encurtar mais links"
            >
              Voltar para encurtar mais links
            </label>
          </div>
        ) : (
          ""
        )}
        <div className="mt-1 align-center">
          <a
            href="list-links"
            className="list-link"
            aria-label="Visualizar os últimos links encurtados"
          >
            <label className="label-subs label-pointer">
              Visualizar os últimos links encurtados
            </label>
          </a>
        </div>
      </div>
    </>
  );
}

export default HomePage;
