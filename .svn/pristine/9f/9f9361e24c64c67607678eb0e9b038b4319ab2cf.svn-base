<template>
  <div class="store-query-container">
    <!-- <h3>店铺查询页面</h3> -->
    <div>
      <h4 style="margin:0 0 10px 0;">总共查询到 {{nums}} 个店铺</h4>
      <div class="store-table">
        <div style="display: flex;justify-content: space-between;">
          <div></div>
          <div style="display: flex;">
            <div style="margin-right: 40px;padding-top: 10px;cursor: pointer;" @click="modeSwitch">
              <img src="../../assets/imgs/cut.png" style="width: 40px;height: 35px;" />
            </div>
            <div @click="addStore" class="addBtn">
              <span class="add-style">
                <span>+</span> 增加店铺
              </span>
            </div>
            <el-dialog title="增加店铺" :visible.sync="dialogStoreQueryVisible" center :close-on-press-escape="false"
              :close-on-click-modal="false">
              <div>
                <el-form label-width="180px">
                  <el-form-item label="代理商名称：" required>
                    <el-input v-model="agent" class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="店铺名称：" required>
                    <el-input v-model="name" class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="国家：" required>
                    <el-select v-model="country" placeholder="请选择" class="input-style">
                      <el-option v-for="(coun, index) in countryList" :key="index" :label="coun.cnName"
                        :value="coun.cnName"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="城市中文名称：" required>
                    <el-input v-model="cityCn" class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="城市英文名称：" required>
                    <el-input v-model="cityEn" class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="中文地址：">
                    <el-input type="textarea" v-model="addrCn" class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="英文地址：">
                    <el-input type="textarea" v-model="addrEn" class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="gps坐标：">
                    <div style="display: flex;">
                      <div class="input-style">
                        <el-input v-model="gps"></el-input>
                        <div id="map" style="width:500px;height:380px;display: none;"></div>
                      </div>
                      <div style="display: flex;line-height: 45px;cursor: pointer;" @click="getLocation">
                        <div style="margin-right: 3px;line-height: 56px;">
                          <img src="../../assets/imgs/position.png" style="width: 25px;height: 25px;" />
                        </div>
                        <p
                          style="height: 40px;line-height: 40px;padding: 0 5px;margin: 0;border: 1px solid #ddd; border-radius: 10px;">
                          当前位置</p>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label="主营品牌：" required>
                    <el-checkbox-group v-model="sellBrandList">
                      <el-checkbox :label="brand.name" v-for="(brand, index) of watchBrandList" :key="index">
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="联系人：">
                    <el-input v-model="contactName" placeholder="请输入联系人姓名" class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式：">
                    <el-input type="textarea" v-model="contactNote" placeholder="请输入联系人联系方式" class="input-style">
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div slot="footer">
                <el-button @click="dialogStoreQueryVisible = false">取 消</el-button>
                <el-button type="primary" @click="addStoreSure" v-preventClick>确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
        <div style="margin-top: 30px;">
          <div v-show="storeList.length == 0" ref="hello" style="text-align: center;">
            <p>{{hintMsg}}</p>
          </div>
          <div v-show="storeQuerySel.select == 0" class="store-query-map">
            <!-- <p>地图模式</p> -->
            <div id="googleMap" style="height: 800px;"></div>
          </div>
          <div v-show="storeQuerySel.select == 1">
            <div v-if="storeList.length !== 0">
              <table>
                <tr>
                  <th>店铺信息</th>
                  <th>距离</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(item,index) in list" :key="index">
                  <td style="text-align: left;">
                    <p style="font-weight: bold;">{{item.name}}</p>
                    <p style="color: #666; font-size: 14px;">{{item.addrCn == '' ? item.addrEn : item.addrCn}}</p>
                    <p style="color: #666; font-size: 14px;">经营品牌： {{item.brands}}</p>
                  </td>
                  <td>{{getDistance(item.gps) + ' km'}}</td>
                  <td>
                    <el-tooltip class="item" effect="light" content="查看修改信息" placement="top-end">
                      <img src="../../assets/imgs/details.png" style="cursor:pointer;" @click="updateStore(item)" />
                    </el-tooltip>
                    <el-dialog title="修改店铺信息" :visible.sync="dialogStoreUpdateVisible" center
                      :close-on-press-escape="false" :close-on-click-modal="false">
                      <div>
                        <el-form label-width="180px">
                          <el-form-item label="代理商名称：" required>
                            <el-input v-model="agent" class="input-style" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="店铺名称：" required>
                            <el-input v-model="name" class="input-style" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="国家：" required>
                            <el-select v-model="country" placeholder="请选择" class="input-style" disabled>
                              <el-option v-for="(coun, index) in countryList" :key="index" :label="coun.cnName"
                                :value="coun.cnName"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="城市中文名称：" required>
                            <el-input v-model="cityCn" class="input-style" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="城市英文名称：" required>
                            <el-input v-model="cityEn" class="input-style" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="中文地址：">
                            <el-input type="textarea" v-model="addrCn" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="英文地址：">
                            <el-input type="textarea" v-model="addrEn" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="gps坐标：" v-show="storeAuthority[7] == 1">
                            <div style="display: flex;justify-content: space-between;">
                              <div class="input-style">
                                <el-input v-model="gps"></el-input>
                                <!-- <el-amap vid="amap" class="amap-demo" style="display: none;"></el-amap> -->
                              </div>
                              <div style="display: flex;line-height: 45px;cursor: pointer;" @click="getLocation">
                                <div style="margin-right: 3px;line-height: 56px;">
                                  <img src="../../assets/imgs/position.png" style="width: 25px;height: 25px;" />
                                </div>
                                <p
                                  style="height: 40px;line-height: 40px;padding: 0 5px;margin: 0;border: 1px solid #ddd; border-radius: 10px;">
                                  当前位置</p>
                              </div>
                            </div>
                          </el-form-item>
                          <el-form-item label="主营品牌：" required>
                            <el-checkbox-group v-model="sellBrandList" disabled>
                              <el-checkbox :label="brand.name" v-for="(brand, index) of watchBrandList" :key="index">
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label="联系人：">
                            <el-input v-model="contactName" placeholder="请输入联系人姓名" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="联系方式：">
                            <el-input type="textarea" v-model="contactNote" placeholder="请输入联系人联系方式"
                              class="input-style">
                            </el-input>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogStoreUpdateVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateStoreSure" v-preventClick>确定修改</el-button>
                      </div>
                    </el-dialog>
                    <el-tooltip class="item" effect="light" content="删除" placement="top-end">
                      <img src="../../assets/imgs/delete.png" style="margin-left: 20px;cursor:pointer;"
                        v-if="storeAuthority[7] == 1" @click="deletStore(item.id)" />
                    </el-tooltip>
                    <el-dialog title="删除该店铺" :visible.sync="dialogStoreDeletVisible" center
                      :close-on-press-escape="false" :close-on-click-modal="false">
                      <div style="text-align: center;">
                        <p>确定删除该店铺信息？删除后不可恢复</p>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogStoreDeletVisible = false">取 消</el-button>
                        <el-button type="primary" @click="deletStoreSure" v-preventClick>确 定</el-button>
                      </div>
                    </el-dialog>
                    <el-tooltip class="item" effect="light" content="到这里" placement="top-end">
                      <img src="../../assets/imgs/goHere.png"
                        style="width: 20px;height: 20px;margin-left: 20px;cursor:pointer;" @click="goHere(item.gps)" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="light" content="新建采购单" placement="top-end">
                      <img v-show="storeAuthority[9] == 1" src="../../assets/imgs/add.png"
                        style="margin-left: 20px;cursor:pointer;" @click="purchaseJump(item)" />
                    </el-tooltip>
                  </td>
                </tr>
              </table>
              <div style="width: 100%;height: 50px;">
                <div style="margin:15px 0;position:absolute;right:6%;">
                  <el-pagination @current-change="handleCurrentChange" :current-page="page"
                    layout="total, prev, pager, next, jumper" :total="total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let map, marker;
  export default {
    data() {
      let self = this;
      return {
        hintMsg: "",
        myLng: '',
        myLat: '',
        storeList: [],
        list: [],
        page: 1,
        pageNum: 10,
        total: 0,
        keyword: '',
        dialogStoreQueryVisible: false,
        agent: '', // 代理商名称
        name: '', // 店铺名称
        country: '', // 国家
        countryList: [],
        cityCn: '', // 城市中文名称
        cityEn: '', // 城市英文名称
        addrCn: '', // 中文地址
        addrEn: '', // 英文地址
        gps: '', // gps坐标
        watchBrandList: [],
        sellBrandList: [], // 所选择的主营品牌
        brands: '', // 主营品牌
        contactName: '', // 联系人
        contactNote: '', // 联系方式
        positions: {
          lng: "",
          lat: "",
          address: "",
          loaded: false
        },
        nums: 0,
        dialogStoreUpdateVisible: false,
        updateId: 0,
        dialogStoreDeletVisible: false,
        deletId: 0,

        Mylat: 0,
        Mylong: 0,
        center: {
          lng: 121.59996,
          lat: 31.197646
        },
        storeAuthority: []
      }
    },
    props: ["storeQuerySel"],
    created() {
      this.storeAuthority = sessionStorage.getItem('authority').split('|');
      this.handleCountryGet();
      this.handleBrand();
      this.getLocation();

    },
    mounted() {
      this.mapBuild();
    },
    methods: {
      //  地图实例
      mapBuild() {
        //创建地图实例，zoom是缩放比例
        let map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 3,
          center: this.center,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        for (let i = 0; i < 10; i++) {
          console.log('循环');
        }
        console.log(this.storeList);
        console.log(this.storeList.length);
        let Mymarker = null;
        let myCenter = null;
        let str = '';
        for (let i = 0; i < this.storeList.length; i++) {
          //创建一个标记
          // console.log(this.storeList[i].gps);
          if (this.storeList[i].gps !== '' && this.storeList[i].gps !== null) {
            myCenter = new google.maps.LatLng(Number(this.storeList[i].gps.split(',')[0]), Number(this.storeList[i].gps
              .split(
                ',')[
                1]));
            str = `
                <div style="padding-right: 60px;display: flex;justify-content: space-between;">
                  <p>主营品牌：${this.storeList[i].brands}</p>
                  <a style="text-decoration: none;font-size: 15px;" target="_blank" href="https://www.google.com/maps/dir/?api=1&language=zh-CN&origin=&destination=${this.storeList[i].gps}">到这里</a>
                </div>
                <p>店铺名称：${this.storeList[i].name}</p>
                <p>详细地址：${this.storeList[i].addrCn == "" ? this.storeList[i].addrEn : this.storeList[i].addrCn}</p>
                `;
            Mymarker = new google.maps.Marker({
              position: myCenter,
            });
            Mymarker.setMap(map);
            this.attachSecretMessage(Mymarker, str);
          }
        }
        if (myCenter != null) {
          map.panTo(myCenter);
        }
        // map.panTo(Mymarker);
      },
      attachSecretMessage(marker, str) {
        var infowindow = new google.maps.InfoWindow({
          content: str,
          size: new google.maps.Size(50, 50)
        });
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map, marker);
        });
      },

      // 模糊搜索店铺
      stockInSearch() {
        console.log(this.keyword);
        this.page = 1;
        if (this.keyword !== '') {
          this.list = [];
          this.storeList = [];
          this.nums = 0;
          this.hintMsg = "数据加载中...";
          this.$axios
            .post(this.$store.state.baseUrl + "/StoreSearch", {
              keyword: this.keyword
            }).then((res) => {
              console.log('模糊搜索店铺');
              console.log(res);
              this.storeList = res.data;
              this.nums = this.storeList.length;
              console.log(this.storeList);
              this.storeList = this.storeList.sort((a, b) => {
                return this.getDistance(a.gps) - this.getDistance(b.gps);
              });
              if (this.storeList.length == 0) {
                this.hintMsg = "啊哦~ 暂无数据";
              }
              this.mapBuild();
              this.getList();
            }).catch((err) => {
              console.log(err);
            })
        } else {
          this.list = [];
          this.storeList = [];
          this.nums = 0;
          this.hintMsg = "请输入查询内容";
        }
      },
      // 分页处理数据
      getList() {
        console.log('分页数据');
        this.total = this.storeList.length;
        console.log(this.storeList);
        // es6过滤得到满足搜索条件的展示数据list
        this.list = this.storeList.filter((item, index) =>
          index < this.page * this.pageNum && index >= this.pageNum * (this.page - 1)
        );
        console.log(this.list);

      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getList();
        (function smoothscroll() {
          let currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 计算距离
      getDistance(item) {
        // console.log(this.myLng + ',' + this.myLat);
        // console.log(item); // lat纬度  lng经度
        let lat1 = 0;
        let lng1 = 0;
        if (item !== null && item !== '') {
          // console.log(item.split(','));
          lat1 = item.split(',')[0];
          lng1 = item.split(',')[1];
        } else {
          return 0;
        }
        // console.log(this.gps);
        let lng2 = this.myLng;
        let lat2 = this.myLat;
        let EARTH_RADIUS = 6378.137;
        let radLat1 = this.rad(lat1);
        let radLat2 = this.rad(lat2);
        let a = radLat1 - radLat2;
        let b = this.rad(lng1) - this.rad(lng2);
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) *
          Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = (Math.round(s * 10000) / 10000).toFixed(1);
        return s;
      },
      rad(d) {
        return d * Math.PI / 180.0;
      },
      // 切换模式
      modeSwitch() {
        if (this.storeQuerySel.select == 1) {
          this.storeQuerySel.select = 0;
          this.mapBuild();
        } else if (this.storeQuerySel.select == 0) {
          this.storeQuerySel.select = 1;
        }
      },
      //获取地理位置
      getLocation() {
        if (navigator.geolocation) {
          console.log("h5 定位中");
          navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log('h5定位成功；');
            console.log(latitude + ',' + longitude);
            this.myLat = latitude;
            this.myLng = longitude;
            this.gps = latitude + ',' + longitude;
            console.log('定位坐标');
            console.log(this.gps);
          }, function (error) {
            console.log('h5定位失败；');
          })
        }
      },
      // 新增店铺
      addStore() {
        this.agent = "";
        this.name = "";
        this.country = "";
        this.cityCn = "";
        this.cityEn = "";
        this.addrCn = "";
        this.addrEn = "";
        this.gps = "";
        this.sellBrandList = [];
        this.brands = "";
        this.contactName = "";
        this.contactNote = "";
        this.dialogStoreQueryVisible = true;
      },
      // 增加店铺前数据的验证
      verify() {
        if (this.agent == '' || this.name == "" || this.country == "" || this.cityCn == "" || this.cityEn == "" ||
          this
          .sellBrandList == [] || this.brands == "") {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          });
          return 1;
        }
        if (this.addrCn == "" && this.addrEn == "") {
          this.$message.error({
            message: '请输入英文地址或中文地址',
            showClose: true,
            duration: 2000
          });
          return 1;
        }
      },
      // 确定增加
      addStoreSure() {
        this.brands = this.sellBrandList.join("|");
        console.log(this.gps);
        if (this.verify() !== 1) {
          this.$axios.post(this.$store.state.baseUrl + '/StoreAdd?java', {
            brands: this.brands,
            agent: this.agent,
            name: this.name,
            countryCn: this.country,
            cityCn: this.cityCn,
            cityEn: this.cityEn,
            addrCn: this.addrCn,
            addrEn: this.addrEn,
            gps: this.gps,
            contactName: this.contactName,
            contactNote: this.contactNote
          }).then((res) => {
            console.log('增加店铺');
            console.log(res);
            this.$message.success({
              message: '新增店铺成功',
              showClose: true,
              duration: 2000
            });
            this.dialogStoreQueryVisible = false;
            this.keyword = '';
            this.stockInSearch();
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.message,
              showClose: true,
              duration: 2000
            })
          })
        }
      },
      // 修改店铺
      updateStore(item) {
        console.log(item);
        this.updateId = item.id;
        this.agent = item.agent;
        this.name = item.name;
        this.country = item.countryCn;
        this.cityCn = item.cityCn;
        this.cityEn = item.cityEn;
        this.addrCn = item.addrCn;
        this.addrEn = item.addrEn;
        this.sellBrandList = [];
        if (item.brands.indexOf("|") == -1) {
          this.sellBrandList.push(item.brands);
        } else {
          this.sellBrandList = item.brands.split('|');
        }
        this.contactName = item.contactName;
        this.contactNote = item.contactNote;
        this.gps = item.gps;
        this.dialogStoreUpdateVisible = true;
      },
      // 确认修改
      updateStoreSure() {
        let params = {};
        if (this.storeAuthority[7] == 1) {
          params = {
            id: this.updateId,
            addrCn: this.addrCn,
            addrEn: this.addrEn,
            gps: this.gps,
            contactName: this.contactName,
            contactNote: this.contactNote
          }
        } else {
          params = {
            id: this.updateId,
            addrCn: this.addrCn,
            addrEn: this.addrEn,
            contactName: this.contactName,
            contactNote: this.contactNote
          }
        }
        this.$axios.post(this.$store.state.baseUrl + '/StoreModify?java', params).then((res) => {
          console.log('修改店铺');
          console.log(res);
          this.dialogStoreUpdateVisible = false;
          this.$message.success({
            message: '修改店铺信息成功',
            showClose: true,
            duration: 2000
          });
          this.stockInSearch();
        }).catch((err) => {
          console.log(err);
          this.dialogStoreUpdateVisible = false;
          this.$message.error({
            message: err.message,
            showClose: true,
            duration: 2000
          });
        })
      },
      // 删除店铺
      deletStore(id) {
        this.deletId = id;
        if (this.storeAuthority[7] == 1) {
          this.dialogStoreDeletVisible = true;
        } else {
          this.$message.error({
            message: '您没有该权限，无法删除',
            showClose: true,
            duration: 2000
          })
        }
      },
      // 确定删除
      deletStoreSure() {
        this.$axios.post(this.$store.state.baseUrl + '/StoreDel?java', {
          id: this.deletId
        }).then((res) => {
          console.log('删除店铺');
          console.log(res);
          this.dialogStoreDeletVisible = false;
          this.$message.success({
            message: '删除店铺成功',
            showClose: true,
            duration: 2000
          });
          this.stockInSearch();
        }).catch((err) => {
          console.log(err);
          this.dialogStoreDeletVisible = false;
          this.$message.success({
            message: err.message,
            showClose: true,
            duration: 2000
          })
        })
      },
      // 到这里
      goHere(gps) {
        if (gps !== null && gps !== '') {
          window.open('https://www.google.com/maps/dir/?api=1&language=zh-CN&origin=&destination=' + gps, '_blank');
        } else {
          this.$message.error({
            message: '该店铺位置信息为空，无法为您规划路线',
            showClose: true,
            duration: 2000
          })
        }
      },
      // 跳转新建采购单
      purchaseJump(item) {
        console.log(item);
        let itmes = {
          name: item.name + "（地址：" + (item.addrCn == '' ? item.addrEn : item.addrCn) + "）",
          id: item.id,
          country: item.countryCn
        }
        console.log(itmes);
        this.$emit('storeJump', itmes);
      },
      // 获取所有国家
      handleCountryGet() {
        this.$axios.post(this.$store.state.baseUrl + '/CountryGet').then((res) => {
          console.log(res);
          this.countryList = res.data;
        })
      },
      // 获取所有品牌
      handleBrand() {
        this.$axios.post(this.$store.state.baseUrl + '/DataWatchBrandList').then((res) => {
          console.log('品牌列表');
          console.log(res);
          this.watchBrandList = res.data;
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .store-query-container {
    width: 95%;
    margin: 0 auto;

    .store-table {
      padding: 40px;
      background-color: #fff;
      border-radius: 30px;

      th {
        height: 50px;
        line-height: 50px;
        background-color: #d7ebe7;
      }

      td {
        padding: 20px;
        background-color: #f3fbf9;
        border-bottom: 1px solid #d7ebe7;
      }

      .store-table tr:hover>td {
        background-color: #d7ebe7 !important;
      }
    }

    .addBtn {
      width: 144px;
      height: 48px;
      // margin: 20px 0;
      line-height: 48px;
      border-radius: 6px;
      text-align: center;
      cursor: pointer;
      background-color: #0c7063;

      .add-style {
        display: inline-block;
        font-size: 16px;
        color: #fff;
      }
    }

    .store-query-map {
      width: 95%;
      margin: 0 auto;
    }
  }

  .input-style {
    width: 60%;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  tr {

    th,
    td {
      width: 20%;
      text-align: center;
    }
  }
</style>