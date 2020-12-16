package com.meng.coding;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class Test {
    public static void main(String[] args) {

        System.out.println(Math.abs("E849000000040542324".hashCode())%32 + 1);//1002747124
        System.out.println(Math.abs("E100035000000040633670".hashCode())%32 + 1);//1001033779
        System.out.println(Math.abs("E849000000040542324".hashCode())%32 + 1);//1001033779
//        System.out.println(Math.abs("15015166536".hashCode())%32 + 1);

        System.out.println(1002747124%32 + 1);

    }

}
