<template>
  <el-table
    :data="tableData"
    :border="true"
    v-loading="loading"
    :row-key="rowKey"
    ref="multipleTable"
    style="width: 100%"
    :cell-style="{ 'text-align': 'center' }"
    :header-cell-style="{ 'text-align': 'center' }"
    @selection-change="handleSelectionChange"
    ><el-table-column v-if="selection" type="selection" width="55"> </el-table-column>
    <el-table-column v-if="showIndex" label="#" type="index" width="50"> </el-table-column>
    <el-table-column
      v-for="item in tableRow"
      :key="item.key"
      :fixed="item.fixed"
      :label="item.label"
      :width="item.width"
      :prop="item.key"
    >
      <template slot-scope="scope">
        <template v-if="item.key == 'operate'">
          <el-dropdown trigger="click" @command="command => operateEvent(scope.row, command)">
            <el-button type="primary" size="mini">
              操 作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="btn in item.btn" :key="btn.key" :command="btn.key">{{
                btn.dict ? btn.dict[scope.row[btn.link]] : btn.name
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else-if="item?.type == 'imger'">
          <el-image
            v-if="scope.row[item.key]"
            style="height: 80px; max-width: 100px"
            :src="scope.row[item.key]"
            :preview-src-list="[scope.row[item.key]]"
          >
          </el-image>
        </template>
        <template v-else-if="item?.type == 'slot'">
          <slot :name="item.key" :index="scope.$index"></slot>
        </template>
        <template v-else>
          <span>{{
            item.dict
              ? item.dict.find(dic => dic.val == scope.row[item.key]).text
              : scope.row[item.key]
          }}</span>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableRow: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      multipleSelection: [],
      multipleSelectionId: []
    }
  },
  computed: {},
  methods: {
    operateEvent(row, key) {
      this.$emit('operateEvent', { row, key })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.multipleSelectionId = val.map(item => item?.id)
    },
    clearSelection(rows) {
      this.$refs.multipleTable.clearSelection()
    },
    getMultipleSelection() {
      return this.multipleSelection
    },
    getIds() {
      return this.multipleSelectionId
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          const newRow = this.tableData?.find(item => item.id == row.roleId)
          newRow && this.$refs.multipleTable.toggleRowSelection(newRow)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-table .el-table__cell {
  padding: 0;
  height: 54px;
}
</style>
