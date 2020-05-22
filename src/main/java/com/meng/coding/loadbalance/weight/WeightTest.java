package com.meng.coding.loadbalance.weight;


import com.meng.coding.loadbalance.ServerIps;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class WeightTest {
    public static void main(String[] args) {
        // weight1();
        weight2();
    }


    public static void weight1(){
        List<String> ips = new ArrayList<String>();
        for(String ip: ServerIps.WEIGHT_LIST.keySet()){
            Integer weight = ServerIps.WEIGHT_LIST.get(ip);
            for(int i=0;i<weight;i++){
                ips.add(ip);
            }
        }
        Random random = new Random();
        int ran = random.nextInt(ips.size());
        System.out.println(ips.get(ran));
    }

    public static void weight2(){
        int total = 0;
        int[] position = new int[ServerIps.WEIGHT_LIST.size()];
        int i = 0;
        for (Integer weight : ServerIps.WEIGHT_LIST.values()){
            total += weight;
            position[i++] = total;
        }
        Random random = new Random();
        int ran = random.nextInt(total);
        i = 0;
       while (position[i] < ran){
           i++;
       }
        System.out.println(i);
    }
}
