import Axios from "axios";
import FormData from "form-data";

import type {
  AccountDetails,
  DeleteFileResponse,
  SizeResponse,
  UploadFileResponse,
} from "./tixte-types";

enum ENDPOINTS {
  BASE_URL = "https://api.tixte.com/v1",
  ACCOUNT_ENDPOINT = "/users/@me",
  UPLOAD_ENDPOINT = "/upload",
  FILE_ENDPOINT = "/users/@me/uploads",
  DOMAINS_ENDPOINT = "/users/@me/domains",
  SIZE_ENDPOINT = "/users/@me/uploads/size",
}

const fetcher = Axios.create({ baseURL: ENDPOINTS.BASE_URL });

export class Client {
  constructor(public apiKey: string) {
    fetcher.defaults.headers.common["Authorization"] = this.apiKey;
  }

  /**
   * Gets account details of user
   */
  async accountInfo() {
    const result = await fetcher.get<AccountDetails>(
      ENDPOINTS.ACCOUNT_ENDPOINT
    );

    return result.data;
  }

  /**
   * [Account Token Only] Gets all domains registered by user
   */
  async domains() {
    const result = await fetcher.get<AccountDetails>(
      ENDPOINTS.DOMAINS_ENDPOINT
    );

    return result.data;
  }

  /**
   * Gets total uploaded file size of user
   */
  async size() {
    const result = await fetcher.get<SizeResponse>(ENDPOINTS.SIZE_ENDPOINT);
    return result.data;
  }

  async uploadFile(
    buffer: Buffer,
    domain: string,
    options: { filename?: number | string; extension?: string } = {}
  ) {
    const formData = new FormData();

    formData.append(
      "file",
      buffer,
      `${options?.filename ?? Date.now()}.${options?.extension ?? "png"}`
    );

    const uploadResponse = await fetcher.post<UploadFileResponse>(
      ENDPOINTS.UPLOAD_ENDPOINT,
      formData,
      {
        params: { random_name: options?.filename ? false : true },
        headers: { ...formData.getHeaders(), domain },
      }
    );

    return uploadResponse.data;
  }

  async updateFile<T>(id: string | number, fileInfo: T) {
    const uploadResponse = await fetcher.patch<UploadFileResponse>(
      `${ENDPOINTS.FILE_ENDPOINT}/${id}`,
      fileInfo
    );

    return uploadResponse.data;
  }

  async deleteFile(id: string | number) {
    const uploadResponse = await fetcher.delete<DeleteFileResponse>(
      `${ENDPOINTS.FILE_ENDPOINT}/${id}`
    );

    return uploadResponse.data;
  }
}
