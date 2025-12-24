import { AGENT_API_BASE_URL, BACKEND_API_BASE_URL } from '$lib/constants';




export const updatePrompt = async (history: object, messagesBody: object, localStorage: object,
  responseMessage: object, selectedScopes: object) => {
  let question = ''
  let current = history.messages[responseMessage.parentId]
  const original_question = current.origin_content
    ?? current.content;

  if (original_question.startsWith("~") && messagesBody.length >= 3) {
    question = original_question.slice("～".length)
    question = await reframedQuestion(localStorage.token, messagesBody.slice(-4))
    question = `${question} (original question: ${original_question})`
    history.messages[responseMessage.parentId].origin_content = original_question
    history.messages[responseMessage.parentId].content = question
  }
  else {
    question = original_question;
  }
  const context_result = JSON.parse(
    await collectContext(localStorage.token, question, selectedScopes)
  )
  messagesBody[messagesBody.length - 2].content = context_result.context;
  return context_result
}


export const getRightPanelContent = async (funcName, funcKey, offset) => {
  let error = null;
  let imgSrc = `${AGENT_API_BASE_URL}/${funcName}/${funcKey}`
  const url = new URL(imgSrc, 'http://dummy-base.com'); // Using a dummy base URL
  const params = new URLSearchParams(url.search);

  if (offset) {
    params.set('offset', offset.toString());
  }
  let right_panel_url = `${url.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  const res = fetch(right_panel_url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(async (res) => {
      if (!res.ok) throw res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }

  return res;
};


export const getKnowledgeScopes = async (token: string = '',exec_perm: boolean = false) => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/KnowledgeScopes/${exec_perm}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }

  return res;
}


export const getKnowledgeScopesAll = async (token: string = '') => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/KnowledgeScopesAll`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }
  return res;
}

export const getScopeDetail = async (token: string = '', id: string) => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/KnowledgeScopesDetail/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }

  return res;
}

export const AddScope = async (token: string = '', scope: object) => {
  let error = null;

  const res = await fetch(`${BACKEND_API_BASE_URL}/AddScope`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(scope),
  })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }
}

export const AddPrivateScope = async (token: string = '', scope: object) => {
  let error = null;

  const res = await fetch(`${BACKEND_API_BASE_URL}/AddPrivateScope`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(scope),
  })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }
}

export const UpdateScopeInfo = async (token: string = '', scope: object) => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/UpdateScopeInfo`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(scope),
  }).then(async (res) => {
            if (!res.ok) throw await res.json();
            return res.json();
        })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }
  return res;
}

export const DeleteScope = async (token: string = '', scopeId: string) => {
  let error = null;

  const res = await fetch(`${BACKEND_API_BASE_URL}/DeleteScope/${scopeId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }

  return res;
}

export const VerifyScopeName = async (token: string = '', id: number = 0, name: string) => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/VerifyScopeName/${id}/${name}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }

  return res;
}


export const queryMultiAgent = async (token: string = '', queryData) => {
  let controller = new AbortController();
  let error = null;
	let code=0
  let res = await fetch(`${AGENT_API_BASE_URL}/query`, {
    signal: controller.signal,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(queryData),
  })
    .catch((err) => {
      error = err;
			code=0
      console.log(err);
      return null;
    });

	if(res.status==205){
		code=res.status
		res=null
	}

  if (error) {
    throw error;
  }

  return [res, controller,code];
}


export const cancelRequestMultiAgent = async (token: string = '', queryData) => {
}


export const generateTitle = async (token: string = '', userPrompt) => {
  let error = null;

  const res = await fetch(`${AGENT_API_BASE_URL}/generate_title`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: userPrompt
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }

  return res;
}

// 查询剩余容量：用配置文件中的容量 - staged下的文件大小，MB
export const getRemainingCapacity = async (token: string = '') => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/RemainingCapacity`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return false;
    });

  if (error) {
    throw error;
  }

  return res;
}

export const getSystemInfo = async (token: string = '') => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/GetSystemInfo`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return false;
    });

  if (error) {
    throw error;
  }

  return res;
}

/**
 * 获取答案修正配置，默认【知识集管理员审核】
 * @param token
 * @returns
 */
export const getAnswerCorrection = async (token: string = '') => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/GetAnswerCorrection`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return false;
    });

  if (error) {
    throw error;
  }

  return res;
}

/**
 * 更新系统配置信息：系统名称、欢迎语等
 * @param config {key:key, value:value}
 */
export const UpdateConfigInfo = async (config: object, token: string) => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/UpdateConfigInfo`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(config)
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

export const getVersion = async (token: string = '') => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/GetVersion`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      error = err;
      console.log(err);
      return false;
    });
  if (error) {
    throw error;
  }
  return res;
}


export const addQuestion = async (token: string = '', question_info: object) => {
  let error = null;

  const res = await fetch(`${BACKEND_API_BASE_URL}/AddQuestion`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(question_info),
  })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }
}

export const deleteQuestion = async (token: string = '', question_id: string) => {
  let error = null;

  const res = await fetch(`${BACKEND_API_BASE_URL}/DeleteQuestion/${question_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    }
  })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }

  return res;
}


