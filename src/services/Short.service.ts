import moment from "moment";
import { ShortResponse } from "../interfaces/ShortResponse";
import StorageService from "./Storage.service";
import ToastService from "./Toast.service";

class ShortService {
  private url = "https://url.api.stdlib.com/temporary@0.3.0/";

  async shortLink(input: {
    url: string;
    ttl: number;
    message: string;
  }): Promise<ShortResponse> {
    const response = await fetch(this.url + "create", {
      method: "POST",
      body: JSON.stringify(input),
    });
    const link = (await response.json()) as ShortResponse;
    StorageService.saveLinks({ ...link, dateExpires: this.getDateExpires() });
    return link;
  }

  async destroyLink(input: { key: string }) {
    try {
      const response = await fetch(this.url + "destroy", {
        method: "POST",
        body: JSON.stringify(input),
      });
      const data = (await response.json()) as boolean;
      if (!data) {
        throw new Error(
          "Não foi possível excluir o link. Tente novamente mais tarde."
        );
      }
      StorageService.removeLink(input.key);
    } catch (error: any) {
      ToastService.toastError({ message: error.message });
    }
  }

  private getDateExpires(): string {
    const date = moment().add({ days: 7 }).format("YYYY-MM-DD HH:mm:ss");

    return date;
  }
}

export default new ShortService();
