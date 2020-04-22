import javax.swing.JLabel;
import javax.swing.JOptionPane;

public class UpdateInterface extends Thread{
  // Fields
  static String enteredWord = "";
  static int totWords;
  static int compWords = 0;
  static String word;
  static volatile boolean comp;
  static boolean isComp = false;



  public synchronized String getWord(){
      return word;
  }
  

  public synchronized boolean isComplete(){
    return comp;
  }

  /**
   * Returns the total number of words in the to fall
   * @return int total words 
   * @see    totWords 
   */
  public synchronized static int getTotWords(){
    return totWords;
  }

  /**
   * Sets the total words to the givine parameter
   * @param total
   */

  public synchronized static void setTotWords(int total){
    UpdateInterface.totWords = total;
  }
  
  /**
   * Returns the number of words caught
   * @return int completed words 
   * @see    compWords 
   */
  public synchronized static int getCompWords(){
    return compWords;
  }

  /**
   * Sets all the score fields to zero
   */
  public synchronized static void resetCompWords(){
    compWords = 0;
  }

  /**
   * Change comp value, if comp = true all values have been caught 
   * @param bool
   */
  public synchronized static void setComp(boolean bool){
    UpdateInterface.comp = bool;
  }
  
  /** 
   * Returns the word entered in the text field
   * @return String Entered word
   * @see    enteredWord
   */
  public static synchronized String getEnteredWord(){
    return enteredWord;
  }
  // Set the word entered by the user to the variable enteredWord
  // Makes it easier to track when used in run()
  public static synchronized void setEnteredWord(String s){
    UpdateInterface.enteredWord = s;
  }
  
  /**
   * If a word is caught, the method is called to increment the complited
   * word counter. 
   */
  public static synchronized void incCompWords(){
    compWords++;
  }

  /**
   * Updates the score
   */
  public synchronized static void scoreUpdate(){
    WordApp.changeJLabel("Caught:" + Score.getCaught() + "    ", "Missed:" + Score.getMissed() + "    ", "Score:" + Integer.toString(Score.getScore()) + "    ");
  }

  @Override  
  public void run(){
    boolean bool = false;
    while(bool == false){
      if(comp){
        // Message to be displayed
        JOptionPane.showMessageDialog(null, "Thanks for playing", " Winner winner chicken dinner!  ", JOptionPane.INFORMATION_MESSAGE);
        comp = false;
        bool = true;
      }
    }
  }
}