export const getQuestionList = async (token: string = '', scopeId = 0) => {
    let error = null;

    const res = await fetch(`${BACKEND_API_BASE_URL}/QuestionList/${scopeId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(token && {authorization: `Bearer ${token}`})
        }
    })
        .then(async (res) => {
            if (!res.ok) throw await res.json();
            return res.json();
        })
        .catch((err) => {
            error = err;
            console.log(err);
            return null;
        });

    if (error) {
        throw error;
    }

    return res;
}

/**
 * 记录知识集使用次数
 */
export const recordKbUsageCount = async (scopeList: object, token: string) => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/CumulativeKbUsageCount`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: JSON.stringify({
				scopes: scopeList
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

  return res;
};


export const getPdfUrl = async (token: string,page_id) => {
  let error = null;

  const res = await fetch(`${AGENT_API_BASE_URL}/pdf_url/${page_id}`, {
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

export const findUnstagedSimilarFiles = async (token:string,scopeName:string) => {
      let error = null;
      const res = await fetch(`${BACKEND_API_BASE_URL}/findUnstagedSimilarFiles`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token && { authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ scope: scopeName })
      }).then(async (res) => {
          if (!res.ok) throw await res.json();
          return res.json();
        }).catch((err) => {
          console.log(err);
          error = err;
          return null;
        });

      if (error) {
        throw error;
      }
      return res;
}

export const findStagedSimilarFiles = async (token:string,scopeName:string) => {
      let error = null;
      const res = await fetch(`${BACKEND_API_BASE_URL}/findStagedSimilarFiles`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token && { authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ scope: scopeName })
      }).then(async (res) => {
          if (!res.ok) throw await res.json();
          return res.json();
        }).catch((err) => {
          console.log(err);
          error = err;
          return null;
        });

      if (error) {
        throw error;
      }
      return res;
}

export const scopeUpdatingStatus = async (token: string = '') => {
    let error = null;

    const res = await fetch(`${BACKEND_API_BASE_URL}/ScopeUpdatingStatus`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(token && {authorization: `Bearer ${token}`})
        }
    })
        .then(async (res) => {
            if (!res.ok) throw await res.json();
            return res.json();
        })
        .catch((err) => {
            error = err;
            console.log(err);
            return null;
        });

    if (error) {
        throw error;
    }

    return res;
}


export const queryGPUStatus = async (token: string = '') => {
    let error = null;

    const res = await fetch(`${BACKEND_API_BASE_URL}/QueryGPUStatus`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(token && {authorization: `Bearer ${token}`})
        }
    })
        .then(async (res) => {
            if (!res.ok) throw await res.json();
            return res.json();
        })
        .catch((err) => {
            error = err;
            console.log(err);
            return null;
        });

    if (error) {
        throw error;
    }

    return res;
}

/**
 *舌害查询服务模式
 *modeName: 服务模式名称，默认值为空字符串为查询服务状态；import_mode为导入模式;query_mode为查询模式
 **/
export const setServiceMode = async (token:string,modeName:string='') => {
      let error = null;
      const res = await fetch(`${BACKEND_API_BASE_URL}/SetServiceMode`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token && { authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ mode_name: modeName })
      }).then(async (res) => {
          if (!res.ok) throw await res.json();
          return res.json();
        }).catch((err) => {
          console.log(err);
          error = err;
          return null;
        });

      if (error) {
        throw error;
      }
      return res;
}

export const getScopeFolders = async (token: string = '',scope_name:string='') => {
    let error = null;

    const res = await fetch(`${BACKEND_API_BASE_URL}/ScopeFolders?scope_name=${scope_name}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(token && {authorization: `Bearer ${token}`})
        }
    })
        .then(async (res) => {
            if (!res.ok) throw await res.json();
            return res.json();
        })
        .catch((err) => {
            error = err;
            console.log(err);
            return null;
        });

    if (error) {
        throw error;
    }

    return res;
}

/**
 * 添加知识集目录
 * @param token 认证令牌
 * @param form 作用域文件夹表单对象，包含scope_name和folder_name属性
 * @returns 服务器响应对象
 */
export const addScopeFolder = async (token: string = '', form: object) => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/AddFolder`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token && { authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(form),
  }).then(async (res) => {
        if (!res.ok) throw await res.json();
            return res.json();
        })
    .catch((err) => {
      error = err;
      console.log(error)
      return null;
    });

  if (error) {
    console.log('throw...')
    throw error;
  }
  return res;
}

/**
 * 删除知识集目录
 * @param token 认证令牌
 * @param form 作用域文件夹表单对象，包含scope_name和folder_name属性
 * @returns 服务器响应对象
 */
export const delScopeFolder = async (token: string = '', form: object) => {
  let error = null;
  const res = await fetch(`${BACKEND_API_BASE_URL}/DelFolder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(form),
  }).then(async (res) => {
            if (!res.ok) throw await res.json();
            return res.json();
        })
    .catch((err) => {
      error = err;
      console.log(err);
      return null;
    });

  if (error) {
    throw error;
  }
  return res;
}