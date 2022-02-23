<template>
  <div>
    <div style="display:flex;">
      <div class="upload-imgs">
        <div class="add">
          <form id="formUpload" enctype="multipart/form-data">
            <input @change="inputChange($event)" type="file" name="img" accept='image/*' class="inputUpload" multiple />
            <i class="el-icon-plus addIcon"></i>
          </form>
        </div>
        <div style="display:flex;position:relative;" id="delImg">
          <div v-for="(imgurl,index) of imgSrc" :key="index" style="margin-left:10px;position:relative;">
            <span class="spanStyle" @click="delImage(index)">x</span>
            <img :src="img + '/img/watch' + imgurl" width="100px" height="100px"
              style="border-radius:5px;object-fit:cover;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgSrc: [],
      }
    },
    methods: {
      // 上传图片
      inputChange(file) {
        console.log(file);
        let imgFiles = file.target.files;
        console.log(imgFiles);
        this.uploadSectionFile(imgFiles);
      },
      // 上传前压缩的方法
      uploadSectionFile(f) { //	附件上传
        console.log(f);
        let self = this;
        let Orientation;
        let ndata;
        console.log('图片尺寸');
        console.log(f[0].size);
        // * 1024 * 1024
        if (f[0].size <= 1 * 1024 * 1024) {
          //判断图片是否大于1M,是就直接上传
          ndata = f[0];
          self.postImg(ndata);
        } else {
          //反之压缩图片
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(f[0]);
          console.log(reader)
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            img.onload = function () {
              let data = self.compress(img, Orientation);
              self.headerImage = data;
              ndata = self.compress(img, Orientation);
              console.log('ndata值');
              console.log(ndata);
              //BASE64转图片
              var arr = ndata.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              ndata = new File([u8arr], f[0].name, {
                type: mime
              })
              console.log('6weeeee');
              console.log(ndata);
              self.postImg(ndata);
            }
          }
        }
      },
      async postImg(ndata) {
        let formdata1 = new FormData(); //创建form对象
        console.log('9999999999');
        console.log(ndata.size);
        formdata1.append("img", ndata); //通过append向form对象添加数据
        // console.log(formUpload1);
        this.uploadImg(formdata1);
      },
      compress(img, Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        // 		铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
          //            计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.7);

        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log("ndata:" + ndata)

        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
      uploadImg(formdata) {
        this.$axios
          .post(this.$store.state.baseUrl + "/imgrecv", formdata)
          .then(res => {
            if (res.status == 200) {
              this.$message.success({
                message: "图片上传成功",
                showClose: true,
                duration: 2000
              });
            }
            console.log(res);
            console.log("上传图片结果");
            let imgurl = res.data.imgurl;
            if (this.imgSrc.indexOf(imgurl) == -1) {
              this.imgSrc.push(imgurl);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
      },
      // 删除图片
      delImage(index) {
        this.imgSrc.splice(index, 1);
      },
    }
  }
</script>
<style lang="scss">
  .upload-imgs {
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    display: flex;

    .add {
      width: 100px;
      height: 100px;
      position: relative;
      border: 1px solid #ddd;
      border-radius: 5px;
      display: flex;

      .addIcon {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 45%;
        left: 45%;
        z-index: 1;
      }

      .inputUpload {
        position: absolute;
        display: block;
        width: 100px;
        height: 100px;
        opacity: 0;
        cursor: pointer;
        z-index: 999;
      }
    }

    .spanStyle {
      width: 15px;
      height: 15px;
      text-align: center;
      line-height: 0.7;
      background-color: rgb(221, 221, 221);
      color: rgb(255, 255, 255);
      border: 1px solid rgb(221, 221, 221);
      border-radius: 50%;
      position: absolute;
      top: 1px;
      right: 1px;
      z-index: 999;
      cursor: pointer;
    }

    .previewImg {
      display: flex;
      z-index: 1;
    }
  }

  .previewImg2 {
    display: flex;
  }
</style>