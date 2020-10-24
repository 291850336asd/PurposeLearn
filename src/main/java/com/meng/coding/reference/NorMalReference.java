package com.meng.coding.reference;

import java.io.IOException;

public class NorMalReference {

    public static void main(String[] args) throws IOException {
        M m = new M();
        m = null;
        System.gc();
        System.in.read();
    }
}
