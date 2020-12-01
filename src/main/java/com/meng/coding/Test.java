package com.meng.coding;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class Test {
    public static void main(String[] args) {

        System.out.println(Math.abs("C3330000000079354134".hashCode())%32 + 1);//1020555
        System.out.println(Math.abs("18105075275".hashCode())%32 + 1);//1001033779
//        System.out.println(Math.abs("15015166536".hashCode())%32 + 1);

        System.out.println(1002745117%32 + 1);

    }

}
