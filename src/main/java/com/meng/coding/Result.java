package com.meng.coding;

public class Result<T> {

    private int statue;
    private String msg;
    private T data;


    public static void main(String[] args) {
        Result<A> result = new Result<A>();
        result.setData(new A());
        Result<B> resultB = new Result<B>();
        resultB.setData(new B());

        new AA();
    }

    public static class AA extends A{
        private int c;
    }


    public static class A{
        private int age;

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }


    public static class B{
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }









    public int getStatue() {
        return statue;
    }

    public void setStatue(int statue) {
        this.statue = statue;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
