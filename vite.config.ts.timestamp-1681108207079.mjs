// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/wbs/pandasteen-react/node_modules/.pnpm/registry.npmmirror.com+vite@4.1.3_sass@1.56.1/node_modules/vite/dist/node/index.js";
import react from "file:///D:/wbs/pandasteen-react/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-react@3.1.0_vite@4.1.3/node_modules/@vitejs/plugin-react/dist/index.mjs";
import Unocss from "file:///D:/wbs/pandasteen-react/node_modules/.pnpm/registry.npmmirror.com+unocss@0.51.2_xgzl6pzmpyjiljeah25sxuxrrm/node_modules/unocss/dist/vite.mjs";
import { viteMockServe } from "file:///D:/wbs/pandasteen-react/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-mock@2.9.6_yeh3emj5org6q2oc65wupk7hla/node_modules/vite-plugin-mock/dist/index.js";

// vite_plugins/svgsprites.ts
import path from "path";
import fs from "fs";
import store from "file:///D:/wbs/pandasteen-react/node_modules/.pnpm/registry.npmmirror.com+svgstore@3.0.1/node_modules/svgstore/src/svgstore.js";
import { optimize } from "file:///D:/wbs/pandasteen-react/node_modules/.pnpm/registry.npmmirror.com+svgo@3.0.1/node_modules/svgo/lib/svgo-node.js";
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
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      proxy: {
        "/api/": {
          open: true,
          port: 5173,
          target: "http://121.5.55.95:8080/",
          changeOrigin: command === "serve",
          rewrite: (path2) => path2.replace(/^\/api/, "api")
        }
      }
    },
    define: {
      isDev: command === "serve"
    },
    plugins: [
      Unocss(),
      react(),
      viteMockServe(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZV9wbHVnaW5zL3N2Z3Nwcml0ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3YnNcXFxccGFuZGFzdGVlbi1yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd2JzXFxcXHBhbmRhc3RlZW4tcmVhY3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dicy9wYW5kYXN0ZWVuLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcbmltcG9ydCB7IHN2Z3Nwcml0ZXMgfSBmcm9tICcuL3ZpdGVfcGx1Z2lucy9zdmdzcHJpdGVzJ1xuXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSwgY29tbWFuZCB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgcmV0dXJuIHtcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvYXBpLyc6IHtcbiAgICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICAgIHBvcnQ6IDUxNzMsXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzEyMS4xOTYuMjM2Ljk0OjgwODAvJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IGNvbW1hbmQgPT09ICdzZXJ2ZScsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICdhcGknKSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgaXNEZXY6IGNvbW1hbmQgPT09ICdzZXJ2ZSdcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIFVub2NzcygpLFxuICAgICAgcmVhY3QoKSxcbiAgICAgIHZpdGVNb2NrU2VydmUoKSxcbiAgICAgIHN2Z3Nwcml0ZXMoeyBub09wdGltaXplTGlzdDogWydwYW5kYScsICdjaGFydCcsICdjYXRlZ29yeScsICdleHBvcnQnLCAncmVtaW5kJywgJ2NhbGVuZGFyJywgJ3dlbGNvbWUyJywgJ3dlbGNvbWUzJywgJ3dlbGNvbWU0J10gfSlcbiAgICBdLFxuICAgIGJ1aWxkOiB7XG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rcyhpZDogYW55KSB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2VjaGFydHMnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ2VjaGFydHMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH1cbn0pIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3YnNcXFxccGFuZGFzdGVlbi1yZWFjdFxcXFx2aXRlX3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdic1xcXFxwYW5kYXN0ZWVuLXJlYWN0XFxcXHZpdGVfcGx1Z2luc1xcXFxzdmdzcHJpdGVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93YnMvcGFuZGFzdGVlbi1yZWFjdC92aXRlX3BsdWdpbnMvc3Znc3ByaXRlcy50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBmcyBmcm9tICdmcydcclxuaW1wb3J0IHN0b3JlIGZyb20gJ3N2Z3N0b3JlJ1xyXG5pbXBvcnQgeyBvcHRpbWl6ZSB9IGZyb20gJ3N2Z28nXHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luLCBWaXRlRGV2U2VydmVyIH0gZnJvbSAndml0ZSdcclxuXHJcbmludGVyZmFjZSBPcHRpb25zIHtcclxuICBpZD86IHN0cmluZ1xyXG4gIGlucHV0Rm9sZGVyPzogc3RyaW5nXHJcbiAgaW5saW5lPzogYm9vbGVhblxyXG4gIG5vT3B0aW1pemVMaXN0Pzogc3RyaW5nW11cclxufVxyXG5leHBvcnQgY29uc3Qgc3Znc3ByaXRlcyA9IChvcHRpb25zOiBPcHRpb25zID0ge30pOiBQbHVnaW4gPT4ge1xyXG4gIGNvbnN0IHZpcnR1YWxNb2R1bGVJZCA9IGB2aXJ0dWFsOnN2Z3Nwcml0ZXMke29wdGlvbnMuaWQgPyBgLSR7b3B0aW9ucy5pZH1gIDogJyd9YFxyXG4gIGNvbnN0IHJlc29sdmVkVmlydHVhbE1vZHVsZUlkID0gYFxcMCR7dmlydHVhbE1vZHVsZUlkfWBcclxuICBjb25zdCB7IGlucHV0Rm9sZGVyID0gJ3NyYy9hc3NldHMvaWNvbnMnLCBpbmxpbmUgPSBmYWxzZSB9ID0gb3B0aW9uc1xyXG5cclxuICBjb25zdCBnZW5lcmF0ZUNvZGUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzcHJpdGVzID0gc3RvcmUob3B0aW9ucylcclxuICAgIGNvbnN0IGljb25zRGlyID0gcGF0aC5yZXNvbHZlKGlucHV0Rm9sZGVyKVxyXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZzLnJlYWRkaXJTeW5jKGljb25zRGlyKSkge1xyXG4gICAgICBpZiAoIWZpbGUuZW5kc1dpdGgoJy5zdmcnKSkgeyBjb250aW51ZSB9XHJcbiAgICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5qb2luKGljb25zRGlyLCBmaWxlKVxyXG4gICAgICBjb25zdCBzdmdJZCA9IHBhdGgucGFyc2UoZmlsZSkubmFtZVxyXG4gICAgICBjb25zdCBjb2RlID0gZnMucmVhZEZpbGVTeW5jKGZpbGVwYXRoLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pXHJcbiAgICAgIGNvbnN0IHN5bWJvbCA9IG9wdGlvbnMubm9PcHRpbWl6ZUxpc3Q/LmluY2x1ZGVzKHN2Z0lkKVxyXG4gICAgICAgID8gY29kZVxyXG4gICAgICAgIDogb3B0aW1pemUoY29kZSwge1xyXG4gICAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICAnY2xlYW51cEF0dHJzJywgJ3JlbW92ZURvY3R5cGUnLCAncmVtb3ZlQ29tbWVudHMnLCAncmVtb3ZlVGl0bGUnLCAncmVtb3ZlRGVzYycsICdyZW1vdmVFbXB0eUF0dHJzJyxcclxuICAgICAgICAgICAgeyBuYW1lOiAncmVtb3ZlQXR0cnMnLCBwYXJhbXM6IHsgYXR0cnM6ICcoZGF0YS1uYW1lfGZpbGwpJyB9IH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0pLmRhdGFcclxuICAgICAgc3ByaXRlcy5hZGQoc3ZnSWQsIHN5bWJvbClcclxuICAgIH1cclxuICAgIHJldHVybiBzcHJpdGVzLnRvU3RyaW5nKHsgaW5saW5lIH0pXHJcbiAgfVxyXG4gIGNvbnN0IGhhbmRsZUZpbGVDcmVhdGlvbk9yVXBkYXRlID0gKGZpbGU6IHN0cmluZywgc2VydmVyOiBWaXRlRGV2U2VydmVyKSA9PiB7XHJcbiAgICBpZiAoIWZpbGUuaW5jbHVkZXMoaW5wdXRGb2xkZXIpKSB7IHJldHVybiB9XHJcbiAgICBjb25zdCBjb2RlID0gZ2VuZXJhdGVDb2RlKClcclxuICAgIHNlcnZlci53cy5zZW5kKCdzdmdzcHJpdGVzOmNoYW5nZScsIHsgY29kZSB9KVxyXG4gICAgY29uc3QgbW9kID0gc2VydmVyLm1vZHVsZUdyYXBoLmdldE1vZHVsZUJ5SWQocmVzb2x2ZWRWaXJ0dWFsTW9kdWxlSWQpXHJcbiAgICBpZiAoIW1vZCkgeyByZXR1cm4gfVxyXG4gICAgc2VydmVyLm1vZHVsZUdyYXBoLmludmFsaWRhdGVNb2R1bGUobW9kLCB1bmRlZmluZWQsIERhdGUubm93KCkpXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3N2Z3Nwcml0ZXMnLFxyXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xyXG4gICAgICBzZXJ2ZXIud2F0Y2hlci5vbignYWRkJywgKGZpbGUpID0+IHtcclxuICAgICAgICBoYW5kbGVGaWxlQ3JlYXRpb25PclVwZGF0ZShmaWxlLCBzZXJ2ZXIpXHJcbiAgICAgIH0pXHJcbiAgICAgIHNlcnZlci53YXRjaGVyLm9uKCdjaGFuZ2UnLCAoZmlsZSkgPT4ge1xyXG4gICAgICAgIGhhbmRsZUZpbGVDcmVhdGlvbk9yVXBkYXRlKGZpbGUsIHNlcnZlcilcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICByZXNvbHZlSWQoaWQ6IHN0cmluZykge1xyXG4gICAgICBpZiAoaWQgPT09IHZpcnR1YWxNb2R1bGVJZCkge1xyXG4gICAgICAgIHJldHVybiByZXNvbHZlZFZpcnR1YWxNb2R1bGVJZFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbG9hZChpZDogc3RyaW5nKSB7XHJcbiAgICAgIGlmIChpZCA9PT0gcmVzb2x2ZWRWaXJ0dWFsTW9kdWxlSWQpIHtcclxuICAgICAgICBjb25zdCBjb2RlID0gZ2VuZXJhdGVDb2RlKClcclxuICAgICAgICByZXR1cm4gYCFmdW5jdGlvbigpe1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgZGl2LmlubmVySFRNTCA9IFxcYCR7Y29kZX1cXGBcclxuICBjb25zdCBzdmcgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N2ZycpWzBdXHJcbiAgY29uc3QgdXBkYXRlU3ZnID0gKHN2ZykgPT4ge1xyXG4gICAgaWYgKCFzdmcpIHsgcmV0dXJuIH1cclxuICAgIHN2Zy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcclxuICAgIHN2Zy5zdHlsZS53aWR0aCA9IDBcclxuICAgIHN2Zy5zdHlsZS5oZWlnaHQgPSAwXHJcbiAgICBzdmcuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xyXG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKVxyXG4gIH1cclxuICBjb25zdCBpbnNlcnQgPSAoKSA9PiB7XHJcbiAgICBpZiAoZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGRpdiwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZVN2ZyhzdmcpXHJcbiAgaWYgKGRvY3VtZW50LmJvZHkpe1xyXG4gICAgaW5zZXJ0KClcclxuICB9IGVsc2Uge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluc2VydClcclxuICB9XHJcbiAgaWYgKGltcG9ydC5tZXRhLmhvdCkge1xyXG4gICAgaW1wb3J0Lm1ldGEuaG90Lm9uKCdzdmdzcHJpdGVzOmNoYW5nZScsIChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSBkYXRhLmNvZGVcclxuICAgICAgZGl2LmlubmVySFRNTCA9IGNvZGVcclxuICAgICAgY29uc3Qgc3ZnID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmcnKVswXVxyXG4gICAgICB1cGRhdGVTdmcoc3ZnKVxyXG4gICAgfSlcclxuICB9XHJcbn0oKWBcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9XHJcbn0i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
