import { AGENT_API_BASE_URL } from '$lib/constants';
import { splitStream } from '$lib/utils';

export const GetAppList = async (authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/list_app`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			}
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}
		return await response.json();
	} catch (error) {
		console.error('获取应用失败:', error);
		throw error;
	}
};

interface NewAppForm {
	name: string;
	options?: Record<string, any> | null;
}

export const createApp = async (form: NewAppForm, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/new_app`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}
		return await response.json();
	} catch (error) {
		console.error('创建应用失败:', error);
		throw error;
	}
};

interface UpdateAppForm {
	app_id: string;
	config?: Record<string, any> | null;
}

export const updateApp = async (form: UpdateAppForm, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/update_app`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}
		return await response.json();
	} catch (error) {
		console.error('更新应用失败:', error);
		throw error;
	}
};

export const deleteApp = async (app_id: string, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/delete_app/${app_id}`;

	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			}
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}
		return await response.json();
	} catch (error) {
		console.error('删除应用失败:', error);
		throw error;
	}
};

interface AddAgentForm {
	app_id: string;
	config: Record<string, any>;
}

export const addAgent = async (form: AddAgentForm, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/add_agent`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}` // 根据你的认证方式调整
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}
		return await response.json();
	} catch (error) {
		console.error('添加 Agent 节点失败:', error);
		throw error;
	}
};

interface UpdateAgentForm {
	app_id: string;
	agent_id: string;
	config: Record<string, any>;
}

export const updateAgent = async (form: UpdateAgentForm, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/agent/update_agent`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}` // 根据你的认证方式调整
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}
		return await response.json();
	} catch (error) {
		console.error('更新 Agent 节点失败:', error);
		throw error;
	}
};

interface AgentForm {
	app_id: string;
	agent_id: string;
}

export const deleteAgent = async (form: AgentForm, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/del_agent`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}` // 根据你的认证方式调整
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}
		return await response.json();
	} catch (error) {
		console.error('删除 Agent 节点失败:', error);
		throw error;
	}
};

interface EdgeForm {
	app_id: string;
	src_id: string;
	dest_id: string;
}

export const addEdge = async (
	form: EdgeForm,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/add_edge`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('添加 Edge 失败:', error);
		throw error;
	}
};

export  const  deleteEdge =async (
  form: EdgeForm,
  authToken: string
) => {
  const url = `${AGENT_API_BASE_URL}/application/del_edge`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      let errorDetail = '未知错误';
      try {
        const errorData = await response.json();
        errorDetail = errorData.detail || errorDetail;
      } catch {
        errorDetail = await response.text();
      }
      throw new Error(`HTTP ${response.status}: ${errorDetail}`);
    }

    return await response.json();
  } catch (error) {
    console.error('删除 edge 失败:', error);
    throw error;
  }
}


export const getAgentGraph = async (app_id: string,authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/agent_graph/${app_id}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			}
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}
		return await response.json();
	} catch (error) {
		console.error('获取 Agent Graph 失败:', error);
		throw error;
	}
};


export const getAgentAvailableTools = async (
	app_id: string,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/list_tools/${app_id}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取可用工具失败:', error);
		throw error;
	}
};

export const getAgentAvailableInputs = async (
	form: AgentForm,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/agent/available_inputs`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取可输入数据失败:', error);
		throw error;
	}
};

export const addTools = async (
	form: object,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/agent/add_tool`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取可输入数据失败:', error);
		throw error;
	}
};

export const delTools = async (
	form: object,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/agent/del_tool`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取可输入数据失败:', error);
		throw error;
	}
};

export const addInput = async (
	form: object,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/agent/add_input`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取可输入数据失败:', error);
		throw error;
	}
};

export const delInput = async (
	form: object,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/agent/del_input`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取可输入数据失败:', error);
		throw error;
	}
};


export const runAgent = async (
  runAgentForm: AgentForm,
  authToken: string
) => {
  const url = `${AGENT_API_BASE_URL}/application/agent/run`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(runAgentForm)
    });

    if (!response.ok) {
      let errorDetail: string;
      try {
        const errorData = await response.json();
        errorDetail = errorData.detail || '未知错误';
      } catch {
        errorDetail = await response.text();
      }
      throw new Error(`HTTP ${response.status}: ${errorDetail}`);
    }

    return response;
  } catch (error) {
    console.error('运行 Agent 失败:', error);
    throw error;
  }
};


export const runApp = async (
  app_id: string,
  authToken: string
) => {
  const url = `${AGENT_API_BASE_URL}/application/run/${app_id}`;

  try {
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      let errorDetail: string;
      try {
        const errorData = await response.json();
        errorDetail = errorData.detail || '未知错误';
      } catch {
        errorDetail = await response.text();
      }
      throw new Error(`HTTP ${response.status}: ${errorDetail}`);
    }

    return response;
  } catch (error) {
    console.error('运行 App 失败:', error);
    throw error;
  }
};

export const parseStream = async function (stream,handleLine: (line: string) => void) {
		const reader = stream.getReader();
		const decoder = new TextDecoder('utf-8');
		let buffer = '';
		try {
				while (true) {
						const {value, done} = await reader.read();
						if (done) break;
						buffer = decoder.decode(value, {stream: true});
						const lines = buffer.split('\n');
						for (const line of lines) {
								if (line.trim() === '') continue;
								handleLine(line);
						}
				}

		} finally {
				reader.releaseLock();
		}
};

