import { ShortResponse } from "../interfaces/ShortResponse";

export enum StoragePropsEnum {
  LINKS = "LINKS",
}

class StorageService {
  setItem(key: StoragePropsEnum, value: string) {
    window.localStorage.setItem(key, value);
  }

  getItem(key: StoragePropsEnum): string | null {
    return window.localStorage.getItem(key);
  }

  saveLinks(newLink: ShortResponse) {
    const strLinks = this.getItem(StoragePropsEnum.LINKS);
    if (!strLinks?.length) {
      this.setItem(StoragePropsEnum.LINKS, JSON.stringify([newLink]));
    } else {
      const links = JSON.parse(strLinks) as ShortResponse[];
      links.unshift(newLink);
      this.setItem(StoragePropsEnum.LINKS, JSON.stringify(links));
    }
  }

  getLinks(): ShortResponse[] {
    const strLinks = this.getItem(StoragePropsEnum.LINKS);
    if (!strLinks?.length) {
      return [];
    }
    return JSON.parse(strLinks) as ShortResponse[];
  }

  removeLink(linkKey: string) {
    const links = this.getLinks();
    links.splice(
      links.findIndex((el) => el.key === linkKey),
      1
    );
    this.setItem(StoragePropsEnum.LINKS, JSON.stringify(links));
  }
}

export default new StorageService();
