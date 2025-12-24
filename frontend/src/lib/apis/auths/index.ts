import {BACKEND_API_BASE_URL, ONENODE_API_BASE_URL} from '$lib/constants';
import {toast} from "svelte-sonner";

export const getSessionUser = async (token: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/`, {
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
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const userSignIn = async (email: string, password: string, code : string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password,
            code: code
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const userSignUp = async (name: string, email: string, password: string, code: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name,
			email: email,
			password: password,
			code: code
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};


export const updateUserProfile = async (token: string, name: string, profileImageUrl: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/update/profile`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			name: name,
			profile_image_url: profileImageUrl
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateUserPassword = async (token: string, password: string, newPassword: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/update/password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			password: password,
			new_password: newPassword
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getSignUpEnabledStatus = async () => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/signup/enabled`, {
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
			if(err) error = err.detail;
			return null;
		});


	return res;
};

export const getDefaultUserRole = async (token: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/signup/user/role`, {
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
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateDefaultUserRole = async (token: string, role: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/signup/user/role`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			role: role
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const toggleSignUpEnabledStatus = async (token: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/signup/enabled/toggle`, {
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
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getJWTExpiresDuration = async (token: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/token/expires`, {
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
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateJWTExpiresDuration = async (token: string, duration: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/token/expires/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			duration: duration
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const sendVerification = async (phone: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/sms/send-verification`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			phone: phone
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail;
			toast.error(error);
			return null;
		});

	if (error) {
		throw error;
	}
	return res;
};
export const isRegistration = async (phone: string) => {
	let error = null;

	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/signup/register/isRegistration`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: phone,
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getRegVerifyStatus = async () => {
	let error = null;
	const res = await fetch(`${ONENODE_API_BASE_URL}/auths/register/verify`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
	}).catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
	});
	if (error) {
		throw error;
	}
	return res;
};

export const getSystemName = async () => {
	let error = null;
	const res = await fetch(`${BACKEND_API_BASE_URL}/GetSystemName`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
	}).catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
	});
	if (error) {
		throw error;
	}
	return res;
};