export const feedback = async (
	form: object,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/feedback`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('输入数据失败:', error);
		throw error;
	}
};

export const uploadFile = async (agentForm: AgentForm, options, file: File, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/upload`;

	const formData = new FormData();
	formData.append('app_id', agentForm.app_id);
	formData.append('agent_id', agentForm.agent_id);
	formData.append('file', file);

	Object.keys(options).forEach(key => {
        if (options[key] !== undefined && options[key] !== null) {
            formData.append(key, options[key]);
        }
    });
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${authToken}`
			},
			body: formData
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('文件上传失败:', error);
		throw error;
	}
};

/**
 * 获取应用下的文件列表
 * @param app_id 应用ID
 * @param authToken 认证token
 * @param sub_dir 子目录，默认const
 * @returns 文件列表
 */
export const getFiles = async (
    app_id,
    authToken,
    sub_dir = 'const'
) => {
    const url = `${AGENT_API_BASE_URL}/application/get_files/${app_id}?sub_dir=${sub_dir}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            let errorDetail: string;
            try {
                const errorData = await response.json();
                errorDetail = errorData.detail || '未知错误';
            } catch {
                errorDetail = await response.text();
            }
            throw new Error(`HTTP ${response.status}: ${errorDetail}`);
        }

        return await response.json();
    } catch (error) {
        console.error('获取文件列表失败:', error);
        throw error;
    }
};

/**
 * 删除应用下的文件
 * @param app_id - 应用ID
 * @param file_name - 要删除的文件名
 * @param authToken - 身份验证 Token（请求头）
 * @param sub_dir - 子目录（默认 'const'）
 * @returns 删除结果（后端返回的 JSON 数据）
 */
export const deleteFile = async (
    app_id: string,
    file_name: string,
    authToken: string,
    sub_dir: string = 'const'
) => {
    const url = `${AGENT_API_BASE_URL}/application/delete_file`;
    try {
        const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify({
                app_id: app_id,
                file_name: file_name,
                sub_dir: sub_dir
            })
		});

        if (!response.ok) {
            let errorDetail: string;
            try {
                const errorData = await response.json();
                errorDetail = errorData.reason || errorData.detail || '未知错误';
            } catch {
                errorDetail = await response.text();
            }
            throw new Error(`HTTP ${response.status}: ${errorDetail}`);
        }
        return await response.json();
    } catch (error) {
        console.error('删除文件失败:', error);
        throw error;
    }
};

/**
 * 获取文件流（后端只返回纯流，前端决定预览/下载）
 * @param app_id - 应用ID
 * @param file_name - 文件名（支持中文）
 * @param authToken - Token
 * @param sub_dir - 子目录（默认 const）
 * @returns Blob 对象（包含文件流和 MIME 类型）
 */
export const getFileStream = async (
	app_id: string,
	file_name: string,
	authToken: string,
	sub_dir: string = 'const'
): Promise<Blob> => {
	const url = `${AGENT_API_BASE_URL}/application/get_file`;
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify({
				app_id: app_id,
				file_name: file_name,
				sub_dir: sub_dir
			})
		});

		if (!response.ok) {
			let errorDetail = await response.json().then(d => d.reason || d.detail).catch(() => response.text());
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}
		// 直接返回 Blob（包含后端返回的 MIME 类型）
		return await response.blob();
	} catch (error) {
		console.error('获取文件流失败:', error);
		throw error;
	}
};

export const get_template = async (
	app_id: string,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/template/${app_id}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authToken}`
			}
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取数据失败:', error);
		throw error;
	}
};

export const get_data_agent = async (
	form: object,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/agent/get_data`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取可输入数据失败:', error);
		throw error;
	}
};


export const get_appctx_list = async (
	app_id: string,
	authToken: string
) => {
	const url = `${AGENT_API_BASE_URL}/application/list_appctx/${app_id}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authToken}`
			}
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取运行历史数据失败:', error);
		throw error;
	}
};


export const select_appctx = async (form: {
	app_id: string
    app_ctx_id: string
}, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/select_appctx`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('获取运行历史数据失败:', error);
		throw error;
	}
};



export const delete_appctx = async (form: {
	app_id: string
    app_ctx_id: string
}, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/delete_appctx`;

	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(form)
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('删除运行历史数据失败:', error);
		throw error;
	}
};

export const  importAppGraph = async (app_id: string, file: File,  authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/import/${app_id}`;

	const formData = new FormData();
	formData.append('file', file);
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${authToken}`
			},
			body: formData
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('导入失败:', error);
		throw error;
	}
};


export const  exportAppGraph = async (app_id: string, authToken: string) => {
	const url = `${AGENT_API_BASE_URL}/application/export/${app_id}`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			}
		});

		if (!response.ok) {
			let errorDetail: string;
			try {
				const errorData = await response.json();
				errorDetail = errorData.detail || '未知错误';
			} catch {
				errorDetail = await response.text();
			}
			throw new Error(`HTTP ${response.status}: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('导出失败:', error);
		throw error;
	}
};