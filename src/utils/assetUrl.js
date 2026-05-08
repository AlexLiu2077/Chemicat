/**
 * 根据当前部署环境（Vercel vs GitHub Pages）自动生成正确的资源路径。
 * Vite 在构建时会将 import.meta.env.BASE_URL 替换为 vite.config.js 中配置的 base 值：
 *   - GitHub Pages 构建：'/Chemicat/'
 *   - Vercel / 本地开发：'/'
 *
 * @param {string} path - 以 '/' 开头的资源相对路径，例如 '/assets/cats/black_1.jpg'
 * @returns {string} 完整的资源 URL
 */
export function getAssetUrl(path) {
  // import.meta.env.BASE_URL 末尾有 '/'，path 开头也有 '/'，需去掉一个
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
