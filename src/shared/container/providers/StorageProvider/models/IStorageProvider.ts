export default interface IStorageProvider {
    saveFile(file: string): Promise<string>;
    deletefile(file: string): Promise<void>;
}
