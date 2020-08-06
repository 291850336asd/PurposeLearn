package com.meng.coding;

public class MxTest {

    public static void main(String[] args) {
        for (int i = 1; i <= 32; i++) {
//            if(i%2 == 0){
//                sql(i);
//            }
         //   sqlLog(i);
            prd(i);
        }

       // System.out.println(13010%32 +1);
    }


    public static void prd(int i){
        String shard = i >= 10 ? String.valueOf(i) : "0" + i;
        int clu = 5 - i%2;
        String info = "var args = {\"sqldb\":$.toJSON({\"name\":\"mx_user_auth" + i + "_R\",\"notes\":\"\",\"type\":\"mysql\"," +
                "\"url\":\"jdbc:mysql://hmx-clu0" + clu + "-mysql-slave.inc-mtime.com:8806/mx_user_auth_shard_" + shard + "\"" +
                ",\"user\":\"mx_user_auth_shard_" + shard + "_ro\"," +
                "\"pwd\":\"u0S9ZsFgrEQd8wRmzalV\",\"options\":[]})};\n" +
                "\n" +
                "$.request(\"/db/sql/AddSQL\", args, function (r) {\n" +
                "                if (r.success) {\n" +
                "                } else {\n" +
                "                    $alert(\"错误\", r.error);\n" +
                "            }\n" +
                "        });\n" +
                "\n" +
                "var args = {\"sqldb\":$.toJSON({\"name\":\"mx_user_auth" + i + "_W\",\"notes\":\"\",\"type\":\"mysql\"," +
                "\"url\":\"jdbc:mysql://hmx-clu0" + clu + "-mysql-master.inc-mtime.com:8806/mx_user_auth_shard_" + shard + "\"," +
                "\"user\":\"mx_user_auth_shard_" + shard + "_rw\"," +
                "\"pwd\":\"CNYBHzdx63gZDEVLPU25\",\"options\":[]})};\n" +
                "$.request(\"/db/sql/AddSQL\", args, function (r) {\n" +
                "                if (r.success) {\n" +
                "                } else {\n" +
                "                    $alert(\"错误\", r.error);\n" +
                "            }\n" +
                "        });";
        System.out.println(info);
    }





    public static void sqlLog(int i){
        String shard = i >= 10 ? String.valueOf(i) : "0" + i;
        String sql = "CREATE TABLE mx_user_auth_shard_" + shard + ".`loginlog_2020` (\n" +
                "  `userid` bigint(20) DEFAULT NULL,\n" +
                "  `user_type` int(11) DEFAULT NULL COMMENT '1. front user\\n            2. admin user',\n" +
                "  `mobile` varchar(32) DEFAULT NULL,\n" +
                "  `ip` varchar(32) DEFAULT NULL,\n" +
                "  `gps_y` double(11,7) DEFAULT NULL,\n" +
                "  `gps_x` double(11,7) DEFAULT NULL,\n" +
                "  `devicetoken` varchar(32) DEFAULT NULL,\n" +
                "  `login_time` datetime DEFAULT NULL,\n" +
                "  `log_type` int(11) DEFAULT NULL,\n" +
                "  `mobile_type` int(11) DEFAULT NULL COMMENT '1.ios   2.安卓   3.wp',\n" +
                "  `login_channel` varchar(50) DEFAULT NULL,\n" +
                "  `id` int(11) NOT NULL AUTO_INCREMENT,\n" +
                "  `login_app_version` varchar(32) DEFAULT NULL,\n" +
                "  PRIMARY KEY (`id`)\n" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
                "CREATE TABLE mx_user_auth_shard_" + shard + ".`loginlog_2021` (\n" +
                "  `userid` bigint(20) DEFAULT NULL,\n" +
                "  `user_type` int(11) DEFAULT NULL COMMENT '1. front user\\n            2. admin user',\n" +
                "  `mobile` varchar(32) DEFAULT NULL,\n" +
                "  `ip` varchar(32) DEFAULT NULL,\n" +
                "  `gps_y` double(11,7) DEFAULT NULL,\n" +
                "  `gps_x` double(11,7) DEFAULT NULL,\n" +
                "  `devicetoken` varchar(32) DEFAULT NULL,\n" +
                "  `login_time` datetime DEFAULT NULL,\n" +
                "  `log_type` int(11) DEFAULT NULL,\n" +
                "  `mobile_type` int(11) DEFAULT NULL COMMENT '1.ios   2.安卓   3.wp',\n" +
                "  `login_channel` varchar(50) DEFAULT NULL,\n" +
                "  `id` int(11) NOT NULL AUTO_INCREMENT,\n" +
                "  `login_app_version` varchar(32) DEFAULT NULL,\n" +
                "  PRIMARY KEY (`id`)\n" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
                "CREATE TABLE mx_user_auth_shard_" + shard + ".`loginlog_2022` (\n" +
                "  `userid` bigint(20) DEFAULT NULL,\n" +
                "  `user_type` int(11) DEFAULT NULL COMMENT '1. front user\\n            2. admin user',\n" +
                "  `mobile` varchar(32) DEFAULT NULL,\n" +
                "  `ip` varchar(32) DEFAULT NULL,\n" +
                "  `gps_y` double(11,7) DEFAULT NULL,\n" +
                "  `gps_x` double(11,7) DEFAULT NULL,\n" +
                "  `devicetoken` varchar(32) DEFAULT NULL,\n" +
                "  `login_time` datetime DEFAULT NULL,\n" +
                "  `log_type` int(11) DEFAULT NULL,\n" +
                "  `mobile_type` int(11) DEFAULT NULL COMMENT '1.ios   2.安卓   3.wp',\n" +
                "  `login_channel` varchar(50) DEFAULT NULL,\n" +
                "  `id` int(11) NOT NULL AUTO_INCREMENT,\n" +
                "  `login_app_version` varchar(32) DEFAULT NULL,\n" +
                "  PRIMARY KEY (`id`)\n" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
                "CREATE TABLE mx_user_auth_shard_" + shard + ".`loginlog_2023` (\n" +
                "  `userid` bigint(20) DEFAULT NULL,\n" +
                "  `user_type` int(11) DEFAULT NULL COMMENT '1. front user\\n            2. admin user',\n" +
                "  `mobile` varchar(32) DEFAULT NULL,\n" +
                "  `ip` varchar(32) DEFAULT NULL,\n" +
                "  `gps_y` double(11,7) DEFAULT NULL,\n" +
                "  `gps_x` double(11,7) DEFAULT NULL,\n" +
                "  `devicetoken` varchar(32) DEFAULT NULL,\n" +
                "  `login_time` datetime DEFAULT NULL,\n" +
                "  `log_type` int(11) DEFAULT NULL,\n" +
                "  `mobile_type` int(11) DEFAULT NULL COMMENT '1.ios   2.安卓   3.wp',\n" +
                "  `login_channel` varchar(50) DEFAULT NULL,\n" +
                "  `id` int(11) NOT NULL AUTO_INCREMENT,\n" +
                "  `login_app_version` varchar(32) DEFAULT NULL,\n" +
                "  PRIMARY KEY (`id`)\n" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        System.out.println(sql);
    }


