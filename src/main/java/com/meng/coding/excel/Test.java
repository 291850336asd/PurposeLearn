package com.meng.coding.excel;


import org.dhatim.fastexcel.Workbook;
import org.dhatim.fastexcel.Worksheet;
import org.dhatim.fastexcel.reader.ReadableWorkbook;
import org.dhatim.fastexcel.reader.Row;
import org.dhatim.fastexcel.reader.Sheet;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;

public class Test {
    //xlsx 07 表格最大行数是1048576行
    //xls 03   65536
    public static void main(String[] args) {
//        write();
//        read();
    }

    public static void read(){
        long t1 = new Date().getTime();
        AtomicLong ii = new AtomicLong(0);
        try (InputStream is = new FileInputStream("C:\\Users\\mtime\\Desktop\\工作\\会员明细.xlsx"); ReadableWorkbook wb = new ReadableWorkbook(is)) {
            Sheet sheet = wb.getFirstSheet();
            try (Stream<Row> rows = sheet.openStream()) {
                rows.forEach(r -> {
                    int cellCount = r.getCellCount();
                    for (int i = 0; i < cellCount; i++) {
                        System.out.println(r.getCell(i).getText());
                        System.out.println(r.getCell(i).getRawValue());
                    }
                    System.out.println();
                    ii.incrementAndGet();
                });
            }
            System.out.println(new Date().getTime() - t1);
            System.out.println(ii.floatValue());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void write(){
        //        try (OutputStream os = new FileOutputStream("C:\\Users\\mtime\\Desktop\\工作\\1.xls")) {
        try (OutputStream os = new FileOutputStream("C:\\Users\\mtime\\Desktop\\工作\\7.xlsx")) {
            Workbook wb = new Workbook(os, "MyApplication", "1.0");
            long t1 = new Date().getTime();
            Worksheet ws = wb.newWorksheet("Sheet 1");
            for (int i = 0; i < 900000; i++) {
                ws.value(i, 0, "This is a string in A1");
                ws.value(i, 1, "This is a string in A1");
                ws.value(i, 2, "sdsd");
                ws.value(i, 3, "Esdsdsdsdsdsdsdsdsdsdsdsdsd");
                ws.value(i, 4, "1234567890987");
                ws.value(i, 5, "Esdsdsdsdsdsdsdsdsdsdsdsdsd");
            }
            wb.finish();
            System.out.println(new Date().getTime() - t1);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
