import { LocalFile } from './local-file';

export class Client<T> {

  private readonly provider: LocalFile<T>;
  private readonly prefix: string;

  constructor(prefix: string) {
    this.provider = new LocalFile();
    this.prefix = prefix;
  }

  getAllObjects = (suffix?: string): T[] | any[] => {
    const path = suffix ? `${this.prefix}/${suffix}` : this.prefix;
    return this.provider.getAllObjects(path);
  }

  getObject = (id: string): T | any => {
    return this.provider.getObject(`${this.prefix}/${id}`);
  }

  putObject = (id: string, data: T | any, subFolders?: string[]) => {
    return this.provider.putObject(`${this.prefix}/${id}`, data, subFolders);
  }

  removeObject = (id: string) => {
    return this.provider.removeObject(`${this.prefix}/${id}`);
  }
}