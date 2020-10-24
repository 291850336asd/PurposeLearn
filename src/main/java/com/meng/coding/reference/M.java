package com.meng.coding.reference;

public class M {

    /**
     * 重写此方法容易产生OOM 测试使用
     * @throws Throwable
     */
    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        System.out.println("finalize");
    }
}
