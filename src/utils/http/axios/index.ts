// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged
import type { AxiosResponse } from 'axios'
import type { CreateAxiosOptions, RequestOptions, Result } from './types'
import { VAxios } from './Axios'
import { AxiosTransform } from './axiosTransform'

// import { checkStatus } from './checkStatus'

import { isString } from '/@/utils/is'
import { setObjToUrlParams, deepMerge } from '/@/utils'
// import { errorResult } from './const'
import { createNow, formatRequestDate } from './helper'

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult } = options
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) {
      return res.data
    }
    // 错误的时候返回
    const { data } = res
    return data
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    if (config.method?.toUpperCase() === 'get') {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, createNow(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${createNow(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        config.data = params
        config.params = undefined
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data)
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: config => {
    // 请求之前处理config
    const token = ''
    if (token) {
      // jwt token
      config.headers.Authorization = token
    }
    return config
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {}
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        console.error('ECONNABORTED')
      }
      if (err?.includes('Network Error')) {
        // createErrorModal({
        //   title: t('sys.api.networkException'),
        //   content: t('sys.api.networkExceptionMsg'),
        // })
      }
    } catch (error) {
      throw new Error(error)
    }
    // checkStatus(error?.response?.status, msg)
    return Promise.reject(error)
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        // 基础接口地址
        baseURL: import.meta.env.VITE_API_URL,
        // 接口可能会有通用的地址部分，可以统一抽取出来
        prefixUrl: '',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: '',
          //  是否加入时间戳
          joinTime: false,
        },
      },
      opt || {}
    )
  )
}
export const defHttp = createAxios()
