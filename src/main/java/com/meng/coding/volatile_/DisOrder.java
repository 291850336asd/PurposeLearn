package com.meng.coding.volatile_;

/**
 * 乱序执行，指令重排序
 */
public class DisOrder {

    private static int x=0, y=0;
    private static int a=0, b=0;


    public static void main(String[] args) throws InterruptedException {
        int i = 0;
        for(;;){
            i++;
            x= 0;
            y=0;
            a=0;
            b=0;
            Thread one = new Thread(new Runnable() {
                @Override
                public void run() {
                    a = 1;
                    x = b;
                }
            });
            Thread two = new Thread(new Runnable() {
                @Override
                public void run() {
                    b = 1;
                    y = a;
                }
            });
            one.start();
            two.start();
            one.join();
            two.join();
            String result = "第" + i + "次 （" + x + ", " + y + ")";
            if(x== 0 && y == 0){
                //若不存在指令重排序，理论上不会出现这种情况
                System.out.println(result);
                break;
            }
        }
    }
}
