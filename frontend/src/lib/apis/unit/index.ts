import { BACKEND_API_BASE_URL } from '$lib/constants';

// 定义API响应结构
interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 基础请求函数
async function apiRequest<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  token: string = '',
  body?: any
): Promise<T> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BACKEND_API_BASE_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`API请求失败 (${method} ${url}):`, error);
    throw error;
  }
}

// 单位管理
export const AddUnit = (token: string, unitInfo: object) =>
  apiRequest<void>('/AddUnit', 'POST', token, unitInfo);

export const RenameUnit = (token: string, path: object) =>
  apiRequest<void>('/RenameUnit', 'POST', token, path);

export const DelUnit = (token: string, path: string) =>
  apiRequest<void>('/DelUnit', 'DELETE', token, { unit_path: path });

export const ListUnits = (token: string, path: string = '') =>
  apiRequest<{ units: any[] }>('/ListUnits', 'POST', token, { unit_path: path });

// 用户管理
export const ListUsers = (token: string, path: string = '') =>
  apiRequest<{ users: any[] }>('/ListUsers', 'POST', token, { unit_path: path });

export const AddUserToUnit = (token: string, info: object) =>
  apiRequest<void>('/AddUserToUnit', 'POST', token, info);

export const DelUserFromUnit = (token: string, info: object) =>
  apiRequest<void>('/DelUserFromUnit', 'DELETE', token, info);

// 知识集管理
export const ListScopes = (token: string, path: string = '') =>
  apiRequest<{ scopes: any[] }>('/ListScopes', 'POST', token, { unit_path: path });

export const AddScopeToUnit = (token: string, info: object) =>
  apiRequest<void>('/AddScopeToUnit', 'POST', token, info);

export const DelScopeFromUnit = (token: string, info: object) =>
  apiRequest<void>('/DelScopeFromUnit', 'DELETE', token, info);

// 回收站管理
export const GetTrushList = (token: string) =>
  apiRequest<{ unit_paths: string[] }>('/GetTrushList', 'GET', token);

export const RestoreTrush = (token: string, path: string) =>
  apiRequest<void>('/RestoreTrush', 'POST', token, { unit_path: path });

export const CleanTrush = (token: string) =>
  apiRequest<void>('/CleanTrush/', 'DELETE', token);

// 用户相关
export const GetUserDefaultPath = (token: string) =>
  apiRequest<{ user_default_path: string }>('/GetUserDefaultPath', 'GET', token)
    .then(data => data.user_default_path || '');

// 搜索相关
export const GetUnitsByUnitName = (token: string, unit_name: string) =>
  apiRequest<{ units: any[] }>(`/GetUnitsByUnitName?unit_name=${encodeURIComponent(unit_name)}`, 'GET', token);

// 回收站相关
export const AddUserToTrush = (token: string, info: object) =>
  apiRequest<void>('/AddUserToTrush', 'POST', token, info);

export const AddScopeToTrush = (token: string, info: object) =>
  apiRequest<void>('/AddScopeToTrush', 'POST', token, info);