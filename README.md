# Sintaku

画像作品を共有する WEB サービスです。  
サイズの大きい画像を扱うことを想定し、Next.js/Vercel/Django
で高速なアプリケーションを構築しています。
### テストユーザー
email: `test@example.com`  
pass: `test`

# 機能

- 投稿一覧ページ
- 詳細ページ
- マイページ
  - プロフィールの変更
  - 投稿一覧
- 新規投稿
  - 投稿画像のプレビュー
  - サムネイルのクロップ
- コメント
- いいね
- 全文検索
- ログイン・新規ユーザー登録(JWT 認証)
- ページネーション
- レスポンシブ対応

# 使用技術

- React 17.0.2
- Next.js 10.2.3
- React Query(サーバーデータの管理)
- Redux Toolkit(クライアントデータの管理)
- Styled Components
- Django REST Framework(API)

# インフラ構成

- Next.js
  - Vercel
- Django
  - EC2
  - S3
  - Route53

# テスト

- Jest, testing-library
  - 単体テスト
