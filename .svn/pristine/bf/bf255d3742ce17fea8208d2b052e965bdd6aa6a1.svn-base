<template>
  <div class="paypage-container" id="paypage-container">
    <div class="paypage">
      <div class="paypage-top">
        <div class="top-sum">
          <div class="sum">
            <div class="sum-font">
              <h1 class="h1">
                <span>{{buy_watchCurrency}}</span>
                {{formatNumberRgx(prices)}}
              </h1>
              <h3 class="h3">总货款</h3>
            </div>
            <div class="sum-img">
              <img src="../../assets/imgs/sum.png" alt />
            </div>
          </div>
        </div>
        <div class="top-sum">
          <div class="sum">
            <div class="sum-font">
              <h1 class="h1">
                <span>{{buy_watchCurrency}}</span>
                {{formatNumberRgx(payed)}}
              </h1>
              <h3 class="h3">已付款</h3>
            </div>
            <div class="sum-img">
              <img src="../../assets/imgs/sum.png" alt />
            </div>
          </div>
        </div>
        <div class="top-sum">
          <div class="sum">
            <div class="sum-font">
              <h1 class="h1">
                <span>{{buy_watchCurrency}}</span>
                {{formatNumberRgx(obligation)}}
              </h1>
              <h3 class="h3">待付款</h3>
            </div>
            <div class="sum-img">
              <img src="../../assets/imgs/sum.png" alt />
            </div>
          </div>
        </div>
      </div>
      <div class="paypage-center">
        <!-- <h1>付款：</h1> -->
        <div class="add-pay">
          <div class="add">
            <el-button @click="dialogVisible = true" class="add-btn">
              <i class="add-i">+</i>
              添加付款
            </el-button>
            <el-dialog title="添加付款" :visible.sync="dialogVisible" center :close-on-press-escape="false"
              :close-on-click-modal="false">
              <el-form label-width="15%">
                <el-form-item label="付款日期：">
                  <el-date-picker v-model="time" type="date" placeholder="请选择付款日期" class="input-style"></el-date-picker>
                </el-form-item>
                <el-form-item label="付款方式：">
                  <el-select v-model="type" class="input-style">
                    <el-option value="刷卡">刷卡</el-option>
                    <el-option value="现金">现金</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input v-model="money" type="text" class="input-style">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{buy_watchCurrency}}</i>
                  </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="paySure">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div v-show="buy_pay.length !== 0" class="pay-table">
            <table class="table-container">
              <tr>
                <th>付款日期</th>
                <th>付款方式</th>
                <th>付款金额</th>
                <th>操作</th>
              </tr>
              <tr v-for="(pay,index) of buy_pay" :key="index">
                <td>{{pay.time}}</td>
                <td>{{pay.type == 0 ? "刷卡":"现金"}}</td>
                <td>{{buy_watchCurrency +" "+ formatNumberRgx(pay.money)}}</td>
                <td>
                  <el-tooltip class="item" effect="light" content="删除" placement="top-end">
                    <img src="../../assets/imgs/delete.png" style="height: 25px;cursor: pointer;"
                      @click="delpay(index)" />
                  </el-tooltip>
                  <el-dialog title="提示" :visible.sync="dialogVisiblePay">
                    <span>是否删除该付款信息，删除后不能恢复</span>
                    <div slot="footer">
                      <el-button @click="dialogVisiblePay = false">取 消</el-button>
                      <el-button type="primary" @click="suredelpay">确 定</el-button>
                    </div>
                  </el-dialog>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="paypage-img">
        <div class="img-upload">
          <p class="img-font">账单图片：</p>
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
      <div class="paypage-submit-btn">
        <el-button type="primary" @click="payPageSubmit">保 存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        dialogVisible: false,
        dialogVisiblePay: false,
        watches: [],
        prices: 0,
        buy_watchCurrency: "",
        time: new Date(), // 付款日期
        type: "刷卡", // 付款方式
        money: "", // 付款金额
        buy_pay: [], //付款列表
        delpayId: 0,
        buy_pay_pic: "", // 账单图片
        payed: 0, // 已付款
        obligation: 0, // 待付款
        imgSrc: [],
        headerImage: '',
        picValue: '',
      };
    },
    created() {
      this.acquire();
      // this.payedMoney();
    },
    methods: {
      // 获取总金额
      acquire() {
        console.log(sessionStorage.getItem("buy_id"));
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyOrderGet?java", {
            buy_id: sessionStorage.getItem("buy_id")
          })
          .then(res => {
            console.log(res);
            this.watches = res.data.watch;
            console.log(this.watches);
            for (let item of this.watches) {
              this.prices += Number(item.buy_watchPrice);
              this.buy_watchCurrency = item.buy_watchCurrency;
            }
            this.buy_pay = res.data.pay.buy_payLst;
            if (res.data.pay.buy_payPic !== null) {
              this.imgSrc = res.data.pay.buy_payPic.split("|");
            } else {
              this.imgSrc = [];
            }
            console.log(this.imgSrc);
            this.payed = 0;
            // 已付款
            for (let datas of this.buy_pay) {
              console.log(datas.money);
              this.payed += datas.money;
            }
            console.log("fdsf333");
            console.log(this.prices + "-" + this.payed);
            // 未付款
            this.obligation = Number(this.prices) - Number(this.payed);
          });
      },
      // 保存付款信息
      judge() {
        if (this.time == null) {
          this.$message.error({
            message: "请选择付款时间",
            showClose: true,
            duration: 2000
          });
          return 1;
        }
        if (this.type == "") {
          this.$message.error({
            message: "请选择付款方式",
            showClose: true,
            duration: 2000
          });
          return 1;
        }
        if (this.money == "") {
          this.$message.error({
            message: "请输入付款金额",
            showClose: true,
            duration: 2000
          });
          return 1;
        }
      },
      paySure() {
        if (this.judge() !== 1) {
          let pay = {
            time: this.shellDate(this.time),
            type: this.type == "刷卡" ? 0 : 1,
            money: this.money,
            currency: this.buy_watchCurrency
          };
          this.buy_pay.push(pay);
          console.log("999999");
          console.log(this.buy_pay);
          this.payed = 0;
          for (let item of this.buy_pay) {
            console.log(item.money);
            this.payed += Number(item.money);
          }
          console.log("fdsefvcdv12345660000");
          console.log(this.prices + "-" + this.payed);
          this.obligation = Number(this.prices) - Number(this.payed);
          this.dialogVisible = false;
          this.money = "";
        }
      },
      // 删除付款信息
      delpay(index) {
        this.delpayId = index;
        this.dialogVisiblePay = true;
      },
      // 确定删除
      suredelpay() {
        this.payed = 0;
        console.log(this.delpayId);
        this.buy_pay.splice(this.delpayId, 1);
        console.log("444444444");
        console.log(this.buy_pay);
        for (let item of this.buy_pay) {
          console.log(item.money);
          this.payed += Number(item.money);
        }
        console.log(this.payed);
        this.obligation = Number(this.prices) - Number(this.payed);
        this.dialogVisiblePay = false;
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
        console.log('上传图片');
        console.log(formdata);
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
            console.log("赵钱孙李");
            console.log(res);
            let imgurl = res.data.imgurl;
            console.log("llll");
            console.log(imgurl);
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
      // 提交付款
      payPageSubmit() {
        let storeImgUrl2 = this.imgSrc.join('|');
        console.log("你好年后");
        console.log(this.buy_taxState);
        console.log(
          sessionStorage.getItem("buy_id"),
          this.buy_pay,
          storeImgUrl2
        );
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyPaySave", {
            buy_id: sessionStorage.getItem("buy_id"),
            buy_pay: this.buy_pay,
            buy_pay_pic: storeImgUrl2
          })
          .then(res => {
            console.log("付款信息提交成功");
            console.log(res);
            // 页面回到顶部
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
            this.$emit("listenPay", res.data.buy_payState);
            this.$message.success({
              message: "付款信息保存成功",
              showClose: true,
              duration: 2000
            });
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
  p {
    margin: 0;
  }

  .paypage-container {
    width: 100%;
    margin: 0 auto;

    .paypage {
      width: 100%;
      margin: 0 auto;

      .paypage-top {
        width: 100%;

        .top-sum {
          height: 132px;
          line-height: 132px;
          align-items: center;
          background-color: #fff;
          border-radius: 30px;

          .sum {
            width: 100%;
            height: 132px;
            display: flex;
            justify-content: space-around;

            .sum-font {
              height: 132px;
              line-height: 100px;

              .h1,
              .h3 {
                height: 40px;
                margin: 0;
              }

              .h1 {
                font-size: 24px;
                font-weight: bold;
              }

              .h3 {
                font-size: 17px;
                color: #999999;
                font-weight: normal;
              }
            }

            .sum-img {
              width: 70px;
              height: 132px;
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                width: 70px;
                height: 70px;
              }
            }
          }
        }
      }

      .paypage-center {
        width: 100%;
        margin: 40px auto;
        padding: 30px 0;
        background-color: #fff;
        border-radius: 30px;

        .add-pay {
          width: 95%;
          margin: 0 auto;

          .add {
            margin-bottom: 30px;

            .add-btn {
              width: 150px;
              font-size: 24px;
              background-color: #0c8563;
              color: #fff;

              .add-i {
                margin-right: 10px;
              }
            }
          }

          .pay-table {
            width: 100%;
            // padding: 20px;
            // border: 1px solid #c8c8c8;
            // border-radius: 30px;

            .table-container {
              width: 100%;

              td {
                background-color: #f3fbf9;
                padding: 15px;
              }
            }
          }
        }
      }

      .paypage-img {
        width: 100%;
        margin: 0 auto;
        padding: 40px 0;
        background-color: #fff;
        border-radius: 30px;

        .img-upload {
          width: 90%;
          margin: 0 auto;

          .img-font {
            font-size: 20px;
            margin-bottom: 10px;
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
        }
      }

      .paypage-submit-btn {
        width: 100%;
        margin-top: 40px;
        text-align: right;

        img {
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (min-width: 1401px) {
    .paypage-top {
      display: flex;
      justify-content: space-between;
    }

    .top-sum {
      width: 31%;
    }
  }

  @media screen and (max-width: 1401px) {
    .paypage-top {
      display: block;
    }

    .top-sum {
      width: 50%;
      margin: 10px 0;
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

  .input-style {
    width: 60% !important;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;

    tr {

      th,
      td {
        width: 20%;
        text-align: center;
      }
    }
  }
</style>
<style lang="scss">
  #paypage-container {
    .el-form-item__label {
      font-size: 16px;
    }
  }
</style>