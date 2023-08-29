import moment from "moment";
import { ShortResponse } from "../interfaces/ShortResponse";
import StorageService from "./Storage.service";

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
    const body = response;
    if (body.status !== 200) {
      throw new Error("Falha ao encurtar link. Tente novamente.");
    }
    const link = (await body.json()) as ShortResponse;
    StorageService.saveLinks({ ...link, dateExpires: this.getDateExpires() });
    return link;
  }

  async destroyLink(input: { key: string }) {
    const response = await fetch(this.url + "destroy", {
      method: "POST",
      body: JSON.stringify(input),
    });
    const body = response;
    if (body.status !== 200) {
      throw new Error("Falha ao remover link. Tente novamente.");
    }

    const data = (await response.json()) as boolean;
    if (!data) {
      throw new Error("Falha ao remover link. Tente novamente.");
    }

    StorageService.removeLink(input.key);
  }

  private getDateExpires(): string {
    const date = moment().add({ days: 7 }).format("YYYY-MM-DD HH:mm:ss");

    return date;
  }
}

export default new ShortService();
