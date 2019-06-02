const TYPE = [{
    label: '类型1',
    value: '0'
}, {
    label: '类型2',
    value: '1'
}]
export const basicComponents = [{
    label: '输入框',
    prop: 'input',
    span: 12

}, {
    label: '选择框',
    prop: 'select',
    type: 'select',
    dicData: TYPE,
    span: 12

}, {
    label: '数字框',
    prop: 'number',
    type: 'number',
    span: 12
}, {
    label: '单选框',
    prop: 'radio',
    type: 'radio',
    dicData: TYPE,
    span: 12

}, {
    label: '多选框',
    prop: 'checkbox',
    type: 'checkbox',
    dicData: TYPE,
    span: 12

}, {
    label: '日期时间框',
    prop: 'datetime',
    type: 'datetime',
    span: 12

}, {
    label: '日期框',
    prop: 'date',
    type: 'date',
    span: 12

}, {
    label: '时间框',
    prop: 'time',
    type: 'time',
    span: 12

}, {
    label: '日期时间范围框',
    prop: 'datetimerange',
    type: 'datetimerange',
    span: 12

}, {
    label: '日期范围框',
    prop: 'daterange',
    type: 'daterange',
    span: 12

}, {
    label: '时间范围框',
    prop: 'timerange',
    type: 'timerange',
    span: 12

}, {
    label: '开关框',
    prop: 'switch',
    type: 'switch',
    dicData: TYPE,
    span: 12

}, {
    label: '滑动',
    prop: 'silder',
    type: 'silder',
    span: 12

}, {
    label: '多行文本框',
    prop: 'textarea',
    type: 'textarea',
    span: 12,
    minRows: 6
}]

export const advanceComponents = [{
    label: '树形框',
    prop: 'tree',
    type: 'tree',
    span: 12

}]
export const layoutComponents = []