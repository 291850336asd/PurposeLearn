package com.meng.coding.loadbalance.smoothweightroundrobin;

import java.util.HashMap;
import java.util.Map;

public class Test {

    private static Map<String,Weight> weights = new HashMap<String, Weight>();
    public static void main(String[] args) {
        weights.put("192.168.0.1", new Weight("192.168.0.1", 5, 0));
        weights.put("192.168.0.2", new Weight("192.168.0.2", 1, 0));
        weights.put("192.168.0.3", new Weight("192.168.0.3", 1, 0));
        for(int i=0;i<=10;i++){
           getCurrentIp();
        }
    }

    public static void getCurrentIp(){
        int totalWeight = 0;
        for(Weight weight: weights.values()){
            totalWeight += weight.getWeight();
            weight.setCurrentWeight(weight.getCurrentWeight() + weight.getWeight());
        }
        Weight maxCurrentWeight = null;
        for(Weight weight: weights.values()){
            if(maxCurrentWeight == null || weight.getCurrentWeight() > maxCurrentWeight.getCurrentWeight()){
                maxCurrentWeight = weight;
            }
        }
        maxCurrentWeight.setCurrentWeight(maxCurrentWeight.getCurrentWeight()- totalWeight);
        System.out.println(maxCurrentWeight.getIp());
    }
}
