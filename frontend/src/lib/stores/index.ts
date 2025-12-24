import { APP_NAME } from '$lib/constants';
import { writable } from 'svelte/store';
import {GetUserDefaultPath} from "$lib/apis/unit";

// Backend
export const ONENODE_NAME = writable(APP_NAME);
export const config = writable(undefined);
export const user = writable(undefined);

// Frontend
export const MODEL_DOWNLOAD_POOL = writable({});

export const theme = writable('system');
export const chatId = writable('');

export const chats = writable([]);
export const tags = writable([]);
export const models = writable([]);

export const modelfiles = writable([]);
export const prompts = writable([]);
export const documents = writable([
	{
		collection_name: 'collection_name',
		filename: 'filename',
		name: 'name',
		title: 'title'
	},
	{
		collection_name: 'collection_name1',
		filename: 'filename1',
		name: 'name1',
		title: 'title1'
	}
]);

export const settings = writable({});
export const showSettings = writable(false);
export const showChangelog = writable(false);
export const rightpanel_params = writable<string[]>([]);
export const scopes = writable([]);
export const inner_prompt = writable('');
export const rightpanel_auto = writable(false);
export const versionName = writable('');
export const userDefaultPath = writable('');

/**
 * @example 系统名称
 */
export const system_name=writable('');
/**
 * @example 系统欢迎语
 */
export const system_welcome_title=writable('');
/**
 * @example 系统欢迎语
 */
export const system_welcome=writable('');
export const show_welcome=writable(true);
export const show_welcome_title=writable(true);
export const system_logo=writable('');
export const login_bg=writable('');

export const signUpEnabledStatus=writable(true);


export const system_allCompanyName =writable('');
export const system_allCompanyUrl =writable('');
export const system_failedAnswer =writable(false)
export const kbman_super_enabled = writable(false)
export const sdk_access_token_enabled = writable(false)
export const sdk_access_token_duration = writable('');
export const gpu_number = writable(-1);
export const sdk_dev_doc = writable(true);
