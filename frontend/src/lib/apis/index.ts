import { ONENODE_BASE_URL } from '$lib/constants';

export const getBackendConfig = async () => {
	let error = null;

	const res = await fetch(`${ONENODE_BASE_URL}/api/config`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	return res;
};

export const getChangelog = async () => {
	let error = null;

	const res = await fetch(`${ONENODE_BASE_URL}/api/changelog`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};
export const getPlanInfo = async () => {
	let error = null;

	const res = await fetch(`${ONENODE_BASE_URL}/api/planinfo`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getVersionUpdates = async () => {
	let error = null;

	const res = await fetch(`${ONENODE_BASE_URL}/api/version/updates`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};


export const getWebhookUrl = async (token: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_BASE_URL}/api/webhook`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	if (error) {
		throw error;
	}

	return res.url;
};

export const updateWebhookUrl = async (token: string, url: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_BASE_URL}/api/webhook`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			url: url
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	if (error) {
		throw error;
	}

	return res.url;
};


export const getVersionInfo = async () => {
	let error = null;

	const res = await fetch(`${ONENODE_BASE_URL}/api/version_info`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const uploadLicense = async (file) => {
    let error = null;

    // 检查文件是否有效
    if (!(file instanceof File) || file.name !== "license.bin") {
        error = { message: "Invalid file. Please provide a valid 'license.bin' file." };
        throw error;
    }

    // 构建 FormData 对象以发送文件
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${ONENODE_BASE_URL}/api/v1/configs/upload_license`, {
        method: 'POST',
        body: formData
    }).then(async (res) => {
				if (!res.ok) throw await res.json();
				return res.json();
		})
		.catch((err) => {
				console.log(err);
				error = err;
				return null;
		});

    if (error) {
        throw error;
    }

    return res;
};

export const setWhiteList = async (origins: string[]) => {
	let error = null;

	const res = await fetch(`${ONENODE_BASE_URL}/api/v1/configs/set_white_list`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			origins: origins
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			const result = await res.json();
			if(result.status)
			{
				location.href='/';
			}
		})
		.catch((err) => {
			console.log(err);
			if ('detail' in err) {
				error = err.detail;
			}
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};