# 要件
**Kiberaの記事編集機能を作る**
- [ ] マークダウンできるようにする。
- [ ] GUIにドラック&ドロップまたは、コピーアンドペーストで画像をアップロードする
- [ ] 画像、記事など非同期で保存して、非同期でプレビューする。


# To do
- [ ] viewの実装
- [ ] モデルの作成
- [ ] ドラックアンドドロップで画像をサーバーに送付する機能
- [ ] サーバーサイドで画像を保存する機能
- [ ] 画像アップロード後に編集画面に画像URLとかを表示させる
- [ ] onchangeで編集画面のテキストを送付する。
- [ ] Markdownをhtmlに変換して保存する
- [ ] 保存したhtmlテキストをクラアントに返す。
- [ ] クライアント側で表示する。


# 仕様
### モデル

**article table**

mount_uploader :image,ImageUploader
has many img
- id
- name
- pass
- text
- image 
```rails g migration add_image_to_users avatar:string```

**ImageUploader**
```rails generate uploader ImageUploader```



###  ビュー
**edit**
画像をアップロードする。ここで非同期アップロード&プレビュー


## 考え中

*画像UP*
1. 編集画面に画像をドラックアンドドロップ　
2. 画像を非同期でアップロード　　　
3. アップロードに成功したら保存したパス、サイズ、名前を返す。
4. 帰ってきた情報から、画像のパスなどを記載した文字列を編集画面に生成
```<img title='磯部★.jpg' src='/attachments/26b049fe-e57b-4772-9325-0c1568e5e30c' width="5184" data-meta='{"width":5184,"height":3456}'>```


*プレビューの反映*

1.まずはonchange検知でやる。（フォーカス外さないといけないのげネック。）
**編集画面変更検知**
https://qiita.com/maruyam-a/items/cf0168f91d934b449a07
2.検知したらajaxでtextareaのコンテンツ全て送付。
3.サーバーサイドでHTMLタグに変換
4.変換済みのHTMLを返して表示 


## reference
Markdownする
https://qiita.com/michiharujp/items/2916d71af273a8b0007f

画像UP
https://github.com/carrierwaveuploader/carrierwave
https://blog.otsukasatoshi.com/entry/2016/05/04/185133
