export interface AccountDetails {
  success: boolean;
  data: {
    id: string;
    username: string;
    mfa_enabled: boolean;
    pro: boolean;
    beta: boolean;
    admin: boolean;
    staff: boolean;
    email: string;
    email_verified: boolean;
    phone?: string;
    avatar?: string;
    upload_region: string;
    last_login: string;
  };
}

export interface DomainResponse {
  success: boolean;
  data: {
    domains: [
      {
        name: string;
        owner: string;
        uploads: number;
      }
    ];
  };
}

export interface SizeResponse {
  success: boolean;
  data: {
    user: number;
    limit: number;
    premium_tier: number;
  };
}

export interface UploadOptions {
  extension: string;
  filename: string;
}

export interface UpdateFileInfo {
  name?: string;
  extension?: string;
}

export interface UploadFileResponse {
  success: boolean;
  size: number;
  data: {
    id: string;
    name: string;
    region: string;
    filename: string;
    extension: string;
    domain: string;
    type: number;
    permissions: [
      {
        user: TixteUser;
        access_level: number;
      }
    ];
    url: string;
    direct_url: string;
    deletion_url: string;
    message: string;
  };
}

export interface UpdateFileResponse {
  success: boolean;
  data: {
    asset_id: string;
    domain: string;
    extension: string;
    mimetype: string;
    name: string;
    size: number;
    uploaded_at: string;
  };
}

export interface DeleteFileResponse {
  success: boolean;
  data: {
    message: string;
  };
}

export interface TixteUser {
  id: string;
  username: string;
  avatar: string;
}

export interface TixteError {
  success: boolean;
  error: {
    code: string;
    message: string;
  };
}
