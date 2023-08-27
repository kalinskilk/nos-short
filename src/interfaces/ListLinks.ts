import {
  ActionPrependEnum,
  IconsPrependEnum,
} from "../components/InputPrepend/InputPrepend.enum";
import { ShortResponse } from "./ShortResponse";

export class ListLinks implements ShortResponse {
  url = "";
  key = "";
  ttl = 0;
  link_url = "";
  message = "";
  actionState = ActionPrependEnum.COPY_LINK;
  icon = IconsPrependEnum.COPY_LINK;
  dateExpires = "";
  removing?: boolean = false;
}
