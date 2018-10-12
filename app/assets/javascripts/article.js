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
    $(this).css('border', '2px dotted #0B85A1');
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files;
    handleFileUpload(files, obj);
  });


  // ドロップエリア以外にドロップされた時に表示しない
  $(document).on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
  $(document).on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    obj.css('border', '2px dotted #0B85A1');
  });
  $(document).on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

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
    console.log(formData)
    $(this).css('border', '1px solid #e6e6e6');
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
      insertText("(img)" + "[" + url + "]")


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

});