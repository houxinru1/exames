<template>
  <div class="questionbank">
    <div class="classification">
      <div class="exam">
        <span>适用考试：</span>
        <el-button round>全部()</el-button>
        <el-button round>期中考试</el-button>
        <el-button round>期末考试</el-button>
        <el-button round>其他考试</el-button>
      </div>
      <div class="form mat-20">
        <span>试卷形式：</span>
        <el-button round>全部</el-button>
        <el-button round>考生同卷</el-button>
        <el-button round>随机考试</el-button>
        <el-button round>考生异卷</el-button>
      </div>
      <div class="paper mat-20">
        <div>
          <el-button type="primary">策略组卷</el-button>
          <el-button type="primary">手动组卷</el-button>
          <el-button type="primary">导入试卷</el-button>
        </div>
        <div class="inp">
          <el-input placeholder="请输入内容" suffix-icon="el-icon-search">
          </el-input>
        </div>
      </div>
    </div>

    <div class="type mat-20">
      <div class="firstline">
        <div class="first">
          <span>创建时间:2022-05-09 18:33:20</span>
          <div class="textterm mal-50">
            <span class="term mr-10">期中考试</span>
            <span class="tongjuan">考生同卷</span>
          </div>
          <div class="mal-60">满分:100分</div>
          <div class="mal-60">使用次数:18次</div>
        </div>
        <div class="icon">
          <span class="el-icon-message mr-10"></span>
          <span class="el-icon-document mr-10"></span>
          <span class="el-icon-delete"></span>
        </div>
      </div>
      <div class="twoline">
        <p>1、JAVA程序设计期中考试试题</p>
      </div>
    </div>

    <div class="type mat-20">
      <div class="firstline">
        <div class="first">
          <span>创建时间:2022-05-09 18:33:20</span>
          <div class="textterm mal-50">
            <span class="term mr-10">期中考试</span>
            <span class="tongjuan">考生同卷</span>
          </div>
          <div class="mal-60">满分:100分</div>
          <div class="mal-60">使用次数:18次</div>
        </div>
        <div class="icon">
          <span class="el-icon-message mr-10"></span>
          <span class="el-icon-document mr-10"></span>
          <span class="el-icon-delete"></span>
        </div>
      </div>
      <div class="twoline">
        <p>2、JAVA程序设计期末考试试题</p>
      </div>
    </div>

    <div class="type mat-20">
      <div class="firstline">
        <div class="first">
          <span>创建时间:2022-05-09 18:33:20</span>
          <div class="textterm mal-50">
            <span class="term mr-10">期中考试</span>
            <span class="tongjuan">考生同卷</span>
          </div>
          <div class="mal-60">满分:100分</div>
          <div class="mal-60">使用次数:18次</div>
        </div>
        <div class="icon">
          <span class="el-icon-message mr-10"></span>
          <span class="el-icon-document mr-10"></span>
          <span class="el-icon-delete"></span>
        </div>
      </div>
      <div class="twoline">
        <p>3、JAVA程序设计-随堂检测</p>
      </div>
    </div>

    <div class="type mat-20">
      <div class="firstline">
        <div class="first">
          <span>创建时间:2022-05-09 18:33:20</span>
          <div class="textterm mal-50">
            <span class="term mr-10">期中考试</span>
            <span class="tongjuan">考生同卷</span>
          </div>
          <div class="mal-60">满分:100分</div>
          <div class="mal-60">使用次数:18次</div>
        </div>
        <div class="icon">
          <span class="el-icon-message mr-10"></span>
          <span class="el-icon-document mr-10"></span>
          <span class="el-icon-delete"></span>
        </div>
      </div>
      <div class="twoline">
        <p>4、JAVA程序设计-随堂检测</p>
      </div>
    </div>

    <div class="type mat-20">
      <div class="firstline">
        <div class="first">
          <span>创建时间:2022-05-09 18:33:20</span>
          <div class="textterm mal-50">
            <span class="term mr-10">期中考试</span>
            <span class="tongjuan">考生同卷</span>
          </div>
          <div class="mal-60">满分:100分</div>
          <div class="mal-60">使用次数:18次</div>
        </div>
        <div class="icon">
          <span class="el-icon-message mr-10"></span>
          <span class="el-icon-document mr-10"></span>
          <span class="el-icon-delete"></span>
        </div>
      </div>
      <div class="twoline">
        <p>5、JAVA程序设计-随堂检测</p>
      </div>
    </div>

    <div class="type mat-20">
      <div class="firstline">
        <div class="first">
          <span>创建时间:2022-05-09 18:33:20</span>
          <div class="textterm mal-50">
            <span class="term mr-10">期中考试</span>
            <span class="tongjuan">考生同卷</span>
          </div>
          <div class="mal-60">满分:100分</div>
          <div class="mal-60">使用次数:18次</div>
        </div>
        <div class="icon">
          <span class="el-icon-message mr-10"></span>
          <span class="el-icon-document mr-10"></span>
          <span class="el-icon-delete"></span>
        </div>
      </div>
      <div class="twoline">
        <p>6、JAVA程序设计期末考试试题</p>
      </div>
    </div>

    <div class="paging mat-20">
      <div>共1888题,100页</div>
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.questionbank {
  border: 1px solid black;
  padding: 15px 15px 35px 15px;
  margin-bottom: 35px;
  .classification {
    background-color: #f9f9f9;
    height: 132px;
    padding: 20px 15px;
  }
  .paper {
    display: flex;
    justify-content: space-between;
  }
  .exam .el-button,
  .form .el-button {
    background-color: #f9f9f9;
    color: #9a9898;
    line-height: 0;
    height: 15px;
  }
  .inp {
    width: 250px;
  }
  .type {
    height: 76px;
    border: 1px solid #e0e0e0;
    padding: 15px 15px;
    .firstline {
      color: #cdcccc;
      display: flex;
      justify-content: space-between;
      height: 20px;
    }
    .first {
      display: flex;
    }
    .term {
      width: 65px;
      height: 25px;
      text-align: center;
      font-size: 10px;
      background-color: #f45945;
      color: #fff;
    }
    .tongjuan {
      color: #fff;
      text-align: center;
      width: 65px;
      height: 25px;
      font-size: 10px;
      background-color: #72d9ca;
    }
    .icon {
      color: black;
      font-size: 20px;
    }
    .twoline {
      font-size: 22px;
    }
  }
  .paging {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
