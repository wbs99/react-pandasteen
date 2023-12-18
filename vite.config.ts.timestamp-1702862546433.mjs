// vite.config.ts
import react from "file:///D:/Code/react-pandasteen/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.1.3/node_modules/@vitejs/plugin-react/dist/index.mjs";
import Unocss from "file:///D:/Code/react-pandasteen/node_modules/.pnpm/unocss@0.55.7_postcss@8.4.32_rollup@2.79.1_vite@4.1.3/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///D:/Code/react-pandasteen/node_modules/.pnpm/vite@4.1.3_sass@1.56.1/node_modules/vite/dist/node/index.js";
import { viteMockServe } from "file:///D:/Code/react-pandasteen/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@4.1.3/node_modules/vite-plugin-mock/dist/index.js";

// vite_plugins/svgsprites.ts
import path from "node:path";
import fs from "node:fs";
import store from "file:///D:/Code/react-pandasteen/node_modules/.pnpm/svgstore@3.0.1/node_modules/svgstore/src/svgstore.js";
import { optimize } from "file:///D:/Code/react-pandasteen/node_modules/.pnpm/svgo@3.0.1/node_modules/svgo/lib/svgo-node.js";
var svgsprites = (options = {}) => {
  const virtualModuleId = `virtual:svgsprites${options.id ? `-${options.id}` : ""}`;
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;
  const { inputFolder = "src/assets/icons", inline = false } = options;
  const generateCode = () => {
    var _a;
    const sprites = store(options);
    const iconsDir = path.resolve(inputFolder);
    for (const file of fs.readdirSync(iconsDir)) {
      if (!file.endsWith(".svg")) {
        continue;
      }
      const filepath = path.join(iconsDir, file);
      const svgId = path.parse(file).name;
      const code = fs.readFileSync(filepath, { encoding: "utf-8" });
      const symbol = ((_a = options.noOptimizeList) == null ? void 0 : _a.includes(svgId)) ? code : optimize(code, {
        plugins: [
          "cleanupAttrs",
          "removeDoctype",
          "removeComments",
          "removeTitle",
          "removeDesc",
          "removeEmptyAttrs",
          { name: "removeAttrs", params: { attrs: "(data-name|fill)" } }
        ]
      }).data;
      sprites.add(svgId, symbol);
    }
    return sprites.toString({ inline });
  };
  const handleFileCreationOrUpdate = (file, server) => {
    if (!file.includes(inputFolder)) {
      return;
    }
    const code = generateCode();
    server.ws.send("svgsprites:change", { code });
    const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
    if (!mod) {
      return;
    }
    server.moduleGraph.invalidateModule(mod, void 0, Date.now());
  };
  return {
    name: "svgsprites",
    configureServer(server) {
      server.watcher.on("add", (file) => {
        handleFileCreationOrUpdate(file, server);
      });
      server.watcher.on("change", (file) => {
        handleFileCreationOrUpdate(file, server);
      });
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const code = generateCode();
        return `!function(){
  const div = document.createElement('div')
  div.innerHTML = \`${code}\`
  const svg = div.getElementsByTagName('svg')[0]
  const updateSvg = (svg) => {
    if (!svg) { return }
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    svg.setAttribute("aria-hidden", "true")
  }
  const insert = () => {
    if (document.body.firstChild) {
      document.body.insertBefore(div, document.body.firstChild)
    } else {
      document.body.appendChild(div)
    }
  }
  updateSvg(svg)
  if (document.body){
    insert()
  } else {
    document.addEventListener('DOMContentLoaded', insert)
  }
  if (import.meta.hot) {
    import.meta.hot.on('svgsprites:change', (data) => {
      const code = data.code
      div.innerHTML = code
      const svg = div.getElementsByTagName('svg')[0]
      updateSvg(svg)
    })
  }
}()`;
      }
    }
  };
};

