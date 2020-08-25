package com.meng.coding.tail_recursive;

public class Test {


    public static void main(String[] args) {
        System.out.println(getElementN(0, 1));
        System.out.println(getElementN(1, 1));
        System.out.println(getElementN(2, 1));
        System.out.println(getElementN(3, 1));
    }

    /**
     * 递归法改进（尾递归：当递归调用是函数体中最后执行的语句并且它的返回值不属于表达式的一部分时，即就是调用自己，这个递归就是尾递归）
     * （可以发现在上面的递归中在 n 过大的时候，计算过程中的栈帧也会非常的大）；
     * 尾递归肯定会创建栈帧，但是是可以复用栈帧（一个栈帧做完了所有的事情）。
     * 编译器会检测到尾递归的形式并且进行优化，在函数调用前先把栈给设置好，调用完成后再恢复栈的这个操作
     *
     */
    public static int getElementN(int n, int result){
        if(n< 0 ){
            throw new RuntimeException("n < 0");
        }
        if(n == 1 || n == 0){
            return result;
        }
        else return  getElementN(n -1, result * n);
    }


    public static int method2(int n) {
        if (n < 1) {
            throw new RuntimeException("n < 0");
        }
        if (n == 1) {
            return n;
        }
        return n * method2(n - 1);
    }

}
