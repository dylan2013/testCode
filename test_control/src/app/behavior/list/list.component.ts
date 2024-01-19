import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { GadgetService, Contract } from "src/app/gadget.service";
import { Utils } from "src/app/util";
import { DialogService } from "../dialog-service.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["../common.css"]
})
export class ListComponent implements OnInit {
  head: string;
  accessPoint: string;
  behaviorDataInfo: any;
  behaviorDataList: any;
  loading: boolean;
  error: any;
  courseID: string;
  courseName: string;

  constructor(
    private route: ActivatedRoute,
    private gadget: GadgetService,
    private dialogService: DialogService
  ) {
    // 取得 contract 連線。
  }
  contract: Contract;

  async ngOnInit() {
    this.courseID = this.route.snapshot.paramMap.get("id");
    this.courseName = this.route.snapshot.paramMap.get("name");
    // console.log(this.courseID);
    this.contract = await this.gadget.getContract("kcis");
    this.getData();
  }

  // 修改 comment
  async editComment(data) {
    const result = await this.dialogService.confirmCancel("Edit "+data.Name, "Comment",data.Comment);
    if (result.confirm) {
      try {
        const rsp = await this.contract.send("behavior.EditBehaviorData", {
          Request: {
            BehaviorData: {
              Field: { Comment: result.reason },
              Condition: { Uid: data.BehaviorUID }
            }
          }
        });
        this.getData();
      } catch (error) {
        alert(error);
      } finally {
      }
    }
    // console.log(data);
  }

  // 刪除資料
  async delete(data) {
    const result = await this.dialogService.confirm(
      "Confirmation",
      "Are you sure want to delete the comment?"
    );
    if (result) {
      try {
        // 確認刪除
        const rsp = await this.contract.send("behavior.DelBehaviorData", {
          Request: { BehaviorData: { Condition: { Uid: data.BehaviorUID } } }
        });
        this.getData();
      } catch (error) {
        alert(error);
      } finally {
      }
    } else {
      return;
    }
    // console.log(data);
  }

  async getData() {
    try {
      this.loading = true;

      // 呼叫 service。
      const rsp = await this.contract.send(
        "behavior.GetBehaviorDataByCourseID",
        {
          Request: {
            CourseID: this.courseID
          }
        }
      );
      this.behaviorDataInfo = Utils.array(rsp, "Response/BehaviorData");
      this.behaviorDataList = [];
      for (const data of this.behaviorDataInfo) {
        this.behaviorDataList.push(data);
      }

      // console.log(this.behaviorDataList);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }
}
