package com.meng.coding;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {

        System.exit(1);
////        System.out.println( Math.abs("15510010709".hashCode())%8 +1 );//8  32  E304000000040539181   8   24
//        sql(32,8,24,8,"15510010709","E304000000040539181");
////        System.out.println( Math.abs("18511077646".hashCode())%8 +1 );//3  11  E849000000040538810   2   18
//        sql(11,3,18,2,"18511077646","E849000000040538810");
////        System.out.println( Math.abs("13301315680".hashCode())%8 +1 );//8  24  E16000000025324406    7   15
//        sql(24,8,15,7,"13301315680","E16000000025324406");
////        System.out.println( Math.abs("15201864878".hashCode())%8 +1 );//3  19  E849000000000368903   2   2
//        sql(19,3,2,2,"15201864878","E849000000000368903");
////        System.out.println( Math.abs("13439845465".hashCode())%8 +1 );//3  19  E16000000040000016    8   8
//        sql(19,3,8,8,"13439845465","E16000000040000016");
////        System.out.println( Math.abs("15001002239".hashCode())%8 +1 );//6  14  E036000000040526264   6   22
//        sql(14,6,22,6,"15001002239","E036000000040526264");
////        System.out.println( Math.abs("15801473698".hashCode())%8 +1 );//3  27  E849000000040540450   3   19
//        sql(27,3,19,3,"15801473698","E849000000040540450");
////        System.out.println( Math.abs("15801473699".hashCode())%8 +1 );//4  28  E849000000040539295   8   8
//        sql(28,4,8,8,"15801473699","E849000000040539295");
////        System.out.println( Math.abs("12222222222".hashCode())%8 +1 );//2  18  E849000000040540499   8   24
//        sql(18,2,24,8,"12222222222","E849000000040540499");
////        System.out.println( Math.abs("12222222223".hashCode())%8 +1 );//3  19  E849000000040538996   1   17
//        sql(19,3,17,1,"12222222223","E849000000040538996");
////        System.out.println( Math.abs("12222222224".hashCode())%8 +1 );//4  20  E849000000040538998   3   19
//        sql(20,4,19,3,"12222222224","E849000000040538998");
////        System.out.println( Math.abs("12222222225".hashCode())%8 +1 );//5  21  E849000000040539357   7   15
//        sql(21,5,15,7,"12222222225","E849000000040539357");
////        System.out.println( Math.abs("12222222226".hashCode())%8 +1 );//6  22  E849000000040539002   4   12
//        sql(22,6,12,4,"12222222226","E849000000040539002");
////        System.out.println( Math.abs("12222222227".hashCode())%8 +1 );//7  23  E849000000040539369   8   16
//        sql(23,7,16,8,"12222222227","E849000000040539369");
////        System.out.println( Math.abs("12222222228".hashCode())%8 +1 );//8  24  E29000000040505863    4   28
//        sql(24,8,28,4,"12222222228","E29000000040505863");
////        System.out.println( Math.abs("12222222229".hashCode())%8 +1 );//1  25  E29000000040538937    4   4
//        sql(25,1,4,4,"12222222229","E29000000040538937");
        sql(Math.abs("15901279448".hashCode())%32 +1,
                Math.abs("15901279448".hashCode())%8 +1,
                Math.abs("E849000000040539030".hashCode())%32 +1,
                Math.abs("E849000000040539030".hashCode())%8 +1,
                "15901279448","E849000000040539030");




    }


    public static   void sql(int mobileShard1, int rawMobile,int memShard1, int rawMem,String mobile, String memberNo){
        String mobileShard = mobileShard1 > 9 ? String.valueOf(mobileShard1) : "0"+ mobileShard1;
        String memShard = memShard1 > 9 ? String.valueOf(memShard1) : "0"+ memShard1;
        System.out.println("INSERT INTO cmc_member_shard_" + mobileShard + ".`mobile_member_map` SELECT * FROM cmcmember" + rawMobile + ".`mobile_member_map` WHERE mobile = '" + mobile + "';");
        System.out.println("INSERT INTO cmc_member_shard_" + memShard + ".`contraint_member` SELECT * FROM cmcmember" + rawMem + ".`contraint_member` WHERE member_no = '" + memberNo + "';");
        System.out.println("INSERT INTO cmc_member_shard_" + memShard + ".`member_contact_rel` SELECT * FROM cmcmember" + rawMem +".`member_contact_rel` WHERE  member_no = '" + memberNo + "';");
        System.out.println("INSERT INTO cmc_member_shard_" + memShard + ".`member_convert` SELECT * FROM cmcmember" + rawMem + ".`member_convert` WHERE  member_no = '" + memberNo + "';");
        System.out.println("INSERT INTO cmc_member_shard_" + memShard + ".`member_filmtype_rel` SELECT * FROM cmcmember" + rawMem + ".`member_filmtype_rel` WHERE  member_no = '" + memberNo + "';");
        System.out.println("INSERT INTO cmc_member_shard_" + memShard + ".`mx_member_cinema_inner_code` SELECT * FROM cmcmember" + rawMem + ".`mx_member_cinema_inner_code` WHERE  member_no = '" + memberNo + "';");
        System.out.println("INSERT INTO cmc_member_shard_" + memShard + ".`t_login_log` SELECT * FROM cmcmember" + rawMem + ".`t_login_log` WHERE  member_no = '" + memberNo + "';");
        System.out.println("INSERT INTO cmc_member_shard_" + memShard + ".`t_member_info`" +
                "(`member_no`, `member_id`, `birthday`, `gender`, `nickname`, `channel_id`, `channel_ext_id`, `regist_cinema_id`, `manage_cinema_id`, `education`, `occupation`, `income`, `marry_status`, `child_num`, `contractable`, `arrival_type`, `offen_channel`, `fq_cinema_dist`, `fq_cinema_time`, `id_card_no`, `id_card_hash_no`, `identity_type`, `mobile_optin`, `weibo`, `qq`, `douban`, `address1`, `address2`, `address3`, `address4`, `country_id`, `province_id`, `city_id`, `zip_code`, `create_time`, `operator_id`, `operator_name`, `level`, `points`, `update_time`, `regiest_type`, `old_member_id`, `mobile`, `recruit_employee_no`, `recruit_employee_name`, `email`, `head_url`, `status`, `is_delete`, `phone`, `register_channel_code`, `shard_no`) " +
                "SELECT `member_no`, `member_id`, `birthday`, `gender`, `nickname`, `channel_id`, `channel_ext_id`, `regist_cinema_id`, `manage_cinema_id`, `education`, `occupation`, `income`, `marry_status`, `child_num`, `contractable`, `arrival_type`, `offen_channel`, `fq_cinema_dist`, `fq_cinema_time`, `id_card_no`, `id_card_hash_no`, `identity_type`, `mobile_optin`, `weibo`, `qq`, `douban`, `address1`, `address2`, `address3`, `address4`, `country_id`, `province_id`, `city_id`, `zip_code`, `create_time`, `operator_id`, `operator_name`, `level`, `points`, `update_time`, `regiest_type`, `old_member_id`, `mobile`, `recruit_employee_no`, `recruit_employee_name`, `email`, `head_url`, `status`, `is_delete`, `phone`, `register_channel_code`, `shard_no` " +
                "FROM cmcmember" + rawMem + ".`t_member_info` WHERE  member_no = '" + memberNo + "';");
        System.out.println("INSERT INTO cmc_member_shard_" + memShard + ".`t_mobile_log` SELECT * FROM cmcmember" + rawMem + ".`t_mobile_log` WHERE  member_no = '" + memberNo + "';");
        System.out.println();
    }
}