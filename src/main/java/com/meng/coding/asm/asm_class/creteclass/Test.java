package com.meng.coding.asm.asm_class.creteclass;

import jdk.internal.org.objectweb.asm.ClassWriter;
import jdk.internal.org.objectweb.asm.util.TraceClassVisitor;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;

import static jdk.internal.org.objectweb.asm.Opcodes.*;

public class Test {

    public static void main(String[] args) throws IOException {
        /**
         * package pkg;
         *     public interface Comparable extends Mesurable {
         *       int LESS = -1;
         *       int EQUAL = 0;
         *       int GREATER = 1;
         *       int compareTo(Object o);
         * }
         */
     //  test1();
        test2();
    }

    private static void test2() throws IOException {
        ClassWriter cw = new ClassWriter(0);
        TraceClassVisitor cv = new TraceClassVisitor(cw, new PrintWriter(System.out));
        cv.visit(V1_5, ACC_PUBLIC + ACC_ABSTRACT + ACC_INTERFACE,
                "pkg/Comparable", null, "java/lang/Object",
                new String[] { "pkg/Mesurable" });
        cv.visitField(ACC_PUBLIC + ACC_FINAL + ACC_STATIC, "LESS", "I",
                null, new Integer(-1)).visitEnd();
        cv.visitField(ACC_PUBLIC + ACC_FINAL + ACC_STATIC, "EQUAL", "I",
                null, new Integer(0)).visitEnd();
        cv.visitField(ACC_PUBLIC + ACC_FINAL + ACC_STATIC, "GREATER", "I",
                null, new Integer(1)).visitEnd();
        cv.visitMethod(ACC_PUBLIC + ACC_ABSTRACT, "compareTo",
                "(Ljava/lang/Object;)I", null, null).visitEnd();
        cv.visitEnd();
        byte[] b = cw.toByteArray();
        System.out.println(new String(b));

        //将cw转换成字节数组写到文件里面去
        byte[] data = cw.toByteArray();
        File file = new File("D://Comparable1.class");
        FileOutputStream fout = new FileOutputStream(file);
        fout.write(data);
        fout.close();

//        MyClassLoader myClassLoader = new MyClassLoader();
//        Class c = myClassLoader.defineClass("pkg.Comparable", b);
//        System.out.println(c.getName());
    }

    private static void test1() throws IOException {
        ClassWriter cw = new ClassWriter(0);

        cw.visit(V1_5, ACC_PUBLIC + ACC_ABSTRACT + ACC_INTERFACE,
                "pkg/Comparable", null, "java/lang/Object",
                new String[] { "pkg/Mesurable" });
        cw.visitField(ACC_PUBLIC + ACC_FINAL + ACC_STATIC, "LESS", "I",
                null, new Integer(-1)).visitEnd();
        cw.visitField(ACC_PUBLIC + ACC_FINAL + ACC_STATIC, "EQUAL", "I",
                null, new Integer(0)).visitEnd();
        cw.visitField(ACC_PUBLIC + ACC_FINAL + ACC_STATIC, "GREATER", "I",
                null, new Integer(1)).visitEnd();
        cw.visitMethod(ACC_PUBLIC + ACC_ABSTRACT, "compareTo",
                "(Ljava/lang/Object;)I", null, null).visitEnd();
        cw.visitEnd();
        byte[] b = cw.toByteArray();
        System.out.println(new String(b));

        //将cw转换成字节数组写到文件里面去
        byte[] data = cw.toByteArray();
        File file = new File("D://Comparable.class");
        FileOutputStream fout = new FileOutputStream(file);
        fout.write(data);
        fout.close();

//        MyClassLoader myClassLoader = new MyClassLoader();
//        Class c = myClassLoader.defineClass("pkg.Comparable", b);
//        System.out.println(c.getName());
    }

}
