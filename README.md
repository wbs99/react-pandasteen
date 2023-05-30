# 使用方法

## 开发

```bash
pnpm run dev
```

## 部署

请先将 bin/deploy_to_github.sh 中的 `git remote add origin git@github.com:wbs99/react-pandasteen-preview.git` 替换为你的仓库地址，然后在 bash 中执行：
```bash
bin/deploy_to_github.sh
#或
sh bin/deploy_to_github.sh
```
# mock 

如需使用 `开启 mock` ，只需将 `src\mock\index.ts` 对应的 `mock` 路径开启即可 