

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.lang.System.Logger;

import java.util.concurrent.CountDownLatch;
import java.util.logging.Level;
import java.lang.System.Logger;	

import javax.swing.JButton;
import javax.swing.JPanel;

public class WordPanel extends JPanel implements Runnable {

		/**
	*
	*/
	private static final long serialVersionUID = 1L;
	public static volatile boolean done;
		private static WordRecord[] words;
		private int noWords;
		private int maxY;
		private static boolean[] inUse;
		private int count;
		private boolean caught;
		private Score score;
		UpdateInterface ui;
		private boolean gameStatus = false;
		int val = 3;


		public void paintComponent(Graphics g) {
		    int width = getWidth();
		    int height = getHeight();
		    g.clearRect(0,0,width,height);
		    g.setColor(Color.red);
		    g.fillRect(0,maxY-10,width,height);

		    g.setColor(Color.black);
		    g.setFont(new Font("Helvetica", Font.PLAIN, 26));
		   //draw the words
		   //animation must be added 
		    for (int i=0;i<noWords;i++){	    	
		    	//g.drawString(words[i].getWord(),words[i].getX(),words[i].getY());	
		    	g.drawString(words[i].getWord(),words[i].getX(),words[i].getY()+20);  //y-offset for skeleton so that you can see the words	
		    }
		   
		}
		
		WordPanel(WordRecord[] words, int maxY) {
			this.words=words; //will this work?
			noWords = words.length;
			done=false;
			this.maxY=maxY;		
			inUse = new boolean[words.length];
			score = new Score();
		}


		public void setGameStatus(Boolean bool){
           this.gameStatus = bool;
		}
		
		/** 
        * Returns the game status, if true game is done, if false game is still on.
        * @return boolean game status
        * @see    gameStatus
        */
		public boolean gameStatus(){
			return gameStatus;
		}

		@Override
		public void run() {
			UpdateInterface.setComp(false);	
			while(gameStatus == false){
              for(int i =0; i<words.length; i++){
				  while(!words[i].dropped() && inUse[i] == false){
					  inUse[i] = true;
					  words[i].drop(10);
					  try{
						  Thread.sleep(words[i].getSpeed());
						  repaint();
						  inUse[i] = false;
					  } catch(InterruptedException ex){
						  //Logger.getLogger(WordPanel.class.getName()).log(Level.SEVERE, null, ex);
					  }
                      // Checks if word has reched red bar
					  if(words[i].dropped()){
						score.missedWord();
						words[i].resetWord();
						UpdateInterface.scoreUpdate();
						repaint();
						break;
					  }
					
					// Checks if entered word is in the group of words that are falling
					// if true increment the counter that tracks completed words, this also updates the scores
					  if(UpdateInterface.getEnteredWord().equals(words[i].getWord())){
						UpdateInterface.setEnteredWord("");
						UpdateInterface.incCompWords();
						caught=true;
						score.caughtWord(words[i].getWord().length());
						UpdateInterface.scoreUpdate();
						words[i].resetWord();
						repaint();
						caught = false;
						break;
					  }
					  repaint();
					  break;
				  }
			  }
			  //If all the words have been caught set game status to true, meaning game is over.
			  if(UpdateInterface.getCompWords() == UpdateInterface.getTotWords()){
				  gameStatus = true;
				  UpdateInterface.setComp(true);
			  }  
			}
             // Resets the game.
			for(int n =0; n<words.length;n++){
				words[n].setY(-10);
			}
			repaint();
		}
	}