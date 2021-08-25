export interface IRegisterToemial {
  name: string; // 收件人名称
  content: string; // 验证内容
}

/**
 * 注册邮箱验证
 * @param options
 * @returns
 */
export function registerToemial(options: IRegisterToemial) {
  return `
        <div>

        </div>
    `;
}
