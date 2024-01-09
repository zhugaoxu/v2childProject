export function tablecol(that) {
  return [
    {
      label: "姓名",
      prop: "name",
      align: "center",
    },
    {
      label: "年龄",
      prop: "age",
      align: "center",
    },
    {
      label: "地址",
      prop: "address",
      align: "center",
    },
    {
      label: "订单号",
      prop: "order",
      align: "center",
    },
    {
      label: "颜色",
      prop: "color",
      align: "center",
    },
    {
      label: "商品",
      prop: "shop",
      align: "center",
      render: (h, scope) => {
        return h("el-checkbox", {
          props: {
            value: true,
            disabled: true,
          },
        });
      },
    },
    {
      label: "类别",
      prop: "type",
      align: "center",
      render: (h, scope) => {
        return h("span", {}, scope.row.type);
      },
    },
  ];
}
export function searchA(that) {
  return [
    {
      key: "name",
      type: "input",
      label: "输入框",
    },
    {
      key: "testB",
      type: "date",
      label: "日期框",
      attrs: {
        placeholder: "请选择日期",
      },
    },
    {
      key: "faultClassId",
      type: "select",
      label: "下拉框",
      options: that.receiveType,
      optionLabel: "dictValue",
      optionValue: "id",
    },
  ];
}

export function formConfigShow(that) {
  let formItemList = [
    {
      key: "testA",
      type: "input",
      label: "输入框1",
      attrs: {
        placeholder: "请输入猪猪",
      },
    },
    {
      key: "faultClassId",
      type: "select",
      label: "故障类型",
      options: that.receiveType,
      optionLabel: "dictValue",
      optionValue: "id",
      rules: {
        required: true,
        message: "请选择故障类型",
      },
    },
    {
      key: "processRemark",
      type: "input",
      subtype: "textarea",
      label: "处理描述",
      attrs: {
        rows: 4,
        showWordLimit: true,
        maxlength: 200,
      },
    },
  ];
  return {
    inline: true,
    formItemList: formItemList,
    labelPosition: "left",
    labelWidth:'auto'
  };
}
