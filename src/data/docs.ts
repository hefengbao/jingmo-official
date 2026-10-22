/**
 * 文档注册表
 * ------------------------------------------------------------
 * 每份文档以 Markdown 形式存放于 src/content/docs/,
 * 这里的静态 import 让 Astro 把它编译成可渲染的组件与 frontmatter。
 *
 * 新增文档只需两步:
 *   1. 在 src/content/docs/ 下新建 <slug>.md(含 title 等 frontmatter)
 *   2. 在下面的 registry 里加一行
 * 路由 /docs/<slug>/ 自动生成。
 */
import UserAgreementContent, {
  frontmatter as userAgreementMeta,
} from '../content/docs/user-agreement.md';
import PrivacyPolicyContent, {
  frontmatter as privacyPolicyMeta,
} from '../content/docs/privacy-policy.md';

export interface DocFrontmatter {
  title: string;
  description?: string;
  lastUpdated?: string;
  effectiveDate?: string;
  lead?: string;
}

export interface DocEntry {
  /** Markdown 编译后的渲染组件 */
  Content: unknown;
  frontmatter: DocFrontmatter;
}

export const docs: Record<string, DocEntry> = {
  'user-agreement': {
    Content: UserAgreementContent,
    frontmatter: userAgreementMeta,
  },
  'privacy-policy': {
    Content: PrivacyPolicyContent,
    frontmatter: privacyPolicyMeta,
  },
};
