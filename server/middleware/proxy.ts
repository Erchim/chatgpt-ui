import { createProxyMiddleware } from 'http-proxy-middleware'

export default defineEventHandler(async (event) => {
  const proxy = createProxyMiddleware({
    target: process.env.OPENAI_API_PROXY_URL || 'https://api.openai.com/v1',
    changeOrigin: true,
    pathRewrite: { '^/api/chat': '' }
  })

  return new Promise((resolve, reject) => {
    proxy(event.node.req, event.node.res, (err) => {
      if (err) reject(err)
      else resolve(undefined)
    })
  })
})