    public static void sql(int i){
        String shard = i >= 10 ? String.valueOf(i) : "0" + i;
        System.out.println("INSERT INTO mx_user_auth_shard_" + shard + ".birthday_update_log(user_id, `count`,birthday,create_time, update_time) SELECT user_id, `count`,birthday,create_time, update_time FROM mx_userauth_01.birthday_update_log WHERE shard_no = " + i + ";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".devicetoken(userid, devicetoken,mobile_type,last_login_time) SELECT userid, devicetoken,mobile_type,last_login_time FROM mx_userauth_01.devicetoken where shard_no = " + i + ";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".login_last_info(userid, login_time,cityid,city_name,login_num,login_ip,last_time,login_channel,login_app_version) SELECT userid, login_time,cityid,city_name,login_num,login_ip,last_time,login_channel,login_app_version FROM mx_userauth_01.login_last_info where shard_no = " + i + ";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".mobilemap(mobile, userid, user_type) SELECT mobile, userid, user_type FROM mx_userauth_01.mobilemap where shard_no = " + i + ";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".third_openid(openid, third_type, userid,createtime,access_token,bind_mobile,`subject`,wx_nick_name,wx_head_url) SELECT openid, third_type, userid,createtime,access_token,bind_mobile,`subject`,wx_nick_name,wx_head_url FROM mx_userauth_01.third_openid where shard_no = "+ i +";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".userauthinfo(id, username, mobile,pay_password,salt,email,year_month_day,mobile_isveri,email_isveri,create_time,register_type,register_subject,register_subject_user,update_time,user_plat,label_id,label_start_time,label_end_time,register_channel_code) " +
                "SELECT id, username, mobile,pay_password,salt,email,year_month_day,mobile_isveri,email_isveri,create_time,register_type,register_subject,register_subject_user,update_time,user_plat,label_id,label_start_time,label_end_time,register_channel_code  FROM mx_userauth_01.userauthinfo where shard_no = "+ i +";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".usersubjectinfo(id,user_id, subject,subject_user) SELECT id,user_id, subject,subject_user  FROM mx_userauth_01.usersubjectinfo where shard_no = " + i + ";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".user_city_cinema(id,user_id, city_id,cinema_id, is_delete, create_time,update_time) SELECT id,user_id, city_id,cinema_id, is_delete, create_time,update_time  FROM mx_userauth_01.user_city_cinema where shard_no = " + i + ";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".user_third_openid(id,user_id, open_id, third_type) SELECT id,user_id, open_id, third_type  FROM mx_userauth_01.user_third_openid where shard_no = " + i + ";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".user_third_channel(userid, channel_id, create_time) SELECT userid, channel_id, create_time  FROM mx_userauth_01.user_third_channel where shard_no = " + i + ";");
        System.out.println("insert into mx_user_auth_shard_" + shard + ".user_third_head_nick(id,user_id, third_type,create_time, update_time,subject,nick_name,head_url) SELECT id,user_id, third_type,create_time, update_time,subject,nick_name,head_url  FROM mx_userauth_01.user_third_head_nick where shard_no = " + i + ";");







    }
}
