import { useState } from "react";

import "./ListLinksPage.css";

import InputPrepend from "../../components/InputPrepend/InputPrepend";
import {
  ActionPrependEnum,
  IconsPrependEnum,
} from "../../components/InputPrepend/InputPrepend.enum";
import LinkDetails from "../../components/LinkDetails/LinkDetails";
import Spinner from "../../components/Spinner/Spinner";
import { ListLinks } from "../../interfaces/ListLinks";
import ShortService from "../../services/Short.service";
import StorageService from "../../services/Storage.service";
import ToastService from "../../services/Toast.service";
import { DESTROYED_LINK, SUCCESS_COPY_SHORT_LINK } from "../Home/consts/Index";

function ListLinksPage() {
  const getLinks = (): ListLinks[] => {
    return StorageService.getLinks()?.map((el) => {
      return {
        ...el,
        actionState: ActionPrependEnum.COPY_LINK,
        icon: IconsPrependEnum.COPY_LINK,
      };
    });
  };

  const [links, updateLinks] = useState(getLinks());

  const onChangeState = async (
    item: ListLinks,
    event: ActionPrependEnum,
    value: string
  ) => {
    if (event === ActionPrependEnum.COPY_LINK) {
      console.log(item);
      navigator.clipboard.writeText(value);

      ToastService.toastSuccess({
        message: SUCCESS_COPY_SHORT_LINK,
        timeOut: 4500,
      });

      links.forEach((el) => {
        if (el.key === item.key) {
          el.actionState = ActionPrependEnum.SUCCESS_LINK;
          el.icon = IconsPrependEnum.SUCCESS_LINK;
        }
      });

      updateLinks([...links]);

      await sleep(5000);

      links.forEach((el) => {
        if (el.key === item.key) {
          el.actionState = ActionPrependEnum.COPY_LINK;
          el.icon = IconsPrependEnum.COPY_LINK;
        }
      });

      updateLinks([...links]);
    }
  };

  const sleep = async (ms = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, ms);
    });
  };

  const onDestroyLink = async (item: ListLinks) => {
    try {
      if (item.removing) {
        return;
      }

      links.forEach((el) => {
        if (el.key === item.key) {
          item.removing = true;
        }
      });

      updateLinks([...links]);

      await ShortService.destroyLink({ key: item.key });

      ToastService.toastSuccess({
        message: DESTROYED_LINK,
        timeOut: 4500,
      });

      updateLinks(getLinks());
    } catch (error: any) {
      ToastService.toastError({ message: error.message });
      item.removing = false;

      links.forEach((el) => {
        if (el.key === item.key) {
          item.removing = false;
        }
      });
      updateLinks(links);
    }
  };

  return (
    <>
      <div>
        {links.map((item, key) => {
          return (
            <>
              <div className="link-container mb-1">
                <InputPrepend
                  onChangeState={(event: ActionPrependEnum, value: string) =>
                    onChangeState(item, event, value)
                  }
                  link={item.link_url}
                  icon={item.icon}
                  loading={false}
                  actionState={item.actionState}
                  onChangeValue={() => {}}
                  disableInput={true}
                  disableButton={false}
                  key={`link-${item.key}-${key}`}
                >
                  <div className="align-center mb-1">
                    <LinkDetails
                      dateExpires={item.dateExpires}
                      url={item.url}
                      key={`link-details-${item.key}-${key}`}
                    ></LinkDetails>
                  </div>
                </InputPrepend>
              </div>

              <div className="align-center">
                {!item.removing ? (
                  <>
                    <button
                      className="trash-icon"
                      onClick={() => onDestroyLink(item)}
                      key={`btn-${key}`}
                    >
                      <img
                        src="../../assets/icons/Trash.svg"
                        className="img-icon"
                        alt="icon action"
                        key={`trash-${key}`}
                      />
                    </button>
                    <label
                      className="trash-label label-pointer"
                      onClick={() => onDestroyLink(item)}
                      key={`lb-trash-${key}`}
                    >
                      Remover
                    </label>
                  </>
                ) : (
                  <>
                    <Spinner loading={item.removing || false}></Spinner>
                  </>
                )}
              </div>
            </>
          );
        })}

        <div className="m-back-links align-center">
          <a
            href="home"
            className="back-links"
            aria-label="Voltar para encurtar mais links"
          >
            <label className="label-subs label-pointer">
              Voltar para encurtar mais links
            </label>
          </a>
        </div>
      </div>
    </>
  );
}
export default ListLinksPage;
