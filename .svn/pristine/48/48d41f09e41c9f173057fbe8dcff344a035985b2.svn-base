<template>
  <div class="stock-pending-container">
    <!-- <h1>手表入库操作页面</h1> -->
    <div class="back-img" @click="gobackStockList">
      <div>
        <img src="../../assets/imgs/goback.png" />
      </div>
      <span class="font">返回</span>
    </div>
    <div class="pending-container">
      <div>
        <h3>
          总共
          <span>{{watchList.length}}</span> 块手表
        </h3>
      </div>
      <table class="pending-table">
        <tr>
          <th>图片</th>
          <th>品牌</th>
          <th>型号</th>
          <th>机芯号</th>
          <th>操作</th>
        </tr>
        <tr v-for="(items,index) in watchList" :key="index">
          <td>
            <img v-image-preview
              :src="items.buy_watchPics == null || items.buy_watchPics == '' ? '' : img + '/img/watch/'+ (items.buy_watchPics || '').split('|')[0]"
              style="width: 100px;height: 100px;border-radius: 30px;object-fit: cover;" />
          </td>
          <td>{{items.buy_watchBrand}}</td>
          <td>{{items.buy_watchModel}}</td>
          <td>{{items.buy_watchSn}}</td>
          <td>
            <el-button type="text" @click="pendingButton(items,index)">入库</el-button>
            <el-dialog title="入库" :visible.sync="dialogPendingVisible" :close-on-press-escape="false"
              :close-on-click-modal="false">
              <div style="text-align: left;">
                <div>
                  <el-form label-width="120px" style="padding-top: 10px;">
                    <el-form-item label="手表状态：">
                      <div style="display: flex;">
                        <el-radio v-model="radioWatch" label="1">全新</el-radio>
                        <el-radio v-model="radioWatch" label="2">二手</el-radio>
                        <el-checkbox-group v-model="watchState">
                          <el-checkbox label="有划痕" name="有划痕"></el-checkbox>
                          <el-checkbox label="保卡" name="保卡"></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </el-form-item>
                    <el-form-item label="仓库货架号:">
                      <el-input v-model="stock_shelfNo_A" style="width: 60%;"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="margin: 30px">
                  <div style="margin: 15px 0;">
                    <div>
                      <span>商品图片：（同保卡一起拍）</span>
                    </div>
                    <div style="display:flex;">
                      <div class="upload-imgs">
                        <div class="add">
                          <form :id="items.buy_watchsn" enctype="multipart/form-data">
                            <input @change="inputChange($event,items.buy_watchsn,items.id)" type="file" name="img"
                              accept='image/*' class="inputUpload" multiple />
                            <i class="el-icon-plus addIcon"></i>
                          </form>
                        </div>
                        <div style="display:flex;position:relative;" id="delImg">
                          <div v-for="(imgurl,index) of imgurls" :key="index"
                            style="margin-left:10px;position:relative;">
                            <span class="spanStyle" @click="delImage(index)">x</span>
                            <!--  + '/img/watch' -->
                            <img :src="img + imgurl" width="100px" height="100px"
                              style="border-radius:5px;object-fit:cover;" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <el-button type="primary" @click="getQRCode" style="width: 40%;" v-preventClick>打印二维码</el-button>
                  </div>
                </div>
              </div>
              <div slot="footer">
                <el-button @click="dialogPendingVisible = false">取 消</el-button>
                <el-button type="primary" @click="stockSure" v-preventClick>确 定</el-button>
              </div>
            </el-dialog>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        dialogPendingVisible: false,
        QRCodeMsg: "", //生成二维码信息
        watchState: [], // 手表状态
        stock_instateA: "",
        stock_shelfNo_A: "", // 仓库货架号
        stock_inPic: "",
        imgurls: [],
        itemsId: '',
        buy_watchBrand: '',
        buy_watchModel: '',
        stock_No: '',
        stock_NoCrc: '',
        selectIndex: 0,
        radioWatch: '1',
        radiowatchs: '',
        purchId: 0,
      };
    },
    props: ["watchList"],
    methods: {
      // 返回上一层
      gobackStockList() {
        this.$emit("gobackStockList", 0);
      },
      // 入库
      pendingButton(items, index) {
        console.log('商品入库');
        console.log(items);
        this.selectIndex = index;
        this.purchId = items.id;
        this.buy_watchBrand = items.buy_watchBrand;
        this.buy_watchModel = items.buy_watchModel;
        this.stock_No = items.stock_No;
        this.stock_NoCrc = items.stock_NoCrc;
        this.radioWatch = '1';
        this.watchState = [];
        this.imgurls = [];
        this.stock_instateA = '';
        this.stock_shelfNo_A = '';
        this.dialogPendingVisible = true;
      },
      //生成分享二维码
      getQRCode() {
        this.$axios.post('http://127.0.0.1:8079', {
          CMD: "1",
          CMDDATA: this.buy_watchBrand + '`' + this.buy_watchModel + '`' + this.stock_No + '-A`' + this.stock_No +
            '-A|' + this.stock_NoCrc
        }).then((res) => {
          console.log(res);
          this.$message.success({
            message: '条码打印成功',
            showClose: true,
            duration: 2000
          })
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: '条码打印失败',
            showClose: true,
            duration: 2000
          })
        })
      },
      // 上传图片
      inputChange(e, nameId, itemId) {
        this.itemsId = itemId;
        let file = e.target.files[0];
        let that = this;
        if (file === undefined) {
          return
        }
        if (file.size / 1024 > 1025) { // 文件大于1M（根据需求更改），进行压缩上传
          this.photoCompress(file, { // 调用压缩图片方法
            quality: 0.7
          }, function (base64Codes) {
            // console.log("压缩后：" + base.length / 1024 + " " + base);
            let bl = that.base64UrlToBlob(base64Codes)
            // file.append('file', bl, 'file_' + Date.parse(new Date()) + '.jpg') // 文件对象
            that.uploadLice(bl) // 请求图片上传接口
          })
        } else { // 小于等于1M 原图上传
          this.uploadLice(file)
        }
      },

      // base64 转 Blob 格式 和file格式
      base64UrlToBlob(urlData) {
        let arr = urlData.split(','),
          mime = arr[0].match(/:(.*?);/)[1], // 去掉url的头，并转化为byte
          bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
          n = bstr.length,
          u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        // 转blob
        // return new Blob([u8arr], {type: mime})
        let filename = Date.parse(new Date()) + '.jpg'
        // 转file
        return new File([u8arr], filename, {
          type: mime
        })
      },
      /*压缩图片
      file：文件(类型是图片格式)，
      obj：文件压缩后对象width， height， quality(0-1)
      callback：容器或者回调函数
      */
      photoCompress(file, obj, callback) {
        let that = this
        let ready = new FileReader()
        /* 开始读取指定File对象中的内容. 读取操作完成时,返回一个URL格式的字符串. */
        ready.readAsDataURL(file)
        ready.onload = function () {
          let re = this.result
          that.canvasDataURL(re, obj, callback) // 开始压缩
        }
      },
      /* 利用canvas数据化图片进行压缩 */
      /* 图片转base64 */
      canvasDataURL(path, obj, callback) {
        let img = new Image()
        img.src = path
        img.onload = function () {
          let that = this // 指到img
          // 默认按比例压缩
          let w = that.width,
            h = that.height,
            scale = w / h
          w = obj.width || w
          h = obj.height || (w / scale)
          let quality = 0.7 // 默认图片质量为0.7
          // 生成canvas
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')

          // 创建属性节点
          let anw = document.createAttribute('width')
          anw.nodeValue = w
          let anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)
          // 铺底色
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(that, 0, 0, w, h)

          // 图像质量
          if (obj.quality && obj.quality >= 1 && obj.quality < 0) {
            quality = obj.quality
          }
          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL('image/jpeg', quality)
          // 回调函数返回base64的值
          callback(base64)
        }
      },
      //  返回file文件，调用接口执行上传
      uploadLice(file) {
        console.log(file)
        let formdata1 = new FormData(); //创建form对象
        formdata1.append("img", file); //通过append向form对象添加数据
        this.uploadImg(formdata1);
      },
      uploadImg(formdata) {
        console.log(formdata);
        this.$axios.post(this.$store.state.baseUrl + '/imgrecv', formdata).then((res) => {
          if (res.status == 200) {
            this.$message.success({
              message: '图片上传成功',
              showClose: true,
              duration: 2000
            });
          }
          console.log(res);
          let imgurl = res.data.imgurl;
          if (this.imgurls.indexOf(imgurl) == -1) {
            this.imgurls.push(imgurl);
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        })
      },
      // 删除图片
      delImage(index) {
        this.imgurls.splice(index, 1);
      },
      // 入库前数据验证
      verification() {
        console.log('手表状态');
        console.log(this.watchState);
        this.stock_instateA = "";
        if (this.watchState.length > 1) {
          this.stock_instateA = this.watchState.join('|');
        } else {
          this.stock_instateA = this.watchState[0];
        }
        console.log('状态');
        console.log(this.stock_instateA);
      },
      // 确定入库
      stockSure() {
        console.log('手表状态');
        console.log(this.stock_instateA);
        if (this.verification() !== 1) {
          let storeImgUrl4 = this.imgurls.join('|');
          console.log(storeImgUrl4);
          console.log(this.radioWatch);
          if (this.radioWatch == '1') {
            this.radiowatchs = '全新';
          } else if (this.radioWatch == '2') {
            this.radiowatchs = '二手';
          }
          console.log(this.radiowatchs);
          if (this.stock_instateA !== undefined) {
            this.stock_instateA = this.radiowatchs + '|' + this.stock_instateA;
          } else if (this.stock_instateA == undefined) {
            this.stock_instateA = this.radiowatchs;
          }
          console.log(this.stock_instateA);
          this.$axios
            .post(this.$store.state.baseUrl + "/StockInDo", {
              id: this.purchId,
              stock_instateA: this.stock_instateA,
              stock_shelfNo_A: this.stock_shelfNo_A,
              stock_inPic: storeImgUrl4
            })
            .then(res => {
              console.log("手表入库");
              console.log(res);
              this.watchList.splice(this.selectIndex, 1);
              this.$message.success({
                message: '手表入库成功',
                showClose: true,
                duration: 2000
              })
              if (this.watchList.length == 0) {
                this.$emit("gobackStockList", 0);
              }
              this.dialogPendingVisible = false;
            })
            .catch(err => {
              console.log(err);
              // this.dialogVisible = true;
              this.$message.error({
                message: '手表入库失败，请检查填写数据',
                showClose: true,
                duration: 2000
              });
            });
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .stock-pending-container {
    width: 100%;
    margin: 0 auto;

    .back-img {
      width: 75px;
      height: 45px;
      margin-bottom: 20px;
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;

      div {
        margin-top: 5px;

        img {
          width: 30px;
          height: 25px;
        }
      }

      .font {
        font-size: 17px;
      }
    }

    .pending-container {
      // width: 95%;
      // margin: 0 auto;
      padding: 30px;
      background-color: #fff;
      border-radius: 30px;

      .pending-table {
        td {
          height: 60px;
          padding: 10px 0;
          background-color: #f3fbf9;
          font-size: 15px;
        }
      }
    }
  }

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

    .previewImg {
      display: flex;
      z-index: 1;
    }
  }

  .previewImg2 {
    display: flex;
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

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;

    tr {

      th,
      td {
        width: 20%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .el-radio,
  .el-radio__input {
    line-height: 3;
  }
</style>