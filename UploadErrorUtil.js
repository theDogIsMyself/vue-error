/*
 * @Date: 2022-04-27 15:17:47
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-28 10:54:53
 * @FilePath: /vue-sample/UploadErrorUtil.js
 */
let isLoad = false
export function uploadError(params) {
	try {
		// 过滤
		let info = {}
		if (params instanceof ErrorEvent) {
			const {
				lineno,
				colno,
				error: {
					stack
				},
				timeStamp,
				message,
				filename
			} = params

			info = {
				lineno,
				colno,
				stack,
				timeStamp,
				message,
				filename
			}
		} else if (params instanceof PromiseRejectionEvent) {
			info = {
				stack: params.reason.stack,
				message: params.reason.message
			}
		} else {
			info = {
				stack: params.error.stack,
				message: params.error.message
			}
		}

		const str = window.btoa(JSON.stringify(info))
		const host = 'http://localhost:7001/monitor/error'
		new Image().src = `${host}?info=${str}`
	} catch (error) {
		console.log(error,)
		console.dir(params)
	}
}

const _init = () => {
	window.addEventListener('error', args => {
		uploadError(args)
		return true
	}, true)
	window.addEventListener("unhandledrejection", e => {
		uploadError(e)
	});
	window.addEventListener("unload", () => {
		window.removeEventListener('error')
		window.removeEventListener('unhandledrejection')
	});
}



export const init = () => {
	if (!isLoad) {
		_init()
		isLoad = true
	}
}
