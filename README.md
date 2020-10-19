"# PurposeLearn" 

负载均衡算法 com.meng.coding.loadbalance  
全局唯一id   com.meng.coding.globalunique  
spi          com.meng.coding.spi

查找压缩文件中的内容
zcat xxx.tar.gz|grep --binary-files=text '17759111701'

查找统计
grep "会员手机号数据异常，手机号映射表" problem.log* | awk  '{print substr($0,length($0)-11)}' |wc -l