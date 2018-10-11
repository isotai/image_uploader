# 要件

**Kiberaの記事編集機能を作る**
- [ ] 　　マークダウンできるようにする。
- [ ] 　　GUIにドラック&ドロップまたは、コピーアンドペーストで画像をアップロードする
- [ ]  画像、記事など非同期で保存して、非同期でプレビューする。

# 仕様
### モデル
**img table**
belog to ariticle
- id
- name
- pass

**article table**
has many img
- id
- img_id (*)
- name
- pass
- text

###  ビュー
**edit**
画像をアップロードする。ここで非同期アップロード&プレビュー

**reference:**
Markdownする
https://qiita.com/michiharujp/items/2916d71af273a8b0007f

