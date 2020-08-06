package com.meng.coding.asm.asm_class.analysis_class;

import jdk.internal.org.objectweb.asm.ClassReader;

import java.io.IOException;

public class Test {
    public static void main(String[] args) throws IOException {
        ClassPrinter cp = new ClassPrinter();
        ClassReader cr = new ClassReader("java.lang.Runnable");
        cr.accept(cp, 0);
    }
}
