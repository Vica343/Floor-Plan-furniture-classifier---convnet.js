
var loadFile = function(event) {
var reader = new FileReader();

reader.onload = function(){
  var preview = document.getElementById('preview_img');
  var src = reader.result;
  var image = new Image();  
  image.src = src;
  setTimeout(() => {
    console.log("started timeout")
    var max_width = Math.min(image.width, image.height);
    var max_height = Math.min(image.width, image.height);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = max_width;
    canvas.height = max_height;
    ctx.drawImage(image, (max_width - image.width)/2, (max_height - image.height)/2, image.width, image.height);
    preview.src = canvas.toDataURL("image/png");
    console.log(preview.src)

    canvas = document.createElement('canvas');
    console.log(image.width) 
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, image.width, image.height);

    var dst = document.createElement('canvas');
    dst.width = 32;
    dst.height = 32;

    window.pica.WW = false;
    window.pica.resizeCanvas(canvas, dst, {
      quality: 2,
      unsharpAmount: 500,
      unsharpThreshold: 100,
      transferable: false
    }, function (err) {  });
    window.pica.WW = true;
    preview.src = dst.toDataURL("image/png");
  }, 1000);
};
reader.readAsDataURL(event.target.files[0])
 
};
