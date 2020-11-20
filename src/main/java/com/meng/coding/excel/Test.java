package com.meng.coding.excel;


import org.dhatim.fastexcel.Color;
import org.dhatim.fastexcel.Workbook;
import org.dhatim.fastexcel.Worksheet;
import org.dhatim.fastexcel.reader.ReadableWorkbook;
import org.dhatim.fastexcel.reader.Row;
import org.dhatim.fastexcel.reader.Sheet;

import java.io.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;

public class Test {
    //xlsx 07 表格最大行数是1048576行
    //xls 03   65536
    public static void main(String[] args) {
        read();
    }

    public static void read(){
        long t1 = new Date().getTime();
        AtomicLong ii = new AtomicLong(0);
        try (InputStream is = new FileInputStream("C:\\Users\\mtime\\Desktop\\工作\\test.xlsx"); ReadableWorkbook wb = new ReadableWorkbook(is)) {
            Sheet sheet = wb.getFirstSheet();
            try (Stream<Row> rows = sheet.openStream()) {
                rows.forEach(r -> {
                    int cellCount = r.getCellCount();
                    for (int i = 0; i < cellCount; i++) {

                    }
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
        try (OutputStream os = new FileOutputStream("C:\\Users\\mtime\\Desktop\\工作\\1.xlsx")) {
            Workbook wb = new Workbook(os, "MyApplication", "1.0");
            long t1 = new Date().getTime();
            Worksheet ws = wb.newWorksheet("Sheet 1");
            ws.style(0, 0).bold().fontSize(18).fillColor(Color.GRAY1).set();
            ws.style(0, 1).bold().fontSize(18).fillColor(Color.GRAY1).set();
            ws.style(0, 2).bold().fontSize(18).fillColor(Color.GRAY1).set();
            ws.style(0, 3).bold().fontSize(18).fillColor(Color.GRAY1).set();
            ws.style(0, 4).bold().fontSize(18).fillColor(Color.GRAY1).set();
            ws.style(0, 5).bold().fontSize(18).fillColor(Color.GRAY1).set();
            ws.value(0, 0, "编号");
            ws.value(0, 1, "名字");
            ws.value(0, 2, "符号");
            ws.value(0, 3, "编码");
            ws.value(0, 4, "手机号");
            ws.value(0, 5, "信息");
            for (int i = 1; i < 10; i++) {
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
