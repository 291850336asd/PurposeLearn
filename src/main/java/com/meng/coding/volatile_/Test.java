package com.meng.coding.volatile_;

public class Test {

    private volatile int i;

    public static void main(String[] args) {

    }
}

/**
 * // class version 52.0 (52)
 * // access flags 0x21
 * public class com/meng/example/volatile_/Test {
 *
 *   // compiled from: Test.java
 *
 *   // access flags 0x42
 *   private volatile I i
 *
 *   // access flags 0x1
 *   public <init>()V
 *    L0
 *     LINENUMBER 3 L0
 *     ALOAD 0
 *     INVOKESPECIAL java/lang/Object.<init> ()V
 *     RETURN
 *    L1
 *     LOCALVARIABLE this Lcom/meng/example/volatile_/Test; L0 L1 0
 *     MAXSTACK = 1
 *     MAXLOCALS = 1
 *
 *   // access flags 0x9
 *   public static main([Ljava/lang/String;)V
 *    L0
 *     LINENUMBER 9 L0
 *     RETURN
 *    L1
 *     LOCALVARIABLE args [Ljava/lang/String; L0 L1 0
 *     MAXSTACK = 0
 *     MAXLOCALS = 1
 * }
 */