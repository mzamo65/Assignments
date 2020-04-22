import java.io.File;
import java.io.FileNotFoundException;
import java.lang.ArrayIndexOutOfBoundsException;
import java.util.Scanner;
import java.util.*;

// Name       : Khulekani Jali
// Student NO.: JLXKHU003
// Hash Table Assignment 

/**
 * Main class
 *
 *
 *
 */
public class HashApp{
  String[] array;
  ArrayList<Integer> list;
  ArrayList<Integer> cList;
  LinkedList[] chainArray;
  int tableSize;
  int sCount;
  int iCount;

  /**
   * Driver class
   * Takes input from the user for the size of the hash table, the resolution 
   * type, the number of searchs and the input data file.
   * An array is created containing the data stored within the file, the array is
   * is then appended to the table either using linear, quadratic or chaining.
   * The class does this by invoking the HashApp class.
   * @param args[] table size
   */
  public static void main(String args[]){
    HashApp ha    = new HashApp(Integer.valueOf(args[0]));
    int tableSize = Integer.valueOf(args[0]);
    
    if(!(ha.prime())){
      System.out.println("Table size is not a prime number");
      System.exit(0);
    }

    try{
      String[] array  = new String[500];
      int count = 0;
 
      String res = args[1]; 
      
      String data = args[2]; 

      int num = Integer.valueOf(args[3]); 
	    
      if(!(data.equals(""))){
        
        File file = new File(data);
        Scanner scn = new Scanner(file);
        count = 0;
        
        while(scn.hasNext() && count <= 500){
          array[count] = scn.next();
          count+=1;
        }
      }

      if(res.equals("Linear")){
        ha.linear(array);
      }

      else if(res.equals("Quadratic")){
        ha.quadratic(array);
      }
  
      else if (res.equals("Chaining")){    ha.chaining(array);}
      
      if(num != 0){
        String[] tempArray = array;
        ha.Shuffle(tempArray);

        for(int j = 0; j<num; j++){
          ha.findKey(tempArray[j], res);
        }
        //System.out.println("Total number of search probes: ");
        System.out.println(ha.sumProbe(res));
      }
      
      double loadFactor = (double)ha.len(res)/(double)tableSize;
      loadFactor = (double) Math.round(loadFactor*100.0)/100.0;
    
      double avg = (double)ha.sumProbe(res)/(double)num;
      avg = (double) Math.round(avg*100.0)/100.0;
      //System.out.println("Average number of search probes:");
      System.out.println(avg);
      //System.out.println("Maximum number of search probes:");
      System.out.println(ha.maxProbe(res));
      //System.out.println("Total number of insertion probes:");
      System.out.println(ha.insertionProbes());
      //System.out.println("Load Factor:");
      System.out.println(loadFactor);
          
    }
    
    catch(FileNotFoundException e){
      e.printStackTrace();
    }
  }

  /**
   * Creates a new Hash object which has the array containing the table, is
   * called with a table size.
   * @param size array or table size
   */
  HashApp(int size){
    tableSize = size;
    array = new String[size];
    chainArray = new LinkedList[size];
    list = new ArrayList<Integer>();
    cList = new ArrayList<Integer>();
    int sCount = 0;
    int iCount = 0;
  }

  /**
   * For a given key, the method returns the hash value.
   * @param  key key to be hashed
   * @return     the hash value
   */
  public int hash(String key){
    int hashVal = 0;
    String keyTemp = key.substring(0,19);
    keyTemp = keyTemp.replaceAll("/|:", "");
    keyTemp = keyTemp.substring(0,2) + keyTemp.substring(8,12);

    for(int i = 0; i< keyTemp.length(); i++){
      int charCode = keyTemp.charAt(i);
      hashVal += (10 * hashVal) + charCode;
    }
    return hashVal % tableSize;
  }

  /**
   * Creates a table with linear resolution
   * @param  arrayToHash  the list with elements that are insert into the table
   * @throws ArrayIndexOutOfBoundsException if the table is full 
   */
  public void linear(String[] arrayToHash){
    int check = 0;
    
    for(int i=0;i<arrayToHash.length; i++){
      String element = arrayToHash[i];
      int index = hash(arrayToHash[i]);
      
      while(array[index] != null){
        index += 1;
        iCount += 1;
        index %= tableSize;
        
      }

      check =0;
      for(int j=0;j<tableSize; j++){
        if(array[j] != null )   check+=1;
      }
      
      if((check+1) >= tableSize){
        try{
          throw new ArrayIndexOutOfBoundsException("Table full");
        }
        catch(ArrayIndexOutOfBoundsException e){
          System.out.println("Table is full");
          array[index] = element;
          e.printStackTrace();
          System.exit(0);
        }
      }
      array[index] = element;
    } 
  }
  
  /**
   * Creates a table that utilises quadratic resolution
   * @param  arrayToHash  the tree we insert data into.
   * @throws ArrayIndexOutOfBoundsException if the probes are greater than table size
   */
  public void quadratic(String[] arrayToHash){

    for(int i=0;i<arrayToHash.length-1; i++){
      int count =1;
      String element = arrayToHash[i];
      int index = hash(arrayToHash[i]);
      
      while(array[index] != null){
        iCount+=1;
        count = count<<1;
        index = index + count;
        index %= tableSize;
        
        if(iCount > tableSize){
          System.out.println("Probe has failed i.e. probe > TableSize");
          try{
            throw new ArrayIndexOutOfBoundsException("Table full:" +tableSize);
          }
          catch(ArrayIndexOutOfBoundsException e){
            System.out.println("Table is full");
            array[index] = element;
            e.printStackTrace();
            System.exit(0);
          }
        }
      }
    array[index] = element;
    }
  }

