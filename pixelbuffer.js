
var PixelBuffer = function (width, height) {
    this.width = width;
    this.height = height;
    this.data = new Uint8ClampedArray(width * height * 4);
}

PixelBuffer.prototype.getPixel = function (x, y) {
    var index = (y * this.width + x) * 4;
    return {
        r: this.data[index],
        g: this.data[index + 1],
        b: this.data[index + 2],
        a: this.data[index + 3]
    }
}

PixelBuffer.prototype.setPixel = function (x, y, r, g, b, a) {
    var index = (y * this.width + x) * 4;
    this.data[index] = r;
    this.data[index + 1] = g;
    this.data[index + 2] = b;
    this.data[index + 3] = a;
}

PixelBuffer.prototype.getData = function () {
    return this.data;
}

PixelBuffer.prototype.getWidth = function () {
    return this.width;
}

PixelBuffer.prototype.getHeight = function () {
    return this.height;
}

PixelBuffer.prototype.setData = function (data) {
    this.data = data;
}
PixelBuffer.prototype.setWidth = function (width) {
    this.width = width;
}

PixelBuffer.prototype.setHeight = function (height) {
    this.height = height;
}

PixelBuffer.prototype.clear = function (r, g, b, a) {
    var data = this.data;
    var len = data.length;
    for (var i = 0; i < len; i += 4) {
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
    }
}

PixelBuffer.prototype.fill = function (r, g, b, a) {
    var data = this.data;
    var len = data.length;
    for (var i = 0; i < len; i += 4) {
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
    }
}

PixelBuffer.prototype.drawPixelBuffer = function (pixelBuffer, x, y) {
    var data = this.data;
    var pixelBufferData = pixelBuffer.getData();
    var pixelBufferWidth = pixelBuffer.getWidth();
    var pixelBufferHeight = pixelBuffer.getHeight();
    var len = pixelBufferData.length;
    var index;
    var pixelBufferIndex;
    for (var i = 0; i < len; i += 4) {
        index = ((y + Math.floor(i / 4 / pixelBufferWidth)) * this.width + x + (i / 4) % pixelBufferWidth) * 4;
        pixelBufferIndex = i;
        data[index] = pixelBufferData[pixelBufferIndex];
        data[index + 1] = pixelBufferData[pixelBufferIndex + 1];
        data[index + 2] = pixelBufferData[pixelBufferIndex + 2];
        data[index + 3] = pixelBufferData[pixelBufferIndex + 3];
    }
}

PixelBuffer.prototype.getDataURL = function () {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = this.width;
    canvas.height = this.height;
    var imageData = context.createImageData(this.width, this.height);
    imageData.data.set(this.data);
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

PixelBuffer.prototype.drawPixel = function (x, y, r, g, b, a) {
    var index = (y * this.width + x) * 4;
    this.data[index] = r;
    this.data[index + 1] = g;
    this.data[index + 2] = b;
    this.data[index + 3] = a;
}


//not neccasary,but useful.
PixelBuffer.prototype.drawCircle = function (x, y, radius, r, g, b, a) {
    var data = this.data;
    var width = this.width;
    var height = this.height;
    var index;
    var dx;
    var dy;
    var distance;
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            dx = j - x;
            dy = i - y;
            distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= radius) {
                index = (i * width + j) * 4;
                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
                data[index + 3] = a;
            }
        }
    }
}
PixelBuffer.prototype.getImageData = function () {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');  
    canvas.width = this.width;
    canvas.height = this.height;
    var imageData = context.createImageData(this.width, this.height);
    imageData.data.set(this.data);
    return imageData;
}

// pixelBuffer.fill(0, 0, W, H, 0x000000);
