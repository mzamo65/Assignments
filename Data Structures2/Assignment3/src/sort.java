import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;

/**
 * Sorts data within SampleData.csv by placing it within relevent .csv file,
 * using FileWriter class. Where the values are separated by commas within
 * the .csv file. This is to make it easier to use them in gnuplot.
 * Notation: fl1  = file 1 with linear resolution data
 *           fwl1 = FileWriter object that writes to a linear resolution csv file
 */

public class sort{
  public static void main(String[] args){
        
    try{
      File fileN = new File("SampleData.csv");
      File fl1 = new File("LFLinear.csv");
      File fl2 = new File("InsLinear.csv");
      File fl3 = new File("searchMaxLinear.csv");
      File fl4 = new File("searchLinear.csv");
      File fl5 = new File("searchAvgLinear.csv");
      FileWriter fwl1 = new FileWriter(fl5);
      FileWriter fwl = new FileWriter(fl2);
      FileWriter fwl2 = new FileWriter(fl3);
      FileWriter fwl3 = new FileWriter(fl4);
      FileWriter fwl4 = new FileWriter(fl1);
      
      int count = 0;
      int N=9;

      Scanner scan = new Scanner(fileN);
      while(count<=9){
        fwl3.write(scan.next()+"\n");
        if(count<N) fwl3.write(",");
        fwl3.write("\n");
        fwl1.write(scan.next()+"\n");
        if(count<N) fwl1.write(",");
        fwl1.write("\n");
        fwl2.write(scan.next()+"\n");
        if(count<N) fwl2.write(",");
        fwl2.write("\n");
        fwl.write(scan.next()+"\n");
        if(count<N) fwl.write(",");
        fwl.write("\n");
        fwl4.write(scan.next()+"\n");
        if(count<N) fwl4.write(",");
        fwl4.write("\n");
        count+=1;
      }   
      fwl3.close();
      fwl1.close();
      fwl2.close();
      fwl.close();
      fwl4.close();

      File fq1 = new File("LFQuad.csv");
      File fq2 = new File("InsQuad.csv");
      File fq3 = new File("searchMaxQuad.csv");
      File fq4 = new File("searchQuad.csv");
      File fq5 = new File("searchAvgQuad.csv");
      FileWriter fwq1 = new FileWriter(fq5);
      FileWriter fwq = new FileWriter(fq2);
      FileWriter fwq2 = new FileWriter(fq3);
      FileWriter fwq3 = new FileWriter(fq4);
      FileWriter fwq4 = new FileWriter(fq1);

      count=0;
    
      while(count<=9){
        fwq3.write(scan.next()+"\n");
        if(count<N)                 fwq3.write(",");
        fwq4.write("\n");
        fwq1.write(scan.next()+"\n");
        if(count<N)                 fwq1.write(",");
        fwq1.write("\n");
        fwq2.write(scan.next()+"\n");
        if(count<N)                 fwq2.write(",");
        fwq2.write("\n");
        fwq.write(scan.next()+"\n");
        if(count<N)                 fwq.write(",");
        fwq.write("\n");
        fwq4.write(scan.next()+"\n");
        if(count<N)                 fwq4.write(",");
        fwq4.write("\n");
        count+=1;
        
      }
      fwq3.close();
      fwq1.close();
      fwq2.close();
      fwq.close();
      fwq4.close();

      File fc1 = new File("LFChain.csv");
      File fc2 = new File("InsChain.csv");
      File fc3 = new File("searchMaxChain.csv");
      File fc4 = new File("searchChain.csv");
      File fc5 = new File("searchAvgChain.csv");
      FileWriter fwc1 = new FileWriter(fc5);
      FileWriter fwc = new FileWriter(fc2);
      FileWriter fwc2 = new FileWriter(fc3);
      FileWriter fwc3 = new FileWriter(fc4);
      FileWriter fwc4 = new FileWriter(fc1);

      count = 0;
      
      while(count<=9){
        fwc3.write(scan.next()+"\n");
        if(count<N) fwc3.write(",");
        fwc3.write("\n");
        fwc1.write(scan.next()+"\n");
        if(count<N) fwc1.write(",");
        fwc1.write("\n");
        fwc2.write(scan.next()+"\n");
        if(count<N) fwc2.write(",");
        fwc2.write("\n");
        fwc.write(scan.next()+"\n");
        if(count<N) fwc.write(",");
        fwc.write("\n");
        fwc4.write(scan.next()+"\n");
        if(count<N) fwc4.write(",");
        fwc4.write("\n");
        count+=1;
      }
      fwc3.close();
      fwc1.close();
      fwc2.close();
      fwc.close();
      fwc4.close();

    }catch(IOException ioe){System.out.println("File not found");}
  }
}
