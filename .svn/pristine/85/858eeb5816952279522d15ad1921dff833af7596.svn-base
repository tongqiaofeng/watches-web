<template>
  <div class="reimbursement-admin-container" id="reimbursement-admin">
    <!-- 报销管理页面 -->
    <div>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="待处理" name="one">
          <div style="text-align: center;" ref="reimburse" v-if="pendingList.length == 0">
            <p>{{inner}}</p>
          </div>
          <div v-if="reimbursementAdminSel.select == 0">
            <div v-if="pendingList.length !== 0">
              <table>
                <tr>
                  <th>用户昵称</th>
                  <th>报销单号</th>
                  <th>提交时间</th>
                  <th>预估报销金额</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(item,index) in pendingList" :key="index">
                  <td>{{item.nick}}</td>
                  <td>{{item.bxNumber}}</td>
                  <td>{{item.subTime}}</td>
                  <td>{{formatNumberRgx(item.sysCheckMoney) + ' ' + item.settle_currency}}</td>
                  <td>
                    <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                      <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                        @click="reimburseDetails(item.bxNumber)" />
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
          <div v-if="reimbursementAdminSel.select == 1">
            <div class="back-img" @click="gobackList">
              <div>
                <img src="../../assets/imgs/goback.png" />
              </div>
              <span class="font">返回</span>
            </div>
            <div style="width: 95%;margin: 0 auto;">
              <p>
                <span>报销单号：<span>{{reimburseDetailsMsg.bxNumber}}</span></span>
              </p>
              <p>
                <span>提交时间：<span>{{reimburseDetailsMsg.subTime}}</span></span>
              </p>
              <p>
                <span>预估报销金额：<span>{{formatNumberRgx(reimburseDetailsMsg.sysCheckMoney) + ' ' + reimburseDetailsMsg.settle_currency}}</span></span>
              </p>
              <p>
                <span>核算报销金额：<span>{{reimburseDetailsMsg.checkMoney == null ? '' : formatNumberRgx(reimburseDetailsMsg.checkMoney) + ' ' + reimburseDetailsMsg.settle_currency}}</span></span>
              </p>
            </div>
            <div style="width: 95%;margin: 0 auto;margin-top: 30px;">
              <p>消费记录：</p>
              <table v-for="(reim,index) in reimburseDetailsMsg.data" :key="index">
                <tr>
                  <th></th>
                  <th>
                    <span>{{reim.type == 0 ? '行程名称' : '类型'}}</span>
                  </th>
                  <th>核算报销金额</th>
                  <th>
                    <span>{{reim.type == 0 ? '起止时间' : '时间'}}</span>
                  </th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>
                    <img :src="reim.type == 0 ? img2 : img1" style="width: 25px;height: 25px;" />
                  </td>
                  <td>{{reim.type == 0 ? reim.obj.name : reim.obj.type}}</td>
                  <td>
                    {{reim.obj.checkMoney == null ? '待核算' : formatNumberRgx(reim.obj.checkMoney) + ' ' + reimburseDetailsMsg.settle_currency}}
                  </td>
                  <td>
                    <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.startTime}}</p>
                    <p v-if="reim.type == 0" style="margin: 0;">至</p>
                    <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.endTime}}</p>
                    <p v-if="reim.type == 1">{{reim.obj.time}}</p>
                  </td>
                  <td>
                    <el-tooltip class="item" effect="light" content="核算金额" placement="top-end">
                      <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                        @click="lookOver(reim.type,reim.obj.id)" />
                    </el-tooltip>
                    <el-dialog title="非行程记录信息" :visible.sync="dialogUnReimbursementVisible" center>
                      <div>
                        <p style="text-align: center;">
                          <span
                            style="font-size: 17px;color: #0c8563;">{{unJourneyInfo.estimateMoney == 0 || unJourneyInfo.estimateMoney == null ? '' : formatNumberRgx(unJourneyInfo.estimateMoney) + ' ' + unJourneyInfo.currency}}</span>
                        </p>
                        <p>
                          <span>日期： <span>{{unJourneyInfo.time}}</span></span>
                        </p>
                        <div>
                          <span>账单图片：</span>
                          <div style="display:flex;position:relative;" id="delImg">
                            <div v-for="(imgurl,index) of imgurls" :key="index"
                              style="margin-left:10px;position:relative;">
                              <a v-show="imgurl !== ''" :href="isPdf(imgurl) === 0 ? 'javascript:;' :img + imgurl"
                                :target="isPdf(imgurl) === 0 ? '': '_blank'">
                                <img v-if="isPdf(imgurl) === 0 " v-image-preview :src="img + imgurl" width="100px"
                                  height="100px" style="border-radius:5px;object-fit:cover;" />
                                <img v-else :src="pdfImg" width="100px" height="100px"
                                  style="border-radius:5px;object-fit:cover;" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <p>
                          <span>备注： <span>{{unJourneyInfo.remark}}</span></span>
                        </p>
                        <div style="margin-top: 20px;border-top: 1px solid #ddd;">
                          <p>财务核算：</p>
                          <div style="display: flex;justify-content: space-between;">
                            <p>汇率：<span>{{unJourneyInfo.rate}}</span></p>
                            <img src="../../assets/imgs/calc.png" style="height: 35px;cursor: pointer;"
                              @click="jumpRate" />
                          </div>
                          <p style="margin-top: 0;">
                            汇率日期：<span>{{unJourneyInfo.rateTime}}</span>
                          </p>
                          <p>
                            预估报销金额：<span>{{unJourneyInfo.sysCheckMoney == 0 || unJourneyInfo.sysCheckMoney == null ? '' : formatNumberRgx(unJourneyInfo.sysCheckMoney) + ' ' + unJourneyInfo.settle_currency}}</span>
                          </p>
                          <div>
                            <span>核算报销金额：</span>
                            <el-input style="width: 50%;height: auto;line-height: 40px;" v-model="calculationAmount">
                              <i slot="suffix"
                                style="color: #000;margin-right:5%;font-style:normal;">{{unJourneyInfo.settle_currency}}</i>
                            </el-input>
                          </div>
                        </div>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogUnReimbursementVisible = false">取 消</el-button>
                        <el-button type="primary" @click="unReimbursementSure">确 定</el-button>
                      </div>
                    </el-dialog>
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-top: 40px;text-align: center;">
              <el-checkbox v-model="checked">确认核算金额无误，并已向报销人转账</el-checkbox>
              <div style="margin-top: 10px;">
                <el-button type="primary" @click="auditSubmit">提 交</el-button>
              </div>
            </div>
          </div>
          <div v-if="reimbursementAdminSel.select == 2">
            <div class="back-img" @click="gobackDetails">
              <div>
                <img src="../../assets/imgs/goback.png" />
              </div>
              <span class="font">返回</span>
            </div>
            <div style="width: 95%;margin: 0 auto;">
              <p>
                <span>行程名称：<span>{{journeyInfo.name}}</span></span>
              </p>
              <p>
                <span>起止时间：<span>{{journeyInfo.startTime + ' ~ ' + journeyInfo.endTime}}</span></span>
              </p>
              <p>
                <span>行程描述：<span>{{journeyInfo.des}}</span></span>
              </p>
            </div>
            <div style="width: 95%;margin: 0 auto;margin-top: 30px;">
              <table>
                <tr>
                  <th>类型</th>
                  <th>核算报销金额</th>
                  <th>时间</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(every,index) in journeyInfo.recordList" :key="index">
                  <td>{{every.type}}</td>
                  <td>
                    {{every.checkMoney == 0 || every.checkMoney == null ? '待核算' : formatNumberRgx(every.checkMoney) + ' ' + journeyInfo.settle_currency}}
                  </td>
                  <td>{{every.time}}</td>
                  <td>
                    <el-tooltip class="item" effect="light" content="核算金额" placement="top-end">
                      <img src="../../assets/imgs/details.png" style="cursor:pointer;" @click="recordDetails(every)" />
                    </el-tooltip>
                    <el-dialog title="记录详情" :visible.sync="dialogRecordDetailsVisible" center>
                      <div>
                        <p style="text-align: center;">
                          <span
                            style="font-size: 17px;color: #0c8563;">{{recordDetailsMsg.estimateMoney == 0 || recordDetailsMsg.estimateMoney == null ? '' : formatNumberRgx(recordDetailsMsg.estimateMoney) + ' ' + recordDetailsMsg.currency}}</span>
                        </p>
                        <p>
                          <span>日期： <span>{{recordDetailsMsg.time}}</span></span>
                        </p>
                        <div>
                          <span>账单图片：</span>
                          <div style="display:flex;position:relative;" id="delImg">
                            <div v-for="(imgurl,index) of imgurls" :key="index"
                              style="margin-left:10px;position:relative;">
                              <a v-show="imgurl !== ''" :href="isPdf(imgurl) === 0 ? 'javascript:;' :img + imgurl"
                                :target="isPdf(imgurl) === 0 ? '': '_blank'">
                                <img v-if="isPdf(imgurl) === 0 " v-image-preview :src="img + imgurl" width="100px"
                                  height="100px" style="border-radius:5px;object-fit:cover;" />
                                <img v-else :src="pdfImg" width="100px" height="100px"
                                  style="border-radius:5px;object-fit:cover;" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <p>
                          <span>备注： <span>{{recordDetailsMsg.remark}}</span></span>
                        </p>
                        <div style="margin-top: 20px;border-top: 1px solid #ddd;">
                          <p>财务核算：</p>
                          <div style="display: flex;justify-content: space-between;">
                            <p>汇率：<span>{{recordDetailsMsg.rate}}</span></p>
                            <img src="../../assets/imgs/calc.png" style="height: 35px;cursor: pointer;"
                              @click="jumpRate" />
                          </div>
                          <p style="margin-top: 0;">
                            汇率日期：<span>{{recordDetailsMsg.rateTime}}</span>
                          </p>
                          <p>
                            预估报销金额：<span>{{recordDetailsMsg.sysCheckMoney == 0 || recordDetailsMsg.sysCheckMoney == null ? '' : formatNumberRgx(recordDetailsMsg.sysCheckMoney) + ' ' + journeyInfo.settle_currency}}</span>
                          </p>
                          <div>
                            <span>核算报销金额：</span>
                            <el-input style="width: 50%;height: auto;line-height: 40px;" v-model="calculationAmount">
                              <i slot="suffix"
                                style="color: #000;margin-right:5%;font-style:normal;">{{journeyInfo.settle_currency}}</i>
                            </el-input>
                          </div>
                        </div>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogRecordDetailsVisible = false">取 消</el-button>
                        <el-button type="primary" @click="rateCalcSure">确 认</el-button>
                      </div>
                    </el-dialog>
                  </td>
                </tr>
              </table>
            </div>
            <div style="width: 95%;margin: 0 auto;">
              <p>财务核算：</p>
              <p style="margin-left: 20px;">
                预估报销金额：<span>{{journeyInfo.sysCheckMoney + ' ' + journeyInfo.settle_currency}}</span></p>
              <p style="margin-left: 20px;">
                核算报销金额：<span>{{journeyInfo.checkMoney + ' ' + journeyInfo.settle_currency}}</span></p>
            </div>
            <div style="margin-top: 30px;text-align: right;">
              <el-button type="primary" @click="reimbursementCalcSure">确 认</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待确认" name="two">
          <div slot="label" style="display: flex;justify-content: center;font-size: 15px;">待确认
            <p style="margin-top: -10px;margin-left: 3px;">
              <img v-if="whether == 1" src="../../assets/imgs/circle.png" style="width: 10px;height: 10px;" />
            </p>
          </div>
          <div v-if="activeName == 'two'">
            <!-- 报销管理-待确认页面 -->
            <div v-if="toConfirmedList.length == 0" ref="toConfirmed" style="text-align: center;">
              <p>{{inner1}}</p>
            </div>
            <div v-if="toConfirmedList.length !== 0">
              <div v-if="toConfirmedSel.select == 0">
                <table>
                  <tr>
                    <th>报销单号</th>
                    <th>用户昵称</th>
                    <th>提交时间</th>
                    <th>操作</th>
                  </tr>
                  <tr v-for="(item,index) in toConfirmedList" :key="index">
                    <td>{{item.bxNumber}}</td>
                    <td>{{item.nick}}</td>
                    <td>{{item.subTime}}</td>
                    <td>
                      <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                        <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                          @click="handleConfirmedDetails(item.bxNumber)" />
                      </el-tooltip>
                    </td>
                  </tr>
                </table>
                <div style="width: 100%;height: 50px;">
                  <div style="margin:15px 0;position:absolute;right:6%;">
                    <el-pagination @current-change="handleCurrentChange2" :current-page="page"
                      layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                  </div>
                </div>
              </div>
              <div v-if="toConfirmedSel.select == 1">
                <div class="back-img" @click="gobackList2">
                  <div>
                    <img src="../../assets/imgs/goback.png" />
                  </div>
                  <span class="font">返回</span>
                </div>
                <div class="details-top">
                  <p>报销单号：<span>{{toConfirmedDetails.bxNumber}}</span></p>
                  <p>提交时间：<span>{{toConfirmedDetails.subTime}}</span></p>
                  <p>审核时间：<span>{{toConfirmedDetails.auditTime}}</span></p>
                  <p>
                    完成时间：<span>{{toConfirmedDetails.checkTime == null ? '等待报销人确认' : toConfirmedDetails.checkTime}}</span>
                  </p>
                </div>
                <div class="details-top" style="margin: 30px auto;">
                  <p>
                    预估报销金额：<span>{{formatNumberRgx(toConfirmedDetails.sysCheckMoney) + ' ' + toConfirmedDetails.settle_currency}}</span>
                  </p>
                  <p>
                    核算报销金额：<span>{{formatNumberRgx(toConfirmedDetails.checkMoney) + ' ' + toConfirmedDetails.settle_currency}}</span>
                  </p>
                </div>
                <div class="details-main">
                  <p>消费记录：</p>
                  <table v-for="(reim,index) in toConfirmedDetails.data" :key="index">
                    <tr>
                      <th></th>
                      <th>
                        <span>{{reim.type == 0 ? '行程名称' : '类型'}}</span>
                      </th>
                      <th>核算报销金额</th>
                      <th>
                        <span>{{reim.type == 0 ? '起止时间' : '时间'}}</span>
                      </th>
                      <th>操作</th>
                    </tr>
                    <tr>
                      <td>
                        <img :src="reim.type == 0 ? img2 : img1" style="width: 25px;height: 25px;" />
                      </td>
                      <td>{{reim.type == 0 ? reim.obj.name : reim.obj.type}}</td>
                      <td>{{formatNumberRgx(reim.obj.checkMoney) + ' ' + toConfirmedDetails.settle_currency}}</td>
                      <td>
                        <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.startTime}}</p>
                        <p v-if="reim.type == 0" style="margin: 0;">至</p>
                        <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.endTime}}</p>
                        <p v-if="reim.type == 1">{{reim.obj.time}}</p>
                      </td>
                      <td>
                        <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                          <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                            @click="lookOver2(reim.type,reim.obj.id)" />
                        </el-tooltip>
                        <el-dialog title="非行程记录信息" :visible.sync="dialogUnReimbursementVisible2" center>
                          <div>
                            <p style="text-align: center;">
                              <span
                                style="font-size: 17px;color: #0c8563;">{{formatNumberRgx(unJourneyInfo2.estimateMoney) + ' ' + unJourneyInfo2.currency}}</span>
                            </p>
                            <p>
                              <span>日期： <span>{{unJourneyInfo2.time}}</span></span>
                            </p>
                            <div>
                              <span>账单图片：</span>
                              <div style="display:flex;position:relative;" id="delImg">
                                <div v-for="(imgurl,index) of imgurls" :key="index"
                                  style="margin-left:10px;position:relative;">
                                  <a v-show="imgurl !== ''" :href="isPdf(imgurl) === 0 ? 'javascript:;' :img + imgurl"
                                    :target="isPdf(imgurl) === 0 ? '': '_blank'">
                                    <img v-if="isPdf(imgurl) === 0 " v-image-preview :src="img + imgurl" width="100px"
                                      height="100px" style="border-radius:5px;object-fit:cover;" />
                                    <img v-else :src="pdfImg" width="100px" height="100px"
                                      style="border-radius:5px;object-fit:cover;" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <p>
                              <span>备注： <span>{{unJourneyInfo2.remark}}</span></span>
                            </p>
                            <div style="margin-top: 20px;border-top: 1px solid #ddd;">
                              <p>财务核算：</p>
                              <div style="padding-left: 15px;display: flex;justify-content: space-between;">
                                <p>汇率：<span>{{unJourneyInfo2.rate}}</span></p>
                                <img src="../../assets/imgs/calc.png" style="height: 35px;cursor: pointer;"
                                  @click="jumpRate" />
                              </div>
                              <p style="margin-top: 0;padding-left: 15px;">
                                汇率日期：<span>{{unJourneyInfo2.rateTime}}</span>
                              </p>
                              <p style="padding-left: 15px;">
                                预估报销金额：<span>{{formatNumberRgx(unJourneyInfo2.sysCheckMoney) + ' ' + unJourneyInfo2.settle_currency}}</span>
                              </p>
                              <p style="padding-left: 15px;">
                                核算报销金额：<span>{{formatNumberRgx(unJourneyInfo2.checkMoney) + ' ' + unJourneyInfo2.settle_currency}}</span>
                              </p>
                            </div>
                          </div>
                          <div slot="footer">
                            <el-button @click="dialogUnReimbursementVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="dialogUnReimbursementVisible2 = false">确 认</el-button>
                          </div>
                        </el-dialog>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div v-if="toConfirmedSel.select == 2">
                <div class="back-img" @click="gobackReimDetails">
                  <div>
                    <img src="../../assets/imgs/goback.png" />
                  </div>
                  <span class="font">返回</span>
                </div>
                <div style="width: 95%;margin: 0 auto;">
                  <p>
                    <span>行程名称：<span>{{journeyInfo2.name}}</span></span>
                  </p>
                  <p>
                    <span>起止时间：<span>{{journeyInfo2.startTime + ' ~ ' + journeyInfo2.endTime}}</span></span>
                  </p>
                  <p>
                    <span>行程描述：<span>{{journeyInfo2.des}}</span></span>
                  </p>
                </div>
                <div style="width: 95%;margin: 0 auto;margin-top: 30px;">
                  <table>
                    <tr>
                      <th>类型</th>
                      <th>核算报销金额</th>
                      <th>时间</th>
                      <th>操作</th>
                    </tr>
                    <tr v-for="(every,index) in journeyInfo2.recordList" :key="index">
                      <td>{{every.type}}</td>
                      <td>
                        {{formatNumberRgx(every.checkMoney) + ' ' + journeyInfo2.settle_currency}}
                      </td>
                      <td>{{every.time}}</td>
                      <td>
                        <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                          <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                            @click="recordDetails2(every)" />
                        </el-tooltip>
                        <el-dialog title="记录详情" :visible.sync="dialogRecordDetailsVisible2" center>
                          <div>
                            <p style="text-align: center;">
                              <span
                                style="font-size: 17px;color: #0c8563;">{{formatNumberRgx(recordDetailsMsg2.estimateMoney) + ' ' + recordDetailsMsg2.currency}}</span>
                            </p>
                            <p>
                              <span>日期： <span>{{recordDetailsMsg2.time}}</span></span>
                            </p>
                            <div>
                              <span>账单图片：</span>
                              <div style="display:flex;position:relative;" id="delImg">
                                <div v-for="(imgurl,index) of imgurls" :key="index"
                                  style="margin-left:10px;position:relative;">
                                  <a v-show="imgurl !== ''" :href="isPdf(imgurl) === 0 ? 'javascript:;' :img + imgurl"
                                    :target="isPdf(imgurl) === 0 ? '': '_blank'">
                                    <img v-if="isPdf(imgurl) === 0 " v-image-preview :src="img + imgurl" width="100px"
                                      height="100px" style="border-radius:5px;object-fit:cover;" />
                                    <img v-else :src="pdfImg" width="100px" height="100px"
                                      style="border-radius:5px;object-fit:cover;" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <p>
                              <span>备注： <span>{{recordDetailsMsg2.remark}}</span></span>
                            </p>
                            <div style="margin-top: 20px;border-top: 1px solid #ddd;">
                              <p>财务核算：</p>
                              <div style="padding-left: 15px;display: flex;justify-content: space-between;">
                                <p>汇率：<span>{{recordDetailsMsg2.rate}}</span></p>
                                <img src="../../assets/imgs/calc.png" style="height: 35px;cursor: pointer;"
                                  @click="jumpRate" />
                              </div>
                              <p style="margin-top: 0;padding-left: 15px;">
                                汇率日期：<span>{{recordDetailsMsg2.rateTime}}</span>
                              </p>
                              <p style="padding-left: 15px;">
                                预估报销金额：<span>{{formatNumberRgx(recordDetailsMsg2.sysCheckMoney) + ' ' + journeyInfo2.settle_currency}}</span>
                              </p>
                              <p style="padding-left: 15px;">
                                核算报销金额：<span>{{formatNumberRgx(recordDetailsMsg2.checkMoney) + ' ' + journeyInfo2.settle_currency}}</span>
                              </p>
                            </div>
                          </div>
                          <div slot="footer">
                            <el-button @click="dialogRecordDetailsVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="dialogRecordDetailsVisible2 = false">确 认</el-button>
                          </div>
                        </el-dialog>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="width: 95%;margin: 0 auto;">
                  <p>财务核算：</p>
                  <p style="margin-left: 20px;">
                    预估报销金额：<span>{{formatNumberRgx(journeyInfo2.sysCheckMoney) + ' ' + journeyInfo2.settle_currency}}</span>
                  </p>
                  <p style="margin-left: 20px;">
                    核算报销金额：<span>{{formatNumberRgx(journeyInfo2.checkMoney) + ' ' + journeyInfo2.settle_currency}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="three">
          <div v-if="activeName == 'three'">
            <!-- 报销管理-已完成页面 -->
            <div v-if="toConfirmedList.length == 0" ref="toConfirmed2" style="text-align: center;">
              <p>{{inner2}}</p>
            </div>
            <div v-if="toConfirmedList.length !== 0">
              <div v-if="toConfirmedSel.select == 0">
                <table>
                  <tr>
                    <th>报销单号</th>
                    <th>用户昵称</th>
                    <th>提交时间</th>
                    <th>操作</th>
                  </tr>
                  <tr v-for="(item,index) in toConfirmedList" :key="index">
                    <td>{{item.bxNumber}}</td>
                    <td>{{item.nick}}</td>
                    <td>{{item.subTime}}</td>
                    <td>
                      <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                        <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                          @click="handleConfirmedDetails(item.bxNumber)" />
                      </el-tooltip>
                    </td>
                  </tr>
                </table>
                <div style="width: 100%;height: 50px;">
                  <div style="margin:15px 0;position:absolute;right:6%;">
                    <el-pagination @current-change="handleCurrentChange2" :current-page="page"
                      layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                  </div>
                </div>
              </div>
              <div v-if="toConfirmedSel.select == 1">
                <div class="back-img" @click="gobackList2">
                  <div>
                    <img src="../../assets/imgs/goback.png" />
                  </div>
                  <span class="font">返回</span>
                </div>
                <div class="details-top">
                  <p>报销单号：<span>{{toConfirmedDetails.bxNumber}}</span></p>
                  <p>提交时间：<span>{{toConfirmedDetails.subTime}}</span></p>
                  <p>审核时间：<span>{{toConfirmedDetails.auditTime}}</span></p>
                  <p>
                    完成时间：<span>{{toConfirmedDetails.checkTime == null ? '等待报销人确认' : toConfirmedDetails.checkTime}}</span>
                  </p>
                </div>
                <div class="details-top" style="margin: 30px auto;">
                  <p>
                    预估报销金额：<span>{{formatNumberRgx(toConfirmedDetails.sysCheckMoney) + ' ' + toConfirmedDetails.settle_currency}}</span>
                  </p>
                  <p>
                    核算报销金额：<span>{{formatNumberRgx(toConfirmedDetails.checkMoney) + ' ' + toConfirmedDetails.settle_currency}}</span>
                  </p>
                </div>
                <div class="details-main">
                  <p>消费记录：</p>
                  <table v-for="(reim,index) in toConfirmedDetails.data" :key="index">
                    <tr>
                      <th></th>
                      <th>
                        <span>{{reim.type == 0 ? '行程名称' : '类型'}}</span>
                      </th>
                      <th>核算报销金额</th>
                      <th>
                        <span>{{reim.type == 0 ? '起止时间' : '时间'}}</span>
                      </th>
                      <th>操作</th>
                    </tr>
                    <tr>
                      <td>
                        <img :src="reim.type == 0 ? img2 : img1" style="width: 25px;height: 25px;" />
                      </td>
                      <td>{{reim.type == 0 ? reim.obj.name : reim.obj.type}}</td>
                      <td>{{formatNumberRgx(reim.obj.checkMoney) + ' ' + toConfirmedDetails.settle_currency}}</td>
                      <td>
                        <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.startTime}}</p>
                        <p v-if="reim.type == 0" style="margin: 0;">至</p>
                        <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.endTime}}</p>
                        <p v-if="reim.type == 1">{{reim.obj.time}}</p>
                      </td>
                      <td>
                        <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                          <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                            @click="lookOver2(reim.type,reim.obj.id)" />
                        </el-tooltip>
                        <el-dialog title="非行程记录信息" :visible.sync="dialogUnReimbursementVisible2" center>
                          <div>
                            <p style="text-align: center;">
                              <span
                                style="font-size: 17px;color: #0c8563;">{{formatNumberRgx(unJourneyInfo2.estimateMoney) + ' ' + unJourneyInfo2.currency}}</span>
                            </p>
                            <p>
                              <span>日期： <span>{{unJourneyInfo2.time}}</span></span>
                            </p>
                            <div>
                              <span>账单图片：</span>
                              <div style="display:flex;position:relative;" id="delImg">
                                <div v-for="(imgurl,index) of imgurls" :key="index"
                                  style="margin-left:10px;position:relative;">
                                  <a v-show="imgurl !== ''" :href="isPdf(imgurl) === 0 ? 'javascript:;' :img + imgurl"
                                    :target="isPdf(imgurl) === 0 ? '': '_blank'">
                                    <img v-if="isPdf(imgurl) === 0 " v-image-preview :src="img + imgurl" width="100px"
                                      height="100px" style="border-radius:5px;object-fit:cover;" />
                                    <img v-else :src="pdfImg" width="100px" height="100px"
                                      style="border-radius:5px;object-fit:cover;" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <p>
                              <span>备注： <span>{{unJourneyInfo2.remark}}</span></span>
                            </p>
                            <div style="margin-top: 20px;border-top: 1px solid #ddd;">
                              <p>财务核算：</p>
                              <div style="padding-left: 15px;display: flex;justify-content: space-between;">
                                <p>汇率：<span>{{unJourneyInfo2.rate}}</span></p>
                                <img src="../../assets/imgs/calc.png" style="height: 35px;cursor: pointer;"
                                  @click="jumpRate" />
                              </div>
                              <p style="margin-top: 0;padding-left: 15px;">
                                汇率日期：<span>{{unJourneyInfo2.rateTime}}</span>
                              </p>
                              <p style="padding-left: 15px;">
                                预估报销金额：<span>{{formatNumberRgx(unJourneyInfo2.sysCheckMoney) + ' ' + unJourneyInfo2.settle_currency}}</span>
                              </p>
                              <p style="padding-left: 15px;">
                                核算报销金额：<span>{{formatNumberRgx(unJourneyInfo2.checkMoney) + ' ' + unJourneyInfo2.settle_currency}}</span>
                              </p>
                            </div>
                          </div>
                          <div slot="footer">
                            <el-button @click="dialogUnReimbursementVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="dialogUnReimbursementVisible2 = false">确 认</el-button>
                          </div>
                        </el-dialog>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div v-if="toConfirmedSel.select == 2">
                <div class="back-img" @click="gobackReimDetails">
                  <div>
                    <img src="../../assets/imgs/goback.png" />
                  </div>
                  <span class="font">返回</span>
                </div>
                <div style="width: 95%;margin: 0 auto;">
                  <p>
                    <span>行程名称：<span>{{journeyInfo2.name}}</span></span>
                  </p>
                  <p>
                    <span>起止时间：<span>{{journeyInfo2.startTime + ' ~ ' + journeyInfo2.endTime}}</span></span>
                  </p>
                  <p>
                    <span>行程描述：<span>{{journeyInfo2.des}}</span></span>
                  </p>
                </div>
                <div style="width: 95%;margin: 0 auto;margin-top: 30px;">
                  <table>
                    <tr>
                      <th>类型</th>
                      <th>核算报销金额</th>
                      <th>时间</th>
                      <th>操作</th>
                    </tr>
                    <tr v-for="(every,index) in journeyInfo2.recordList" :key="index">
                      <td>{{every.type}}</td>
                      <td>
                        {{formatNumberRgx(every.checkMoney) + ' ' + journeyInfo2.settle_currency}}
                      </td>
                      <td>{{every.time}}</td>
                      <td>
                        <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                          <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                            @click="recordDetails2(every)" />
                        </el-tooltip>
                        <el-dialog title="记录详情" :visible.sync="dialogRecordDetailsVisible2" center>
                          <div>
                            <p style="text-align: center;">
                              <span
                                style="font-size: 17px;color: #0c8563;">{{formatNumberRgx(recordDetailsMsg2.estimateMoney) + ' ' + recordDetailsMsg2.currency}}</span>
                            </p>
                            <p>
                              <span>日期： <span>{{recordDetailsMsg2.time}}</span></span>
                            </p>
                            <div>
                              <span>账单图片：</span>
                              <div style="display:flex;position:relative;" id="delImg">
                                <div v-for="(imgurl,index) of imgurls" :key="index"
                                  style="margin-left:10px;position:relative;">
                                  <a v-show="imgurl !== ''" :href="isPdf(imgurl) === 0 ? 'javascript:;' :img + imgurl"
                                    :target="isPdf(imgurl) === 0 ? '': '_blank'">
                                    <img v-if="isPdf(imgurl) === 0 " v-image-preview :src="img + imgurl" width="100px"
                                      height="100px" style="border-radius:5px;object-fit:cover;" />
                                    <img v-else :src="pdfImg" width="100px" height="100px"
                                      style="border-radius:5px;object-fit:cover;" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <p>
                              <span>备注： <span>{{recordDetailsMsg2.remark}}</span></span>
                            </p>
                            <div style="margin-top: 20px;border-top: 1px solid #ddd;">
                              <p>财务核算：</p>
                              <div style="padding-left: 15px;display: flex;justify-content: space-between;">
                                <p>汇率：<span>{{recordDetailsMsg2.rate}}</span></p>
                                <img src="../../assets/imgs/calc.png" style="height: 35px;cursor: pointer;"
                                  @click="jumpRate" />
                              </div>
                              <p style="margin-top: 0;padding-left: 15px;">
                                汇率日期：<span>{{recordDetailsMsg2.rateTime}}</span>
                              </p>
                              <p style="padding-left: 15px;">
                                预估报销金额：<span>{{formatNumberRgx(recordDetailsMsg2.sysCheckMoney) + ' ' + journeyInfo2.settle_currency}}</span>
                              </p>
                              <p style="padding-left: 15px;">
                                核算报销金额：<span>{{formatNumberRgx(recordDetailsMsg2.checkMoney) + ' ' + journeyInfo2.settle_currency}}</span>
                              </p>
                            </div>
                          </div>
                          <div slot="footer">
                            <el-button @click="dialogRecordDetailsVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="dialogRecordDetailsVisible2 = false">确 认</el-button>
                          </div>
                        </el-dialog>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="width: 95%;margin: 0 auto;">
                  <p>财务核算：</p>
                  <p style="margin-left: 20px;">
                    预估报销金额：<span>{{formatNumberRgx(journeyInfo2.sysCheckMoney) + ' ' + journeyInfo2.settle_currency}}</span>
                  </p>
                  <p style="margin-left: 20px;">
                    核算报销金额：<span>{{formatNumberRgx(journeyInfo2.checkMoney) + ' ' + journeyInfo2.settle_currency}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        pdfImg: require('../../assets/imgs/pdf.png'),
        img: this.$store.state.baseUrl,
        img1: require('../../assets/imgs/reim.png'),
        img2: require('../../assets/imgs/notReim.png'),
        page: 1,
        pageNum: 10,
        total: 0,
        keyword: '',
        flag: 0,
        pendingList: [], // 报销单列表
        activeName: 'one',
        reimburseDetailsMsg: {}, // 报销单详情
        journeyInfo: {}, // 行程信息
        unJourneyInfo: {}, // 非行程信息
        dialogRecordDetailsVisible: false,
        recordDetailsMsg: {}, // 记录详情
        imgurls: [],
        calculationAmount: '', // 核算报销金额
        reimRecords: [],
        records: [], // 
        checked: false,
        recordSum: '',
        dialogUnReimbursementVisible: false,
        auditId: '',
        reimId: '',
        toConfirmedSel: {
          id: 0,
          select: 0
        },
        adminCompleteSel: {
          select: 0
        },

        whether: 0,
        toConfirmedList: [],
        toConfirmedList: [],
        toConfirmedDetails: {},
        journeyInfo2: {},
        dialogUnReimbursementVisible2: false,
        unJourneyInfo2: {},
        recordDetailsMsg2: {},
        dialogRecordDetailsVisible2: false,
        inner1: '数据加载中...',
        inner2: '数据加载中...',
        inner: '数据加载中...',


      }
    },
    props: ['reimbursementAdminSel'],
    mounted() {
      this.handleTabsClick();
      this.handleSureReimbursement();
    },
    methods: {
      isPdf(img) {
        // console.log(img);
        if (img !== '' && img !== null) {
          if (img.indexOf('pdf') === -1) {
            return 0;
          } else {
            return 1;
          }
        }
      },
      // 获取是否有需要确认的报销单 ReimburseList?java
      handleSureReimbursement() {
        this.$axios.post(this.$store.state.baseUrl + '/ClaimFormList?java', {
          page: 1,
          pageNum: 10,
          flag: 1
        }).then((res) => {
          console.log('是否有需要确认的报销单');
          console.log(res);
          if (res.data.lists.length !== 0) {
            this.whether = 1;
          } else {
            this.whether = 0;
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      pageSel() {
        this.page = 1;
      },
      // 模糊搜索
      stockInSearch() {
        this.$axios.post(this.$store.state.baseUrl + '/ClaimFormSearch?java', {
          flag: this.flag,
          page: this.page,
          pageNum: this.pageNum,
          keyword: this.keyword
        }).then((res) => {
          console.log('模糊搜索报销单');
          console.log(res);
          this.pendingList = res.data.lists;
          this.total = res.data.total;
          this.toConfirmedList = res.data.lists;
          if (this.pendingList.length == 0) {
            this.inner = '啊哦~ 暂无数据';
          };
          if (this.toConfirmedList.length == 0) {
            if (this.activeName == 'two') {
              this.inner1 = '啊哦~暂无数据';
            } else if (this.activeName == 'three') {
              this.inner2 = '啊哦~暂无数据';
            }
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 获取报销单列表
      handleClaimformList() {
        this.$axios.post(this.$store.state.baseUrl + '/ClaimFormList?java', {
          flag: this.flag,
          page: this.page,
          pageNum: this.pageNum
        }).then((res) => {
          console.log('报销单列表');
          console.log(res);
          this.pendingList = res.data.lists;
          this.total = res.data.total;
          this.toConfirmedList = res.data.lists;
          if (this.activeName == 'one') {
            if (this.pendingList.length == 0) {
              this.inner = '啊哦~ 暂无数据';
            };
          }
          if (this.toConfirmedList.length == 0) {
            if (this.activeName == 'two') {
              this.inner1 = '啊哦~暂无数据';
            } else if (this.activeName == 'three') {
              this.inner2 = '啊哦~暂无数据';
            }
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 查看报销单详情
      reimburseDetails(bxNumber) {
        this.records = [];
        this.checked = false;
        this.$axios.post(this.$store.state.baseUrl + '/ClaimFormInfo?java', {
          bxNumber: bxNumber
        }).then((res) => {
          console.log('报销单详情');
          console.log(res);
          this.reimburseDetailsMsg = res.data;
          this.reimbursementAdminSel.select = 1;
        }).catch((err) => {
          console.log(err);
        })
      },
      // 查看行程/非行程信息
      lookOver(type, id) {
        this.auditId = '';
        this.calculationAmount = '';
        console.log(type);
        console.log(id);
        if (type == 0) {
          this.reimId = id;
          this.$axios.post(this.$store.state.baseUrl + '/TripInfo?java', {
            id: id
          }).then((res) => {
            console.log('行程信息');
            console.log(res);
            this.journeyInfo = res.data;
            if (this.records.length !== 0) {
              this.journeyInfo.checkMoney = 0;
              for (let item of this.records) {
                for (let index in this.journeyInfo.recordList) {
                  if (item.id == this.journeyInfo.recordList[index].id) {
                    this.journeyInfo.recordList[index].checkMoney = item.checkMoney;
                    this.journeyInfo.checkMoney += Number(item.checkMoney);
                  }
                }
              }
            };
            this.reimbursementAdminSel.select = 2;
          }).catch((err) => {
            console.log(err);
          });
        } else if (type == 1) {
          this.auditId = id;
          this.$axios.post(this.$store.state.baseUrl + '/RecordInfo?java', {
            id: id
          }).then((res) => {
            console.log('非行程信息');
            console.log(res);
            this.unJourneyInfo = res.data;
            if (this.records.length !== 0) {
              for (let item of this.records) {
                if (item.id == this.auditId) {
                  this.unJourneyInfo.checkMoney = item.checkMoney;
                  this.calculationAmount = this.unJourneyInfo.checkMoney;
                }
              }
            };
            console.log(this.unJourneyInfo);
            this.imgurls = [];
            if (this.unJourneyInfo.billPics !== null && this.unJourneyInfo.billPics !== '') {
              if (this.unJourneyInfo.billPics.indexOf('|') !== -1) {
                this.imgurls = this.unJourneyInfo.billPics.split('|');
              } else {
                this.imgurls.push(this.unJourneyInfo.billPics);
              }
            } else {
              this.imgurls = [];
            };
            this.dialogUnReimbursementVisible = true;
          }).catch((err) => {
            console.log(err);
          });
        }
      },
      // 查看行程信息记录详情
      recordDetails(every) {
        this.calculationAmount = '';
        console.log(every);
        this.recordDetailsMsg = every;
        console.log(this.recordDetailsMsg);
        if (this.recordDetailsMsg.checkMoney !== 0) {
          this.calculationAmount = this.recordDetailsMsg.checkMoney;
        } else {
          this.calculationAmount = '';
        }
        this.imgurls = [];
        if (this.recordDetailsMsg.billPics !== null && this.recordDetailsMsg.billPics !== '') {
          if (this.recordDetailsMsg.billPics.indexOf('|') !== -1) {
            this.imgurls = this.recordDetailsMsg.billPics.split('|');
          } else {
            this.imgurls.push(this.recordDetailsMsg.billPics);
          }
        } else {
          this.imgurls = [];
        };
        this.dialogRecordDetailsVisible = true;
      },
      // 确认此记录报销金额
      rateCalcSure() {
        if (this.calculationAmount == '') {
          this.$message.error({
            message: '请输入核算报销金额',
            showClose: true,
            duration: 2000
          })
        } else {

          if (this.records.length !== 0) {
            for (let item = 0; item < this.records.length; item++) {
              console.log(this.records[item].id);
              if (this.records[item].id == this.recordDetailsMsg.id) {
                console.log('替换');
                this.records.splice(item, 1, {
                  id: this.recordDetailsMsg.id,
                  checkMoney: this.calculationAmount
                });
              }
            };
            let b = {
              id: this.recordDetailsMsg.id,
              checkMoney: this.calculationAmount
            };
            console.log(JSON.stringify(this.records).indexOf(JSON.stringify(b)));
            if (JSON.stringify(this.records).indexOf(JSON.stringify(b)) == -1) {
              console.log('数组不为空添加');
              this.records.push({
                id: this.recordDetailsMsg.id,
                checkMoney: this.calculationAmount
              });
            }
          } else {
            console.log('数组为空添加');
            this.records.push({
              id: this.recordDetailsMsg.id,
              checkMoney: this.calculationAmount
            });
          }
          console.log(this.records);
          this.dialogRecordDetailsVisible = false;
          this.recordDetailsMsg.checkMoney = this.calculationAmount;
          this.recordSum = 0;
          this.journeyInfo.checkMoney = 0;
          for (let item of this.journeyInfo.recordList) {
            this.recordSum += Number(item.checkMoney);
          };
          this.journeyInfo.checkMoney = this.recordSum;
        };
      },
      sure() {
        for (let jour of this.journeyInfo.recordList) {
          if (jour.checkMoney == 0) {
            return 1;
          }
        }
      },
      // 确认此行程消费报销金额
      reimbursementCalcSure() {
        console.log(this.records);
        console.log(this.journeyInfo.recordList);
        if (this.sure() == 1) {
          this.$message.error({
            message: '该行程消费内仍有未审核消费，请审核',
            showClose: true,
            duration: 2000
          });
        } else {
          this.reimburseDetailsMsg.checkMoney = 0;
          for (let item of this.records) {
            this.reimburseDetailsMsg.checkMoney += Number(item.checkMoney);
          };
          for (let data of this.reimburseDetailsMsg.data) {
            if (this.reimId == data.obj.id) {
              data.obj.checkMoney = this.journeyInfo.checkMoney;
            }
          }
          this.reimbursementAdminSel.select = 1;
        }
      },
      // 确认此非行程消费报销金额
      unReimbursementSure() {
        if (this.calculationAmount == '') {
          this.$message.error({
            message: '请输入核算报销金额',
            showClose: true,
            duration: 2000
          })
        } else {
          if (this.records.length !== 0) {
            for (let item = 0; item < this.records.length; item++) {
              console.log(this.records[item].id);
              if (this.records[item].id == this.auditId) {
                console.log('替换');
                this.records.splice(item, 1, {
                  id: this.auditId,
                  checkMoney: this.calculationAmount
                });
              }
            };
            let b = {
              id: this.auditId,
              checkMoney: this.calculationAmount
            };
            console.log(JSON.stringify(this.records).indexOf(JSON.stringify(b)));
            if (JSON.stringify(this.records).indexOf(JSON.stringify(b)) == -1) {
              console.log('数组不为空添加');
              this.records.push({
                id: this.auditId,
                checkMoney: this.calculationAmount
              });
            }
          } else {
            console.log('数组为空添加');
            this.records.push({
              id: this.auditId,
              checkMoney: this.calculationAmount
            });
          };
          console.log(this.records);
          if (this.records.length !== 0) {
            for (let item of this.records) {
              if (item.id == this.auditId) {
                this.unJourneyInfo.checkMoney = item.checkMoney;
                // console.log(this.reimburseDetailsMsg);
                for (let con of this.reimburseDetailsMsg.data) {
                  if (con.obj.id == this.auditId) {
                    con.obj.checkMoney = item.checkMoney;
                  }
                }
              };
            };
          };
          console.log(this.reimburseDetailsMsg);
          console.log(this.unJourneyInfo);
          this.reimburseDetailsMsg.checkMoney = 0;
          for (let item of this.records) {
            this.reimburseDetailsMsg.checkMoney += Number(item.checkMoney);
          };
          this.dialogUnReimbursementVisible = false;
        }
        console.log(this.records);
      },
      verify() {
        for (let item of this.reimburseDetailsMsg.data) {
          if (item.obj.checkMoney == 0 || item.obj.checkMoney == null) {
            return 1;
          }
        }
      },
      // 提交审核信息
      auditSubmit() {
        console.log(this.records);
        if (this.checked == false) {
          this.$message.error({
            message: '请确认是否核算金额无误，并已向报销人转账',
            showClose: true,
            duration: 2000
          })
        } else if (this.records.length == 0) {
          this.$message.error({
            message: '请审核消费记录',
            showClose: true,
            duration: 2000
          })
        } else if (this.verify() == 1) {
          this.$message.error({
            message: '仍有未审核消费，请审核',
            showClose: true,
            duration: 2000
          })
        } else {
          let date = new Date();
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          let d = date.getDate();
          m = m < 10 ? ('0' + m) : m;
          d = d < 10 ? ('0' + d) : d;
          let time = y + '-' + m + '-' + d;
          this.$axios.post(this.$store.state.baseUrl + '/BXAuditRecord?java', {
            auditTime: time,
            bxNumber: this.reimburseDetailsMsg.bxNumber,
            records: this.records
          }).then((res) => {
            console.log('提交审核');
            console.log(res);
            this.$message.success({
              message: '报销单审核信息提交成功',
              showClose: true,
              duration: 2000
            });
            this.reimbursementAdminSel.select = 0;
            this.handleClaimformList();
            this.handleSureReimbursement();
            this.$emit('reimListen', this.whether);
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          }).catch((err) => {
            this.$message.error({
              message: err.message,
              showClose: true,
              duration: 2000
            });
            this.reimbursementAdminSel.select = 0;
            this.handleClaimformList();
          })
        }
      },

      // 获取报销单详情
      handleConfirmedDetails(bxNumber) {
        this.$axios.post(this.$store.state.baseUrl + '/ClaimFormInfo?java', {
          bxNumber: bxNumber
        }).then((res) => {
          console.log('报销单详情');
          console.log(res);
          this.toConfirmedDetails = res.data;
          this.toConfirmedSel.select = 1;
        }).catch((err) => {
          console.log(err);
        })
      },
      // 获取行程/非行程详细信息
      lookOver2(type, id) {
        console.log(type);
        console.log(id);
        if (type == 0) {
          this.$axios.post(this.$store.state.baseUrl + '/TripInfo?java', {
            id: id
          }).then((res) => {
            console.log('行程信息');
            console.log(res);
            this.journeyInfo2 = res.data;
            this.toConfirmedSel.select = 2;
          }).catch((err) => {
            console.log(err);
          });
        } else if (type == 1) {
          this.$axios.post(this.$store.state.baseUrl + '/RecordInfo?java', {
            id: id
          }).then((res) => {
            console.log('非行程信息');
            console.log(res);
            this.unJourneyInfo2 = res.data;
            console.log(this.unJourneyInfo2);
            this.imgurls = [];
            if (this.unJourneyInfo2.billPics !== null && this.unJourneyInfo2.billPics !== '') {
              if (this.unJourneyInfo2.billPics.indexOf('|') !== -1) {
                this.imgurls = this.unJourneyInfo2.billPics.split('|');
              } else {
                this.imgurls.push(this.unJourneyInfo2.billPics);
              }
            } else {
              this.imgurls = [];
            };
            this.dialogUnReimbursementVisible2 = true;
          }).catch((err) => {
            console.log(err);
          });
        }
      },
      // 查看行程信息记录详情
      recordDetails2(every) {
        this.recordDetailsMsg2 = every;
        console.log(this.recordDetailsMsg2);
        this.imgurls = [];
        if (this.recordDetailsMsg2.billPics !== null && this.recordDetailsMsg2.billPics !== '') {
          if (this.recordDetailsMsg2.billPics.indexOf('|') !== -1) {
            this.imgurls = this.recordDetailsMsg2.billPics.split('|');
          } else {
            this.imgurls.push(this.recordDetailsMsg2.billPics);
          }
        } else {
          this.imgurls = [];
        };
        this.dialogRecordDetailsVisible2 = true;
      },
      // 分页
      handleCurrentChange2(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.handleTabsClick();
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
      gobackList2() {
        this.toConfirmedSel.select = 0;
      },
      // 返回报销单详情页
      gobackReimDetails() {
        this.toConfirmedSel.select = 1;
      },
      formatNumberRgx(num) {
        // console.log(num);
        if (num !== undefined && num !== null) {
          let parts = num.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return parts.join(".");
        }
      },

      // 跳转到汇率查询页面
      jumpRate() {
        this.$emit('rateCalcJump', 11);
      },
      gobackList() {
        this.reimbursementAdminSel.select = 0;
      },
      gobackDetails() {
        this.reimbursementAdminSel.select = 1;
      },
      handleTabsClick() {
        this.page = 1;
        this.keyword = '';
        console.log(this.activeName);
        this.$emit('reimbursementKeyword', '');
        if (this.activeName == 'one') {
          this.flag = 0;
          if (this.keyword == '') {
            this.handleClaimformList();
          } else {
            this.stockInSearch();
          }
        } else if (this.activeName == 'two') {
          this.flag = 1;
          if (this.keyword == '') {
            this.handleClaimformList();
          } else {
            this.stockInSearch();
          }
        } else if (this.activeName == 'three') {
          this.flag = 2;
          if (this.keyword == '') {
            this.handleClaimformList();
          } else {
            this.stockInSearch();
          }
        };
        this.reimbursementAdminSel.select = 0;
        this.toConfirmedSel.select = 0;
        this.adminCompleteSel.select = 0;
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        if (this.keyword == '') {
          this.stockInSearch();
        } else {
          this.handleClaimformList();
        }
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
    },
  }
</script>
<style lang="scss" scoped>
  .reimbursement-admin-container {
    width: 95%;
    margin: 0 auto;
  }

  .details-top {
    width: 95%;
    margin: 0 auto;
  }

  .details-main {
    width: 95%;
    margin: 0 auto;
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }

  .back-img {
    width: 75px;
    height: 45px;
    margin-left: 30px;
    margin-bottom: 30px;
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

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f3fbf9;
    font-size: 15px;
    text-align: center;
  }

  .input-style {
    width: 70% !important;
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
<style lang="scss">
  #reimbursement-admin {
    .el-tabs__header {
      z-index: 0;
    }

    .el-checkbox__label {
      font-size: 15px;
    }

    .el-tabs--border-card {
      background: transparent;
      border: transparent;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .el-tabs--border-card>.el-tabs__header {
      background-color: transparent;
      border-bottom: none;
      margin: 0;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item {
      background-color: #ddebec;
    }

    .el-tabs__item {
      width: 160px;
      height: 48px !important;
      line-height: 48px !important;
      font-size: 16px !important;
      text-align: center;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      color: #000;
    }

    .el-tabs__content {
      background-color: #fff;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
      color: #000;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
      color: #000;
      background-color: #FFF;
      border-right-color: transparent;
      border-left-color: transparent;
    }


    .el-tabs--border-card>.el-tabs__content {
      padding: 20px 30px;
    }
  }
</style>