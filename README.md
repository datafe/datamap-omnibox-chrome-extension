<div align="center">
<img src="https://img.alicdn.com/imgextra/i3/O1CN01FZeXqK1XjGsLAR6LX_!!6000000002959-2-tps-128-128.png" alt="logo"/>
<h1>DataWorks DataMap Omnibox Chrome Extension</h1>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)

</div>

## Usage Documents

## Demo

### 应用安装 Extension Installation 

- 插件安装地址 [link](https://chromewebstore.google.com/detail/%E9%98%BF%E9%87%8C%E4%BA%91%E6%95%B0%E6%8D%AE%E5%9C%B0%E5%9B%BE%E6%90%9C%E7%B4%A2/jepgnngepfkgbnmiojimhengljiofeee?hl=en)

- 此插件能将输入的搜索字跳转至 DataWorks 数据地图
- 只需于 Chrome URL 框上打 dmc+Tab键 (或dmc+空白键) 即可呼起使用。敲入关键字、地域名及表类型，即跳至对应地域的数据地图，并填入搜索文字，如 hangzhou holo test，代表在杭州地域搜索 test 的 Hologres 表，而且插件会记住此次使用的地域与表类型，下次直接搜关键字即可。
- 支持选取文字后透过右键将文字送至数据地图进行搜索
- 地域支持 inner, shanghai, hangzhou, beijing, shenzhen, hongkong, singapore, tokyo 等
- 表类型支持 maxcompute, emr, hologres, postgresql, mysql, ots, cdh, ads, sqlserver, oracle, analyticdb_for_mysql, hybriddb_for_postgresql, dlf
- 若需要进阶能力如在 Chrome URL 框上直接进行搜表，可参考此插件 [link](https://chromewebstore.google.com/detail/dataworks-%E6%90%9C%E8%A1%A8/pchandealfkoepcpkddkijpfiglgjkgi?hl=en)

### 操作影片
- [YouTube](https://www.youtube.com/watch?v=aNgb5kOtQCA)

### URL 框搜索 (能根据输入文字判断地域、表类型并跳转 DataWorks 数据地图)
![image](https://img.alicdn.com/imgextra/i1/O1CN01EMlqqU1p8mP6NOauT_!!6000000005316-0-tps-516-200.jpg)

### 支持选取文字后透过右键进行表搜索
![image](https://img.alicdn.com/imgextra/i3/O1CN01W9Hzbx1UsTzoeNLbv_!!6000000002573-0-tps-1280-800.jpg)

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Installation](#installation)
    - [Procedures](#procedures)
        - [Chrome](#chrome)
        - [Firefox](#firefox)
- [Documents](#documents)

## Intro <a name="intro"></a>

This is a Chrome extension source code.

## Features <a name="features"></a>

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vite](https://vitejs.dev/)
- [SASS](https://sass-lang.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/getting-started.html#automatic-recommended)
- [Commitlint](https://commitlint.js.org/#/guides-local-setup?id=install-commitlint)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- HRR(Hot Rebuild & Refresh/Reload)

## Installation <a name="installation"></a>

## Procedures: <a name="procedures"></a>

1. Clone this repository.
2. Change `name` and `description` in package.json => **Auto synchronize with manifest**
3. Install pnpm globally: `npm install -g pnpm` (check your node version >= 16.6, recommended >= 18)
4. Run `pnpm install`

## And next, depending on the needs:

### For Chrome: <a name="chrome"></a>

1. Run:
    - Dev: `pnpm dev` or `npm run dev`
    - Prod: `pnpm build` or `npm run build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder

### For Firefox: <a name="firefox"></a>

1. Run:
    - Dev: `pnpm dev:firefox` or `npm run dev:firefox`
    - Prod: `pnpm build:firefox` or `npm run build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from `dist` folder

### <i>Remember in firefox you add plugin in temporary mode, that's mean it's disappear after close browser, you must do it again, on next launch.</i>

## Documents <a name="documents"></a>

- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [ChromeExtension](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Rollup-plugin-chrome-extension](https://www.extend-chrome.dev/rollup-plugin)

