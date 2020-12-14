package com.meng.coding;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class Test {
    public static void main(String[] args) {

        System.out.println(Math.abs("13040303114".hashCode())%32 + 1);//1002747124
        System.out.println(Math.abs("17262793227".hashCode())%32 + 1);//1001033779
        System.out.println(Math.abs("oz60_tzw7VyyXF6T4NuU5BMv4ZuE_1".hashCode())%32 + 1);//1001033779
//        System.out.println(Math.abs("15015166536".hashCode())%32 + 1);

        System.out.println(1002747124%32 + 1);

    }

}