// vite.config.ts
var vite_config_default = defineConfig(({ command }) => {
  return {
    server: {
      host: true,
      open: true,
      proxy: {
        "/api/v1": {
          target: "http://127.0.0.1:3688/",
          changeOrigin: command === "serve"
        }
      }
    },
    plugins: [
      Unocss(),
      react(),
      viteMockServe({
        mockPath: "src/mock"
      }),
      svgsprites({ noOptimizeList: ["panda", "chart", "category", "export", "remind", "calendar", "welcome2", "welcome3", "welcome4"] })
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("echarts")) {
              return "echarts";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZV9wbHVnaW5zL3N2Z3Nwcml0ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RlXFxcXHJlYWN0LXBhbmRhc3RlZW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENvZGVcXFxccmVhY3QtcGFuZGFzdGVlblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZS9yZWFjdC1wYW5kYXN0ZWVuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcbmltcG9ydCB7IHN2Z3Nwcml0ZXMgfSBmcm9tICcuL3ZpdGVfcGx1Z2lucy9zdmdzcHJpdGVzJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBwcm94eToge1xuICAgICAgICAnL2FwaS92MSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTI3LjAuMC4xOjM2ODgvJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IGNvbW1hbmQgPT09ICdzZXJ2ZScsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBVbm9jc3MoKSxcbiAgICAgIHJlYWN0KCksXG4gICAgICB2aXRlTW9ja1NlcnZlKHtcbiAgICAgICAgbW9ja1BhdGg6ICdzcmMvbW9jaycsXG4gICAgICB9KSxcbiAgICAgIHN2Z3Nwcml0ZXMoeyBub09wdGltaXplTGlzdDogWydwYW5kYScsICdjaGFydCcsICdjYXRlZ29yeScsICdleHBvcnQnLCAncmVtaW5kJywgJ2NhbGVuZGFyJywgJ3dlbGNvbWUyJywgJ3dlbGNvbWUzJywgJ3dlbGNvbWU0J10gfSlcbiAgICBdLFxuICAgIGJ1aWxkOiB7XG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rcyhpZDogYW55KSB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2VjaGFydHMnKSkgeyByZXR1cm4gJ2VjaGFydHMnIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHsgcmV0dXJuICd2ZW5kb3InIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXENvZGVcXFxccmVhY3QtcGFuZGFzdGVlblxcXFx2aXRlX3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENvZGVcXFxccmVhY3QtcGFuZGFzdGVlblxcXFx2aXRlX3BsdWdpbnNcXFxcc3Znc3ByaXRlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZS9yZWFjdC1wYW5kYXN0ZWVuL3ZpdGVfcGx1Z2lucy9zdmdzcHJpdGVzLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgc3RvcmUgZnJvbSAnc3Znc3RvcmUnXG5pbXBvcnQgeyBvcHRpbWl6ZSB9IGZyb20gJ3N2Z28nXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiwgVml0ZURldlNlcnZlciB9IGZyb20gJ3ZpdGUnXG5cbmludGVyZmFjZSBPcHRpb25zIHtcbiAgaWQ/OiBzdHJpbmdcbiAgaW5wdXRGb2xkZXI/OiBzdHJpbmdcbiAgaW5saW5lPzogYm9vbGVhblxuICBub09wdGltaXplTGlzdD86IHN0cmluZ1tdXG59XG5leHBvcnQgY29uc3Qgc3Znc3ByaXRlcyA9IChvcHRpb25zOiBPcHRpb25zID0ge30pOiBQbHVnaW4gPT4ge1xuICBjb25zdCB2aXJ0dWFsTW9kdWxlSWQgPSBgdmlydHVhbDpzdmdzcHJpdGVzJHtvcHRpb25zLmlkID8gYC0ke29wdGlvbnMuaWR9YCA6ICcnfWBcbiAgY29uc3QgcmVzb2x2ZWRWaXJ0dWFsTW9kdWxlSWQgPSBgXFwwJHt2aXJ0dWFsTW9kdWxlSWR9YFxuICBjb25zdCB7IGlucHV0Rm9sZGVyID0gJ3NyYy9hc3NldHMvaWNvbnMnLCBpbmxpbmUgPSBmYWxzZSB9ID0gb3B0aW9uc1xuXG4gIGNvbnN0IGdlbmVyYXRlQ29kZSA9ICgpID0+IHtcbiAgICBjb25zdCBzcHJpdGVzID0gc3RvcmUob3B0aW9ucylcbiAgICBjb25zdCBpY29uc0RpciA9IHBhdGgucmVzb2x2ZShpbnB1dEZvbGRlcilcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZnMucmVhZGRpclN5bmMoaWNvbnNEaXIpKSB7XG4gICAgICBpZiAoIWZpbGUuZW5kc1dpdGgoJy5zdmcnKSkgeyBjb250aW51ZSB9XG4gICAgICBjb25zdCBmaWxlcGF0aCA9IHBhdGguam9pbihpY29uc0RpciwgZmlsZSlcbiAgICAgIGNvbnN0IHN2Z0lkID0gcGF0aC5wYXJzZShmaWxlKS5uYW1lXG4gICAgICBjb25zdCBjb2RlID0gZnMucmVhZEZpbGVTeW5jKGZpbGVwYXRoLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pXG4gICAgICBjb25zdCBzeW1ib2wgPSBvcHRpb25zLm5vT3B0aW1pemVMaXN0Py5pbmNsdWRlcyhzdmdJZClcbiAgICAgICAgPyBjb2RlXG4gICAgICAgIDogb3B0aW1pemUoY29kZSwge1xuICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICdjbGVhbnVwQXR0cnMnLCAncmVtb3ZlRG9jdHlwZScsICdyZW1vdmVDb21tZW50cycsICdyZW1vdmVUaXRsZScsICdyZW1vdmVEZXNjJywgJ3JlbW92ZUVtcHR5QXR0cnMnLFxuICAgICAgICAgICAgeyBuYW1lOiAncmVtb3ZlQXR0cnMnLCBwYXJhbXM6IHsgYXR0cnM6ICcoZGF0YS1uYW1lfGZpbGwpJyB9IH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSkuZGF0YVxuICAgICAgc3ByaXRlcy5hZGQoc3ZnSWQsIHN5bWJvbClcbiAgICB9XG4gICAgcmV0dXJuIHNwcml0ZXMudG9TdHJpbmcoeyBpbmxpbmUgfSlcbiAgfVxuICBjb25zdCBoYW5kbGVGaWxlQ3JlYXRpb25PclVwZGF0ZSA9IChmaWxlOiBzdHJpbmcsIHNlcnZlcjogVml0ZURldlNlcnZlcikgPT4ge1xuICAgIGlmICghZmlsZS5pbmNsdWRlcyhpbnB1dEZvbGRlcikpIHsgcmV0dXJuIH1cbiAgICBjb25zdCBjb2RlID0gZ2VuZXJhdGVDb2RlKClcbiAgICBzZXJ2ZXIud3Muc2VuZCgnc3Znc3ByaXRlczpjaGFuZ2UnLCB7IGNvZGUgfSlcbiAgICBjb25zdCBtb2QgPSBzZXJ2ZXIubW9kdWxlR3JhcGguZ2V0TW9kdWxlQnlJZChyZXNvbHZlZFZpcnR1YWxNb2R1bGVJZClcbiAgICBpZiAoIW1vZCkgeyByZXR1cm4gfVxuICAgIHNlcnZlci5tb2R1bGVHcmFwaC5pbnZhbGlkYXRlTW9kdWxlKG1vZCwgdW5kZWZpbmVkLCBEYXRlLm5vdygpKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnc3Znc3ByaXRlcycsXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xuICAgICAgc2VydmVyLndhdGNoZXIub24oJ2FkZCcsIChmaWxlKSA9PiB7XG4gICAgICAgIGhhbmRsZUZpbGVDcmVhdGlvbk9yVXBkYXRlKGZpbGUsIHNlcnZlcilcbiAgICAgIH0pXG4gICAgICBzZXJ2ZXIud2F0Y2hlci5vbignY2hhbmdlJywgKGZpbGUpID0+IHtcbiAgICAgICAgaGFuZGxlRmlsZUNyZWF0aW9uT3JVcGRhdGUoZmlsZSwgc2VydmVyKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHJlc29sdmVJZChpZDogc3RyaW5nKSB7XG4gICAgICBpZiAoaWQgPT09IHZpcnR1YWxNb2R1bGVJZCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWRWaXJ0dWFsTW9kdWxlSWRcbiAgICAgIH1cbiAgICB9LFxuICAgIGxvYWQoaWQ6IHN0cmluZykge1xuICAgICAgaWYgKGlkID09PSByZXNvbHZlZFZpcnR1YWxNb2R1bGVJZCkge1xuICAgICAgICBjb25zdCBjb2RlID0gZ2VuZXJhdGVDb2RlKClcbiAgICAgICAgcmV0dXJuIGAhZnVuY3Rpb24oKXtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZGl2LmlubmVySFRNTCA9IFxcYCR7Y29kZX1cXGBcbiAgY29uc3Qgc3ZnID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmcnKVswXVxuICBjb25zdCB1cGRhdGVTdmcgPSAoc3ZnKSA9PiB7XG4gICAgaWYgKCFzdmcpIHsgcmV0dXJuIH1cbiAgICBzdmcuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgc3ZnLnN0eWxlLndpZHRoID0gMFxuICAgIHN2Zy5zdHlsZS5oZWlnaHQgPSAwXG4gICAgc3ZnLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICBzdmcuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpXG4gIH1cbiAgY29uc3QgaW5zZXJ0ID0gKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGRpdiwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdilcbiAgICB9XG4gIH1cbiAgdXBkYXRlU3ZnKHN2ZylcbiAgaWYgKGRvY3VtZW50LmJvZHkpe1xuICAgIGluc2VydCgpXG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluc2VydClcbiAgfVxuICBpZiAoaW1wb3J0Lm1ldGEuaG90KSB7XG4gICAgaW1wb3J0Lm1ldGEuaG90Lm9uKCdzdmdzcHJpdGVzOmNoYW5nZScsIChkYXRhKSA9PiB7XG4gICAgICBjb25zdCBjb2RlID0gZGF0YS5jb2RlXG4gICAgICBkaXYuaW5uZXJIVE1MID0gY29kZVxuICAgICAgY29uc3Qgc3ZnID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmcnKVswXVxuICAgICAgdXBkYXRlU3ZnKHN2ZylcbiAgICB9KVxuICB9XG59KClgXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUSxPQUFPLFdBQVc7QUFDbFIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMscUJBQXFCOzs7QUNIeVEsT0FBTyxVQUFVO0FBQ3hULE9BQU8sUUFBUTtBQUNmLE9BQU8sV0FBVztBQUNsQixTQUFTLGdCQUFnQjtBQVNsQixJQUFNLGFBQWEsQ0FBQyxVQUFtQixDQUFDLE1BQWM7QUFDM0QsUUFBTSxrQkFBa0IscUJBQXFCLFFBQVEsS0FBSyxJQUFJLFFBQVEsT0FBTztBQUM3RSxRQUFNLDBCQUEwQixLQUFLO0FBQ3JDLFFBQU0sRUFBRSxjQUFjLG9CQUFvQixTQUFTLE1BQU0sSUFBSTtBQUU3RCxRQUFNLGVBQWUsTUFBTTtBQWpCN0I7QUFrQkksVUFBTSxVQUFVLE1BQU0sT0FBTztBQUM3QixVQUFNLFdBQVcsS0FBSyxRQUFRLFdBQVc7QUFDekMsZUFBVyxRQUFRLEdBQUcsWUFBWSxRQUFRLEdBQUc7QUFDM0MsVUFBSSxDQUFDLEtBQUssU0FBUyxNQUFNLEdBQUc7QUFBRTtBQUFBLE1BQVM7QUFDdkMsWUFBTSxXQUFXLEtBQUssS0FBSyxVQUFVLElBQUk7QUFDekMsWUFBTSxRQUFRLEtBQUssTUFBTSxJQUFJLEVBQUU7QUFDL0IsWUFBTSxPQUFPLEdBQUcsYUFBYSxVQUFVLEVBQUUsVUFBVSxRQUFRLENBQUM7QUFDNUQsWUFBTSxXQUFTLGFBQVEsbUJBQVIsbUJBQXdCLFNBQVMsVUFDNUMsT0FDQSxTQUFTLE1BQU07QUFBQSxRQUNmLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFBZ0I7QUFBQSxVQUFpQjtBQUFBLFVBQWtCO0FBQUEsVUFBZTtBQUFBLFVBQWM7QUFBQSxVQUNoRixFQUFFLE1BQU0sZUFBZSxRQUFRLEVBQUUsT0FBTyxtQkFBbUIsRUFBRTtBQUFBLFFBQy9EO0FBQUEsTUFDRixDQUFDLEVBQUU7QUFDTCxjQUFRLElBQUksT0FBTyxNQUFNO0FBQUEsSUFDM0I7QUFDQSxXQUFPLFFBQVEsU0FBUyxFQUFFLE9BQU8sQ0FBQztBQUFBLEVBQ3BDO0FBQ0EsUUFBTSw2QkFBNkIsQ0FBQyxNQUFjLFdBQTBCO0FBQzFFLFFBQUksQ0FBQyxLQUFLLFNBQVMsV0FBVyxHQUFHO0FBQUU7QUFBQSxJQUFPO0FBQzFDLFVBQU0sT0FBTyxhQUFhO0FBQzFCLFdBQU8sR0FBRyxLQUFLLHFCQUFxQixFQUFFLEtBQUssQ0FBQztBQUM1QyxVQUFNLE1BQU0sT0FBTyxZQUFZLGNBQWMsdUJBQXVCO0FBQ3BFLFFBQUksQ0FBQyxLQUFLO0FBQUU7QUFBQSxJQUFPO0FBQ25CLFdBQU8sWUFBWSxpQkFBaUIsS0FBSyxRQUFXLEtBQUssSUFBSSxDQUFDO0FBQUEsRUFDaEU7QUFFQSxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixnQkFBZ0IsUUFBUTtBQUN0QixhQUFPLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUztBQUNqQyxtQ0FBMkIsTUFBTSxNQUFNO0FBQUEsTUFDekMsQ0FBQztBQUNELGFBQU8sUUFBUSxHQUFHLFVBQVUsQ0FBQyxTQUFTO0FBQ3BDLG1DQUEyQixNQUFNLE1BQU07QUFBQSxNQUN6QyxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsVUFBVSxJQUFZO0FBQ3BCLFVBQUksT0FBTyxpQkFBaUI7QUFDMUIsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLLElBQVk7QUFDZixVQUFJLE9BQU8seUJBQXlCO0FBQ2xDLGNBQU0sT0FBTyxhQUFhO0FBQzFCLGVBQU87QUFBQTtBQUFBLHNCQUVPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWdDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUQ5RkEsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxRQUFRLE1BQU07QUFDM0MsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsV0FBVztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsY0FBYyxZQUFZO0FBQUEsUUFDNUI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsV0FBVyxFQUFFLGdCQUFnQixDQUFDLFNBQVMsU0FBUyxZQUFZLFVBQVUsVUFBVSxZQUFZLFlBQVksWUFBWSxVQUFVLEVBQUUsQ0FBQztBQUFBLElBQ25JO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixhQUFhLElBQVM7QUFDcEIsZ0JBQUksR0FBRyxTQUFTLFNBQVMsR0FBRztBQUFFLHFCQUFPO0FBQUEsWUFBVTtBQUMvQyxnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQUUscUJBQU87QUFBQSxZQUFTO0FBQUEsVUFDckQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
