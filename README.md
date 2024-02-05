# 锁定版本号
```
pnpm config set save-prefix=''  // 锁定 npm 版本号
```

# 开发

```bash
pnpm dev
```

# mock

如需使用 `开启 mock` ，只需将 `src\mock\index.ts` 对应的 `mock` 路径开启即可

# Icon
使用方式一：
在 https://icones.js.org/ 找到喜欢的 icon ，复制 icon 名称 ，填入到 icon 属性中
```tsx
import { Icon } from '@iconify/react'

  <Icon icon='line-md:arrow-left' className='w-[1.2em] h-[1.2em]'/>
```
使用方式二：
在 src/assets/icons 中添加自己喜欢的 svg ，填入到 name 属性中，重新运行 `pnpm dev`
```tsx
<MyIcon name='panda' className='w-16 h-16'/>
```
