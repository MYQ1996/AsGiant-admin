<template>
  <section>
    <el-card class="box-card tableField">
      <h4 class="title">{{columnName}}栏目</h4>
       <avue-crud :option="option"
                 :data="data" 
                 @on-load="onLoad"
                 @row-save="handleSave"
                 @row-del="handleDel"
                 :table-loading="tableLoading"
                 @refresh-change="refreshChange"
                 @row-dblclick="handleRowClick">
      </avue-crud>
    </el-card>
  </section>
</template>

<script>
import * as Info from '@/api/info'
import * as sysJson from '@/const/sysJson'
// import * as databaseLogic from '@/network/model/databaseLogic'
import {pageConfig} from './pageConfig'
export default {
  name: 'tableField',
  data () {
    return {
      columnid: '',
      columnName: '',
      tableLoading: false,
      data: [],
      option: pageConfig
    }
  },
  created () {
    this.columnid = this.$route.query.columnid
    this.columnName = this.$route.query.columnName
    this.column = this.$route.query.column
    this.loadTableFieldList()
  },
  methods: {
    // 加载函数
    onLoad() {
      this.loadTableFieldList()
    },
    loadTableFieldList () {
      this.tableLoading = true
      let data = {
        infoJson: {
          'table_form': this.column
        },
        classid :sysJson.sysClassid.programClassid
      }
      Info.checkField(data)
      .then(res => {
        this.data = res.data.msg
        this.tableLoading = false
      })
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd () {
      this.$refs.crud.rowAdd()
    },
    /**
     * @title 获取数据
     * @detail 赋值为tableData表格即可
     *
     **/
    handleList () {
      this.tableLoading = true
      this.$store
        .dispatch('GetUserData', {
          page: `${this.tablePage}`
        })
        .then(data => {
          setTimeout(() => {
            this.tableData = data.tableData
            this.page = {
              total: data.total,
              pageSize: data.pageSize
            }
            this.tableLoading = false
          }, 1000)
        })
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave (row, done) {
      // this.tableData.push(row);
      let data = {
        'column': row.column.slice(5),
        'columnName': row.columnName
      }
      // databaseLogic.newTable(data, (res) => {
      //   if (res.flag === 1) {
      //     this.$message({
      //       showClose: true,
      //       message: '添加成功',
      //       type: 'success'
      //     })
      //     done()
      //     this.loadTableFieldList()
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: res.msg,
      //       type: 'error'
      //     })
      //   }
      // })
    },
    /**
     * @title 数据删除
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     *
     **/
    handleDel (row, index) {
      this.$confirm(`是否确认删除数据库名${row.column}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let data = {
            column: row.column.slice(5)
          }
          // databaseLogic.deleTable(data, (res) => {
          //   if (res.flag === 1) {
          //     this.$message({
          //       showClose: true,
          //       message: '删除成功',
          //       type: 'success'
          //     })
          //     this.loadTableFieldList()
          //   } else {
          //     this.$message({
          //       showClose: true,
          //       message: res.msg,
          //       type: 'error'
          //     })
          //   }
          // })
        })
      // .catch(err => {})
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate (row, index, done) {
      let data = {
        'infoJson': {
          'column': row.column.slice(5),
          'columnName': row.columnName
        },
        'columnid': row.columnid
      }
      // databaseLogic.updateTable(data, (res) => {
      //   if (res.flag === 1) {
      //     this.$message({
      //       showClose: true,
      //       message: '修改成功',
      //       type: 'success'
      //     })
      //     done()
      //     this.loadTableFieldList()
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: res.msg,
      //       type: 'error'
      //     })
      //   }
      // })
    },
    /**
     * @title 刷新数据
     *
     **/
    handlerefreshChange () {
      this.loadTableFieldList()
    }

  }
}

</script>
