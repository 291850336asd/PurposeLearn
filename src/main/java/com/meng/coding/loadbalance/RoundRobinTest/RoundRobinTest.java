package com.meng.coding.loadbalance.RoundRobinTest;

import com.meng.coding.ServerIps;

public class RoundRobinTest {


    public static Integer poss = 0;
    public static void main(String[] args) {
        for (int i =0; i<=100; i++){
            synchronized (poss){
                if(poss >= ServerIps.LIST.size()){
                    poss = 0;
                }
                System.out.println(ServerIps.LIST.get(poss));
                poss++;
            }
        }
    }
}
