/**
 * 遍历器Iterator是一种接口机制：为各种不同的数据结构提供统一的访问机制，
 * 任何数据只要部署Iterator接口，就可以完成遍历操作，依次处理该数据结构的所有成员
 *   + 拥有next方法用于依次遍历数据结构的所有成员
 *   + 每一次遍历返回的结果是一个对象 { done：false,value:xxx }
 *       -- done是否完成遍历  value当前遍历的结果
 *
 *  拥有Symbol.iterator属性的数据结构，被称为可遍历的，可以基于for of 循环处理
 *    + 数组
 *    + 部分类数组 arguments\NodeList\HTMLCollection...
 *    + String
 *    + Set
 *    + Map
 *    + generator object
 *    + ...
 * 对象默认不具备Symbol.iterator，属于不可遍历的数据结构
 */
class Iterator{
    constructor(arr){
        this.arr = arr;
        this.index = 0;
    }

    next(){
        let index = this.index, arr = this.arr;
        if(index > ar.length -1){
            return {
                done: true,
                value: undefined
            }
        }
        return {
            done: false,
            value:  arr[this.index++]
        }
    }
}