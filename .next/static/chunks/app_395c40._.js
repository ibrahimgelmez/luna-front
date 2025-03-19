(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  'static/chunks/app_395c40._.js',
  {
    '[project]/app/components/NewSideBar/page.js [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict';

      var {
        r: __turbopack_require__,
        f: __turbopack_module_context__,
        i: __turbopack_import__,
        s: __turbopack_esm__,
        v: __turbopack_export_value__,
        n: __turbopack_export_namespace__,
        c: __turbopack_cache__,
        M: __turbopack_modules__,
        l: __turbopack_load__,
        j: __turbopack_dynamic__,
        P: __turbopack_resolve_absolute_path__,
        U: __turbopack_relative_url__,
        R: __turbopack_resolve_module_id_path__,
        b: __turbopack_worker_blob_url__,
        g: global,
        __dirname,
        k: __turbopack_refresh__,
        m: module,
        z: __turbopack_require_stub__,
      } = __turbopack_context__;
      {
        __turbopack_esm__({
          default: () => NewSidebar,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/node_modules/react-icons/hi/index.mjs [app-client] (ecmascript)'
          );
        var _s = __turbopack_refresh__.signature();
        ('use client');
        function NewSidebar() {
          _s();
          const [isOpen, setIsOpen] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false);
          const toggleSidebar = () => {
            setIsOpen(!isOpen);
          };
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'Fragment'
            ],
            {
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: `fixed inset-0 bg-black bg-opacity-50 z-40 ${
                      isOpen ? 'block' : 'hidden'
                    }`,
                    onClick: toggleSidebar,
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/NewSideBar/page.js',
                    lineNumber: 15,
                    columnNumber: 7,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: `fixed top-0 left-0 h-full w-64 bg-[#0000cd] text-[#ffffff] z-50 transform ${
                      isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out`,
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className: 'p-4 mt-16',
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'h1',
                            {
                              className: 'text-2xl font-bold',
                              children: 'Luna',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/app/components/NewSideBar/page.js',
                              lineNumber: 27,
                              columnNumber: 11,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'p',
                            {
                              className: 'text-sm mt-2',
                              children: 'Şirket Adı',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/app/components/NewSideBar/page.js',
                              lineNumber: 28,
                              columnNumber: 11,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'nav',
                            {
                              className: 'mt-6',
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'ul',
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'li',
                                      {
                                        className: 'mb-4',
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'default'
                                          ],
                                          {
                                            href: '/homepage',
                                            className: 'hover:text-gray-400',
                                            children: '/homepage',
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/app/components/NewSideBar/page.js',
                                            lineNumber: 32,
                                            columnNumber: 17,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/app/components/NewSideBar/page.js',
                                        lineNumber: 31,
                                        columnNumber: 15,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'li',
                                      {
                                        className: 'mb-4',
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'default'
                                          ],
                                          {
                                            href: '/projects',
                                            className: 'hover:text-gray-400',
                                            children: '/projects',
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/app/components/NewSideBar/page.js',
                                            lineNumber: 37,
                                            columnNumber: 17,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/app/components/NewSideBar/page.js',
                                        lineNumber: 36,
                                        columnNumber: 15,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'li',
                                      {
                                        className: 'mb-4',
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'default'
                                          ],
                                          {
                                            href: '/project-tracking',
                                            className: 'hover:text-gray-400',
                                            children: '/project-tracking',
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/app/components/NewSideBar/page.js',
                                            lineNumber: 42,
                                            columnNumber: 17,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/app/components/NewSideBar/page.js',
                                        lineNumber: 41,
                                        columnNumber: 15,
                                      },
                                      this
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/app/components/NewSideBar/page.js',
                                  lineNumber: 30,
                                  columnNumber: 13,
                                },
                                this
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/app/components/NewSideBar/page.js',
                              lineNumber: 29,
                              columnNumber: 11,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: '[project]/app/components/NewSideBar/page.js',
                        lineNumber: 26,
                        columnNumber: 9,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/NewSideBar/page.js',
                    lineNumber: 21,
                    columnNumber: 7,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'button',
                  {
                    onClick: toggleSidebar,
                    className:
                      'fixed top-4 left-4 z-50 p-2 bg-[#001A78] text-[#eaf1f7] rounded-lg',
                    children: isOpen
                      ? '✕'
                      : /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'HiOutlineMenuAlt2'
                          ],
                          {
                            size: 32,
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/app/components/NewSideBar/page.js',
                            lineNumber: 54,
                            columnNumber: 25,
                          },
                          this
                        ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/NewSideBar/page.js',
                    lineNumber: 50,
                    columnNumber: 7,
                  },
                  this
                ),
              ],
            },
            void 0,
            true
          );
        }
        _s(NewSidebar, '+sus0Lb0ewKHdwiUhiTAJFoFyQ0=');
        _c = NewSidebar;
        var _c;
        __turbopack_refresh__.register(_c, 'NewSidebar');
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_refresh__.registerExports(
            module,
            globalThis.$RefreshHelpers$
          );
        }
      }
    },
    '[project]/app/projects/page.js [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict';

      var {
        r: __turbopack_require__,
        f: __turbopack_module_context__,
        i: __turbopack_import__,
        s: __turbopack_esm__,
        v: __turbopack_export_value__,
        n: __turbopack_export_namespace__,
        c: __turbopack_cache__,
        M: __turbopack_modules__,
        l: __turbopack_load__,
        j: __turbopack_dynamic__,
        P: __turbopack_resolve_absolute_path__,
        U: __turbopack_relative_url__,
        R: __turbopack_resolve_module_id_path__,
        b: __turbopack_worker_blob_url__,
        g: global,
        __dirname,
        k: __turbopack_refresh__,
        m: module,
        z: __turbopack_require_stub__,
      } = __turbopack_context__;
      {
        __turbopack_esm__({
          default: () => Projects,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/context/AuthContext.js [app-client] (ecmascript)'
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NewSideBar$2f$page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/app/components/NewSideBar/page.js [app-client] (ecmascript)'
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_import__(
            '[project]/node_modules/react-icons/ri/index.mjs [app-client] (ecmascript)'
          );
        var _s = __turbopack_refresh__.signature();
        ('use client');
        function Projects() {
          _s();
          const [projects, setProjects] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])([]);
          const { bearerKey } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useAuth'
          ])();
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(
            {
              'Projects.useEffect': () => {
                const fetchProjects = {
                  'Projects.useEffect.fetchProjects': async () => {
                    const response = await fetch(
                      'http://localhost:8081/projects',
                      {
                        method: 'GET',
                        headers: {
                          Authorization: `Bearer ${bearerKey}`,
                          'Content-Type': 'application/json',
                        },
                      }
                    );
                    const data = await response.json();
                    console.log('DATA', data._embedded.projects);
                    setProjects(data._embedded.projects);
                  },
                }['Projects.useEffect.fetchProjects'];
                fetchProjects();
              },
            }['Projects.useEffect'],
            [bearerKey]
          );
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: 'p-4 pt-16 bg-[#eff8fb] px-32 h-[100vh] relative',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NewSideBar$2f$page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'default'
                  ],
                  {},
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/projects/page.js',
                    lineNumber: 33,
                    columnNumber: 7,
                  },
                  this
                ),
                ' ',
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'flex justify-between items-center mb-16',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h1',
                        {
                          className: 'text-[40px] font-bold text-[#0000cd]',
                          children: 'Projelerim',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/projects/page.js',
                          lineNumber: 38,
                          columnNumber: 9,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'select',
                        {
                          className: 'p-2 border rounded text-black ',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'option',
                              {
                                value: '',
                                disabled: true,
                                hidden: true,
                                selected: true,
                                children: 'Sırala',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/projects/page.js',
                                lineNumber: 40,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'option',
                              {
                                className: 'text-[#cae1ff]',
                                children: 'Yakın Tarihe Göre Sırala',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/projects/page.js',
                                lineNumber: 43,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'option',
                              {
                                className: 'text-[#cae1ff]',
                                children: 'Bitme Yüzdesine Göre Sırala',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/projects/page.js',
                                lineNumber: 44,
                                columnNumber: 11,
                              },
                              this
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/app/projects/page.js',
                          lineNumber: 39,
                          columnNumber: 9,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/projects/page.js',
                    lineNumber: 37,
                    columnNumber: 7,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'space-y-4',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className:
                            'grid grid-cols-5 gap-4 font-bold border-b pb-2 text-[#0000cd] text-[18px] text-center',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {
                                children: 'Proje Adı',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/projects/page.js',
                                lineNumber: 52,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {
                                children: 'Başlangıç Tarihi',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/projects/page.js',
                                lineNumber: 53,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {
                                children: 'Bitiş Tarihi',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/projects/page.js',
                                lineNumber: 54,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {
                                children: 'Proje Türü',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/projects/page.js',
                                lineNumber: 55,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {},
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/projects/page.js',
                                lineNumber: 56,
                                columnNumber: 11,
                              },
                              this
                            ),
                            ' ',
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/app/projects/page.js',
                          lineNumber: 51,
                          columnNumber: 9,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'max-h-[600px] h-[75vh] overflow-y-auto',
                          children: projects.map((project) =>
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'grid grid-cols-5 mt-4 gap-4 p-4 border rounded-lg shadow-sm items-center bg-[#0000cd] text-[white] text-center',
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'span',
                                    {
                                      className: 'text-lg font-semibold',
                                      children: project.projectName,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/app/projects/page.js',
                                      lineNumber: 65,
                                      columnNumber: 15,
                                    },
                                    this
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'span',
                                    {
                                      children: new Date(
                                        project.projectStartDate
                                      ).toLocaleDateString(),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/app/projects/page.js',
                                      lineNumber: 68,
                                      columnNumber: 15,
                                    },
                                    this
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'span',
                                    {
                                      children: new Date(
                                        project.projectEndDate
                                      ).toLocaleDateString(),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/app/projects/page.js',
                                      lineNumber: 71,
                                      columnNumber: 15,
                                    },
                                    this
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'span',
                                    {
                                      children: project.projectType,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/app/projects/page.js',
                                      lineNumber: 74,
                                      columnNumber: 15,
                                    },
                                    this
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'span',
                                    {
                                      className: 'flex justify-end',
                                      children: /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'RiArrowRightDoubleFill'
                                        ],
                                        {
                                          color: '#001A78',
                                          size: 30,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/app/projects/page.js',
                                          lineNumber: 76,
                                          columnNumber: 17,
                                        },
                                        this
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/app/projects/page.js',
                                      lineNumber: 75,
                                      columnNumber: 15,
                                    },
                                    this
                                  ),
                                ],
                              },
                              project.projectId,
                              true,
                              {
                                fileName: '[project]/app/projects/page.js',
                                lineNumber: 61,
                                columnNumber: 13,
                              },
                              this
                            )
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/projects/page.js',
                          lineNumber: 58,
                          columnNumber: 9,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/projects/page.js',
                    lineNumber: 49,
                    columnNumber: 7,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/app/projects/page.js',
              lineNumber: 32,
              columnNumber: 5,
            },
            this
          );
        }
        _s(Projects, 'xcaboDDIVmP1tc+aTFI+mVMkJRg=', false, function () {
          return [
            __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useAuth'
            ],
          ];
        });
        _c = Projects;
        var _c;
        __turbopack_refresh__.register(_c, 'Projects');
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_refresh__.registerExports(
            module,
            globalThis.$RefreshHelpers$
          );
        }
      }
    },
    '[project]/app/projects/page.js [app-rsc] (ecmascript, Next.js server component, client modules)':
      (__turbopack_context__) => {
        var {
          r: __turbopack_require__,
          f: __turbopack_module_context__,
          i: __turbopack_import__,
          s: __turbopack_esm__,
          v: __turbopack_export_value__,
          n: __turbopack_export_namespace__,
          c: __turbopack_cache__,
          M: __turbopack_modules__,
          l: __turbopack_load__,
          j: __turbopack_dynamic__,
          P: __turbopack_resolve_absolute_path__,
          U: __turbopack_relative_url__,
          R: __turbopack_resolve_module_id_path__,
          b: __turbopack_worker_blob_url__,
          g: global,
          __dirname,
          t: __turbopack_require_real__,
        } = __turbopack_context__;
        {
        }
      },
  },
]);

//# sourceMappingURL=app_395c40._.js.map
