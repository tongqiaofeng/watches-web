<template>
  <div class="drawback-container" id="drawback-container">
    <!-- <h1>退税</h1> -->
    <div class="drawback-top">
      <div class="top-form">
        <span class="top-span">是否退税</span>
        <el-switch v-model="buyTaxState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
    <div class="drawback-center" v-if="buyTaxState == true">
      <el-form label-width="135px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="退税方式：" class="input-style">
 
              <el-select v-model="buyTaxType" @change="taxtypeChange">
                <el-option value="现金">现金</el-option>
                <el-option value="退到银行卡">退到银行卡</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="公司名称：">
 
              <el-input v-model="buyTaxCompany" placeholder="请输入退税公司名称" class="input-style"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="负责人：">
 
              <el-input v-model="buyTaxPerson" placeholder="请输入退税负责人" class="input-style"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="应退金额：">
 
              <el-input v-model="buyTaxMoney" class="input-style">
                <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{buyTaxCurrency}}</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="drawback-top">
        <div class="top-form">
          <span class="top-span" style="font-size: 18px;">是否返店退税</span>
          <el-switch v-model="buyTaxBackStore" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
      </div>
      <div>
        <el-form label-width="135px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="到账日期：">
 
                <el-date-picker v-model="buyTaxRecvTime" type="date" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="到账金额：">
 
                <el-input v-model="buyTaxRecvMoney" class="input-style">
                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{buyTaxRecvCurrency}}</i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="drawback-upload">
        <h3 style="margin-top: 0;font-weight: normal; font-size: 20px;">税单图片：</h3>
        <div style="display:flex;">
          <div class="upload-imgs">
            <div class="add">
              <div id="previewImg">
                <form enctype="multipart/form-data" style="width:100px;height:100px;">
                  <input @change="inputChange1($event)" type="file" name="upload-images" accept="image/*"
                    class="inputUpload" multiple />
                  <i class="el-icon-plus addIcon"></i>
                </form>
              </div>
              <div style="display:flex;position:relative;" id="delImg">
                <div v-for="(imgurl,index) of imgSrc" :key="index" style="margin-left:10px;position:relative;">
                  <span v-show="imgurl !== ''" class="spanStyle" @click="delImage(index)">x</span>
                  <img v-show="imgurl !== ''" :src="img + imgurl" width="100px" height="100px"
                    style="border-radius:5px;object-fit:cover;" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawback-submit">
      <el-button type="primary" @click="submitDrawback" v-preventClick>保 存</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
 
        buyWatchCurrency: '',
        buyTaxState: true, // 是否有退税
        buyTaxType: "退到银行卡", // 退税方式
        buyTaxCompany: "", // 退税公司名称
        buyTaxPerson: "", // 退税负责人
        buyTaxMoney: "", // 应退金额
        buyTaxCurrency: "", // 应退金额币种

        buyTaxBackStore: true, // 是否返店退税
        buyTaxRecvTime: '', // 到账日期
        buyTaxRecvMoney: "", // 到账金额
        buyTaxRecvCurrency: "", //到账金额币种

        tax: {},
        imgSrc: [],
      };
    },
    created() {
      this.acquire();
    },
    methods: {
      // 获取退税信息
      acquire() {
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyOrderGet?java", {
            buyId: sessionStorage.getItem("buyId")
          })
          .then(res => {
            for (let item of res.data.watch) {
 
              this.buyTaxCurrency = item.buyWatchCurrency;
            }
            this.tax = res.data.tax;
            console.log("退税");
            console.log(this.tax);
 
            if (this.buyTaxType == "退到银行卡") {
              this.buyTaxRecvCurrency = 'CNY';
            } else if (this.buyTaxType == "现金") {
              this.buyTaxRecvCurrency = this.buyTaxCurrency;
            }
            if (this.tax.buyTaxState == -1) {
              this.buyTaxState = false;
            } else if (this.tax.buyTaxState == 0 || this.tax.buyTaxState == 1) {
              this.buyTaxState = true;
              if (this.tax.buyTaxType == 0) {
                this.buyTaxType = "退到银行卡";
                this.buyTaxRecvCurrency = 'CNY';
              } else if (this.tax.buyTaxType == 1) {
                this.buyTaxType = "现金";
                this.buyTaxRecvCurrency = this.buyTaxCurrency;
              }
              this.buyTaxCompany = this.tax.buyTaxCompany;
              this.buyTaxPerson = this.tax.buyTaxPerson;
              if (this.tax.buyTaxMoney == 0) {
                this.buyTaxMoney = '';
              } else {
                this.buyTaxMoney = this.tax.buyTaxMoney;
              };
              if (this.tax.buyTaxBackStore == 0) {
                this.buyTaxBackStore = false;
              } else if (this.tax.buyTaxBackStore == 1) {
                this.buyTaxBackStore = true;
              }
 
              if (this.tax.buyTaxRecvTime == '0000-00-00') {
                this.buyTaxRecvTime = '';
              } else {
                this.buyTaxRecvTime = this.tax.buyTaxRecvTime;
              };
              if (this.tax.buyTaxRecvMoney == 0) {
                this.buyTaxRecvMoney = '';
              } else {
                this.buyTaxRecvMoney = this.tax.buyTaxRecvMoney;
              };
              console.log("mmmm");
              console.log(this.tax);
              if (this.tax.buyTaxPic !== null && this.tax.buyTaxPic !== '') {
                this.imgSrc = this.tax.buyTaxPic.split("|");
                for (let i = 0; i < this.imgSrc.length; i++) {
                  if (this.imgSrc[i] == '') {
                    this.imgSrc.splice(i, 1);
                    i = i - 1;
                  }
                };
              } else {
                this.imgSrc = [];
              };
              console.log(this.imgSrc);
            }
          });
      },
      // 删除图片
      delImage(index) {
        this.imgSrc.splice(index, 1);
      },
      // 上传图片
      inputChange1(e) {
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
            console.log("赵钱孙李");
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
      // 退税方式改变币种
      taxtypeChange() {
 
        // console.log(this.buyTaxCurrency);
        if (this.buyTaxType == "退到银行卡") {
          this.buyTaxRecvCurrency = 'CNY';
        } else if (this.buyTaxType == "现金") {
          this.buyTaxRecvCurrency = this.buyTaxCurrency;
        }
      },
      // 提交退税信息
      submitDrawback() {
        // B15858187774620018
        // console.log("萝卜青菜");
        let storeImgUrl1 = this.imgSrc.join('|');
        // console.log(this.buyTaxState);
        // console.log(storeImgUrl1);
 
        console.log(this.buyTaxRecvTime);
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyTaxSave", {
            buyId: sessionStorage.getItem("buyId"),
            buyTaxState: this.buyTaxState == true ? 1 : -1,
            buyTaxType: this.buyTaxState == true ? (this.buyTaxType == "现金" ? 1 : 0) : "",
            buyTaxCompany: this.buyTaxState == true ? this.buyTaxCompany : "",
            buyTaxPerson: this.buyTaxState == true ? this.buyTaxPerson : "",
            buyTaxMoney: this.buyTaxState == true ? Number(this.buyTaxMoney) : "",
            buyTaxCurrency: this.buyTaxState == true ? this.buyTaxCurrency : "",
            buyTaxBackStore: this.buyTaxState == true ? (this.buyTaxBackStore == true ? 1 : 0) : "",
            buyTaxRecvTime: this.buyTaxState == true ? (this.buyTaxRecvTime == null ? '' : this.shellDate(this
              .buyTaxRecvTime)) : '',
            buyTaxRecvMoney: this.buyTaxState == true ? Number(this.buyTaxRecvMoney) : "",
            // this.buyTaxRecvCurrency
            buyTaxRecvCurrency: this.buyTaxType == "现金" ? this.buyTaxCurrency : "CNY",
            buyTaxPic: this.buyTaxState == true ? storeImgUrl1 : ""
          })
          .then(res => {
            console.log("提交退税信息");
            console.log(res);
            this.$message.success({
              message: "退税信息保存成功",
              showClose: true,
              duration: 2000
            });
            this.$emit("listenDrawback", res.data.buyTaxState);
            // 页面回到顶部
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .drawback-container {
    width: 100%;

    .drawback-top {
      width: 100%;

      .top-form {
        width: 190px;
        height: 80px;
        padding-left: 40px;
        line-height: 80px;
        background-color: #fff;
        border-radius: 30px;

        .top-span {
          margin-right: 15px;
          font-size: 22px;
        }
      }
    }

    .drawback-center {
      width: 100%;
      margin: 40px 0;
      padding: 40px 20px;
      padding-left: 0;
      background-color: #fff;
      border-radius: 30px;

      .drawback-upload {
        padding: 40px;
        padding-top: 20px;
        padding-bottom: 0;
      }
    }

    .drawback-submit {
      width: 100%;
      margin-top: 30px;
      text-align: right;

      img {
        cursor: pointer;
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
      display: flex;

      .addIcon {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 44.5%;
        left: 44%;
        z-index: 1;
      }

      .inputUpload {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        opacity: 0;
        cursor: pointer;
        z-index: 999;
      }
    }
  }

  .spanStyle {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 1px;
    right: 1px;
    text-align: center;
    line-height: 0.7;
    background-color: rgb(221, 221, 221);
    color: rgb(255, 255, 255);
    border: 1px solid rgb(221, 221, 221);
    border-radius: 50%;
    z-index: 999;
    cursor: pointer;
  }

  #previewImg {
    width: 100px;
    height: 100px;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .previewImg,
  .previewImg2 {
    display: flex;
  }

  .previewImg2 {
    z-index: 9999;
  }

  .input-style {
    width: 100% !important;
  }
</style>
<style lang="scss">
  #drawback-container {
    .el-input__inner {
      height: 45px;
      border-radius: 30px;
    }

    .el-input__prefix,
    .el-input__suffix {
      top: 2px;
    }

    // .el-switch {
    //   height: 80px;
    //   line-height: 80px;
    // }

    // .el-switch__core {
    //   width: 60px !important;
    //   height: 30px;
    //   border-radius: 30px;
    // }

    // .el-switch__core:after {
    //   top: 6px;
    // }

    .el-form-item__label {
      font-size: 16px;
      text-align: right;
    }
  }
</style>