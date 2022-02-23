<template>
  <div class="product-list-container">
    <!-- <h1>扫描查询</h1> -->
    <div v-show="outboundQuery.query == 0">
      <div style="width: 50%;margin: 0 auto;margin-top: 100px;text-align: center;">
        <p>扫描前，请确认您的输入状态是否为英文</p>
        <!--  @keyup.enter.native="payCode" -->
        <el-input id="testInput" ref="barCodeInput" v-model="barCode3" @keyup.enter.native="payCode()">
        </el-input>
      </div>
    </div>
    <div v-if="outboundQuery.query == 2" class="list-details">
      <div style="margin: 0 auto;display: flex;justify-content: center;" class="style-margin">
        <!--  + '/img/watch/' -->
        <div v-for="(imgurl,index) in imgs" :key="index" style="margin-right: 5px;">
          <img v-show="imgurl !== ''" :src="img +  imgurl" style="width: 150px;height: 150px;object-fit: cover;"
            class="first-img" />
        </div>
      </div>
      <div class="list-top">
        <div class="style-margin">
          <span>
            货号：
            <span>{{stockwatchinfo.stock_No}}</span>
          </span>
        </div>
        <div class="style-margin" style="display: flex;">
          <span>仓库货架号：</span>
          <span style="margin: 0 30px 0 10px;">{{stockwatchinfo.stock_shelfNo_A}}</span>
          <div @click="updateStockShelfNoA(stockwatchinfo.id)" style="width: 80px;display: flex;cursor: pointer;">
            <img src="../../assets/imgs/update.png" style="width: 20px;height: 20px;margin-right: 0.5%;" />
            <span style="margin-left: 5px;color: #0aa1ed;font-size: 15px;">修改</span>
          </div>
          <el-dialog title="修改货架号" :visible.sync="dialogShelfNoAVisible" center>
            <div>
              <el-form label-width="120px">
                <el-form-item label="新的货架号：">
                  <el-input v-model="stock_shelfNo_A"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer">
              <el-button @click="dialogShelfNoAVisible = false">取 消</el-button>
              <el-button type="primary" @click="ShelfNoASure" v-preventClick>确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="style-margin" v-if="stockwatchinfo == 1">
          <span>
            出售状态：
            <span>已被 {{stockwatchinfo.sell_userNick}} 出售</span>
          </span>
        </div>
      </div>
      <div class="list-center">
        <div>
          <div style="margin: 30px 0;display: flex;justify-content: space-between;">
            <div style="width: 33%;display: flex;">
              <span>品牌：</span>
              <span>{{stockwatchinfo.buy_watchBrand}}</span>
            </div>
            <div style="width: 33%;display: flex;">
              <span>型号：</span>
              <span>{{stockwatchinfo.buy_watchModel}}</span>
            </div>
            <div style="width: 33%;display: flex;">
              <span>库存：</span>
              <span>{{stockwatchinfo.watch_Num}}</span>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between;">
            <div style="width: 33%;display: flex;">
              <span>机芯号：</span>
              <span>{{stockwatchinfo.buy_watchSn}}</span>
            </div>
            <div style="width: 33%;display: flex;">
              <span>保卡日期：</span>
              <span>{{stockwatchinfo.buy_watchCard}}</span>
            </div>
            <div style="width: 33%;display: flex;">
              <span>状态：</span>
              <div style="display: flex;">
                <div v-for="(con,index) of watchState" :key="index">
                  <div class="state" v-if="con !== ''">
                    <span style="font-size: 13px;">{{con}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-form label-width="120px" style="margin: 20px 0; margin-top: 30px;">
            <el-row>
              <el-col :span="12">
                <el-button
                  style="width: 300px;background-color:#f3fbf9;border: 1px solid #f3fbf9;font-size: 14px;color:#2c3e50;"
                  @click="checkWatch(stockwatchinfo.buy_watchId)">查看与此手表同型号的未出库的手表</el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="getQRCode" v-preventClick
                  style="width: 300px;margin-left: 10%;background-color:#f3fbf9;border: 1px solid #f3fbf9;font-size: 14px;color:#2c3e50;">
                  打印二维码</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="margin-top: 100px;text-align: center;" v-if="barCode.length == 36">
          <el-button style="width: 300px;" type="primary" @click="stockRemoval">出库</el-button>
          <el-dialog title="出库" :visible.sync="dialogVisible" :close-on-press-escape="false"
            :close-on-click-modal="false">
            <div>
              <el-form label-width="100px">
                <el-form-item label="提货人：" style="text-align: left;">
                  <el-input v-model="sell_sendUserNick" placeholder="请输入提货人昵称" style="width: 60%;"></el-input>
                </el-form-item>
                <div style="margin: 15px 0 15px 25px;">
                  <div style="text-align: left;">
                    <span style="font-size: 16px;">出库时商品图片：</span>
                  </div>
                  <div style="display:flex;">
                    <div class="upload-imgs">
                      <div class="add">
                        <form enctype="multipart/form-data">
                          <input @change="inputChange($event)" type="file" name="img" accept='image/*'
                            class="inputUpload" multiple />
                          <i class="el-icon-plus addIcon"></i>
                        </form>
                      </div>
                      <div style="display:flex;position:relative;" id="delImg">
                        <div v-for="(imgurl,index) of imgurls" :key="index" style="margin-left:10px;position:relative;">
                          <span class="spanStyle" @click="delImage(index)">x</span>
                          <img :src="img + imgurl" width="100px" height="100px"
                            style="border-radius:5px;object-fit:cover;" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <el-form-item label="销售：">
                  <p style="text-align: left;">{{sell_userNick}}</p>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="stockRemovalSure" v-preventClick>确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div v-show="outboundQuery.query == 1" class="product-container">
      <div class="back-img" @click="gobackOutbound">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div v-for="(items,index) of productWatchList" :key="index" class="product-table">
        <table>
          <tr>
            <th>图片</th>
            <th>保卡日期</th>
            <th>手表状态</th>
            <th>
              {{items.sell_state == 1 ? '销售员' : (items.log_state == 0 ? '采购时间' : (items.log_state == 1 ? '预计到达时间' : ''))}}
            </th>
            <th>物流状态</th>
            <th>库存信息</th>
          </tr>
          <tr>
            <td>
              <img
                :src="items.watchPics == null || items.watchPics == '' ? '' : img + '/img/watch/'+ (items.watchPics || '').split('|')[0]"
                class="first-img" />
            </td>
            <td>{{items.buy_watchCard}}</td>
            <td>
              <div v-for="(stateCon,index) of items.watchState.split('|')" :key="index">
                <p>{{stateCon}}</p>
              </div>
            </td>
            <td>
              {{items.sell_state == 1 ? items.sell_userNick : (items.log_state == 0 ? items.buy_date : (items.log_state == 1 ? items.log_arriveTime : ''))}}
            </td>
            <td>
              {{items.sell_state == 1 ? '已出售' : (items.log_state == 0 ? '采购中' : (items.log_state == 1 ? '运输中' : '已入库'))}}
            </td>
            <td>
              <div v-show="items.log_state !== 2">
                <span style="font-size: 15px;">当前商品未入库，暂无库存信息</span>
              </div>
              <div v-show="items.log_state == 2" class="td-center">
                <el-button type="text" @click="inventoryInfo(items.id)">查看库存信息</el-button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import CallApp from "callapp-lib";
  import {
    setTimeout
  } from "timers";
  export default {
    data() {
      return {
        qrcode: "",
        img: this.$store.state.baseUrl,
        productWatchList: [],
        dialogShelfNoAVisible: false,
        id: "", // 手表在进销存库中的id
        stock_shelfNo_A: "", // 新的手表仓库货架号
        pics: "",
        dialogVisible: false,
        stockwatchinfo: [], //手表库存信息
        watchState: [],
        imgs: [],
        watchid: 0, // 手表id
        stockWatchList: [], // 同型号手表
        sell_sendid: "", // 送货人/提货人id
        sell_sendUserNick: "", // 送货人/提货人昵称
        sell_userNick: "", // 销售员昵称
        sell_state: 0, // 销售状态
        sell_stockToken: "", // 出库验证码/提货码
        barCode: "",
        barCode3: "",
        stock_No: "", // 货号
        doing: false,
        buy_watchBrand: "",
        buy_watchModel: "",
        stock_No: "",
        stock_NoCrc: "",
        imgurls: [],
      };
    },
    // 10000300000218|d9efc27c3918dfd6|7005
    props: ["outboundQuery"],
    created() {
      this.barCode3 = this.outboundQuery.msg;
    },
    mounted() {
      document.getElementById('testInput').focus();
      document.getElementById('testInput').select();
    },
    methods: {
      // 扫描查询手表库存信息
      payCode() {
        console.log("扫描内容");
        console.log(this.barCode3);
        this.barCode = this.barCode3;
        console.log(this.barCode);
        if (this.barCode.length > 33) {
          if (this.barCode.length == 36) {
            this.$axios
              .post(this.$store.state.baseUrl + "/Stockwatchinfo", {
                qrcode: this.barCode
              })
              .then(res => {
                console.log("扫描查询内容");
                console.log(res);
                this.stockwatchinfo = res.data;
                if (this.stockwatchinfo.stock_inPic !== '' && this.stockwatchinfo.stock_inPic !== null) {
                  if (this.stockwatchinfo.stock_inPic.indexOf('|') !== -1) {
                    this.imgs = this.stockwatchinfo.stock_inPic.split("|");
                  } else {
                    this.imgs.push(this.stockwatchinfo.stock_inPic);
                  }
                }
                console.log(this.imgs);
                if (this.stockwatchinfo.watchState !== null) {
                  this.watchState = this.stockwatchinfo.watchState.split("|");
                }
                this.sell_stockToken = this.stockwatchinfo.sell_stockToken;
                this.sell_state = this.stockwatchinfo.sell_state;
                this.sell_userNick = this.stockwatchinfo.sell_userNick;
                this.buy_watchBrand = this.stockwatchinfo.buy_watchBrand;
                this.buy_watchModel = this.stockwatchinfo.buy_watchModel;
                this.stock_No = this.stockwatchinfo.stock_No;
                this.stock_NoCrc = this.stockwatchinfo.stock_NoCrc;
                this.id = this.stockwatchinfo.id;
                console.log(this.stockwatchinfo);
                console.log(this.sell_userNick);
                console.log(this.stock_No);
                this.barCode3 = "";
                this.$message.success({
                  message: "扫描成功",
                  showClose: true,
                  duration: 2000
                });
                this.outboundQuery.query = 2;
              })
              .catch(err => {
                console.log(err);
                this.$message.error({
                  message: "获取信息失败，请重新扫描",
                  showClose: true,
                  duration: 2000
                });
              });
          }
        } else if (this.barCode.length < 36) {
          if (this.barCode.length == 33) {
            this.$axios
              .post(this.$store.state.baseUrl + "/Stockwatchinfo", {
                qrcode: this.barCode
              })
              .then(res => {
                console.log("扫描查询内容");
                console.log(res);
                this.stockwatchinfo = res.data;
                if (this.stockwatchinfo.stock_inPic !== '' && this.stockwatchinfo.stock_inPic !== null) {
                  if (this.stockwatchinfo.stock_inPic.indexOf('|') !== -1) {
                    this.imgs = this.stockwatchinfo.stock_inPic.split("|");
                  } else {
                    this.imgs.push(this.stockwatchinfo.stock_inPic);
                  }
                }
                console.log(this.imgs);
                if (this.stockwatchinfo.watchState !== null) {
                  this.watchState = this.stockwatchinfo.watchState.split("|");
                }
                this.sell_stockToken = this.stockwatchinfo.sell_stockToken;
                this.sell_state = this.stockwatchinfo.sell_state;
                this.sell_userNick = this.stockwatchinfo.sell_userNick;
                this.buy_watchBrand = this.stockwatchinfo.buy_watchBrand;
                this.buy_watchModel = this.stockwatchinfo.buy_watchModel;
                this.stock_No = this.stockwatchinfo.stock_No;
                this.stock_NoCrc = this.stockwatchinfo.stock_NoCrc;
                this.id = this.stockwatchinfo.id;
                console.log(this.stockwatchinfo);
                console.log(this.sell_userNick);
                console.log(this.stock_No);
                this.barCode3 = "";
                this.$message.success({
                  message: "扫描成功",
                  showClose: true,
                  duration: 2000
                });
                this.outboundQuery.query = 2;
              })
              .catch(err => {
                console.log(err);
                this.$message.error({
                  message: "获取信息失败，请重新扫描",
                  showClose: true,
                  duration: 2000
                });
              });
          }
        }
      },
      // 查看手表库存信息
      inventoryInfo(id) {
        this.$axios
          .post(this.$store.state.baseUrl + "/Stockwatchinfo", {
            id: id
          })
          .then(res => {
            console.log("手表库存信息");
            console.log(res);
            this.stockwatchinfo = res.data;
            this.watchState = this.stockwatchinfo.watchState.split("|");
            // 手表id  buy_watchId 用于获取同品牌未出库手表列表
            this.watchid = this.stockwatchinfo.buy_watchId;
            this.imgs = this.stockwatchinfo.stock_inPic.split("|");
            this.watchState = this.stockwatchinfo.watchState.split("|");
            this.stock_No = this.stockwatchinfo.stock_No;
            this.sell_stockToken = this.stockwatchinfo.sell_stockToken;
            this.sell_state = this.stockwatchinfo.sell_state;
            this.sell_userNick = this.stockwatchinfo.sell_userNick;
            console.log(this.imgs);
            console.log("查询手表库存信息");
            console.log(this.stockwatchinfo);
            this.outboundQuery.query = 2;
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 修改货架号
      updateStockShelfNoA(id) {
        this.id = id;
        this.stock_shelfNo_A = '';
        this.dialogShelfNoAVisible = true;
      },
      // 确认修改货架号
      ShelfNoASure() {
        this.$axios
          .post(this.$store.state.baseUrl + "/StockShelfNoModify", {
            id: this.id,
            stock_shelfNo_A: this.stock_shelfNo_A
          })
          .then(res => {
            console.log("修改货架号");
            console.log(res);
            this.$message.success({
              message: "货架号修改成功",
              showClose: true,
              duration: 2000
            });
            this.stockwatchinfo.stock_shelfNo_A = this.stock_shelfNo_A;
            // this.inventoryInfo(this.id);
            this.dialogShelfNoAVisible = false;
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            })
          });
      },
      // 获取未出库的同型号手表的列表
      checkWatch(id) {
        this.watchid = id;
        console.log(this.watchid);
        this.$axios
          .post(this.$store.state.baseUrl + "/StockWatchList", {
            buy_watchId: this.watchid
          })
          .then(res => {
            console.log(res);
            this.stockWatchList = res.data;
            this.productWatchList = this.stockWatchList;
            console.log(this.productWatchList);
            if (this.productWatchList.length !== 0) {
              this.outboundQuery.query = 1;
              // 页面回到顶部
              (function smoothscroll() {
                var currentScroll =
                  document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                  window.requestAnimationFrame(smoothscroll);
                  window.scrollTo(0, currentScroll - currentScroll / 5);
                }
              })();
            } else {
              this.$message.error({
                message: '暂无与此手表同型号未出库的手表',
                showClose: true,
                duration: 2000
              })
            }

          })
          .catch(err => {
            console.log(err);
          });
      },
      //生成分享二维码
      getQRCode() {
        this.$axios
          .post("http://127.0.0.1:8079", {
            CMD: "1",
            CMDDATA: this.buy_watchBrand +
              "`" +
              this.buy_watchModel +
              "`" +
              this.stock_No +
              "-A`" +
              this.stock_No +
              "-A|" +
              this.stock_NoCrc
          })
          .then(res => {
            console.log(res);
            this.$message.success({
              message: "条码打印成功",
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
      },
      // 删除图片
      delImage(index) {
        this.imgurls.splice(index, 1);
      },
      // 上传图片
      inputChange(e) {
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
          console.log('上传图片');
          console.log(res);
          let imgurl = res.data.imgurl;
          console.log(imgurl);
          if (this.imgurls.indexOf(imgurl) == -1) {
            this.imgurls.push(imgurl);
          }
          console.log(this.imgurls);
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        })
      },
      // 手表出库
      stockRemoval() {
        console.log("手表出库");
        console.log(this.sell_state);
        console.log(this.sell_stockToken);
        this.imgurls = [];
        this.sell_sendUserNick = "";
        this.dialogVisible = true;
      },
      // 确认出库
      stockRemovalSure() {
        if (this.sell_sendUserNick == "") {
          this.$message.error({
            message: "提货人不能为空，请输入",
            showClose: true,
            duration: 2000
          });
        } else {
          console.log(this.id);
          let storeImgUrl5 = this.imgurls.join('|');
          this.$axios
            .post(this.$store.state.baseUrl + "/StockOutDo", {
              id: this.id,
              sell_sendUserNick: this.sell_sendUserNick,
              sell_stockToken: this.barCode,
              stock_outPic: storeImgUrl5,
            })
            .then(res => {
              console.log(res);
              this.$message.success({
                message: "商品出库成功",
                showClose: true,
                duration: 2000
              });
              this.dialogVisible = false;
              this.barCode = '';
              this.outboundQuery.query = 0;
            })
            .catch(err => {
              console.log(err);
              this.$message.error({
                message: err.data.message,
                showClose: true,
                duration: 2000
              });
              this.dialogVisible = true;
            });
        }
      },
      gobackOutbound() {
        this.outboundQuery.query = 2;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .product-list-container {
    width: 100%;

    .list-details {
      width: 91%;
      margin: 0 auto;
      padding: 30px;
      background-color: #fff;
      border-radius: 30px;

      .style-margin {
        margin: 15px 0;
      }

      .list-top {
        border-bottom: 2px solid #000;
      }

      .list-center {
        .state {
          width: 40px;
          height: 20px;
          margin: 0 5px;
          line-height: 16.5px;
          text-align: center;
          background-color: #0aa1ed;
          border: 1px solid #0aa1ed;
          border-radius: 5px;
        }
      }
    }

    .product-container {
      .product-table {
        width: 94%;
        margin: 10px auto;
        padding: 10px;
        background-color: #fff;
        border-radius: 30px;
      }

      td {
        height: 60px;
        margin: 10px 0;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        background-color: #f3fbf9;
        font-size: 15px;
      }

      .first-img {
        width: 100px;
        height: 100px;
        border-radius: 30px;
        object-fit: cover;
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
        left: 25%;
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

  .previewImg2 {
    display: flex;
  }

  .back-img {
    width: 75px;
    height: 45px;
    margin-left: 5%;
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

  @media screen and (min-width: 1651px) {

    .td-center {
      padding-right: 5%;
    }
  }

  @media screen and (min-width: 1251px) and (max-width: 1650px) {

    .td-center {
      padding-right: 20%;
    }
  }

  @media screen and (min-width: 986px) and (max-width: 1250px) {

    .td-center {
      padding-right: 28%;
    }
  }

  @media screen and (max-width: 985px) {

    .td-center {
      padding-right: 35%;
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;

    tr {

      th,
      td {
        width: 32%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>