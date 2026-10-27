# RR Field Notes

Astro 7.4.2 + TypeScript + Content Collections，部署於 https://raywang2.github.io/。

## 本機

Node.js 24 LTS：

```sh
npm ci
npm run check
npm run build
npm run verify
npm run dev
```

## 路徑

- `/` 首頁
- `/posts/`、`/posts/<filename>/` 文章
- `/categories/`、`/categories/<category>/` 分類
- `/tags/`、`/tags/<tag>/` 標籤
- `/projects/`、`/projects/<id>/` 專案與關聯文章
- `/rss.xml` RSS（摘要）
- `/feed.json` JSON Feed 1.1（內文為 Markdown 純文字）
- `/sitemap-index.xml`、`/robots.txt`

`src/content.config.ts` 驗證內容；`src/lib/posts.ts` 統一排除草稿與未來文章。文章日期含時區較明確；日期欄位只填日期時以 UTC 午夜解讀。未來文章需要在日期到達後重新觸發建置才會發布。未填 draft 時預設為 true。檔名就是穩定網址，發布後避免改名。

## Pages CMS 與 PR 優先

1. 安裝 Pages CMS GitHub App，僅授權本 repository；不用給三個原專案存取權。
2. 在 GitHub 從 main 建立 `content/<topic>` 分支。
3. 登入 https://app.pagescms.org/，選取 repository **與內容分支**，讀取 `.pages.yml`。
4. 新增文章，預設草稿。圖片放 `public/uploads`，內文引用 `/uploads/...`。
5. 完稿後取消草稿，提交到該內容分支，透過 GitHub 建立 PR。
6. 檢查 Actions 與差異，再人工合併。CMS 不保證自動建立 PR，請勿直接在 main 編輯。

建議人工啟用 main ruleset：Require a pull request、required check `build`、禁止 force push 與刪除。不強制自己的 PR 必須另一人核准，以免個人 repository 無法合併。

## 首次建立與發布（需帳號管理權限）

目標 `raywang2/raywang2.github.io` 已建立；保留既有資料，以 PR 審查網站改動。

若不存在：建立 public repository，勾選初始化 README；這是 PR 所需的基底。將本專案內容放入新分支，保留遠端原 README 的有用內容，開 draft PR 到 main。不要把本機 main 強推到遠端。

Settings → Pages → Source 選 GitHub Actions。PR 只做型別檢查、建置與產物驗證；只有 main 可以部署，且部署不使用 `pull_request_target`。合併後由 Pages 官方 Actions 發布並檢查上線 URL。必要時先核准 github-pages environment。

本機產物檢查不等於已上線；必須看到 deploy job 與其 Verify live deployment 成功才算部署驗證完成。

## 既有專案邊界

三個既有 repository 未修改；Blog 僅提供專案介紹與三篇入口文章。地圖、GPX、PWA、localStorage 仍由原專案維護，不建立根路徑 Service Worker，避免影響既有子站。首頁插畫以 CSS 繪製，沒有第三方圖片或字型依賴。

目前入口文是專案導覽，並非虛構旅行心得。鐵駱駝沒有根目錄 README，介紹刻意保持簡短；可後續補充經確認的專案細節。

## 復原

保留 package-lock.json，CI 使用 npm ci。部署失敗時既有 Pages 版本不應被未完成建置取代；回退請以 revert PR 產生新 commit，勿 force push。三個原專案維持各自部署。
