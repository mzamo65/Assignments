public class Score {
	private static int missedWords;
	private static int caughtWords;
	private static int gameScore;
	
	Score() {
		missedWords=0;
		caughtWords=0;
		gameScore=0;
	}
		
	// all getters and setters must be synchronized
	
	public static synchronized int getMissed() {
		return missedWords;
	}

	public static synchronized int getCaught() {
		return caughtWords;
	}
	
	public static synchronized int getTotal() {
		return (missedWords+caughtWords);
	}

	public static synchronized int getScore() {
		return gameScore;
	}
	
	public synchronized void missedWord() {
		missedWords++;
	}

	public synchronized void caughtWord(int length) {
		caughtWords++;
		gameScore+=length;
	}

	public static synchronized void resetScore() {
		caughtWords=0;
		missedWords=0;
		gameScore=0;
	}
}
