import Axios from "axios";
import FormData from "form-data";
import { nanoid } from "nanoid";

import type {
  AccountDetails,
  DeleteFileResponse,
  SizeResponse,
  UploadFileResponse,
  UploadOptions,
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
  constructor(
    private apiKey: string,
    private options?: { defaultURL?: string }
  ) {
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
   * Gets all domains registered by user
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

  async uploadFile(buffer: Buffer, options: UploadOptions = {}) {
    if (!options.domain) {
      if (!this.options?.defaultURL) {
        throw new Error("No domain provided and no default URL set");
      }

      options.domain = this.options.defaultURL;
    }

    const formData = new FormData();

    formData.append(
      "file",
      buffer,
      `${options.filename ?? nanoid()}.${options.extension ?? "png"}`
    );

    const uploadResponse = await fetcher.post<UploadFileResponse>(
      ENDPOINTS.UPLOAD_ENDPOINT,
      formData,
      {
        params: { random_name: options.filename ? false : true },
        headers: { ...formData.getHeaders(), domain: options.domain },
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

  async uploads(page = 1, amount = 3) {
    const response = await fetcher.get(
      `${
        ENDPOINTS.BASE_URL + ENDPOINTS.FILE_ENDPOINT
      }?page=${page}&amount=${amount}`
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data as Record<string, any>;
  }

  async deleteFile(id: string | number) {
    const uploadResponse = await fetcher.delete<DeleteFileResponse>(
      `${ENDPOINTS.FILE_ENDPOINT}/${id}`
    );

    return uploadResponse.data;
  }
}
