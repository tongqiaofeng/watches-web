<template>
  <div class="stock-pending-container">
    <!-- <h1>待入库手表</h1> -->
    <div v-if="stock1.num == 0">
      <div v-show="stockList.length == 0" ref="hello" style="margin-top: 30px;text-align: center;">
        <p>{{hintMsg}}</p>
      </div>
      <div v-if="stockList.length !== 0">
        <div style="width: 98%;margin: 0 auto;">
          <p style="margin: 0;font-size: 18px;">待入库手表总数量： {{count}}</p>
        </div>
        <div class="stock-container">
          <div class="stock-list">
            <div v-if="keyword == ''">
              <div v-for="(item,index) in stockList" :key="index" style="margin-top: 10px;">
                <div class="purchase-row">
                  <span class="purchase-number">物流单号: {{" " + item.log_id}}</span>
                  <span class="purchase-date">发货时间: {{item.log_sendTime}}</span>
                </div>
                <table>
                  <tr>
                    <th>负责人</th>
                    <th>货物数量</th>
                    <th>预计到达时间</th>
                    <th>操作</th>
                  </tr>
                  <tr>
                    <td>{{item.nick}}</td>
                    <td>{{item.log_watch.length}}</td>
                    <td>{{item.log_arriveTime}}</td>
                    <td>
                      <el-tooltip class="item" effect="light" content="查看手表详情" placement="top-end">
                        <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                          @click="stockListJump(item.log_watch)" />
                      </el-tooltip>
                    </td>
                  </tr>
                </table>
              </div>
              <div style="width: 100%;height: 50px;">
                <div style="margin:15px 0;position:absolute;right:6%;">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="page" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
                </div>
              </div>
            </div>
            <div v-if="keyword !== ''">
              <div v-show="stockPending.length == 0" ref="keywordText" style="width: 100%; text-align: center;">
                <p>{{hintMsg}}</p>
              </div>
              <table v-show="stockPending.length !== 0" class="stocktable">
                <tr>
                  <th>图片</th>
                  <th>品牌</th>
                  <th>型号</th>
                  <th>机芯号</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(items,index) in stockPending" :key="index">
                  <td>
                    <img v-image-preview
                      :src="items.buy_watchPics == null || items.buy_watchPics == '' ? '' : img + '/img/watch/'+ (items.buy_watchPics || '').split('|')[0]"
                      style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
                  </td>
                  <td>{{items.buy_watchBrand}}</td>
                  <td>{{items.buy_watchModel}}</td>
                  <td>{{items.buy_watchSn}}</td>
                  <td>
                    <el-button type="text" @click="stockPendingButton(items)">入库</el-button>
                    <el-dialog title="入库" :visible.sync="dialogVisible" :close-on-press-escape="false"
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
                        <div style="margin: 30px;">
                          <div style="margin: 15px 0;">
                            <div>
                              <span>商品图片：（同保卡一起拍）</span>
                            </div>
                            <div style="display:flex;">
                              <div class="upload-imgs">
                                <div class="add">
                                  <form :id="items.buy_watchSn" enctype="multipart/form-data">
                                    <input @change="inputChange($event,items.buy_watchSn)" type="file" name="img"
                                      accept="image/*" class="inputUpload" multiple />
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
                            <el-button type="primary" @click="getQRCode" v-preventClick style="width: 40%;">打印二维码
                            </el-button>
                          </div>
                        </div>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sureStockProduct(items.id)" v-preventClick>确 定</el-button>
                      </div>
                    </el-dialog>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="stock-body" v-if="stock1.num == 1">
      <Stock-pending :watchList="watchList" @gobackStockList="gobackStockList"></Stock-pending>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hintMsg: '',
        img: this.$store.state.baseUrl,
        dialogVisible: false,
        count: 0,
        page: 1,
        pageNum: 10,
        total: 0,
        stockList: [], // 待入库物流
        stockPending: [],
        keyword: "", // 模糊搜索关键词
        watchList: [], // 每个物流单号对应的手表列表
        QRCodeMsg: "", //生成二维码信息
        watchState: [], // 手表状态
        stock_instateA: "",
        stock_shelfNo_A: "", // 仓库货架号
        stock_inPic: "",
        imgurls: [],
        buy_watchBrand: "",
        buy_watchModel: "",
        stock_No: "",
        stock_NoCrc: "",
        radioWatch: "1",
        radiowatchs: ""
      };
    },
    props: ["stock1"],
    created() {
      this.getCount();
      this.getStockInList();
    },
    methods: {
      gobackStockList(val) {
        this.stock1.num = val;
        this.getCount();
        this.getStockInList();
      },
      // 待入库手表数量
      getCount() {
        this.$axios
          .post(this.$store.state.baseUrl + "/StockInCount")
          .then(res => {
            console.log("待入库数量");
            console.log(res);
            this.count = res.data.count;
            this.$emit('getStockCount', this.count);
          });
      },
      // 获取待入库手表列表
      getStockInList() {
        this.hintMsg = '数据加载中...';
        this.$axios
          .post(this.$store.state.baseUrl + "/StockInList", {
            page: this.page,
            pageNum: this.pageNum
          })
          .then(res => {
            console.log("待入库手表列表");
            console.log(res);
            this.total = res.data.total;
            this.stockList = res.data.lst;
            console.log(this.stockList.length);
            if (this.stockList.length == 0) {
              this.hintMsg = "啊哦~ 暂无数据";
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // search() {
      //   this.stockPending = [];
      //   this.hintMsg = '';
      // },
      // 模糊搜索
      stockInSearch() {
        this.stockPending = [];
        this.hintMsg = '数据加载中...';
        this.$axios
          .post(this.$store.state.baseUrl + "/StockInSearch", {
            keyword: this.keyword
          })
          .then(res => {
            console.log("模糊搜索获取待入库手表");
            console.log(res);
            this.stockPending = res.data;
            if ((this.stockPending.length == 0)) {
              this.hintMsg =
                "啊哦~没有符合该条件的商品，请重新输入关键字";
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 跳转本物流单号内手表展示页面
      stockListJump(watch) {
        console.log(watch);
        this.watchList = watch;
        this.stock1.num = 1;
        console.log("dscfdsvfc2222222222");
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        this.getStockInList();
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 打开入库弹窗页面
      stockPendingButton(items) {
        console.log(items);
        this.buy_watchBrand = items.buy_watchBrand;
        this.buy_watchModel = items.buy_watchModel;
        this.stock_No = items.stock_No;
        this.stock_NoCrc = items.stock_NoCrc;
        this.imgurls = [];
        this.radioWatch = "1";
        this.watchState = [];
        this.stock_instateA = "";
        this.stock_shelfNo_A = "";
        this.dialogVisible = true;
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
            let imgurl = res.data.imgurl;
            if (this.imgurls.indexOf(imgurl) == -1) {
              this.imgurls.push(imgurl);
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
        this.imgurls.splice(index, 1);
      },
      // 打印二维码
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
              message: "条码打印失败",
              showClose: true,
              duration: 2000
            });
          });
      },
      // 入库前数据的验证
      verification() {
        console.log(this.watchState);
        this.stock_instateA = "";
        if (this.watchState.length > 1) {
          this.stock_instateA = this.watchState.join('|');
        } else {
          this.stock_instateA = this.watchState[0];
        }
        console.log(this.stock_instateA);
      },
      // 模糊搜索指定的手表入库
      sureStockProduct(id) {
        console.log(id);
        if (this.verification() !== 1) {
          console.log("萝卜青菜");
          let storeImgUrl3 = this.imgurls.join('|');
          if (this.radioWatch == "1") {
            this.radiowatchs = "全新";
          } else if (this.radioWatch == "2") {
            this.radiowatchs = "二手";
          }
          console.log(this.radiowatchs);
          if (this.stock_instateA !== undefined) {
            this.stock_instateA = this.radiowatchs + "|" + this.stock_instateA;
          } else if (this.stock_instateA == undefined) {
            this.stock_instateA = this.radiowatchs;
          }
          this.$axios
            .post(this.$store.state.baseUrl + "/StockInDo", {
              id: id,
              stock_instateA: this.stock_instateA,
              stock_shelfNo_A: this.stock_shelfNo_A,
              stock_inPic: storeImgUrl3
            })
            .then(res => {
              console.log("是否入库成功");
              console.log(res);
              this.$message.success({
                message: "手表入库成功",
                showClose: true,
                duration: 2000
              });
              this.dialogVisible = false;
              this.getStockInList();
              this.getCount();
              this.keyword = '';
              // if (this.keyword !== '') {
              //   this.stockInSearch();
              // } else {
              //   this.getStockInList();
              // }
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
      },
    }
  };
</script>
<style lang="scss" scoped>
  .stock-pending-container {
    width: 95%;
    margin: 0 auto;

    .stock-container {
      width: 100%;
      margin: 0 auto;
    }

    .stockSearch {
      width: 50%;
      margin: 0 auto;
      display: flex;

      .el-input__inner {
        width: 600px;
        height: 48px;
        // position: absolute;
        // top: -60px;
        // right: 450px;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: url("../../assets/imgs/search2.png");
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: 30px center;
        border-radius: 30px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        line-height: 40px;
        outline: 0;
        padding: 0 65px;
        -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }

    .stock-list {
      margin-top: 20px;

      .stocktable {
        border-radius: 30px;
      }

      .purchase-row {
        margin-top: 20px;
        padding-top: 30px;
        padding-left: 30px;
        background-color: #fff;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;

        .purchase-number {
          font-size: 18px;
          font-weight: bold;
        }

        .purchase-date {
          margin-left: 30px;
          color: #c8c8c8;
        }
      }

      td {
        height: 60px;
        padding: 20px;
        margin: 10px 0;
        background-color: #f3fbf9;
        font-size: 15px;
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

    .previewImg {
      display: flex;
      z-index: 1;
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    padding: 30px;
    background-color: #fff;
    border-radius: 30px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    tr {

      th,
      td {
        width: 16%;
        text-align: center;
        border: 0;
      }
    }
  }

  .el-radio,
  .el-radio__input {
    line-height: 3;
  }
</style>
<style lang="scss">
  .el-pagination button:disabled {
    color: #c0c4cc;
    background-color: transparent;
    cursor: not-allowed;
  }

  div .el-pager li {
    background-color: transparent !important;
  }

  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    background: center center no-repeat transparent;
    background-size: 16px;
    cursor: pointer;
    margin: 0;
    color: #303133;
  }
</style>