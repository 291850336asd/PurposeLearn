package com.meng.coding;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class Test {
    public static void main(String[] args) {

        System.out.println(Math.abs("13570346391".hashCode())%32 + 1);//1002747124
        System.out.println(Math.abs("C3700000000030448504".hashCode())%32 + 1);//1002747124
        System.out.println(Math.abs("13122223333".hashCode())%32 + 1);//1001033779
        System.out.println(Math.abs("13133334444".hashCode())%32 + 1);//1001033779
        System.out.println(Math.abs("12345678342".hashCode())%32 + 1);//1001033779
//        System.out.println(Math.abs("C1250000000082126007".hashCode())%32 + 1);//1001033779
////        System.out.println(Math.abs("15015166536".hashCode())%32 + 1);
//
        System.out.println(1106912642%32 + 1);
    }



}