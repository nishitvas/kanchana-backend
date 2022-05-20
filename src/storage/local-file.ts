import * as fs from "fs";

export class LocalFile<T> {

  private readonly path: string;
  private readonly fileExtension: string;
  constructor() {
    this.path = "/Users/nisvas/personal-workspace/kanchana-server/data";
    this.fileExtension = "json";
  }

  getAllObjects(prefix: string): T[] | any[] {
    const files = fs.readdirSync(`${this.path}/${prefix}`, { withFileTypes: true })
      .filter(dirent => dirent.isFile())
      .map(dirent => dirent.name);
    return files.map(f => JSON.parse(fs.readFileSync(`${this.path}/${prefix}/${f}`).toString())).flat();
  }

  getObject(key: string): T | any {
    return JSON.parse(fs.readFileSync(`${this.path}/${key}.${this.fileExtension}`).toString());
  }

  putObject(key: string, data: T | any, subFolders?: string[]) {
    fs.writeFileSync(`${this.path}/${key}.${this.fileExtension}`, JSON.stringify(data));
    if (subFolders) {
      fs.mkdirSync(`${this.path}/${key}`);
      subFolders.forEach((subFolder) => {
        fs.mkdirSync(`${this.path}/${key}/${subFolder}`);
      });
    }
  }

  removeObject(key: string) {
    fs.rmSync(`${this.path}/${key}.${this.fileExtension}`);
    fs.rmdirSync(`${this.path}/${key}`, { recursive: true });
  }
}