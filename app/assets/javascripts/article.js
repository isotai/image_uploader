// ドラックアンドドロップーーーー＞
$(function () {
  var obj = $(".dragandrophandler");
  // 色変える
  obj.on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).css('border', '2px solid #0B85A1');
  });
  obj.on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
  // ドロップ
  obj.on('drop', function (e) {
    // $(this).css('border', '2px dotted #0B85A1');
    e.stopPropagation();
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files;
    handleFileUpload(files, obj);
  });

  obj.on('dragend', function (e) {
    e.stopPropagation();
    e.preventDefault();
    obj.css('border', '2px solid #e6e6e6');
  });

  //コピペで画像アップ--->
  $(".editor--textbox").on('paste', function (event) {
    // event からクリップボードのアイテムを取り出す
    var items = event.originalEvent.clipboardData.items; // ここがミソ
    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      if (item.type.indexOf("string") != -1) {


      }
      if (item.type.indexOf("image") != -1) {
        // 画像のみサーバへ送信する
        var file = item.getAsFile();
        var fd = new FormData();
        fd.append('file', file);
        console.log(fd)
        sendFileToServer(fd);
        // upload_file_with_ajax(file);
        event.preventDefault();
      }
    }
  });
  //コピペで画像アップ<---

  // ドロップエリア以外にドロップされた時に表示しないーー＞
  $(document).on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
  $(document).on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();

  });
  $(document).on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
  // ＜ーードロップエリア以外にドロップされた時に表示しない



  function handleFileUpload(files, obj) {
    for (var i = 0; i < files.length; i++) {
      var fd = new FormData();
      fd.append('file', files[i]);
      // var status = new createStatusbar(obj); //Using this we can set progress.
      // status.setFileNameSize(files[i].name, files[i].size);
      sendFileToServer(fd);

    }
  }

  function sendFileToServer(formData) {
    obj.css('border', '2px solid #e6e6e6');

    var id = $(".aricle_id").text();

    $.ajax({
      url: '/article/' + id + '/upload_image',
      method: 'post',
      dataType: 'json',
      // dataに FormDataを指定
      data: formData,
      // Ajaxがdataを整形しない指定
      processData: false,
      // contentTypeもfalseに指定
      contentType: false
    }).done(function (res) {
      // success
      var url = res.url
      insertText("![img]" + "(" + url + ")")


    }).fail(function (jqXHR, textStatus, errorThrown) {
      // fail
      console.log('ERROR', jqXHR, textStatus, errorThrown);
    });

  }


  function insertText(url) {

    var textarea = document.querySelector('textarea');

    var sentence = textarea.value;
    var len = sentence.length;
    var pos = textarea.selectionStart;

    var before = sentence.substr(0, pos);
    var word = url;
    var after = sentence.substr(pos, len);

    sentence = before + word + after;

    textarea.value = sentence;
  };


  // ドラックアンドドロップ＜ーーーー


  // textの自動保存ーーーー＞

  var stack = []; //入力数を保存する変数
  $(".editor--textbox").on('keyup', function (e) {

    stack.push(1); //入力ごとに値を追加する

    //入力後0.3秒後
    setTimeout(function () {
      stack.pop(); //中身を一つ取り出す

      //取り出したstackの中身がなければ処理をする
      //stackの中身がなくなるのは、一番最後の入力から0.3秒後になる
      //なので、一番最後の入力から0.3秒後に以下の処理が走る
      if (stack.length == 0) {
        //最後キー入力後に処理したいイベント
        sendTextToServer()

        stack = []; //一応stackを初期化
      }
    }, 500);

    function sendTextToServer() {
      var userText = $(".editor--text").val();
      var id = $(".aricle_id").text();
      $.ajax({
        url: '/article/' + id,
        method: 'PATCH',
        dataType: 'html',
        // dataに FormDataを指定
        data: {
          text: userText
        },
        // Ajaxがdataを整形しない指定
        // processData: false,
        // contentTypeもfalseに指定
        //contentType: falsecdq
      }).done(function (res) {
        // success
        $(".editor--preview--box").html(res)

      }).fail(function (jqXHR, textStatus, errorThrown) {
        // fail
        $(".editor--preview--box").html("<h1>HIHI</hi>")
        console.log('ERROR', jqXHR, textStatus, errorThrown);
      });
    }

  });

  // textの自動保存　＜ーーーー

});