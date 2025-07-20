# 锁定版本号
```bash
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
在 https://yesicon.app/ 找到喜欢的 `icon` ，复制 `icon` 名称 ，填入到 `name` 中

使用方式二:
在 `src/assets/icons` 中添加自己喜欢的 `svg` ，填入到 `name` 中

```tsx
<SvgIcon name='panda-icon' className='size-8'/>
```
