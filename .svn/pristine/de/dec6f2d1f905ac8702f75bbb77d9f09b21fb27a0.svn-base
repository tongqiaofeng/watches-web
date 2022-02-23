<template>
  <div class="watch-query-container" id="watch-query">
    <!-- <h3>手表查询页面</h3> -->
    <div v-if="watchQuerySel.select == 0">
      <div class="watch-query-center">
        <div class="watch-select">
          <div style="display: flex;">
            <p style="margin-top: 10px;">
              <img src="../../assets/imgs/filter.png" />
            </p>
            <el-form class="el-form" label-width="80px">
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="品牌：" placeholder="请选择" class="el-form-item">
                    <el-select class="select-style" v-model="brand" @change="selectGoodsByGroupId($event)" clearable>
                      <el-option v-for="(item,index) in watchBrandList" :key="index" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="系列：" placeholder="请选择" class="el-form-item">
                    <el-select v-model="series" @change="seriesChange" clearable>
                      <el-option v-for="(items,index) in seriesList" :key="index" :value="items">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div v-show="watchAuthority[6] == 1">
            <div @click="addWatch" class="addBtn">
              <span class="add-style">
                <span>+</span> 增加手表
              </span>
            </div>
            <el-dialog title="增加手表" :visible.sync="dialogAddWatchVisible" center :close-on-press-escape="false"
              :close-on-click-modal="false" :lock-scroll="false" :append-to-body="true">
              <div>
                <div>
                  <el-form label-width="150px">
                    <el-form-item label="手表图片：" required>
                      <div style="display:flex;">
                        <div class="upload-imgs">
                          <div class="add">
                            <form enctype="multipart/form-data" style="width: 100px;">
                              <input @change="inputChange($event)" type="file" name="img" accept="image/*"
                                class="inputUpload" multiple />
                              <i class="el-icon-plus addIcon"></i>
                            </form>
                          </div>
                          <div style="display:flex;position:relative;flex-wrap: wrap;" id="delImg">
                            <div v-for="(imgurl,index) of imgurls" :key="index"
                              style="margin-left:10px;position:relative;"
                              v-dragging="{ item: imgurl, list: imgurls, group: 'imgurls' }">
                              <span class="spanStyle" @click="delImage(index)">x</span>
                              <img :src="img + '/img/watch' + imgurl" width="100px" height="100px"
                                style="border-radius:5px;object-fit:cover;" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item label="品牌名称：" required>
                      <el-autocomplete class="inline-input input-style" v-model="addBrand"
                        :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="系列名称：">
                      <el-autocomplete class="inline-input input-style" v-model="addSeries"
                        :fetch-suggestions="querySearch2" placeholder="请输入内容" @select="handleSelect2"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="手表型号：" required>
                      <el-input v-model="addModel" class="input-style" placeholder="请输入手表型号"></el-input>
                    </el-form-item>
                    <el-form-item label="公价：">
                      <div style="width: 100%;">
                        <el-select v-model="publicPriceArea" style="width: 30%;" @change="priceChange"
                          placeholder="请选择">
                          <el-option v-for="(item,index) in countryList" :key="index" :label="item.cnName"
                            :value="item.cnName">
                          </el-option>
                        </el-select>
                        <el-input v-model="publicPrice" placeholder="请输入" style="width: 30%;">
                          <i slot="suffix"
                            style="color: #000;margin-right:5%;font-style:normal;">{{publicPriceCurrency}}</i>
                        </el-input>
                        <el-button style="width: 100px;height: 40px;margin-left: 10px;font-size: 14px;" type="primary"
                          @click="addPrice" v-preventClick>
                          增加</el-button>
                      </div>
                    </el-form-item>
                    <el-form-item label="" style="width: 100%;" v-for="(price,index) in publicPriceList" :key="index">
                      <div style="width: 100%;">
                        <el-select style="width: 30%;" @change="priceChange2(index)" v-model="price.country">
                          <el-option v-for="(item,index) in countryList" :key="index" :label="item.cnName"
                            :value="item.cnName">
                          </el-option>
                        </el-select>
                        <el-input v-model="price.price" style="width: 30%;">
                          <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{price.currency}}</i>
                        </el-input>
                        <el-button type="primary" style="width: 100px;height: 40px;margin-left: 10px;font-size: 14px;"
                          @click="updatePrice(index)" v-preventClick>修改</el-button>
                        <el-button type="primary" style="width: 100px;height: 40px;font-size: 14px;"
                          @click="deletePrice(index)" v-preventClick>删除</el-button>
                      </div>
                    </el-form-item>

                  </el-form>
                </div>
                <div>
                  <h3>基本信息：</h3>
                  <el-form label-width="150px">
                    <el-form-item label="适用人群：">
                      <el-select v-model="crowd" placeholder="请选择" class="input-style">
                        <el-option label="男士" value="男士"></el-option>
                        <el-option label="女士" value="女士"></el-option>
                        <el-option label="中性" value="中性"></el-option>
                        <el-option label="情侣" value="情侣"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="风格：">
                      <el-select v-model="style" placeholder="请选择" class="input-style">
                        <el-option value="运动"></el-option>
                        <el-option value="商务"></el-option>
                        <el-option value="时尚"></el-option>
                        <el-option value="休闲"></el-option>
                        <el-option value="正装"></el-option>
                        <el-option value="珠宝"></el-option>
                        <el-option value="简约"></el-option>
                        <el-option value="古典"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="是否背透：">
                      <el-radio-group v-model="transparent">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否限量：">
                      <el-radio-group v-model="limited">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="限量版个数：">
                      <el-input v-model="limitedNum" class="input-style" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="特别版：">
                      <el-input v-model="special" class="input-style" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="是否防水：">
                      <el-radio-group v-model="waterproofEn">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="防水深度：">
                      <el-input v-model="waterproof" class="input-style">
                        <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">米</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="昵称简称：">
                      <el-input v-model="watchNick" class="input-style"></el-input>
                    </el-form-item>
                    <el-form-item label="上市年份：">
                      <el-input v-model="startYear" class="input-style"></el-input>
                    </el-form-item>
                    <el-form-item label="停产年份：">
                      <el-input v-model="endYear" class="input-style"></el-input>
                    </el-form-item>
                    <el-form-item label="名人同款：">
                      <el-input v-model="famous" class="input-style"></el-input>
                    </el-form-item>
                    <el-form-item label="功能：">
                      <el-checkbox-group v-model="funcList">
                        <el-checkbox v-for="(funcName,index) in funcLi" :key="index" :label="funcName"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="手表描述：">
                      <el-input type="textarea" v-model="des" class="input-style"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div>
                  <h3>表壳：</h3>
                  <el-form label-width="150px">
                    <el-form-item label="表壳直径：">
                      <el-input v-model="watchShellSize" class="input-style">
                        <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="表壳宽度：">
                      <el-input v-model="watchShellWidth" class="input-style">
                        <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="表壳高度：">
                      <el-input v-model="watchShellHeight" class="input-style">
                        <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="表壳厚度：">
                      <el-input v-model="watchThickness" class="input-style">
                        <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="表镜材质：">
                      <el-select v-model="glassMaterial" placeholder="请选择" class="input-style">
                        <el-option value="蓝宝石水晶"></el-option>
                        <el-option value="矿物玻璃"></el-option>
                        <el-option value="玻璃"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="表壳材质：">
                      <el-checkbox-group v-model="shellMaterialList">
                        <el-checkbox v-for="(shell,index) in shellList" :key="index" :label="shell"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="表圈材质：">
                      <el-checkbox-group v-model="bezelMaterialList">
                        <el-checkbox v-for="(baze,index) in bazeList" :key="index" :label="baze"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="表冠材质：">
                      <el-checkbox-group v-model="crownMaterialList">
                        <el-checkbox v-for="(crown,index) in bazeList" :key="index" :label="crown"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-form>
                </div>
                <div>
                  <h3>表盘：</h3>
                  <el-form label-width="150px">
                    <el-form-item label="表盘形状：">
                      <el-select v-model="dialShape" placeholder="请选择" class="input-style">
                        <el-option value="圆形"></el-option>
                        <el-option value="方形"></el-option>
                        <el-option value="椭圆形"></el-option>
                        <el-option value="酒桶形"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="表盘刻度：">
                      <el-select v-model="dialMark" placeholder="请选择" class="input-style">
                        <el-option value="阿拉伯文"></el-option>
                        <el-option value="罗马文"></el-option>
                        <el-option value="条形"></el-option>
                        <el-option value="钻石"></el-option>
                        <el-option value="无刻度"></el-option>
                        <el-option value="其它"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="表盘直径：">
                      <el-input v-model="dialSize" class="input-style">
                        <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="表盘昵称：">
                      <el-input v-model="dialNick" class="input-style"></el-input>
                    </el-form-item>
                    <el-form-item label="表盘工艺：">
                      <el-input v-model="dialCraft" class="input-style"></el-input>
                    </el-form-item>
                    <el-form-item label="表盘颜色：">
                      <el-checkbox-group v-model="dialClrList">
                        <el-checkbox v-for="(dial,index) in dialList" :key="index" :label="dial"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="表盘材质：">
                      <el-checkbox-group v-model="dialMaterialList">
                        <el-checkbox v-for="(mater,index) in dialMateList" :key="index" :label="mater"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-form>
                </div>
                <div>
                  <h3>表带表扣：</h3>
                  <el-form label-width="150px">
                    <el-form-item label="表扣类型：">
                      <el-select v-model="claspType" placeholder="请选择" class="input-style">
                        <el-option value="针扣"></el-option>
                        <el-option value="折叠扣"></el-option>
                        <el-option value="蝴蝶扣"></el-option>
                        <el-option value="暗扣"></el-option>
                        <el-option value="其它"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="表带材质：">
                      <el-select v-model="bandMaterial" placeholder="请选择" class="input-style">
                        <el-option value="真皮"></el-option>
                        <el-option value="牛皮"></el-option>
                        <el-option value="鳄鱼皮"></el-option>
                        <el-option value="精钢"></el-option>
                        <el-option value="橡胶"></el-option>
                        <el-option value="白金"></el-option>
                        <el-option value="不锈钢"></el-option>
                        <el-option value="黄金"></el-option>
                        <el-option value="钛合金"></el-option>
                        <el-option value="玫瑰金"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="表带颜色：">
                      <el-checkbox-group v-model="bandClrList">
                        <el-checkbox v-for="(color,index) in dialList" :key="index" :label="color"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-form>
                </div>
                <div>
                  <h3>机芯：</h3>
                  <el-form label-width="150px">
                    <el-form-item label="机芯类型：">
                      <el-select v-model="movementType" class="input-style">
                        <el-option value="自动机械"></el-option>
                        <el-option value="手动机械"></el-option>
                        <el-option value="石英"></el-option>
                        <el-option value="光能"></el-option>
                        <el-option value="智能"></el-option>
                        <el-option value="电子"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="机芯型号：">
                      <el-input v-model="movementModel" class="input-style"></el-input>
                    </el-form-item>
                    <el-form-item label="机芯直径：">
                      <el-input v-model="movementSize" class="input-style">
                        <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="机芯宝石数：">
                      <el-input v-model="jewelNum" class="input-style"></el-input>
                    </el-form-item>
                    <el-form-item label="动力存储：">
                      <el-input v-model="powerTime" class="input-style">
                        <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">小时</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="机芯振频：">
                      <el-input v-model="frequency" class="input-style"></el-input>
                    </el-form-item>
                    <el-form-item label="机芯描述：">
                      <el-input v-model="movementDes" type="textarea" class="input-style"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div slot="footer">
                <el-button @click="dialogAddWatchVisible = false">取 消</el-button>
                <el-button type="primary" @click="addWatchSure" v-preventClick>确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
        <div>
          <div v-show="watchList.length == 0" style="text-align: center;" ref="hello">
            <p>{{hintMsg}}</p>
          </div>
          <div v-if="watchList.length !== 0">
            <table class="watch-table">
              <tr>
                <th>图片</th>
                <th>品牌</th>
                <th>型号</th>
                <th>操作</th>
              </tr>
              <tr v-for="(item,index) in watchList" :key="index">
                <td>
                  <!--  + '/img/watch/' -->
                  <img v-image-preview class="img-style"
                    :src="item.pics == null || item.pics == '' ? '' :  img + '/img/watch/' + item.pics.split('|')[0]" />
                </td>
                <td>{{item.brand}}</td>
                <td>{{item.model}}</td>
                <td>
                  <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                    <img src="../../assets/imgs/details.png" style="cursor:pointer;" @click="watchDetails(item.id)" />
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="修改信息" placement="top-end">
                    <img src="../../assets/imgs/update.png" style="margin-left: 30px;cursor:pointer;"
                      v-show="watchAuthority[6] == 1" @click="watchUpdate(item)" />
                  </el-tooltip>

                  <el-dialog title="修改手表信息" :visible.sync="dialogUpdateWatchVisible" center
                    :close-on-press-escape="false" :close-on-click-modal="false" :lock-scroll="false"
                    :append-to-body="true">
                    <div>
                      <div>
                        <el-form label-width="150px">
                          <el-form-item label="手表图片：" required>
                            <div style="display:flex;">
                              <div class="upload-imgs">
                                <div class="add">
                                  <form enctype="multipart/form-data" style="width: 100px;">
                                    <input @change="inputChange($event)" type="file" name="img" accept="image/*"
                                      class="inputUpload" multiple />
                                    <i class="el-icon-plus addIcon"></i>
                                  </form>
                                </div>
                                <div style="display:flex;position:relative;flex-wrap: wrap;" id="delImg" class="delImg">
                                  <div v-for="(imgurl,index) of imgurls" :key="index"
                                    style="margin-left:10px;position:relative;"
                                    v-dragging="{ item: imgurl, list: imgurls, group: 'imgurls' }">
                                    <span v-if="imgurl !== '' && imgurl !== null" class="spanStyle"
                                      @click="delImage(index)">x</span>
                                    <img v-if="imgurl !== '' && imgurl !== null" :src="img + '/img/watch/' + imgurl"
                                      width="100px" height="100px" style="border-radius:5px;object-fit:cover;" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </el-form-item>
                          <el-form-item label="品牌名称：" required>
                            <el-autocomplete class="inline-input input-style" v-model="addBrand"
                              :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
                            </el-autocomplete>
                          </el-form-item>
                          <el-form-item label="系列名称：">
                            <el-autocomplete class="inline-input input-style" v-model="addSeries"
                              :fetch-suggestions="querySearch2" placeholder="请输入内容" @select="handleSelect2">
                            </el-autocomplete>
                          </el-form-item>
                          <el-form-item label="手表型号：" required>
                            <el-input v-model="addModel" class="input-style" placeholder="请输入手表型号"></el-input>
                          </el-form-item>
                          <el-form-item label="公价：">
                            <div style="width: 100%;">
                              <el-select v-model="publicPriceArea" placeholder="请选择" style="width: 30%;"
                                @change="priceChange">
                                <el-option v-for="(item,index) in countryList" :key="index" :label="item.cnName"
                                  :value="item.cnName">
                                </el-option>
                              </el-select>
                              <el-input v-model="publicPrice" placeholder="请输入" style="width: 30%;">
                                <i slot="suffix"
                                  style="color: #000;margin-right:5%;font-style:normal;">{{publicPriceCurrency}}</i>
                              </el-input>
                              <el-button style="width: 100px;height: 40px;margin-left: 10px;font-size: 14px;"
                                type="primary" @click="addPrice" v-preventClick>增加</el-button>
                            </div>
                          </el-form-item>
                          <el-form-item label="" style="width: 100%;" v-for="(price,index) in publicPriceList"
                            :key="index">
                            <div style="width: 100%;">
                              <el-select style="width: 30%;" @change="priceChange2(index)" v-model="price.country">
                                <el-option v-for="(item,index) in countryList" :key="index" :label="item.cnName"
                                  :value="item.cnName">
                                </el-option>
                              </el-select>
                              <el-input v-model="price.price" style="width: 30%;">
                                <i slot="suffix"
                                  style="color: #000;margin-right:5%;font-style:normal;">{{price.currency}}</i>
                              </el-input>
                              <el-button type="primary"
                                style="width: 100px;height: 40px;margin-left: 10px;font-size: 14px;"
                                @click="updatePrice(index)" v-preventClick>修改</el-button>
                              <el-button type="primary"
                                style="width: 100px;height: 40px;margin-left: 10px;font-size: 14px;"
                                @click="deletePrice(index)" v-preventClick>删除</el-button>
                            </div>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div>
                        <h3>基本信息：</h3>
                        <el-form label-width="150px">
                          <el-form-item label="适用人群：">
                            <el-select v-model="crowd" placeholder="请选择" class="input-style">
                              <el-option label="男士" value="男士"></el-option>
                              <el-option label="女士" value="女士"></el-option>
                              <el-option label="中性" value="中性"></el-option>
                              <el-option label="情侣" value="情侣"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="风格：">
                            <el-select v-model="style" placeholder="请选择" class="input-style">
                              <el-option value="运动"></el-option>
                              <el-option value="商务"></el-option>
                              <el-option value="时尚"></el-option>
                              <el-option value="休闲"></el-option>
                              <el-option value="正装"></el-option>
                              <el-option value="珠宝"></el-option>
                              <el-option value="简约"></el-option>
                              <el-option value="古典"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="是否背透：">
                            <el-radio-group v-model="transparent">
                              <el-radio label="是"></el-radio>
                              <el-radio label="否"></el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="是否限量：">
                            <el-radio-group v-model="limited">
                              <el-radio label="是"></el-radio>
                              <el-radio label="否"></el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="限量版个数：">
                            <el-input v-model="limitedNum" class="input-style" placeholder="请输入"></el-input>
                          </el-form-item>
                          <el-form-item label="特别版：">
                            <el-input v-model="special" class="input-style" placeholder="请输入"></el-input>
                          </el-form-item>
                          <el-form-item label="是否防水：">
                            <el-radio-group v-model="waterproofEn">
                              <el-radio label="是"></el-radio>
                              <el-radio label="否"></el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="防水深度：">
                            <el-input v-model="waterproof" class="input-style">
                              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">米</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="昵称简称：">
                            <el-input v-model="watchNick" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="上市年份：">
                            <el-input v-model="startYear" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="停产年份：">
                            <el-input v-model="endYear" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="名人同款：">
                            <el-input v-model="famous" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="功能：">
                            <el-checkbox-group v-model="funcList">
                              <el-checkbox v-for="(funcName,index) in funcLi" :key="index" :label="funcName">
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label="手表描述：">
                            <el-input type="textarea" v-model="des" class="input-style"></el-input>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div>
                        <h3>表壳：</h3>
                        <el-form label-width="150px">
                          <el-form-item label="表壳直径：">
                            <el-input v-model="watchShellSize" class="input-style">
                              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="表壳宽度：">
                            <el-input v-model="watchShellWidth" class="input-style">
                              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="表壳高度：">
                            <el-input v-model="watchShellHeight" class="input-style">
                              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="表壳厚度：">
                            <el-input v-model="watchThickness" class="input-style">
                              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="表镜材质：">
                            <el-select v-model="glassMaterial" placeholder="请选择" class="input-style">
                              <el-option value="蓝宝石水晶"></el-option>
                              <el-option value="矿物玻璃"></el-option>
                              <el-option value="玻璃"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="表壳材质：">
                            <el-checkbox-group v-model="shellMaterialList">
                              <el-checkbox v-for="(shell,index) in shellList" :key="index" :label="shell"></el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label="表圈材质：">
                            <el-checkbox-group v-model="bezelMaterialList">
                              <el-checkbox v-for="(baze,index) in bazeList" :key="index" :label="baze"></el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label="表冠材质：">
                            <el-checkbox-group v-model="crownMaterialList">
                              <el-checkbox v-for="(crown,index) in bazeList" :key="index" :label="crown"></el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div>
                        <h3>表盘：</h3>
                        <el-form label-width="150px">
                          <el-form-item label="表盘形状：">
                            <el-select v-model="dialShape" placeholder="请选择" class="input-style">
                              <el-option value="圆形"></el-option>
                              <el-option value="方形"></el-option>
                              <el-option value="椭圆形"></el-option>
                              <el-option value="酒桶形"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="表盘刻度：">
                            <el-select v-model="dialMark" placeholder="请选择" class="input-style">
                              <el-option value="阿拉伯文"></el-option>
                              <el-option value="罗马文"></el-option>
                              <el-option value="条形"></el-option>
                              <el-option value="钻石"></el-option>
                              <el-option value="无刻度"></el-option>
                              <el-option value="其它"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="表盘直径：">
                            <el-input v-model="dialSize" class="input-style">
                              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="表盘昵称：">
                            <el-input v-model="dialNick" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="表盘工艺：">
                            <el-input v-model="dialCraft" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="表盘颜色：">
                            <el-checkbox-group v-model="dialClrList">
                              <el-checkbox v-for="(dial,index) in dialList" :key="index" :label="dial"></el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label="表盘材质：">
                            <el-checkbox-group v-model="dialMaterialList">
                              <el-checkbox v-for="(mater,index) in dialMateList" :key="index" :label="mater">
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div>
                        <h3>表带表扣：</h3>
                        <el-form label-width="150px">
                          <el-form-item label="表扣类型：">
                            <el-select v-model="claspType" placeholder="请选择" class="input-style">
                              <el-option value="针扣"></el-option>
                              <el-option value="折叠扣"></el-option>
                              <el-option value="蝴蝶扣"></el-option>
                              <el-option value="暗扣"></el-option>
                              <el-option value="其它"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="表带材质：">
                            <el-select v-model="bandMaterial" placeholder="请选择" class="input-style">
                              <el-option value="真皮"></el-option>
                              <el-option value="牛皮"></el-option>
                              <el-option value="鳄鱼皮"></el-option>
                              <el-option value="精钢"></el-option>
                              <el-option value="橡胶"></el-option>
                              <el-option value="白金"></el-option>
                              <el-option value="不锈钢"></el-option>
                              <el-option value="黄金"></el-option>
                              <el-option value="钛合金"></el-option>
                              <el-option value="玫瑰金"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="表带颜色：">
                            <el-checkbox-group v-model="bandClrList">
                              <el-checkbox v-for="(color,index) in dialList" :key="index" :label="color"></el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div>
                        <h3>机芯：</h3>
                        <el-form label-width="150px">
                          <el-form-item label="机芯类型：">
                            <el-select v-model="movementType" placeholder="请选择" class="input-style">
                              <el-option value="自动机械"></el-option>
                              <el-option value="手动机械"></el-option>
                              <el-option value="石英"></el-option>
                              <el-option value="光能"></el-option>
                              <el-option value="智能"></el-option>
                              <el-option value="电子"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="机芯型号：">
                            <el-input v-model="movementModel" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="机芯直径：">
                            <el-input v-model="movementSize" class="input-style">
                              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="机芯宝石数：">
                            <el-input v-model="jewelNum" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="动力存储：">
                            <el-input v-model="powerTime" class="input-style">
                              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">小时</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="机芯振频：">
                            <el-input v-model="frequency" class="input-style"></el-input>
                          </el-form-item>
                          <el-form-item label="机芯描述：">
                            <el-input v-model="movementDes" type="textarea" class="input-style"></el-input>
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogUpdateWatchVisible = false">取 消</el-button>
                      <el-button type="primary" @click="UpdateWatchSure" v-preventClick>确 定</el-button>
                    </div>
                  </el-dialog>
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
    <div v-if="watchQuerySel.select == 1" class="watch-details-container">
      <div class="back-img" @click="gobackWatchList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="watch-details-center">
        <div style="width: 60%;margin: 0 auto;">
          <div class="details-top-img">
            <el-carousel height="400px" style="ling-height: 400px;">
              <el-carousel-item v-for="(imgs,index) in imgList" :key="index">
                <img v-show="imgs !== '' && imgs !== null" v-image-preview :src="img + '/img/watch/' + imgs"
                  style="width: 300px;height: 350px;" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div>
            <p>品牌型号：{{watchSelectDetails.brand +' - '+ watchSelectDetails.model}}</p>
          </div>
          <div>
            <h4>价格：</h4>
            <div style="width: 90%;margin: 0 auto;">
              <p>手表等级：{{watchSelectDetails.watchLevel}}</p>
              <div style="display: flex;">
                <p>
                  批发价：{{watchSelectDetails.marketPrice == 0 || watchSelectDetails.marketPrice == null ? '暂无' : formatNumberRgx(watchSelectDetails.marketPrice) + ' HKD'}}
                </p>
                <p style="margin-left: 15px;color: #0aa1ed;cursor: pointer;"
                  v-show="watchSelectDetails.marketPrice !== 0 && watchSelectDetails.marketPrice !== null || watchAuthority[11] == 1"
                  @click="priceDetailsJump">批发价详情</p>
              </div>
              <div style="display: flex;">
                <p>
                  市场价：{{watchSelectDetails.bazaarPrices.length == 0 ? '暂无' : formatNumberRgx(watchSelectDetails.bazaarPrices[0].price) + ' HKD'}}
                </p>
                <p style="margin-left: 15px;color: #0aa1ed;cursor: pointer;"
                  v-show="watchSelectDetails.bazaarPrices.length !== 0 || watchAuthority[26] == 1"
                  @click="bazaarPricesDetailsJump(watchSelectDetails)">市场价详情</p>
              </div>
              <div style="display: flex;">
                <p>
                  销售价：{{watchSelectDetails.sellPrices.length == 0 ? '暂无' : formatNumberRgx(watchSelectDetails.sellPrices[0].price) + ' HKD'}}
                </p>
                <p style="margin-left: 15px;color: #0aa1ed;cursor: pointer;"
                  v-show="watchSelectDetails.sellPrices.length !== 0"
                  @click="sellPricesDetailsJump(watchSelectDetails.sellPrices)">销售价详情</p>
              </div>
              <p>公价：</p>
              <div style="width: 90%;margin: 0 auto;"
                v-for="(area,index) in watchSelectDetails.publicPriceArea.split('|')" :key="index">
                <div v-for="(price,index2) in watchSelectDetails.publicPrice.split('|')" :key="index2">
                  <p v-show="index === index2 && area !==''">
                    <span>{{area}}：<span
                        style="margin-left: 5px;">{{formatNumberRgx(price.split(' ')[0]) +' '+price.split(' ')[1]}}</span></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4>参数：</h4>
            <div style="width: 90%;margin: 0 auto;">
              <h4>基本信息：</h4>
              <div style="width: 90%;margin: 0 auto;">
                <p v-show="watchSelectDetails.series !== ''">系列：{{watchSelectDetails.series}}</p>
                <p v-show="watchSelectDetails.crowd !== ''">适用人群：{{watchSelectDetails.crowd}}</p>
                <p v-show="watchSelectDetails.style !== ''">风格：{{watchSelectDetails.style}}</p>
                <p v-show="watchSelectDetails.transparent !== ''">是否背透：{{watchSelectDetails.transparent}}</p>
                <p v-show="watchSelectDetails.limited !== ''">是否限量：{{watchSelectDetails.limited}}</p>
                <p v-show="watchSelectDetails.limitedNum !== ''">限量版个数：{{watchSelectDetails.limitedNum}}</p>
                <p v-show="watchSelectDetails.special !== ''">特别版：{{watchSelectDetails.special}}</p>
                <p v-show="watchSelectDetails.waterproofEn !== ''">是否防水：{{watchSelectDetails.waterproofEn}}</p>
                <p v-show="watchSelectDetails.waterproof !== ''">防水深度：{{watchSelectDetails.waterproof}}</p>
                <p v-show="watchSelectDetails.watchNick !== ''">昵称简称：{{watchSelectDetails.watchNick}}</p>
                <p v-show="watchSelectDetails.startYear !== ''">上市年份：{{watchSelectDetails.startYear}}</p>
                <p v-show="watchSelectDetails.endYear !== ''">停产年份：{{watchSelectDetails.endYear}}</p>
                <p v-show="watchSelectDetails.famous !== ''">名人同款：{{watchSelectDetails.famous}}</p>
                <p v-show="watchSelectDetails.func !== ''">功能：{{watchSelectDetails.func}}</p>
                <p v-show="watchSelectDetails.des !== ''" style="display: flex;">
                  <span style="width: 110px;">手表描述：</span>
                  <el-input v-model="watchSelectDetails.des" type="textarea"></el-input>
                </p>
              </div>
              <h4>表壳：</h4>
              <div style="width: 90%;margin: 0 auto;">
                <p v-show="watchSelectDetails.watchShellSize !== ''">表壳直径：{{watchSelectDetails.watchShellSize}}</p>
                <p v-show="watchSelectDetails.watchShellWidth !== ''">表壳宽度：{{watchSelectDetails.watchShellWidth}}</p>
                <p v-show="watchSelectDetails.watchShellHeight !== ''">表壳高度：{{watchSelectDetails.watchShellHeight}}
                </p>
                <p v-show="watchSelectDetails.watchThickness !== ''">表壳厚度：{{watchSelectDetails.watchThickness}}</p>
                <p v-show="watchSelectDetails.glassMaterial !== ''">表镜材质：{{watchSelectDetails.glassMaterial}}</p>
                <p v-show="watchSelectDetails.shellMaterial !== ''">表壳材质：{{watchSelectDetails.shellMaterial}}</p>
                <p v-show="watchSelectDetails.bezelMaterial !== ''">表圈材质：{{watchSelectDetails.bezelMaterial}}</p>
                <p v-show="watchSelectDetails.crownMaterial !== ''">表冠材质：{{watchSelectDetails.crownMaterial}}</p>
              </div>
              <h4>表盘：</h4>
              <div style="width: 90%;margin: 0 auto;">
                <p v-show="watchSelectDetails.dialShape !== ''">表盘形状：{{watchSelectDetails.dialShape}}</p>
                <p v-show="watchSelectDetails.dialMark !== ''">表盘刻度：{{watchSelectDetails.dialMark}}</p>
                <p v-show="watchSelectDetails.dialSize !== ''">表盘直径：{{watchSelectDetails.dialSize}}</p>
                <p v-show="watchSelectDetails.dialNick !== ''">表盘昵称：{{watchSelectDetails.dialNick}}</p>
                <p v-show="watchSelectDetails.dialCraft !== ''">表盘工艺：{{watchSelectDetails.dialCraft}}</p>
                <p v-show="watchSelectDetails.dialClr !== ''">表盘颜色：{{watchSelectDetails.dialClr}}</p>
                <p v-show="watchSelectDetails.dialMaterial !== ''">表盘材质：{{watchSelectDetails.dialMaterial}}</p>
              </div>
              <h4>表带表扣：</h4>
              <div style="width: 90%;margin: 0 auto;">
                <p v-show="watchSelectDetails.claspType !== ''">表扣类型：{{watchSelectDetails.claspType}}</p>
                <p v-show="watchSelectDetails.bandMaterial !== ''">表带材质：{{watchSelectDetails.bandMaterial}}</p>
                <p v-show="watchSelectDetails.bandClr !== ''">表带颜色：{{watchSelectDetails.bandClr}}</p>
              </div>
              <h4>机芯：</h4>
              <div style="width: 90%;margin: 0 auto;">
                <p v-show="watchSelectDetails.movementType !== ''">机芯类型：{{watchSelectDetails.movementType}}</p>
                <p v-show="watchSelectDetails.movementModel !== ''">机芯型号：{{watchSelectDetails.movementModel}}</p>
                <p v-show="watchSelectDetails.movementSize !== ''">机芯直径：{{watchSelectDetails.movementSize}}</p>
                <p v-show="watchSelectDetails.jewelNum !== ''">机芯宝石数：{{watchSelectDetails.jewelNum}}</p>
                <p v-show="watchSelectDetails.powerTime !== ''">动力存储：{{watchSelectDetails.powerTime}}小时</p>
                <p v-show="watchSelectDetails.frequency !== ''">机芯振频：{{watchSelectDetails.frequency}}</p>
                <p v-show="watchSelectDetails.movementDes !== ''" style="display: flex;">
                  <span style="width: 110px;">机芯描述：</span>
                  <el-input v-model="watchSelectDetails.movementDes" type="textarea"></el-input>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div>
      <Price-admin-details v-if="watchQuerySel.select == 2" :priceDetailsList="priceDetailsList"
        @gobackPriceAdmin="gobackPriceAdmin">
      </Price-admin-details>
    </div>
    <div>
      <Bazar-prices-details v-if="watchQuerySel.select == 3" :priceDetailsList="priceDetailsList"
        @gobackPriceAdmin="gobackPriceAdmin"></Bazar-prices-details>
    </div>
    <div>
      <Sell-prices-details v-if="watchQuerySel.select == 4" :priceDetailsList="priceDetailsList"
        @gobackPriceAdmin="gobackPriceAdmin">
      </Sell-prices-details>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hintMsg: '数据加载中...',
        dialogAddWatchVisible: false,
        dialogUpdateWatchVisible: false,
        watchBrandList: [],
        seriesList: [{}],
        seriesList2: [],
        img: this.$store.state.baseUrl,
        keyword: '',
        watchList: [],
        page: 1,
        pageNum: 10,
        total: 0,
        brand: '',
        series: '',
        detailsId: 0,
        countryList: [],
        imgurls: [],
        addBrand: '',
        restaurants: [],
        addSeries: '',
        addModel: '',
        publicPriceArea: '', // 公价地区
        publicPrice: '', // 公价价格
        publicPriceCurrency: '', // 币种
        priceSure: '',
        areaSure: '',
        publicPriceList: [],
        crowd: '', // 适用人群
        style: '', // 风格
        transparent: '是', // 是否背透
        limited: '否', // 是否限量
        limitedNum: '', // 限量版个数
        special: '', // 特别版
        waterproofEn: '是', // 是否防水
        waterproof: '', // 防水深度
        watchNick: '', // 昵称简称
        startYear: '', // 上市年份
        endYear: '', // 停产年份
        famous: '', // 名人同款
        func: '', // 功能
        funcList: [],
        funcLi: ['日期', '星期', '日夜显示', '动储', '翻转', '月相', '万年历', '计时', '追针', '陀飞轮', '5分问', '两问', '三问', '自鸣', '闹铃', '飞返',
          '其它特殊'
        ],
        des: '', // 手表描述

        watchShellSize: '', // 表壳直径
        watchShellWidth: '', // 表壳宽度
        watchShellHeight: '', // 表壳高度
        watchThickness: '', // 表壳厚度
        glassMaterial: '', // 表镜材质
        shellMaterial: '', // 表壳材质
        shellMaterialList: [],
        shellList: ['铜', '钢', '不锈钢', 'PVD镀金', '18K金', '白金', '黄金', '陶瓷', '玫瑰金', '钛', '铂金', '红金', '世纪蓝宝石', '镶钻', '混合',
          '其它'
        ],
        bezelMaterial: '', // 表圈材质
        bezelMaterialList: [],
        bazeList: ['铂金', '玫瑰金', '白金', '黄金', '铜', '钢', '陶瓷', 'TPT', '钻石', '绿宝石', '红宝石', '蓝宝石', '宝石', '其它'],
        crownMaterial: '', // 表冠材质
        crownMaterialList: [],
        // crownList: ['铂金', '玫瑰金', '白金', '黄金', '铜', '钢', '陶瓷', 'TPT', '钻石', '绿宝石', '红宝石', '蓝宝石', '宝石', '其它'],

        dialShape: '', // 表盘形状
        dialMark: '', // 表盘刻度
        dialSize: '', // 表盘直径
        dialNick: '', // 表盘昵称
        dialCraft: '', // 表盘工艺
        dialClr: '', // 表盘颜色
        dialClrList: [],
        dialList: ['黑色', '银色', '金色', '蓝色', '绿色', '间金', '白色', '黄色', '棕色', '红色', '紫色', '灰色', '深蓝色', '橙色', '粉红色', '玫红',
          '其它'
        ],
        dialMaterial: '', // 表盘材质
        dialMaterialList: [],
        dialMateList: ['珐琅', '陶瓷', '蛋白石', '木', '不锈钢', '树脂', '炭纤维', '珍珠贝', '其它'],

        claspType: '', // 表扣类型
        bandMaterial: '', // 表带材质
        bandClr: '', // 表带颜色
        bandClrList: [],

        movementType: '', // 机芯类型
        movementModel: '', // 机芯型号
        movementSize: '', // 机芯直径
        jewelNum: '', // 机芯宝石数
        powerTime: '', // 动力存储
        frequency: '', // 机芯振频
        movementDes: '', // 机芯描述

        imgList: [],
        watchSelectDetails: {},
        priceDetailsList: [],
        updateWatchId: 0,
        watchAuthority: [],

      }
    },
    props: ["watchQuerySel"],
    created() {
      this.watchAuthority = sessionStorage.getItem('authority').split('|');
    },
    mounted() {
      this.stockInSearch();
      this.handleCountryGet();
      this.handleDataWatchBrandList();
      this.$dragging.$on('dragged', (val) => {
        //这里我们不需要做任何操作；组件内部会把我们绑定上去的list自动排序;只需要查看结果就可以
        //如果需要在这里进行其他操作，可以查看val的内容，包括：拖动的元素，拖动后与之兑换的元素，以及原始数据和拖动组名
      })
      this.$dragging.$on('dragend', (val) => {
        //此处是拖动完成后鼠标松开时触发的事件
        console.log(this.imgurls)
      })
    },
    methods: {
      // 模糊搜索手表
      stockInSearch() {
        console.log(this.keyword);
        this.watchList = [];
        this.hintMsg = "数据加载中...";
        this.$axios
          .post(this.$store.state.baseUrl + "/WatchSearchEx?java", {
            brand: this.brand,
            series: this.series,
            keyword: this.keyword,
            page: this.page,
            pageNum: this.pageNum
          }).then((res) => {
            console.log('模糊搜索手表');
            console.log(res);
            this.watchList = res.data.list;
            this.total = res.data.total;
            if (this.watchList.length == 0) {
              this.hintMsg = "啊哦~ 暂无数据";
            };
          }).catch((err) => {
            console.log(err);
          })
      },
      // 品牌系列联动搜索
      selectGoodsByGroupId(val) {
        console.log(val);
        this.series = '';
        let arr = ['数据1', '数据2', '数据3'];
        console.log(arr);
        for (let index in this.watchBrandList) {
          if (this.watchBrandList[index].name == val) {
            console.log(this.watchBrandList[index]);
            this.seriesList = this.watchBrandList[index].series;
            console.log(this.seriesList);
          }
        };
        this.page = 1;
        this.stockInSearch();
      },
      seriesChange() {
        this.page = 1;
        this.stockInSearch();
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.stockInSearch();
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 品牌名称
      querySearch(queryString, cb) {
        console.log(this.watchBrandList);
        let restaurants = this.watchBrandList;
        for (let items of restaurants) {
          items.value = items.name;
        }
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        console.log(results);
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
        this.addBrand = item.value;
        this.seriesList2 = [];
        this.addSeries = '';
        for (let conta of item.series) {
          this.seriesList2.push({
            text: conta
          });
        }
      },
      // 系列
      querySearch2(queryString, cb) {
        let restaurants = this.seriesList2;
        for (let items of restaurants) {
          items.value = items.text;
        }
        let results = queryString ? restaurants.filter(this.createFilter2(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter2(queryString) {
        return (restaurant) => {
          return (restaurant.text.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect2(item) {
        console.log(item);
        this.addSeries = item.value;
      },
      // 增加手表
      addWatch() {
        this.imgurls = [];
        this.addBrand = '';
        this.addSeries = '';
        this.addModel = '';
        this.publicPriceArea = ''; // 公价地区
        this.publicPrice = ''; // 公价价格
        this.publicPriceCurrency = '';
        this.publicPriceList = [];
        this.crowd = ''; // 适用人群
        this.style = ''; // 风格
        this.transparent = '是'; // 是否背透
        this.limited = '否'; // 是否限量
        this.limitedNum = ''; // 限量版个数
        this.special = ''; // 特别版
        this.waterproofEn = '是'; // 是否防水
        this.waterproof = ''; // 防水深度
        this.watchNick = ''; // 昵称简称
        this.startYear = ''; // 上市年份
        this.endYear = ''; // 停产年份
        this.famous = ''; // 名人同款
        this.func = ''; // 功能
        this.funcList = [];
        this.des = ''; // 手表描述
        this.watchShellSize = ''; // 表壳直径
        this.watchShellWidth = ''; // 表壳宽度
        this.watchShellHeight = ''; // 表壳高度
        this.watchThickness = ''; // 表壳厚度
        this.glassMaterial = ''; // 表镜材质
        this.shellMaterial = ''; // 表壳材质
        this.shellMaterialList = [];
        this.bezelMaterial = ''; // 表圈材质
        this.bezelMaterialList = [];
        this.crownMaterial = ''; // 表冠材质
        this.crownMaterialList = [];
        this.dialShape = ''; // 表盘形状
        this.dialMark = ''; // 表盘刻度
        this.dialSize = ''; // 表盘直径
        this.dialNick = ''; // 表盘昵称
        this.dialCraft = ''; // 表盘工艺
        this.dialClr = ''; // 表盘颜色
        this.dialClrList = [];
        this.dialMaterial = ''; // 表盘材质
        this.dialMaterialList = [];
        this.claspType = ''; // 表扣类型
        this.bandMaterial = ''; // 表带材质
        this.bandClr = ''; // 表带颜色
        this.bandClrList = [];
        this.movementType = ''; // 机芯类型
        this.movementModel = ''; // 机芯型号
        this.movementSize = ''; // 机芯直径
        this.jewelNum = ''; // 机芯宝石数
        this.powerTime = ''; // 动力存储
        this.frequency = ''; // 机芯振频
        this.movementDes = ''; // 机芯描述
        this.dialogAddWatchVisible = true;
      },
      // 公价
      // 国家选择
      priceChange() {
        console.log(this.publicPriceArea);
        for (let item of this.countryList) {
          // console.log(item);
          if (this.publicPriceArea == item.cnName) {
            this.publicPriceCurrency = item.enCurrency;
          }
        }
      },
      // 增加公价
      addPrice() {
        if (this.publicPriceArea !== '' && this.publicPrice !== '') {
          this.publicPriceList.push({
            country: this.publicPriceArea,
            price: this.publicPrice,
            currency: this.publicPriceCurrency
          });
        } else {
          this.$message.error({
            message: '国家或价格不能为空',
            showClose: true,
            duration: 2000
          })
        };
        console.log(this.publicPriceList);
        this.publicPrice = '';
        this.publicPriceArea = '';
        this.publicPriceCurrency = '';
      },
      // 修改公价
      priceChange2(index) {
        console.log(this.publicPriceList[index].country);
        for (let item of this.countryList) {
          // console.log(item);
          if (this.publicPriceList[index].country == item.cnName) {
            this.publicPriceList[index].currency = item.enCurrency;
          }
        };
        console.log(this.publicPriceList);
      },
      updatePrice(index) {
        console.log(index);
        console.log(this.publicPriceList[index].country,
          this.publicPriceList[index].price,
          this.publicPriceList[index].currency);
        this.publicPriceList.splice(index, 1, {
          country: this.publicPriceList[index].country,
          price: this.publicPriceList[index].price,
          currency: this.publicPriceList[index].currency
        });
        this.$message.success({
          message: '修改该公价成功',
          showClose: true,
          duration: 2000
        });
        console.log(this.publicPriceList);
      },
      // 删除公价
      deletePrice(index) {
        console.log(index);
        this.publicPriceList.splice(index, 1);
        this.$message.success({
          message: '删除该公价成功',
          showClose: true,
          duration: 2000
        });
        console.log(this.publicPriceList);
      },
      // 数据验证
      verify() {
        console.log(this.addBrand + '---' + this.addSeries);
        console.log(this.publicPriceList);
        this.priceSure = '';
        this.areaSure = '';
        for (let item of this.publicPriceList) {
          console.log(item);
          this.priceSure += item.price + ' ' + item.currency + '|';
          this.areaSure += item.country + '|';
        }
        console.log(this.priceSure, this.areaSure);
        if (this.imgurls.length == 0) {
          this.$message.error({
            message: '请上传手表图片',
            showClose: true,
            duration: 2000
          });
          return 1;
        }
        if (this.addBrand == '' || this.addModel == '') {
          this.$message.error({
            message: '品牌名称或手表型号不能为空',
            showClose: true,
            duration: 2000
          });
          return 1;
        }
      },
      // 确定增加手表
      addWatchSure() {
        if (this.verify() !== 1) {
          console.log('增加手表');
          const loading = this.$loading({
            lock: true,
            text: '数据提交中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$axios.post(this.$store.state.baseUrl + '/WatchSave?java', {
            brand: this.addBrand,
            series: this.addSeries,
            model: this.addModel,
            pics: this.imgurls.join('|'),
            crowd: this.crowd,
            style: this.style,
            transparent: this.transparent,
            limited: this.limited,
            limitedNum: this.limitedNum,
            special: this.special,
            waterproofEn: this.waterproofEn,
            waterproof: this.waterproof,
            watchNick: this.watchNick,
            startYear: this.startYear,
            endYear: this.endYear,
            famous: this.famous,
            func: this.funcList.join('|'),
            des: this.des,
            watchShellSize: this.watchShellSize,
            watchShellWidth: this.watchShellWidth,
            watchShellHeight: this.watchShellHeight,
            watchThickness: this.watchThickness,
            glassMaterial: this.glassMaterial,
            shellMaterial: this.shellMaterialList.join('|'),
            bezelMaterial: this.bezelMaterialList.join('|'),
            crownMaterial: this.crownMaterialList.join('|'),
            dialShape: this.dialShape,
            dialMark: this.dialMark,
            dialSize: this.dialSize,
            dialNick: this.dialNick,
            dialCraft: this.dialCraft,
            dialClr: this.dialClrList.join('|'),
            dialMaterial: this.dialMaterialList.join('|'),
            claspType: this.claspType,
            bandMaterial: this.bandMaterial,
            bandClr: this.bandClrList.join('|'),
            movementType: this.movementType,
            movementModel: this.movementModel,
            movementSize: this.movementSize,
            jewelNum: this.jewelNum,
            powerTime: this.powerTime,
            frequency: this.frequency,
            movementDes: this.movementDes,
            publicPrice: this.priceSure,
            publicPriceArea: this.areaSure
          }).then((res) => {
            console.log('手表增加');
            console.log(res);
            loading.close();
            this.$message.success({
              message: '手表信息上传成功',
              showClose: true,
              duration: 2000
            });
            this.dialogAddWatchVisible = false;
            this.page = 1;
            this.stockInSearch();
          }).catch((err) => {
            console.log(err);
            loading.close();
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
            this.dialogAddWatchVisible = false;
          })

        }
      },
      // 查看手表详情
      watchDetails(id) {
        this.detailsId = id;
        this.$axios.post(this.$store.state.baseUrl + '/WatchInfo?java', {
          id: this.detailsId
        }).then((res) => {
          console.log('手表详细信息');
          console.log(res.data);
          this.imgList = [];
          if (res.data.pics !== null && res.data.pics !== '') {
            console.log(res.data.pics.indexOf('|'));
            if (res.data.pics.indexOf('|') !== -1) {
              this.imgList = res.data.pics.split('|');
            } else {
              this.imgList.push(res.data.pics);
            }
          } else {
            this.imgList = [];
          };
          for (let i in this.imgList) {
            if (this.imgList[i] == '') {
              this.imgList.splice(i, 1);
            }
          }
          console.log(this.imgList);
          this.watchSelectDetails = {};
          this.watchSelectDetails = res.data;
          this.watchQuerySel.select = 1;
          // 页面回到顶部
          (function smoothscroll() {
            var currentScroll =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - currentScroll / 5);
            }
          })();
        }).catch((err) => {
          console.log(err);
        })
      },
      // 批发价详情
      priceDetailsJump() {
        console.log(this.watchSelectDetails);
        this.$axios.post(this.$store.state.baseUrl + '/DataMaketPrice', {
          watchId: this.watchSelectDetails.id
        }).then((res) => {
          console.log('批发价详情');
          console.log(res);
          this.priceDetailsList = res.data;
          this.watchQuerySel.select = 2;
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
      },
      gobackPriceAdmin(val) {
        this.watchQuerySel.select = 1;
        this.$axios.post(this.$store.state.baseUrl + '/WatchInfo?java', {
          id: this.detailsId
        }).then((res) => {
          console.log('手表详细信息');
          console.log(res.data);
          this.imgList = [];
          if (res.data.pics !== null && res.data.pics !== '') {
            console.log(res.data.pics.indexOf('|'));
            if (res.data.pics.indexOf('|') !== -1) {
              this.imgList = res.data.pics.split('|');
            } else {
              this.imgList.push(res.data.pics);
            }
          } else {
            this.imgList = [];
          };
          for (let i in this.imgList) {
            if (this.imgList[i] == '') {
              this.imgList.splice(i, 1);
            }
          }
          console.log(this.imgList);
          this.watchSelectDetails = {};
          this.watchSelectDetails = res.data;
          // 页面回到顶部
          (function smoothscroll() {
            var currentScroll =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - currentScroll / 5);
            }
          })();
        }).catch((err) => {
          console.log(err);
        })
      },
      // 市场价详情
      bazaarPricesDetailsJump(bazaarPricesList) {
        console.log(bazaarPricesList);
        this.priceDetailsList = bazaarPricesList;
        this.watchQuerySel.select = 3;
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 销售价详情
      sellPricesDetailsJump(sellPricesList) {
        console.log(sellPricesList);
        this.priceDetailsList = sellPricesList;
        this.watchQuerySel.select = 4;
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 返回列表页
      gobackWatchList() {
        this.watchQuerySel.select = 0;
      },

      // 修改手表信息
      watchUpdate(item) {
        console.log(item);
        this.updateWatchId = item.id;
        this.imgurls = [];
        if (item.pics !== null && item.pics !== '') {
          if (item.pics.indexOf('|') !== -1) {
            this.imgurls = item.pics.split('|');
          } else {
            this.imgurls.push(item.pics);
          }
        } else {
          this.imgurls = [];
        };
        console.log(this.imgurls);
        this.addBrand = item.brand;
        this.addSeries = item.series;
        this.addModel = item.model;
        this.publicPriceArea = '';
        this.publicPrice = '';
        this.publicPriceCurrency = '';
        console.log(item.publicPriceArea);
        this.publicPriceList = [];
        if (item.publicPriceArea !== '') {
          let list = [];
          list = item.publicPriceArea.split('|');
          let list2 = [];
          list2 = item.publicPrice.split('|');
          for (let item = 0; item < list.length; item++) {
            for (let items = 0; items < list2.length; items++) {
              // console.log(item, items);
              if (item === items && list[item] !== '') {
                let aa = list2[items].split(' ');
                this.publicPriceList.push({
                  country: list[item],
                  price: aa[0],
                  currency: aa[1]
                });
              }
            }
          }
          console.log(this.publicPriceList);
        } else {
          this.publicPriceList = [];
        }
        this.crowd = item.crowd;
        this.style = item.style;
        this.transparent = item.transparent;
        this.limited = item.limited;
        this.limitedNum = item.limitedNum;
        this.special = item.special;
        this.waterproofEn = item.waterproofEn;
        this.waterproof = item.waterproof;
        this.watchNick = item.watchNick;
        this.startYear = item.startYear;
        this.endYear = item.endYear;
        this.famous = item.famous;
        if (item.func !== '') {
          if (item.func.indexOf('|') !== -1) {
            this.funcList = item.func.split('|');
          } else {
            this.funcList.push(item.func);
          }
        } else {
          this.funcList = [];
        };
        this.des = item.des;
        this.watchShellSize = item.watchShellSize;
        this.watchShellWidth = item.watchShellWidth;
        this.watchShellHeight = item.watchShellHeight;
        this.watchThickness = item.watchThickness;
        this.glassMaterial = item.glassMaterial;
        if (item.shellMaterial !== '') {
          if (item.shellMaterial.indexOf('|') !== -1) {
            this.shellMaterialList = item.shellMaterial.split('|');
          } else {
            this.shellMaterialList.push(item.shellMaterial);
          }
        } else {
          this.shellMaterialList = [];
        };
        if (item.bezelMaterial !== '') {
          if (item.bezelMaterial.indexOf('|') !== -1) {
            this.bezelMaterialList = item.bezelMaterial.split('|');
          } else {
            this.bezelMaterialList.push(item.bezelMaterial);
          }
        } else {
          this.bezelMaterialList = [];
        };
        if (item.crownMaterial !== '') {
          if (item.crownMaterial.indexOf('|') !== -1) {
            this.crownMaterialList = item.crownMaterial.split('|');
          } else {
            this.crownMaterialList.push(item.crownMaterial);
          }
        } else {
          this.crownMaterialList = [];
        };
        this.dialShape = item.dialShape;
        this.dialMark = item.dialMark;
        this.dialSize = item.dialSize;
        this.dialNick = item.dialNick;
        this.dialCraft = item.dialCraft;
        if (item.dialClr !== '') {
          if (item.dialClr.indexOf('|') !== -1) {
            this.dialClrList = item.dialClr.split('|');
          } else {
            this.dialClrList.push(item.dialClr);
          }
        } else {
          this.dialClrList = [];
        };
        if (item.dialMaterial !== '') {
          if (item.dialMaterial.indexOf('|') !== -1) {
            this.dialMaterialList = item.dialMaterial.split('|');
          } else {
            this.dialMaterialList.push(item.dialMaterial);
          }
        } else {
          this.dialMaterialList = [];
        };
        this.claspType = item.claspType;
        this.bandMaterial = item.bandMaterial;
        if (item.bandClr !== '') {
          if (item.bandClr.indexOf('|') !== -1) {
            this.bandClrList = item.bandClr.split('|');
          } else {
            this.bandClrList.push(item.bandClr);
          }
        } else {
          this.bandClrList = [];
        };
        this.movementType = item.movementType;
        this.movementModel = item.movementModel;
        this.movementSize = item.movementSize;
        this.jewelNum = item.jewelNum;
        this.powerTime = item.powerTime;
        this.frequency = item.frequency;
        this.movementDes = item.movementDes;
        this.dialogUpdateWatchVisible = true;
      },
      // 确定修改
      UpdateWatchSure() {
        let _this = this;
        if (this.verify() !== 1) {
          console.log('修改手表');
          this.$axios.post(this.$store.state.baseUrl + '/WatchSave?java', {
            id: this.updateWatchId,
            brand: this.addBrand,
            series: this.addSeries,
            model: this.addModel,
            pics: this.imgurls.join('|'),
            crowd: this.crowd,
            style: this.style,
            transparent: this.transparent,
            limited: this.limited,
            limitedNum: this.limitedNum,
            special: this.special,
            waterproofEn: this.waterproofEn,
            waterproof: this.waterproof,
            watchNick: this.watchNick,
            startYear: this.startYear,
            endYear: this.endYear,
            famous: this.famous,
            func: this.funcList.join('|'),
            des: this.des,
            watchShellSize: this.watchShellSize,
            watchShellWidth: this.watchShellWidth,
            watchShellHeight: this.watchShellHeight,
            watchThickness: this.watchThickness,
            glassMaterial: this.glassMaterial,
            shellMaterial: this.shellMaterialList.join('|'),
            bezelMaterial: this.bezelMaterialList.join('|'),
            crownMaterial: this.crownMaterialList.join('|'),
            dialShape: this.dialShape,
            dialMark: this.dialMark,
            dialSize: this.dialSize,
            dialNick: this.dialNick,
            dialCraft: this.dialCraft,
            dialClr: this.dialClrList.join('|'),
            dialMaterial: this.dialMaterialList.join('|'),
            claspType: this.claspType,
            bandMaterial: this.bandMaterial,
            bandClr: this.bandClrList.join('|'),
            movementType: this.movementType,
            movementModel: this.movementModel,
            movementSize: this.movementSize,
            jewelNum: this.jewelNum,
            powerTime: this.powerTime,
            frequency: this.frequency,
            movementDes: this.movementDes,
            publicPrice: this.priceSure,
            publicPriceArea: this.areaSure
          }).then((res) => {
            console.log('手表修改');
            console.log(res);
            _this.$message.success({
              message: '手表信息修改成功',
              showClose: true,
              duration: 2000
            });
            this.dialogUpdateWatchVisible = false;
            this.stockInSearch();
          }).catch((err) => {
            console.log(err);
            this.$message.success({
              message: err.message,
              showClose: true,
              duration: 2000
            });
            this.dialogUpdateWatchVisible = false;
          })
        }
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
          .post(this.$store.state.baseUrl + "/imgUpload?java", formdata)
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
              message: err.message,
              showClose: true,
              duration: 2000
            });
          });
      },
      // 删除图片
      delImage(index) {
        this.imgurls.splice(index, 1);
      },
      // 获取所有国家
      handleCountryGet() {
        this.$axios.post(this.$store.state.baseUrl + '/CountryGet').then((res) => {
          console.log('国家列表');
          console.log(res);
          this.countryList = res.data;
        })
      },
      // 获取所有品牌和系列
      handleDataWatchBrandList() {
        this.$axios.post(this.$store.state.baseUrl + '/DataWatchBrandList').then((res) => {
          console.log('品牌及系列');
          console.log(res);
          this.watchBrandList = res.data;
        }).catch((err) => {
          console.log(err);
        })
      },

    },
  }
</script>
<style lang="scss" scoped>
  .watch-query-container {
    width: 100%;

    .watch-query-center {
      width: 90%;
      margin: 0 auto;
      padding: 20px 40px;
      background-color: #fff;
      border-radius: 30px;

      .watch-select {
        display: flex;
        justify-content: space-between;

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

      }

      .watch-table {


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

        .img-style {
          width: 100px;
          height: 100px;
          border-radius: 30px;
          object-fit: cover;
        }
      }

      .watch-table tr:hover>td {
        background-color: #d7ebe7 !important;
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
  }

  .watch-details-container {
    width: 95%;
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

    .watch-details-center {
      padding: 20px;
      background-color: #fff;
      border-radius: 30px;

      .details-top-img {
        width: 100%;
        margin: 0 auto;
      }
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
<style lang="scss">
  .el-button {
    height: 48px;
    border-radius: 6px;
    font-size: 16px;
  }

  .el-button--primary {
    color: #fff;
    background-color: #0c7063 !important;
    border-color: #0c7063 !important;
  }

  .el-dialog--center .el-dialog__footer {
    text-align: right;
  }

  .el-button+.el-button {
    margin-left: 10%;
  }

  .el-carousel__item {
    text-align: center;
    line-height: 300px;
  }

  .el-carousel__button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ccc;
  }

  .el-carousel__indicator.is-active button {
    background-color: #0c8563;
  }

  .el-carousel__item.is-active {
    z-index: 0;
  }

  .el-radio-group {
    line-height: 50px;
  }

  .el-checkbox__label {
    font-size: 14px;
  }
</style>