  /**
   * Creates the table using chaining reolution. Elements are stored into linked 
   * lists 
   * @param arrayToHash the array whose elements are stored in the table
   */
  public void chaining(String[] arrayToHash){
    int count = 1;
    LinkedList l;
   
    for(int i=0; i<arrayToHash.length; i++){
      String element = arrayToHash[i];
      int index = hash(arrayToHash[i]);

      if(chainArray[index] == null)  {
        l = new LinkedList();
        l.addToStart(element);
      }
      
      else{
        l = chainArray[index];
        iCount += 1; 
        l.addToStart(element);
      }    
      chainArray[index] = l;
    }
  }
  
  /**
   * Takes in a string key which is searched for within the tree either using
   * linear, quadratic or chaining resolution, taking a count everytime there 
   * is a probe.
   * @param  key        key to be searched for in the tree. 
   * @param  Resolution Resolution type.
   * @return            String     the string value found in tree.
   */
  public String findKey(String key, String Resolution){
    sCount = 0;
    int arrayIndexHash = hash(key);
    int count3=1;
    
    if(Resolution.equals("Linear")){
      if(array[arrayIndexHash] != null && array[arrayIndexHash].equals(key)){
        return array[arrayIndexHash];
      }

      while(array[arrayIndexHash] != null && !(array[arrayIndexHash].equals(key))){
        arrayIndexHash+=1;
        sCount+=1;
        arrayIndexHash %= tableSize;   
      }
      maxProbe(sCount,Resolution);
      return array[arrayIndexHash];
    }  
      
    else if(Resolution.equals("Quadratic")){
      if(array[arrayIndexHash] != null && array[arrayIndexHash].equals(key)){
        return array[arrayIndexHash];
      }
      
      else{
        while(array[arrayIndexHash] != null && !(array[arrayIndexHash].equals(key))){
          arrayIndexHash = arrayIndexHash + count3*count3;
          sCount+=1;
          arrayIndexHash %= tableSize; 
          count3+=1;  
        }
        maxProbe(sCount,Resolution);
        return array[arrayIndexHash];
      }
    } 

    else{
      LinkedList.Node l2 = null;
      LinkedList l = chainArray[arrayIndexHash];
      int tCount = 0;
     
      while(chainArray[arrayIndexHash] != null){
        if(l.getLLData().equals(key)){  break;}
        else{
          if(tCount > 0){
            if(l2.getData().equals(key)){ 
               maxProbe(sCount,Resolution);   
               return l2.getData();}
            else l2 = l.next(l2);
          }
          else{
            if(sCount == 0)   l2 = l.next();
            sCount+=1;
            tCount +=1;
          }
        }
      }    
      maxProbe(sCount,Resolution);
      return l.getLLData();
    }
  }
  
  /**
   *  Shuffles the array containing the data
   */
  public void Shuffle(String[] array){
    int index;
    String t;
    Random rand = new Random();
    for (int i=0; i<array.length; i++){
      index = rand.nextInt(i+1);
      t = array[index];
      array[index] = array[i];
      array[i] = t;
    }  
  } 
 
  /**
   * Return number of insertion probes done
   * @return iCount
   */
  public int insertionProbes(){
    return iCount;
  }
  

  /**
   * Checks if table size is a prime number returns true if its prime and 
   * false otherwise.
   * @return  boolean
   */
  public boolean prime(){
    int n= tableSize;
    if(n%2 ==0 || n%3==0)  return false;
    for(int i=5; i*i<=n; i=i+6){
      if(n%i==0 || n%(i+2)==0)  return false;
    }
    return true;
  }
  
  /**
   * Adds probe into Arraylist
   * @param n  search probe to be added to list
   */
  public void maxProbe(int n, String Resolution){
     if(!(Resolution.equals("Chaining")))   list.add(n);
     else   cList.add(n);
  }
  
  /**
   * Returns the maximum search probe
   * @param  Resolution table resolution scheme
   * @return iCount
   */
  public int maxProbe(String Resolution){
    if(!(Resolution.equals("Chaining")))   return Collections.max(list);
    else  return Collections.max(cList);
  }

  /**
   * Returns the sum of the search probes stored in the Arraylist
   * @param  Resolution table resolution scheme
   * @return  sum  the sum of all the search probes
   * @see     sum
   */
  public double sumProbe(String Resolution){
    int sum =0;
    if(!(Resolution.equals("Chaining"))){
      for(int i=0; i<list.size(); i++){
        if(list.get(i) != null)   sum = sum + list.get(i);
      }
      return sum;
    }
    else{
      for(int i=0; i<cList.size(); i++){
        if(cList.get(i) != null)   sum = sum + cList.get(i);
      }
      return sum;
    }
  }
  
  /**
   * For a given table with either Linear,quadratic or chaining resolution 
   * the method counts the number of items contained in that table.
   * @param   Resolution  Table resolution type
   * @return              count  the number of none null slots in the table
   * @see                 count
   */
  public int len(String Resolution){
    int count=0;
    if(!(Resolution.equals("Chaining"))){
      for(int i=0;i<array.length; i++){
        if(array[i] != null)    count+=1;  
      }
    }
    else{
      for(int i=0 ;i<chainArray.length; i++){
        if(chainArray[i] != null)    count+=1;  
      }
    }
    return count;
  }
}

//Primality test code is copied from geeksforgeeks.org

